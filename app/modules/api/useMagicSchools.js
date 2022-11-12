import useRootData from "~/hooks/useRootData"

import { format } from './useMagicSchool'

function useMagicSchools() {
  const { magicSchools } = useRootData()
  return magicSchools.map(format)
}

export default useMagicSchools