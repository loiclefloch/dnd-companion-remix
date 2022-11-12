import type { MagicSchoolDto } from '~/dtos/magicshcool.dto';
import type { MagicSchoolApiObject } from '../apiobjects/magicshcool.apiobject';

export function format(magicSchool: MagicSchoolApiObject): MagicSchoolDto {
	magicSchool.nameLocalized = {
		en: magicSchool.name,
	}
	return magicSchool
}