import useI18n from "../../modules/i18n/useI18n";
import Screen from "~/components/Screen";
import FeatureView from "~/components/FeatureView";
import IconBookOpen from "~/components/icons/IconBookOpen";
import { useLoaderData } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/server-runtime";
import { formatFeature } from "~/mappers/feature.mapper";
import { getFeature } from "~/services/feature.server";
import { requireUser } from "~/services/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const featureApiObject = await getFeature(params.featureIndex as string);

  return json({
    feature: formatFeature(featureApiObject),
  });
}


export default function Feature() {
	const { feature } = useLoaderData<typeof loader>();
	const { tr } = useI18n()

	return (
		<Screen
			title={!feature ? 'Feature' : `Feature - ${tr(feature?.nameLocalized)}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
		>
			<FeatureView feature={feature} />
		</Screen>
	)
}
