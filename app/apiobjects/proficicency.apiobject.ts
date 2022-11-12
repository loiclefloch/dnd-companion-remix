

interface ProficicencyReferenceApiObject {
	index: string;
	name: string;
}

export interface StartingProficiencyOptionsApiObject {
	choose: number;
	from: Array<ProficicencyReferenceApiObject>
}

export interface StartingProficiencyApiObject {
	index: string;
	name: string;
	url: string;
	typeLabel: string;
}

export interface ProficicencyApiObject {

}