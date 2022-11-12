import spells from '~/database/data/spells.json'

export async function getSpells(): Promise<Array<SpellApiObject>> {
	return spells
}