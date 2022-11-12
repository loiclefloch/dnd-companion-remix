import useRootData from "~/hooks/useRootData"

function useRules() {
  const { rules } = useRootData()
  return rules
}

export default useRules