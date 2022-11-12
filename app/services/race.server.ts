import allRaces from '~/database/data/allRaces'
import type { RaceApiObject } from "~/apiobjects/race.apiobject";
import { cloneDeep } from 'lodash';


export async function getRaces(): Promise<Array<RaceApiObject>> {
	return cloneDeep(allRaces);
}

export async function getRace(index: string): Promise<RaceApiObject> {
	const race = allRaces.find(r => r.index === index)
	if (!race) {
		throw new Error(`Race not found for index ${index}`)
	}
	return cloneDeep(race)
}