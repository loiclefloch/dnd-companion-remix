import LevelDetailView from "~/components/LevelDetailView"
import Screen from "~/components/Screen"
import useI18n from "~/modules/i18n/useI18n"
import IconBookOpen from "~/components/icons/IconBookOpen";
import BottomScreen from '~/components/BottomScreen';
import Button from '~/components/Button';
import IconChevronRight from "~/components/icons/IconChevronRight"
import IconChevronLeft from "~/components/icons/IconChevronLeft"
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatClass } from "~/mappers/class.mapper";
import { getClass } from "~/services/class.server";
import { requireUser } from "~/services/session.server";
import { getLevellingDataForClassesAndLevel, getLevellingStages } from "~/modules/levelling";

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const level =  parseInt(params.level as string, 10);
  const classApiObject = await getClass(params.classIndex as string);

  const levellingData = getLevellingDataForClassesAndLevel([ classApiObject ], level)
  const levellingStages = getLevellingStages()

  return json({
		level,
    classDto: formatClass(classApiObject),
    levellingData,
    levellingStages,
  });
}


export default function LevellingClassLevel() {
	const { level, classDto, levellingData, levellingStages } = useLoaderData<typeof loader>();
	const { tr } = useI18n()

	return (
    <Screen
      title={`${tr(classDto.nameLocalized)} - Niveau ${level}`}
      titleIcon={<IconBookOpen className="h-6 w-6" />}
    >
      <LevelDetailView levellingData={levellingData} levellingStages={levellingStages} clss={classDto} level={level} />

      <BottomScreen>
        <Button
          disabled={level === 1}
          variant="cta"
          size="small"
          className="flex items-center justify-between border-b-0 border-l-0 border-r-0 border-l-white pr-6 text-xs"
          to={`/levelling/${classDto.index}/${level - 1}`}
        >
          {level !== 1 && (
            <>
              <span>
                <IconChevronLeft />
              </span>
              <span>Level {level - 1}</span>
            </>
          )}
        </Button>
        <Button
          disabled={level === 20}
          variant="cta"
          size="small"
          className="flex items-center justify-between border-b-0 border-r-0 border-l-white pl-6 text-xs"
          to={`/levelling/${classDto.index}/${level + 1}`}
        >
          {level !== 20 && (
            <>
              <span>Level {level + 1}</span>
              <span>
                <IconChevronRight />
              </span>
            </>
          )}
        </Button>
      </BottomScreen>
    </Screen>
  );
}
