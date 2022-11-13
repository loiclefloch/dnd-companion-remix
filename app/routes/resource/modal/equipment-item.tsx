import { useFetcher } from "@remix-run/react";
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import EquipmentItemView from "~/components/EquipmentItemView"
import type { ResourceModalProps } from "~/components/modal/ResourceModal";
import ResourceModal from "~/components/modal/ResourceModal";
import useScreenAsModal from "~/components/screenAsModal/useScreenAsModal";
import { formatEquipmentItem } from "~/mappers/equipment.mapper";
import useI18n from "~/modules/i18n/useI18n"
import { getEquipmentItem } from "~/services/equipment.server";
import { requireUser } from "~/services/session.server";

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

	const url = new URL(request.url)
	const equipmentItemId = url.searchParams.get('equipmentItemId')
	invariant(typeof equipmentItemId === 'string', 'equipmentItemId is required')

	const item = await getEquipmentItem(equipmentItemId as string);

  return json({
    item: formatEquipmentItem(item)
  });
}

export interface EquipmentItemModalProps extends ResourceModalProps {
	equipmentItemId: string;
}

export default function EquipmentItemModal({ equipmentItemId, onCloseScreen }: EquipmentItemModalProps) {
	const { tr } = useI18n()
	const fetcher = useFetcher<typeof loader>()

	return (
    <ResourceModal
			name="equipment-item"
      component={EquipmentItemView}
      fetcher={fetcher}
      params={{ equipmentItemId }}
      title={({ item }) => tr(item?.nameLocalized)}
      onCloseScreen={onCloseScreen}
    />
  );
}

// TODO: remove
// use:
// const showEquipmentItemScreenAsModal = useResourceModal(EquipmentItemModal)

export function useEquipmentItemScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showEquipmentItemScreenAsModal: (item) => {
			showScreenAsModal(EquipmentItemModal, {
				equipmentItemId: item.index
			})
		}
	}
}