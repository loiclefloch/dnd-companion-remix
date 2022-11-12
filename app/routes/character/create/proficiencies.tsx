import { useState } from "react";
import { groupBy, map, uniqBy } from "lodash";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import ListSelector from "~/components/ListSelector";
import Screen from "~/components/Screen";
import { Form, Link, useLoaderData } from "@remix-run/react";
import useI18n from "~/modules/i18n/useI18n";
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
import type { RaceApiEnum } from "../../../apiobjects/race.apiobject";
import type { ClassApiEnum } from "../../../apiobjects/class.apiobject";
import proficiencies from "~/database/data/proficiencies.json";
import { formDataGetArrayValue } from "~/utils/form";
import { CharacterCreationProficiencyApiObject } from "~/apiobjects/charactercreation.apiobject";
import invariant from "tiny-invariant";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

  invariant(characterCreationApiObject.backgroundIndex, `Missing backgroundIndex`);
  invariant(characterCreationApiObject.raceIndex, `Missing raceIndex`);
  invariant(characterCreationApiObject.classIndex, `Missing classIndex`);

  const backgroundApiObject = await getBackground(characterCreationApiObject.backgroundIndex);
  const raceApiObject = await getRace(characterCreationApiObject.raceIndex);

  return json({
    proficiencies: characterCreationApiObject.proficiencies,
    backgroundStartingProficiencyOptions: backgroundApiObject.startingProficiencyOptions,
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

  const allProficiencies = uniqBy(
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

  const proficiencies: Array<CharacterCreationProficiencyApiObject> = [
    ...allProficiencies,
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

function Proficiency({ proficiency }) {
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

function ChooseRaceProficiency({
  selectedRaceProficiencies,
  setSelectedRaceProficiencies,
  raceStartingProficiencyOptions,
}) {
  const { showTipProficiency } = useTipProficiency();

  const options = raceStartingProficiencyOptions;
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
          value={selectedRaceProficiencies}
          onChange={setSelectedRaceProficiencies}
          options={options.from.map((proficiency) => ({
            label: proficiency.name,
            value: proficiency,
            selected: selectedRaceProficiencies.includes(proficiency),
            // disabled: raceSelectedLanguages.includes(proficiency.index),
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

function ChooseBackgroundProficiency({
  selectedBackgroundProficiencies,
  setSelectedBackgroundProficiencies,
  backgroundStartingProficiencyOptions,
}) {
  const { showTipProficiency } = useTipProficiency();

  const options = backgroundStartingProficiencyOptions;
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
          value={selectedBackgroundProficiencies}
          onChange={setSelectedBackgroundProficiencies}
          options={options.from.map((proficiency) => ({
            label: proficiency.name,
            value: proficiency,
            selected: selectedBackgroundProficiencies.includes(proficiency),
            // disabled: raceSelectedLanguages.includes(proficiency.index),
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
    allProficiencies,
    proficiencies,
    backgroundStartingProficiencyOptions,
    raceStartingProficiencyOptions,
  } = useLoaderData<typeof loader>();
  const [selectedRaceProficiencies, setSelectedRaceProficiencies] = useState(
    proficiencies.filter((p) => p.sourceType === "race")
  );
  const [selectedBackgroundProficiencies, setSelectedBackgroundProficiencies] =
    useState(proficiencies.filter((p) => p.from === "background"));

  const grouped = groupBy(allProficiencies, (item) => item.typeLabel);

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

          {selectedRaceProficiencies.map((p, index) => (
            <input
              key={index}
              type="hidden"
              name={`proficiency[race][${index}]`}
              value={p.index}
            />
          ))}

          {selectedBackgroundProficiencies.map((p, index) => (
            <input
              key={index}
              type="hidden"
              name={`proficiency[background][${index}]`}
              value={p.index}
            />
          ))}

          <div className="prose px-4">
            <div>
              <ChooseRaceProficiency
                selectedRaceProficiencies={selectedRaceProficiencies}
                setSelectedRaceProficiencies={setSelectedRaceProficiencies}
                raceStartingProficiencyOptions={raceStartingProficiencyOptions}
              />
            </div>

            <div>
              <ChooseBackgroundProficiency
                selectedBackgroundProficiencies={
                  selectedBackgroundProficiencies
                }
                setSelectedBackgroundProficiencies={
                  setSelectedBackgroundProficiencies
                }
                backgroundStartingProficiencyOptions={
                  backgroundStartingProficiencyOptions
                }
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
