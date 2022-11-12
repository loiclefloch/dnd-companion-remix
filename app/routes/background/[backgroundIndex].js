import { useRouter } from '~/hook/useRouter'
import Screen from "~/component/Screen";
import useBackground from '../../modules/api/useBackground';
import useI18n from '../../modules/i18n/useI18n';
import BackgroundContent from '~/components/background/BackgroundContent';

function Background() {
	const { tr } = useI18n()
	const router = useRouter()
	const backgroundResponse = useBackground(router.query.backgroundIndex)

	const background = backgroundResponse.data

	return (
		<Screen
			title={tr(background?.nameLocalized)}
			isLoading={backgroundResponse.isLoading}
			withBottomSpace
		>
			{background && (
				<div className="flex flex-col">
					<div className="relative w-full px-4 mt-4">
						<BackgroundContent index={background.index} />
					</div>
				</div>
			)}
		</Screen>
  );
}

export default Background;
