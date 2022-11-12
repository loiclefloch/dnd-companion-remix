
export function formatSpell(spell: SpellApiObject): SpellDto {
  if (!spell) {
    return null
  }

  spell.isCantrip = spell.level === 0
  spell.isCantripWithoutNeedToRun = spell.level === 0 && !spell.damage && !spell.heal 

  spell.isSpellWithouNeedToRun = !spell.damage && !spell.heal 

  return spell
}