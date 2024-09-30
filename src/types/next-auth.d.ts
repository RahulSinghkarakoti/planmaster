 
import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth'
{
    interface User{
        _id?:string,
        isVerified?:boolean,
        username?:string,
        email?:string,
        password?: string;
    }

    interface Session {
        user: {
          _id?: string;
          isVerified?: boolean;
          email?: string;
          username?: string;
        } & DefaultSession['user'];
      }
      interface CustomErrorResponse {
        message: string;
        success:boolean
      }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    email?: string;
    username?: string;
  }
}