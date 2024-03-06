import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host:'localhost',
    port:5432,
    database:'onebitflix_dev',
    username: 'onebitflix',
    password: 'onebitflix',
    define:{
        underscored:true
    }
})