import { UserPayload } from './user.types'; 

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}