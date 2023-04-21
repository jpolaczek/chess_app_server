import { PrismaClient, User } from '.prisma/client'
const prisma = new PrismaClient()

export async function createUser(params: { name: string, password: string} ): Promise<User> {
    const user = await prisma.user.create({
        data: {
            name: params.name,
            password: params.password
        }
    })
    return user;
}