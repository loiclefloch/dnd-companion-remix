import { Link } from "@remix-run/react"
import Screen from "~/components/Screen";
import { makeI18n } from "~/modules/i18n/useI18n";
import useCurrentCharacter from "~/components/useCurrentCharacter";
import Button from "~/components/Button";
import { ListSelectRowAsCard } from "~/components/ListSelectRow"

const useI18n = makeI18n({
  'screen.title': {
    fr: 'Dashboard',
    en: 'Dashboard',
  },
  'title.character': {
    fr: 'Mon personnage',
    en: 'My character',
  },
  'select character': {
    fr: 'Sélectionner un personnage',
    en: 'Select a character'
  }
})

function CurrentCharacterView() {
  const currentCharacter = useCurrentCharacter();
  const { tr } = useI18n()

  if (!currentCharacter) {
    return (
      <div className="px-4 py-2">
        <h3 className="prose">{tr`title.character`}</h3>       
        <Link to={`/characters`} >
          <Button variant="outlined" className="mt-2">
           {tr`select character`} 
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 py-2 prose">
      <h2 className="prose">{tr`title.character`}</h2>

      <div>
        <ListSelectRowAsCard
          to={`character/${currentCharacter.id}`}
          title={currentCharacter.name}
          subtitle={
            <span>
              {tr(currentCharacter.race.nameLocalized)} - {currentCharacter.classes.map(clss => tr(clss.nameLocalized)).join(', ')}
            </span>
          }
          selected
        />
      </div>
    </div>
  )
}

function IndexScreen() {
  const { tr } = useI18n()

  return (
    <Screen
      title={tr`screen.title`}
      root
    >
      <CurrentCharacterView />
    </Screen>
  );
}

export default IndexScreen;
