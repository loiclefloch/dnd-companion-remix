import type { CharacterApiObject } from '~/apiobjects/characters.apiobject';
import characters from '~/database/fixtures/characters';

let currentCharacterId: string = null // TODO: move on db

export async function setCurrentCharacter(characterId: string) {
	currentCharacterId = characterId
}

export async function getCurrentCharacterId(): Promise<string | null> {
	return currentCharacterId
}

export async function getCurrentCharacter(): Promise<CharacterApiObject | null> {
	if (!currentCharacterId) {
		return null
	}

	const character = characters.find(character => character.id === currentCharacterId);
	if (!character) {
		throw new Error(`Character not found with id ${currentCharacterId}`);
	}
	return character
}