import UserRepository from "../../adapter/repository/user.repository";
import UserUseCase from "../../application/user/user.use_case";
import { IuserControllerDependencies } from "../../domain/interface/controller/user_controller.interface";
import PasswordService from "../service/password.service";


const repository = { UserRepository: new UserRepository() }

const service = { passwordService: new PasswordService() }

const usecase={userUsecase:new UserUseCase({repository,service})}


const UserDependencies: IuserControllerDependencies = usecase ;

export default UserDependencies