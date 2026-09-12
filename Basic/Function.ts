import { findTrigger } from "../../LiveTriggers/Helpers/FindTrigger";
import { TriggerSetup } from "../../../../../Shared/Defs/Base/Trigger/TriggerSetup";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueType } from "../TriggerValueTypes";
import { TriggerCategoryColors } from "../TriggerCategories";

// to be made using dynamic things


export const functionTriggers: Record<string, TriggerDef> = {
  "function.arg": {
    key: "function.arg",
    type: "value",
    neededReference: ["function.define"],
    color: TriggerCategoryColors.functions,

    getDynamicInfo: (trigger, setup, referencedTrigger, functionArgKey) => {
      if (
        referencedTrigger?.customFunctionDef?.inputs?.[functionArgKey ?? ""] == null
      ) return {
        textItems: [{type: "text", text: "Unknown function argument"}],
        inputs: {},
        insetPaths: {},
        dropdowns: {},
      }
      return {
        textItems: [{type: "text", text: functionArgKey ?? "" }],
        inputs: {},
        insetPaths: {},
        dropdowns: {},
      }
    },

    returnType: (trigger, setup, referencedTrigger, functionArgKey) => {
      if (
        referencedTrigger?.customFunctionDef?.inputs?.[functionArgKey ?? ""] == null
      ) return [];
      return referencedTrigger.customFunctionDef.inputs[functionArgKey ?? ""].types
    },

    similarTriggers: [],
  },

  "function.return": {
    key: "function.return",
    type: "action",
    neededReference: ["function.define"],
    color: TriggerCategoryColors.functions,
    
    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      if (referencedTrigger?.customFunctionDef?.type != "value") return {
        textItems: [{type: "text", text: "Return"}],
      };

      return {
        textItems: [
          {type: "text", text: "Return"},
          {type: "input", inputKey: "value"},
        ],
        inputs: {"value": {
          key: "value",
          defaultValue: {type: "null"},
          types: referencedTrigger.customFunctionDef.returnType
        }},
      }
    },

    isEnd: true,
    isEntryPoint: false,
  },

  "function.define": {
    key: "function.define",
    type: "action",
    color: TriggerCategoryColors.functions,

    getDynamicInfo: (trigger) => ({
      textItems:  [
        {type: "text", text: "Define function"},
        {type: "heldTrigger", triggerKey: trigger?.customFunctionDef?.type == "value" ? "function.callValue" : "function.callVoid"},
        {type: "text", text: "-"},
        {type: "heldTrigger", triggerKey: "function.return"},
      ],
    }),

    isFunctionDef: true,
    isEntryPoint: true,
  },

  "function.callValue": {
    key: "function.callValue",
    type: "value",
    neededReference: ["function.define"],
    color: TriggerCategoryColors.functions,

    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      if (referencedTrigger?.customFunctionDef == null) return {
        textItems: [{type: "text", text: "Unknown function"}],
      };

      return {
        textItems: referencedTrigger.customFunctionDef.textItems,
        inputs: referencedTrigger.customFunctionDef.inputs,
      }
    },

    returnType: (trigger, setup, referencedTrigger) => {
      if (referencedTrigger?.customFunctionDef?.type != "value") return [];
      return referencedTrigger.customFunctionDef.returnType
    },
  },
  "function.callVoid": {
    key: "function.callVoid",
    type: "action",
    neededReference: ["function.define"],
    color: TriggerCategoryColors.functions,

    getDynamicInfo: (trigger, setup, referencedTrigger) => {
      if (referencedTrigger?.customFunctionDef == null) return {
        textItems: [{type: "text", text: "Unknown function"}],
      };

      return {
        textItems: referencedTrigger.customFunctionDef.textItems,
        inputs: referencedTrigger.customFunctionDef.inputs,
      }
    },
  }
}