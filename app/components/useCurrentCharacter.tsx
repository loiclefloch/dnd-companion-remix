import useRootData from "~/hooks/useRootData"

function useCurrentCharacter() {
	const { currentCharacter } = useRootData()
	return currentCharacter
}

export default useCurrentCharacter