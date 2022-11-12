import Screen from "~/components/Screen";
import { Link } from "@remix-run/react";
import useI18n from "../../modules/i18n/useI18n";
import {
  ListSelectRowAsCard,
  ListRowSelectContainer,
} from "~/components/ListSelectRow";
import IconRace from "~/components/icons/IconRace";
import IconAcademicCap from "~/components/icons/IconAcademicCap";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatRace } from "~/mappers/race.mapper";
import { getRaces } from "~/services/race.server";
import { requireUser } from "~/services/session.server";

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const races = await getRaces();

  return json({
    races: races.map(formatRace),
  });
}

function RaceRow({ race }) {
  const { tr } = useI18n();

  return (
    <ListSelectRowAsCard
      to={`/race/${race.index}`}
      size="small"
      icon={<IconRace race={race.index} className="h-8 fill-slate-600" />}
      title={tr(race.nameLocalized)}
      subtitle={tr(race.resume)}
    />
  );
}

export default function Race() {
  const { races } = useLoaderData<typeof loader>();

  return (
    <Screen
      title={"Les races"}
      titleIcon={<IconAcademicCap className="h-6 w-6" />}
      withBottomSpace
    >
      <div className="flex flex-col">
        <ListRowSelectContainer className="mt-4 px-4">
          {races.map((race) => (
            <RaceRow key={`race_${race.index}`} race={race} />
          ))}
        </ListRowSelectContainer>
      </div>
    </Screen>
  );
}
