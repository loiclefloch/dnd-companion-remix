import type { SpellApiObject } from "~/apiobjects/spell.apiobject"
import type { SpellDto } from "~/dtos/spell.dto"

export function formatSpell(spell: SpellApiObject): SpellDto {
  spell.isCantrip = spell.level === 0
  spell.isCantripWithoutNeedToRun = spell.level === 0 && !spell.damage && !spell.heal 

  spell.isSpellWithouNeedToRun = !spell.damage && !spell.heal 

  return spell
}