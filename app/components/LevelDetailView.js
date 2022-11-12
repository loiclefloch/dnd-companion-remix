import { makeI18n } from "~/modules/i18n/useI18n";

import ScreenIntroduction from "./ScreenIntroduction"
import SpellLevelData from "./SpellLevelData"
import { isEmpty } from "lodash";
import useFeatureScreenAsModal from "./useFeatureScreenAsModal"
import LevellingDetail from "./levellingDetail/LevellingDetail"

const useI18n = makeI18n({
	'description': {
		fr: 'Retrouvez le détail du niveau %{level} pour les %{clss.name}',
		en: 'Find out details about level %{level} for %{clss.name}',
	},
	'no features': {
		fr: 'Pas de features',
		en: 'No features',
	},
	'detail.title': {
		fr: 'Détail',
		en: 'Detail',
	},
	'requiredXp': {
		fr: `XP requise`,
		en: `Required XP`,
	},
})

function Feature({ feature }) {
	const { tr } = useI18n()
	const { showFeatureScreenAsModal } = useFeatureScreenAsModal()

	return (
		<div 
			onClick={() => showFeatureScreenAsModal(feature)}
			className="p-1 flex justify-between"
		>
			<div>
				{tr(feature.nameLocalized)}
			</div>
			<div className="text-meta px-2">
				?
			</div>
		</div>
	)
}

function FeaturesLevelData({ levellingData }) {
	const { tr } = useI18n()

	// TODO: remix remove featuresData, use fullstack component
	if (isEmpty(levellingData.featuresData)) {
		return <p className="px-4 mt-2">{tr`no features`}</p>
	}

	return (
		<div className="px-4 mt-2 divide divide-y">
			{levellingData.featuresData.map(feature => (
				<Feature key={feature.index} feature={feature} />
			))}
		</div>
	)
}

function LevelDetailView({ levellingData, levellingStages, clss, level, onCloseScreen }) {
	const { tr } = useI18n()

	return (
		<>
			<ScreenIntroduction 
				// title={"Levelling"}
				description={tr('description', { level, 'clss.name': tr(clss.nameLocalized)}) }
			/>

			{level !== 1 && (
				<div className="flex px-4 mt-2">
					<div>
						{tr`requiredXp`}
					</div>
					<div className="text-meta ml-2">
						{levellingStages[level]} ({tr(`level.short`, { level: level - 1 })} + {levellingStages[level] - levellingStages[level - 1]})
					</div>
				</div>
			)}

			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">{tr`spellsSlots.title`}</h3>
				<SpellLevelData levellingData={levellingData} />
			</>

			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">{tr`features.title`}</h3>
				<FeaturesLevelData levellingData={levellingData} />
			</>
			
			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">{tr`detail.title`}</h3>
				<div className="mx-4 mt-2">				
					<div className="mt-2">
						<LevellingDetail clss={clss} level={level} />
					</div>
				</div>
			</>
		</>
	)
}

export default LevelDetailView
