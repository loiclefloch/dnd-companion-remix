import { cloneDeep } from 'lodash'
import equipment from '~/database/data/equipment.json'
import camelize from "../modules/utils/camelize"
import { formatEquipmentItem } from './equipment.mapper';
import formatStartingEquipmentOptions from "~/mappers/startingequipmentoptions.mapper"
import type { BackgroundApiObject, BackgroundBondApiObject, BackgroundFlawApiObject, BackgroundIdealsApiObject, BackgroundPersonalityTraitsApiObject } from '~/apiobjects/background.apiobject'
import { formatProficiency } from './proficiency.mapper';
import classes from '~/database/data/classes';
import type { BackgroundBondDto, BackgroundDto, BackgroundFlawDto, BackgroundIdealsDto, BackgroundPersonalityTraitsDto } from '~/dtos/background.dto';

export function transformBackgroundFlaws(backgroundFlaw: BackgroundFlawApiObject): BackgroundFlawDto {
  return {
    choose: backgroundFlaw.choose,
    from: backgroundFlaw.from,
  };
}

export function transformBackgroundBonds(backgroundBond: BackgroundBondApiObject): BackgroundBondDto {
  return {
    choose: backgroundBond.choose,
    from: backgroundBond.from,
  };
}

export function transformBackgroundIdeals(backgroundIdealsApiObject: BackgroundIdealsApiObject): BackgroundIdealsDto {
  return {
    choose: backgroundIdealsApiObject.choose,
    from: backgroundIdealsApiObject.from.map((f, index) => ({
      index,
      desc: f.desc,
      alignments: f.alignments,
    }))
  }
}

export function transformBackgroundPersonalityTraits(backgroundPersonalityTraits: BackgroundPersonalityTraitsApiObject): BackgroundPersonalityTraitsDto {
  return {
    choose: backgroundPersonalityTraits.choose,
    from: backgroundPersonalityTraits.from,
  }
}


export function formatBackground(backgroundApiObject: BackgroundApiObject): BackgroundDto {
  const background = camelize(cloneDeep(backgroundApiObject))
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

