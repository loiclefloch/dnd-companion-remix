import useRouter from '~/hooks/useRouter'

import useMonster from "../../modules/api/useMonster";
import useI18n from "../../modules/i18n/useI18n";

import Screen from "~/components/Screen";
import MonsterView from "~/components/MonsterView";
import IconMonster from "~/components/icons/IconMonster";

function Monster() {
	const router = useRouter()
	const { tr } = useI18n()
	const monster = useMonster(router.query.index);

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