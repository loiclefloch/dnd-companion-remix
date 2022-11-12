import type { UserDto } from "~/dto/User.dto";
import { isUser } from "~/helper/user.helper";
import { useMatchesData } from "./useMatchesData";

export function useOptionalUser(): UserDto | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

