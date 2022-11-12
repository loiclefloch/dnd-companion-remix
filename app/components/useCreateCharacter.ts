// TODO: remove
import { v4 as uuid } from "uuid";
import { cloneDeep } from "lodash";
import { CharacterStorage } from "~/modules/db"
import createCharacterDefaultData from "~/modules/character/createCharacterDefaultData"

const isBrowser = typeof window !== "undefined";

function createCharacterReducer(state, action) {
  switch (action.type) {
    case 'update': {
      const updated = { ...state, ...action.data }
      // console.info(updated)
      return updated
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = () => CharacterStorage.getItem() || createCharacterDefaultData()

function getNextStep(step) {
  const map = {
    'initial': 'choose-race',
    'choose-race': 'choose-class',
    'choose-class': 'abilities',
    'abilities': 'choose-background',
    'abilities-with-bonus-options': 'choose-background',
    'choose-background': 'character-details',
    'character-details': 'personnality-traits',
    'personnality-traits': 'ideals',
    'ideals': 'alignment',
    'alignment': 'bonds',
    'bonds': 'flaws',
    'flaws': 'proficiencies',
    'proficiencies': 'languages',
    'languages': 'equipment',
    'equipment': 'resume',
    'resume': '',
  }

  return map[step]
}

function getBeforeResumeStep() {
  return 'equipment'
}

function getStepUrl(step) {
  const map = {
    'initial': '/',
    'choose-race': '/choose-race',
    'choose-class': '/choose-class',
    'proficiencies': '/proficiencies',
    'abilities': '/abilities',
    'abilities-with-bonus-options': '/abilities/choose-options',
    'choose-creation-mode': '/choose-creation-mode',
    'choose-background': '/choose-background',
    'character-details': '/character-details',
    'alignment': '/alignment',
    'languages': '/languages',
    'personnality-traits': '/personnality-traits',
    'ideals': '/ideals',
    'bonds': '/bonds',
    'flaws': '/flaws',
    'equipment': '/equipment',
    'resume': '/resume',
  }
  const root = `/character/create`

  if (!map[step]) {
    return null
  }

  return `${root}${map[step]}`
}

// function buildCharacter(characterParam) {
//   if (!characterParam) {
//     return null
//   }

//   const race = allRaces.find(r => r.index === characterParam.race)
//   const clss = classes.find(clss => clss.index === characterParam.classes[0])
//   const background = backgrounds.find(b => b.index === characterParam.background)

//   const character = cloneDeep(characterParam)

//   character.traits = race.traits.map(trait => ({
//     index: trait.index,
//     sourceType: 'race',
//   }))

//   character.alignment = characterParam.alignment

//   const toDelete = [
//     'alignmentIndex',
//     'step',
//     'currentStep',
//     'url',
//     'idealsData'
//   ]
//   toDelete.forEach(d => {
//     delete character[d]
//   })


  
//   //
//   // setup Hit points and hit dice
//   //
//   // Les points de vie de votre personnage définissent sa résistance au combat ou dans toutes autres 
//   // situations dangereuses. Vos points de vie sont déterminés par votre dé de vie (raccourcis pour Dé de points de vie).
//   // Au niveau 1, votre personnage possède 1 dé de vie, et le type de ce dé est défini par votre classe. 
//   // Vos points de vie de départ sont égaux au maximum de votre dé de vie, comme indiqué dans la description de votre classe 
//   // (vous ajouterez aussi votre modificateur de Constitution, qui sera déterminé à l'étape 3). 
//   // Cette valeur finale est aussi votre maximum de points de vie.
//   const hitDice = 1 + clss.hit_dice
//   character.maximumHitDice = hitDice
//   character.maximumHp = hitDice + character.stats.CON
//   character.currentHitDice = character.maximumHitDice
//   character.currentHp = character.maximumHp

//   const ZERO_CURRENCIES = {
//     cp: 0,
// 		sp: 0,
// 		gp: 0,
// 		ep: 0,
// 		pp: 0,
//   }
  
//   const startingCurrencies = background.startingCurrencies ? { ...ZERO_CURRENCIES, ...background.startingCurrencies } 
//     : {
//     ...ZERO_CURRENCIES,
//     gp: 15, // default: 15 GP
//   }

//   character.wallet = {
//     history: [
//       {
//         id: `${uuid()}`,
//         isAdd: true,
//         label: 'Porte-monnaie initial',
//         ...startingCurrencies
//       }
//     ]
//   }

//   // add unarmed strike
//   character.proficiencies.unshift({
//     index: 'unarmed-strike',
//     sourceType: 'race', // TODO: or other?
//   })

//     // TODO: after creating character we make it from level 0 to level 1! :)
//   // getLevellingSteps(character, 1)

//   return cloneDeep(character)
// }

function useCreateCharacter() {
  throw new Error("useCreateCharacter must not be used");
}

export default useCreateCharacter