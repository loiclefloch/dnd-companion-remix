import useRouter from '~/hooks/useRouter'
import { Link, useLoaderData } from "@remix-run/react"
import Screen from "~/components/Screen";
import useI18n from '../../modules/i18n/useI18n';
import ClassDetailsView from '~/components/classes/ClassDetailsView';
import type { LoaderArgs} from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import { formatClass } from '~/mappers/class.mapper';
import { getClass } from '~/services/class.server';
import { requireUser } from '~/services/session.server';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const classApiObject = await getClass(params.classIndex as string);

  return json({
    classDto: formatClass(classApiObject)
  });
}

export default function ClassPage() {
	const { tr } = useI18n()
	const { classDto } = useLoaderData<typeof loader>();

	return (
    <Screen title={tr(classDto?.nameLocalized)} withBottomSpace>
      <div className="flex flex-col">
        <div className="relative mt-12 w-full px-4">
          <>
            <Link to={`/levelling/${classDto.index}/1`}>
              Voir la montée de niveau
            </Link>
            <ClassDetailsView clss={classDto} />
          </>
        </div>
      </div>
    </Screen>
  );
}

