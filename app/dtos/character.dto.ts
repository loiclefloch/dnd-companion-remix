export interface CharacterRaceDto {

}

export interface AcDto {
	total: number;
}

export interface CharacterDto {
	id: string;
	currentHp: number;
	maximumHp: number;
	ac: AcDto;
	race: CharacterRaceDto;
	level: number;
}

export interface CharacterDetailsDto {
  age: string;
  genre: string;
  height: string;
  weight: string;
  hairColor: string;
  eyeColor: string;
  skinColor: string;
  physicalCaracteristics: string;
}


export interface PersonalityTraitsDto {
  first: string;
  second: string;
}

export type IdealsDto = string;