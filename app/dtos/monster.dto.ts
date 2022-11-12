
interface Image {
	url: string;
	label: string;
}


export interface MonsterDto {
	index: string;
	imageUrl: string;
	hp: number;
	hpDice: string;
	images: Array<Image>;
	name: string;
	nameLocalized: LocalizedText;
}