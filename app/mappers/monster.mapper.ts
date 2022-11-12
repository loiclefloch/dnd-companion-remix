import last from "lodash/last"
import type { MonsterApiObject } from "~/apiobjects/monster.apiobject"
import type { MonsterDto } from '../dtos/monster.dto';

export function formatMonster(monsterApiObject: MonsterApiObject): MonsterDto {
	 // TODO: better mapper
	 const monster: MonsterDto = {
		...monsterApiObject
	 }
  if (monsterApiObject.hp) {
    if (monster.hp.includes("+") && !monsterApiObject.hp.includes("(")) {
      // 18d10 + 36
      // 17d12 + 85
      // 2d8
      // console.log(monster.hp)
      monster.hpDice = monsterApiObject.hp.replaceAll(' ', '')
    } else {
      // 110 (13d10 + 39)
      const groups = monsterApiObject.hp.match(/\((.*)\)/)
      // console.log({ groups })
      if (groups.length >= 2) {
        if (groups[1] && groups[1].replaceAll) { // TODO: replaceAll bug on server side
          monster.hpDice = groups[1].replaceAll(' ', '')
        }
      } else {
        console.log(monsterApiObject.hp)
      }
    }
  }

  // TRICK: handle monsters with no custom image, use generic one
  if (monsterApiObject.imageUrl.endsWith("beast.jpg")) {
    monster.imageUrl = `/img/monsters/default_beast.jpg`
  } 
  else if (monsterApiObject.imageUrl.endsWith("humanoid.jpg")) {
    monster.imageUrl = `/img/monsters/default_humanoid.jpg`
  } 
  else if (monsterApiObject.imageUrl.endsWith("ooze.jpg")) {
    monster.imageUrl = `/img/monsters/default_ooze.jpg`
  } 
  else if (monsterApiObject.imageUrl.endsWith("plant.jpg")) {
    monster.imageUrl = `/img/monsters/default_plant.jpg`
  } 
  else if (monsterApiObject.imageUrl.endsWith("undead.jpg")) {
    monster.imageUrl = `/img/monsters/default_undead.jpg`
  } 
  else {
    const extension = last(monsterApiObject.imageUrl.split("."))
    monster.imageUrl = `/img/monsters/${monsterApiObject.index}.${extension}`
  }
  // console.log({ hpDice: monster.hpDice })

  if (monster.images) {
    monster.images.unshift({
      url: monster.imageUrl,
      label: monster.name
    })
  }

  return monster
}

