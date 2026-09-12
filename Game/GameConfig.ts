import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

// can spawn
void gamemode.setFreecamInsteadOfSpectate(Set enable camera instead of spectate for everyone to {value: boolean = false})
boolean gamemode.getFreecamInsteadOfSpectate(Get enable camera instead of spectate for everyone)
void gamemode.setCanSpawn(Set can players spawn to {value: boolean = false})
boolean gamemode.getCanSpawn(Get can players spawn)

// team stuff
void gamemode.setTeamCount(Set gamemode to fixed team count of {count: number = 0})
void gamemode.setTeamSize(Set gamemode to ffa with team size of {count: number = 0})
boolean gamemode.getIsTeams(Get are fixed teams enabled)
number gamemode.getTeamCount(Get gamemode team count)
number gamemode.getTeamSize(Get gamemode ffa team size)
number gamemode.getNextTeamID(Get next team id)
number gamemode.getPlayerNextTeamID(Get next team id for {player: Player})


boolean gameSettings.getEnableLeaderArrow(Get is leader arrow enabled)
boolean gameSettings.setEnableLeaderArrow(Set is leader arrow enabled to {isEnabled: number = 0})


`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.events));

export const gameConfigTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
