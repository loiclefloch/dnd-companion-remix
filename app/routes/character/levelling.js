import clsx from "clsx"
import { Link } from "@remix-run/react"
import { CharacterProvider} from "../../modules/character/ContextCharacter"
import useCurrentCharacter from "~/components/useCurrentCharacter"
import IconTrendingUp from "~/components/icons/IconTrendingUp"
import Screen from "~/components/Screen"
import Button from "~/components/Button"
import IconPlus from "~/components/icons/IconPlus"
import useLevellingAddScreenAsModal from "~/components/useLevellingAddScreenAsModal"
import useRouter from "~/hooks/useRouter"
import { actionAddXp } from "../../modules/character/action"

function HistoryLine({ history }) {
	return (
		<div className="flex py-1 mx-4 my-1">
			<h3 className="leading-6 text-gray-900 text-md">
				{history.label || 'Inconnu'}
			</h3>
			<div className="flex flex-col items-end flex-1">
				<div
					className={clsx("text-sm mt-1")}
				>
					{history.amount}
				</div>
			</div>
		</div>
	)
}

function Progress({ currentXp, percent, level, clss }) {
	const router = useRouter()

	return (
		<div className="relative pt-1">
			<div className="flex items-center justify-between mb-2">
				<div>
					<span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 uppercase bg-blue-200 rounded-full">
						{currentXp} XP
					</span>
				</div>
				<div
					className="text-right"
					onClick={() => router.push(`/levelling/${clss.index}/${level + 1}`)}
				>
					<span className="inline-block text-xs font-semibold text-blue-600">
						{percent}%
					</span>
				</div>
			</div>
			<div className="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
				<div 
					style={{ width: `${percent}%` }} 
					className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"
				/>
			</div>
		</div>
	)
}

function CharacterLevelling() {
	const router = useRouter()
	const { showLevellingAddScreenAsModal } = useLevellingAddScreenAsModal()
	const { character, characterDispatch } = useCurrentCharacter()

	function onAddLevelling(label, amount) {
		characterDispatch(actionAddXp(label, amount))
	}

	// define character on context
	// automatic filtering for the character
	return (
		<CharacterProvider character={character}>
			<Screen
				title="Levelling"
				titleIcon={<IconTrendingUp className="w-7 h-7 text-slate-700" />}
				root
				rightAction={
					<Button 
						variant="outlined" 
						size="small" 
						// color="success" 
						onClick={() => showLevellingAddScreenAsModal(onAddLevelling)}
						className="items-center w-6 h-6 rounded-full text-slate-600 border-slate-600">
						<IconPlus className="w-4 h-4" />
					</Button>
				}
				isLoading={!character}
				withCharacterMenu
			>
				{character && <>
					<div 
						className="flex justify-between mt-2" 
						onClick={() => router.push(`/levelling/${character.classes[0].index}/${character.level}`)}
					>
						<div className="flex items-center justify-center w-full">
							<div className="flex items-center justify-center w-16 h-16 text-xl border-2 border-blue-400 border-solid rounded-full shadow-md">
								{character.level}
							</div>
						</div>
					</div>

					<div className="px-4" style={{ marginTop: -20 }}>
						<Progress
							level={character.level}
							clss={character.classes[0]}
							currentXp={character.levelling.xp}
							nextLevelXp={character.levelling.nextLevelXp}
							percent={character.levelling.percent}
						/>
					</div>

					{/* // - ask user to level up its character (popup screen) -> Yes - Later */}
					{character.levelling.shouldLevelUp && (
						<div className="mt-4 px-4">
							<Link to="/level-up/introduction" passHref>
								<Button variant="contained" color="info">
									Monter au niveau {character.level + 1}
								</Button>
							</Link>
						</div>
					)}

					<div className="mt-8">
						<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Historique</h3>
						<div className="mt-2 divide-y divide">
							{character.levelling.history.map(history => (
								<HistoryLine key={history.id} history={history} />
							))}
						</div>
					</div>
				</>}
			</Screen>
		</CharacterProvider>
	)
}

export default CharacterLevelling