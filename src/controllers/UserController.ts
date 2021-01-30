import {
  JsonController,
  Get,
  Res,
  Param,
  CurrentUser,
  ForbiddenError,
  Post,
  Body,
  UseBefore,
  QueryParams,
  UploadedFile,
  BadRequestError,
} from 'routing-controllers';
import { Response } from 'express';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';

import { AppUser } from '@Entities';
import {
  AppUserService,
  AppUserServiceImpl,
  AttendanceService,
  AttendanceServiceImpl,
  ResumeService,
  ResumeServiceImpl,
} from '@Services';
import {
  AppUserPostRequest,
  AppUserInterviewAvailabilitiesRequest,
  AppUserResponse,
  AppUserRolesResponse,
  AppUserProfileResponse,
  MultipleUserQuery,
  MultipleAppUserResponse,
  MultipleUserNameResponse,
  AppUserMemberPointsResponse,
  AppUserInducteePointsResponse,
  AttendanceResponse,
} from '@Payloads';
import { AppUserMapper, AppUserMapperImpl } from '@Mappers';
import { InducteeAuthMiddleware, MemberAuthMiddleware, OfficerAuthMiddleware } from '@Middlewares';
import { formatISO } from 'date-fns';
import multer from 'multer';

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: Function) => {
  if (file.mimetype.includes('pdf') || file.mimetype.includes('word')) {
    cb(null, true);
  } else {
    console.log('Invalid file type');
    cb(null, false);
  }
};

const fileUploadOptions = {
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 5,
  },
};

@JsonController('/api/users')
export class UserController {
  constructor(
    private appUserService: AppUserService,
    private attendanceService: AttendanceService,
    private appUserMapper: AppUserMapper,
    private resumeService: ResumeService
  ) {}

  @Get('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(MultipleAppUserResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getMultipleUsers(
    @QueryParams() multipleUserQuery: MultipleUserQuery
  ): Promise<MultipleAppUserResponse | MultipleUserNameResponse> {
    const multipleUsers = await this.appUserService.getAllAppUsers(multipleUserQuery);

    return { users: multipleUsers };
  }

  @Post('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(AppUserResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async createUser(@Body() appUserCreateRequest: AppUserPostRequest): Promise<AppUserResponse> {
    const newAppUser = await this.appUserMapper.requestToNewEntity(appUserCreateRequest);
    const savedAppUser = await this.appUserService.saveAppUser(newAppUser);

    return this.appUserMapper.entityToResponse(savedAppUser);
  }

  @Get('/:userID')
  @UseBefore(InducteeAuthMiddleware)
  @ResponseSchema(AppUserProfileResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getUserProfile(
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<AppUserProfileResponse | undefined> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(appUser, userID)) {
      throw new ForbiddenError();
    }

    const appUserFromID: AppUser = await this.appUserService.getAppUserById(userID);

    if (appUserFromID === undefined) {
      return undefined;
    }

    return this.appUserMapper.entityToProfileResponse(appUserFromID);
  }

  @Post('/:userID')
  @UseBefore(InducteeAuthMiddleware)
  @ResponseSchema(AppUserResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async updateUserProfile(
    @Param('userID') userID: number,
    @Body() appUserUpdateRequest: AppUserPostRequest,
    @CurrentUser({ required: true })
    appUser: AppUser
  ): Promise<AppUserResponse | undefined> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(appUser, userID)) {
      throw new ForbiddenError();
    }

    const updatedAppUserToSave = await this.appUserMapper.requestToExistingEntity(
      appUserUpdateRequest,
      userID
    );

    const savedAppUser = await this.appUserService.saveAppUser(updatedAppUserToSave);

