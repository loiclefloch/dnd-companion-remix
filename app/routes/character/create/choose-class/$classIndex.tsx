import useRouter from '~/hooks/useRouter'
import Screen from "~/components/Screen";
import useI18n from "../../../../modules/i18n/useI18n";
import ClassDetailsView from "~/components/classes/ClassDetailsView";
import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import useCreateCharacter from "~/components/useCreateCharacter";
import { Form, useLoaderData } from '@remix-run/react';
import { LoaderArgs, json, ActionArgs, redirect } from '@remix-run/server-runtime';
import { formatClass } from '~/mappers/class.mapper';
import { getClass } from '~/services/class.server';
import { requireUser } from '~/services/session.server';
import { updateCreateCharacterChooseClassStep } from '~/services/createcaracter.server';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const classApiObject = await getClass(params.classIndex as string);

  return json({
    classDto: formatClass(classApiObject),
  });
}

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();

	await updateCreateCharacterChooseClassStep(formData.get("classIndex") as string)

  return redirect("/character/create/abilities")
}

function FormView({ classDto }) {
  const { tr } = useI18n();

  return (
    <Form method="post">
			<input type="hidden" name="classIndex" value={classDto.index} />

      <div className="flex flex-col">
        <div className="relative mt-12 w-full px-4">
          <ClassDetailsView
            clss={classDto}
            // hidden since we select equipment on the equipment page
            hideStartingEquipmentOptions
          />
        </div>

        <ButtonBottomScreen
          variant="cta"
          type="submit"
        >
          {tr`choose.action`}
        </ButtonBottomScreen>
      </div>
    </Form>
  );
}

function DisplayCharacterClass() {
	const { tr } = useI18n()
	const { classDto } = useLoaderData<typeof loader>();

	return (
		<Screen
			title={tr(classDto?.nameLocalized)}
		>
			<FormView classDto={classDto} />
		</Screen>
  );
}

export default DisplayCharacterClass;
