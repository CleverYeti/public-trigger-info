import { TriggerSetup } from "../../../../../Shared/Defs/Base/Trigger/TriggerSetup";
import { TriggerCategoryColors } from "../TriggerCategories";
import { groupSimilarTriggers, TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";


const triggers = `
number|vector math.abs(Make {value: number|vector = -1} positive)
number|vector math.round(Round {value: number|vector = 0.5} to the closest)
number|vector math.floor(Round {value: number|vector = 0.5} down)
number|vector math.ceil(Round {value: number|vector = 0.5} up)
number|vector math.sqrt(Square root of {value: number|vector = 16})
number math.sin(Sine of {value: number = 60} degrees)
number math.cos(Cosine of {value: number = 60} degrees)
number math.normalizeAngle(Normalize angle {value: number = 270})

number|vector math.lerp(Interpolate between {start: number|vector = 5} and {end: number|vector = 10} with progress {progress: number|vector = 0.5})
number|vector math.lerpAngle(Interpolate between angles {start: number = 120} and {end: number = -120} with progress {progress: number|vector = 0.5})
`.split("\n").filter(line => line.trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.operators));

groupSimilarTriggers(triggers);

export const advancedMathTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
