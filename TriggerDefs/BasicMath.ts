import { TriggerSetup } from "../../../../../Shared/Defs/Base/Trigger/TriggerSetup";
import { TriggerCategoryColors } from "../TriggerCategories";
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";

const triggers = `
number|vector num.add({a: number|vector = 1} + {b: number|vector = 2})
number|vector num.subtract({a: number|vector = 1} − {b: number|vector = 2})
number|vector num.multiply({a: number|vector = 1} * {b: number|vector = 2})
number|vector num.divide({a: number|vector = 1} / {b: number|vector = 2})
number|vector num.remainder({a: number|vector = 1} % {b: number|vector = 2})
number|vector num.exponent({a: number|vector = 1} ^ {b: number|vector = 2})
number|vector num.log({a: number|vector = 1} log base {b: number|vector = 2})
`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.operators));

groupSimilarTriggers(triggers);

export const basicMathTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));