import useRouter from '~/hooks/useRouter'

import useI18n from "../../modules/i18n/useI18n";
import Screen from "~/components/Screen";
import FeatContent from "~/components/FeatContent";
import IconBookOpen from "~/components/icons/IconBookOpen";

function Feat() {
	const router = useRouter()
	const { tr } = useI18n()
	const feat = useFeat(router.query.featIndex);

	return (
		<Screen
			title={!feat ? 'feat' : `feat - ${tr(feat?.nameLocalized)}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
		>
			{feat && (
				<div className='mt-8'>
					<FeatContent feat={feat} />
				</div>
			)}
		</Screen>
	)
}

export default Feat