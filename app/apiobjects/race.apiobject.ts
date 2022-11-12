import type { StartingProficiencyApiObject, StartingProficiencyOptionsApiObject } from "./proficicency.apiobject";

export type RaceApiEnum = 'high-elf' // TODO:

export interface AbilityBonusDto {

}

export interface RaceApiObject {
	index: RaceApiEnum;
	abilityBonuses: Array<AbilityBonusDto>;
	startingProficiencyOptions: StartingProficiencyOptionsApiObject;
	startingProficiencies: Array<StartingProficiencyApiObject>;
}