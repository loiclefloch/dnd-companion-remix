import useRouter from "~/hooks/useRouter";
import Screen from "~/components/Screen"
import EquipmentItemView from "~/components/EquipmentItemView"
import useEquipmentItem from "../../modules/api/useEquipmentItem";
import useI18n from "../../modules/i18n/useI18n";

function EquipmentItem() {
	const { tr } = useI18n()
	const router = useRouter()
	const item = useEquipmentItem(router.query.equipmentItemId)

  return (
		<Screen
			title={`Équipement - ${tr(item?.nameLocalized || '')}`}
			// titleIcon={<IconScale className="w-6 h-6" />}
			withBottomSpace
		>
			{item && (
				<EquipmentItemView item={item} />
			)}
		</Screen>
	);
}

export default EquipmentItem;