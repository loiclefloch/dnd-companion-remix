import ButtonBottomScreen from "~/components/ButtonBottomScreen";
import BackgroundContent from "~/components/background/BackgroundContent";
import Screen from "~/components/Screen";
import useI18n from "~/modules/i18n/useI18n";
import useCreateCharacter from '~/components/useCreateCharacter';
import { useLoaderData } from '@remix-run/react';
import { LoaderArgs, json } from '@remix-run/server-runtime';
import { formatBackground } from '~/mappers/background.mapper';
import { getBackground } from '~/services/background.server';
import { requireUser } from '~/services/session.server';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const backgroundApiObject = await getBackground(params.backgroundIndex as string);

  return json({
    background: formatBackground(backgroundApiObject),
  });
}

function CreateCharacterBackgroundDetail() {
	const { background } = useLoaderData<typeof loader>();
	const { tr } = useI18n()
	const { updateCharacter } = useCreateCharacter()

	return (
		<Screen
			title={background ? `Background - ${background.name}` : ''}
			withBottomSpace
		>
			<div className="flex flex-col px-4">
				<BackgroundContent background={background} />
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					updateCharacter({ 
						step: 'choose-background',
						background: background.index, 
						features: background.features.map(feature => ({
							index: feature.index,
							type: 'background',
						}))
					})
				}}
			>
				Choisir
			</ButtonBottomScreen>
    </Screen>
  );
}

export default CreateCharacterBackgroundDetail;