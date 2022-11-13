import { useFetcher } from "@remix-run/react";
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useEffect } from "react";
import invariant from "tiny-invariant";
import EquipmentItemView from "~/components/EquipmentItemView"
import ScreenAsModal from "~/components/screenAsModal/ScreenAsModal"
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

	// force loading to be displayed.
	await new Promise(r => setTimeout(r, 30)) 

  return json({
    item: formatEquipmentItem(item)
  });
}


function EquipmentItemScreenAsModal({ equipmentItemId, onCloseScreen }) {
	const { tr } = useI18n()
	const equipmentItemFetcher = useFetcher<typeof loader>()
	const item = equipmentItemFetcher.data?.item

	useEffect(() => {
		equipmentItemFetcher.submit(
			{ equipmentItemId: equipmentItemId },
			{ method: 'get', action: '/resource/modal/equipment-item' },
		)
	}, [])

	const isLoading = equipmentItemFetcher.state !== 'idle'

	return (
		<ScreenAsModal 
			title={!item ? '' : tr(item?.nameLocalized)}
			isLoading={isLoading}
			onCloseScreen={onCloseScreen}
		>
			{item && <EquipmentItemView item={item} onCloseScreen={onCloseScreen} />}
		</ScreenAsModal>
	)
}

export function useEquipmentItemScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showEquipmentItemScreenAsModal: (item) => {
			showScreenAsModal(EquipmentItemScreenAsModal, {
				equipmentItemId: item.index
			})
		}
	}
}