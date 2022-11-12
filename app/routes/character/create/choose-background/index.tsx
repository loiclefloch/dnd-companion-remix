import { ListSelectRowAsCard, ListRowSelectContainer } from "~/components/ListSelectRow";
import ScreenIntroduction from "~/components/ScreenIntroduction";
import Screen from "~/components/Screen";
import { Link, useLoaderData } from "@remix-run/react"
import useI18n from "~/modules/i18n/useI18n";
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatBackground } from "~/mappers/background.mapper";
import { getBackgrounds } from "~/services/background.server";
import { requireUser } from "~/services/session.server";
import { getCharacterCreation } from "~/services/createcaracter.server";
import type { BackgroundDto } from '~/dtos/background.dto';

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

	const characterCreationApiObject = await getCharacterCreation();

  const backgroundApiObjects = await getBackgrounds();

	const backgroundsGoodForClass = backgroundApiObjects
    .filter((backgroundApiObject) =>
      backgroundApiObject.goodForClasses?.some(
        (c) => c.index === characterCreationApiObject.classIndex
      )
    )
    .map((background) => background.index);


  return json({
    backgrounds: backgroundApiObjects.map(formatBackground),
		backgroundsGoodForClass,
  });
}

function BackgroundRow({ background, isGoodForClass }) {
	const { tr } = useI18n()
	
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
	const { backgrounds, backgroundsGoodForClass } = useLoaderData<typeof loader>();

	return (
    <Screen title={"Background"} withBottomSpace>
      <div className="flex flex-col">
        <ScreenIntroduction
          title="Choisissez le background de votre personnage"
          description={`Donnez à votre personnage personnage ...`}
          actions={
            <div className="mt-2">
              <Link to="/rules/background">En savoir plus</Link>
            </div>
          }
        />

        <ListRowSelectContainer className="mt-6 px-4">
          {backgrounds.map((background: BackgroundDto) => (
            <BackgroundRow
              key={background.index}
              background={background}
              isGoodForClass={backgroundsGoodForClass.includes(
                background.index
              )}
            />
          ))}
        </ListRowSelectContainer>
      </div>
    </Screen>
  );
}

export default CreateCharacterBackground;