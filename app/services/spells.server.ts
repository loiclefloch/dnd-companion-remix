import type { SpellApiObject } from '~/apiobjects/spell.apiobject';
import spells from '~/database/data/spells.json'

export async function getSpells(): Promise<Array<SpellApiObject>> {
	return spells
}

export async function getSpell(spellId: string): Promise<SpellApiObject> {
	const spell = spells.find((spell) => spell.index === spellId);

  if (!spell) {
    throw new Error(`Spell not found for id ${spellId}`);
  }

	return spell
}