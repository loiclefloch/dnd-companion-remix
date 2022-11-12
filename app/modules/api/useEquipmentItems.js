import equipment from "../../database/data/equipment.json"
import useRootData from "~/hooks/useRootData"

import { formatEquipmentItem } from "./useEquipmentItem"


function useEquipmentItems() {
	return useData(equipment.map(formatEquipmentItem))
}

export default useEquipmentItems