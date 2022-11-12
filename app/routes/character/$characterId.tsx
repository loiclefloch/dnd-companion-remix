import { useLoaderData } from "@remix-run/react";
import useI18n from "~/modules/i18n/useI18n";
import StatsSmall from "~/components/StatsSmall";
import Screen from "~/components/Screen";
import useRestScreenAsModal from "~/components/useRestScreenAsModal";
import useLifeScreenAsModal from "~/components/useLifeScreenAsModal";
import useAcScreenAsModal from "~/components/useAcScreenAsModal";
import IconCampFire from "~/components/icons/IconCampFire";
import IconShield from "~/components/icons/IconShield";
import useTip from "~/components/useTip";
import {
  TraitsSection,
  ProficienciesSection,
  BackgroundSection,
  FeaturesSection,
  FeatsSection,
  GlobalSection,
  Infos,
} from "~/components/CharacterResume";
import CharacterClassTag from "~/components/CharacterClassTag";
import CharacterRaceTag from "~/components/CharacterRaceTag";
import CharacterLevelTag from "~/components/CharacterLevelTag";
import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { formatCharacter } from "~/mappers/character.mapper";
import { requireUser } from "~/services/session.server";
import { notFound } from "~/utils/response";
import { setCurrentCharacter } from "~/services/currentcharacter.server"
import type { AcDto } from "~/dtos/character.dto";
import { getCharacter } from "~/services/characters.server";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const characterId = params.characterId as string;

  const character = await getCharacter(characterId);

  await setCurrentCharacter(characterId);

  if (!character) {
    throw notFound(`character not found for id ${characterId}`);
  }

  return json({
    character: formatCharacter(character),
  });
}

function HpView({ currentHp }: { currentHp: number }) {
  const { showLifeScreenAsModal } = useLifeScreenAsModal();

  return (
    <div
      className="flex h-full items-center justify-center"
      // TODO: remix
      // onClick={() => showLifeScreenAsModal()}
    >
      <div className="relative h-8 w-8 rotate-45 bg-pink-600">
        <div className="absolute left-[-50%] h-8 w-8 rounded-[50%] bg-pink-600"></div>
        <div className="absolute top-[-50%] h-8 w-8 rounded-[50%] bg-pink-600"></div>
      </div>
      <div className="absolute -mt-3 flex items-center text-center text-xl font-semibold text-slate-900">
        {currentHp}
      </div>
    </div>
  );
}

function AcView({ ac }: { ac: AcDto }) {
  const { showAcScreenAsModal } = useAcScreenAsModal();

  return (
    <div
      className="relative flex items-center justify-center align-middle"
      // TODO: remix
      // onClick={() => showAcScreenAsModal(character)}
    >
      <IconShield className="h-14 w-14 fill-slate-700" />

      <div
        className="absolute text-xl font-semibold text-slate-700"
        style={{ marginTop: -6 }}
      >
        {ac.total}
      </div>
    </div>
  );
}

function Content({ character } : { character: CharacterDto }) {
  const { tr } = useI18n();
  const { showTipPassivePerception } = useTip(); // TODO: use
  const { showRestModalAsScreen } = useRestScreenAsModal();

  if (!character) {
    return null;
  }

  return (
    <div className="px-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center">
          <CharacterClassTag character={character} />
        </div>
        <div className="ml-1 flex items-center">
          <CharacterRaceTag race={character.race} />
        </div>
        <div className="ml-1 flex items-center">
          <CharacterLevelTag level={character.level} />
        </div>
      </div>

      <div className="relative mt-6 flex items-center">
        <div className="w-1/3" />
        <HpView currentHp={character.currentHp} />
        <div className="ml-12" />
        <AcView ac={character.ac} />
        <div className="absolute right-0">
          <IconCampFire
            className="h-10 w-10 fill-slate-700"
            onClick={() => showRestModalAsScreen()}
          />
        </div>
      </div>

      <div className="my-4 mt-6">
        <StatsSmall
          withDetail
          stats={character.stats}
          skills={character.skills}
          character={character}
        />
      </div>

      <GlobalSection character={character} small />
      <Infos character={character} />
      <FeatsSection character={character} />
      <TraitsSection character={character} />
      <FeaturesSection character={character} />
      <BackgroundSection character={character} />
      <ProficienciesSection character={character} />
    </div>
  );
}

function Character() {
  const { character } = useLoaderData<typeof loader>();

  return (
    <Screen
      title={character?.name}
      // titleIcon={<IconUsers className="w-6 h-6" />}
      root
      withCharacterMenu
      withBottomSpace
      rightAction={
        // TODO: edit link?
        null
      }
    >
      <Content
        character={character}
        // TODO: remix post form
        characterDispatch={null}
      />
    </Screen>
  );
}

export default Character;
