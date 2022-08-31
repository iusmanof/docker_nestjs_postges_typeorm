# testing_nestjs

1. ```npm run test```

2. Unit-test Controller (book)  dto !

book.controller.spec.ts:

```
  const mockUserService = {}
  ...
       .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();
```

```
 const mockBookService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };
  ...
   it('should create book', () => {
    expect(controller.create({ name: 'Book' })).toEqual({
      id: expect.any(Number),
      name: 'Book',
    });
  });
```

3. Unit-test Service (book)  dto !

book.service.spec.ts:

```
  ...
  const mockBookRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({ id: Date.now(), ...user}))
  }

  ...
  providers: [BookService, {
        provide: getRepositoryToken(Book),
        useValue: mockBookRepository
    }],
  }).compile();
  ...
  it('should create a new book record and return that', async () => {
    expect(await service.create({name: 'Book'})).toEqual({ id: expect.any(Number), name: 'Book' });
  });
```
