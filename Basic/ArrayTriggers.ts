import { TriggerSetup } from "../../../../../Shared/Defs/Base/Trigger/TriggerSetup";
import { TriggerCategoryColors } from "../TriggerCategories";
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef"
import { parseTriggerDefFromString } from "../TriggerDefParser";


const triggers = `
void array.setItem(Set item {index: number = 0} to {value: any = 1} in {array: array<any>})
any array.getItem(Get item {index: number = 0} in {array: array<any>})
any array.getLastItem(Get last item from {array: array<any>})
void array.addItem(Add {value: any = 1} to the end of {array: array<Any>})
void array.insertAtIndex(Insert {value: any = 1} before item {index: number = 0} in {array: array<any>})
void array.removeAtIndex(Remove item {index: number = 0} in {array: array<any>})
void array.clear(Clear array {array: array<any>})
number array.length(Length of {array: array<any>})

boolean array.contains({array: array<any>} contains {value: any = 1})
number array.getItemIndex(Position of {value: any = 1} in {array: array<any>})

array<any> array.sort(Sort {array: array<any>} using {callback: number} to evaluate [array.loop.item] [array.loop.index])
any array.findLowest(Find lowest item in {array: array<any>} using {callback: number} to evaluate [array.loop.item] [array.loop.index])
array<any> array.filter(Filter {array: array<any>} using {callback: boolean} to evaluate [array.loop.item] [array.loop.index])
any array.find(Find item in {array: array<any>} using {callback: boolean} to evaluate [array.loop.item] [array.loop.index])
number array.findIndex(Find index of item in {array: array<any>} using {callback: boolean} to evaluate [array.loop.item] [array.loop.index])
array<any> array.map(Map {array: array<any>} using {callback: any} to evaluate [array.loop.item] [array.loop.index])

array<any> array.reverse(Reverse {array: array<any>})
array<any> array.shuffle(Shuffle {array: array<any>})
any array.randomItem(Get random item from {array: array<any>})
any array.randomWeightedItem(Get random item from {array: array<any>} using {callback: number} to get the chance of [array.loop.item] [array.loop.index])

array<any> array.clone(Clone array {array: array<any>})
array<any> array.merge(Merge arrays {array1: array<any>} and {array2: array<any>})

array<any> array.slice(Get array section from {index1: number} to {index2: number} of {array: array<any>})

number array.loop.index(Index) [array.randomWeightedItem | array.sort | array.findLowest | array.filter | array.find | array.map]
number array.loop.item(Item) [array.randomWeightedItem | array.sort | array.findLowest | array.filter | array.find | array.map]

`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.typeOperators));

groupSimilarTriggers(triggers);

export const arrayTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));