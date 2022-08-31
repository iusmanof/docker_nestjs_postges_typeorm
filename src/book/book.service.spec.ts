import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

describe('BookService', () => {
  let service: BookService;

  const mockBookRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({ id: Date.now(), ...user}))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, {
        provide: getRepositoryToken(Book),
        useValue: mockBookRepository
      }],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new book record and return that', async () => {
    expect(await service.create({name: 'Book'})).toEqual({ id: expect.any(Number), name: 'Book' });
  });
});
