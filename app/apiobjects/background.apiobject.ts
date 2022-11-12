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

export interface BackgroundApiObject {
	goodForClasses: Array<GoodForClassApiObject>;
	features: Array<BackgroundFeatureApiObject>;
}