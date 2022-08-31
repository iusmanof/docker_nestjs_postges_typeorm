import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BookModule } from '../src/book/book.module';
import { Book } from '../src/book/entities/book.entity';
import { response } from 'express';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockBooks = [{ id: 1, name: 'Book' }];

  const mockBookRepository = {
    find: jest.fn().mockResolvedValue(mockBooks),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((book) =>
        Promise.resolve({ id: Date.now(), ...book }),
      ),
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

  it('/book (POST)', () => {
    return request(app.getHttpServer())
      .post('/book')
      .send({ name: 'Bob' })
      .expect('Content-Type', /json/)
      .expect(201)
	  .then((response) => {
		expect(response.body).toEqual({
			id: expect.any(Number),
			name: 'Bob'
		})
	  });
  });
});
