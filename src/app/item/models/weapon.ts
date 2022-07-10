import { WeaponBonus } from "./weaponBonus";
import { WeaponDamage } from "./weaponDamage";
import { WeaponDamageReduction } from "./weaponDamageReduction";
import { WeaponRequirements } from "./weaponRequirements";

export class Weapon {
    bonus: WeaponBonus = new WeaponBonus();
    damage: WeaponDamage = new WeaponDamage();
    damageReduction: WeaponDamageReduction = new WeaponDamageReduction();
    description: string = '';
    durability: number = 0;
    id: number = 0;
    name: string = '';
    requirements: WeaponRequirements = new WeaponRequirements();
    stability: number = 0;
    subtype: string = '';
    type: string = '';
    weight: number = 0;
}
