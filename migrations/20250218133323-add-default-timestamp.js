'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Pastikan kolom "createdAt" dan "updatedAt" memiliki nilai default
    await queryInterface.sequelize.query(`
      ALTER TABLE "Blogs" ALTER COLUMN "createdAt" SET DEFAULT NOW();
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "Blogs" ALTER COLUMN "updatedAt" SET DEFAULT NOW();
    `);

    // Pastikan tabel Users ada sebelum diubah
    const tableUsers = await queryInterface.sequelize.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'Users'
      ) AS "exists";
    `, { type: Sequelize.QueryTypes.SELECT });

    if (tableUsers[0].exists) {
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT NOW();
      `);
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users" ALTER COLUMN "updatedAt" SET DEFAULT NOW();
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    // Mengembalikan ke kondisi sebelumnya
    await queryInterface.sequelize.query(`
      ALTER TABLE "Blogs" ALTER COLUMN "createdAt" DROP DEFAULT;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "Blogs" ALTER COLUMN "updatedAt" DROP DEFAULT;
    `);

    const tableUsers = await queryInterface.sequelize.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'Users'
      ) AS "exists";
    `, { type: Sequelize.QueryTypes.SELECT });

    if (tableUsers[0].exists) {
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users" ALTER COLUMN "createdAt" DROP DEFAULT;
      `);
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users" ALTER COLUMN "updatedAt" DROP DEFAULT;
      `);
    }
  }
};
