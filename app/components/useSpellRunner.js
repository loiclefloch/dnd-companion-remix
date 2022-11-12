import clsx from "clsx"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useCharacterLevelSelector from "./useCharacterLevelSelector"
import useSpellLevelSelector from "./useSpellLevelSelector"
import { makeI18n } from '~/modules/i18n/useI18n'
import ButtonBottomScreen from "./ButtonBottomScreen"
import DamageTypeLabel from "./DamageTypeLabel"
import IconPlusMd from "./icons/IconPlusMd"
import IconMinusMd from "./icons/IconMinusMd"
import { CharacterProvider } from "~/modules/character/ContextCharacter"
import useDice from "./useDice"
import useCurrentCharacter from "~/components/useCurrentCharacter"
import { actionCastSpell } from "~/modules/character/action"

const MAX_SPELL_LEVEL = 9 // maximum spell level
const MAX_CHARACTER_LEVEL = 20 // maximum character level

const useI18n = makeI18n({

	'hasNoRemainingSlots': {
		fr: `Il ne vous reste pas de slot de sort de niveau %{spellLevel} disponible pour lancer ce sort`,
		en: `You don't have a spell slot of level %{spellLevel} available to cast this spell`,
	},
	'will use slot of spell level': {
		fr: `Ce sort utilisera un emplacement de sort de niveau %{spellLevel}`,
		en: `This spell will use a spell slot of level %{spellLevel}`,
	},
	'remaining.singular': {
		fr: `%{amount} restant`,
		en: `%{amount} remaining`,
	},
	'remaining.plural': {
		fr: '%{amount} restants',
		en: '%{amount} remaining',
	},
	'cantrip': {
		fr: `Cantrip.`,
		en: `Cantrip.`,
	},
	'no slots used': {
		fr: `Aucun emplacement de sort ne sera utilisé.`,
		en: `No spell slot will be used.`,
	},
	'castSpell.action': {
		fr: `Lancer le sort`,
		en: `Cast spell`,
	},
	'dice above maximum level warning': {
		en: "The dice are for a level above your maximum level",
		fr: "Les dés sont pour un niveau supérieur à votre niveau",
	},
	'spell level': {
		fr: `Niveau du sort`,
		en: `Spell level`,
	},
	'character level': {
		fr: `Niveau du personnage`,
		en: `Character level`,
	},
	'dice above character level':{
		fr: "Les dés sont pour un niveau supérieur à votre niveau",
		en: "The dice are for a level above your maximum level",
	},
	'spell level': {
		fr: `Niveau de sort`,
		en: `Spell level`,
	},
	'dice above character spell level maximum': {
		en: "The dice are for a level above the character spell maximum level",
		fr: "Les dés sont pour niveau supérieur à votre maximum",
	}, 
	'no action spell': {
		fr: `Aucun lancé de dé requis`,
		en: `No dice throw required`,
	},
})

function Button({ label, onClick }) {
	return <div className="px-2 text-lg cursor-pointer" onClick={onClick}>{label}</div>
}

function ChooseNumber({ level, onChange, maxLevel, label = '', isCharacter }) {
	const isAboveMaximum = level > maxLevel

	return (
		<div className="flex flex-col items-center select-none">
			<div className="text-lg">{label}</div>
			<div className="flex items-center justify-center mt-6">
				<Button 
					size="big" 
					label={<IconMinusMd className="w-8 h-8" />} 
					onClick={() => onChange(Math.max(level - 1, isCharacter ? 1 : 1))} 
				/>
				<div 
					className={clsx("text-3xl px-4", {
						"text-orange-400": isAboveMaximum
					})}
				>
					{level}
				</div>
				<Button 
					size="big" 
					label={<IconPlusMd className="w-8 h-8" />} 
					onClick={() => onChange(Math.min(level + 1, isCharacter ? MAX_CHARACTER_LEVEL : MAX_SPELL_LEVEL))} 
				/>
			</div>
		</div>
	)
}

function Warn({ show, message }) {
	if (!show) {
		return null
	}

	return (
		<div className="text-orange-400">
			<h4 className="text-xl font-semibold">{tr`are you sure?`}</h4>
			<p className="p-4 px-8">{message}</p>
		</div>
	)
}

