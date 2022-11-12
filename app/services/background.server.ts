import backgrounds from "~/database/data/backgrounds";
import type { BackgroundApiObject } from "../apiobjects/background.apiobject";
import { cloneDeep } from 'lodash';

export async function getBackgrounds(): Promise<Array<BackgroundApiObject>> {
  return cloneDeep(backgrounds);
}

export async function getBackground(
  index: string
): Promise<BackgroundApiObject> {
  const background = backgrounds.find((b) => b.index === index);

  if (!background) {
    throw new Error(`Background not found for index ${index}`);
  }

  return cloneDeep(background);
}
