import { PrismaClient } from '@prisma/client'
import { User } from '@/types/Auth'

const prisma = new PrismaClient()

export const createUser = async (data: Omit<User, 'id'>) => {


}
