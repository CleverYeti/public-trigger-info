import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

array<Barrel> advancedObject.getBarrels(Get {advancedObject: AdvancedObject}'s barrels}])
array<Barrel> advancedObject.getAutoTurrets(Get {advancedObject: AdvancedObject}'s auto turrets}])
AdvancedObjectDef advancedObject.getDef({advancedObject: AdvancedObject}'s advanced object def}])

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.objects));

export const advancedObjectPropTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
