import { LoaderArgs, json } from "@remix-run/server-runtime";
import SpellsView from "~/components/SpellsView"
import { formatSpell } from "~/mappers/spell.mapper";
import { requireUser } from "~/services/session.server";
import { getSpells } from "~/services/spells.server";

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const spells = await getSpells();

  return json({
    spells: spells.map(formatSpell),
  });
}

function Spells() {

  return (
    <SpellsView spells={spells} />
  );
}

export default Spells;
