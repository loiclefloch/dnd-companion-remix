import { actionLevellingAbilityScoreImprovementFeat } from "./action"
import { useState, useMemo } from "react"
import { get, set } from "lodash"
import useStepScreenAsModal, { ScreenStep, useScreenStep } from "~/components/useStepScreenAsModal"
import ListSelector from "~/components/ListSelector";
import useFeatScreenAsModal from "~/components/useFeatScreenAsModal"
import { makeI18n } from "../../modules/i18n/useI18n"
import FeatContent, { FeatPrerequisites } from "../FeatContent"
import ButtonBottomScreen from "../ButtonBottomScreen"
import useFeats from "../../modules/api/useFeats"
import filterFeatsForCharacter from "../../modules/character/filterFeatsForCharacter"
import Section from "~/components/Section"
import AbilityImportanceForClass from "~/components/AbilityImportanceForClass"

const useI18n = makeI18n({

	'chooseSpellToLearn': {
		fr: `Choisissez des sorts à apprendre`,
		en: `Choose spells to learn`,
	},
	'chooseAbilityToIncrease': {
		fr: `Choisissez une capacité à augmenter`,
		en: `Choose an ability to increase`,
	},
					
	'feat.configuration.title': {
		fr: `Configuration de votre talent`,
		en: `Configure feat`,
	},
	'feat.configuration.explain': {
		fr: `Suivez le guide ! Nous vous aiderons pas à pas.`,
		en: `Follow the guide! We will help you, step by step`,
	},
	'feat.noConfiguration.title': {
		fr: `Pas de configuration spécifique pour ce talent`,
		en: `No specific configuration pour this feat`,
	},
	'feat.noConfiguration.explain': {
		fr: `Il n'y as rien à configurer, vous pouvez continuer !`,
		en: `There is nothing to configure, you can move on!`,
	},
	'chooseXLanguages': {
		fr: `Choisissez %{choose} langues`,
		en: `Choose %{choose} languages`,
	},
			
	'abilityOption.title': {
		fr: `%{feat.name} - Augmentation de la capacité`,
		en: `%{feat.name} - Increase ability`,
	},
	'spellOptions.title': {
		fr: `%{feat.name} - Choix des sorts`,
		en: `%{feat.name} - Choose spells`,
	},
	'featuresOptions.title': {
		fr: `%{feat.name} - Choix des capacités`,
		en: `%{feat.name} - Choose features`,
	},
	'languagesOptions.title': {
		fr: `%{feat.name} - Choix des langues`,
		en: `%{feat.name} - Choose languages`,
	},
})

function spellIsValid(spellOption, value) {
	if (!value) {
		return false
	}
	return value.spells.length === spellOption.choose
}

function spellsIsValid(spellsOptions, selectedOption) {
	if (!selectedOption) {
		return false
	}

	return spellsOptions.every((spellOption, index) => {
		const value = get(selectedOption, index, null)
		return spellIsValid(spellOption, value)
	})
}


function SpellOption({ spellOption, setSelectedOption, character, selectedOption }) {
	return (
		<ListSelector
			multiple
			value={selectedOption?.spells}
			nbMaxValues={spellOption.choose}
			onChange={spells => setSelectedOption({ spells })}
			options={spellOption.from.map(spell => {
				const alreadKnown = character.spellsList.some(s => s.index === spell.index)
				return {
					label: spell.name,
					key: spell.index,
					value: spell,
					selected: selectedOption?.spells?.some(s => s.index === spell.index),
					disabled: alreadKnown,
				}
			})}
		/>
	)
}

function SpellOptions({
	onNext,
	spellOptions,
	character,
	selectedOption = [],
	setSelectedOption,
}) {
	const { tr } = useI18n()
	const isValid = spellsIsValid(spellOptions, selectedOption)

	return (
		<div className="px-4 mt-4 prose">
			<h3>{tr`chooseSpellToLearn`}</h3>

			{spellOptions.map((spellOption, index) => {
				const value = get(selectedOption, index, { spells: [] })
				// const isValid = spellIsValid(spellOption, value)
				return (
					<Section 
						key={index}
						screen={index}
						title={`Choix de sort ${index + 1}`}
						withToggle
					>
						<SpellOption
							screen={index}
							spellOption={spellOption}
							selectedOption={value}
							character={character}
							setSelectedOption={(value) => {
								const updated = [...selectedOption]
								set(updated, index, value)
								setSelectedOption(updated)
							}}
						/>
					</Section>
				)
			})}

			<ButtonBottomScreen
				variant="cta"
				disabled={!isValid}
				hide={!isValid}
				onClick={() => {
					onNext()
				}}
			>
				{tr`continue.action`}
			</ButtonBottomScreen>
		</div>
	)
}

