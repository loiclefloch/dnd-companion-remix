import { useState } from "react"
import { actionLevellingSacredOath } from "./action"
import features from "../../database/data/features"
import ButtonBottomScreen from "~/components/ButtonBottomScreen"
import useTipFeature from "../useTipFeature"
import SubclassListSelector from "./SubclassListSelector"
import FeatureSpecificSelector from "./FeatureSpecificSelector"
import useFeature from "../../modules/api/useFeature"

const View = {
	SELECT_SUB_CLASS: 'SELECT_SUB_CLASS',
	LAND: 'LAND',
}

function Land({ value, onChange }) {
	const landFeatureResponse = useFeature('circle-of-the-land') 

	if (!landFeatureResponse.data) {
		return null
	}

	return (
		<div>
			<FeatureSpecificSelector
				feature={landFeatureResponse.data}
			 	value={value}
				onChange={(featureSpecificData) => onChange(featureSpecificData)}
			/>
		</div>
	)
}

function DruidCircle({ clss, getBuildedCharacter, levellingData, step, levellingDispatch, stepLevellingState }) {
	const [view, setView] = useState(View.SELECT_SUB_CLASS)
	const [selectedSubclass, setSelectedSubclass] = useState(null)
	const [featuresOption, setFeaturesOption] = useState(null)

	const subclassHasOptionToSelect = selectedSubclass?.index === "land"

	return (
		<div className="prose mt-8 mx-4">
			<h3 className="text-center">{step.label}</h3>

			<h4 className="mt-4 text-center">{step.desc}</h4>
			
			<p className="mt-6">
				Choose which circle of nature your druid is going to follow.
			</p>
			<p>
			 	Druid circles give their characters additional features and spells on top of those they get from levelling up and the Wild Shape ability.
			</p>
			
			{view === View.SELECT_SUB_CLASS && (
				<div>
					<SubclassListSelector
						clss="druid"
						selectedSubclass={selectedSubclass}
						onSelect={(selectedSubclass) => {
							setSelectedSubclass(selectedSubclass)
							if (selectedSubclass.index === "land") {
								setView(View.LAND)
							}
						}}
					/>
				</div>
			)}

			{view === View.LAND && (
				<div>
					<div onClick={() => setView(View.SELECT_SUB_CLASS)}>
						Revenir
					</div>
					<Land 
						value={featuresOption}
						onChange={setFeaturesOption}
					/>
				</div>
			)}

			<ButtonBottomScreen
				variant="cta"
				hide={!selectedSubclass || (subclassHasOptionToSelect && (view !== View.LAND || !featuresOption))}
				disabled={!selectedSubclass}
				onClick={() => {
					levellingDispatch(
            actionLevellingSacredOath({
              step,
              selectedSubclass,
              featuresOptions: featuresOption && [
                {
                  ...featuresOption,
                  featureIndex: selectedSubclass.index,
                },
              ],
            })
          );
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default DruidCircle