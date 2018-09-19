const env = process.env;

module.exports = {
  host: env.HOST,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  wxSecret: env.WX_SECRET,
  wxAppid: env.WX_APPID,
}