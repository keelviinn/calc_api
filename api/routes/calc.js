module.exports = app => {
  const controller = require('../controllers/calc')();

  app.route('/api/calc')
    .get(controller.listCalc)
    .post(controller.saveCalc);
}