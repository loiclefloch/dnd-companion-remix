import { ListSelectRowAsCard, ListRowSelectContainer } from "~/components/ListSelectRow";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import Screen from "~/components/Screen";
import { Link, useLoaderData } from "@remix-run/react"
import useI18n from "~/modules/i18n/useI18n";
import useCreateCharacter from "~/components/useCreateCharacter";
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatBackground } from "~/mappers/background.mapper";
import { getBackgrounds } from "~/services/background.server";
import { requireUser } from "~/services/session.server";

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const backgroundApiObjects = await getBackgrounds();

  return json({
    background: backgroundApiObjects.map(formatBackground),
  });
}

function BackgroundRow({ background, clss }) {
	const { tr } = useI18n()
	
	const isGoodForClass = background.goodForClasses && background.goodForClasses.some(c => c.index === clss)

	return (
    <ListSelectRowAsCard
      to={`/character/create/choose-background/${background.index}`}
      title={
        <div>
          {tr(background.nameLocalized)}
          {isGoodForClass && (
            <span className="text-meta ml-2 text-xs text-blue-400">
              Recommandé
            </span>
          )}
        </div>
      }
      subtitle={tr(background.resume)}
    />
  );
}

function CreateCharacterBackground() {
	const { character } = useCreateCharacter()
	const { backgrounds } = useLoaderData<typeof loader>();

	return (
		<Screen
			title={"Background"}
			withBottomSpace
		>
			<div className="flex flex-col">
				<ScreenIntroduction
					title="Choisissez le background de votre personnage"
					description={`Donnez à votre personnage personnage ...`}
					actions={
						<div className="mt-2">
							<Link to="/rules/background">
								En savoir plus
							</Link>
						</div>
					}
				/>

				<ListRowSelectContainer className="px-4 mt-6">
					{backgrounds.map(background => (
						<BackgroundRow key={background.index} background={background} clss={character?.classes[0]} />
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default CreateCharacterBackground;