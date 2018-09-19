'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'goods',
    [
      Object.assign({id: 1, name: '商品1-1', shop_id: 1, thumb_url: '1.png'}, timestamps),
      Object.assign({id: 2, name: '商品1-2', shop_id: 1, thumb_url: '2.png'}, timestamps),
      Object.assign({id: 3, name: '商品1-3', shop_id: 1, thumb_url: '3.png'}, timestamps),
      Object.assign({id: 4, name: '商品1-4', shop_id: 1, thumb_url: '4.png'}, timestamps),
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    return queryInterface.bulkDelete('goods', { id: { [Op.in]: [1, 2, 3, 4] } }, {});
  },
};

