import useRouter from '~/hooks/useRouter'

import useSpell from "../../modules/api/useSpell";
import useI18n from "../../modules/i18n/useI18n";

import Screen from "~/components/Screen";
import SpellView from "~/components/SpellView";
import IconBookOpen from "~/components/icons/IconBookOpen";

function Spell() {
	const router = useRouter()
	const { tr } = useI18n()
	const spell = useSpell(router.query.index);

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