class Entity {
    maxHealth = 100;
    _name;

    get name() {
        return this._name;
    }

    constructor(name, health, armor) {
        this._name = name;
        this.health = health;
        this.armor = armor;
    }

    giveArmor(armor) {
        console.log(this.name, "gagne", armor, "💠");
        this.armor += armor;
    }

    takeDamage(damage) {
        console.log(this.name, "pert", damage, "💚");
        this.armor -= damage;
        if (this.armor < 0) {
            this.health += this.armor;
            this.armor = 0;
        }
    }

    heal(amount) {
        console.log(`${this.name} se soigne de ${amount} 💚`);
        this.health += amount;

        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }
}

export default Entity;
