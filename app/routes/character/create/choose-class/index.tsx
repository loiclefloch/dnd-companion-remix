import useRouter from '~/hooks/useRouter'
import Screen from "~/components/Screen";
import useI18n from '../../../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "~/components/ListSelectRow"
import IconClass from "~/components/icons/IconClass"
import ScreenIntroduction from "~/components/ScreenIntroduction"
import { useLoaderData } from '@remix-run/react';
import { getClasses } from '~/services/class.server';
import type { LoaderArgs} from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import { formatClass } from '~/mappers/class.mapper';
import { requireUser } from '~/services/session.server';

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const classes = await getClasses();

  return json({
    classes: classes.map(formatClass),
  });
}


function ClassRow({ clss }) {
	const { tr } = useI18n()

	return (
		<ListSelectRowAsCard 
			to={`/character/create/choose-class/${clss.index}`}
			icon={
				<IconClass
					withBgColor
					// withTextColor
					clss={clss.index}
					className="w-12 h-12 fill-white"
				/>
			}
			title={tr(clss.nameLocalized)}
			subtitle={tr(clss.resume)}
		/>
	)
}

function FormView({ classes }) {
	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez votre classe"
				description={`De nombreuses classes existent dans le monde de Donjon & Dragons.`}
				actions={
					<button>En savoir plus</button>
				}
			/>

			<ListRowSelectContainer className="px-4 mt-6">
				{classes?.map(classDto => (
					<ClassRow key={classDto.index} clss={classDto} />
				))}
			</ListRowSelectContainer>
		</div>
	)
}

function ChooseCharacterClass() {
	const { classes } = useLoaderData<typeof loader>();

	return (
		<Screen
			title={"Choix de la classe"}
		>
			<FormView classes={classes} />
		</Screen>
  );
}

export default ChooseCharacterClass;
