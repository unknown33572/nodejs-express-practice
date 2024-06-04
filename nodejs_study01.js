const {sequelize} = require('./models/index');

const driver = () => {
  sequelize.sync().then(() => {
    console.log('DB 연결 성공');
  }).catch((err) => {
    console.error('DB 연결 실패', err);
  });
};

driver();