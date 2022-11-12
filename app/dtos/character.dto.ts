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