import SpellsView from "~/components/SpellsView"
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatCurrentCharacter } from "~/mappers/character.mapper";
import { formatSpell } from "~/mappers/spell.mapper";
import { getCurrentCharacter } from "~/services/currentcharacter.server";
import { requireUser } from "~/services/session.server";
import { getSpells } from "~/services/spells.server";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const spells = await getSpells();
	const currentCharacter = await getCurrentCharacter();

  return json({
    spells: spells.map(formatSpell),
		character: formatCurrentCharacter(currentCharacter)
  });
}


/**
 * Spell list with the character as context
 */
export default function CharacterSpells() {
  const { character, spells } = useLoaderData<typeof loader>();

  // define character on context
  // automatic filtering for the character
  return <SpellsView spells={spells} contextCharacter={character} />;
}
