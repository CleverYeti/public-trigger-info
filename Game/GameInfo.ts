import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

number game.tickNumber(Tick number)
number game.secondsSinceGameStart(Seconds since lobby start)
number game.epochTime(Epoch timestamp)

array<Player> game.getPlayers(Get player list)

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.events));

export const gameInfoTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
