const assessGameData = (player, ennemy) => {
    if (ennemy.health <= 0) {
        return "win";
    } else if (player.health <= 0) {
        return "lose";
    }
    return "continue";
};

export default assessGameData;
