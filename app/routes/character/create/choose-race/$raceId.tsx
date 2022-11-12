import useRouter from "~/hooks/useRouter";
import Screen from "~/components/Screen";
import useI18n from "~/modules/i18n/useI18n";
import RaceDetailsView from "~/components/races/RaceDetailsView";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import useCreateCharacter from "~/components/useCreateCharacter";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatRace } from "~/mappers/race.mapper";
import { getRace } from "~/services/race.server";
import { requireUser } from "~/services/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const race = await getRace(params.raceId);

  return json({
    race: formatRace(race),
  });
}

function Form({ race }) {
  const { updateCharacter } = useCreateCharacter();

  return (
    <div className="flex flex-col">
      <div className="relative mt-12 w-full px-4">
        <RaceDetailsView race={race} />
      </div>

      <ButtonBottomScreen
        variant="cta"
        onClick={() => {
          const url = "/character/create/choose-class";
          updateCharacter({ race: race.index, step: "choose-race", url });
        }}
      >
        Choisir
      </ButtonBottomScreen>
    </div>
  );
}

function DisplayCharacterRace() {
  const { tr } = useI18n();
  const router = useRouter();
  const { race } = useLoaderData<typeof loader>();

  return (
    <Screen title={tr(race?.nameLocalized)}>
      {race && <Form race={race} />}
    </Screen>
  );
}

export default DisplayCharacterRace;
