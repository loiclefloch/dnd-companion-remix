import allRaces from '~/database/data/allRaces'
import useRootData from "~/hooks/useRootData"

import { formatRace } from "./useRace"

function useRaces() {
  return useData(allRaces.map(formatRace))
}

export default useRaces