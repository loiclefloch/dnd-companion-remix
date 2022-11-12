import ruleSections from '~/database/data/rules-sections.json'
import rules from '~/database/data/rules.json' 
import type { RuleApiObject, RuleSectionApiObject } from "~/apiobjects/rule.apiobject";
import { cloneDeep } from 'lodash';

export async function getRuleSections(): Promise<Array<RuleSectionApiObject>>  {
	return cloneDeep(ruleSections)
}

export async function getRule(ruleId: string): Promise<RuleApiObject> {
	const rule = rules.find(r => r.index === ruleId);

	if (!rule) {
		throw new Error(`Rule not found with id ${ruleId}`);
	}

	return cloneDeep(rule)
}