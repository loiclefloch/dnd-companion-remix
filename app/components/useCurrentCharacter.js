import useRootData from "~/hooks/useRootData"

function useCurrentCharacter() {
	const { currentCharacter } = useRootData()
	return {
		character: currentCharacter, 
		characterDispatch: null // TODO: remix.
	}
}

export default useCurrentCharacter