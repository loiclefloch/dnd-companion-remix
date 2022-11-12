import type { ClassApiEnum } from '~/apiobjects/class.apiobject';
import type { AlignmentApiEnum } from './alignment.apiobject';
import { StartingProficiencyApiObject, StartingProficiencyOptionsApiObject } from './proficicency.apiobject';
import type { Array<StartingProficiencyApiObject>, StartingProficiencyOptionsApiObject } from './proficicency.apiobject';

interface GoodForClassApiObject {
	name: string;
	index: ClassApiEnum;
}

export interface BackgroundFeatureApiObject {
	index: string;
	name: string;
	desc: string;
}

export interface BackgroundPersonalityTraitsApiObject {
	choose: number;
	from: Array<String>
}

export interface BackgroundIdealApiObject {
	desc: string;
	alignments: Array<AlignmentApiEnum>;
}

export interface BackgroundIdealsApiObject {
	choose: number;
	from: Array<BackgroundIdealApiObject>
}

export interface BackgroundBondApiObject {
	choose: number;
	from: Array<string>;
}

export interface BackgroundFlawApiObject {
	choose: number;
	from: Array<string>;
}

export interface BackgroundApiObject {
	index: string;
	goodForClasses: Array<GoodForClassApiObject>;
	features: Array<BackgroundFeatureApiObject>;
	personalityTraits: BackgroundPersonalityTraitsApiObject;
	ideals: BackgroundIdealsApiObject;
	bonds: BackgroundBondApiObject;
	flaws: BackgroundFlawApiObject;
	startingProficiencyOptions: StartingProficiencyOptionsApiObject;
	startingProficiencies: Array<StartingProficiencyApiObject>;
}