function RunnerBlock({ dice, contextCharacter, spellLevel, chooser, message, onRun }) {
	const { tr } = useI18n()
	const spellSlot = contextCharacter?.spellsSlots?.find(spell => spell.level === spellLevel)
	
	const remainingSlots = contextCharacter && spellSlot && spellSlot.remainingSlots || 0
	const hasNoRemainingSlots = remainingSlots <= 1

	return (
		<div className="flex flex-col justify-center flex-1 mt-12 align-center">
			<div className="text-2xl font-semibold">
				{dice}
			</div>

			<div className="mt-12 text-center">
				{message}
				{contextCharacter && hasNoRemainingSlots &&  // TODO: tip
					<p className="px-6 text-orange-600">
						{tr('hasNoRemainingSlots', { spellLevel })}
					</p>
				}
			</div>

			<div className="flex flex-col justify-end flex-1">
			

				<div className="flex flex-col items-center justify-end mb-20 text-xl">
					{chooser}
				</div>

				<div className="justify-end mb-0 text-center">
					{spellLevel !== 0 && spellLevel ? (
						<>
							<p>{tr('will use slot of spell level', { spellLevel })}</p>
							{contextCharacter &&
								<p>({remainingSlots === 1 ? tr('remaining.singular', { amount: remainingSlots }) : tr('remaining.plural', { amount: remainingSlots })})</p>
							}
						</>
					) : (
						<>
							<p>{tr`cantrip`}</p>
							<p>{tr`no slots used`}</p>
						</>
					)}
				</div>
			</div>

			<ButtonBottomScreen
				onClick={() => onRun()}
				variant="cta"
			>
				{tr`castSpell.action`}
			</ButtonBottomScreen>
		</div>
	)
}

function DiceDamage({ dice, damageType }) {
	return (
		<div className="flex flex-col items-center">
			<div>{dice}</div>
			<div className="mt-1">
				<DamageTypeLabel damageType={damageType} />
			</div>
		</div>
	)
}

function DiceHeal({ dice }) {
	return (
		<div className="flex flex-col items-center">
			<div>
				{dice}
				<span> </span>
				<span>PV</span>
			</div>
		</div>
	)
}

// http://localhost:3000/character/spells/aid
// http://localhost:3000/character/spells/healing-word -> MOD
function HealRunner({ 
	spellName, 
	healAtSlotLevel, 
	spellLevel, 
	contextCharacter,
	formatMod,
	onRun, 
}) {
	const { tr } = useI18n()
	const { rollHeal } = useDice()
	const {
		chosenSpellLevel,
		setSpellLevel,
		maxSpellLevel,
		isAboveMaximumSpellLevel
		// characterInContext, To use?
	} = useSpellLevelSelector(spellLevel)

	const shouldWarn = isAboveMaximumSpellLevel

	const modifier = 0 // TODO: spell modifier

	const dice = formatMod(healAtSlotLevel[chosenSpellLevel])

	// TODO: Aid is not a dice but a fix value
	// NOTE: "Aid is per character level" case does not exists yet on the spell list.
	return (
		<RunnerBlock
			contextCharacter={contextCharacter}
			spellLevel={spellLevel}
			dice={
				<DiceHeal
					dice={dice}
				/>
			}
			chooser={
				<ChooseNumber
					label={tr`character level`}
					isCharacter
					level={chosenSpellLevel}
					onChange={setSpellLevel}
					maxLevel={maxSpellLevel}
				/>
			}
			message={shouldWarn && (
				<div className="text-orange-400">
					<Warn
						show={shouldWarn}
						message={tr`dice above character level`}
					/>
				</div>
			)}
			onRun={() => {
				debugger
				rollHeal(spellName, dice, modifier)
				onRun(chosenSpellLevel)
			}}
		/>
	)
}

function DamageSlotLevel({ 
	spellName, 
	spellLevel, 
	damageAtSlotLevel, 
	damageType,
	contextCharacter,
	onRun, 
	formatMod,
}) {
	const { tr } = useI18n()
	const { rollDamage } = useDice()
	const {
		chosenSpellLevel,
		setSpellLevel,
		maxSpellLevel,
		isAboveMaximumSpellLevel,
		// characterInContext, To use?
	} = useSpellLevelSelector(spellLevel)

	const modifier = 0 // TODO: spell modifier
	const shouldWarn = isAboveMaximumSpellLevel

	const dice = formatMod(damageAtSlotLevel[chosenSpellLevel])

	return (
		<RunnerBlock
			contextCharacter={contextCharacter}
			spellLevel={chosenSpellLevel}
			dice={
				<DiceDamage
					dice={dice}
					damageType={damageType}
				/>
			}
			chooser={
				<ChooseNumber
					label={tr`spell level`}
					level={chosenSpellLevel}
					onChange={setSpellLevel}
					maxLevel={maxSpellLevel}
				/>
			}
			message={
				<div>
					<Warn
						show={shouldWarn}
						message={tr`dice above character spell level maximum`}
					/>
				</div>
			}
			onRun={() => {
				rollDamage(spellName, dice, modifier, damageType)
				onRun(chosenSpellLevel)
			}}
		/>
	)
}

