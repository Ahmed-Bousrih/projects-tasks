import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../entities/user.entity';

interface JwtUserPayload {
  userId: number;
  email: string;
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createProject(
    dto: CreateProjectDto,
    jwtUser: JwtUserPayload,
  ): Promise<Project> {
    const owner = await this.userRepository.findOneOrFail({
      where: { id: jwtUser.userId },
    });

    const project = this.projectRepository.create({ name: dto.name, owner });
    return this.projectRepository.save(project);
  }

  // Fetch projects for a specific user (used by /dashboard)
  async findByOwner(userId: number): Promise<Project[]> {
    return this.projectRepository.find({
      where: { owner: { id: userId } }, // query by relation
      relations: ['owner', 'tasks'], // include tasks if needed
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['owner', 'tasks'],
    });
  }
}
