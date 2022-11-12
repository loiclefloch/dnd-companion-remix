export type ProficicencySourceTypeDtoEnum =  'race' | 'background' | 'class'

export interface ProficicencyDto {
	sourceType: ProficicencySourceTypeDtoEnum;
	typeLabel: string; // TODO: enum?
}