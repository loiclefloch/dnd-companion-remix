import useRouter from '~/hooks/useRouter'
import Screen from "~/components/Screen";
import useRace from '../../modules/api/useRace';
import useI18n from '../../modules/i18n/useI18n';
import RaceDetailsView from '~/components/races/RaceDetailsView';

function Race() {
	const { tr } = useI18n()
	const router = useRouter()
	const race = useRace(router.query.raceIndex)

	return (
		<Screen
			title={tr(race?.nameLocalized)}
			isLoading={race.isLoading}
			withBottomSpace
		>
			<div className="p-4">
				<RaceDetailsView race={race} />
			</div>
		</Screen>
  );
}

export default Race;
