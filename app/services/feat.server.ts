import feats from "~/database/data/feats";
import type { FeatApiObject } from "../apiobjects/feat.apiobject";
import { cloneDeep } from 'lodash';

export async function getFeats(): Promise<Array<FeatApiObject>> {
  return cloneDeep(feats);
}

export async function getFeat(
  index: string
): Promise<FeatApiObject> {
  const feat = feats.find((b) => b.index === index);

  if (!feat) {
    throw new Error(`Feat not found for index ${index}`);
  }

  return cloneDeep(feat);
}
