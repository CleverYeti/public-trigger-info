import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

TankDef defs.findTankDef(Find lobby tank def with name {name: string})
BossDef defs.findBossDef(Find lobby boss def with name {name: string})
ShapeDef defs.findShapeDef(Find lobby shape def with name {name: string})
BossDef defs.getRandomArenaBoss(Get random lobby arena boss def)
BossDef defs.getRandomTank(Get random lobby tank def)
TankDef defs.getStartingTankDef(Get lobby starting tank def)

array<BulletDef> defs.getAdvancedObjectBarrelBullets(Get advanced object def's barrels' bullet defs {def: AdvancedObjectDef})
array<AdvancedObjectDef> defs.getAdvancedObjectTurrets(Get advanced object def's auto turrets' advanced object defs {def: AdvancedObjectDef})
string defs.name(Get def's name {def: TankDef|BossDef|ShapeDef})

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.events));

export const defsTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
