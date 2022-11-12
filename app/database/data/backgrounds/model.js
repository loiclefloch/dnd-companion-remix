const Model = (api) => ({
	"index": "acolyte",
	"name": "Acolyte",
	"good_for_classes": [
	],
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
	],
	"starting_equipment_options": [
		// api.buildChooseEquipmentFromCategory(1, "holy-symbols")
	],

	"startingProficiencyOptions": api.buildProficiencyOption(1, "Artisan's Tools"),
	"features": [
		{
			"name": "",
			"desc": [
				""
			]
		}
	],
	"personalityTraits": {
		"choose": 2,
		"type": "personalityTraits",
		"from": [
			"",
			"",
			"",
			"",
			"",
			"",
			""
		]
	},
	"ideals": {
		"choose": 1,
		"type": "ideals",
		"from": [
			{
				"desc": "",
				"alignments": api.buildIdealAlignment("")
			},
			{
				"desc": "",
				"alignments": api.buildIdealAlignment("")
			},
			{
				"desc": "",
				"alignments": api.buildIdealAlignment("")
			},
			{
				"desc": "",
				"alignments": api.buildIdealAlignment("")
			},
			{
				"desc": "",
				"alignments": api.buildIdealAlignment("")
			},
			{
				"desc": "",
				"alignments": api.buildIdealAlignment("")
			},
		]
	},
	"bonds": {
		"choose": 1,
		"type": "bonds",
		"from": [
			"",
			"",
			"",
			"",
			"",
			""
		]
	},
	"flaws": {
		"choose": 1,
		"type": "flaws",
		"from": [
			"",
			"",
			"",
			"",
			"",
			"."
		]
	},
})

export default Model