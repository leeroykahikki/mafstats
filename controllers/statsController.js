const ApiError = require('../error/ApiError');
const getPageDOM = require('../utils/getPageDOM');
const tourStats = require('../utils/tourStats');
const { getBlackExtraPoints } = require('../utils/getExtraPoints');

class StatsController {
  async getTournamentPlayers(req, res, next) {
    const { tournamentId } = req.body;

    try {
      const dom = await getPageDOM(`tournament/${tournamentId}`);

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

      const tournamentNameNode = dom.window.document.querySelectorAll(
        "div[class^='_tid__tournament__top-left-title__']",
      );

      return res.json({
        tournamentInfo: {
          title: tournamentNameNode[0].textContent,
        },
        playersList,
      });
    } catch (e) {
      console.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getToursInfo(req, res, next) {
    const { tournamentId } = req.body;

    try {
      const dom = await getPageDOM(`tournament/${tournamentId}?tab=games`);

      const toursNode = dom.window.document.querySelectorAll(
        "div[class^='_tid__tournament__games__']",
      );
      const toursList = tourStats.getToursList(toursNode);

      const tournamentNameNode = dom.window.document.querySelectorAll(
        "div[class^='_tid__tournament__top-left-title__']",
      );

      return res.json({
        tournamentInfo: {
          title: tournamentNameNode[0].textContent,
        },
        toursList,
      });
    } catch (e) {
      console.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getTournamentsList(req, res, next) {
    try {
      const dom = await getPageDOM('tournaments?time=30_days&fsm=yes');
      // const dom = await getPageDOM('tournaments?time=finished&fsm=yes');

      const toursNode = dom.window.document.querySelectorAll(
        "div[class^='TableTournament_tournament-table__']",
      );

      const tournamentsListElems = toursNode[0].getElementsByTagName('tbody')[0].children;
      const tournamentsList = [];
      let title = '';

      for (let i = 0; i < tournamentsListElems.length; i++) {
        if (
          tournamentsListElems[i].children[1].children[0].children[0].children[0].children
            .length === 3
        ) {
          title =
            tournamentsListElems[i].children[1].children[0].children[0].children[0].children[2]
              .textContent;
        } else {
          title =
            tournamentsListElems[i].children[1].children[0].children[0].children[0].children[1]
              .textContent;
        }

        const id = tournamentsListElems[i].children[1].children[0].children[0].href.split('/')[2];

        const dateStart = tournamentsListElems[i].children[2].children[0].children[0].textContent;
        const dateEnd = tournamentsListElems[i].children[2].children[0].children[2].textContent;

        const date = {
          dateStart,
          dateEnd,
        };

        const tournament = {
          title,
          id,
          date,
        };

        tournamentsList.push(tournament);
      }

      return res.json(tournamentsList);
    } catch (e) {
      console.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getExtraPointsList(req, res, next) {
    const { tournamentId } = req.body;
    const { role } = req.body;

    try {
      if (role !== 'Маф' && role !== 'Дон' && role !== 'Мир' && role !== 'Шер')
        throw new Error('Role incorrect');

      const dom = await getPageDOM(`tournament/${tournamentId}?tab=games`);
      const toursNode = dom.window.document.querySelectorAll(
        "div[class^='_tid__tournament__games__']",
      );

      let playersList;
      if (role === 'Маф' || role === 'Дон') playersList = getBlackExtraPoints(toursNode, role);

      const tournamentNameNode = dom.window.document.querySelectorAll(
        "div[class^='_tid__tournament__top-left-title__']",
      );

      return res.json({
        tournamentInfo: {
          title: tournamentNameNode[0].textContent,
        },
        playersList,
      });
    } catch (e) {
      console.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getTournamentInfo(req, res, next) {
    const { tournamentId } = req.body;

    try {
      const dom = await getPageDOM(`tournament/${tournamentId}`);
      const title = dom.window.document.querySelectorAll(
        "div[class^='_tid__tournament__top-left-title__']",
      )[0].textContent;

      return res.json({
        title: title,
        id: tournamentId,
      });
    } catch (e) {
      console.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new StatsController();
