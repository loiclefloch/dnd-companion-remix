import allRaces from '~/database/data/allRaces'
import type { RaceApiObject } from "~/apiobjects/race.apiobject";
import { cloneDeep } from 'lodash';


export async function getRaces(): Promise<Array<RaceApiObject>> {
	return cloneDeep(allRaces);
}

export async function getRace(id: string): Promise<RaceApiObject> {
	return cloneDeep(allRaces.find(r => r.index === id))
}