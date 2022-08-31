import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly shoeRepository: Repository<Book>,
  ) {}

  create(createShoeDto: CreateBookDto) {
    const newShoes = this.shoeRepository.create(createShoeDto);
    return this.shoeRepository.save(newShoes);
  }

  findAll() {
    return this.shoeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} book`;
  // }
}
