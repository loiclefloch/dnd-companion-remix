import { isEmpty } from 'lodash'
import camelize from '../modules/utils/camelize'
import type { FeatApiOjbect } from "~/apiobjects/feat.apiobject"
import type { FeatDto } from "~/dtos/feat.dto"

export function formatFeat(featParam: FeatApiOjbect): FeatDto {
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
