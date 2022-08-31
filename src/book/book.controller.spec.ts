import { Test, TestingModule } from '@nestjs/testing';
import { domainToASCII } from 'url';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

describe('BookController', () => {
  let controller: BookController;

  const mockBookService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => {
      // return Array | dto
      return [];
    }),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
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
    const dto = { name: 'Book' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
    });

    expect(mockBookService.create).toHaveBeenCalledWith(dto);
  });

  it('should update book', () => {
     const dto = { name: 'Book' };
    expect(controller.update('1', dto )).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockBookService.update).toHaveBeenCalled()
  });

  it('should return empty array of books', () => {
    const dto = [];
    expect(controller.findAll()).toEqual(dto);

    expect(mockBookService.findAll).toHaveBeenCalled();
  });
});
