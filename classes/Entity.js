class Entity {
    constructor(nom, pv, armor) {
        this.nom = nom;
        this.pv = pv;
        this.armor = armor;
    }

    giveArmor(armor) {
        this.armor += armor;
    }

    takeDamage(damage) {
        this.armor -= damage;
        if (this.armor < 0) {
            this.pv += this.armor;
            this.armor = 0;
        }
    }

    heal(amount) {
        this.pv += amount;
    }
}

export default Entity;
