import Entity from "./Entity.js";

class Enemy extends Entity {
    maxDamage;
    minDamage;
    maxPV;

    constructor(nom, pv, armor, maxDamage = 10, minDamage = 1) {
        super(nom, pv, armor);
        this.maxDamage = maxDamage;
        this.minDamage = minDamage;
    }

    attack(target) {
        const damage = Math.floor(
            Math.random() * (this.maxDamage - this.minDamage) + this.minDamage
        );
        target.takeDamage(damage);
    }

    play(target) {
        const types = ["attack", "attack", "attack", "attack", "heal"];
        const type = types[Math.floor(Math.random() * types.length)];
        if (type === "attack") {
            this.attack(target);
        } else {
            this.heal(10);
        }
    }
}

export const createRandomEnemy = (floor) => {
    const names = ["Goblin", "Orc", "Troll", "Gobelin", "Orc", "Troll"];
    const maxDamage = Math.floor(Math.random() * floor) * 10;
    const minDamage = 5;
    const pv = Math.floor(Math.random() * floor) * 10;
    const armor = Math.floor(Math.random() * floor) * 5;
    const name = names[Math.floor(Math.random() * names.length)];
    const enemy = new Enemy(name, pv, armor, maxDamage, minDamage);
    return enemy;
};

export default Enemy;
