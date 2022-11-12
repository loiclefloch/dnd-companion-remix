import features from "~/database/data/features";
import type { FeatureApiObject } from "../apiobjects/feature.apiobject";

export async function getFeatures(): Promise<Array<FeatureApiObject>> {
  return features;
}

export async function getFeature(
  index: string
): Promise<FeatureApiObject> {
  const feature = features.find((b) => b.index === index);

  if (!feature) {
    throw new Error(`Feature not found for index ${index}`);
  }

  return feature;
}
