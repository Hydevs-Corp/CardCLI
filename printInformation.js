import chalk from "chalk";
import { table } from "table";
const printInformation = (player, ennemy, floor) => {
    const toPrint = [
        [
            `${assessDifficulty(floor)} Étage : ${floor}`,
            chalk.cyan(player.name),
            chalk.redBright(ennemy.name),
        ],
        [
            chalk.green("Point de vie"),
            chalk.green(player.health),
            chalk.green(ennemy.health),
        ],
        [
            chalk.gray("Points d'armure"),
            chalk.gray(player.armor),
            chalk.gray(ennemy.armor),
        ],
        ["", "", ""],
        [
            `Main : ${player.hand.length}`,
            `Deck : ${player.deck.length}`,
            `Cimetière : ${player.cemetary.length}`,
        ],
        // ["Points de mana", player.mana, "N/A"],
    ];
    console.log("\n");
    console.log(table(toPrint));
    console.log("mana:", player.mana, "💧\n");
};

const assessDifficulty = (floor) => {
    switch (true) {
        case floor < 5:
            return "⚪";
        case floor > 5 && floor < 10:
            return "🟣";
        case floor > 10 && floor < 15:
            return "🔵";
        case floor > 15 && floor < 20:
            return "🟢";
        case floor > 20 && floor < 25:
            return "🟡";
        case floor > 25 && floor < 30:
            return "🟠";
        case floor > 30 && floor < 35:
            return "🔴";
        case floor > 35 && floor < 40:
            return "🟤";
        case floor > 40 && floor < 45:
            return "⚫";
    }
};

// return "⚪";
// return "🟣";
// return "💧";
// return "🟢";
// return "🟡";
// return "🟠";
// return "🔴";
// return "🟤";
// return "⚫";

export default printInformation;
