import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { makeI18n } from "~/modules/i18n/useI18n";
import FeatContent from "./FeatContent"

const useI18n = makeI18n({
	'screen.title': {
		fr: 'Talent - %{feat.name}',
		en: 'Feat - %{feat.name}',
	}
})

function FeatScreenAsModal({ index, character, onCloseScreen }) {
	const { tr } = useI18n()
	const feat = null // TODO: remix

	return (
		<ScreenAsModal
			title={tr('screen.title', { 'feat.name': tr(feat.nameLocalized)})} 
			onCloseScreen={onCloseScreen}
		>
			<FeatContent index={index} feat={feat} character={character} />
		</ScreenAsModal>
	)
}

export default function useFeatScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showFeatScreenAsModal: (index, character) => {
			showScreenAsModal(FeatScreenAsModal, {
				index,
				character
			})
		}
	}
}
