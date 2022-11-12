
interface RuleSubSectionDto {
  name: string;
  index: string;
  url: string;
}


export interface RuleSectionDto {
	name: string;
	index: string;
	desc: string;
	subsections: Array<RuleSubSectionDto>;
}

export interface RuleDto {
	name: string;
	index: string;
	url: string;
	content: string;
}