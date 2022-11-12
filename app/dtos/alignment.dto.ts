
export type AlignmentDtoEnum =
  | "lawful-good"
  | "neutral-good"
  | "chaotic-good"
  | "lawful-neutral"
  | "neutral"
  | "chaotic-neutral"
  | "lawful-evil"
  | "neutral-evil"
  | "chaotic-evil"; 

export interface AlignmentDto {
  index: AlignmentDtoEnum;
  name: string;
  abbreviation: string;
  desc: string;
  url: string;
}