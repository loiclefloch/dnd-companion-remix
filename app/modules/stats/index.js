

export function valueToModifier(value) {
	const map = {
		1: -5,
		2: -4,
		3: -4,
		4: -3,
		5: -3,
		6: -2,
		7: -2,
		8: -1,
		9: -1,
		10: 0,
		11: 1,
		12: 1,
		13: 1,
		14: 2,
		15: 2,
		16: 3,
		17: 3,
		18: 4,
		19: 4,
		20: 5,
		21: 5,
		22: 6,
		23: 6,
		24: 7,
		25: 7,
		26: 8,
		27: 8,
		28: 9,
		29: 9,
		30: 10,
	}

	return map[value]
}

export function valueToModifierLabel(value) {
	const modifier = valueToModifier(value)

	return `${modifier >= 0 ? '+' : '-'}${Math.abs(modifier)}`
}

export function getAbilityScorePointCost(score) {
	const abilityScorePointCost = {
		// score: cost
		8: 0,
		9: 1,
		10: 2,
		11: 3,
		12: 4,
		13: 5,
		14: 7,
		15: 9,
	}
	return abilityScorePointCost[score] || 0
}

export function modifierToModifierLabel(modifier) {
	return (modifier >= 0 ? '+' : '') + modifier
}