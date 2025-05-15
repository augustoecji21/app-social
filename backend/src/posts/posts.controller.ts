import { Controller, Post, Get, Param, Body, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  create(@Body('content') content: string, @Req() req) {
    console.log('req.user:', req.user);
    const userId = req.user.id;
    if (!userId) throw new UnauthorizedException('Usuario no autenticado');
    return this.postsService.create(content, userId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post(':id/like')
  likePost(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    const postId = parseInt(id, 10);
    return this.postsService.likePost(postId, userId);
  }
}
