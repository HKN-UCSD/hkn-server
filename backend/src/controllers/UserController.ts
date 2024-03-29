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
  InternalServerError,
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
  resumeFileUploadOptions,
} from '@Services';
import {
  AppUserPostRequest,
  AppUserInterviewAvailabilitiesRequest,
  AppUserResponse,
  AppUserRolesResponse,
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
  @ResponseSchema(AppUserResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getUserById(
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) requester: AppUser
  ): Promise<AppUserResponse | undefined> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(requester, userID)) {
      throw new ForbiddenError();
    }

    const appUserFromID: AppUser = await this.appUserService.getAppUserById(userID);

    if (appUserFromID === undefined) {
      return undefined;
    }

    return this.appUserMapper.entityToResponse(appUserFromID);
  }

  @Post('/:userID')
  @UseBefore(InducteeAuthMiddleware)
  @ResponseSchema(AppUserResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async updateUserById(
    @Param('userID') userID: number,
    @Body() appUserUpdateRequest: AppUserPostRequest,
    @CurrentUser({ required: true }) requester: AppUser
  ): Promise<AppUserResponse | undefined> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(requester, userID)) {
      throw new ForbiddenError();
    }

    const { email } = appUserUpdateRequest;
    const appUserFromEmail = await this.appUserService.getAppUserByEmail(email);

    if (appUserFromEmail !== undefined && appUserFromEmail.id !== userID) {
      throw new InternalServerError('The inputted email is already taken');
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
    res.hasTechnicalRequirement = points.hasTechnicalRequirement;
    res.hasSocialRequirement = points.hasSocialRequirement;
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
      options: resumeFileUploadOptions,
    })
    file: Express.Multer.File
  ): Promise<string | null> {
    if (this.appUserService.isUnauthedUserOrNonOfficer(appUser, userID)) {
      throw new ForbiddenError();
    }
    if (!file) {
      throw new BadRequestError('Invalid file');
    }

    return this.resumeService.uploadResume(appUser, file);
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
    // this call modifies the response object
    return this.resumeService.downloadResume(appUser, res);
  }
}

export const UserControllerImpl = new UserController(
  AppUserServiceImpl,
  AttendanceServiceImpl,
  AppUserMapperImpl,
  ResumeServiceImpl
);
