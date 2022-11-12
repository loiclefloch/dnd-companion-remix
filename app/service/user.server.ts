import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";
import type { PasswordDto, UserDto } from "~/dto/User.dto";

export async function getUserById(id: UserDto["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: UserDto["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: UserDto["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: UserDto["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: UserDto["email"],
  password: PasswordDto["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
