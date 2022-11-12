import useRouter from "~/hooks/useRouter";
import Screen from "~/components/Screen"
import EquipmentItemView from "~/components/EquipmentItemView"
import useI18n from "../../modules/i18n/useI18n";
import useMagicItem from "../../modules/api/useMagicItem";

function MagicItem() {
	const { tr } = useI18n()
	const router = useRouter()
	const item = useMagicItem(router.query.magicItemId)

  return (
		<Screen
			title={`Item magique - ${tr(item?.nameLocalized || '')}`}
			// titleIcon={<IconScale className="w-6 h-6" />}
			withBottomSpace
		>
			{item && (
				<EquipmentItemView item={item} />
			)}
		</Screen>
	);
}

export default MagicItem;