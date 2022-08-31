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