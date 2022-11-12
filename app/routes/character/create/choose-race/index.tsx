import { Link } from "@remix-run/react";
import Screen from "~/components/Screen";
import useI18n from '../../../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "~/components/ListSelectRow"
import IconRace from "~/components/icons/IconRace"
import ScreenIntroduction from "~/components/ScreenIntroduction"
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json} from "@remix-run/server-runtime";
import { useLoaderData } from '@remix-run/react';
import { formatRace } from '~/mappers/race.mapper';
import { getRaces } from '~/services/race.server';
import { requireUser } from '~/services/session.server';

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const races = await getRaces();

  return json({
    races: races.map(formatRace),
  });
}


function RaceRow({ race, onSelect }) {
	const { tr } = useI18n()
	return (
		<ListSelectRowAsCard
			onClick={() => {
				onSelect()
			}}
			icon={<IconRace race={race.index} className="h-8 fill-slate-600" />}
			title={tr(race.nameLocalized)}
			subtitle={tr(race.resume)}
		/>
	)
}


function Form({ races }) {
	return (
    <div className="flex flex-col">
      <ScreenIntroduction
        title="Choisissez votre race"
        description={`De nombreuses races existent dans le monde de Donjon & Dragons.`}
        actions={<button>En savoir plus</button>}
      />

      <ListRowSelectContainer className="mt-12 px-4">
        {races.map((race) => (
          <Link
            to={"/character/create/choose-race/" + race.index}
            key={race.index}
          >
            <RaceRow key={race.index} race={race} />
          </Link>
        ))}
      </ListRowSelectContainer>
    </div>
  );
}

export default function ChooseCharacterRace() {
	const { races } = useLoaderData<typeof loader>();

	return (
		<Screen
			title={"Choix de la race"}
		>
			<Form races={races} />
		</Screen>
	);
}
