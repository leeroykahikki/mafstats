const ApiError = require('../error/ApiError');
const getPageDOM = require('../utils/getPageDOM');
const tourStats = require('../utils/tourStats');

class StatsController {
  async getTournamentPlayers(req, res, next) {
    const { tournamentId } = req.body;
    const dom = await getPageDOM(`tournament/${tournamentId}`);

    try {
      const playersTableNode = dom.window.document.querySelectorAll(
        "div[class^='TableTournamentResult_tournaments-table-result__']",
      );

      const playersListNode = playersTableNode[0].childNodes[0].childNodes[1];
      const playersList = [];

      for (let i = 0; i < playersListNode.childNodes.length; i++) {
        const player = {
          place: Number(playersListNode.childNodes[i].childNodes[0].textContent),
          nickname: playersListNode.childNodes[i].childNodes[1].textContent,
          points: Number(playersListNode.childNodes[i].childNodes[2].textContent),
          extraAll: Number(playersListNode.childNodes[i].childNodes[3].textContent),
          extraSum: Number(playersListNode.childNodes[i].childNodes[4].textContent),
          extraPlus: Number(playersListNode.childNodes[i].childNodes[5].textContent),
          extraMinus: Number(playersListNode.childNodes[i].childNodes[6].textContent),
          ci: Number(playersListNode.childNodes[i].childNodes[7].textContent),
          wins: Number(playersListNode.childNodes[i].childNodes[8].textContent),
          winsDon: Number(playersListNode.childNodes[i].childNodes[9].textContent),
          winsSherriff: Number(playersListNode.childNodes[i].childNodes[10].textContent),
          deaths: Number(playersListNode.childNodes[i].childNodes[11].textContent),
          pointsGG: Number(playersListNode.childNodes[i].childNodes[12].textContent),
          extraRed: 0,
          extraSheriff: 0,
          extraMafia: 0,
          extraDon: 0,
        };

        playersList.push(player);
      }

      return res.json(playersList);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getToursInfo(req, res, next) {
    const { tournamentId } = req.body;
    const dom = await getPageDOM(`tournament/${tournamentId}?tab=games`);

    try {
      const toursNode = dom.window.document.querySelectorAll(
        "div[class^='_tid__tournament__games__']",
      );

      const toursList = tourStats.getToursList(toursNode);

      return res.json(toursList);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new StatsController();
