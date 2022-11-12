import { useRouter } from '~/hook/useRouter'

import useFeat from "../../modules/api/useFeat";
import useI18n from "../../modules/i18n/useI18n";
import Screen from "~/component/Screen";
import FeatContent from "~/component/FeatContent";
import IconBookOpen from "~/component/icons/IconBookOpen";

function Feat() {
	const router = useRouter()
	const { tr } = useI18n()
	const featResponse = useFeat(router.query.featIndex);

	const feat = featResponse.data;

	return (
		<Screen
			title={!feat ? 'feat' : `feat - ${tr(feat?.nameLocalized)}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			isLoading={featResponse.isLoading}
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