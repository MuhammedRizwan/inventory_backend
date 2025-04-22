import { JwtPayload } from "jsonwebtoken";

export interface Itoken_Service {
    generateAccessToken(userId:string): string;
    generateRefreshToken(userId:string): string;
    verifyRefreshToken(token: string):any
}