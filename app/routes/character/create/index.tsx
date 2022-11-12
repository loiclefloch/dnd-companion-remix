import { isEmpty } from 'lodash';
import { useState } from 'react';
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import Screen from "~/components/Screen";
import type { ActionArgs, ActionFunction, LoaderArgs} from '@remix-run/server-runtime';
import { json, redirect } from '@remix-run/server-runtime';
import { requireUser } from '~/services/session.server';
import { getCharacterCreation, updateCreateCharacterInitialStep } from '~/services/createcaracter.server';
import { Form, useLoaderData } from '@remix-run/react';
import { transformCharacterCreation } from '../../../mappers/charactercreation.mapper';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

	const characterCreationApiObject = await getCharacterCreation();

   return json({
     characterCreation: transformCharacterCreation(characterCreationApiObject),
   });
}

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();

	await updateCreateCharacterInitialStep(formData.get("name") as string)

  return redirect("/character/create/choose-race")
}

function FormView() {
	const { characterCreation } = useLoaderData<typeof loader>();

	const [ name, setName ] = useState(characterCreation.name || '')

	const formHasErrors = isEmpty(name)

	return (
		<Form method="post">

			<div className="flex flex-col">

				{/* TODO: name generator */}
				<div className="relative w-full px-4 mt-12">

					<input
						type="text"
						className="flex-1 w-full px-2 py-1 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent"
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
	)
}

export default function CreateCharacterScreen() {
  return (
    <Screen
      title={"Nouveau personnage"}
    >
			<FormView />
    </Screen>
  );
}

