const clss = (api) => (
	{
    "index": "monk",
    "name": "Monk",
    "hit_dice": 8,
    "proficiency_choices": [
      {
        "choose": 1,
        "type": "proficiencies",
        "from": [
          {
            "index": "alchemists-supplies",
            "name": "Alchemist's Supplies",
            "url": "/api/proficiencies/alchemists-supplies"
          },
          {
            "index": "brewers-supplies",
            "name": "Brewer's Supplies",
            "url": "/api/proficiencies/brewers-supplies"
          },
          {
            "index": "calligraphers-supplies",
            "name": "Calligrapher's Supplies",
            "url": "/api/proficiencies/calligraphers-supplies"
          },
          {
            "index": "carpenters-tools",
            "name": "Carpenter's Tools",
            "url": "/api/proficiencies/carpenters-tools"
          },
          {
            "index": "cartographers-tools",
            "name": "Cartographer's Tools",
            "url": "/api/proficiencies/cartographers-tools"
          },
          {
            "index": "cobblers-tools",
            "name": "Cobbler's Tools",
            "url": "/api/proficiencies/cobblers-tools"
          },
          {
            "index": "cooks-utensils",
            "name": "Cook's utensils",
            "url": "/api/proficiencies/cooks-utensils"
          },
          {
            "index": "glassblowers-tools",
            "name": "Glassblower's Tools",
            "url": "/api/proficiencies/glassblowers-tools"
          },
          {
            "index": "jewelers-tools",
            "name": "Jeweler's Tools",
            "url": "/api/proficiencies/jewelers-tools"
          },
          {
            "index": "leatherworkers-tools",
            "name": "Leatherworker's Tools",
            "url": "/api/proficiencies/leatherworkers-tools"
          },
          {
            "index": "masons-tools",
            "name": "Mason's Tools",
            "url": "/api/proficiencies/masons-tools"
          },
          {
            "index": "painters-supplies",
            "name": "Painter's Supplies",
            "url": "/api/proficiencies/painters-supplies"
          },
          {
            "index": "potters-tools",
            "name": "Potter's Tools",
            "url": "/api/proficiencies/potters-tools"
          },
          {
            "index": "smiths-tools",
            "name": "Smith's Tools",
            "url": "/api/proficiencies/smiths-tools"
          },
          {
            "index": "tinkers-tools",
            "name": "Tinker's Tools",
            "url": "/api/proficiencies/tinkers-tools"
          },
          {
            "index": "weavers-tools",
            "name": "Weaver's Tools",
            "url": "/api/proficiencies/weavers-tools"
          },
          {
            "index": "woodcarvers-tools",
            "name": "Woodcarver's Tools",
            "url": "/api/proficiencies/woodcarvers-tools"
          },
          {
            "index": "disguise-kit",
            "name": "Disguise Kit",
            "url": "/api/proficiencies/disguise-kit"
          },
          {
            "index": "forgery-kit",
            "name": "Forgery Kit",
            "url": "/api/proficiencies/forgery-kit"
          }
        ]
      },
      {
        "choose": 1,
        "type": "proficiencies",
        "from": [
          {
            "index": "bagpipes",
            "name": "Bagpipes",
            "url": "/api/proficiencies/bagpipes"
          },
          {
            "index": "drum",
            "name": "Drum",
            "url": "/api/proficiencies/drum"
          },
          {
            "index": "dulcimer",
            "name": "Dulcimer",
            "url": "/api/proficiencies/dulcimer"
          },
          {
            "index": "flute",
            "name": "Flute",
            "url": "/api/proficiencies/flute"
          },
          {
            "index": "lute",
            "name": "Lute",
            "url": "/api/proficiencies/lute"
          },
          {
            "index": "lyre",
            "name": "Lyre",
            "url": "/api/proficiencies/lyre"
          },
          {
            "index": "horn",
            "name": "Horn",
            "url": "/api/proficiencies/horn"
          },
          {
            "index": "pan-flute",
            "name": "Pan flute",
            "url": "/api/proficiencies/pan-flute"
          },
          {
            "index": "shawm",
            "name": "Shawm",
            "url": "/api/proficiencies/shawm"
          },
          {
            "index": "viol",
            "name": "Viol",
            "url": "/api/proficiencies/viol"
          }
        ]
      },
      {
        "choose": 2,
        "type": "proficiencies",
        "from": [
          {
            "index": "skill-acrobatics",
            "name": "Skill: Acrobatics",
            "url": "/api/proficiencies/skill-acrobatics"
          },
          {
            "index": "skill-athletics",
            "name": "Skill: Athletics",
            "url": "/api/proficiencies/skill-athletics"
          },
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
            "index": "skill-religion",
            "name": "Skill: Religion",
            "url": "/api/proficiencies/skill-religion"
          },
          {
            "index": "skill-stealth",
            "name": "Skill: Stealth",
            "url": "/api/proficiencies/skill-stealth"
          }
        ]
      }
    ],
    "proficiencies": [
      {
        "index": "simple-weapons",
        "name": "Simple Weapons",
        "url": "/api/proficiencies/simple-weapons"
      },
      {
        "index": "shortswords",
        "name": "Shortswords",
        "url": "/api/proficiencies/shortswords"
      }
    ],
    "saving_throws": [
      {
        "index": "str",
        "name": "STR",
        "url": "/api/ability-scores/str"
      },
      {
        "index": "dex",
        "name": "DEX",
        "url": "/api/ability-scores/dex"
      }
    ],
    "starting_equipment": [
      {
        "equipment": {
          "index": "dart",
          "name": "Dart",
          "url": "/api/equipment/dart"
        },
        "quantity": 10
      }
    ],
    "starting_equipment_options": [
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          {
            "equipment": {
              "index": "shortsword",
              "name": "Shortsword",
              "url": "/api/equipment/shortsword"
            },
            "quantity": 1
          },
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
              "index": "dungeoneers-pack",
              "name": "Dungeoneer's Pack",
              "url": "/api/equipment/dungeoneers-pack"
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
      }
    ],
    "class_levels": "/api/classes/monk/levels",
    "multi_classing": {
      "prerequisites": [
        {
          "ability_score": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/ability-scores/dex"
          },
          "minimum_score": 13
        },
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
          "index": "simple-weapons",
          "name": "Simple Weapons",
          "url": "/api/proficiencies/simple-weapons"
        },
        {
          "index": "shortswords",
          "name": "Shortswords",
          "url": "/api/proficiencies/shortswords"
        }
      ]
    },
    "subclasses": [
      {
        "index": "open-hand",
        "name": "Open Hand",
        "url": "/api/subclasses/open-hand"
      }
    ],
    "url": "/api/classes/monk"
  }
	)
	
	export default clss