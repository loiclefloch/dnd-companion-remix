const hillDwarf = api => ({
	"index": "hill-dwarf",
	"name": "Hill Dwarf",
	"race": api.buildRace("dwarf"),
	"desc": "As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.",
	"abilitybonuses": [
		api.buildAbilityBonus("wis", 1)
	],
	"startingProficiencies": [],
	"languages": [],
	"traits": [
		api.buildTrait("dwarven-toughness")
	],
})

export default hillDwarf