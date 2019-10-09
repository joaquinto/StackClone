import { verifyToken, formatJwtErrorMessage } from '../helpers/jwt';
import { respondWithWarning } from '../helpers/responseHandler';

const authenticateUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    return respondWithWarning(res, 401, 'No token provided');
  }
  try {
    const { key } = verifyToken(token);
    req.auth = key;
    return next();
  } catch (error) {
    return respondWithWarning(res, 401, formatJwtErrorMessage(error.message));
  }
};

export default authenticateUserToken;
