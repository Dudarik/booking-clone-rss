import { Sequelize } from 'sequelize';

const DB_URL =
  'postgres://booking_clone_sfgi_user:PBGG9nhHCZUaO1dMsVVt9itFYwtZ7jHt@dpg-cfouq82rrk0fd9qho5tg-a.frankfurt-postgres.render.com/booking_clone_sfgi';

export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});
