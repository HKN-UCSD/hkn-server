import { AccountService } from '@Services/AccountService';

const authService = {
  createUser: jest.fn(),
};

const getAuthService = () => authService;
let accountService: AccountService;

beforeEach(() => {
  accountService = new AccountService(getAuthService);
});

describe('AccountService', () => {
  it('should return undefined on failed signup', async () => {
    authService.createUser.mockImplementation(() => {
      throw new Error();
    });

    expect(await accountService.createNewAccount(0, '', '')).toEqual(undefined);
  });

  it('should return id on successful signup', async () => {
    authService.createUser.mockImplementation(() => {
      return { uid: '1' };
    });

    expect(await accountService.createNewAccount(1, '', '')).toEqual('1');
  });
});
