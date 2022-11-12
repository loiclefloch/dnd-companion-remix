

export interface CharacterApiObject {
  details: CharacterDetailsApiObject;
  traits: PersonalityTraitsApiObject;
}

export interface CharacterDetailsApiObject {
  age: string;
  genre: string;
  height: string;
  weight: string;
  hairColor: string;
  eyeColor: string;
  skinColor: string;
  physicalCaracteristics: string;
}

export interface PersonalityTraitsApiObject {
  first: string;
  second: string;
}