import useRouter from '~/hooks/useRouter'

import useI18n from "../../modules/i18n/useI18n";
import Screen from "~/components/Screen";
import FeatContent from "~/components/FeatContent";
import IconBookOpen from "~/components/icons/IconBookOpen";
import { useLoaderData } from '@remix-run/react';
import { LoaderArgs, json } from '@remix-run/server-runtime';
import { formatFeat } from '~/mappers/feat.mapper';
import { getFeat } from '~/services/feat.server';
import { requireUser } from '~/services/session.server';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const featApiObject = await getFeat(params.featIndex as string);

  return json({
    feat: formatFeat(featApiObject),
  });
}

function Feat() {
	const { feat } = useLoaderData<typeof loader>();
	const router = useRouter()
	const { tr } = useI18n()

	return (
		<Screen
			title={!feat ? 'feat' : `feat - ${tr(feat?.nameLocalized)}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
		>
			{feat && (
				<div className='mt-8'>
					<FeatContent feat={feat} />
				</div>
			)}
		</Screen>
	)
}

export default Feat