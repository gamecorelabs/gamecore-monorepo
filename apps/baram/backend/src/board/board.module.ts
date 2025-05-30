import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PostModule } from './post/post.module';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [PostModule],
})
export class BoardModule {}
