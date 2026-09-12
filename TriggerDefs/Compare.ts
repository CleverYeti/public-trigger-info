import { TriggerSetup } from "../../../../../Shared/Defs/Base/Trigger/TriggerSetup";
import { TriggerCategoryColors } from "../TriggerCategories";
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";



const triggers = `
boolean compare.smaller({a: number|vector = 1} < {b: number|vector = 2})
boolean compare.smallerOrEquals({a: number|vector = 1} <= {b: number|vector = 2})
boolean compare.bigger({a: number|vector = 1} > {b: number|vector = 2})
boolean compare.biggerOrEquals({a: number|vector = 1} >= {b: number|vector = 2})
boolean compare.equals({a: any = 1} == {b: any = 2})
boolean compare.notEquals({a: any = 1} != {b: any = 2})

boolean compare.approximately({a: number|vector =0.95} is within {value: number|vector = 0.1} of {b: number|vector = 1})
boolean compare.inRange({value: number|vector = 2} is within {a: number|vector = 1} of {b: number|vector = 3})

boolean compare.isNull({value: any = null} is null)
`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.operators));


// need to add dropdowns for this
// boolean compare.isType({value: any} is of type)

groupSimilarTriggers(triggers);

export const compareTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));