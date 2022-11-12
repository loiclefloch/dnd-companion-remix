import type { FeatureApiObject } from '~/apiobjects/feature.apiobject'
import type { FeatureDto } from '~/dtos/feature.dto'
import camelize from '../modules/utils/camelize'

export function formatFeature(featureParam: FeatureApiObject): FeatureDto {
  const feature = camelize(featureParam)

  feature.forBackground = !!feature.background
  feature.forClass = !!feature.class

  feature.nameLocalized = {
    en: feature.name,
  }

  return feature
}
