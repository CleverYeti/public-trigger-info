import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

// tick
start globalEvents.onStart(When starting execution)
start events.onTick(On every tick)
void listeners.onTick(Listen for {target: Entity|Player = null} ticking - [listeners.remove]) {innerBlock}

// chat
start globalEvents.onChat(When [event.player] sends a chat [event.message] - [event.preventDefault])
void listeners.onChat(Listen for {player: Player = null} sending a chat [event.message] - [event.preventDefault] [listeners.remove]) {innerBlock}
string event.message(Message) [listeners.onChat | globalEvents.onChat]


// spawn
start globalEvents.onPlayerSpawnAttempt(When [event.player] tries to spawn - [event.preventDefault])
void listeners.onPlayerSpawnAttempt(Listen for {player: Player = null} trying to spawn - [event.preventDefault] [listeners.remove]) {innerBlock}
start globalEvents.onPlayerDeath(When [event.player]'s [event.tank] dies - [event.preventDefault])
void listeners.onPlayerDeath(Listen for {player: Player = null}'s [event.tank] dying - [event.preventDefault] [listeners.remove]) {innerBlock}
start globalEvents.onPlayerSpawn(When [event.player] spawns as [event.tank])
void listeners.onPlayerSpawn(Listen for player {player: Player = null} spawning as [event.tank] - [listeners.remove]) {innerBlock}
start localEvents.onSpawn(When spawning)
start localEvents.onDestroy(When removed)
// type specific spawn events are down there because of the dropdown


// damage
start localEvents.onDamage(When taking damage - [event.onDamage.damage] [event.onDamage.source] [event.preventDefault])
void listeners.onDamage(Listen for {entity: Entity = null} taking damage - [event.onDamage.damage] [event.onDamage.source] [event.preventDefault] [listeners.remove]) {innerBlock}
start localEvents.onDealDamage(When dealing damage - [event.onDamage.damage] [event.onDealDamage.target] [event.preventDefault])
void listeners.onDealDamage(Listen for {entity: Entity = null} dealing damage - [event.onDamage.damage] [event.onDealDamage.target] [event.preventDefault] [listeners.remove]) {innerBlock}
number event.onDamage.damage(Damage) [localEvents.onDamage | localEvents.onDealDamage | listeners.onDamage | listeners.onDealDamage]
Entity event.onDamage.source(Source) [localEvents.onDamage | listeners.onDamage]
Entity event.onDealDamage.target(Target) [localEvents.onDealDamage | listeners.onDealDamage]

// kill and death
start localEvents.onKill(When killing [event.onKill.entity])
void listeners.onKill(Listen for {entity: Entity = null} killing [event.onKill.entity] - [listeners.remove]) {innerBlock}
start localEvents.onDeath(When dying - [event.onDeath.entity])
void listeners.onDeath(Listen for {entity: Entity = null} dying - [event.onDeath.entity] [listeners.remove]) {innerBlock}
Entity event.onKill.entity(Entity) [localEvents.onKill | listeners.onKill]
Entity event.onDeath.entity(Killer) [localEvents.onDeath | listeners.onDeath]

// input
// temp will be replaced
void listeners.onKeyDown(Listen for {player: Player} pressing [temp] - [event.preventDefault] [listeners.remove]) {innerBlock}
void listeners.onKeyUp(Listen for {player: Player} releasing [temp] - [listeners.remove]) {innerBlock}

// upgrade stat and tank
start localEvents.onScheduleStat(When scheduling stats - [event.onUpgradeStat.category] [event.onUpgradeStat.amount] [event.preventDefault])
void listeners.onScheduleStat(Listen for {entity: Player|Tank} scheduling stats - [event.onUpgradeStat.category] [event.onUpgradeStat.amount] [event.preventDefault] [listeners.remove]) {innerBlock}
start localEvents.onUpgradeStat(When upgrading stats - [event.onUpgradeStat.category] [event.onUpgradeStat.amount] [event.preventDefault])
void listeners.onUpgradeStat(Listen for {entity: Player|Tank} upgrading stats - [event.onUpgradeStat.category] [event.onUpgradeStat.amount] [event.preventDefault] [listeners.remove]) {innerBlock}
number event.onUpgradeStat.category(Category) [localEvents.onScheduleStat | listeners.onScheduleStat | localEvents.onUpgradeStat | listeners.onUpgradeStat]
number event.onUpgradeStat.amount(Amount) [localEvents.onScheduleStat | listeners.onScheduleStat | localEvents.onUpgradeStat | listeners.onUpgradeStat]
start localEvents.onUpgradeTank(When changing tank - [event.onUpgradeTank.previousTank] [event.onUpgradeTank.newTank] [event.preventDefault])
void listeners.onUpgradeTank(Listen for {entity: Player|Tank} changing tank - [event.onUpgradeTank.previousTank] [event.onUpgradeTank.newTank] [event.preventDefault] [listeners.remmove]) {innerBlock}
TankDef event.onUpgradeTank.previousTank(Prev. tank def) [localEvents.onUpgradeTank | listeners.onUpgradeTank]
TankDef event.onUpgradeTank.newTank(New tank def) [localEvents.onUpgradeTank | listeners.onUpgradeTank]

// gain score and level up
start localEvents.onGainScore(When gaining [event.onGainScore.score] - [event.preventDefault])
void listeners.onGainScore(Listen for {target: Tank|Shape} gaining [event.onGainScore.score] - [event.preventDefault] [listeners.remove]) {innerBlock}
number event.onGainScore.score(Score) [localEvents.onGainScore | listeners.onGainScore]
start localEvents.onLevelUp(When leveling up - [event.onLevelUp.previousLevel] [event.onLevelUp.newLevel] [event.preventDefault])
void listeners.onLevelUp(Listen for {target: Tank} leveling up - [event.onLevelUp.previousLevel] [event.onLevelUp.newLevel] [event.preventDefault] [listeners.remove]) {innerBlock}
number event.onLevelUp.previousLevel(Prev. level) [localEvents.onLevelUp | listeners.onLevelUp]
number event.onLevelUp.newLevel(New level) [localEvents.onLevelUp | listeners.onLevelUp]

// player join and leave
start globalEvents.onPlayerJoin(When [event.onPlayerJoin.player] joins)
void listeners.onPlayerJoin(Listen for [event.onPlayerJoin.player] joining - [listeners.remove]) {innerBlock}
start globalEvents.onPlayerLeave(When [event.onPlayerJoin.player] leaves)
void listeners.onPlayerLeave(Listen for {player: Player} leaving - [listeners.remove]) {innerBlock}
Player event.onPlayerJoin.player(Player) [globalEvents.onPlayerJoin | listeners.onPlayerJoin | globalEvents.onPlayerLeave]

// barrel
start localEvents.onFireAttempt(When trying to fire - [event.preventDefault])
void listeners.onFireAttempt(Listen for {barrel: Barrel} trying to fire - [event.preventDefault] [listeners.remove])
start localEvents.onFire(When firing [event.onFire.bullet])
void listeners.onFire(Listen for {barrel: Barrel} firing [event.onFire.bullet] - [listeners.remove])
Bullet event.onFire.bullet(Bullet) [localEvents.onFire | listeners.onFire]

// general things

void listeners.remove(Stop listening)
void event.preventDefault(Block event)

Player event.player(Player) [\
  globalEvents.onChat | \
  globalEvents.onPlayerSpawnAttempt | \
  globalEvents.onPlayerDeath | \
  globalEvents.onPlayerSpawn \
]

Tank event.tank(Tank) [\
  listeners.onPlayerDeath | \
  globalEvents.onPlayerDeath | \
  globalEvents.onPlayerSpawn | \
  listeners.onPlayerSpawn \
]

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.events));

