import chalk from "chalk";
import Entity from "./Entity.js";
class Enemy extends Entity {
    maxDamage;
    minDamage;

    get name() {
        return chalk.red(this._name);
    }

    constructor(name, health, armor, maxDamage = 10, minDamage = 1) {
        super(name, health, armor);
        this.maxDamage = maxDamage;
        this.minDamage = minDamage;
    }

    attack(target) {
        const damage = Math.floor(
            Math.random() * (this.maxDamage - this.minDamage) + this.minDamage
        );
        console.log(`${this.name} enlève ${damage} 💚 à ${target.name}`);
        target.takeDamage(damage);
    }

    play(target) {
        console.log(chalk.red(`\nC'est au tour de ${this.name} !`));

        const chances = {
            // attack: 0.7,
            block: this.health > this.maxHealth * 0.75 ? 0.1 : 0.3,
            heal: this.health > this.maxHealth * 0.5 ? 0 : 0.15,
        };

        const type = Object.keys(chances).reduce((acc, type) => {
            if (Math.random() < chances[type]) {
                return type;
            }
            return acc;
        }, "attack");

        switch (type) {
            case "attack":
                this.attack(target);
                break;
            case "block":
                this.giveArmor(10);
                break;
            case "heal":
                this.heal(10);
                break;
        }

        if (Math.random() < 0.1) {
            console.log(chalk.red(`\n🔥 ${this.name} est enragé ! 😡`));
            this.play(target);
        }
    }
}

export const createRandomEnemy = (floor = 1) => {
    const names = ["Goblin", "Orc", "Troll", "Gobelin", "Orc", "Troll"];
    const maxDamage = Math.floor((Math.random() + 1) * floor) * 10;
    const minDamage = 5;
    const health = Math.floor((Math.random() + 1) * floor) * 10;
    const armor = floor > 5 ? Math.floor((Math.random() + 1) * floor) * 5 : 0;
    const name = names[Math.floor(Math.random() * (names.length - 1))];
    const enemy = new Enemy("🧟 " + name, health, armor, maxDamage, minDamage);
    return enemy;
};

export default Enemy;
