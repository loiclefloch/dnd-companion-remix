import type { CharacterApiObject } from '~/apiobjects/character.apiobject';
import characters from '~/database/fixtures/characters';
import { cloneDeep } from 'lodash';

export async function getcharacters(): Promise<Array<CharacterApiObject>> {
	return cloneDeep(characters);
}

export async function getCharacter(id: string): Promise<CharacterApiObject> {
	const character = characters.find(character => character.id === id);

	if (!character) {
		throw new Error(`Could not find character for id ${id}`)
	}

	return cloneDeep(character);
}
