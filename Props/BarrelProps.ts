import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

void barrel.fire(Fire barrel {barrel: Barrel})
void barrel.scheduleFire(Schedule firing barrel {barrel: Barrel})

number barrel.getCooldown(Get {barrel: Barrel}'s cooldown ticks)
void barrel.setCooldown(Set {barrel: Barrel}'s cooldown ticks to {value: number = 0})

number barrel.droneCount(Get {barrel: Barrel}'s drone count)

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.objects));

export const barrelPropTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
