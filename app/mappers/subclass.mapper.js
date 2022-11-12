import { cloneDeep } from 'lodash'
import camelize from '../utils/camelize'

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
