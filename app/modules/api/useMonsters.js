import useRootData from "~/hooks/useRootData"

import { formatMonster } from "./useMonster"

function useMonsters() {
  const { monsters } = useRootData()
  return monsters.map(formatMonster)
}

export default useMonsters