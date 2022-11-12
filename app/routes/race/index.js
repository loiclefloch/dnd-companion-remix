import { useRouter } from '~/hook/useRouter'
import Screen from "~/component/Screen";
import useRaces from '../../modules/api/useRaces';
import useI18n from '../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "~/component/ListSelectRow"
import IconRace from "~/component/icons/IconRace"
import IconAcademicCap from "~/component/icons/IconAcademicCap"

function RaceRow({ race }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url =  `/race/${race.index}`

	return (
		<ListSelectRowAsCard
			size="small"
			onClick={() => router.push(url)}
			icon={<IconRace race={race.index} className="h-8 fill-slate-600" />}
			title={tr(race.nameLocalized)}
			subtitle={tr(race.resume)}
		/>
	)
}

function Race() {
	const racesResponse = useRaces()

  return (
    <Screen
      title={"Les races"}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			isLoading={racesResponse.isLoading}
			withBottomSpace
    >
			<div className="flex flex-col">

				<ListRowSelectContainer className="px-4 mt-4">
					{racesResponse.data?.map(race => (
						<RaceRow key={`race_${race.index}`} race={race} />
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default Race;
