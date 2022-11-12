
interface RuleSubSectionApiObject {
  name: string;
  index: string;
  url: string;
}


export interface RuleSectionApiObject {
	name: string;
	index: string;
	desc: string;
	subsections: Array<RuleSubSectionApiObject>;
}

export interface RuleApiObject {
	name: string;
	index: string;
	url: string;
	content: string;
}