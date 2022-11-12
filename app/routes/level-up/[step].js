import { useRouter } from '~/hook/useRouter'
import useI18n from '../../modules/i18n/useI18n'
import Screen from "~/component/Screen"
import useCharacterLevelling from "~/component/useCharacterLevelling"
import LevellingStep from "~/component/levelling/LevellingStep"

function LevelUp() {
	const { tr } = useI18n()
	const { newLevel } = useCharacterLevelling()

	const router = useRouter()
	const stepName = router.query.step

	return (
		<Screen
			title={`Montée au niveau ${newLevel}`}
			withBottomSpace
		>
			<LevellingStep stepName={stepName} />
		</Screen>
	)
}

export default LevelUp