import { cloneDeep } from 'lodash'
import equipment from '~/database/data/equipment.json'
import camelize from "../modules/utils/camelize"
import { formatEquipmentItem } from './equipment.mapper';
import formatStartingEquipmentOptions from "~/mappers/startingequipmentoptions.mapper"
import type { BackgroundApiObject } from '~/apiobjects/background.apiobject'
import type { BackgroundDto } from '~/dtos/background.dto'
import { formatProficiency } from './proficiency.mapper';
import classes from '~/database/data/classes';

export function formatBackground(backgroundParam: BackgroundApiObject): BackgroundDto {
  const background = camelize(cloneDeep(backgroundParam))
  background.nameLocalized = {
    en: background.name
  }

  background.goodForClasses = (background.goodForClasses || []).map(clss => classes.find(c => c.index === clss))

  background.ideals.from = background.ideals.from.map((ideal, index) => {
    // transform "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld."
    // to title / desc
    const fullDesc = ideal.desc
    const match = ideal.desc.match(/^(.*?)[.?!]\s(.*)/)
    const title = match[1]
    const desc = match[2]

    return {
      index, // add index 
      ...ideal,
      title,
      desc,
      fullDesc,
    }
  })

  if (background.startingEquipment) {
    background.startingEquipment = background.startingEquipment.map(item => {
      return {
        ...formatEquipmentItem(equipment.find(i => i.index === item.equipment.index)),
        ...item,
        equipment: undefined
      }
    })
  }

  if (background.startingProficiencyOptions) {
		background.startingProficiencyOptions.from = background.startingProficiencyOptions.from.map(o => ({
			...o,
			sourceType: 'background'
		}))
    .map(formatProficiency)
	}

  if (background.startingProficiencies) {
		background.startingProficiencies = background.startingProficiencies.map(formatProficiency)
	}

  if (background.startingEquipmentOptions) {
    background.startingEquipmentOptions = formatStartingEquipmentOptions(background.startingEquipmentOptions)
  }

  return background
}

