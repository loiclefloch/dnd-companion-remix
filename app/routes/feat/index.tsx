import FeatsListView from "~/components/FeatsListView"
import { useLoaderData } from '@remix-run/react';
import { formatFeat } from '../../mappers/feat.mapper';
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getFeats } from "~/services/feat.server";
import { requireUser } from "~/services/session.server";

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const featApiObjects = await getFeats();

  return json({
    feats: featApiObjects.map(formatFeat),
  });
}

function Feats() {
  const { feats } = useLoaderData<typeof loader>();
  return (
    <FeatsListView feats={feats} />
  );
}

export default Feats;
