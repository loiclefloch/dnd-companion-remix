import Screen from "~/components/Screen"
import EquipmentItemView from "~/components/EquipmentItemView"
import useI18n from "~/modules/i18n/useI18n";
import { formatEquipmentItem } from '~/mappers/equipment.mapper';
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getEquipment as getEquipmentItem } from "~/services/equipment.server";
import { useLoaderData } from '@remix-run/react';
import { requireUser } from "~/services/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const item = await getEquipmentItem(params.equipmentItemId as string);

  return json({
    item: formatEquipmentItem(item)
  });
}


function EquipmentItem() {
	const { item } = useLoaderData<typeof loader>();
	const { tr } = useI18n()

  return (
    <Screen
      title={`Équipement - ${tr(item?.nameLocalized || "")}`}
      // titleIcon={<IconScale className="w-6 h-6" />}
      withBottomSpace
    >
      <EquipmentItemView item={item} />
    </Screen>
  );
}

export default EquipmentItem;