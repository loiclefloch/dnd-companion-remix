import useRootData from "~/hooks/useRootData"
import { formatFeat } from "./useFeat"

function useFeats() {
  const { feats } = useRootData()
  return feats.map(formatFeat)
}

export default useFeats