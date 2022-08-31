import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BookModule } from '../src/book/book.module';
import { Book } from '../src/book/entities/book.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockBookRepository = {
	find: jest.fn()
  }

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
      .expect(200)
  });
});
