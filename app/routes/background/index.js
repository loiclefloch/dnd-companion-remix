import { useRouter } from '~/hook/useRouter'
import Screen from "~/component/Screen";
import useBackgrounds from '../../modules/api/useBackgrounds';
import { makeI18n } from '../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "~/component/ListSelectRow"
import IconAcademicCap from "~/component/icons/IconAcademicCap"

const useI18n = makeI18n({
	'screen.title': {
		fr: `Les backgrounds`,
		en: `Backgrounds`,
	}
})

function BackgroundRow({ background }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url =  `/background/${background.index}`

	return (
		<ListSelectRowAsCard
			size="small"
			onClick={() => router.push(url)}
			title={tr(background.nameLocalized)}
			subtitle={tr(background.resume)}
		/>
	)
}

function Backgrounds() {
	const { tr } = useI18n()
	const backgroundsResponse = useBackgrounds()

  return (
    <Screen
      title={tr`screen.title`}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			isLoading={backgroundsResponse.isLoading}
			withBottomSpace
    >
			<div className="flex flex-col">

				<ListRowSelectContainer className="px-4 mt-4">
					{backgroundsResponse.data?.map(background => (
						<BackgroundRow key={`background_${background.index}`} background={background} />
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default Backgrounds;
