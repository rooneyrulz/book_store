import { verify } from 'jsonwebtoken';
import config from 'config';

export default async (req, res, next) => {
  // Check for token
  const token = await req.header('x-auth-token');

  if (!token)
    return res.status(401).json({
      msg: `you are not authorized...`,
    });

  try {
    // verify token
    const decoded = await verify(token, config.get('JWT_KEY'));

    if (!decoded)
      return res.status(401).json({
        msg: `Invalid token...`,
      });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
