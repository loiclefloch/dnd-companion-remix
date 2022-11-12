import traits from '~/database/data/traits.json'
import isEmpty from 'lodash/isEmpty'
import camelize from '~/utils/camelize'
import { cloneDeep } from 'lodash'
import type { RaceApiObject } from '~/apiobjects/race.apiobject'
import type { RaceDto } from '~/dtos/race.dto'

export function formatRace(raceParam: RaceApiObject): RaceDto {
  const race = camelize(cloneDeep(raceParam))

  race.nameLocalized = {
    en: race.name,
  }

  race.hasSubraces = !isEmpty(race.subraces)
  race.isSubrace = !!race.race

  if (race.hasSubraces) {
    race.subraces = race.subraces.map(formatRace)
  }

  race.traits = race.traits.map(t => traits.find(trait => trait.index === t.index))

  return race
}
