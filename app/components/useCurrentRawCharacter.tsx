import useRootData from "~/hooks/useRootData"

function useCurrentRawCharacter() {
	const { currentRawCharacter } = useRootData()
	return currentRawCharacter
}

export default useCurrentRawCharacter