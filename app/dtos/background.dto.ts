import type { ClassDtoEnum } from "./class.dto";

interface GoodForClassDto {
	name: string;
	index: ClassDtoEnum;
}

export interface BackgroundDto {
	index: string;
	goodForClasses: Array<GoodForClassDto>
}
