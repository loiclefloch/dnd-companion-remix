import { useState } from "react";
import clsx from "clsx";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import Screen from "~/components/Screen";
import useTipAlignment from "~/components/useTipAlignment";
import ListSelector from "~/components/ListSelector";
import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  LoaderArgs,
  json,
  ActionArgs,
  redirect,
} from "@remix-run/server-runtime";
import type { AlignmentApiEnum } from "~/apiobjects/alignment.apiobject";
import { getCharacterCreation, updateCreateCharacterChooseAlignmentStep } from "~/services/createcaracter.server";
import { requireUser } from "~/services/session.server";
import { getAlignments } from "~/services/alignment.server";
import { transformAlignment } from "~/mappers/alignment.mapper";
import type { AlignmentDto, AlignmentDtoEnum } from '../../../dtos/alignment.dto';
import { AlignmentDto } from '../../../dtos/alignment.dto';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

  if (!characterCreationApiObject.backgroundIndex) {
    throw new Error(`Missing backgroundIndex`);
  }

	const alignmentApiObjects = await getAlignments()

  return json({
    idealsAlignments: characterCreationApiObject.idealsAlignments,
    alignment: characterCreationApiObject.alignment,
		alignments: alignmentApiObjects.map(transformAlignment),
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

	console.log("->  " + formData.get("alignment"))

  await updateCreateCharacterChooseAlignmentStep(
    formData.get("alignment") as AlignmentApiEnum
  );

  return redirect("/character/create/bonds");
}

export default function CreateCharacterAlignment() {
  const { alignments, alignment, idealsAlignments } = useLoaderData<typeof loader>();
  const [selectedAlignment, setSelectedAlignment] = useState<AlignmentDtoEnum>(
    alignments.find(a => a.index === alignment)?.index
  );

  const { showTipAlignment } = useTipAlignment();

  return (
    <Screen title={"Alignement"}>
      <Form method="post">
        <div className="flex flex-col">
          <ScreenIntroduction
            title="Choisissez votre alignement"
            description={
              <span>
                {`L'alignement ...`}
                <br />
                Les alignements grisés ne devraient pas être choisis, car ils ne
                correspondent pas à vos idéaux.
              </span>
            }
            actions={
              <div className="mt-2">
                <Link to="/rules/alignment">En savoir plus</Link>
              </div>
            }
          />

          <input type="hidden" name="alignment" value={selectedAlignment} />

          <ListSelector
            value={selectedAlignment}
            options={alignments?.map((alignment: AlignmentDto) => {
              const isIdealAlignment = idealsAlignments?.some(
                (idealsAlignment) => idealsAlignment === alignment.index
              );
              return {
                label: (
                  <span
                    className={clsx({
                      "text-gray-600": !isIdealAlignment,
                    })}
                  >
                    {alignment.name}
                  </span>
                ),
                value: alignment.index,
                selected: selectedAlignment === alignment.index,
                rightView: (
                  <div
                    className="text-meta px-4 py-2 text-xs"
                    onClick={() => showTipAlignment(alignment.index)}
                  >
                    ?
                  </div>
                ),
              };
            })}
            onChange={setSelectedAlignment}
          />

          <ButtonBottomScreen variant="cta" type="submit">
            Suivant
          </ButtonBottomScreen>
        </div>
      </Form>
    </Screen>
  );
}
