import backgrounds from "~/database/data/backgrounds";
import type { BackgroundApiObject } from "../apiobjects/background.apiobject";

export async function getBackgrounds(): Promise<Array<BackgroundApiObject>> {
  return backgrounds;
}

export async function getBackground(
  index: string
): Promise<BackgroundApiObject> {
  const background = backgrounds.find((b) => b.index === index);

  if (!background) {
    throw new Error(`Background not found for index ${index}`);
  }

  return background;
}
