import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

number game.tickNumber(Tick number)
number game.secondsSinceGameStart(Seconds since lobby start)
number game.epochTime(Epoch timestamp)


// bullets
void spawning.bullet(Spawn bullet with definition {definition: BulletDef} at {position: vector = (0,0)}, scale {scale: number = 1} and angle {angle: number = 0} owned by {owner: ControllingEntity} on team {team: number} - [spawning.bullet.entity])
Bullet spawning.bullet.entity(Bullet) [spawning.bullet]

// shape
void spawning.shape(Spawn shape with def {definition: ShapeDef} at {position: vector = (0,0)} - [spawning.shape.entity])
Shape spawning.shape.entity(Shape) [spawning.shape]

// custom object entity
void spawning.customObjectEntity(Spawn custom object entity with definition {definition: AdvancedObjectDef} at {position: vector = (0,0)}, scale {scale: number = 0} and angle {angle: number = 0} on team {team: number} - [spawning.customObjectEntity.entity])
CustomObjectEntity spawning.customObjectEntity.entity(Entity) [spawning.customObjectEntity]

// tank
void spawning.tank(Spawn tank with definition {definition: TankDef} at {position: vector = (0,0)} on team {teamID: number = 0} owned by {owner: Player} - [spawning.tank.entity])
BotTank spawning.tank.entity(Tank) [spawning.tank]
void spawning.botTank(Spawn bot at {position: vector = (0,0)} on team {teamID: number} - [spawning.botTank.entity])
void spawning.botTankWithDef(Spawn bot with def {def: TankDef} and build {build: array<number>} at {position: vector = (0,0)} on team {teamID: number} - [spawning.botTank.entity])
void spawning.botTankWithTarget(Spawn bot targetting def {def: TankDef} at {position: vector = (0,0)} on team {teamID: number} - [spawning.botTank.entity])
BotTank spawning.botTank.entity(Bot) [spawning.botTank | spawning.botTankWithDef | spawning.botTankWithTarget]

// boss
void spawning.arenaCloser(Spawn arena closer with definition {definition: BossDef} at {position: vector = (0,0)} - [spawning.arenaCloser.entity])
Boss spawning.arenaCloser.entity(Arena closer) [spawning.arenaCloser]
void spawning.arenaBoss(Spawn arena boss with definition {definition: BossDef} at {position: vector = (0,0)} - [spawning.arenaBoss.entity])
Boss spawning.arenaBoss.entity(Boss) [spawning.arenaBoss]
void spawning.customBoss(Spawn custom boss with definition {definition: BossDef} at {position: vector = (0,0)} - [spawning.customBoss.entity])
Boss spawning.customBoss.entity(Boss) [spawning.customBoss]

// area entities
void spawning.mazeWall(Spawn maze wall at [temp] {position: vector = (0,0)} with dimensions {dimensions: vector = (0,0)} - [spawning.mazeWall.entity])
MazeWall spawning.mazeWall.entity(Wall) [spawning.mazeWall]
void spawning.teamBase(Spawn team base at [temp] {position: vector = (0,0)} with dimensions {dimensions: vector = (0,0)} on team {teamID: number} - [spawning.teamBase.entity])
TeamBase spawning.teamBase.entity(Base) [spawning.teamBase]
void spawning.customAreaEntity(Spawn custom area entity at [temp] {position: vector = (0,0)} with dimensions {dimensions: vector = (0,0)} on team {teamID: number} - [spawning.customAreaEntity.entity])
CustomAreaEntity spawning.customAreaEntity.entity(Entity) [spawning.customAreaEntity]


`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.events));



export const spawningTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));

for (let key of ["spawning.mazeWall", "spawning.teamBase"]) {
  const trigger = spawningTriggers[key];
  const dynamicInfo = trigger.getDynamicInfo();
  dynamicInfo.dropdowns = {
    isRelative: {
      defaultValue: "absolute",
      key: "isRelative",
      options: [
        {key: "absolute", name: "Absolute position", isPriority: true},
        {key: "relative", name: "Relative position", isPriority: true},
      ]
    }
  }
  dynamicInfo.textItems.map(item => item.type == "heldTrigger" && item.triggerKey == "temp" ? {
    type: "dropdown",
    dropdownKey: "isRelative"
  } : item)
  trigger.getDynamicInfo = () => dynamicInfo
}