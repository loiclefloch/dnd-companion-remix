import Screen from "~/components/Screen";
import useI18n from "../../modules/i18n/useI18n";
import RaceDetailsView from "~/components/races/RaceDetailsView";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatRace } from "~/mappers/race.mapper";
import { getRace } from "~/services/race.server";
import { requireUser } from "~/services/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const race = await getRace(params.raceId as string);

  return json({
    race: formatRace(race),
  });
}

function Race() {
  const { tr } = useI18n();
  const { race } = useLoaderData<typeof loader>();

  return (
    <Screen title={tr(race?.nameLocalized)} withBottomSpace>
      <div className="p-4">
        <RaceDetailsView race={race} />
      </div>
    </Screen>
  );
}

export default Race;
