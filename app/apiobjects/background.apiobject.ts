import type { ClassApiEnum } from '~/apiobjects/class.apiobject';
import { AlignmentApiEnum } from './alignment.apiobject';

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

export interface BackgroundApiObject {
	index: string;
	goodForClasses: Array<GoodForClassApiObject>;
	features: Array<BackgroundFeatureApiObject>;
	personalityTraits: BackgroundPersonalityTraitsApiObject;
	ideals: BackgroundIdealsApiObject;
}