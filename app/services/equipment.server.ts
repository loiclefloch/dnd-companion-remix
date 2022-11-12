import type { EquipmentApiObject } from '~/apiobjects/equipment.apiobject';
import type { EquipmentCategoryApiObject } from '~/apiobjects/equipmentcategories.apiobject';
import equipmentCategories from '~/database/data/equipment-categories.json'
import equipment from '~/database/data/equipment.json'
import { cloneDeep } from 'lodash';

export async function getEquipmentCategories(): Promise<Array<EquipmentCategoryApiObject>> {
	return cloneDeep(equipmentCategories)
}

export async function getEquipment(index: string): Promise<EquipmentApiObject> {
	const item = equipment.find(e => e.index === index);
	if (!item) {
		throw new Error(`Equipment not found for id ${index}`)
	}

	return cloneDeep(item)
}
