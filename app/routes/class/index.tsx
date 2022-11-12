import Screen from "~/components/Screen";
import useI18n from '../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "~/components/ListSelectRow"
import IconAcademicCap from "~/components/icons/IconAcademicCap"
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderArgs} from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import { formatClass } from '~/mappers/class.mapper';
import { getClasses } from '~/services/class.server';
import { requireUser } from '~/services/session.server';
import IconClass from '~/components/icons/IconClass';

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const classApiObjects = await getClasses();

  return json({
    classes: classApiObjects.map(formatClass),
  });
}

function ClassRow({ classDto }) {
	const { tr } = useI18n()

	return (
    <Link to={`/class/${classDto.index}`}>
      <ListSelectRowAsCard
        size="small"
        icon={
          <IconClass clss={classDto.index} className="h-8 fill-slate-600" />
        }
        title={tr(classDto.nameLocalized)}
        subtitle={tr(classDto.resume)}
      />
    </Link>
  );
}

export default function Classes() {
	const { classes } = useLoaderData<typeof loader>();

  return (
    <Screen
      title={"Les classes"}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			withBottomSpace
    >
			<div className="flex flex-col">

				<ListRowSelectContainer className="px-4 mt-4">
					{classes.map(classDto => (
						<ClassRow key={`class_${classDto.index}`} classDto={classDto} />
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

