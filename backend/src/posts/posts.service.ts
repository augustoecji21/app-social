import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(content: string, userId: number) {
    return this.prisma.post.create({
      data: {
        content,
        authorId: userId,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true,
        likes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async likePost(postId: number, userId: number) {
    const existing = await this.prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
    if (existing) return { message: 'Ya diste like' };
    return this.prisma.like.create({
      data: { postId, userId },
    });
  }
}