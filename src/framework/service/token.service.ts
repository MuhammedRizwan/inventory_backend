import jwt from "jsonwebtoken";

class TokenService {
    generateAccessToken(userId:string): string {
        console.log(process.env.ACCESS_SECRET)
        return jwt.sign(
            { id: userId},
            process.env.ACCESS_SECRET as string,
            { expiresIn: "15m" }
        );
    }

    generateRefreshToken(userId:string): string {
        return jwt.sign(
            { id: userId},
            process.env.REFRESH_SECRET as string,
            { expiresIn: "7d" }
        );
    }
}



export default TokenService;
