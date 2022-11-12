import type { MyCharacterApiObject } from '~/apiobjects/mycharacters.apiobject';
import characters from '~/modules/api/fixtures/characters'

export async function getMyCharacters(): Promise<MyCharacterApiObject[]> {
	return characters;
}
