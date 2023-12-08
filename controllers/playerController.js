const ApiError = require('../error/ApiError');
const getPageDOM = require('../utils/getPageDOM');

class PlayerController {
  async getPlayerNickname(req, res, next) {
    const { playerId } = req.body;
    const dom = await getPageDOM(`stats/${playerId}`);

    try {
      const nickname = dom.window.document.querySelectorAll(
        "div[class^='ProfileUserInfo_profile-user__name__']",
      )[0].textContent;

      return res.json({ nickname });
    } catch (e) {
      console.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PlayerController();
