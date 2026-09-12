import { doesTypeExtend } from "../../LiveTriggers/Helpers/DoesTypeExtend";
import { TriggerCategoryColors } from "../TriggerCategories";
import { TriggerDef } from "../TriggerDef";
import { parseTriggerDefFromString } from "../TriggerDefParser";
import { TriggerValueTypeKeys, triggerValueTypes } from "../TriggerValueTypes";


const triggers = `

vector entity.getPosition({entity: Entity}'s position)
void entity.setPosition(Set {entity: Entity}'s position to {position: vector = (0,0)})
void entity.addPosition(Move {entity: Entity}'s position by {position: vector = (0,0)})
number entity.getRotation({entity: Entity}'s angle)
void entity.setRotation(Set {entity: Entity}'s angle to {angle: vector = 0})
number entity.getScale({entity: Entity}'s scale)
void entity.setScale(Set {entity: Entity}'s scale to {scale: number = 1})
vector entity.getVelocity({entity: Entity}'s velocity)
void entity.setVelocity(Set {entity: Entity}'s velocity to {velocity: vector = (0,0)})
void entity.addVelocity(Increase {entity: Entity}'s velocity by {velocity: vector = (0,0)})
void entity.maintainVelocity(Add velocity to {entity: Entity} to maintain it at {velocity: vector = (0,0)})

boolean entity.getCanCollide(Can {entity: Entity} collide)
void entity.setCanCollide(Set can {entity: Entity} collide to {canCollide: boolean})
boolean entity.getCanMove(Can {entity: Entity} move)
void entity.setCanMove(Set can {entity: Entity} move to {canMove: boolean})

number entity.getKnockbackGivenFactor({entity: Entity}'s knockback given factor)
void entity.setKnockbackGivenFactor(Set {entity: Entity}'s knockback given factor to {knockbackGivenFactor: number = 1})
number entity.getKnockbackTakenFactor({entity: Entity}'s knockback taken factor)
void entity.setKnockbackTakenFactor(Set {entity: Entity}'s knockback taken factor to {knockbackTakenFactor: number = 1})
number entity.getRecoilTakenFactor({entity: Entity}'s recoil taken factor)
void entity.setRecoilTakenFactor(Set {entity: Entity}'s recoil taken factor to {recoilTakenFactor: number = 1})
number entity.getFrictionFactor({entity: Entity}'s friction factor)
void entity.setFrictionFactor(Set {entity: Entity}'s friction factor to {frictionFactor: number = 1})

number entity.getBodyDamage({entity: Entity}'s body damage per tick)
void entity.setBodyDamage(Set {entity: Entity}'s body damage per tick to {bodyDamagePerTick: number = 4})
number entity.getDamageType({entity: Entity}'s damage type)
void entity.setDamageType(Set {entity: Entity}'s damage type to {damageType: number = 0})
number entity.getHealth({entity: Entity}'s health)
void entity.setHealth(Set {entity: Entity}'s health to {health: number = 50})
number entity.getMaxHealth({entity: Entity}'s max health)
void entity.setMaxHealth(Set {entity: Entity}'s max health to {health: number = 50})
number entity.getRegenPerSecond({entity: Entity}'s relative regen per second)
void entity.setRegenPerSecond(Set {entity: Entity}'s relative regen per second to {regenPerSecond: number = 0.001})
number entity.getBoostRegenPerSecond({entity: Entity}'s boost relative regen per second)
void entity.setBoostRegenPerSecond(Set {entity: Entity}'s boost relative regen per second to {regenPerSecond: number = 0.1})
number entity.getDamageTakenFactor({entity: Entity}'s tamage taken factor)
void entity.setDamageTakenFactor(Set {entity: Entity}'s damage taken factor to {damageTakenFactor: number = 1})

number entity.id({entity: Entity}'s entity id)
number entity.generationID({entity: Entity}'s entity generation id)
number entity.deathAnimationFrame({entity: Entity}'s death animation frame)
number entity.timeSinceLastDamage(Ticks since {entity: Entity}'s last took damage)
Entity entity.lastDamagingEntity(Last entity that damaged {entity: Entity})
boolean entity.isAlive(Is {entity: Entity} alive)
number entity.getTeam({entity: Entity}'s team id)
void entity.setTeam(Set {entity: Entity}'s team id to {teamID: number = 0})

void entity.kill(Kill {entity: Entity})
void entity.killWithCredit(Kill {entity: Entity} and give credit to {killCreditEntity: Entity})
void entity.damage(Deal {damage: number} damage to {entity: Entity})
void entity.damageWithCredit(Deal {damage: number} damage to {entity: Entity} and give credit to {killCreditEntity: Entity})
void entity.heal(Heal {health: number} hp from {entity: Entity})
void entity.delete(Delete {entity: Entity})

ControllingEntity entity.getControllingEntity(Get entity controlling {entity: AliveEntity});
void entity.setControllingEntity(Set entity controlling {entity: AliveEntity} to {controllingEntity: ControllingEntity});

`.split("\n").filter(line => line.split("//")[0].trim()).map(str => parseTriggerDefFromString(str, TriggerCategoryColors.objects));

export const entityPropTriggers: Record<string, TriggerDef> = Object.fromEntries(triggers.map(trigger => [trigger.key, trigger]));
