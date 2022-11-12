import classes from '~/database/data/classes';
import type { ClassApiObject } from '../apiobjects/class.apiobject';

export async function getClasses(): Promise<Array<ClassApiObject>> {
	return classes
}

export async function getClass(index: string): Promise<ClassApiObject> {
	return classes.find(c => c.index === index)
}
