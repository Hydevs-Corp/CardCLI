import chalk from "chalk";
import inquirer from "inquirer";
import { createRandomCard } from "./Card.js";
import Entity from "./Entity.js";

class Joueur extends Entity {
    deck = [];
    hand = [];
    cemetary = [];

    maxHealth = 100;

    get name() {
        return chalk.blue(this._name);
    }

    constructor(name, health, armor, mana) {
        super(name, health, armor);
        this.maxMana = mana;
        this.mana = mana;
        for (let i = 0; i < 20; i++) {
            this.deck.push(createRandomCard());
        }
    }

    // TODO quantite a determiner
    manaAccumulation(qty) {
        this.mana += qty;
    }

    lootCard(card) {
        this.deck.push(card);
        return this.deck;
    }

    lootMultipleCards(qty) {
        for (let i = 0; i < qty; i++) {
            this.hand.push(createRandomCard());
        }
    }

    shuffleDeck() {
        let shuffledDeck = [];
        while (this.deck.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.deck.length);
            shuffledDeck.push(this.deck[randomIndex]);
            this.deck.splice(randomIndex, 1);
        }
        this.deck = shuffledDeck;
    }

    draw() {
        if (this.deck.length === 0) {
            this.deck.push(...this.cemetary);
            this.shuffleDeck();
            this.cemetary = [];
        }

        const pickedCard = this.deck.pop();
        this.hand.push(pickedCard);
    }

    drawMultiple(amount) {
        for (let i = 0; i < amount; i++) {
            this.draw();
        }
    }

    useCard(cardId, target) {
        const currentCard = this.hand.find((card) => card.id === cardId);

        if (!currentCard) {
            console.log("l'existe po ta carte");
            return;
        }

        if (this.mana >= currentCard.manaCost) {
            //retire le cout de la carte au mana du joueur
            this.mana -= currentCard.manaCost;
            //utilise la methode use de la classe pour cibler la target
            currentCard.use(this, target);
            // Retire la carte du deck

            this.hand = this.hand.filter((card) => card.id !== currentCard.id);

            console.log(
                "Carte utilisée :",
                `\n[${card.manaCost} 💧] ${card.type} : ${card.strength}\n`
            );
            // Mette la carte dans le cimetière
            this.cemetary.push(currentCard);
            // Tada, c'est fini
        } else {
            //le joueur n'a pas assez de mana et ne peut jouer sa carte
            console.log("not enough mana ya poor");
            return;
        }
    }

    // on va discard une card by id
    discard(cardId) {
        const card = this.hand.find((card) => card.id !== cardId);
        card && this.cemetary.push(card);
    }

    // discard toutes les cards et redonne une main, on peut couper en deux methodes si vous voulez, que l'une vide et l'autre repioche
    discardHand() {
        this.cemetary.push(...this.hand);
        this.hand = [];
        this.drawMultiple(5);
        this.mana = this.maxMana;
    }

    resethand() {
        this.deck.push(...this.hand, ...this.cemetary);
        this.hand = [];
        this.cemetary = [];
        this.mana = this.maxMana;
    }
    upgradeAll() {
        this.deck.forEach((card) => card.upgrade());
        console.log("⭐ Toutes les cartes ont bien été améliorées");
    }

    async initUpgrade() {
        const { cardId } = await inquirer.prompt([
            {
                type: "list",
                name: "cardId",
                message: "Quelle carte voulez-vous améliorer ?",
                choices: this.deck.map((card) => ({
                    name: `[${card.manaCost} 💧] (${card.level}) ${card.type} : ${card.strength}`,
                    value: card.id,
                })),
            },
        ]);
        const card = this.deck.find((card) => card.id === cardId);
        if (!card) {
            console.log("Cette carte n'existe pas");
            return;
        }

        card.upgrade();

        console.log("🟩 La carte a bien été améliorée");
        console.log(`[${card.manaCost} 💧] ${card.type} : ${card.strength}`);
    }

    async initAdd(floor = 1) {
        const choices = new Array(3)
            .fill(0)
            .map((_) => createRandomCard(floor));

        const { card } = await inquirer.prompt([
            {
                type: "list",
                name: "card",
                message: "Quelle carte voulez-vous ajouter ?",
                choices: choices.map((card) => ({
                    name: `[${card.manaCost} 💧] ${card.type} : ${card.strength}`,
                    value: card,
                })),
            },
        ]);

        this.deck.push(card);
        console.log("🟩 La carte a bien été ajoutée");
        console.log(`[${card.manaCost} 💧] ${card.type} : ${card.strength}`);
    }

    async initDelete() {
        const { cardId } = await inquirer.prompt([
            {
                type: "list",
                name: "cardId",
                message: "Quelle carte voulez-vous supprimer ?",
                choices: this.deck.map((card) => ({
                    name: `[${card.manaCost} 💧] ${card.type} : ${card.strength}`,
                    value: card.id,
                })),
            },
        ]);

        let card = this.deck.find((card) => card.id === cardId);

        // delete card by id
        this.deck = this.deck.filter((card) => card.id !== cardId);

        console.clear();

        console.log(
            `🟥 La carte ([${card.manaCost} 💧] ${card.type} : ${card.strength}) a bien été supprimée`
        );
    }
}

export default Joueur;
