import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import SpellsView from "~/components/SpellsView"
import { formatSpell } from "~/mappers/spell.mapper";
import { requireUser } from "~/services/session.server";
import { getSpells } from "~/services/spells.server";
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const spells = await getSpells();

  return json({
    spells: spells.map(formatSpell),
  });
}

export default function Spells() {
  const { spells } = useLoaderData<typeof loader>();
 
  return (
    <SpellsView spells={spells} />
  );
}