function AbilityOption({
	character,
	onNext,
	abilityOption,
	selectedOption,
	setSelectedOption,
}) {
	const { tr } = useI18n()

	return (
		<div className="px-4 mt-4 prose">
			<h3>{tr`chooseAbilityToIncrease`}</h3>

			<ListSelector
				value={selectedOption?.abilities}
				multiple
				nbMaxValues={abilityOption.choose}
				onChange={abilities => setSelectedOption({ abilities })}
				options={abilityOption.from.map(abilityOption => ({
					label: <div className="flex items-center">
						<AbilityImportanceForClass 
							className="w-4 h-4"
							clss={character.clss} 
							ability={abilityOption.ability.name} 
						/>
						<div className="pl-4">
							+ {abilityOption.bonus} {abilityOption.ability.name}
						</div>
					</div>,
					key: abilityOption.ability.name,
					value: abilityOption,
					selected: selectedOption?.abilities?.some(v => v.ability.name === abilityOption.ability.name)
				}))}
			/>

			<ButtonBottomScreen
				variant="cta"
				disabled={!selectedOption}
				hide={!selectedOption}
				onClick={() => {
					onNext()
				}}
			>
				{tr`continue.action`}
			</ButtonBottomScreen>
		</div>
	)
}

function featureIsValid(featureOption, value) {
	if (!value) {
		return false
	}
	return value.features.length === featureOption.choose
}

function featuresIsValid(featuresOptions, selectedOption) {
	if (!selectedOption) {
		return false
	}

	return featuresOptions.every((featureOption, index) => {
		const value = get(selectedOption, index, null)
		return featureIsValid(featureOption, value)
	})
}

function FeatureOption({ featureOption, setSelectedOption, character, selectedOption }) {
	return (
		<ListSelector
			multiple
			nbMaxValues={featureOption.choose}
			onChange={features => setSelectedOption({ features })}
			options={featureOption.from.map(featuresOption => {
				const alreadKnown = character.features?.some(f => f.index === featuresOption.index)

				return {
					label: featuresOption.name,
					key: featuresOption.name,
					value: featuresOption,
					selected: selectedOption?.features?.some(v => v.name === featuresOption.name),
					disabled: alreadKnown,
				}
			})}
		/>
	)
}

function FeaturesOptions({
	featuresOptions,
	character,
	selectedOption = [],
	setSelectedOption,
	onNext,
}) {
	const isValid = featuresIsValid(featuresOptions, selectedOption)

	return (
		<div className="px-4 mt-4 prose">
			{featuresOptions.map((featureOption, index) => {
				const value = get(selectedOption, index, { features: [] })
				// const isValid = featureIsValid(featureOption, value)
				return (
					<Section
						key={index}
						screen={index}
						title={`Choix de la capacité ${index + 1}`}
						withToggle
					>
						<FeatureOption
							screen={index}
							featureOption={featureOption}
							selectedOption={value}
							character={character}
							setSelectedOption={(value) => {
								const updated = [...selectedOption]
								set(updated, index, value)
								setSelectedOption(updated)
							}}
						/>
					</Section>
				)
			})}


			<ButtonBottomScreen
				variant="cta"
				disabled={!isValid}
				hide={!isValid}
				onClick={() => {
					onNext()
				}}
			>
				{tr`continue.action`}
			</ButtonBottomScreen>
		</div>
	)
}

// linguist
function LanguagesOptions({
	languagesOptions,
	selectedOption,
	setSelectedOption,
	character,
	onNext,
}) {
	const isValid = selectedOption?.languages?.length === languagesOptions.choose

	return (
		<div className="px-4 mt-4 prose">
			<h3>{tr`chooseXLanguages`}</h3>

			<ListSelector
				multiple
				value={selectedOption?.languages}
				nbMaxValues={languagesOptions.choose}
				onChange={languages => setSelectedOption({ languages })}
				options={languagesOptions.from.map(languageOption => {
					const alreadyKnown = character.languages.includes(languageOption.index)
					return {
						label: languageOption.name,
						key: languageOption.name,
						value: languageOption.index,
						selected: selectedOption?.languages?.includes(languageOption.index),
						disabled: alreadyKnown
					}
				})}
			/>

			<ButtonBottomScreen
				variant="cta"
				disabled={!isValid}
				hide={!isValid}
				onClick={() => {
					onNext()
				}}
			>
				{tr`continue.action`}
			</ButtonBottomScreen>
		</div>
	)
}

