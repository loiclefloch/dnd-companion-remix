import { useState } from "react";
import { groupBy, map, uniqBy } from "lodash";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import ListSelector from "~/components/ListSelector";
import Screen from "~/components/Screen";
import { Form, Link, useLoaderData } from "@remix-run/react";
import useTipProficiency from "~/components/useTipProficiency";
import { getRace } from "~/services/race.server";
import type { LoaderArgs, ActionArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { formatProficiency } from "~/mappers/proficiency.mapper";
import { getBackground } from "~/services/background.server";
import { getClass } from "~/services/class.server";
import {
  getCharacterCreation,
  updateCreateCharacterChooseFlawsStep,
} from "~/services/createcaracter.server";
import { requireUser } from "~/services/session.server";
import { formDataGetArrayValue } from "~/utils/form";
import type { CharacterCreationProficiencyApiObject } from "~/apiobjects/charactercreation.apiobject";
import invariant from "tiny-invariant";
import {
  StartingProficiencyApiObject,
  StartingProficiencyOptionsApiObject,
} from "~/apiobjects/proficicency.apiobject";
import { RaceApiObject } from "~/apiobjects/race.apiobject";
import { ClassApiObject } from "~/apiobjects/class.apiobject";
import { BackgroundApiObject } from "~/apiobjects/background.apiobject";

interface StartingProficiencyInheritedApiObject
  extends StartingProficiencyApiObject {
  sourceType: string;
}

// TODO: on helper / mapper
function getInheritedProficiencies(
  backgroundApiObject: BackgroundApiObject,
  raceApiObject: RaceApiObject,
  classApiObject: ClassApiObject
): Array<StartingProficiencyInheritedApiObject> {
  return uniqBy(
    [
      ...raceApiObject.startingProficiencies.map((p) => ({
        ...p,
        sourceType: "race",
      })),
      ...backgroundApiObject.startingProficiencies?.map((p) => ({
        ...p,
        sourceType: "background",
      })),
      ...classApiObject.proficiencies?.map((p) => ({
        ...p,
        sourceType: "class",
      })),
    ],
    (p) => p.index
  ).map(formatProficiency);
}

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

  invariant(
    characterCreationApiObject.backgroundIndex,
    `Missing backgroundIndex`
  );
  invariant(characterCreationApiObject.raceIndex, `Missing raceIndex`);
  invariant(characterCreationApiObject.classIndex, `Missing classIndex`);

  const backgroundApiObject = await getBackground(
    characterCreationApiObject.backgroundIndex
  );
  const raceApiObject = await getRace(characterCreationApiObject.raceIndex);
  const classApiObject = await getClass(characterCreationApiObject.classIndex);

  const inheritedProficiencies = getInheritedProficiencies(
    backgroundApiObject,
    raceApiObject,
    classApiObject
  );

  return json({
    inheritedProficiencies, // TODO: format add typeLabel cf formatProficiency
    proficiencies: characterCreationApiObject.proficiencies,
    backgroundStartingProficiencyOptions:
      backgroundApiObject.startingProficiencyOptions,
    raceStartingProficiencyOptions: raceApiObject.startingProficiencyOptions,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const characterCreationApiObject = await getCharacterCreation();

  invariant(
    characterCreationApiObject.backgroundIndex,
    `Missing backgroundIndex`
  );
  invariant(characterCreationApiObject.raceIndex, `Missing raceIndex`);
  invariant(characterCreationApiObject.classIndex, `Missing classIndex`);

  const backgroundApiObject = await getBackground(
    characterCreationApiObject.backgroundIndex
  );
  const raceApiObject = await getRace(characterCreationApiObject.raceIndex);
  const classApiObject = await getClass(characterCreationApiObject.classIndex);

  const inheritedProficiencies = getInheritedProficiencies(
    backgroundApiObject,
    raceApiObject,
    classApiObject
  );

  const proficiencies: Array<CharacterCreationProficiencyApiObject> = [
    ...inheritedProficiencies.map((proficiency) => ({
      index: proficiency.index,
      sourceType: proficiency.sourceType,
      // TODO: mark has chosen?
    })),
    ...formDataGetArrayValue(formData, "proficiency[race]").map((index) => ({
      index,
      sourceType: "race",
      // TODO: mark has chosen?
    })),
    ...formDataGetArrayValue(formData, "proficiency[background]").map(
      (index) => ({
        index,
        sourceType: "background",
        // TODO: mark has chosen?
      })
    ),
  ];

  await updateCreateCharacterChooseFlawsStep(proficiencies);

  return redirect("/character/create/proficiencies");
}

function Proficiency({
  proficiency,
}: {
  proficiency: StartingProficiencyInheritedApiObject;
}) {
  const { showTipProficiency } = useTipProficiency();

  return (
    <div key={proficiency.name} className="flex px-4 py-1">
      <div className="flex flex-1 items-center">
        {proficiency.name}{" "}
        <span className="text-meta ml-2 text-sm">
          ({proficiency.sourceType})
        </span>
      </div>
      <div
        onClick={() => showTipProficiency(proficiency)}
        className="text-meta px-2"
      >
        ?
      </div>
    </div>
  );
}

interface ChooseProficiencyProps {
  selectedProficiencies: CharacterCreationProficiencyApiObject[];
  setSelectedProficiencies: (
    selectedProficiencies: CharacterCreationProficiencyApiObject[]
  ) => void;
  startingProficiencyOptions: StartingProficiencyOptionsApiObject;
}

function ChooseProficiency({
  selectedProficiencies,
  setSelectedProficiencies,
  startingProficiencyOptions,
}: ChooseProficiencyProps) {
  const { showTipProficiency } = useTipProficiency();

  const options = startingProficiencyOptions;
  if (!options) {
    return null;
  }

  return (
    <div>
      <h3>Choisissez</h3>
      <div>
        <ListSelector
          multiple
          nbMaxValues={options.choose}
          value={selectedProficiencies}
          onChange={setSelectedProficiencies}
          options={options.from.map((proficiency) => ({
            label: proficiency.name,
            value: proficiency,
            selected: selectedProficiencies.includes(proficiency),
            rightView: (
              <div
                className="text-meta px-4 py-2 text-xs"
                onClick={() => showTipProficiency(proficiency)}
              >
                ?
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
}

export default function CreateCharacterProficiencies() {
  const {
    inheritedProficiencies,
    proficiencies,
    backgroundStartingProficiencyOptions,
    raceStartingProficiencyOptions,
  } = useLoaderData<typeof loader>();

  const [selectedRaceProficiencies, setSelectedRaceProficiencies] =
    useState<CharacterCreationProficiencyApiObject[]>(
      proficiencies.filter((p) => p.sourceType === "race")
    );

  const [selectedBackgroundProficiencies, setSelectedBackgroundProficiencies] =
    useState<CharacterCreationProficiencyApiObject[]>(
      proficiencies.filter((p) => p.sourceType === "background")
    );

  const grouped = groupBy(inheritedProficiencies, (item) => item.typeLabel);

  return (
    <Screen title={"Maîtrises"} withBottomSpace>
      <Form method="post">
        <div className="flex flex-col">
          <ScreenIntroduction
            title="Choisissez les maîtrises"
            description={`Votre personnage ...`}
            actions={
              <div className="mt-2">
                <Link to="/rules/proficiencies">En savoir plus</Link>
              </div>
            }
          />

          {selectedRaceProficiencies.map((p: CharacterCreationProficiencyApiObject, index: number) => (
            <input
              key={index}
              type="hidden"
              name={`proficiency[race][${index}]`}
              value={p.index}
            />
          ))}

          {selectedBackgroundProficiencies.map((p: CharacterCreationProficiencyApiObject, index: number) => (
            <input
              key={index}
              type="hidden"
              name={`proficiency[background][${index}]`}
              value={p.index}
            />
          ))}

          <div className="prose px-4">
            <div>
              <ChooseProficiency
                selectedProficiencies={selectedRaceProficiencies}
                setSelectedProficiencies={setSelectedRaceProficiencies}
                startingProficiencyOptions={raceStartingProficiencyOptions}
              />
            </div>

            <div>
              <ChooseProficiency
                selectedProficiencies={selectedBackgroundProficiencies}
                setSelectedProficiencies={setSelectedBackgroundProficiencies}
                startingProficiencyOptions={backgroundStartingProficiencyOptions}
              />
            </div>

            <div>
              {map(grouped, (list, groupName) => (
                <div key={groupName}>
                  <h4>{groupName}</h4>
                  <div className="divide divide-y">
                    {list.map((proficiency) => (
                      <Proficiency
                        key={proficiency.index}
                        proficiency={proficiency}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ButtonBottomScreen variant="cta" type="submit">
            Suivant
          </ButtonBottomScreen>
        </div>
      </Form>
    </Screen>
  );
}
