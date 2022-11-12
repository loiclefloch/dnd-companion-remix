import { AlignmentDtoEnum } from "./alignment.dto";
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

export interface BackgroundIdealDto {
	index: number;
	desc: string;
	alignments: Array<AlignmentDtoEnum>;
}


export interface BackgroundIdealsDto {
	choose: number;
	from: Array<BackgroundIdealDto>
}

export interface BackgroundBondDto {
	choose: number;
	from: Array<string>;
}

export interface BackgroundFlawDto {
	choose: number;
	from: Array<string>;
}


export interface BackgroundDto {
	index: string;
	features: Array<BackgroundFeatureDto>;
	goodForClasses: Array<GoodForClassDto>
	personalityTraits: Array<BackgroundPersonalityTraitsDto>;
	ideals: BackgroundIdealsDto;
	bonds: BackgroundBondDto;
	flaws: BackgroundFlawDto;
}
