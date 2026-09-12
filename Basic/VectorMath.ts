import { parseTriggerDefFromString } from "../TriggerDefParser";
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef";
import { TriggerCategoryColors } from "../TriggerCategories";

const triggers = `
number vector.crossProduct(Cross product of {a: vector = (1,1)} and {a: vector = (2,2)})
number vector.dotProduct(Dot product of {a: vector = (1,1)} and {a: vector = (2,2)})
number vector.distance(Distance between vectors {a: vector = (1,1)} and {a: vector = (2,2)})

number vector.angle(Angle of vector {vec: vector = (1,1)})
number vector.length(Length of vector {vec: vector = (1,1)})
number vector.x(X of vector {vec: vector = (1,2)})
number vector.y(Y of vector {vec: vector = (1,2)})

vector vector.fromPolar(Vector with angle {angle: number = 45} and length {length: number = 10})
vector vector.fromComponents(Vector from x {x: number = 1} and y {y: number = 1})

vector vector.setAngle(Set vector {vec: vector = (1,2)} angle to {angle: number = 45} degrees)
vector vector.setLength(Set vector {vec: vector = (1,2)} length to {length: number = 1})
vector vector.rotate(Rotate vector {vec: vector = (1,2)} by {angle: number = 45} degrees)
`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.operators));

groupSimilarTriggers(triggers);

export const vectorTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));