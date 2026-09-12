import { parseTriggerDefFromString } from "../TriggerDefParser";
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef"
import { TriggerCategoryColors } from "../TriggerCategories";


const triggers = `
string string.fromOther({value: number = 10} to string)
string string.concat(Join strings {a: string = "abc"} and {b: string = "def"})
string string.fromArray(Join array {array: array<any>} seperated by {seperator: string = ", "})
number string.length(Length of string {str: string = "abc"})
array<string> string.split(Split string {str: string = "abc def"} into array at every {seperator: string = " "})
array<any> string.slice(Get string section from {index1: number = 1} to {index2: number = 4} of {str: string = "abcdef"})
boolean string.contains(String {str: string = "abcdef"} contains {subStr: string = "cde"})
number string.indexOf(Index of {subStr: string = "cde"} in string {str: string = "abcdef"})
string string.replace(Replace {match: string = "cde"} with {replacer: string = "ghi"} in string {str: string = "abcdef"})
string string.toUpperCase({str: string = "abc"} in upper case)
string string.toLowerCase({str: string = "ABC"} in lower case)
number string.toNumber(string {str: string = "123"} to number)
`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.typeOperators));

groupSimilarTriggers(triggers);

export const stringTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));