import groupBy from "lodash/groupBy"
import useI18n from "../../modules/i18n/useI18n"
import Screen from "~/components/Screen"
import useCurrentCharacter from "~/components/useCurrentCharacter"
import IconBriefcase from "~/components/icons/IconBriefcase"
import { useEquipmentItemScreenAsModal } from "~/routes/resource/modal/equipment-item"
import useMagicItemScreenAsModal from "~/components/useMagicItemScreenAsModal"
import useChooseEquipmentScreenAsModal from "~/components/useChooseEquipmentScreenAsModal"
import CharacterEquipmentItemRow from "~/components/CharacterEquipmentItemRow"

function Group({ title, character, items }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	const { showMagicItemScreenAsModal } = useMagicItemScreenAsModal()

	if (!items) {
		return null
	}

	return (
		<div className="mx-4 mt-2 mb-4 select-none">
			<div className="font-semibold text-md">{title}</div>
			<div className="py-2">
				{items?.map((item, index) => (
					<CharacterEquipmentItemRow
						key={index} // index since we could have multiple times the same item for a character?
						item={item}
						character={character}
						onClick={() => {
							if (item.isMagicItem) {
								showMagicItemScreenAsModal(item)
							} else {
								showEquipmentItemScreenAsModal(item)
							}
						}}
					/>
				))}
			</div>
		</div>
	)
}

function Character() {
	const { tr } = useI18n()
	const currentCharacter = useCurrentCharacter()
	const { showChooseEquipmentModal } = useChooseEquipmentScreenAsModal()
	const grouped = groupBy(currentCharacter?.actionsEquipment, item => item.equipmentCategory.index)

	return (
		<Screen
			title={`${currentCharacter?.name} - Actions`}
			titleIcon={<IconBriefcase className="w-6 h-6" />}
			root
			withCharacterMenu
		>
			{currentCharacter && (
				<>
					<Group title="Armes" items={grouped.weapon} character={currentCharacter} />
				</>
			)}
		</Screen>
	)
}

export default Character