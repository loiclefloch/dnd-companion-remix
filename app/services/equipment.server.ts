import { EquipmentApiObject } from '~/apiobjects/equipment.apiobject';
import { EquipmentCategoryApiObject } from '~/apiobjects/equipmentcategories.apiobject';
import equipmentCategories from '~/database/data/equipment-categories.json'
import equipment from '~/database/data/equipment.json'

export async function getEquipmentCategories(): Promise<Array<EquipmentCategoryApiObject>> {
	return equipmentCategories
}

export async function getEquipment(index: string): Promise<EquipmentApiObject> {
	const item = equipment.find(e => e.index === index);
	if (!item) {
		throw new Error(`Equipment not found for id ${index}`)
	}

	return item
}
