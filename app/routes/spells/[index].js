import { useRouter } from '~/hook/useRouter'

import useSpell from "../../modules/api/useSpell";
import useI18n from "../../modules/i18n/useI18n";

import Screen from "~/component/Screen";
import SpellView from "~/component/SpellView";
import IconBookOpen from "~/component/icons/IconBookOpen";

function Spell() {
	const router = useRouter()
	const { tr } = useI18n()
	const spellResponse = useSpell(router.query.index);
	const spell = spellResponse.data;

	return (
		<Screen
			title={!spell ? 'Sort' : `${tr(spell?.nameLocalized)}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			isLoading={spellResponse.isLoading}
		>
			{spell && (
				<SpellView spell={spell} />
			)}
		</Screen>
	)
}

export default Spell