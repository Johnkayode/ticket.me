import { verify } from 'jsonwebtoken';
import config from '../../config';
import { logger } from '../../common';
import { APIError } from '../../common';
import { UserService } from '../users/users.service';

const userService = new UserService();

export async function validateToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    verify(token, config.jwtSecretKey, (error, decoded) => {
      if (error) return reject(error);
      return resolve(decoded);
    });
  });
}

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

export function IsAuthenticated(roles: string | string[]) {
  return async (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (token) {
      try {
        const data = await validateToken(token);
        req.currentUser = await userService.retrieveByEmail(data.email);
        logger.info(data, req.body);

        if (roles === '*' || roles.includes(data.role)) {
          return next();
        }
      } catch (error) {
        return next(new APIError({ message: error.message, status_code: 401 }));
      }

      return next(new APIError({ message: 'Unauthorized.', status_code: 401 }));
    } else {
      return next(new APIError({ message: 'Unauthorized.', status_code: 401 }));
    }
  };
}
