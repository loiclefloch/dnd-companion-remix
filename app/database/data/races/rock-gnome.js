const rockGnome = api => ({
	"index": "rock-gnome",
	"name": "Rock Gnome",
	"race": api.buildRace("gnome"),
	"desc": "As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes.",
	"abilitybonuses": [
		api.buildAbilityBonus("con", 1)
	],
	"startingProficiencies": [
		api.buildProficiency("tinkers-tools")
	],
	"languages": [],
	"traits": [
		api.buildTrait("artificers-lore"),
		api.buildTrait("tinker"),
	],
})

export default rockGnome