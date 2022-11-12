import useRouter from '~/hooks/useRouter'
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import useI18n from "~/modules/i18n/useI18n";
import Screen from "~/components/Screen";
import SpellView from "~/components/SpellView";
import IconBookOpen from "~/components/icons/IconBookOpen";
import SpellsView from "~/components/SpellsView"
import { formatSpell } from "~/mappers/spell.mapper";
import { requireUser } from "~/services/session.server";
import { getSpell } from "~/services/spells.server";
import { useLoaderData } from '@remix-run/react';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const spell = await getSpell(params.spellId);

  return json({
    spell: formatSpell(spell),
  });
}

function Spell() {
	const { spell } = useLoaderData<typeof loader>();
	const router = useRouter()
	const { tr } = useI18n()

	return (
		<Screen
			title={!spell ? 'Sort' : `${tr(spell?.nameLocalized)}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
		>
			<SpellView spell={spell} />
		</Screen>
	)
}

export default Spell