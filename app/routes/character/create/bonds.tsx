import { useState } from "react";
import useRouter from "~/hooks/useRouter";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import Screen from "~/components/Screen";
import Textarea from "~/components/Textarea";
import { Form, Link, useLoaderData } from "@remix-run/react";
import useCreateCharacter from "~/components/useCreateCharacter";
import ListSelector from "~/components/ListSelector";
import Button from "~/components/Button";
import {
  LoaderArgs,
  json,
  ActionArgs,
  redirect,
} from "@remix-run/server-runtime";
import { transformBackgroundBonds } from "~/mappers/background.mapper";
import { getBackground } from "~/services/background.server";
import {
  getCharacterCreation,
  updateCreateCharacterChooseAlignmentStep,
	updateCreateCharacterChooseBondsStep,
} from "~/services/createcaracter.server";
import { requireUser } from "~/services/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

  if (!characterCreationApiObject.backgroundIndex) {
    throw new Error(`Missing backgroundIndex`);
  }

  const backgroundApiObject = await getBackground(
    characterCreationApiObject.backgroundIndex
  );

  return json({
    backgroundsBonds: transformBackgroundBonds(backgroundApiObject.bonds),
    bonds: characterCreationApiObject.bonds,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

	const bonds: string[] = []
	let i = 0
	while (formData.get(`bonds[${i}]`)) {
		bonds.push(formData.get(`bonds[${i}]`) as string);
    ++i;
	} 

  await updateCreateCharacterChooseBondsStep(
		bonds
  );

  return redirect("/character/create/flaws");
}

function Custom({ chosenBonds, setChosenBonds }) {
  return (
    <>
      <div className="mt-2 px-4 pt-2">
        <h3 className="mb-2 border-b border-solid border-slate-200 font-semibold">
          Liens
        </h3>
        <Textarea
          rows={12}
          value={chosenBonds}
          onChange={(e) => setChosenBonds(e.target.value)}
        />
      </div>
    </>
  );
}

function List({ backgroundsBonds, chosenBonds, setChosenBonds }) {
  return (
    <div className="mt-2 px-4 pt-2">
      <h3 className="mb-2 border-b border-solid border-slate-200 font-semibold">
        Choissiez {backgroundsBonds.choose} lien
      </h3>
      <ListSelector
        multiple
				nbMaxValues={backgroundsBonds.choose}
        value={chosenBonds}
        options={backgroundsBonds.from?.map((option) => {
          return {
            label: <div className="flex">{option}</div>,
            value: option,
            selected: chosenBonds.includes(option),
          };
        })}
        onChange={setChosenBonds}
      />
    </div>
  );
}

type Mode = "LIST" | "CUSTOM";

export default function CreateCharacterBonds() {
  const { bonds, backgroundsBonds } = useLoaderData<typeof loader>();
  const [chosenBonds, setChosenBonds] = useState(bonds || []);
  const [mode, setMode] = useState<Mode | null>(null);

  return (
    <Screen title={"Liens"} withBottomSpace>
      <Form method="post">
        <div className="flex flex-col">
          <ScreenIntroduction
            title="Choisissez les liens de votre personnage"
            description={`Donnez à votre personnage personnage ...`}
            actions={
              <div className="mt-2">
                <Link to="/rules/bonds">En savoir plus</Link>
              </div>
            }
          />

          {chosenBonds.map((chosenBond, index) => (
            <input
              key={index}
              type="hidden"
              name={`bonds[${index}]`}
              value={chosenBond}
            />
          ))}

          <>
            {mode === "LIST" && (
              <List
                backgroundsBonds={backgroundsBonds}
                chosenBonds={chosenBonds}
                setChosenBonds={setChosenBonds}
              />
            )}

            {mode === "CUSTOM" && (
              <Custom
                chosenBonds={chosenBonds}
                setChosenBonds={setChosenBonds}
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
