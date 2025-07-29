/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { TaskDto } from 'src/dtos/task.dto';
import { TaskStatus } from 'src/types/task-status.enum';

@Injectable()
export class TasksService {
  private tasksCollection;

  constructor(private firebase: DatabaseService) {
    this.tasksCollection = this.firebase.getFirestore().collection('tasks');
  }

  async create(task: TaskDto, userId: string) {
    const { name, description } = task;
    const status: TaskStatus = 'Pending';
    const creationDate = new Date().toDateString();
    const doc = await this.tasksCollection.add({
      name,
      description,
      status,
      creationDate,
      userId,
    });
    return { id: doc.id };
  }

  async findAll(userId: string) {
    const snapshot = await this.tasksCollection
      .where('userId', '==', userId)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async update(id: string, task: TaskDto, userId: string) {
    const { name, description, status } = task;

    const doc = await this.tasksCollection.doc(id).get();
    if (!doc.exists || doc.data()?.userId !== userId)
      throw new NotFoundException();
    await this.tasksCollection.doc(id).update({ name, description, status });
    return { message: 'Updated successfully' };
  }

  async delete(id: string, userId: string) {
    const doc = await this.tasksCollection.doc(id).get();
    if (!doc.exists || doc.data()?.userId !== userId)
      throw new NotFoundException();
    await this.tasksCollection.doc(id).delete();
    return { message: 'Deleted successfully' };
  }
}
