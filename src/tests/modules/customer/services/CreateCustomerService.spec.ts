import { ICustomerRepository } from '@modules/customers/domain/repository/ICustomerRepository';
import { CreateCustomerService } from '@modules/customers/services/CreateCustomerService';
import { mock } from 'jest-mock-extended';
import { TestHelper } from '@tests/TestHelper';

interface SutTypes {
  sut: CreateCustomerService;
  repository: ICustomerRepository;
}

function makeSut(): SutTypes {
  const repository = mock<ICustomerRepository>();
  const sut = new CreateCustomerService(repository);
  return {
    sut,
    repository,
  };
}

beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
});

afterAll(() => {
  TestHelper.instance.teardownTestDB();
});

describe('CreateCustomerService', () => {
  it('First test example', async () => {
    const { sut, repository } = makeSut();
    const spy = jest.spyOn(repository, 'create');
    const test2 = await sut.execute({
      name: 'Guilherme',
      email: 'test@test.com.br',
    });
    expect(spy).toHaveBeenCalled();
    console.log(test2);
    const test = 2;

    expect(test).toBe(2);
  });
});
