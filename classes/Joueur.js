import { createRandomCard } from "./Card.js";
import Entity from "./Entity.js";

class Joueur extends Entity {
    deck = [];
    hand = [];
    cemetary = [];

    constructor(nom, pv, armor) {
        super(nom, pv, armor);
        for (let i = 0; i < 10; i++) {
            this.deck.push(createRandomCard());
        }
    }

    lootCard(card) {
        this.deck.push(card);
        return this.deck;
    }

    shuffle() {
        const shuffledDeck = [];
        while (this.deck.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.deck.length);
            shuffledDeck.push(this.deck[randomIndex]);
            this.deck.splice(randomIndex, 1);
        }
        this.deck = shuffledDeck;
    }

    pick() {
        if (deck.length === 0) {
            this.deck.push(...this.cemetary);
            this.shuffle();
            this.cemetary = [];
        }

        const pickedCard = this.deck.pop();
        this.hand.push(pickedCard);
    }

    pickMultiple(amount) {
        for (let i = 0; i < amount; i++) {
            this.pick();
        }
    }

    useCard(usedCard, target) {
        let exists = false;
        // Vérifie que la carte est dans le deck
        // Pour chaques cartes du deck :
        this.hand.forEach((card) => {
            // Si l'id de la carte est différent de l'id de la carte utilisée, on passe à la suivante
            if (card.id === usedCard.id) exists = true;
        });
        // Si la carte n'existe pas dans le deck, on arrête la fonction
        if (exists === false) {
            console.log("l'existe po ta carte");
            return;
        }
        // Utilise la carte
        usedCard.use(this, target);
        // Retire la carte du deck
        this.hand.filter((card) => card.id == !usedCard.id);
        // Mette la carte dans le cimetière
        this.cemetary.push(usedCard);
        // Tada, c'est fini
        console.log("la carte est jouee tout est ok Michel");
    }
}

export default Joueur;
