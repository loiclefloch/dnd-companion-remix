import type { EquipmentReferenceApiObject } from "./equipment.apiobject"

export interface EquipmentCategoryApiObject {
	index: string;
	name: string;
	equipment: Array<EquipmentReferenceApiObject>
}