import useRootData from "~/hooks/useRootData"



function useSpell(index) {
  const { spells } = useRootData()
  return formatSpell(spells.find(spell => spell.index === index))
}

export default useSpell