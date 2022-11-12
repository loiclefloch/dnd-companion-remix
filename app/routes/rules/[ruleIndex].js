import Screen from "~/components/Screen"
import IconAcademicCap from "~/components/icons/IconAcademicCap"

import useRouter from "~/hooks/useRouter"
import useRule from "../../modules/api/useRule"

import RuleContent from "~/components/RuleContent"

function Rule() {
	const router = useRouter()
	const index = router.query.ruleIndex || 'the-order-of-combat'
	const rule = useRule(index)

  return (
		<Screen
			title={`Règles - ${rule.name || ''}`}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			withBottomSpace
		>
			<div className="flex flex-col gap-2 p-4" data-cy-id="spells-list">
				<RuleContent index={index} rule={rule} />
			</div>
		</Screen>
	);
}

export default Rule;