    return this.appUserMapper.entityToResponse(savedAppUser);
  }

  @Get('/:userID/roles')
  @UseBefore(InducteeAuthMiddleware)
  @ResponseSchema(AppUserRolesResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getUserRole(
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<AppUserRolesResponse | undefined> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(appUser, userID)) {
      throw new ForbiddenError();
    }

    const queriedRoleFromId = await this.appUserService.getAppUserRoleById(userID);

    if (queriedRoleFromId === undefined) {
      return undefined;
    }

    return { role: queriedRoleFromId };
  }

  @Get('/:userID/inductee-points')
  @UseBefore(InducteeAuthMiddleware)
  @ResponseSchema(AppUserInducteePointsResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getUserInducteePoints(
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) requestAppUser: AppUser
  ): Promise<AppUserInducteePointsResponse | undefined> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(requestAppUser, userID)) {
      throw new ForbiddenError();
    }

    const points = await this.appUserService.getInducteePoints(userID);
    const attendances = await this.attendanceService.getUserAttendance(userID);

    if (points == undefined || attendances == undefined) {
      // return undefined if someone has no points
      return undefined;
    }

    // Still don't like this - Godwin Nov 14 2020 :)
    const attendanceObjs = attendances
      .filter(attendance => attendance.endTime)
      .map(attendance => {
        const res = new AttendanceResponse();
        res.startTime = formatISO(attendance.startTime);
        res.endTime = formatISO(attendance.endTime);

        res.event = attendance.event;
        res.officer = attendance.officer;
        res.points = attendance.points;
        res.attendee = attendance.attendee;
        res.isInductee = attendance.isInductee;
        return res;
      });

    // I don't like this but I'll take it for now - Godwin Oct 24 2020
    const res: AppUserInducteePointsResponse = new AppUserInducteePointsResponse();
    res.points = points.points;
    res.user = userID;
    res.hasMentorshipRequirement = points.hasMentorshipRequirement;
    res.hasProfessionalRequirement = points.hasProfessionalRequirement;
    res.attendance = attendanceObjs;
    return res;
  }

  @Get('/:userID/member-points')
  @UseBefore(MemberAuthMiddleware)
  @ResponseSchema(AppUserMemberPointsResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getUserMemberPoints(
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) requestAppUser: AppUser
  ): Promise<AppUserMemberPointsResponse | undefined> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(requestAppUser, userID)) {
      throw new ForbiddenError();
    }

    const points = await this.appUserService.getMemberPoints(userID);

    return points;
  }

  @Post('/:userID/interview-availabilities')
  @UseBefore(InducteeAuthMiddleware)
  @ResponseSchema(AppUserResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async updateUserInterviewAvailabilities(
    @Param('userID') userID: number,
    @Body() appUserInterviewAvailabilities: AppUserInterviewAvailabilitiesRequest,
    @CurrentUser({ required: true }) requestingAppUser: AppUser
  ): Promise<AppUserResponse | undefined> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(requestingAppUser, userID)) {
      throw new ForbiddenError();
    }

    const appUserAvailabilities = appUserInterviewAvailabilities.availabilities;
    const updatedAppUser = await this.appUserService.updateInterviewAvailabilities(
      requestingAppUser,
      appUserAvailabilities
    );

    return this.appUserMapper.entityToResponse(updatedAppUser);
  }

  @Post('/:userID/resume')
  @UseBefore(InducteeAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async uploadResume(
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) appUser: AppUser,
    @UploadedFile('file', {
      options: fileUploadOptions,
    })
    file: Express.Multer.File
  ): Promise<string | null> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(appUser, userID)) {
      throw new ForbiddenError();
    }
    if (!file) {
      throw new BadRequestError('Invalid file');
    }
    try {
      return await this.resumeService.uploadResume(appUser, file);
    } catch (e) {
      throw new BadRequestError(`Error uploading to storage: ${e.message}`);
    }
  }

  @Get('/:userID/resume')
  @UseBefore(InducteeAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async downloadResume(
    @Res() res: Response,
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<Buffer | null> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(appUser, userID)) {
      throw new ForbiddenError();
    }
    try {
      return await this.resumeService.downloadResume(appUser, res);
    } catch (e) {
      throw new BadRequestError(`Error downloading from storage: ${e.message}`);
    }
  }
}

export const UserControllerImpl = new UserController(
  AppUserServiceImpl,
  AttendanceServiceImpl,
  AppUserMapperImpl,
  ResumeServiceImpl
);
