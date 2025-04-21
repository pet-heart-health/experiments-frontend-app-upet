import { UserType } from "../enum/UserType.enum";

export interface RegisterRequest{
    name: string;
    email: string;
    password: string;
    userType: UserType;
}