import type { ClassApiEnum } from '~/apiobjects/class.apiobject';
import { CharacterDetailsApiObject } from './character.apiobject';
import type { RaceApiEnum } from './race.apiobject';

export interface CharacterCreationApiObject {
	name?: string;
	raceIndex?: RaceApiEnum;
	classIndex?: ClassApiEnum;
	backgroundIndex?: string;
	characterDetails: CharacterDetailsApiObject;
}

type CharacterCreationFeatureTypeApiEnum = 'background'

export interface CharacterCreationFeatureApiObject {
	index: string;
	type: CharacterCreationFeatureTypeApiEnum;
}