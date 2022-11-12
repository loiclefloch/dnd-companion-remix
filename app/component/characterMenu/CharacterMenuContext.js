import {createContext} from "react";
import useCharacterMenuCreator from "./useCharacterMenuCreator";
import CharacterMenu from "./CharacterMenu";

let CharacterMenuContext;
let { Provider } = (CharacterMenuContext = createContext());

CharacterMenuContext.displayName = 'CharacterMenuContext'

function CharacterMenuProvider ({ children }) {
	let { show, showCharacterMenu, hideCharacterMenu } = useCharacterMenuCreator();

	return (
		<Provider value={{ show, showCharacterMenu, hideCharacterMenu }}>
			<CharacterMenu open={show} />
			{children}
		</Provider>
	);
};

export { CharacterMenuContext, CharacterMenuProvider };
