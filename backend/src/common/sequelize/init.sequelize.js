import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../constant/app.constant";

const sequelize = new Sequelize(DATABASE_URL, { logging: true })

try {
    await sequelize.authenticate();
    console.log('SEQUELIZE: \t Connection successfully.');
} catch (error) {
    console.error('SEQUELIZE: \t Connection Error', error);
}

export default sequelize