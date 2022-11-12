import { MonsterApiObject } from "~/apiobjects/monster.apiobject";
import monsters from '~/database/data/monsters.json'

export async function getMonsters(): Promise<Array<MonsterApiObject>> {
	return monsters
}

export async function getMonster(monsterId: string): Promise<MonsterApiObject> {
	return monsters.find(m => m.index === monsterId)
}