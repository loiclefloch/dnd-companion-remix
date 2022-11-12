import type { ClassDtoEnum } from "./class.dto";

interface GoodForClassDto {
	name: string;
	index: ClassDtoEnum;
}

export interface BackgroundFeatureDto {
	index: string;
	name: string;
	desc: string;
}

export interface BackgroundPersonalityTraitsDto {
	choose: number;
	from: Array<String>
}


export interface BackgroundDto {
	index: string;
	features: Array<BackgroundFeatureDto>;
	goodForClasses: Array<GoodForClassDto>
	personalityTraits: Array<BackgroundPersonalityTraitsDto>;
}
