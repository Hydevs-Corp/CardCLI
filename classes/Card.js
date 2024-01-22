class Card {
    constructor(name, cost, type, force) {
        this.name = name;
        this.cost = cost; // Coût en mana
        this.type = type; // "block", "frappe", "heal"
        this.force = force; // Valeur de l'effet
        this.id = crypto.randomUUID();
    }

    use(from, to) {
        switch (this.type) {
            case "block":
                from.giveArmor(this.force);
                break;
            case "frappe":
                to.takeDamage(this.force);
                break;
            case "heal":
                from.heal(this.force);
                break;
        }
    }
}

export default Card;

export const createRandomCard = () => {
    const types = ["block", "frappe", "heal"];
    const funkyNames = [
        "Carte de la mort",
        "Carte de la vie",
        "Carte de la joie",
        "Carte de la tristesse",
        "Carte de la colère",
        "Carte de la peur",
        "Carte de la surprise",
        "Carte de la honte",
        "Carte de la fierté",
        "Carte de la timidité",
        "Carte de la détermination",
        "Carte de la déception",
        "Carte de la confiance",
        "Carte de la méfiance",
    ];

    const card = new Card(
        funkyNames[Math.floor(Math.random() * funkyNames.length)],
        Math.floor(Math.random() * 10),
        types[Math.floor(Math.random() * types.length)],
        Math.floor(Math.random() * 10)
    );
    return card;
};
