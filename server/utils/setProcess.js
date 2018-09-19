module.exports = (env) => {
  Object.keys(env).forEach( k=> {
    if(!process.env[k]) { // allow enviroment to take precedence over env.json
      process.env[k] = env[k]; // only set if not set by environment
    }
  });
}