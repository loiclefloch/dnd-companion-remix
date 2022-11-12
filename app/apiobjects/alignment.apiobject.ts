
export type AlignmentApiEnum =
  | "lawful-good"
  | "neutral-good"
  | "chaotic-good"
  | "lawful-neutral"
  | "neutral"
  | "chaotic-neutral"
  | "lawful-evil"
  | "neutral-evil"
  | "chaotic-evil"; 

export interface AlignmentApiObject {
  index: AlignmentApiEnum;
  name: string;
  abbreviation: string;
  desc: string;
  url: string;
}