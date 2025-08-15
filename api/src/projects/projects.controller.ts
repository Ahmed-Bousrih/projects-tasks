import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from '../tasks/tasks.service';

interface JwtUserPayload {
  userId: number;
  email: string;
}

interface AuthRequest {
  user: JwtUserPayload;
}

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
  ) {}

  // Create a new project
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateProjectDto, @Request() req: AuthRequest) {
    return this.projectsService.createProject(dto, req.user);
  }

  // Fetch all projects for the logged-in user
  @UseGuards(JwtAuthGuard)
  @Get()
  async findByOwner(@Request() req: AuthRequest) {
    return this.projectsService.findByOwner(req.user.userId);
  }

  // Fetch a specific project by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req: AuthRequest) {
    const project = await this.projectsService.findById(id);
    if (!project) return { message: 'Project not found' };
    // (test) check if req.user.userId === project.owner.id
    return project;
  }

  // Fetch all tasks for a specific project
  @UseGuards(JwtAuthGuard)
  @Get(':id/tasks')
  getTasks(@Param('id') projectId: number) {
    return this.tasksService.findByProjectId(+projectId);
  }
}
