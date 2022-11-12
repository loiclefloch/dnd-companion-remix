import { useEffect } from "react"
import { Link } from "@remix-run/react"
import useI18n from "~/modules/i18n/useI18n"
import useCharacter from "~/modules/api/useCharacter"
import StatsSmall from "~/components/StatsSmall"
import useRouter from "~/hooks/useRouter"
import Screen from "~/components/Screen"
import useRestScreenAsModal from "~/components/useRestScreenAsModal"
import useLifeScreenAsModal from "~/components/useLifeScreenAsModal"
import useAcScreenAsModal from "~/components/useAcScreenAsModal"
import useCurrentCharacter from "~/components/useCurrentCharacter"
import IconCampFire from "~/components/icons/IconCampFire"
import IconShield from "~/components/icons/IconShield"
import useTip from "~/components/useTip"
import {
	TraitsSection,
	ProficienciesSection,
	BackgroundSection,
	FeaturesSection,
	FeatsSection,
	GlobalSection,
	Infos,
} from "~/components/CharacterResume"
import CharacterClassTag from "~/components/CharacterClassTag"
import CharacterRaceTag from "~/components/CharacterRaceTag"
import CharacterLevelTag from "~/components/CharacterLevelTag"

function HpView({character, characterDispatch}) {
	const { showLifeScreenAsModal } = useLifeScreenAsModal()

	return (
		<div
			className="flex items-center justify-center h-full"
			onClick={() => showLifeScreenAsModal(character, characterDispatch)}
		>
			<div className="relative w-8 h-8 rotate-45 bg-pink-600">
				<div className="absolute w-8 h-8 bg-pink-600 rounded-[50%] left-[-50%]"></div>
				<div className="absolute w-8 h-8 bg-pink-600 rounded-[50%] top-[-50%]"></div>
			</div>
			<div className="absolute flex items-center -mt-3 text-xl font-semibold text-center text-slate-900">
				{character.currentHp}
			</div>
		</div>
	)
}

function AcView({ character }) {
	const { showAcScreenAsModal } = useAcScreenAsModal()

	return (
		<div
			className="relative flex items-center justify-center align-middle"
			onClick={() => showAcScreenAsModal(character)}
		>
			<IconShield className="w-14 h-14 fill-slate-700" />

			<div className="absolute text-xl font-semibold text-slate-700" style={{ marginTop: -6 }}>
				{character.ac.total}
			</div>
		</div>
	)
}

function Content({ 
	character,
	characterDispatch,
}) {
	const { tr } = useI18n()
	const { showTipPassivePerception } = useTip()
	const { showRestModalAsScreen } = useRestScreenAsModal()

	if (!character) {
		return null
	}

	return (
		<div className="px-4">
			<div className="flex items-center justify-center">
		
				<div className="flex items-center">
					<CharacterClassTag character={character} />
				</div>
				<div className="ml-1 flex items-center">
					<CharacterRaceTag race={character.race} />
				</div>
				<div className="ml-1 flex items-center">
					<CharacterLevelTag level={character.level} />
				</div>
			</div>

				<div className="relative flex items-center mt-6">
					<div className="w-1/3" />
					<HpView character={character} characterDispatch={characterDispatch} />
					<div className="ml-12" />
					<AcView character={character} characterDispatch={characterDispatch} />
					<div className="absolute right-0">
						<IconCampFire className="w-10 h-10 fill-slate-700" onClick={() => showRestModalAsScreen()} />
					</div>
				</div>

				<div className="my-4 mt-6">
					<StatsSmall 
						withDetail 
						stats={character.stats} 
						skills={character.skills}
						character={character}
					/>
				</div>

				<GlobalSection character={character} small />
				<Infos character={character} />
				<FeatsSection character={character} />
				<TraitsSection character={character} />
				<FeaturesSection character={character} />
				<BackgroundSection character={character} />
				<ProficienciesSection character={character} />
			</div>
		)
}

function Character() {
	const router = useRouter()
	const character = useCharacter(router.query.characterId)
	const { character: currentCharacter, setCurrentCharacter, characterDispatch } = useCurrentCharacter()

	useEffect(() => {
		if (character && (!currentCharacter || character?.id !== currentCharacter?.id)) {
			setCurrentCharacter(character.id)
		}
	}, [character, setCurrentCharacter, currentCharacter])

	return (
		<Screen
			title={currentCharacter?.name}
			// titleIcon={<IconUsers className="w-6 h-6" />}
			root
			withCharacterMenu
			withBottomSpace
			rightAction={
				// TODO: edit?
				<button onClick={() => router.push("/character/create")}>
					{/* <IconPlus className={"h-6 w-6 text-slate-800"} /> */}
				</button>
			}
		>
			{character?.id === currentCharacter?.id && (
				<Content
					character={currentCharacter}
					characterDispatch={characterDispatch}
				/>
			)}
		</Screen>
	)
}

export default Character