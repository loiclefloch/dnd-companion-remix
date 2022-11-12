import useRootData from "~/hooks/useRootData"
import { formatClass } from "./useClass"

function useClasses() {
  const { classes } = useRootData()
  return classes.map(formatClass)
}

export default useClasses