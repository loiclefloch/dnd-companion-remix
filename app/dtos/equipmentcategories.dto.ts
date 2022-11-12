import type { EquipmentReferenceDto } from "./equipment.dto"

export interface EquipmentCategoriesDto {
	index: string;
	name: string;
	equipment: Array<EquipmentDto>
}