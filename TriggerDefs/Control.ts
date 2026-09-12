import { TriggerSetup } from "../../../../../Shared/Defs/Base/Trigger/TriggerSetup";
import { TriggerCategoryColors } from "../TriggerCategories";
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";


const triggers = `
void control.while(Repeat while {condition: boolean} - [loop.index]) {innerBlock}
void control.until(Repeat until {condition: boolean} - [loop.index]) {innerBlock}
void control.for(Repeat {iterations: number = 10} times - [loop.index]) {innerBlock}
void control.forEach(Repeat for each item in {array: array<any>} - [loop.item] [loop.index] [loop.setItem]) {innerBlock}

void control.async(Execute in the background) {innerBlock}
void control.if(If {condition: boolean}) {ifBlock}
void control.ifElse(If {condition: boolean}) {ifBlock} {elseBlock: Else}
void control.waitUntil(Wait until {condition: boolean})
void control.waitTicks(Wait {time: number = 25} ticks)
void control.waitSeconds(Wait {time: number = 1} seconds)

number loop.index(Index) [control.while | control.until | control.for | control.forEach]
number loop.item(Item) [control.forEach]
void loop.setItem(Replace item with {value: any}) [control.forEach]
end loop.break(Exit loop) [control.while | control.until | control.for | control.forEach]
end loop.continue(Skip iteration) [control.while | control.until | control.for | control.forEach]

end control.stopExecution(Stop execution)

`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.control));


groupSimilarTriggers(triggers);

export const controlTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));