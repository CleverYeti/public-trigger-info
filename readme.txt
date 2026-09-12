# This is the planned triggers for havre.io's trigger editor.
## Please suggest triggers you think should be added
**Events and Basic ones are done, but Game and Props ones are still missing**

look at types.ts to see the inheritence tree of types

the syntax goes like this:
```
functionType triggerIdentifier(Text {inputKey: inputType})
functionType triggerIdentifier(Text {inputKey: inputType = defaultValue})
functionType triggerIdentifier(Text {inputKey: inputType = defaultValue} otherText [heldTriggerIdentifier])
functionType triggerIdentifier(Text {inputKey: inputType = defaultValue} otherText [heldTriggerIdentifier]) {innerBlock}
functionType triggerIdentifier(Text {inputKey: inputType = defaultValue} otherText [heldTriggerIdentifier]) {innerBlock} {innerBlock: Inner Block Label}
functionType triggerIdentifier(Text {inputKey: inputType = defaultValue} otherText [heldTriggerIdentifier]) [requiredReferenceTriggerIdentifier]
functionType triggerIdentifier(Text {inputKey: inputType = defaultValue} otherText [heldTriggerIdentifier]) [requiredReferenceTriggerIdentifier | otherRequiredReferenceTriggerIdentifier]
```