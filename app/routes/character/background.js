import { makeI18n } from "../../modules/i18n/useI18n"
import Screen from "~/components/Screen"
import useCurrentCharacter from "~/components/useCurrentCharacter"
import CharacterResume from "~/components/CharacterResume"
import Button from "~/components/Button"

const useI18n = makeI18n({
	'screen.title': {
		fr: `%{character.name} - Résumé`,
		en: `%{character.name} - Resume`,
	},
	'data.copy': {
		fr: `Copier la donnée`,
		en: `Copy data`,
	},
	'data.copied': {
		fr: `Donnée copiée ! Sauvegardez la en la collant quelque part`,
		en: `Data copied ! Save it by pasting it somwhere`,
	},
})

function Background() {
	const { tr } = useI18n()
	const currentCharacter = useCurrentCharacter()

	return (
		<Screen
			title={tr('screen.title', { 'character.name': currentCharacter?.name })}
			// titleIcon={<IconBriefcase className="w-6 h-6" />}
			root
			withCharacterMenu
			withBottomSpace
		// rightAction={ // TODO: edit
		// <button 
		// 	onClick={() => {

		// 	}}
		// >
		// 	<IconPlus className={"h-6 w-6 text-slate-800"} />
		// </button>
		// }
		>
			<div className="mx-4">
				<Button 
					variant="outlined"
					onClick={() => {
						// TODO:
						// navigator.clipboard.writeText(JSON.stringify(rawCharacter, null, 2))
						alert(tr`data.copied`)
					}}
				>
					{tr`data.copy`}
				</Button>
			</div>

				<CharacterResume character={currentCharacter} />

		</Screen>
	)
}

export default Background

