const clss = (api) => (
	{
    "index": "rogue",
    "name": "Rogue",
    "hit_dice": 8,
    "proficiency_choices": [
      {
        "choose": 4,
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
            "index": "skill-deception",
            "name": "Skill: Deception",
            "url": "/api/proficiencies/skill-deception"
          },
          {
            "index": "skill-insight",
            "name": "Skill: Insight",
            "url": "/api/proficiencies/skill-insight"
          },
          {
            "index": "skill-intimidation",
            "name": "Skill: Intimidation",
            "url": "/api/proficiencies/skill-intimidation"
          },
          {
            "index": "skill-investigation",
            "name": "Skill: Investigation",
            "url": "/api/proficiencies/skill-investigation"
          },
          {
            "index": "skill-perception",
            "name": "Skill: Perception",
            "url": "/api/proficiencies/skill-perception"
          },
          {
            "index": "skill-performance",
            "name": "Skill: Performance",
            "url": "/api/proficiencies/skill-performance"
          },
          {
            "index": "skill-persuasion",
            "name": "Skill: Persuasion",
            "url": "/api/proficiencies/skill-persuasion"
          },
          {
            "index": "skill-sleight-of-hand",
            "name": "Skill: Sleight of Hand",
            "url": "/api/proficiencies/skill-sleight-of-hand"
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
        "index": "light-armor",
        "name": "Light Armor",
        "url": "/api/proficiencies/light-armor"
      },
      {
        "index": "simple-weapons",
        "name": "Simple Weapons",
        "url": "/api/proficiencies/simple-weapons"
      },
      {
        "index": "longswords",
        "name": "Longswords",
        "url": "/api/proficiencies/longswords"
      },
      {
        "index": "rapiers",
        "name": "Rapiers",
        "url": "/api/proficiencies/rapiers"
      },
      {
        "index": "shortswords",
        "name": "Shortswords",
        "url": "/api/proficiencies/shortswords"
      },
      {
        "index": "hand-crossbows",
        "name": "Hand crossbows",
        "url": "/api/proficiencies/hand-crossbows"
      },
      {
        "index": "thieves-tools",
        "name": "Thieves' Tools",
        "url": "/api/proficiencies/thieves-tools"
      }
    ],
    "saving_throws": [
      {
        "index": "dex",
        "name": "DEX",
        "url": "/api/ability-scores/dex"
      },
      {
        "index": "int",
        "name": "INT",
        "url": "/api/ability-scores/int"
      }
    ],
    "starting_equipment": [
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
          "index": "dagger",
          "name": "Dagger",
          "url": "/api/equipment/dagger"
        },
        "quantity": 2
      },
      {
        "equipment": {
          "index": "thieves-tools",
          "name": "Thieves' Tools",
          "url": "/api/equipment/thieves-tools"
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
              "index": "rapier",
              "name": "Rapier",
              "url": "/api/equipment/rapier"
            },
            "quantity": 1
          },
          {
            "equipment": {
              "index": "shortsword",
              "name": "Shortsword",
              "url": "/api/equipment/shortsword"
            },
            "quantity": 1
          }
        ]
      },
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
          [
            {
              "equipment": {
                "index": "shortbow",
                "name": "Shortbow",
                "url": "/api/equipment/shortbow"
              },
              "quantity": 1
            },
            {
              "equipment": {
                "index": "arrow",
                "name": "Arrow",
                "url": "/api/equipment/arrow"
              },
              "quantity": 20
            }
          ]
        ]
      },
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          {
            "equipment": {
              "index": "burglars-pack",
              "name": "Burglar's Pack",
              "url": "/api/equipment/burglars-pack"
            },
            "quantity": 1
          },
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
    "class_levels": "/api/classes/rogue/levels",
    "multi_classing": {
      "prerequisites": [
        {
          "ability_score": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/ability-scores/dex"
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
          "index": "thieves-tools",
          "name": "Thieves' Tools",
          "url": "/api/proficiencies/thieves-tools"
        }
      ],
      "proficiency_choices": [
        {
          "choose": 1,
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
              "index": "skill-deception",
              "name": "Skill: Deception",
              "url": "/api/proficiencies/skill-deception"
            },
            {
              "index": "skill-insight",
              "name": "Skill: Insight",
              "url": "/api/proficiencies/skill-insight"
            },
            {
              "index": "skill-intimidation",
              "name": "Skill: Intimidation",
              "url": "/api/proficiencies/skill-intimidation"
            },
            {
              "index": "skill-investigation",
              "name": "Skill: Investigation",
              "url": "/api/proficiencies/skill-investigation"
            },
            {
              "index": "skill-perception",
              "name": "Skill: Perception",
              "url": "/api/proficiencies/skill-perception"
            },
            {
              "index": "skill-performance",
              "name": "Skill: Performance",
              "url": "/api/proficiencies/skill-performance"
            },
            {
              "index": "skill-persuasion",
              "name": "Skill: Persuasion",
              "url": "/api/proficiencies/skill-persuasion"
            },
            {
              "index": "skill-sleight-of-hand",
              "name": "Skill: Sleight of Hand",
              "url": "/api/proficiencies/skill-sleight-of-hand"
            },
            {
              "index": "skill-stealth",
              "name": "Skill: Stealth",
              "url": "/api/proficiencies/skill-stealth"
            }
          ]
        }
      ]
    },
    "subclasses": [
      {
        "index": "thief",
        "name": "Thief",
        "url": "/api/subclasses/thief"
      }
    ],
    "url": "/api/classes/rogue"
  }
	)
	
	export default clss