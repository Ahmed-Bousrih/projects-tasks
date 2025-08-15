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

interface JwtUserPayload {
  userId: number;
  email: string;
}

interface AuthRequest {
  user: JwtUserPayload;
}

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateProjectDto, @Request() req: AuthRequest) {
    // Just pass the JWT payload; the service will fetch the full User entity
    return this.projectsService.createProject(dto, req.user);
  }

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.projectsService.findById(id);
  }
}
