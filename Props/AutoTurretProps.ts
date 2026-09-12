import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

void autoTurret.setRelativeAngle(Set {autoTurret: AutoTurret}'s relative angle to {angle: number})
void autoTurret.setAbsoluteAngle(Set {autoTurret: AutoTurret}'s absolute angle to {angle: number})
number autoTurret.getAngle(Get {autoTurret: AutoTurret}'s angle)
number autoTurret.getAbsoluteAngle(Get {autoTurret: AutoTurret}'s absolute angle)
bool autoTurret.isAngleRelative(Is {autoTurret: AutoTurret}'s angle relative)

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.objects));

export const AutoTurretPropTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
