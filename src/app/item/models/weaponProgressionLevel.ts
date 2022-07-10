import { WeaponBonus } from "./weaponBonus";
import { WeaponDamage } from "./weaponDamage";
import { WeaponDamageReduction } from "./weaponDamageReduction";

export class WeaponProgressionLevel {
    bonus: WeaponBonus = new WeaponBonus();
    damage: WeaponDamage = new WeaponDamage();
    damageReduction: WeaponDamageReduction = new WeaponDamageReduction();
    level: number = 0;
    pathLevel: number = 0;
    stability: number = 0;
}
