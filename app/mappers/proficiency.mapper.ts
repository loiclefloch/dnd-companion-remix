import type { ProficicencyApiObject } from "~/apiobjects/proficicency.apiobject"
import type { ProficicencyDto } from "~/dtos/proficicency.dtocopy"
import proficiencies from "../database/data/proficiencies.json"
import skills from "../database/data/skills.json"

export function formatProficiency(proficiency: ProficicencyApiObject): ProficicencyDto {
	const data = proficiencies.find(p => p.index === proficiency.index)

	const isSkill = data.type === "Skills"

	const skillIndex = isSkill && proficiency?.index?.replaceAll ? proficiency.index.replaceAll("skill-", "") : proficiency?.index

	return {
		...proficiency,
		isSkill,
		typeLabel: data.type,
		...data,
		type: data.type.toLowerCase(),
		skill: isSkill 
			// proficiency.index.replaceAll && to fix build on vercel
			&& skills.find(s => s.index === skillIndex),
		skillIndex,
	}
}
