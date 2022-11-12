import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import Textarea from "~/components/Textarea";
import Button from "~/components/Button";
import Screen from "~/components/Screen";
import ListSelector from "~/components/ListSelector";
import {
  getCharacterCreation,
  updateCreateCharacterChoosePersonalityTraitsStep,
} from "~/services/createcaracter.server";
import type {
  LoaderArgs,
  ActionArgs} from "@remix-run/server-runtime";
import {
  json,
  redirect,
} from "@remix-run/server-runtime";
import { transformPersonalityTraits } from "~/mappers/character.mapper";
import { requireUser } from "~/services/session.server";
import { getBackground } from "~/services/background.server";
import { transformBackgroundPersonalityTraits } from "~/mappers/background.mapper";
import type { PersonalityTraitsDto } from '~/dtos/character.dto';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

	if (!characterCreationApiObject.backgroundIndex) {
		throw new Error(`Missing backgroundIndex`);
	}

  const backgroundApiObject = await getBackground(characterCreationApiObject.backgroundIndex);
	
  return json({
    personalityTraits: transformPersonalityTraits(characterCreationApiObject.personalityTraits),
    backgroundPersonalityTraits: transformBackgroundPersonalityTraits(backgroundApiObject.personalityTraits)
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  await updateCreateCharacterChoosePersonalityTraitsStep({
    first: formData.get("first") as string,
    second: formData.get("second") as string,
  });

  return redirect("/character/create/ideals");
}

interface CustomProps {
  personalityTraits: PersonalityTraitsDto;
  setPersonalityTraits: (personalityTraits: PersonalityTraitsDto) => void
}

function Custom({ personalityTraits, setPersonalityTraits }: CustomProps) {
  return (
    <>
      <div className="mt-2 px-4 pt-2">
        <h3 className="mb-2 border-b border-solid border-slate-200 font-semibold">
          Trait 1
        </h3>
        <Textarea
          name="first"
          id="first"
          value={personalityTraits?.first}
          onChange={(e) =>
            setPersonalityTraits([personalityTraits[0], e.target.value])
          }
        />
      </div>

      <div className="mt-2 px-4 pt-2">
        <h3 className="mb-2 border-b border-solid border-slate-200 font-semibold">
          Trait 2
        </h3>
        <Textarea
          name="second"
          id="second"
          value={personalityTraits?.second}
          onChange={(e) =>
            setPersonalityTraits([personalityTraits[1], e.target.value])
          }
        />
      </div>
    </>
  );
}

function List({
  backgroundPersonalityTraits,
  personalityTraits,
  setPersonalityTraits,
}) {
  return (
    <div className="mt-2 px-4 pt-2">
      <h3 className="mb-2 border-b border-solid border-slate-200 font-semibold">
        Choissiez {backgroundPersonalityTraits.choose} traits
      </h3>

			<input type="hidden" name="first" value={personalityTraits.first} />
			<input type="hidden" name="second" value={personalityTraits.second} />

      <ListSelector
        value={personalityTraits}
        multiple
        nbMaxValues={backgroundPersonalityTraits.choose}
        options={backgroundPersonalityTraits.from?.map((option) => {
          return {
            label: <div className="flex">{option}</div>,
            value: option,
            selected: personalityTraits.first === option || personalityTraits.second === option,
          };
        })}
        onChange={(values) => setPersonalityTraits({
					first: values[0],
					second: values[1],
				})}
      />
    </div>
  );
}

type Mode = 'CUSTOM' | 'LIST';

export default function CreateCharacterPersonnalityTraits() {
  const { personalityTraits: defaultPersonalityTraits, backgroundPersonalityTraits } = useLoaderData<typeof loader>();
  const [ personalityTraits, setPersonalityTraits ] = useState<PersonalityTraitsDto>(defaultPersonalityTraits);
  const [mode, setMode] = useState<Mode | null>(null);

  return (
    <Screen title={"Traits de personnalités"} withBottomSpace>
       <Form method="post">
      <div className="flex flex-col">
        <ScreenIntroduction
          title="Choisissez les traits de personnalités de votre personnage"
          description={`Donnez à votre personnage personnage ...`}
          actions={
            <div className="mt-2">
              <Link to="/rules/personnality-traits">En savoir plus</Link>
            </div>
          }
        />

        <>
          {mode === 'LIST' && (
            <List
              backgroundPersonalityTraits={backgroundPersonalityTraits}
              personalityTraits={personalityTraits}
              setPersonalityTraits={setPersonalityTraits}
            />
          )}

          {mode === 'CUSTOM' && (
            <Custom
              personalityTraits={personalityTraits}
              setPersonalityTraits={setPersonalityTraits}
            />
          )}

          <div className="px-4">
            {mode !== 'LIST' && (
              <Button
                variant="outlined"
                className="mt-2"
                onClick={() => setMode('LIST')}
              >
                Choisir dans une liste prédéfinie
              </Button>
            )}
            {mode !== 'CUSTOM' && (
              <Button
                variant="outlined"
                className="mt-2"
                onClick={() => setMode('CUSTOM')}
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
