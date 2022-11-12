import { cloneDeep, isArray } from 'lodash'
import useRootData from "~/hooks/useRootData"
import equipment from '~/database/data/equipment.json'
import proficiencies from '~/database/data/proficiencies.json'
import camelize from '../modules/utils/camelize'
import formatStartingEquipmentOptions from "~/mappers/startingequipmentoptions.mapper"
import { ClassApiObject } from '../apiobjects/class.apiobject'
import { ClassDto } from '../dtos/class.dto'
import { formatEquipmentItem } from './equipment.mapper';
import { formatProficiency } from './proficiency.mapper';

export function formatClass(clssParam: ClassApiObject): ClassDto {
  const clss = camelize(cloneDeep(clssParam))
  clss.nameLocalized = {
    en: clss.name,
    fr: clss.name,
  }
  clss.resume = {
    en: 'class small description'
  }

  if (clss.startingEquipment) {
    clss.startingEquipment = clss.startingEquipment.map(item => {
      return {
        ...formatEquipmentItem(equipment.find(i => i.index === item.equipment.index)),
        ...item,
        equipment: undefined
      }
    })
  }

  if (clss.proficiencies) {
    clss.proficiencies = clss.proficiencies.map(proficiency => {
      return formatProficiency(proficiencies.find(i => i.index === proficiency.index))
    })
  }

  if (clss.startingEquipmentOptions) {
    clss.startingEquipmentOptions = formatStartingEquipmentOptions(clss.startingEquipmentOptions)
  }


  return clss
}

export function formatSubclass(subclassParam) {
  if (!subclassParam) { // required for build
    return null
  }
  const subclass = camelize(cloneDeep(subclassParam))
  subclass.nameLocalized = {
    en: subclass.name,
    fr: subclass.name,
  }
  subclass.resume = {
    en: 'subclass small description'
  }

	subclass.spells?.forEach(spell => {
		spell.prerequisites.forEach(prerequisite => {
			if (prerequisite.type === 'level') {
				prerequisite.isLevel = true
				prerequisite.level = parseInt(prerequisite.index.split('-')[1], 10)
			} else if (prerequisite.type === 'feature') {
				prerequisite.isFeature = true
			} else {
				debugger
				throw new Error(`Not handled`)
			}
		})
	})

  return subclass
}
