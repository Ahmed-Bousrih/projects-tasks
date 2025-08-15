import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../entities/user.entity';

interface AuthRequest {
  user: {
    userId: number;
    email: string;
  };
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateTaskDto, @Request() req: AuthRequest) {
    const { userId, email } = req.user;
    const owner: User = { id: userId, email } as User;
    return this.tasksService.createTask(dto, owner);
  }

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tasksService.findById(id);
  }
}
