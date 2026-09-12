import { parseTriggerDefFromString } from "../TriggerDefParser";
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef"
import { TriggerCategoryColors } from "../TriggerCategories";

const triggers = `
number random.float(Random decimal number between {min: number = 0} and {max: number = 1})
number random.int(Random whole number between and {min: number = 0} and {max: number = 10})
vector random.inArea(Random position in area at {position: vector = (0,0)} with size {size: number|vector = (10,10)} - is relative {isRelative: boolean = false})
vector random.normal(Random normal vector)
boolean random.chance(Random boolean with chance {chance: number = 0.5})
`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.operators));


groupSimilarTriggers(triggers);

export const randomTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));