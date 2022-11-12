const protectorAasimar = api => ({
	"index": "protector-aasimar",
	"name": "Protector Aasimar",
	"race": api.buildRace("aasimar"),
	"desc": "",
	"abilitybonuses": [
		api.buildAbilityBonus("wis", 1)
	],
	"starting_proficiencies": [],
	"languages": [],
	"traits": [
		api.buildTrait("radiant-soul")
	],
})

export default protectorAasimar