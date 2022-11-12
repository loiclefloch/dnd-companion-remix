import useRouter from '~/hooks/useRouter'

import useI18n from "../../modules/i18n/useI18n";

import Screen from "~/components/Screen";
import MonsterView from "~/components/MonsterView";
import IconMonster from "~/components/icons/IconMonster";
import { formatMonster } from '~/mappers/monster.mapper';
import { useLoaderData } from '@remix-run/react';
import { getMonster } from '~/services/monster.server';
import { json } from '@remix-run/server-runtime';
import { requireUser } from '~/services/session.server';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const monster = await getMonster(params.monsterId as string);

  return json({
    monster: formatMonster(monster)
  });
}


function Monster() {
  const { monster } = useLoaderData<typeof loader>();
	const router = useRouter()
	const { tr } = useI18n()


	return (
		<Screen
			title={!monster ? 'Monstre' : `${tr(monster?.nameLocalized)}`}
			titleIcon={<IconMonster className="w-6 h-6 fill-slate-700" />}
			withBottomSpace
		>
			<MonsterView monster={monster} />
		</Screen>
	)
}

export default Monster