// http://localhost:3000/character/spells/chill-touch
function DamageCharacterLevel({ 
	spellName, 
	spellLevel,
	damageAtCharacterLevel, 
	damageType, 
	characterLevel: defaultCharacterLevel,
	contextCharacter,
	onRun, 
	formatMod,
}) {
	const { tr } = useI18n()
	const { rollDamage } = useDice()
	const {
		characterLevel,
		setCharacterLevel,
		isAboveMaximumCharacterLevel,
		characterMaxLevel,
		// characterInContext, To use?	
	} = useCharacterLevelSelector(defaultCharacterLevel)

	const modifier = 0 // TODO: spell modifier
	const shouldWarn = isAboveMaximumCharacterLevel

	const dice = formatMod(damageAtCharacterLevel[characterLevel])
	
	return (
		<RunnerBlock
			contextCharacter={contextCharacter}
			spellLevel={spellLevel}
			dice={
				<DiceDamage
					dice={dice}
					damageType={damageType}
				/>
			}
			chooser={
				<ChooseNumber
					label={tr`spell level`}
					level={characterLevel}
					onChange={setCharacterLevel}
					maxLevel={characterMaxLevel}
				/>
			}
			message={shouldWarn && (
				<div>
					<Warn
						show={shouldWarn}
						message={tr(`dice above maximum level warning`)}
					/>
				</div>
			)}
			onRun={() => {
				const modifier = ''
				rollDamage(spellName, dice, modifier, damageType)
				onRun(spellLevel)
			}}
		/>
	)
}

function SpellRun({ contextCharacter, spell, options, onRun }) {
	const { tr } = useI18n()

	const spellLevel =	options?.level || spell.level

	function formatMod(dice) {
		if (contextCharacter) {
			return dice.replaceAll("MOD", contextCharacter.spellcastingAbilityValue)
		}
		return dice
	}

	if (spell.heal) {
		return (
			<HealRunner
				spellName={tr(spell.nameLocalized)}
				healAtSlotLevel={spell.heal.healAtSlotLevel}
				spellLevel={spellLevel}
				contextCharacter={contextCharacter}
				onRun={onRun}
				formatMod={formatMod}
			/>
		)
	}

	if (spell.damage && spell.damage.damageAtSlotLevel) {
		return (
			<DamageSlotLevel
				spellName={tr(spell.nameLocalized)}
				spellLevel={spellLevel}
				damageAtSlotLevel={spell.damage.damageAtSlotLevel}
				damageType={spell.damage.type}
				contextCharacter={contextCharacter}
				onRun={onRun}
				formatMod={formatMod}
			/>
		)
	}

	if (spell.damage && spell.damage.damageAtCharacterLevel) {
		return (
			<DamageCharacterLevel
				spellName={tr(spell.nameLocalized)}
				spellLevel={spell.level}
				characterLevel={options?.level ?? contextCharacter?.level ?? 1}
				damageAtCharacterLevel={spell.damage.damageAtCharacterLevel}
				damageType={spell.damage.type}
				contextCharacter={contextCharacter}
				onRun={onRun}
				formatMod={formatMod}
			/>
		)
	}

	if (!contextCharacter) {
		// display nothing since there is no dice to run, only character spell slots to impact
		return (
		<div className="mt-8">
				<div className="text-center">
					{tr('no action spell')}
				</div>
				<div className="p-4">
					{tr(spell.resume)}
				</div>
		</div>
		)
	}

	return (
		<RunnerBlock
			onRun={() => onRun(spellLevel)}
		/>
	)
}

function SpellRunnerScreenAsModal({ contextCharacter, spell, options, onCloseScreen }) {
	const { tr } = useI18n()
	const { characterDispatch } = useCurrentCharacter()

	function onRun(spellLevel) {
		// TODO: impact spell slot from contextCharacter if given
		characterDispatch(actionCastSpell(spell, spellLevel))
		onCloseScreen()
	}

	return (
		<ScreenAsModal title={``} onCloseScreen={onCloseScreen} withBottomSpace>
			<CharacterProvider character={contextCharacter}>
				<div className="flex flex-col h-full">
					<h2 className="mt-8 text-2xl font-semibold text-center">
						{tr(spell.nameLocalized)}
					</h2>
					<SpellRun 
						spell={spell} 
						contextCharacter={contextCharacter} 
						options={options}
						onRun={onRun} 
					/>
				</div>
			</CharacterProvider>
		</ScreenAsModal>
	)
}

export default function useSpellRunner() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showSpellRunner: (spell, contextCharacter, options) => {
			showScreenAsModal(SpellRunnerScreenAsModal, { spell, contextCharacter, options })
		}
	}
}
