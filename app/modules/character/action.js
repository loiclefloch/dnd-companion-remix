import { v4 as uuid } from 'uuid';
import equipmentList from '~/database/data/equipment.json'
import { formatEquipmentItem } from '~/mappers/equipment.mapper';

export function actionAddXp(label, amount) {
	return {
		type: 'actionAddXp',
		apply: (character) => {
			character.levelling.xp += amount
			if (!character.levelling.history) {
				character.levelling.history = []
			}
			character.levelling.history.push({
				id: uuid(),
				label,
				amount,
			})
		}
	}
}

export function actionLearnSpell(spell) {
	return {
		type: 'actionLearnSpell',
		apply: (character) => {
			character.spellsList.push({ index: spell.index, isPrepared: false })
		}
	}
}

export function actionPrepareSpell(spellToUpdate) {
	return {
		type: 'actionPrepareSpell',
		apply: (character) => {
			const spell = character.spellsList.find(s => s.index === spellToUpdate.index)
			spell.isPrepared = true
		}
	}
}

export function actionUnprepareSpell(spellToUpdate) {
	return {
		type: 'actionUnprepareSpell',
		apply: (character) => {
			const spell = character.spellsList.find(s => s.index === spellToUpdate.index)
			spell.isPrepared = false
		}
	}
}

export function actionRemoveSpell(spellToRemove) {
	return {
		type: 'actionRemoveSpell',
		apply: (character) => {
			character.spellsList = character.spellsList.filter(s => s.index !== spellToRemove.index)
		}
	}
}

export function actionCastSpell(spell, spellLevel) {
	return {
		type: 'actionCastSpell',
		apply: (character, formattedCharacter) => {
			// console.info({ spell, spellLevel })
			character.spellsUsed = character.spellsUsed || []
			character.spellsUsed.push({ spell: spell.index, spellLevel })


			// TODO: remove
			if (!character.spellsSlots) {
				character.spellsSlots = getSpellsSlotsForCharacterLevel(
					formattedCharacter.classes,
					formattedCharacter.level
				)
			}
			
			const spellSlot = character.spellsSlots.find(spellSlot => spellSlot.spellLevel === spellLevel)
			spellSlot.usedSlots = (spellSlot.usedSlots || 0) + 1
		}
	}
}

export function actionEditSpellSlots(data) {
	return {
		type: 'actionEditSpellSlots',
		apply: (character) => {
			const {
				spellLevel,
				usedSlots,
				totalSlots,
			} = data
			
			const spellSlot = character.spellsSlots.find(spellSlot => spellSlot.spellLevel === spellLevel)
			spellSlot.usedSlots = usedSlots
			spellSlot.totalSlots = totalSlots
		}
	}
}

export function actionShortRest(hpToAdd, hitDiceToReduce) {
	return {
		type: 'actionShortRest',
		apply: (character) => {
			const defaultData = getDefaultData()
			// clean death saves
			character.deathSaves =  defaultData.deathSaves
		}
	}
}

export function actionLongRest() {
	return {
		type: 'actionLongRest',
		apply: (character) => {
			const defaultData = getDefaultData()
			character.currentHp = character.maximumHp
			character.spellsUsed = []
			// clean death saves TODO: clean after a fight?
			character.deathSaves =  defaultData.deathSaves
		}
	}
}

/**
 * 
 * @param {number} hpToModify positive or negative, the number to impact on currentHp
 */
export function actionModifyCurrentHp({
	hpToModify,
	willBeKo,
	willStabilize,
	isAboveMaximumHp,
}) { 
	return {
		type: 'actionModifyCurrentHp',
		apply: (character) => {
			character.currentHp = character.currentHp + hpToModify

			if (willBeKo) {
				// TODO:
			}
			if (willStabilize) {
				// TODO:
			}
			if (isAboveMaximumHp) {
				// TODO:
			}
		}
	}
}

export function actionAddEquipment(list) {
	return {
		type: 'actionAddEquipment',
		apply: (character) => {
			character.equipment = character.equipment ?? []
			list.forEach(item => {
				const foundItem = character.equipment.find(i => i.index === item.index)
				if (foundItem) {
					foundItem.quantity++
				} else {
					character.equipment.push({
						index: item.index,
						quantity: 1,
					})
				}
			})
		}
	}
}

// format item to access properties, on the data we only have the index / quantity
function getFormattedEquipmentItem(equipmentItem) {
	return formatEquipmentItem({
		...equipmentItem,
		...equipmentList.find(i => i.index === equipmentItem.index),
	})	
}

export function actionEquip(item) {
	return {
		type: 'actionEquip',
		apply: (character) => {
			if (item.isArmor) {
				const equippedArmor = character.equipment.find(equipmentItem => {
					const formatted = getFormattedEquipmentItem(equipmentItem)
					return formatted.isArmor && formatted.isEquipped
				})
				if (equippedArmor) {
					equippedArmor.isEquipped = false
				}
			}
			if (item.isShield) {
				const equippedShield = character.equipment.find(i => i.isShield && i.isEquipped)
				if (equippedShield) {
					equippedShield.isEquipped = false
				}
			}
			const itemToEquip = character.equipment.find(i => i.index === item.index)
			itemToEquip.isEquipped = true
		}
	}
}

export function actionUnequip(item) {
	return {
		type: 'actionUnequip',
		apply: (character) => {
			const itemToEquip = character.equipment.find(i => i.index === item.index)
			itemToEquip.isEquipped = false
		}
	}
}

export function actionWalletAddIncome(data) {
	return {
		type: 'actionWalletAddIncome',
		apply: character => {
			character.wallet.history.unshift({
				id: uuid(),
				isAdd: true,
				label: data.label,
				cp: parseInt(data.cp, 10) || 0,
				sp: parseInt(data.sp, 10) || 0,
				gp: parseInt(data.gp, 10) || 0,
				ep: parseInt(data.ep, 10) || 0,
				pp: parseInt(data.pp, 10) || 0,
			})
		}
	}
}

export function actionWalletAddExpense(data) {
	return {
		type: 'actionWalletAddExpense',
		apply: character => {
			character.wallet.history.unshift({
				id: uuid(),
				isAdd: false,
				label: data.label,
				cp: parseInt(data.cp, 10) || 0,
				sp: parseInt(data.sp, 10) || 0,
				gp: parseInt(data.gp, 10) || 0,
				ep: parseInt(data.ep, 10) || 0,
				pp: parseInt(data.pp, 10) || 0,
			})
		}
	}
}
