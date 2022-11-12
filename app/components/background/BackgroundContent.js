import acolyte from "./acolyte.mdx"
import criminal from "./criminal.mdx"
import folkHero from "./folk-hero.mdx"
import sage from "./sage.mdx"
import soldier from "./soldier.mdx"
import entertainer from "./entertainer.mdx"

import Section from "../Section"
import LineInfo from "../LineInfo"
import { makeI18n } from "../../modules/i18n/useI18n"
import useTipProficiency from "../useTipProficiency"
import useEquipmentItemScreenAsModal from "../useEquipmentItemScreenAsModal"
import useTipLanguage from "../useTipLanguage"
import StartingEquipmentOptionsDetail from "../StartingEquipmentOptionsDetail"

const useI18n = makeI18n({
	'goodForClasses.title': {
		fr: `Recommandé pour`,
		en: `Recommanded for`,
	},
})

function Content({ index }) {
	const { tr } = useI18n()
	const background = null // TODO: remix
	const { showTipProficiency } = useTipProficiency()
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	const { showTipLanguage } = useTipLanguage()

	// TODO: display data
	// - starting_currencies
	return (
		<>
			<Section title={tr`goodForClasses.title`}>
				<LineInfo.Parent>
					{background.goodForClasses.map(c => (
						<LineInfo key={c.index} label={c.name} />
					))}
				</LineInfo.Parent>
			</Section>

			<Section title={tr`features.title`} withToggle>
				{background.features.map((feature, index) => (
					<div key={index} className="prose mb-4">
						<h3>{feature.name}</h3>
						<p>{tr(feature.desc)}</p>
					</div>
				))}

			</Section>

			<Section title={tr`startingProficiencies.title`} withToggle>
				<LineInfo.Parent>
					{background.startingProficiencies.map(proficiency => (
						<LineInfo 
							key={proficiency.index}
							label={proficiency.name}
							value={<span>?</span>}
							onClick={() => showTipProficiency(proficiency)}
						/>
					))}
				</LineInfo.Parent>
			</Section>


			{background.startingProficiencyOptions && (
				<Section title={tr`startingProficienciesOptions.title`} withToggle>
					<h4>{tr('choose', { choose: background.startingProficiencyOptions.choose})}</h4>
					<LineInfo.Parent>
						{background.startingProficiencyOptions.from.map((proficiency) => (
							<LineInfo 
								key={proficiency.index} 
								label={<span>{proficiency.name}</span>} 
								onClick={() => showTipProficiency(proficiency)}
							/>
						))}
					</LineInfo.Parent>
				</Section>
			)}

			<Section title={tr`startingEquipment.title`} withToggle>
				<LineInfo.Parent>
					{background.startingEquipment.map(item => (
						<LineInfo 
							key={item.index} 
							label={item.name} 
							value={<span>x{item.quantity}</span>} 
							onClick={() => showEquipmentItemScreenAsModal(item)}
						/>
					))}
				</LineInfo.Parent>
			</Section>

			{background.startingEquipmentOptions && (
				<Section title={tr`startingEquipmentOptions.title`} withToggle>
					<StartingEquipmentOptionsDetail startingEquipmentOptions={background.startingEquipmentOptions} />
				</Section>
			)}

			{background.languageOptions && (
				<Section title={tr`languagesOptions.title`} withToggle>
					<h4>{tr('choose', { choose: background.languageOptions.choose })}</h4>
					<LineInfo.Parent>
						{background.languageOptions.from.map((language) => (
							<LineInfo 
								key={language.index} 
								label={<span>{language.name}</span>} 
								value={<span>?</span>}
								onClick={() => showTipLanguage(language.index)}
							/>
						))}
					</LineInfo.Parent>
				</Section>
			)}

			<Section title={tr`personalityTraits.title`} withToggle>
				<LineInfo.Parent>
					{background.personalityTraits.from.map((trait, index) => (
						<LineInfo key={index} label={<span>{index + 1} - {trait}</span>}  />
					))}
				</LineInfo.Parent>
			</Section>

			<Section title={tr`ideals.title`} withToggle>
				<LineInfo.Parent>
					{background.ideals.from.map((trait, index) => (
						<LineInfo 
							key={index} 
							label={
								<span>
									{index + 1} - {trait.desc}
									<span> </span>
									<span className="text-meta text-sm">({trait.alignments.map(a => a.name).join(', ')})</span>
								</span>
							}  
						/>
					))}
				</LineInfo.Parent>
			</Section>

			<Section title={tr`bonds.title`} withToggle>
				<LineInfo.Parent>
					{background.bonds.from.map((trait, index) => (
						<LineInfo key={index} label={<span>{index + 1} - {trait}</span>}  />
					))}
				</LineInfo.Parent>
			</Section>

			<Section title={tr`flaws.title`} withToggle>
				<LineInfo.Parent>
					{background.flaws.from.map((trait, index) => (
						<LineInfo key={index} label={<span>{index + 1} - {trait}</span>}  />
					))}
				</LineInfo.Parent>
			</Section>

		</>
	)
}

function BackgroundContent({ index }) {
	const map = {
		acolyte: acolyte,
		criminal: criminal,
		'folk-hero': folkHero,
		sage: sage,
		entertainer: entertainer,
		soldier: soldier,
	}

	const View = map[index]
	if (View) {
		return <div className="prose"><View /> <Content index={index} /></div>
	}

	return <p>Background not created yet</p>
}

export default BackgroundContent