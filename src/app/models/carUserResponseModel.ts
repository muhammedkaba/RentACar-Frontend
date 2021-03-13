import { CarUser } from "./carUser";
import { ResponseModel } from "./responseModel";

export interface CarUserResponseModel extends ResponseModel{
    data:CarUser[]
}