import useRootData from "~/hooks/useRootData"

import { formatSubclass } from "./useSubclass"

function useSubclasses(clss) {
  const { subclasses } = useRootData()
  return subclasses.filter(s => s.class.index === clss).map(formatSubclass)
}

export default useSubclasses