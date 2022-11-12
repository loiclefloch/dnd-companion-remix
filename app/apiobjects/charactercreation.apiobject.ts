import type { ClassApiEnum } from '~/apiobjects/class.apiobject';
import type { CharacterDetailsApiObject, PersonalityTraitsApiObject } from './character.apiobject';
import type { RaceApiEnum } from './race.apiobject';
import type { AlignmentApiEnum } from './alignment.apiobject';

export interface CharacterCreationApiObject {
  name?: string;
  raceIndex?: RaceApiEnum;
  classIndex?: ClassApiEnum;
  backgroundIndex?: string;
  characterDetails: CharacterDetailsApiObject;
  personalityTraits: PersonalityTraitsApiObject;
  alignment: AlignmentApiEnum;
  idealsAlignments: Array<AlignmentApiEnum>;
}

type CharacterCreationFeatureTypeApiEnum = 'background'

export interface CharacterCreationFeatureApiObject {
	index: string;
	type: CharacterCreationFeatureTypeApiEnum;
}