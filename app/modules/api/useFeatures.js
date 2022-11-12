import useRootData from "~/hooks/useRootData"

import { formatFeature } from "./useFeature"

function useFeatures() {
  const { features } = useRootData()
  return features.map(formatFeature)
}

export default useFeatures