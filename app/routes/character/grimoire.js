import isEmpty from "lodash/isEmpty"
import groupBy from "lodash/groupBy"
import map from "lodash/map"
import { Link } from "@remix-run/react"
import useI18n from "../../modules/i18n/useI18n"
import Screen from "~/components/Screen"
import useCurrentCharacter from "~/components/useCurrentCharacter"
import IconBookOpen from "~/components/icons/IconBookOpen"
import IconPlus from "~/components/icons/IconPlus"
import IconMagicSchool from "~/components/icons/IconMagicSchool"
import SpellRunner from "~/components/SpellRunner"
import useTipConcentration from "~/components/useTipConcentration"
import useTipRitual from "~/components/useTipRitual"
import Tag from "~/components/Tag"
import clsx from "clsx"
import useEditSpellSlotsScreenAsModal from "~/components/useEditSpellSlotsScreenAsModal"
import { actionEditSpellSlots } from "../../modules/character/action"
import CharacterSpellSource from "~/components/CharacterSpellSource"
import CharacterSpellTag from "~/components/CharacterSpellTag"

function Spell({ spell, character /*onSelect*/ }) {
	const { tr } = useI18n();
	const { showTipConcentration } = useTipConcentration()
	const { showTipRitual } = useTipRitual()

	// TODO: if context character has the spell -> style with star / background

	return (
		<div
			// onClick={onSelect}
			className={`cursor-pointer py-2 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
			data-cy-spell-index={`spell-${spell.index}`}
		>
			<div className="pl-3">
				<div className="flex flex-row">
					<div className="flex flex-col flex-1">
						<Link to={`/character/spells/${spell.index}`} >
							<span className="flex flex-row items-center font-semibold">
								{/* <IconMagicSchool
              school={spell.school.name}
              className="h-6 w-7 text-slate-700"

            /> */}
								<p>{tr(spell.nameLocalized)}</p>
							</span>
						</Link>
						<div className="text-sm text-meta">
							{tr(spell.castingTime)} - {tr(spell.duration)}
						</div>
					</div>

					<div
						className="pr-2 mt-1"
					>
						<div className="flex flex-row items-end gap-1">
							{spell.isPrepared && (
								<CharacterSpellTag character={character} spell={spell} />
							)}

							<IconMagicSchool
								school={spell.school.name}
								className="h-6 pt-1 w-7 text-slate-700"
							/>

						</div>
					</div>

				</div>

				{/* - + modifier
				- Save DC
				- time
				- hit dc
				- effect */}
				<div>

					{spell.damage?.type && (
						<Tag
							size="small"
							className="mr-2 border text-slate-700 border-slate-700"
						>
							<SpellRunner contextCharacter={character} spell={spell} hideCasting />
						</Tag>
					)}

					{spell.ritual && ( // TODO: tip
						<Tag
							label="Ritual"
							size="small"
							className="mr-2 text-orange-500 border border-orange-500"
							onClick={() => showTipRitual()}
						/>
					)}
					{spell.concentration && (
						<Tag
							label="Concentration"
							size="small"
							className="mr-2 text-blue-500 border border-blue-500"
							onClick={() => showTipConcentration()}
						/>
					)}

					<CharacterSpellSource character={character} spell={spell} />
				</div>

				<Link to={`/character/spells/${spell.index}`} >
					<p className="pt-2 pr-2 text-sm">{tr(spell.resume)}</p>
				</Link>
			</div>
		</div>
	);
}

function SpellLevelHeader({ level, spellsSlots, characterDispatch }) {
	const { showEditSpellSlotsScreenAsModal } = useEditSpellSlotsScreenAsModal()
	const spellSlot = spellsSlots.find(spell => spell.spellLevel === level)

	return (
		<div className="flex items-center py-1 mx-2 my-2 border-b border-solid border-slate-200">
			<div className="flex flex-1 font-semibold">
				{level === 0 ? 'Cantrip' : `Niveau ${level}`}
			</div>
			<div>
				{level !== 0 && (
					<div
						className="flex"
						onClick={() => showEditSpellSlotsScreenAsModal({
							spellSlot,
							onEdit: data => characterDispatch(actionEditSpellSlots(data))
						})}
					>
						{spellSlot.hasNoSlotsToDisplay && (
							// TODO: tip
							<>0 slot disponible</>
						)}
						{([...Array(spellSlot.totalSlotsToDisplay)]).map((_, index) => (
							<div
								key={index}
								className={clsx("w-3 h-3 mr-1", {
									"bg-red-400": index < spellSlot.usedSlots,
									"border border-solid border-slate-400": index >= spellSlot.usedSlots,
								})}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

function Grimoire() {
	const character = useCurrentCharacter()

	const groupedBySpellLevel = groupBy(character?.spellsList, spell => spell.level)
	const spellsSlots = character?.spellsSlots

  // TODO: display number of spells that could be learned -> number of unprepared spells?

	return (
		<Screen
			title={`${character?.name} - Grimoire`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			root
			withCharacterMenu
			withBottomSpace
			// rightAction={
			// 	<button
			// 	 // TODO:
			// 		onClick={() => {
			// 		}}
			// 	>
			// 		<IconPlus className={"h-6 w-6 text-slate-800"} />
			// 	</button>
			// }
		>
			{character && (
				<div>
					<div className="text-center">
						<Tag>
							Spellcasing ability: 
							<span>&nbsp;</span>
							{character.spellcastingAbilityValue >= 0 ? '+' : ''}{character.spellcastingAbilityValue}
							<span>&nbsp;</span>
							<span className="text-xs text-meta">{character.spellcastingAbility}</span>
						</Tag>

						<Tag>
							Spell Attack bonus: {character.spellAttackBonus >= 0 ? '+' : ''}{character.spellAttackBonus}
						</Tag>

						<Tag>
							Spell DC: {character.spellSaveDC}
						</Tag>

						{/* TODO: list prepared count + subclass always prepared */}
						<Tag>
							Cantrips kwown: {character.spellcasting.cantripsKnown}
						</Tag>
					</div>
					{isEmpty(character?.spellsList) && (
						<div className="px-4 mt-12">
							<p className="prose text-center text-lg">
								{`Vous n'avez pas encore appris de sorts.`}
								<br />
								Retrouvez les sorts disponibles dans la <Link to="/character/spells">liste des sorts</Link>.
							</p>
						</div>
					)}
					<div className="flex flex-col gap-2" data-cy-id="spells-list">
						{map(groupedBySpellLevel, (spells, level) => (
							<div key={level}>
								<>
									<SpellLevelHeader
										level={Number(level)}
										spellsSlots={spellsSlots}
										characterDispatch={characterDispatch}
									/>
								</>
								{spells.map(spell =>
									<Spell
										key={spell.index}
										spell={spell}
										character={character}
									/>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</Screen>
	)
}

export default Grimoire