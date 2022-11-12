import type { ClassApiEnum } from '~/apiobjects/class.apiobject';
import { CharacterDetailsApiObject } from './character.apiobject';
import type { RaceApiEnum } from './race.apiobject';
import { PersonalityTraitsApiObject } from './background.apiobject';

export interface CharacterCreationApiObject {
	name?: string;
	raceIndex?: RaceApiEnum;
	classIndex?: ClassApiEnum;
	backgroundIndex?: string;
	characterDetails: CharacterDetailsApiObject;
	personalityTraits: PersonalityTraitsApiObject;
}

type CharacterCreationFeatureTypeApiEnum = 'background'

export interface CharacterCreationFeatureApiObject {
	index: string;
	type: CharacterCreationFeatureTypeApiEnum;
}