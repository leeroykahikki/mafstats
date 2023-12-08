class TourStats {
  getToursList(toursNode) {
    const toursList = [];

    for (let i = 0; i < toursNode[0].childNodes.length; i++) {
      toursList.push(this.getTourInfo(toursNode[0].childNodes[i]));
    }

    return toursList;
  }

  getTourInfo(tour) {
    const tourInfo = {
      name: tour.childNodes[0].textContent,
      games: [],
    };

    for (let i = 0; i < tour.childNodes[1].children.length; i++) {
      tourInfo.games.push(this.getGame(tour.childNodes[1].childNodes[i].childNodes[0]));
    }

    return tourInfo;
  }

  getGame(game) {
    const tableNumber =
      game.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].textContent.split(
        ', ',
      )[0];
    const referee =
      game.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].textContent.split(
        ', ',
      )[1];
    const teamWin = game.childNodes[0].childNodes[1].childNodes[0].textContent;
    const playersInfo = this.getPlayersInfo(game.childNodes[1], teamWin);

    const gameInfo = {
      tableNumber: tableNumber,
      referee: referee,
      teamWin: teamWin,
      playersInfo: playersInfo,
    };

    return gameInfo;
  }

  getPlayersInfo(table, teamWin) {
    const playersInfo = [];

    for (let i = 0; i < table.childNodes.length; i++) {
      const slotNumber = Number(table.childNodes[i].childNodes[0].textContent);
      const nickname = table.childNodes[i].childNodes[1].childNodes[0].textContent;
      const role = table.childNodes[i].childNodes[2].textContent;
      const pointsSum = Number(table.childNodes[i].childNodes[3].textContent);
      const pointsExtra = this.extraPointsScoring(teamWin, role, pointsSum);

      const player = {
        slotNumber: slotNumber,
        nickname: nickname,
        role: role,
        pointsSum: pointsSum,
        pointsExtra: pointsExtra,
      };

      playersInfo.push(player);
    }
    return playersInfo;
  }

  // сделать систему просчёта CI
  extraPointsScoring(teamWin, role, pointsSum) {
    let extraPoints = pointsSum;

    if (role == 'Мир' || role == 'Шер') {
      if (teamWin == 'Победа мирных') {
        extraPoints -= 1;
      }
    } else {
      if (teamWin == 'Победа мафии') {
        extraPoints -= 1;
      }
    }

    return Math.round((extraPoints + Number.EPSILON) * 100) / 100;
  }
}

module.exports = new TourStats();
