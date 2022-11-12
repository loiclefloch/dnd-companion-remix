const Acolyte = (api) => ({
	"index": "acolyte",
	"name": "Acolyte",
	"startingProficiencies": [
		api.buildProficiency("skill-insight"),
		api.buildProficiency("skill-religion"),
	],
	"language_options": {
		"choose": 2,
		"type": "languages",
		"from": api.languages.map(l => ({
			index: l.index,
			name: l.name,
			url: l.url,
		}))
	},
	"starting_currencies": {
		gp: 15,
	},
	"starting_equipment": [
		{
			"equipment": api.buildEquipment("clothes-common"),
			"quantity": 1
		},
		{
			"equipment": api.buildEquipment("vestments"),
			"quantity": 1
		},
		{
			"equipment": api.buildEquipment("block-of-incense"),
			"quantity": 1
		},
		{
			"equipment": api.buildEquipment("pouch"),
			"quantity": 1
		}
	],
	"starting_equipment_options": [
		api.buildChooseEquipmentFromCategory(1, "holy-symbols")
	],
	"features": [{
		"index": "shelter-of-the-faithful",
		"name": "Shelter of the Faithful",
		"desc": [
			"As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.",
			"You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While near your temple, you can call upon the priests for assistance, provided the assistance you ask for is not hazardous and you remain in good standing with your temple."
		]
	}],
	"personalityTraits": {
		"choose": 2,
		"type": "personalityTraits",
		"from": [
			"I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.",
			"I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
			"I see omens in every event and action. The gods try to speak to us, we just need to listen.",
			"Nothing can shake my optimistic attitude.",
			"I quote (or misquote) sacred texts and proverbs in almost every situation.",
			"I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.",
			"I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.",
			"I've spent so long in the temple that I have little practical experience dealing with people in the outside world."
		]
	},
	"ideals": {
		"choose": 1,
		"type": "ideals",
		"from": [
			{
				"desc": "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld.",
				"alignments": api.buildIdealAlignment("lawful")
			},
			{
				"desc": "Charity. I always try to help those in need, no matter what the personal cost.",
				"alignments": api.buildIdealAlignment("good")
			},
			{
				"desc": "Change. We must help bring about the changes the gods are constantly working in the world.",
				"alignments": api.buildIdealAlignment("chaotic")
			},
			{
				"desc": "Power. I hope to one day rise to the top of my faith's religious hierarchy.",
				"alignments": api.buildIdealAlignment("lawful")
			},
			{
				"desc": "Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well.",
				"alignments": api.buildIdealAlignment("lawful")
			},
			{
				"desc": "Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against his or her teachings.",
				"alignments": api.buildIdealAlignment("any")
			}
		]
	},
	"bonds": {
		"choose": 1,
		"type": "bonds",
		"from": [
			"I would die to recover an ancient relic of my faith that was lost long ago.",
			"I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
			"I owe my life to the priest who took me in when my parents died.",
			"Everything I do is for the common people.",
			"I will do anything to protect the temple where I served.",
			"I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."
		]
	},
	"flaws": {
		"choose": 1,
		"type": "flaws",
		"from": [
			"I judge others harshly, and myself even more severely.",
			"I put too much trust in those who wield power within my temple's hierarchy.",
			"My piety sometimes leads me to blindly trust those that profess faith in my god.",
			"I am inflexible in my thinking.",
			"I am suspicious of strangers and expect the worst of them.",
			"Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."
		]
	},
	"url": "/api/backgrounds/acolyte"
})

export default Acolyte