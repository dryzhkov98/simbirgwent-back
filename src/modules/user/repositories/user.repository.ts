import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { User } from '@prisma/client';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Promise<User[]> {
    return this.databaseService.user.findMany();
  }

  findOneById(id: string): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { email } });
  }

  findOneByNickname(nickname: string): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { nickname } });
  }

  create(entity: IUser): Promise<User> {
    return this.databaseService.user.create({ data: entity });
  }

  update(id: string, entity: Partial<IUser>): Promise<User> {
    return this.databaseService.user.update({ where: { id }, data: entity });
  }

  delete(id: string): Promise<User> {
    return this.databaseService.user.delete({ where: { id } });
  }
}
