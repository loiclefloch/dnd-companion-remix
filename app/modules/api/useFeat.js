import { isEmpty } from 'lodash'
import camelize from '../utils/camelize'
import useRootData from "~/hooks/useRootData"

export function formatFeat(featParam) {
  if (!featParam) {
    return null
  }

  const feat = camelize(featParam)
  feat.nameLocalized = {
    en: feat.name,
  }

  const prerequisites = feat.prerequisites || []

  // TODO: format prerequistes
  // - forRace
  // - forAbilityScore
  // - forProficiency
  // - forOther
  feat.forRace = prerequisites.some(p => p.type === 'race')
  feat.forAbilityScore = prerequisites.some(p => p.type === 'abilityScore')
  feat.forProficiency = prerequisites.some(p => p.type === 'proficiency')
  feat.forOther = !isEmpty(feat.prerequisitesLabel)

  feat.hasPrerequisites = feat.forRace || feat.forAbilityScore || feat.forProficiency || feat.forOther

  feat.hasSpellOptions = !!feat.spellOptions
  feat.hasAbilityOption = !!feat.abilityOption
  feat.hasFeaturesOptions = !!feat.featuresOptions
  feat.hasLanguageOptions = !!feat.languagesOptions

  feat.hasOption = feat.hasAbilityOption || feat.hasSpellOptions || feat.hasFeaturesOptions || feat.languagesOptions

  return feat
}

function useFeat(index) {
  const { feats } = useRootData()
  return formatFeat(feats.find(feature => feature.index === index))
}

export default useFeat