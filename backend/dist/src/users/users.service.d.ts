import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        password: string;
        id: number;
    } | null>;
    createUser(data: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        id: number;
    }>;
}
