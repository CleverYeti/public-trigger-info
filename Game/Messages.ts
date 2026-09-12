import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

void messages.sendNotificationToPlayer(Send notification to {player: Player} saying {text: string} in [temp] color {color: number} for {time: number} seconds - is big: {isBig: boolean})
void messages.sendNotificationToAll(Send notification to everyone saying {text: string} in [temp] {color: number} for {time: number} seconds - is big: {isBig: boolean})
void messages.sendChatToPlayer(Send chat message to {player: Player} saying {text: string})
void messages.sendChatToAll(Send chat message to everyone saying {text: string})

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.events));

export const messageTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));

for (let key of ["sendNotificationToAll"]) {
  const trigger = messageTriggers[key];
  const dynamicInfo = trigger.getDynamicInfo();
  dynamicInfo.dropdowns = {
    colorType: {
      defaultValue: "uiColor",
      key: "colorType",
      options: [
        {key: "uiColor", name: "UI color", isPriority: true},
        {key: "teamColor", name: "team color", isPriority: true},
      ]
    }
  }
  dynamicInfo.textItems.map(item => item.type == "heldTrigger" && item.triggerKey == "temp" ? {
    type: "dropdown",
    dropdownKey: "colorType"
  } : item)
  trigger.getDynamicInfo = () => dynamicInfo
}