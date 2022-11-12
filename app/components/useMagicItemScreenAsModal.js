import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "~/modules/i18n/useI18n";
import EquipmentItemView from "./EquipmentItemView";

function MagicItemScreenAsModal({ index, onCloseScreen }) {
	const { tr } = useI18n()
	const item = null // TODO: remix

	return (
		<ScreenAsModal 
			title={!item ? '' : tr(item.nameLocalized)}
			onCloseScreen={onCloseScreen}
		>
			{item && <EquipmentItemView item={item} />}
		</ScreenAsModal>
	)
}

export default function useMagicItemScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showMagicItemScreenAsModal: (index) => {
			showScreenAsModal(MagicItemScreenAsModal, {
				index
			})
		}
	}
}