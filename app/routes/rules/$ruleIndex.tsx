import Screen from "~/components/Screen"
import IconAcademicCap from "~/components/icons/IconAcademicCap"
import RuleContent from "~/components/RuleContent"
import { getRule } from "~/services/rule.server"
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime"
import { formatRule } from "~/mappers/rule.mapper"
import { requireUser } from "~/services/session.server"
import { useLoaderData } from '@remix-run/react';

export async function loader({ request, params }: LoaderArgs) {
  const token = await requireUser(request);

  const rule = await getRule(params.ruleIndex as string);

  return json({
    rule: formatRule(rule),
  });
}


function Rule() {
	const { rule } = useLoaderData<typeof loader>();

  return (
		<Screen
			title={`Règles - ${rule.name || ''}`}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			withBottomSpace
		>
			<div className="flex flex-col gap-2 p-4" data-cy-id="spells-list">
				<RuleContent index={rule.index} />
			</div>
		</Screen>
	);
}

export default Rule;
