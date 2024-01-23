class Card {
    level = 1;
    constructor(cost, type, force) {
        this.manaCost = cost; // Coût en mana
        this.type = type; // "block", "frappe", "heal"
        this.strength = force; // Valeur de l'effet
        this.id = crypto.randomUUID();
    }

    use(from, to) {
        switch (this.type) {
            case "block":
                from.giveArmor(this.strength);
                break;
            case "frappe":
                to.takeDamage(this.strength);
                break;
            case "heal":
                from.heal(this.strength);
                break;
        }
    }
    upgrade() {
        this.strength = Math.ceil(this.strength * 1.1);
        this.level++;
        this.manaCost += 1;
    }
    get name() {
        if (this.level <= blockCards.length) return blockCards[this.level - 1];
        return `${this.name}${numericQuantity(this.level, {
            romanNumerals: true,
        })}`;
    }
}

export default Card;

export const createRandomCard = (floor = 1) => {
    const types = ["block", "frappe", "heal"];

    const index = Math.floor(Math.random() * (5 * floor) + 2) || 1;

    const type = types[Math.floor(Math.random() * types.length)];

    const card = new Card(
        Math.floor(Math.random() * index + index / 2), // cout
        type, // type
        Math.floor(Math.random() * index + index / 2) || 1 // force
    );
    return card;
};

const statByType = {
    block: {
        cost: 2,
        strength: 5,
    },
    frappe: {
        cost: 3,
        strength: 5,
    },

    heal: {
        cost: 4,
        strength: 5,
    },
};

const blockCards = [
    "Carapace",
    "Bouclar",
    "Bouclier",
    "Bouclier de fer",
    "Bouclier de diamant",
    "Bouclier de platine",
    "Bouclier Hylien",
];

const frappeCards = [
    "Mandale",
    "Coup de boule",
    "Fine lame",
    "Grosse massue",
    "Boulet de canon",
    "Master sword",
];

const healCards = [
    "Soin",
    "Bandage",
    "Potion",
    "Sang de licorne",
    "Elixir de vie",
    "Tonneau d'immortalité",
    "Saint Graal",
    "Hey Listen !",
];
