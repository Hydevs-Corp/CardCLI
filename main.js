import inquirer from "inquirer";
import Joueur from "./classes/Joueur.js";

const game = async () => {
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
    ]);
    console.log(name);

    const PlayerOne = new Joueur(name, 100, 0);

    // console.log(PlayerOne.deck);

    const Enemy = new Joueur("Enemy", 100, 0);

    while (PlayerOne.health > 0 && Enemy.health > 0) {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "What do you want to do?",
                choices: PlayerOne.hand.map(
                    (card) => `Name : ${card.name} | Cost : ${card.cost}`
                ),
            },
        ]);
    }
};

game();
