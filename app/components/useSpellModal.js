import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import SpellView from "~/components/SpellView";
import ScreenAsModal from "./screenAsModal/ScreenAsModal"

import useI18n from "~/modules/i18n/useI18n";

function SpellScreenAsModal({ index, onCloseScreen }) {
 const spell = null // TODO: remix
 const { tr } = useI18n()

	return (
		<ScreenAsModal title={`Sort - ${tr(spell.nameLocalized)}`} onCloseScreen={onCloseScreen}>
			{/* <SpellView spell={spell} /> */}
		</ScreenAsModal>
	)
}


export default function useSpellModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showSpellModal: (index) => {
			showScreenAsModal(SpellScreenAsModal, { index })
		}
	}
}
