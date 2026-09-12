import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


// most advanced object props are here, because most props are not used on turrets
const triggers = `

void controllingEntity.getScore({entity: Shape|Tank}'s score)
void controllingEntity.setScore(Set {entity: Shape|Tank}'s score to {score: number = 0})
void controllingEntity.gainScore(Increase {entity: Shape|Tank}'s score by {score: number = 0})

void controllingEntity.resetDrones(Reset {entity: ControllingEntity}'s drones)

void controllingEntity.setPowerup(Set {entity: Tank|CustomObjectEntity}'s powerup to {powerup: number = 0})
void controllingEntity.removePowrup(Remove {entity: Tank|CustomObjectEntity}'s powerup)

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.objects));

export const controllingEntityPropTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
