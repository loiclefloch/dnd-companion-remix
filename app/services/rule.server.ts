import ruleSections from '~/database/data/rules-sections.json'
import rules from '~/database/data/rules.json' // TODO: rename

import type { RuleApiObject, RuleSectionApiObject } from "~/apiobjects/rule.apiobject";

export async function getRuleSections(): Promise<Array<RuleSectionApiObject>>  {
	return ruleSections
}

export async function getRule(ruleId: string): Promise<RuleApiObject> {
	const rule = rules.find(r => r.index === ruleId);

	if (!rule) {
		throw new Error(`Rule not found with id ${ruleId}`);
	}

	return rule
}