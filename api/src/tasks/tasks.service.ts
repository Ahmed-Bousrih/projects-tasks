import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entities/task.entity';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createTask(dto: CreateTaskDto, owner: User): Promise<Task> {
    const project = await this.projectRepository.findOne({
      where: { id: dto.projectId },
    });

    if (!project) throw new NotFoundException('Project not found');

    const task = this.taskRepository.create({
      title: dto.title,
      project,
      owner,
      status: dto.status ?? TaskStatus.TODO,
      priority: dto.priority ?? 1,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    });

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['project', 'owner'] });
  }

  async findById(id: number): Promise<Task | null> {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'owner'],
    });
  }
}
