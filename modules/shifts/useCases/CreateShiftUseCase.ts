import { AgentRepository } from "../../agents/entity";
import { FacilityRepository } from "../../facilities/entity";
import { ShiftRepository, Shift } from "../entity";

export enum CreateShiftErrors {
  "agent-not-exists" = "@shifts/failed-create-shift-agent-not-exists",
  "facility-not-exists" = "@shifts/failed-create-shift-facility-not-exists",
}

export class CreateShiftUseCase {
  constructor(
    private agentsRepository = new AgentRepository(),
    private facilitiesRepository = new FacilityRepository(),
    private shiftsRepository = new ShiftRepository()
  ) {}

  execute({
    id,
    agentId,
    facilityId,
    startsAt,
    finishedAt,
    createdAt,
    modifiedAt,
  }: Shift) {
    const agentOfShift = this.agentsRepository.findById(agentId);

    if (!agentOfShift) {
      throw new Error(CreateShiftErrors["agent-not-exists"]);
    }

    const facilityOfShift = this.facilitiesRepository.findById(facilityId);

    if (!facilityOfShift) {
      throw new Error(CreateShiftErrors["facility-not-exists"]);
    }

    return this.shiftsRepository.create({
      id,
      agentId,
      facilityId,
      startsAt,
      finishedAt,
      createdAt,
      modifiedAt,
    });
  }
}
