import useRootData from "~/hooks/useRootData"

import { formatBackground } from "./useBackground"

function useBackgrounds() {
  const { backgrounds } = useRootData()
  return backgrounds.map(formatBackground)
}

export default useBackgrounds