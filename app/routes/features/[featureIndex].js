import { useRouter } from '~/hook/useRouter'

import useFeature from "../../modules/api/useFeature";
import useI18n from "../../modules/i18n/useI18n";
import Screen from "~/component/Screen";
import FeatureView from "~/component/FeatureView";
import IconBookOpen from "~/component/icons/IconBookOpen";

function Feature() {
	const router = useRouter()
	const { tr } = useI18n()
	const featureResponse = useFeature(router.query.featureIndex);

	const feature = featureResponse.data;

	return (
		<Screen
			title={!feature ? 'Feature' : `Feature - ${tr(feature?.nameLocalized)}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			isLoading={featureResponse.isLoading}
		>
			{feature && (
				<FeatureView feature={feature} />
			)}
		</Screen>
	)
}

export default Feature