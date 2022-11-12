import type { Password, User } from "@prisma/client";

export interface UserDto extends User {

}

export interface PasswordDto extends Password  {

}