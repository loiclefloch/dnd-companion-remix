import Screen from "~/components/Screen";
import { makeI18n } from '../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "~/components/ListSelectRow"
import IconAcademicCap from "~/components/icons/IconAcademicCap"
import { useLoaderData } from '@remix-run/react';
import type { LoaderArgs} from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import { formatBackground } from '~/mappers/background.mapper';
import { getBackgrounds } from '~/services/background.server';
import { requireUser } from '~/services/session.server';

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const backgroundApiObjects = await getBackgrounds();

  return json({
    backgrounds: backgroundApiObjects.map(formatBackground),
  });
}

const useI18n = makeI18n({
	'screen.title': {
		fr: `Les backgrounds`,
		en: `Backgrounds`,
	}
})

function BackgroundRow({ background }) {
	const { tr } = useI18n()

	return (
    <ListSelectRowAsCard
      to={`/background/${background.index}`}
      size="small"
      title={tr(background.nameLocalized)}
      subtitle={tr(background.resume)}
    />
  );
}

export default function Backgrounds() {
	const { backgrounds } = useLoaderData<typeof loader>();
	const { tr } = useI18n()

  return (
    <Screen
      title={tr`screen.title`}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			withBottomSpace
    >
			<div className="flex flex-col">

				<ListRowSelectContainer className="px-4 mt-4">
					{backgrounds.map(background => (
						<BackgroundRow key={`background_${background.index}`} background={background} />
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

