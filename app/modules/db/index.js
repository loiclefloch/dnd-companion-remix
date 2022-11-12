import { createStorage } from "../utils/storage"

export const CharacterStorage = createStorage("createCharacter")
export const LevellingStorage = createStorage("levellingState")

export const BackupStorage = createStorage("backup")

BackupStorage.add = (type, id, data) => {
  BackupStorage.setItem(
    [
      ...(BackupStorage.getItem() || []),
      {
        type, 
        date: new Date(),
        id, 
        data, 
      }
    ]
  )
}

