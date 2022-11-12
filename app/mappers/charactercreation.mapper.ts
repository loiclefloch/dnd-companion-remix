import type { CharacterCreationDto } from '~/dtos/charactercreation.dto';
import type { CharacterCreationApiObject } from '../apiobjects/charactercreation.apiobject';


export function transformCharacterCreation(characterCreationApiObject: CharacterCreationApiObject): CharacterCreationDto {
	return {
		name: characterCreationApiObject.name
	}
}