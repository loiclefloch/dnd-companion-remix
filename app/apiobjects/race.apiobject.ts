export type RaceApiEnum = 'high-elf' // TODO:

export interface AbilityBonusDto {

}

export interface RaceApiObject {
	index: RaceApiEnum;
	abilityBonuses: Array<AbilityBonusDto>;
}