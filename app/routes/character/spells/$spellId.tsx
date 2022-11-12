import useRouter from '~/hooks/useRouter'

import useI18n from "~/modules/i18n/useI18n";
import { CharacterProvider} from "~/modules/character/ContextCharacter"
import Screen from "~/components/Screen";
import SpellView from "~/components/SpellView";
import IconBookOpen from "~/components/icons/IconBookOpen";
import IconPencil from "~/components/icons/IconPencil";
import useEditEditCharacterSpellScreenAsModal from "~/components/useEditEditCharacterSpellScreenAsModal";
import { useLoaderData } from '@remix-run/react';
import { requireUser } from '~/services/session.server';
import type { LoaderArgs} from '@remix-run/server-runtime';
import { json} from '@remix-run/server-runtime';
import { formatCurrentCharacter } from '~/mappers/character.mapper';
import { formatSpell } from '~/mappers/spell.mapper';
import { getCurrentCharacter } from '~/services/currentcharacter.server';
import { getSpell } from '~/services/spells.server';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const spell = await getSpell(params.spellId as string);
	const currentCharacter = await getCurrentCharacter();

  return json({
    spell: formatSpell(spell),
		character: formatCurrentCharacter(currentCharacter)
  });
}

function Spell() {
	const { character, spell } = useLoaderData<typeof loader>();
	const { tr } = useI18n()
	const { showEditCharacterSpellModal } = useEditEditCharacterSpellScreenAsModal()

	return (
		<CharacterProvider character={character}>
			<Screen
				title={!spell ? 'Sort' : `${tr(spell?.nameLocalized)}`}
				titleIcon={<IconBookOpen className="w-6 h-6" />}
				rightAction={
					<IconPencil
						className="w-5 h-5 text-slate-700"
						onClick={() => showEditCharacterSpellModal(spell, character)}
					/>
				}
			>
				<SpellView spell={spell} character={character} />
			</Screen>
		</CharacterProvider>
	)
}

export default Spell