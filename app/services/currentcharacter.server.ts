
let currentCharacterId = null // TODO: move on db

export async function setCurrentCharacter(characterId: string) {
	currentCharacterId = characterId
}

export async function getCurrentCharacterId(): Promise<string> {
	return currentCharacterId
}