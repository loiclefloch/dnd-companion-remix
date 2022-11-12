import type { RuleSectionApiObject } from "~/apiobjects/rule.apiobject";
import type { RuleSectionDto } from "~/dtos/rule.dto";
import type { RuleApiObject } from '../apiobjects/rule.apiobject';
import type { RuleDto } from '../dtos/rule.dto';

export function formatRuleSection(ruleSection: RuleSectionApiObject): RuleSectionDto {
	return ruleSection;
}

export function formatRule(rule: RuleApiObject): RuleDto {
  rule.descLocalized = {
    en: rule.desc
  }

  return rule
}