import { AlignmentApiEnum } from "~/apiobjects/alignment.apiobject";
import type { CharacterCreationApiObject, CharacterCreationFeatureApiObject } from "~/apiobjects/charactercreation.apiobject";
import { CharacterDetailsApiObject, PersonalityTraitsApiObject } from '../apiobjects/character.apiobject';

function initCharacterCreation() {
	return {
    name: undefined,
    raceIndex: "high-elf", // TODO: remove default data
    classIndex: "druid", // TODO: remove default data
    backgroundIndex: "acolyte", // TODO: remove default data
    abilities: {
      // stats chosen without bonuses applied
      STR: 15,
      DEX: 14,
      CON: 12,
      INT: 12,
      WIS: 10,
      CHA: 8,
    },
    characterDetails: {
      age: "",
      genre: "",
      height: "",
      weight: "",
      hairColor: "",
      eyeColor: "",
      skinColor: "",
      physicalCaracteristics: "",
    },
    personalityTraits: {
      first: "",
      second: "",
    },
  };
}

export async function getCharacterCreation(): Promise<CharacterCreationApiObject> {
	// TODO:
	return initCharacterCreation()
}

function updateCharacterCreationData(payload: any) {
	console.log(JSON.stringify({
    payload,
  }));
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

export async function updateCreateCharacterChooseBackgroundStep(backgroundIndex: string, features: Array<CharacterCreationFeatureApiObject>) {
	// TODO: update data	

	
	return updateCharacterCreationData({
		backgroundIndex,
		features,
	})
}

export async function updateCreateCharacterChooseAbilities(abilities, abilitiesBonuses = []) {
	// TODO: update data	
	
	return updateCharacterCreationData({
		abilities, 
		abilitiesBonuses,
	})
}

export async function updateCreateCharacterChooseCharacterDetailsStep(characterDetails: CharacterDetailsApiObject) {
	// TODO: update data	

	return updateCharacterCreationData({
		characterDetails,
	})
}

export async function updateCreateCharacterChoosePersonalityTraitsStep(personalityTraits: PersonalityTraitsApiObject) {
	// TODO: update data	

	return updateCharacterCreationData({
		personalityTraits,
	})
}

export async function updateCreateCharacterChooseIdealsStep(ideals: string, idealsAlignments: Array<AlignmentApiEnum>) {
	// TODO: update data	

	return updateCharacterCreationData({
		ideals,
		idealsAlignments,
	})
}
