import { useState } from "react"
import useRouter from '~/hooks/useRouter'
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import Screen from "~/components/Screen";
import Textarea from "~/components/Textarea";
import { Form, Link, useLoaderData } from "@remix-run/react"
import useI18n from "~/modules/i18n/useI18n";
import ListSelector from '~/components/ListSelector';
import Button from "~/components/Button";
import type { LoaderArgs, ActionArgs} from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { transformBackgroundFlaws } from "~/mappers/background.mapper";
import { getBackground } from "~/services/background.server";
import { getCharacterCreation, updateCreateCharacterChooseFlawsStep } from "~/services/createcaracter.server";
import { requireUser } from "~/services/session.server";
import { formDataGetArrayValue } from "~/utils/form";
import invariant from "tiny-invariant";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

	invariant(characterCreationApiObject.backgroundIndex, `Missing backgroundIndex`)

  const backgroundApiObject = await getBackground(
    characterCreationApiObject.backgroundIndex
  );

  return json({
    backgroundsFlaws: transformBackgroundFlaws(backgroundApiObject.flaws),
    flaws: characterCreationApiObject.flaws,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

	const flaws: string[] = formDataGetArrayValue(formData, 'flaws')

  await updateCreateCharacterChooseFlawsStep(
		flaws
  );

  return redirect("/character/create/proficiencies");
}

function Custom({
	chosenFlaws,
	setChosenFlaws,
}) {
	return (
		<>
			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Liens</h3>
				<Textarea 
					rows={12} 
					value={chosenFlaws}
					onChange={e => setChosenFlaws(e.target.value)}
				/>
			</div>
		</>
	)
}

function List({
	backgroundsFlaws,
	chosenFlaws,
	setChosenFlaws,
}) {
	return (
    <div className="mt-2 px-4 pt-2">
      <h3 className="mb-2 border-b border-solid border-slate-200 font-semibold">
        Choissiez {backgroundsFlaws.choose} lien
      </h3>
      <ListSelector
        multiple
        nbMaxValues={backgroundsFlaws.choose}
        value={chosenFlaws}
        options={backgroundsFlaws.from.map((option: string) => {
          return {
            label: <div className="flex">{option}</div>,
            value: option,
            selected: chosenFlaws.includes(option),
          };
        })}
        onChange={setChosenFlaws}
      />
    </div>
  );
}

type Mode = "LIST" | "CUSTOM";

export default function CreateCharacterFlaws() {
	const { flaws, backgroundsFlaws } = useLoaderData<typeof loader>();
	const [chosenFlaws, setChosenFlaws] = useState(flaws || [])
	const [mode, setMode] = useState(null)

	return (
    <Screen title={"Imperfections"} withBottomSpace>
      <Form method="post">
        <div className="flex flex-col">
          <ScreenIntroduction
            title="Choisissez les imperfections de votre personnage"
            description={`Donnez à votre personnage personnage ...`}
            actions={
              <div className="mt-2">
                <Link to="/rules/flaws">En savoir plus</Link>
              </div>
            }
          />

          {chosenFlaws.map((chosenFlaw, index) => (
            <input
              key={index}
              type="hidden"
              name={`flaws[${index}]`}
              value={chosenFlaw}
            />
          ))}

          <>
            {mode === "LIST" && (
              <List
                backgroundsFlaws={backgroundsFlaws}
                chosenFlaws={chosenFlaws}
                setChosenFlaws={setChosenFlaws}
              />
            )}

            {mode === "CUSTOM" && (
              <Custom
                chosenFlaws={chosenFlaws}
                setChosenFlaws={setChosenFlaws}
              />
            )}

            <div className="px-4">
              {mode !== "LIST" && (
                <Button
                  variant="outlined"
                  className="mt-2"
                  onClick={() => setMode("LIST")}
                >
                  Choisir dans une liste prédéfinie
                </Button>
              )}
              {mode !== "CUSTOM" && (
                <Button
                  variant="outlined"
                  className="mt-2"
                  onClick={() => setMode("CUSTOM")}
                >
                  Customiser
                </Button>
              )}
            </div>
          </>

          <ButtonBottomScreen variant="cta" type="submit">
            Suivant
          </ButtonBottomScreen>
        </div>
      </Form>
    </Screen>
  );
}
