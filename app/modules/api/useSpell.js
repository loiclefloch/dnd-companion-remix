import useRootData from "~/hooks/useRootData"

// TODO: remove
function useSpell(index) {
  const { spells } = useRootData()
  return spells.find(spell => spell.index === index)
}

export default useSpell