function FeatScreens({ feat, character, step, levellingDispatch }) {
	const [selectedOptions, setSelectedOptions] = useState({})
	const { tr } = useI18n()
	const { next, isLastStep, onCloseScreen } = useScreenStep()

	function onFinish() {
		levellingDispatch(actionLevellingAbilityScoreImprovementFeat({
			step,
			feat: feat,
			selectedOptions
		}))
		onCloseScreen()
	}

	function onNext() {
		if (isLastStep) {
			onFinish()
		} else {
			next()
		}
	}

	return (
		<>
			<ScreenStep
				screen="intro"
				title={feat.name}
			>

				<FeatContent feat={feat} />

				<ButtonBottomScreen
					variant="cta"
					onClick={() => {
						next()
					}}
				>
					{tr`continue.action`}
				</ButtonBottomScreen>
			</ScreenStep>

			{!feat.hasOption &&
				<ScreenStep
					screen="noOption"
					title={`${feat.name} - Configuration`}
				>
					<div className="prose text-center">
						<h3>{tr`feat.noConfiguration.title`}</h3>

						<p>{tr`feat.noConfiguration.explain`}</p>
					</div>

					<ButtonBottomScreen
						variant="cta"
						onClick={() => {
							onFinish()
						}}
					>
						{tr`continue.action`}
					</ButtonBottomScreen>
				</ScreenStep>
			}

			{feat.hasOption &&
				<ScreenStep
					screen="optionIntro"
					title={`${feat.name} - Configuration`}
				>
					<div className="prose text-center">
						<h3>{tr`feat.configuration.title`}</h3>

						<p>{tr`feat.configuration.explain`}</p>
					</div>

					<ButtonBottomScreen
						variant="cta"
						onClick={() => {
							next()
						}}
					>
						{tr`continue.action`}
					</ButtonBottomScreen>
				</ScreenStep>
			}

			{feat.hasAbilityOption && (
				<ScreenStep
					screen="abilityOption"
					title={tr('abilityOption.title', { 'feat.name': feat.name })}
				>
					<AbilityOption
						character={character}
						abilityOption={feat.abilityOption}
						selectedOption={selectedOptions?.abilityOption}
						setSelectedOption={(abilityOption) => setSelectedOptions({ ...selectedOptions, abilityOption })}
						onNext={onNext}
					/>
				</ScreenStep>
			)}

			{feat.hasSpellOptions && (
				<ScreenStep
					screen="spellOptions"
					title={tr('spellOptions.title', { 'feat.name': feat.name })}
				>
					<SpellOptions
						spellOptions={feat.spellOptions}
						selectedOption={selectedOptions?.spellOptions}
						character={character}
						setSelectedOption={(spellOptions) => setSelectedOptions({ ...selectedOptions, spellOptions })}
						onNext={onNext}
					/>
				</ScreenStep>
			)}

			{feat.hasFeaturesOptions && (
				<ScreenStep
					screen="featuresOptions"
					title={tr('featuresOptions.title', { 'feat.name': feat.name })}
				>
					<FeaturesOptions
						featuresOptions={feat.featuresOptions}
						selectedOption={selectedOptions?.featuresOptions}
						character={character}
						setSelectedOption={(featuresOptions) => setSelectedOptions({ ...selectedOptions, featuresOptions })}
						onNext={onNext}
					/>
				</ScreenStep>
			)}

			{feat.hasLanguageOptions && (
				<ScreenStep
					screen="languagesOptions"
					title={tr('languagesOptions.title', { 'feat.name': feat.name })}
				>
					<LanguagesOptions
						languagesOptions={feat.languagesOptions}
						selectedOption={selectedOptions?.languagesOptions}
						character={character}
						setSelectedOption={(languagesOptions) => setSelectedOptions({ ...selectedOptions, languagesOptions })}
						onNext={onNext}
					/>
				</ScreenStep>
			)}
		</>
	)
}

export function useFeatStepScreenAsModal() {
	const { openScreenStep } = useStepScreenAsModal()

	return {
		openFeatStepScreenAsModal: ({
			step,
			feat,
			character,
			levellingDispatch,
		}) => {
			openScreenStep({
				view: FeatScreens,
				viewProps: {
					step,
					character,
					feat,
					levellingDispatch,
				},
				steps: [
					'intro',
					feat.hasOption && 'optionIntro',
					!feat.hasOption && 'noOption',
					feat.hasAbilityOption && "abilityOption",
					feat.hasSpellOptions && "spellOptions",
					feat.hasFeaturesOptions && "featuresOptions",
					feat.hasLanguageOptions && "languagesOptions",
				].filter(Boolean),
			})
		}
	}
}

export function FeatSelector({ selectedFeat, setSelectedFeat, character }) {
	const { tr } = useI18n()
	const featsResponse = useFeats()
	const { showFeatScreenAsModal } = useFeatScreenAsModal()

	const feats = useMemo(() => filterFeatsForCharacter(featsResponse.data, character)
		// TODO: only on dev
		.filter(f => process.env.NODE_ENV !== 'development' ? true : ['alert', 'fey-touched', 'linguist', 'fighting-initiate'].includes(f.index)),
		[character, featsResponse.data]
	)

	/* TODO: learn more */
	/* TODO: disabled feats already on character */
	/* TODO: disable feats that cannot be used for the character */
	/* TODO: some feats makes us select a +1 ability, we should display the option + save the data somewhere */
	return (
		<ListSelector
			className="px-0"
			value={selectedFeat}
			options={feats?.map(feat => {
				const selected = feat.index === selectedFeat?.index

				return {
					label: (
						<div className="pb-2">
							{tr(feat.nameLocalized)}
							<div className="text-meta text-sm">{feat.resume}</div>
							{feat.hasPrerequisites && (
								<div className="mt-2">
									<FeatPrerequisites feat={feat} />
								</div>
							)}
						</div>
					),
					value: feat,
					selected,
					rightView: <div
						className="px-4 py-2 text-xs text-meta"
						onClick={() => showFeatScreenAsModal(feat.index)}
					>
						?
					</div>
				}
			})}
			onChange={setSelectedFeat}
		/>
	)
}