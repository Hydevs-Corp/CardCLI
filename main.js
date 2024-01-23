import chalk from "chalk";
import inquirer from "inquirer";
import { createRandomEnemy } from "./classes/Enemy.js";
import Joueur from "./classes/Joueur.js";
import assessGameData from "./func/assessGameData.js";
import printInformation from "./printInformation.js";

const game = async () => {
    let floor = 1;
    console.clear();
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Comment t'appelles tu ?",
        },
    ]);

    const PlayerOne = new Joueur(name, 100, 0, 20);

    let EnemyOne = createRandomEnemy(floor);

    while (true) {
        const outcome = await fightEnemy(PlayerOne, EnemyOne, floor);
        console.clear();
        if (outcome === "lose") {
            printInformation(PlayerOne, EnemyOne, floor);
            break;
        }

        PlayerOne.resethand();
        floor++;
        console.clear();

        console.log(chalk.green("Vous avez gagné !"));
        console.log(chalk.red(EnemyOne.name), "est mort ⚰️");

        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: `Que voulez-vous faire ? \n ${chalk.yellow(
                    "[!] Attention, vous ne pouvez pas revenir en arrière"
                )}`,
                choices: [
                    {
                        name: "Améliorer une carte",
                        value: "upgrade",
                    },
                    {
                        name: "Ajouter une carte",
                        value: "add",
                    },
                    {
                        name: "Supprimer une carte",
                        value: "delete",
                    },
                    {
                        name: "Augmenter le mana max",
                        value: "manaMax",
                    },
                ],
            },
        ]);

        switch (action) {
            case "upgrade":
                await PlayerOne.initUpgrade();
                break;
            case "add":
                await PlayerOne.initAdd();
                break;
            case "delete":
                await PlayerOne.initDelete();
                break;
            case "manaMax":
                PlayerOne.maxMana++;
                PlayerOne.mana = PlayerOne.maxMana;
                break;
        }
        if (floor % 10 === 0) PlayerOne.upgradeAll();

        EnemyOne = createRandomEnemy(floor);
    }
};

const fightEnemy = async (player, enemy, floor) => {
    player.drawMultiple(5);
    while (player.health > 0 && enemy.health > 0) {
        printInformation(player, enemy, floor);
        const { action } =
            player.hand.length > 0
                ? await inquirer.prompt([
                      {
                          type: "list",
                          name: "action",
                          message: "What do you want to do?",
                          choices: [
                              {
                                  name: "Passer mon tour",
                                  value: "pass",
                              },
                              ...player.hand.map((card) => ({
                                  name: `[${card.manaCost} 💧] ${card.type} : ${card.strength}`,
                                  value: card.id,
                              })),
                          ],
                      },
                  ])
                : { action: "pass" };

        console.clear();

        if (action !== "pass") player.useCard(action, enemy);

        const outcome = assessGameData(player, enemy);
        if (outcome !== "continue") return outcome;

        if (action === "pass") {
            player.discardHand();
            enemy.play(player);
            const outcome = assessGameData(player, enemy);
            if (outcome !== "continue") return outcome;
        }
    }
};

game();

// npm i table
