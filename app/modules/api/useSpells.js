import spells from '~/database/data/spells.json'
import useRootData from "~/hooks/useRootData"

import { formatSpell } from './useSpell'

function useSpells() {
  const { spells } = useRootData()
  return spells.map(formatSpell)
}

export default useSpells