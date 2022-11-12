import { Form, Link, useLoaderData } from "@remix-run/react";
import { getAbilityScorePointCost } from "~/modules/stats";
import Screen from "~/components/Screen";
import useI18n from "../../../../modules/i18n/useI18n";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import Button from "~/components/Button";
import { isEmpty } from "lodash";
import AbilityScoreChooser from "~/components/AbilityScoreChooser";
import { getAbilityOptimizedExample } from "~/modules/character";
import {
  getCharacterCreation,
  updateCreateCharacterChooseAbilities,
} from "~/services/createcaracter.server";
import type {
  ActionArgs,
  LoaderArgs} from "@remix-run/server-runtime";
import {
  json,
  redirect,
} from "@remix-run/server-runtime";
import { requireUser } from "~/services/session.server";
import { transformCharacterCreation } from "~/mappers/charactercreation.mapper";
import { getRace } from "~/services/race.server";
import { useState } from "react";
import type { AbilityBonusDto } from "~/apiobjects/race.apiobject";

// TODO: move on helper
function getBonusFromRace(bonusFromRace: Array<AbilityBonusDto>) {
  const bonuses = {};

  ["STR", "DEX", "CON", "INT", "WIS", "CHA"].forEach((abilityScore) => {
    const bonus =
      bonusFromRace?.find((bonus) => bonus.abilityScore.name === abilityScore)
        ?.bonus || 0;
    bonuses[abilityScore] = bonus;
  });

  return bonuses;
}

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

  const raceApiObject = await getRace(characterCreationApiObject.raceIndex);

  return json({
    characterCreation: transformCharacterCreation(characterCreationApiObject),
    classIndex: characterCreationApiObject.classIndex,
    bonuses: getBonusFromRace(raceApiObject.abilityBonuses || []),
    abilities: characterCreationApiObject.abilities,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const characterCreationApiObject = await getCharacterCreation();

  const raceApiObject = await getRace(characterCreationApiObject.raceIndex);

  let abilities = null;
  const type = formData.get("type");
  if (type === "manual") {
    // TODO: rename abilities to stats or the inverse?
    abilities = {
      STR: parseInt(formData.get("STR") as string, 10),
      DEX: parseInt(formData.get("DEX") as string, 10),
      CON: parseInt(formData.get("CON") as string, 10),
      INT: parseInt(formData.get("INT") as string, 10),
      WIS: parseInt(formData.get("WIS") as string, 10),
      CHA: parseInt(formData.get("CHA") as string, 10),
    };
  } else if (type === "recommanded") {
    const abilityOptimized = getAbilityOptimizedExample(
      characterCreationApiObject.classIndex
    );
    if (!abilityOptimized) {
      throw new Error("Not created yet for class " + character.classes[0]);
    }
    abilities = abilityOptimized;
  }

  const abilitiesBonuses = raceApiObject.abilityBonuses?.map((bonus) => {
    return {
      ability: bonus.abilityScore.name,
      type: "race",
      bonus: bonus.bonus,
    };
  });

  const abilityBonusOptions = raceApiObject.abilityBonusOptions || [];
  if (!isEmpty(abilityBonusOptions)) {
    // half-elf race
    await updateCreateCharacterChooseAbilities(abilities, abilitiesBonuses);

    return redirect("/character/create/abilities/choose-options");
  } else {
    await updateCreateCharacterChooseAbilities(abilities, abilitiesBonuses);

    return redirect("/character/create/choose-background");
  }
}

function FormView({ classIndex, abilities: defaultAbilities, bonuses }) {
	const [abilities, setAbilities] = useState(defaultAbilities)

  // 2 score = 1 point
  const MAX_POINTS = 27;
  const usedPoints = Object.values(abilities).reduce(
    (total, value) => total + getAbilityScorePointCost(value),
    0
  );
  const remainingPoints = MAX_POINTS - usedPoints;

  // TODO: display for the class which abilities are important, which are not (very important, important, neutral, not important)
  return (
    <>
      <Form method="post">
        <input type="hidden" name="type" value="manual" />
        <AbilityScoreChooser
          creationMode
          classIndex={classIndex}
          abilities={abilities}
          bonuses={bonuses}
          onChange={setAbilities}
        />

        <div className="mt-8 px-4 text-center">
          Il vous reste {remainingPoints} points à répartir
        </div>

        <ButtonBottomScreen variant="cta" type="submit">
          Valider
        </ButtonBottomScreen>
      </Form>

      <Form method="post">
        <input type="hidden" name="type" value="recommanded" />

        <div className="px-4">
          {/* TODO: */}
          <Button
            type="submit"
            className="mt-2"
            size="small"
            variant="outlined"
          >
            {/* TODO: TIP -> valeurs optimisées mais le RP dans tout ca ? */}
            Utiliser les valeurs recommandées
          </Button>
        </div>
      </Form>
    </>
  );
}

function AbilitiesScreen() {
  const { classIndex, bonuses, abilities } = useLoaderData<typeof loader>();
  const { tr } = useI18n();

  return (
    <Screen title={tr("Capacités - bonus")}>
      <>
        <ScreenIntroduction
          title="Définition des Capacités"
          description="Votre personnage compte sur six abilités. Vous avez 27 points à répartir, todo..."
          actions={
            <div className="mt-2">
              <Link to="/rules/using-ability-scores">En savoir plus</Link>
            </div>
          }
        />
      </>

      <FormView
        classIndex={classIndex}
        abilities={abilities}
        bonuses={bonuses}
      />
    </Screen>
  );
}

export default AbilitiesScreen;
