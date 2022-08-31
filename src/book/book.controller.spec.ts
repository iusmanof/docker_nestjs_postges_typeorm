import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
  let controller: BookController;

  const mockBookService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    })
      .overrideProvider(BookService)
      .useValue(mockBookService)
      .compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create book', () => {
    expect(controller.create({ name: 'Book' })).toEqual({
      id: expect.any(Number),
      name: 'Book',
    });
  });
});
