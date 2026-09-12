import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

boolean customObjectEntity.getShowHealth(Get show health bar on {entity: CustomObjectEntity})
void customObjectEntity.setShowHealth(Set show health bar on {entity: CustomObjectEntity} to {value: boolean})
boolean customObjectEntity.getShowHealth(Get show score on {entity: CustomObjectEntity})
void customObjectEntity.setShowHealth(Set show score on {entity: CustomObjectEntity} to {value: boolean})

string sharedProps.name({target: Player|ObjectEntity}'s displayed name)
void sharedProps.setName(Set {target: CustomObjectEntity}'s displayed name to {name: string})

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.objects));

export const customObjectEntityProps: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
