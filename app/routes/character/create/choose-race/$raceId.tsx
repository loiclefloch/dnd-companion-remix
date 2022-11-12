import useRouter from "~/hooks/useRouter";
import Screen from "~/components/Screen";
import useI18n from "~/modules/i18n/useI18n";
import RaceDetailsView from "~/components/races/RaceDetailsView";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import useCreateCharacter from "~/components/useCreateCharacter";
import { Form, useLoaderData } from "@remix-run/react";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatRace } from "~/mappers/race.mapper";
import { getRace } from "~/services/race.server";
import { requireUser } from "~/services/session.server";
import { transformCharacterCreation } from "~/mappers/charactercreation.mapper";
import { getCharacterCreation, updateCreateCharacterChooseRaceStep } from "~/services/createcaracter.server";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();
  const race = await getRace(params.raceId);

  return json({
    race: formatRace(race),
    characterCreation: transformCharacterCreation(characterCreationApiObject),
  });
}


export async function action({ request }: ActionArgs) {
	const formData = await request.formData();

	await updateCreateCharacterChooseRaceStep(formData.get("raceIndex") as string)

  return redirect("/character/create/choose-class")
}

function FormView({ race }) {
  return (
    <Form method="post">
      <input type="hidden" name="raceIndex" value={race.index} />

      <div className="flex flex-col">
        <div className="relative mt-12 w-full px-4">
          <RaceDetailsView race={race} />
        </div>

        <ButtonBottomScreen
          type="submit"
          variant="cta"
        >
          Choisir
        </ButtonBottomScreen>
      </div>
    </Form>
  );
}

function DisplayCharacterRace() {
  const { tr } = useI18n();
  const { race } = useLoaderData<typeof loader>();

  return (
    <Screen title={tr(race?.nameLocalized)}>
      <FormView race={race} />
    </Screen>
  );
}

export default DisplayCharacterRace;
