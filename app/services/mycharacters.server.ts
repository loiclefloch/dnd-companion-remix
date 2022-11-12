import type { MyCharacterApiObject } from '~/apiobjects/mycharacters.apiobject';
import characters from '~/database/fixtures/characters';

export async function getMyCharacters(): Promise<MyCharacterApiObject[]> {
	return characters;
}
