
export default interface IUser {
    _id?:string;
    name: string;
    mobile: string;
    email: string;
    password: string;
    is_verified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
