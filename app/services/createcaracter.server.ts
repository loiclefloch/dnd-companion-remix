import type { CharacterCreationApiObject } from "~/apiobjects/charactercreation.apiobject";

function initCharacterCreation() {
	return {
		name: undefined,
		raceIndex: 'high-elf',	// TODO: remove default data
		classIndex: 'druid', // TODO: remove default data
		abilities: { // stats chosen without bonuses applied
			STR: 15,
			DEX: 14,
			CON: 12,
			INT: 12,
			WIS: 10,
			CHA: 8,
		},
	}
}

export async function getCharacterCreation(): Promise<CharacterCreationApiObject> {
	// TODO:
	return initCharacterCreation()
}

function updateCharacterCreationData(payload: any) {
	console.log({
    payload,
  });
}

export async function updateCreateCharacterInitialStep(name: string) {
	// TODO: update data

	return updateCharacterCreationData({
		name
	})
}

export async function updateCreateCharacterChooseRaceStep(raceIndex: string) {
	// TODO: update data	

	
	return updateCharacterCreationData({
		raceIndex
	})
}

export async function updateCreateCharacterChooseClassStep(classIndex: string) {
	// TODO: update data	

	
	return updateCharacterCreationData({
		classIndex
	})
}


export async function updateCreateCharacterChooseAbilities(abilities, abilitiesBonuses = []) {
	// TODO: update data	
	
	return updateCharacterCreationData({
		abilities, 
		abilitiesBonuses,
	})
}
