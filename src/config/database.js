module.exports = {
  dialect: "postgres",
  host: "127.0.0.1",
  username: "docker",
  password: "docker",
  database: "gobarber",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
