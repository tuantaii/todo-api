import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Like, Repository } from 'typeorm';
import { QueryOptions } from './interface';
import { ESortBy } from 'src/constants/enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly userRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.userRepository.create(createTodoDto);
    await this.userRepository.save(todo);
    return { data: todo };
  }

  async findAll(queryOptions: QueryOptions) {
    const status = queryOptions.status;
    const search = queryOptions.search;
    const size = queryOptions?.size ?? 10;
    const page = queryOptions?.page ?? 0;
    const sortBy = queryOptions?.sortBy ?? ESortBy.ASC;

    const [todos, totalCount] = await this.userRepository.findAndCount({
      order: { title: sortBy },
      take: size,
      skip: page,
      where: { title: search && Like(`%${search}%`), status },
    });

    return {
      data: { todos, totalCount, page, size },
    };
  }

  async findOne(id: string) {
    const todo = await this.userRepository.findOne({ where: { id: id } });
    if (todo) return { status: HttpStatus.OK, data: todo };
    throw new BadRequestException('Todo not exist');
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const updateResult = await this.userRepository.update(id, updateTodoDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException('Todo not found');
    }
    return { data: true };
  }

  async remove(id: string) {
    const deleteResult = await this.userRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Todo not found');
    }
    return { data: true };
  }
}
