import type { MonsterApiObject } from "~/apiobjects/monster.apiobject";
import monsters from '~/database/data/monsters.json'
import { cloneDeep } from 'lodash';

export async function getMonsters(): Promise<Array<MonsterApiObject>> {
	return cloneDeep(monsters)
}

export async function getMonster(monsterId: string): Promise<MonsterApiObject> {
	return cloneDeep(monsters.find(m => m.index === monsterId))
}