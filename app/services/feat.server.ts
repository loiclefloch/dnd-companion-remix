import feats from "~/database/data/feats";
import type { FeatApiObject } from "../apiobjects/feat.apiobject";

export async function getFeats(): Promise<Array<FeatApiObject>> {
  return feats;
}

export async function getFeat(
  index: string
): Promise<FeatApiObject> {
  const feat = feats.find((b) => b.index === index);

  if (!feat) {
    throw new Error(`Feat not found for index ${index}`);
  }

  return feat;
}
