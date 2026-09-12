import { TriggerSetup } from "../../../../../Shared/Defs/Base/Trigger/TriggerSetup";
import { TriggerCategoryColors } from "../TriggerCategories";
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";


const triggers = `
boolean boolean.and({a: boolean|any = true} and {b: boolean|any = false})
boolean boolean.or({a: boolean|any = true} or {b: boolean|any = false})
boolean boolean.not(not {value: boolean|any = true})
any boolean.selectIf(if {value: boolean|any = true} return {a: any = 1} else {b: any = 2})
`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.operators));

groupSimilarTriggers(triggers);

export const booleanTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));