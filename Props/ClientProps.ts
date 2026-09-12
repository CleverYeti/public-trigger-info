import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

number client.accessLevel(Get {player: Player}'s access level)
boolean client.isConnected(Is {player: Player} connected)
Tank client.currentTank({player: Player}'s current tank)
void client.enableCameraMode(Set {player: Player} in camera mode)
number client.getTeamID(Get {player: Player} player's team id)
void client.setTeamID(Set {player: Player} player's team id to {teamID: number})
void client.resetTeamID(Reset {player: Player} player's team id)


number client.getFov({target: Player|Tank|ControllingEntity}'s fov)
void client.lockFov(Lock {target: Player|Tank}'s fov to {fov: number = 1})
void client.unlockFov(Unlock {target: Player|Tank}'s fov)
vector client.getCameraPosition({target: Player|Tank|ControllingEntity}'s camera position)
void client.lockCameraPosition(Lock {target: Player|Tank}'s camera position to {cameraPosition: vector = (0,0)})
void client.unlockCameraPosition(Unlock {target: Player|Tank}'s camera position)

number client.respawnLevel(Get {player: Player}'s respawn level)

// these have to also be global
//void client.setFreecamInsteadOfSpectate(Set enable camera instead of spectate for {player: Player} to {value: boolean = false})
//boolean client.getFreecamInsteadOfSpectate(Get enable camera instead of spectate on {player: Player})
//void client.setCanSpawn(Set can {player: Player} spawn to {value: boolean = false})
//boolean client.getCanSpawn(Get can {player: Player} spawn)

void client.setSpectatingObject(Set {player: Player}'s spectated object to {target: ControllingEntity})
void client.getSpectatingObject(Get object spectated by {player: Player})

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.objects));

export const clientPropTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