export const eventTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));

eventTriggers["globalEvents.onSpawn"] = {
  key: "globalEvents.onSpawn",
  type: "action",
  color: TriggerCategoryColors.events,
  isEntryPoint: true,
  getDynamicInfo: (trigger, setup, referencedTrigger, functionArgKey) => ({
    textItems: [
      {type: "text", text: "When"},
      {type: "dropdown", dropdownKey: "entityType"},
      {type: "text", text: "spawns"},
      {type: "seperator"},
      {type: "heldTrigger", triggerKey: "event.onSpawn.entity"},
      {type: "heldTrigger", triggerKey: "event.preventDefault"}
    ],
    dropdowns: {
      "entityType": {
        key: "entityType",
        defaultValue: "entity",
        options: Object.keys(triggerValueTypes).filter(typeKey => doesTypeExtend(typeKey as TriggerValueTypeKeys, "Entity")).map(typeKey => ({
          isPriority: false,
          key: typeKey,
          name: triggerValueTypes[typeKey as TriggerValueTypeKeys].name,
        }))
      }
    }
  }),
}

eventTriggers["listeners.onSpawn"] = {
  key: "listeners.onSpawn",
  type: "action",
  color: TriggerCategoryColors.events,
  getDynamicInfo: (trigger, setup, referencedTrigger, functionArgKey) => ({
    textItems: [
      {type: "text", text: "Listen for"},
      {type: "dropdown", dropdownKey: "entityType"},
      {type: "text", text: "spawning"},
      {type: "seperator"},
      {type: "heldTrigger", triggerKey: "event.onSpawn.entity"},
      {type: "heldTrigger", triggerKey: "event.preventDefault"},
      {type: "heldTrigger", triggerKey: "listeners.remove"}
    ],
    insetPaths: {
      "innerBlock": {
        key: "innerBlock",
        label: null
      }
    },
    dropdowns: {
      "entityType": {
        key: "entityType",
        defaultValue: "entity",
        options: Object.keys(triggerValueTypes).filter(typeKey => doesTypeExtend(typeKey as TriggerValueTypeKeys, "Entity")).map(typeKey => ({
          isPriority: false,
          key: typeKey,
          name: triggerValueTypes[typeKey as TriggerValueTypeKeys].name,
        }))
      }
    }
  }),
}
eventTriggers["event.onSpawn.entity"] = {
  key: "event.onSpawn.entity",
  type: "value",
  color: TriggerCategoryColors.events,
  neededReference: ["listeners.onSpawn", "globalEvents.onSpawn"],
  getDynamicInfo: (trigger, setup, referencedTrigger, functionArgKey) => {
    return {
      textItems: [{type: "text", text: triggerValueTypes[(referencedTrigger?.dropdowns["entityType"] ?? "") as TriggerValueTypeKeys]?.name ?? "Entity"}]
    }
  },
  returnType: (trigger, setup, referencedTrigger, functionArgKey) => {
    if (referencedTrigger == null) return [];
    const type = referencedTrigger.dropdowns["entityType"];
    if (type == null || triggerValueTypes[type as TriggerValueTypeKeys] == null) return []
    return [{type: type as any}]
  },
}



