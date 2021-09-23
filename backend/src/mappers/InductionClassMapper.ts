import { classToPlain, plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';

import { InductionClass } from '@Entities';
import { InductionClassRequest, InductionClassResponse } from '@Payloads';

export class InductionClassMapper {
  requestToNewEntity(inductionClassRequest: InductionClassRequest): InductionClass {
    const inductionClassRepository = getRepository(InductionClass);
    const plainInductionClassRequest: object = classToPlain(inductionClassRequest);

    const inductionClass = inductionClassRepository.create(plainInductionClassRequest);
    inductionClass.affiliates = [];

    return inductionClass;
  }

  async requestToExistingEntity(
    inductionClassRequest: InductionClassRequest
  ): Promise<InductionClass | undefined> {
    const inductionClassObj: InductionClass = inductionClassRequest as InductionClass;

    const inductionClassRepository = getRepository(InductionClass);
    const inductionClass = await inductionClassRepository.preload(inductionClassObj);

    if (inductionClass === undefined) {
      return undefined;
    }

    return inductionClass;
  }

  entityToResponse(inductionClass: InductionClass): InductionClassResponse {
    const plainInductionClass: Object = classToPlain(inductionClass);
    const inductionClassResponse: InductionClassResponse = plainToClass(
      InductionClassResponse,
      plainInductionClass
    );

    return inductionClassResponse;
  }
}

export const InductionClassMapperImpl = new InductionClassMapper();
