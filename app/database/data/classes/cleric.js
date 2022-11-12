const clss = (api) => (
	{
    "index": "cleric",
    "name": "Cleric",
    "hit_dice": 8,
    "proficiency_choices": [
      {
        "choose": 2,
        "type": "proficiencies",
        "from": [
          {
            "index": "skill-history",
            "name": "Skill: History",
            "url": "/api/proficiencies/skill-history"
          },
          {
            "index": "skill-insight",
            "name": "Skill: Insight",
            "url": "/api/proficiencies/skill-insight"
          },
          {
            "index": "skill-medicine",
            "name": "Skill: Medicine",
            "url": "/api/proficiencies/skill-medicine"
          },
          {
            "index": "skill-persuasion",
            "name": "Skill: Persuasion",
            "url": "/api/proficiencies/skill-persuasion"
          },
          {
            "index": "skill-religion",
            "name": "Skill: Religion",
            "url": "/api/proficiencies/skill-religion"
          }
        ]
      }
    ],
    "proficiencies": [
      {
        "index": "light-armor",
        "name": "Light Armor",
        "url": "/api/proficiencies/light-armor"
      },
      {
        "index": "medium-armor",
        "name": "Medium Armor",
        "url": "/api/proficiencies/medium-armor"
      },
      {
        "index": "shields",
        "name": "Shields",
        "url": "/api/proficiencies/shields"
      },
      {
        "index": "simple-weapons",
        "name": "Simple Weapons",
        "url": "/api/proficiencies/simple-weapons"
      }
    ],
    "saving_throws": [
      {
        "index": "wis",
        "name": "WIS",
        "url": "/api/ability-scores/wis"
      },
      {
        "index": "cha",
        "name": "CHA",
        "url": "/api/ability-scores/cha"
      }
    ],
    "starting_equipment": [
      {
        "equipment": {
          "index": "shield",
          "name": "Shield",
          "url": "/api/equipment/shield"
        },
        "quantity": 1
      }
    ],
    "starting_equipment_options": [
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          {
            "equipment": {
              "index": "mace",
              "name": "Mace",
              "url": "/api/equipment/mace"
            },
            "quantity": 1
          },
          {
            "equipment": {
              "index": "warhammer",
              "name": "Warhammer",
              "url": "/api/equipment/warhammer"
            },
            "quantity": 1,
            "prerequisites": [
              {
                "type": "proficiency",
                "proficiency": {
                  "index": "warhammers",
                  "name": "Warhammers",
                  "url": "/api/proficiencies/warhammers"
                }
              }
            ]
          }
        ]
      },
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          {
            "equipment": {
              "index": "scale-mail",
              "name": "Scale Mail",
              "url": "/api/equipment/scale-mail"
            },
            "quantity": 1
          },
          {
            "equipment": {
              "index": "leather-armor",
              "name": "Leather Armor",
              "url": "/api/equipment/leather-armor"
            },
            "quantity": 1
          },
          {
            "equipment": {
              "index": "chain-mail",
              "name": "Chain Mail",
              "url": "/api/equipment/chain-mail"
            },
            "quantity": 1,
            "prerequisites": [
              {
                "type": "proficiency",
                "proficiency": {
                  "index": "chain-mail",
                  "name": "Chain Mail",
                  "url": "/api/proficiencies/chain-mail"
                }
              }
            ]
          }
        ]
      },
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          [
            {
              "equipment": {
                "index": "crossbow-light",
                "name": "Crossbow, light",
                "url": "/api/equipment/crossbow-light"
              },
              "quantity": 1
            },
            {
              "equipment": {
                "index": "crossbow-bolt",
                "name": "Crossbow bolt",
                "url": "/api/equipment/crossbow-bolt"
              },
              "quantity": 20
            }
          ],
          {
            "equipment_option": {
              "choose": 1,
              "type": "equipment",
              "from": {
                "equipment_category": {
                  "index": "simple-weapons",
                  "name": "Simple Weapons",
                  "url": "/api/equipment-categories/simple-weapons"
                }
              }
            }
          }
        ]
      },
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          {
            "equipment": {
              "index": "priests-pack",
              "name": "Priest's Pack",
              "url": "/api/equipment/priests-pack"
            },
            "quantity": 1
          },
          {
            "equipment": {
              "index": "explorers-pack",
              "name": "Explorer's Pack",
              "url": "/api/equipment/explorers-pack"
            },
            "quantity": 1
          }
        ]
      },
      {
        "choose": 1,
        "type": "equipment",
        "from": {
          "equipment_category": {
            "index": "holy-symbols",
            "name": "Holy Symbols",
            "url": "/api/equipment-categories/holy-symbols"
          }
        }
      }
    ],
    "class_levels": "/api/classes/cleric/levels",
    "multi_classing": {
      "prerequisites": [
        {
          "ability_score": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/ability-scores/wis"
          },
          "minimum_score": 13
        }
      ],
      "proficiencies": [
        {
          "index": "light-armor",
          "name": "Light Armor",
          "url": "/api/proficiencies/light-armor"
        },
        {
          "index": "medium-armor",
          "name": "Medium Armor",
          "url": "/api/proficiencies/medium-armor"
        },
        {
          "index": "shields",
          "name": "Shields",
          "url": "/api/proficiencies/shields"
        }
      ]
    },
    "subclasses": [
      {
        "index": "life",
        "name": "Life",
        "url": "/api/subclasses/life"
      }
    ],
    "spellcasting": {
      "level": 1,
      "spellcasting_ability": {
        "index": "wis",
        "name": "WIS",
        "url": "/api/ability-scores/wis"
      },
      "info": [
        {
          "name": "Cantrips",
          "desc": [
            "At 1st level, you know three cantrips of your choice from the cleric spell list. You learn additional cleric cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Cleric table."
          ]
        },
        {
          "name": "Preparing and Casting Spells",
          "desc": [
            "The Cleric table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.",
            "You prepare the list of cleric spells that are available for you to cast, choosing from the cleric spell list. When you do so, choose a number of cleric spells equal to your Wisdom modifier + your cleric level (minimum of one spell). The spells must be of a level for which you have spell slots.",
            "For example, if you are a 3rd-level cleric, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell cure wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.",
            "You can change your list of prepared spells when you finish a long rest. Preparing a new list of cleric spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list."
          ]
        },
        {
          "name": "Spellcasting Ability",
          "desc": [
            "Wisdom is your spellcasting ability for your cleric spells. The power of your spells comes from your devotion to your deity. You use your Wisdom whenever a cleric spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a cleric spell you cast and when making an attack roll with one.",
            "Spell save DC = 8 + your proficiency bonus + your Wisdom modifier",
            "Spell attack modifier = your proficiency bonus + your Wisdom modifier"
          ]
        },
        {
          "name": "Ritual Casting",
          "desc": [
            "You can cast a cleric spell as a ritual if that spell has the ritual tag and you have the spell prepared."
          ]
        },
        {
          "name": "Spellcasting Focus",
          "desc": [
            "You can use a holy symbol (see Equipment) as a spellcasting focus for your cleric spells."
          ]
        }
      ]
    },
    "spells": "/api/classes/cleric/spells",
    "url": "/api/classes/cleric"
  }
	)
	
	export default clss