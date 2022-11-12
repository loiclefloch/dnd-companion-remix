import { useState, useMemo, useCallback } from "react"
import useRouter from "~/hooks/useRouter"
import { LevellingStorage, BackupStorage } from "~/modules/db"
import useCurrentCharacter from "./useCurrentCharacter"
import useCurrentRawCharacter from "./useCurrentRawCharacter"
import { getLevellingDataForClassesAndLevel, getSpellsSlotsForCharacterLevel } from "~/modules/levelling"
import getLevellingSteps from "~/modules/levelling/getLevellingSteps"
import { formatCharacter } from "~/mappers/character.mapper"
import { updateObjectOrCreateOnArray, deleteObjectOnArray } from "~/modules/utils/array";
import { cloneDeep } from "lodash";

import * as actions from "./levelling/action"

const initialState = () => LevellingStorage.getItem() || []

function useCharacterLevelling() {
  const router = useRouter()
  // TODO: remix
	// const { character, rawCharacter, updateCharacter } = useCurrentCharacter()
	const currentCharacter = useCurrentCharacter()
	const rawCharacter = useCurrentRawCharacter()

	const [ levellingState, setLevellingState] = useState(initialState())

  // TODO: remix post
  const updateLevellingState = useCallback((levellingState) => {
    LevellingStorage.setItem(levellingState)
    setLevellingState(levellingState)
  }, [])

  //
  //
  //

	const levellingContextData = useMemo(() => {
		if (currentCharacter) {
			const newLevel = currentCharacter.toLevel = currentCharacter.level + 1
			const levellingData = getLevellingDataForClassesAndLevel(currentCharacter.classes, newLevel)

			const race = currentCharacter.race
			const clss = currentCharacter.classes[0]

			const background = currentCharacter.background

			const steps = getLevellingSteps(currentCharacter, newLevel)

      const spellsSlots = getSpellsSlotsForCharacterLevel(
        currentCharacter.classes,
        newLevel
      )

			return {
				levellingData,
				newLevel,
				race,
				clss,
				background,
				steps,
        spellsSlots,
			}
		}
	}, [currentCharacter])

  function levellingDispatch (action) {
    const currentStep = router.query.step

    const steps = levellingContextData.steps
    
    const currentStepIndex = steps.findIndex(s => currentStep === s.name)
    const nextStep = steps[currentStepIndex + 1]

    // console.info({ currentStep, nextStep })
    // console.log(`dispatch ${action.type}`)

    const stepLevellingState = action.apply({
      levellingState,
      character: currentCharacter,
      rawCharacter,
      newLevel: levellingContextData.newLevel,
    })

    stepLevellingState.actionType = action.type

    const nextLevellingState = updateObjectOrCreateOnArray(
      levellingState, 
      stepLevellingState, 
      s => s.step.name === stepLevellingState.step.name
    )

    updateLevellingState(nextLevellingState)

    if (!nextStep) {
      throw new Error(`Next step not found`)
    }

    if (nextStep.name === currentStep) {
      throw new Error(`nextStep is same as currentStep`)
    }
    
    if (nextStep) {
      router.push(`/level-up/${nextStep.name}`)
    }
  }

  function getBuildedCharacter() {
    const character = cloneDeep(rawCharacter)

    levellingState.forEach(stepData => {
      const fnc = actions[stepData.actionType]
      if (!fnc) {
        throw new Error(`Action not found for type ${stepData.actionType}`)
      }
      const action = fnc(stepData)
      action.build({
        character,
        newLevel: levellingContextData.newLevel,
      })
    })

    return character
  }

  const clearStepLevellingState = useCallback((step) => {
    const nextLevellingState = deleteObjectOnArray(
      levellingState, 
      s => s.step.name === step.name
    )

    updateLevellingState(nextLevellingState)
  }, [levellingState, updateLevellingState])

	const context = {
    ...levellingContextData,

    levellingState,
    character: currentCharacter,
		rawCharacter,

    levellingDispatch,
    getBuildedCharacter,
    clearStepLevellingState,
    getFormattedBuildedCharacter: () => {
      return formatCharacter(getBuildedCharacter())
    },
    finalizeLevelling: () => {
      const updatedCharacter = getBuildedCharacter()

      // 1- backup
      // rawCharacter
      BackupStorage.add('character', updatedCharacter.id, updatedCharacter)
        
      // 2- update
      updateCharacter(updatedCharacter)

      // 3- clean
      updateLevellingState([]);

      // 4- redirect
      router.push(`/character/${updatedCharacter.id}`)
    }
  }

	return context
}

export default useCharacterLevelling