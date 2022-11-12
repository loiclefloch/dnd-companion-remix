import type { CharacterApiObject } from '~/apiobjects/character.apiobject';
import { getCharacter } from './characters.server';

let currentCharacterId: string = "ylvir" // TODO: move on db

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

	return getCharacter(currentCharacterId)
}