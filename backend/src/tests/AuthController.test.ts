import { AuthController } from '../controllers/AuthController';
import { AppUserServiceImpl, AccountServiceImpl, InductionClassServiceImpl } from '@Services';
import { AppUserMapperImpl } from '@Mappers';
import { AppUserSignupRequest, AppUserResponse } from '@Payloads';
import { AppUser } from '@Entities';

jest.mock('@Services');
jest.mock('@Mappers');

let authController: AuthController;

beforeEach(() => {
  authController = new AuthController(
    AppUserServiceImpl,
    AccountServiceImpl,
    InductionClassServiceImpl,
    AppUserMapperImpl
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('signUpUser', () => {
  it('should return undefined on account with existing email', async () => {
    (AppUserServiceImpl.getAppUserByEmail as jest.Mock).mockImplementation(() => new AppUser());

    expect(await authController.inducteeSignUp(new AppUserSignupRequest())).toEqual(undefined);
  });

  it('should return undefined on account creation failure', async () => {
    (AppUserServiceImpl.getAppUserByEmail as jest.Mock).mockImplementation(() => undefined);
    (AccountServiceImpl.createNewAccount as jest.Mock).mockImplementation(() => undefined);

    expect(await authController.inducteeSignUp(new AppUserSignupRequest())).toEqual(undefined);
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
      preferredName: 'preferredName',
      pronoun: 'None',
      customPronoun: 'None',
      infoSession: 'infoSession1',
      courseRequirement: true,
      newsletter: true,
    };

    const appUserResponse: AppUserResponse = {
      id: 0,
      email: 'test@gmail.com',
      firstName: 'firstName',
      lastName: 'lastName',
      major: 'major',
      graduationYear: '2020',
      role: 'inductee',
    };

    (AppUserServiceImpl.getAppUserByEmail as jest.Mock).mockImplementation(() => undefined);

    (AccountServiceImpl.createNewAccount as jest.Mock).mockImplementation(() => '0');
    (AppUserMapperImpl.entityToResponse as jest.Mock).mockImplementation(() => appUserResponse);

    expect(await authController.inducteeSignUp(appUserSignupRequest)).toEqual(appUserResponse);
    expect(AppUserServiceImpl.saveAppUser).toBeCalled();
    expect(AccountServiceImpl.createNewAccount).toBeCalled();
  });
});
