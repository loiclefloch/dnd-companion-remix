const halfling = api => ({
	"index": "halfling",
	"name": "Halfling",
	"speed": 25,
	"ability_bonuses": [
		api.buildAbilityBonus("dex", 2)
	],
	"age": "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.",
	"alignment": "Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the support of their community and the comfort of their old ways.",
	"size": "Small",
	"size_description": "Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.",
	"starting_proficiencies": [],
	"languages": [
		api.buildLanguage("common"),
		api.buildLanguage("halfling"),
	],
	"language_desc": "You can speak, read, and write Common and Halfling. The Halfling language isn't secret, but halflings are loath to share it with others. They write very little, so they don't have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling.",
	"traits": [
		api.buildTrait("brave"),
		api.buildTrait("halfling-nimbleness"),
		api.buildTrait("lucky"),
	],
	"subraces": [
		api.buildRace("lightfoot-halfling"),
	],
})

export default halfling