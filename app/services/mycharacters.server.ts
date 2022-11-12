import type { MyCharacterApiObject } from '~/apiobjects/mycharacters.apiobject';
import characters from '~/modules/api/fixtures/characters'

export async function getMyCharacters(): Promise<MyCharacterApiObject[]> {
	return characters();
}

export async function getMyCharacter(characterId: string): Promise<MyCharacterApiObject> {
	const characters = await getMyCharacters();
	const character = characters.find(character => character.id === characterId);
	return character
}