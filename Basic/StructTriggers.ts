import { cloneType, flattenType, mergeTypes, StructProperties, TriggerValueType } from "../TriggerValueTypes"
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef"
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerCategoryColors } from "../TriggerCategories";

const triggers = `
void struct.setProperty(Set property {key: string = "prop"} to {value: any = 1} in {struct: struct})
any struct.getProperty(Get property {key: string = "prop"} in {struct: struct})
void struct.removeProperty(Remove property {key: string = "prop"} in {struct: struct})
void struct.clear(Clear struct {struct: struct})
number struct.propertyCount(Amount of properties in {struct: struct})

array<string> struct.listProperties(List property keys of {struct: struct})
array<any> struct.listValues(List values of {struct: struct})

struct struct.clone(Clone struct {struct: struct})
struct struct.merge(Merge structs {struct1: struct} and {struct2: struct})
`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.typeOperators));

groupSimilarTriggers(triggers);

export const structTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));