for (let key of ["listeners.onKeyDown", "listeners.onKeyUp"]) {
  const trigger = eventTriggers[key];
  const dynamicInfo = trigger.getDynamicInfo();
  dynamicInfo.dropdowns = {
    keybind: {
      defaultValue: "fire",
      key: "keybind",
      options: [
        {key: "fire", name: "Fire", isPriority: false},
        {key: "secondaryFire", name: "Secondary fire", isPriority: false},
        {key: "spawn", name: "Spawn", isPriority: false},
        {key: "aiOverride", name: "Toggle ai override", isPriority: false},
        {key: "toggleAllowSpectators", name: "Toggle allow spectators", isPriority: false},
        {key: "customKeybind1", name: "Custom keybind 1", isPriority: false},
        {key: "customKeybind2", name: "Custom keybind 2", isPriority: false},
        {key: "customKeybind3", name: "Custom keybind 3", isPriority: false},
        {key: "customKeybind4", name: "Custom keybind 4", isPriority: false},
        {key: "customKeybind5", name: "Custom keybind 5", isPriority: false},


        {key: "cheatSelfKill", name: "Cheat self destruct", isPriority: false},
        {key: "cheatLevelUp", name: "Cheat level up", isPriority: false},
        {key: "cheatChangeTank", name: "Cheat change tank", isPriority: false},
        {key: "cheatSeeWholeMap", name: "Cheat see whole map", isPriority: false},
        {key: "cheatTeleportToMouse", name: "Cheat teleport to mouse", isPriority: false},
        {key: "cheatToggleGodMode", name: "Cheat toggle god mode", isPriority: false},
        {key: "cheatChangeTeam", name: "Cheat change team", isPriority: false},
        {key: "cheatGetExtraStatPoints", name: "Cheat get extra stat points", isPriority: false},
        {key: "cheatToggleCollisions", name: "Cheat toggle collisions", isPriority: false},
        {key: "cheatResetHealthAndDrones", name: "Cheat reset health and drones", isPriority: false},
        {key: "cheatPlaceWall", name: "Cheat place wall", isPriority: false},
        {key: "cheatRemoveWall", name: "Cheat remove wall", isPriority: false},
        {key: "cheatGivePowerup", name: "Cheat give powerup", isPriority: false},
        {key: "cheatGrabObject", name: "Cheat grab object", isPriority: false},
      ]
    }
  }
  dynamicInfo.textItems.map(item => item.type == "heldTrigger" && item.triggerKey == "temp" ? {
    type: "dropdown",
    dropdownKey: "keybind"
  } : item)
  trigger.getDynamicInfo = () => dynamicInfo
}

eventTriggers["listeners.remove"].neededReference = Object.values(eventTriggers).filter(def => def.getDynamicInfo().textItems.some(item => item.type == "heldTrigger" && item.triggerKey == "listeners.remove")).map(def => def.key)
eventTriggers["event.preventDefault"].neededReference = Object.values(eventTriggers).filter(def => def.getDynamicInfo().textItems.some(item => item.type == "heldTrigger" && item.triggerKey == "event.preventDefault")).map(def => def.key)
