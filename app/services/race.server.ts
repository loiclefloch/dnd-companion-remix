import allRaces from '~/database/data/allRaces'

import type { RaceApiObject } from "~/apiobjects/race.apiobject";


export async function getRaces(): Promise<Array<RaceApiObject>> {
	return allRaces;
}

export async function getRace(id: string): Promise<RaceApiObject> {
	return allRaces.find(r => r.index === id)
}