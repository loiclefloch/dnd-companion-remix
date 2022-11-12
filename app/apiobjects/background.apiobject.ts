import type { ClassApiEnum } from '~/apiobjects/class.apiobject';

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

export interface BackgroundApiObject {
	index: string;
	goodForClasses: Array<GoodForClassApiObject>;
	features: Array<BackgroundFeatureApiObject>;
	personalityTraits: BackgroundPersonalityTraitsApiObject;
}