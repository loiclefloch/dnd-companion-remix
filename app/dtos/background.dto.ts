import type { AlignmentDtoEnum } from "./alignment.dto";
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

export interface BackgroundAlignmentDto {
  index: AlignmentDtoEnum;
  name: string;
}

export interface BackgroundIdealDto {
	index: number;
	name: string;
	title: string;
	desc: string;
	alignments: Array<BackgroundAlignmentDto>;
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
