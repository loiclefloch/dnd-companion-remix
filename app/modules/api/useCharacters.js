import useRootData from "~/hooks/useRootData"

function useCharacters() {
  const { characters } = useRootData()

  return characters
}

export default useCharacters