import useRouter from '~/hooks/useRouter'
import Screen from "~/components/Screen";
import useI18n from '../../modules/i18n/useI18n';
import BackgroundContent from '~/components/background/BackgroundContent';

function Background() {
	const { tr } = useI18n()
	const router = useRouter()
	const background = useBackground(router.query.backgroundIndex)

	return (
		<Screen
			title={tr(background?.nameLocalized)}
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
