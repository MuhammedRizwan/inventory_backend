export interface Itoken_Service {
    generateAccessToken(userId:string): string;
    generateRefreshToken(userId:string): string;
}