import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef, TriggerDynamicInfo } from "../TriggerDef";

// need dynamic

export const variableTriggers: Record<string, TriggerDef> = {

  "variable.createGlobal": {
    key: "variable.createGlobal",
    type: "action",
    isEnd: true,
    isVariableDef: true,
    isEntryPoint: true,
    color: TriggerCategoryColors.variables,
    
    getDynamicInfo: (trigger, setup) => {
      return {
        textItems: [
          {type: "text", text: "Define global variable"},
          {type: "heldTrigger", triggerKey: "variable.get"},
          {type: "seperator"},
          {type: "heldTrigger", triggerKey: "variable.set"},
          {type: "heldTrigger", triggerKey: "variable.increment"},
        ],
      }

    }
  },
  "variable.createStack": {
    key: "variable.createStack",
    type: "action",
    isVariableDef: true,
    color: TriggerCategoryColors.variables,
    
    getDynamicInfo: (trigger, setup) => {
      return {
        textItems: [
          {type: "text", text: "Define local variable"},
          {type: "heldTrigger", triggerKey: "variable.get"},
          {type: "text", text: "="},
          {type: "input", inputKey: "value"},
          {type: "seperator"},
          {type: "heldTrigger", triggerKey: "variable.set"},
          ...(trigger?.variableDef?.type?.[0]?.type == "vector" || trigger?.variableDef?.type?.[0]?.type == "number" || trigger?.variableDef?.type?.[0]?.type == "any" || trigger?.variableDef?.type?.[0]?.type == null ? [
            {type: "heldTrigger", triggerKey: "variable.increment"} satisfies TriggerDynamicInfo["textItems"][number],
          ] : []),
        ],
        inputs: {
          "value": {
            key: "value",
            defaultValue: {type: "null"},
            types: trigger?.variableDef?.type ?? [],
          },
        }
      }

    }
  },
  "variable.set": {
    key: "variable.set",
    type: "action",
    color: TriggerCategoryColors.variables,
    neededReference: ["variable.createStack", "variable.createGlobal"],
    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      return {
        textItems: [
          {type: "text", text: `Set ${referencedTrigger?.variableDef?.name ?? "Unknown variable"} to`},
          {type: "input", inputKey: "value"}
        ],
        inputs: {
          value: {
            key: "value",
            defaultValue: {type: "null"},
            types: referencedTrigger?.variableDef?.type ?? [],
          }
        }
      }
    }
  },
  "variable.increment": {
    key: "variable.increment",
    type: "action",
    color: TriggerCategoryColors.variables,
    neededReference: ["variable.createStack", "variable.createGlobal"],

    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      return {
        textItems: [
          {type: "text", text: `Add`},
          {type: "input", inputKey: "value"},
          {type: "text", text: `to ${referencedTrigger?.variableDef?.name ?? "Unknown variable"}`},
        ],
        inputs: {
          value: {
            key: "value",
            defaultValue: {type: "null"},
            types: referencedTrigger?.variableDef?.type ?? [],
          }
        }
      }
    }
  },
  
  "variable.get": {
    key: "variable.get",
    type: "value",
    color: TriggerCategoryColors.variables,
    neededReference: ["variable.createStack", "variable.createGlobal"],

    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      return {
        textItems: [
          {type: "text", text: referencedTrigger?.variableDef?.name ?? "Unknown variable"},
        ],
      }
    },

    returnType: (trigger, setup, referencedTrigger) => {
      return referencedTrigger?.variableDef?.type ?? []
    }
  },

  "variable.getEntityCustomProperty": {
    key: "variable.getEntityCustomProperty",
    type: "value",
    color: TriggerCategoryColors.variables,

    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      return {
        textItems: [
          {type: "text", text: "Get entity custom property"},
          {type: "input", inputKey: "key"},
          {type: "text", text: "from"},
          {type: "input", inputKey: "entity"},
        ],
        inputs: {
          "key": {
            key: "key",
            types: [{type: "string"}],
            defaultValue: {type: "string", value: "prop"},
          },
          "entity": {
            key: "Entity",
            types: [{type: "Entity"}, {type: "Player"}, {type: "Barrel"}, {type: "AutoTurret"}],
            defaultValue: {type: "null"}
          }
        }
      }
    },

    returnType: () => [{type: "any"}]
  },

  "variable.setEntityCustomProperty": {
    key: "variable.setEntityCustomProperty",
    type: "action",
    color: TriggerCategoryColors.variables,

    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      return {
        textItems: [
          {type: "text", text: "Set entity custom property"},
          {type: "input", inputKey: "key"},
          {type: "text", text: "on"},
          {type: "input", inputKey: "entity"},
          {type: "text", text: "to"},
          {type: "input", inputKey: "value"}
        ],
        inputs: {
          "key": {
            key: "key",
            types: [{type: "string"}],
            defaultValue: {type: "string", value: "prop"},
          },
          "entity": {
            key: "Entity",
            types: [{type: "Entity"}, {type: "Player"}, {type: "Barrel"}, {type: "AutoTurret"}],
            defaultValue: {type: "null"}
          },
          "value": {
            key: "value",
            types: [{type: "any"}],
            defaultValue: {type: "number", value: 1}
          }
        }
      }
    },
  },

  "variable.getGlobalCustomProperty": {
    key: "variable.getGlobalCustomProperty",
    type: "value",
    color: TriggerCategoryColors.variables,

    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      return {
        textItems: [
          {type: "text", text: "Get global custom property"},
          {type: "input", inputKey: "key"},
        ],
        inputs: {
          "key": {
            key: "key",
            types: [{type: "string"}],
            defaultValue: {type: "string", value: "prop"},
          },
        }
      }
    },

    returnType: () => [{type: "any"}]
  },

  "variable.setGlobalCustomProperty": {
    key: "variable.setGlobalCustomProperty",
    type: "action",
    color: TriggerCategoryColors.variables,

    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      return {
        textItems: [
          {type: "text", text: "Set global custom property"},
          {type: "input", inputKey: "key"},
          {type: "text", text: "to"},
          {type: "input", inputKey: "value"}
        ],
        inputs: {
          "key": {
            key: "key",
            types: [{type: "string"}],
            defaultValue: {type: "string", value: "prop"},
          },
          "value": {
            key: "value",
            types: [{type: "any"}],
            defaultValue: {type: "number", value: 1}
          }
        }
      }
    },
  },
}