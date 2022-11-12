import type { CharacterApiObject } from '~/apiobjects/characters.apiobject';
import characters from '~/database/fixtures/characters';

export async function getcharacters(): Promise<Array<CharacterApiObject>> {
	return characters;
}

export async function getCharacter(id: string): Promise<CharacterApiObject> {
	return characters.find(c => c.id === id);
}
