import type { MyCharacterDto } from '~/dtos/mycharacters.dto';
import characters from '~/modules/api/fixtures/characters'


export async function getMyCharacters(): Promise<MyCharacterDto[]> {
	return characters();
}