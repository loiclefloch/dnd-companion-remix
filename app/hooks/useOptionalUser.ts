import type { UserDto } from "~/dtos/User.dto";
import { isUser } from "~/helpers/user.helper";
import { useMatchesData } from "./useMatchesData";

export function useOptionalUser(): UserDto | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

