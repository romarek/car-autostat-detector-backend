module.exports = {
    HOST: "localhost",
    USER: "wnz",
    PASSWORD: "1234",
    DB: "car_autostat_prod",
    port: "5432",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    } 
}