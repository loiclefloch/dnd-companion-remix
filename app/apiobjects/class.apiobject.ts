import type { StartingProficiencyApiObject } from "./proficicency.apiobject";

export type ClassApiEnum = 'druid' // TODO:

export interface ClassApiObject {
	index: ClassApiEnum;
	proficiencies: Array<StartingProficiencyApiObject>;
}