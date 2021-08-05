import logger from './logger';

const {
  BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD,
} = process.env;

const headerToBase64 = (header) => {
  const b64auth = header.split(" ")[1]
  const [user, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":")

  return [user, password]
}

async function checkBasicAuth(req, res) {
  let isAuthenticated = false;
  if (!req.headers.authorization) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Protected"');
    res.statusCode = 401;
    res.end("Unauthorized");
  } else {
    const [user, password] = headerToBase64(req.headers.authorization);

    if (BASIC_AUTH_USERNAME && BASIC_AUTH_PASSWORD && user === BASIC_AUTH_USERNAME && password === BASIC_AUTH_PASSWORD) {
      isAuthenticated = true;
      logger.info(`Authentication successful: ${user}`);
    }
    else {
      res.setHeader("WWW-Authenticate", 'Basic realm="Protected"');
      res.statusCode = 401;
      logger.error(`Authentication not successful: ${user}`);
    }
  }

  return isAuthenticated;
}

export default checkBasicAuth;