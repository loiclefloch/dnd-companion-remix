import { Form, Link, useLoaderData } from "@remix-run/react"
import { useState } from "react"
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import Screen from "~/components/Screen";
import ListSelector from '~/components/ListSelector';
import useTip from '~/components/useTip';
import type { LoaderArgs, ActionArgs} from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { transformBackgroundIdeals } from "~/mappers/background.mapper";
import { transformIdeals } from "~/mappers/character.mapper";
import { getBackground } from "~/services/background.server";
import { getCharacterCreation, updateCreateCharacterChooseIdealsStep } from "~/services/createcaracter.server";
import { requireUser } from "~/services/session.server";
import type { AlignmentApiEnum } from '~/apiobjects/alignment.apiobject';
import { IdealsDto } from "~/dtos/character.dto";
import { BackgroundIdealDto, BackgroundIdealsDto } from "~/dtos/background.dto";

// TODO: could we choose multiple?


export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

	if (!characterCreationApiObject.backgroundIndex) {
		throw new Error(`Missing backgroundIndex`);
	}

  const backgroundApiObject = await getBackground(characterCreationApiObject.backgroundIndex);
	
  return json({
    ideals: transformIdeals(characterCreationApiObject.ideals),
    backgroundIdeals: transformBackgroundIdeals(backgroundApiObject.ideals)
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  await updateCreateCharacterChooseIdealsStep(
		formData.get("ideals") as string,
		(formData.get("idealsAlignments") as string).split(',') as AlignmentApiEnum[],
		);

  return redirect("/character/create/alignment");
}

export default function CreateCharacterIdeals() {
  // TODO: use default ideals
  const { ideals, backgroundIdeals } = useLoaderData<typeof loader>();
  const [selectedIdeals, setSelectedIdeals] = useState<BackgroundIdealDto | null>();
  const { showTip } = useTip();

  return (
    <Screen title={"Idéaux"} withBottomSpace>
      <Form method="post">
        <div className="flex flex-col">
          <ScreenIntroduction
            title="Choisissez les idéaux votre personnage"
            description={`Donnez à votre personnage personnage ...`}
            actions={
              <div className="mt-2">
                <Link to="/rules/ideals">En savoir plus</Link>
              </div>
            }
          />

          <div className="mt-2 px-4 pt-2">
            <h3 className="mb-2 border-b border-solid border-slate-200 font-semibold">
              Choissiez votre idéal
            </h3>

            <input type="hidden" name="ideals" value={selectedIdeals?.desc} />
            <input
              type="hidden"
              name="idealsAlignments"
              value={selectedIdeals?.alignments.map((a) => a.index).join(",")}
            />

            <ListSelector
              value={selectedIdeals}
              onChange={setSelectedIdeals}
              options={backgroundIdeals?.from?.map((ideal) => {
                return {
                  key: ideal.index,
                  value: ideal,
                  selected: selectedIdeals?.index === ideal.index,
                  label: (
                    <div className="">
                      <span className="font-semibold">{ideal.title}</span>{" "}
                      <span>{ideal.desc}</span>
                    </div>
                  ),
                  rightView: (
                    <div
                      className="text-meta px-4 py-2 text-xs"
                      onClick={() =>
                        showTip(
                          <div>
                            <h3>Vous aurez accès aux alignements suivants</h3>
                            <ul className="ml-6 list-disc">
                              {ideal.alignments.map((alignment) => (
                                <li key={alignment.index}>{alignment.name}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                    >
                      ?
                    </div>
                  ),
                };
              })}
            />
          </div>

          <ButtonBottomScreen variant="cta" type="submit">
            Suivant
          </ButtonBottomScreen>
        </div>
      </Form>
    </Screen>
  );
}
