import { IUserRepository } from './../../../domain/repository/IUserRepository';
import { User } from './../entities/User';
import { Repository, getRepository } from 'typeorm';
import { ICreateUser } from '@modules/users/domain/model/ICreateUser';
import { IUser } from '@modules/users/domain/model/IUser';

export class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findById(id: string): Promise<IUser | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name'],
    });
  }

  async create(data: ICreateUser): Promise<IUser> {
    return this.ormRepository.create(data);
  }

  async save(customer: IUser): Promise<IUser> {
    return this.ormRepository.save(customer);
  }
  async find(): Promise<IUser[]> {
    return this.ormRepository.find();
  }

  async remove(customer: IUser): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  async findByEmail(email: string): Promise<undefined | User> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }
}
