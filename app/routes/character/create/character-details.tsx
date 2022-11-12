import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import Screen from "~/components/Screen";
import Textarea from "~/components/Textarea";
import { LoaderArgs, redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getCharacterCreation, updateCreateCharacterChooseCharacterDetailsStep } from "~/services/createcaracter.server";
import { requireUser } from "~/services/session.server";
import { Form, useLoaderData } from "@remix-run/react";
import type { CharacterDetailsDto } from "../../../dtos/character.dto";
import { transformCharacterDetails } from "~/mappers/character.mapper";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterCreationApiObject = await getCharacterCreation();

  return json({
    characterDetails: transformCharacterDetails(
      characterCreationApiObject.characterDetails
    ),
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

	await updateCreateCharacterChooseCharacterDetailsStep({
		age: formData.get('age'),
		genre: formData.get('genre'),
		height: formData.get('height'),
		weight: formData.get('weight'),
		hairColor: formData.get('hairColor'),
		eyeColor: formData.get('eyeColor'),
		skinColor: formData.get('skinColor'),
		physicalCaracteristics: formData.get('physicalCaracteristics'),
	});

  return redirect("/character/create/personnality-traits")
}

// TODO: put on race data
// const defaultData = {
//   // TODO: min / max
//   human: {
//     baseHeight: {
//       pouce: 4.8,
//     },
//     baseWeight: {
//       lb: 110,
//     },
//   },
//   "high-elft": {
//     baseHeight: {
//       pouce: 4.6,
//     },
//     baseWeight: {
//       lb: 90,
//     },
//   },
// };

function FormControl({ label, id, children }) {
  return (
    <div className="mb-4">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ label, id, type, defaultValue, ...props }) {
  return (
    <FormControl id={id} label={label}>
      <input
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        id={id}
        type={type}
        defaultValue={defaultValue}
				{...props}
      />
    </FormControl>
  );
}

function FormView({
  characterDetails,
}: {
  characterDetails: CharacterDetailsDto;
}) {
  return (
    <Form method="post">
      <div className="flex flex-col">
        <div className="relative mt-12 w-full px-4">
          <Input
            type="number"
            id="age"
            name="age"
            defaultValue={characterDetails.age}
            label="Age"
          />

          <div>
            <Input
              type="text"
              id="genre"
              name="genre"
              defaultValue={characterDetails.genre}
              label="Genre"
            />
          </div>
          <div>
            <Input
              type="number"
              id="height"
              name="height"
              defaultValue={characterDetails.height}
              label="Taille"
            />
            <Input
              type="number"
              id="weight"
              name="weight"
              defaultValue={characterDetails.weight}
              label="Poids"
            />
          </div>
          <div>
            <Input
              type="text"
              id="hairColor"
              name="hairColor"
              defaultValue={characterDetails.hairColor}
              label="Couleur des cheveux"
            />
          </div>
          <div>
            <Input
              type="text"
              id="eyeColor"
              name="eyeColor"
              defaultValue={characterDetails.eyeColor}
              label="Couleur des yeux"
            />
          </div>
          <div>
            <Input
              type="text"
              id="skinColor"
              name="skinColor"
              defaultValue={characterDetails.skinColor}
              label="Couleur de la peau"
            />
          </div>

          <FormControl label="Caractéristiques physiques">
            <Textarea
              id="physicalCaracteristics"
              name="physicalCaracteristics"
              defaultValue={characterDetails.physicalCaracteristics}
            />
          </FormControl>
        </div>

        <ButtonBottomScreen variant="cta" type="submit">
          Suivant
        </ButtonBottomScreen>
      </div>
    </Form>
  );
}

function CreateCharacterDetailsScreen() {
  const { characterDetails } = useLoaderData<typeof loader>();
  return (
    <Screen title={"Nouveau personnage"}>
      <FormView characterDetails={characterDetails} />
    </Screen>
  );
}

export default CreateCharacterDetailsScreen;

