import { AuthController } from '../controllers/AuthController';
import { AppUserServiceImpl, AccountServiceImpl } from '@Services';
import { AppUserMapperImpl } from '@Mappers';
import { AppUserSignupRequest, AppUserResponse } from '@Payloads';
import { AppUser } from '@Entities';

jest.mock('@Services');
jest.mock('@Mappers');

let authController: AuthController;

beforeEach(() => {
  authController = new AuthController(AppUserServiceImpl, AccountServiceImpl, AppUserMapperImpl);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('signUpUser', () => {
  it('should return undefined on nonpermitted email', async () => {
    (AppUserServiceImpl.getAppUserByEmail as jest.Mock).mockImplementation(() => undefined);

    expect(await authController.signUpUser(new AppUserSignupRequest())).toEqual(undefined);
  });

  it('should return undefined for guest', async () => {
    (AppUserServiceImpl.getAppUserByEmail as jest.Mock).mockImplementation(() => new AppUser());
    (AppUserServiceImpl.isGuest as jest.Mock).mockImplementation(() => false);

    expect(await authController.signUpUser(new AppUserSignupRequest())).toEqual(undefined);
  });

  it('should return undefined on account creation failure', async () => {
    (AppUserServiceImpl.getAppUserByEmail as jest.Mock).mockImplementation(() => new AppUser());
    (AppUserServiceImpl.isGuest as jest.Mock).mockImplementation(() => false);
    (AccountServiceImpl.createNewAccount as jest.Mock).mockImplementation(() => undefined);

    expect(await authController.signUpUser(new AppUserSignupRequest())).toEqual(undefined);
    expect(AccountServiceImpl.createNewAccount).toBeCalled();
  });

  it('should create new account and persist user to db on success', async () => {
    const appUserSignupRequest: AppUserSignupRequest = {
      email: 'test@gmail.com',
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName',
      major: 'major',
      graduationYear: '2020',
    };

    const appUserResponse: AppUserResponse = {
      id: 0,
      email: 'test@gmail.com',
      firstName: 'firstName',
      lastName: 'lastName',
      major: 'major',
      graduationYear: '2020',
      role: 'officer',
    };

    (AppUserServiceImpl.getAppUserByEmail as jest.Mock).mockImplementation(
      () => appUserResponse as AppUser
    );

    (AppUserServiceImpl.isGuest as jest.Mock).mockImplementation(() => false);
    (AccountServiceImpl.createNewAccount as jest.Mock).mockImplementation(() => '0');
    (AppUserMapperImpl.entityToResponse as jest.Mock).mockImplementation(() => appUserResponse);

    expect(await authController.signUpUser(appUserSignupRequest)).toEqual(appUserResponse);
    expect(AccountServiceImpl.createNewAccount).toBeCalled();
    expect(AppUserServiceImpl.saveAppUser).toBeCalled();
  });
});
