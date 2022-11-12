import useRouter from "~/hooks/useRouter";
import { Link } from "@remix-run/react";
import IconPlus from "~/components/icons/IconPlus";
import IconUsers from "~/components/icons/IconUsers";
import isEmpty from "lodash/isEmpty"
import {
  ListSelectRowAsCard,
  ListRowSelectContainer,
} from "~/components/ListSelectRow";
import Screen from "~/components/Screen";
import { makeI18n } from "../../modules/i18n/useI18n";
import formatCharacter from "~/modules/character/formatCharacter";
import useCurrentCharacter from "~/components/useCurrentCharacter";
import Button from "~/components/Button";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/services/session.server";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getMyCharacters } from "~/services/mycharacters.server";
import type { MyCharacterDto } from "~/dtos/mycharacters.dto";

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const characters = await getMyCharacters();

  return json({
    characters: characters.map(formatCharacter),
  });
}

const useI18n = makeI18n({
  "screen.title": {
    fr: "Mes personnages",
    en: "My characters",
  },
  "no characters yet": {
    fr: `Vous n'avez pas encore de personnage`,
    en: `You do not have any character yet`,
  },
  "btn.create my character": {
    fr: `Créer mon personnage`,
  },
});

interface CharacterRowProps {
  character: MyCharacterDto;
  selected: boolean;
}

function CharacterRow({ character, selected }: CharacterRowProps) {
  const { tr } = useI18n();

  return (
    <Link to={`/character/${character.id}`}>
      <ListSelectRowAsCard
        title={character.name}
        subtitle={
          <span>
            {tr(character.race.nameLocalized)} -{" "}
            {character.classes.map((clss) => tr(clss.nameLocalized)).join(", ")}
          </span>
        }
        selected={selected}
      />
    </Link>
  );
}

function CharactersScreen() {
  const { characters } = useLoaderData<typeof loader>();
  const { tr } = useI18n();
  const router = useRouter();
  const { character: currentCharacter } = useCurrentCharacter();

  return (
    <Screen
      title={tr`screen.title`}
      titleIcon={<IconUsers className="h-6 w-6" />}
      root
      rightAction={
        <Link
          to="/character/create"
        >
          <IconPlus className={"h-6 w-6 text-slate-800"} />
        </Link>
      }
    >
      <div>
        {isEmpty(characters) && (
          <div className="mt-4 flex w-full flex-col items-center p-4">
            <p>{tr`no characters yet`}</p>
            <Link
              to="/character/create"
              variant="cta"
              className="mt-4"
            >
              {tr`btn.create my character`}
            </Link>
          </div>
        )}
        <ListRowSelectContainer
          className="mt-12 px-4 pb-12"
          data-cy-id="characters-list"
        >
          {characters.map((character) => (
            <CharacterRow
              key={character.id}
              character={character}
              selected={currentCharacter?.id === character.id}
            />
          ))}
        </ListRowSelectContainer>
      </div>
    </Screen>
  );
}

export default CharactersScreen;
