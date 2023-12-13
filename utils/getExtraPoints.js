const TourStats = require('./tourStats');

// Добавить подсчёт побед при равном количестве допов
// Проблема с округлением https://gomafia.pro/tournament/452 ? возможно исправил
// коэф финала не учитывается, исправить
// Подумать о просчёте минуса за опоздание
const getBlackExtraPoints = (toursNode, reqRole) => {
  const toursList = TourStats.getToursList(toursNode);
  const playersList = {};
  toursList.forEach(({ games }) => {
    games.forEach(({ playersInfo }) => {
      playersInfo.forEach(({ nickname, role, pointsExtra }) => {
        if (playersList[nickname] === undefined) playersList[nickname] = 0;
        if (role === reqRole)
          playersList[nickname] = Math.floor((pointsExtra + playersList[nickname]) * 10) / 10;
      });
    });
  });

  const sortedPlayersList = Object.entries(playersList).sort(([, a], [, b]) => b - a);

  return sortedPlayersList;
};

module.exports = {
  getBlackExtraPoints,
};
