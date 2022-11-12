import Screen from "~/components/Screen";
import useI18n from '../../modules/i18n/useI18n';
import BackgroundContent from '~/components/background/BackgroundContent';
import { useLoaderData } from '@remix-run/react';
import { formatBackground } from '../../mappers/background.mapper';
import { getBackground } from '~/services/background.server';
import { requireUser } from '~/services/session.server';
import type { LoaderArgs } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const backgroundApiObject = await getBackground(params.backgroundIndex as string);

  return json({
    background: formatBackground(backgroundApiObject),
  });
}

function Background() {
	const { background } = useLoaderData<typeof loader>();
	const { tr } = useI18n()

	return (
    <Screen title={tr(background?.nameLocalized)} withBottomSpace>
      <div className="flex flex-col">
        <div className="relative mt-4 w-full px-4">
          <BackgroundContent background={background} />
        </div>
      </div>
    </Screen>
  );
}

export default Background;

