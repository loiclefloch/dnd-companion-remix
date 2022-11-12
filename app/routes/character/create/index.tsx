import { isEmpty } from "lodash";
import { useState } from "react";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import Screen from "~/components/Screen";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { requireUser } from "~/services/session.server";
import {
  getCharacterCreation,
  updateCreateCharacterInitialStep,
} from "~/services/createcaracter.server";
import { Form, useLoaderData } from "@remix-run/react";
import { transformCharacterCreation } from "../../../mappers/charactercreation.mapper";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

  return json({
    characterCreation: transformCharacterCreation(characterCreationApiObject),
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  await updateCreateCharacterInitialStep(formData.get("name") as string);

  return redirect("/character/create/choose-race");
}

export default function CreateCharacterScreen() {
  const { characterCreation } = useLoaderData<typeof loader>();

  const [name, setName] = useState<string>(characterCreation.name);

  const formHasErrors = isEmpty(name);

  return (
    <Screen title={"Nouveau personnage"}>
      <Form method="post">
        <div className="flex flex-col">
          {/* TODO: name generator */}
          <div className="relative mt-12 w-full px-4">
            <input
              type="text"
              className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white px-2 py-1 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-slate-400"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <ButtonBottomScreen
            type="submit"
            disabled={formHasErrors}
            variant="cta"
          >
            Suivant
          </ButtonBottomScreen>
        </div>
      </Form>
    </Screen>
  );
}
