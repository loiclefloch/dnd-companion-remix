import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useSubclass from "~/modules/api/useSubclass"
import SubclassContent from "./SubclassContent"
import useI18n from "~/modules/i18n/useI18n"

function SubclassScreenAsModal({ index, onCloseScreen }) {
	const { tr } = useI18n()
	const subclass = useSubclass(index)

	return (
		<ScreenAsModal 
			title={tr(subclass?.nameLocalized)} 
			onCloseScreen={onCloseScreen}
		>
			<SubclassContent subclass={subclass} />
		</ScreenAsModal>
	)
}

export default function useSubclassScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showSubclassScreenAsModal: (index) => {
			showScreenAsModal(SubclassScreenAsModal, { index })
		}
	}
}
