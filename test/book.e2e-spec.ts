import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BookModule } from '../src/book/book.module';
import { Book } from '../src/book/entities/book.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockBooks = [{ id: 1, name: 'Book' }];

  const mockBookRepository = {
    find: jest.fn().mockResolvedValue(mockBooks),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BookModule],
    }).overrideProvider(getRepositoryToken(Book)).useValue(mockBookRepository).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/book (GET)', () => {
    return request(app.getHttpServer())
      .get('/book')
	  .expect('Content-Type', /json/)
      .expect(200)
	  .expect(mockBooks)
  });
});
