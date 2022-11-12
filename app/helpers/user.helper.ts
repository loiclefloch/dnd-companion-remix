import type { UserDto } from "~/dtos/User.dto";

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function isUser(user: any): user is UserDto {
  return user && typeof user === "object" && typeof user.email === "string";
}