import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import BackgroundContent from "~/components/background/BackgroundContent";
import Screen from "~/components/Screen";
import useI18n from "~/modules/i18n/useI18n";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs} from "@remix-run/server-runtime";
import { redirect} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatBackground } from "~/mappers/background.mapper";
import { getBackground } from "~/services/background.server";
import { requireUser } from "~/services/session.server";
import { getCharacterCreation, updateCreateCharacterChooseBackgroundStep } from "~/services/createcaracter.server";
import { BackgroundFeatureApiObject } from "~/apiobjects/background.apiobject";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const backgroundApiObject = await getBackground(
    params.backgroundIndex as string
  );

  return json({
    background: formatBackground(backgroundApiObject),
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

	const backgroundIndex =	formData.get("backgroundIndex") as string

  const backgroundApiObject = await getBackground(backgroundIndex as string);

	await updateCreateCharacterChooseBackgroundStep(
    backgroundIndex,
    backgroundApiObject.features.map((feature: BackgroundFeatureApiObject) => ({
      index: feature.index,
      type: "background",
    }))
  );

  return redirect("/character/create/character-details")
}

function CreateCharacterBackgroundDetail() {
  const { background } = useLoaderData<typeof loader>();
  const { tr } = useI18n();

  return (
    <Screen
      title={background ? `Background - ${background.name}` : ""}
      withBottomSpace
    >
      <Form method="post">
        <input type="hidden" name="backgroundIndex" value={background.index} />

        <div className="flex flex-col px-4">
          <BackgroundContent background={background} />
        </div>

        <ButtonBottomScreen variant="cta" type="submit">
          Choisir
        </ButtonBottomScreen>
      </Form>
    </Screen>
  );
}

export default CreateCharacterBackgroundDetail;
