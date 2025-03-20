import bcrypt from "bcryptjs";
import Ipassword_service from "../../domain/interface/service/password_service.interface";

export default class PasswordService implements Ipassword_service {
    private readonly SALT_ROUNDS = 10;
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
