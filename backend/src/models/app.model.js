import sequelize from "../common/sequelize/init.sequelize";
import initModels from "./sequelize-auto/init-models";

const models = initModels(sequelize)

export default models