import useRootData from "~/hooks/useRootData"
import formatCharacter from '../character/formatCharacter'

export default function useCharacter(id) {
  const { characters } = useRootData()
	// TODO: remix
	return formatCharacter(characters.find(character => character.id === id))
}
