// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Fetch tasks by project ID
  findByProjectId(projectId: number) {
    return this.taskRepository.find({
      where: { project: { id: projectId } },
      relations: ['project'],
    });
  }

  // Fetch all tasks
  findAll() {
    return this.taskRepository.find({ relations: ['project'] });
  }

  // Fetch one task by ID
  findById(id: number) {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  // Optional: create a task
  async createTask(dto: any, owner: any) {
    const task = this.taskRepository.create({
      ...dto,
      owner,
    });
    return this.taskRepository.save(task);
  }
}
