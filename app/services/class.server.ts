import classes from '~/database/data/classes';
import type { ClassApiObject } from '../apiobjects/class.apiobject';
import { cloneDeep } from 'lodash';

export async function getClasses(): Promise<Array<ClassApiObject>> {
	return cloneDeep(classes);
}

export async function getClass(index: string): Promise<ClassApiObject> {
	const classApiObject = classes.find(c => c.index === index)

	if (!classApiObject) {
		throw new Error(`class not found for index ${index}`);
	}

	return cloneDeep(classApiObject);
}
