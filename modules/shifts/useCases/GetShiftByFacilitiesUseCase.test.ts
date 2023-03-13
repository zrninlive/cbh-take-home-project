import { describe, it, expect, beforeAll } from "vitest";

import {
  GetShiftByFacilitiesErrors,
  GetShiftByFacilitiesUseCase,
} from "./GetShiftByFacilitiesUseCase";

import { AgentRepository } from "../../agents/entity";
import { FacilityRepository } from "../../facilities/entity";
import { ShiftRepository } from "../entity/repository";

const agentsRepository = new AgentRepository();
const facilitiesRepository = new FacilityRepository();
const shiftsRepository = new ShiftRepository();

const getShiftByFacilitiesUseCase = new GetShiftByFacilitiesUseCase(
  shiftsRepository,
  agentsRepository
);

const agentMockData = {
  id: "6f7eeb39-15d6-4c1a-8511-9c1c36609a46",
  name: "John Doe",
  document: "123456",
  createdAt: new Date(),
  modifiedAt: new Date(),
};

const facilityMockData = {
  id: "fc2b5cb6-c1af-11ed-afa1-0242ac120002",
  name: "FACILITY 01",
  code: "FAC-01",
  createdAt: new Date(),
  modifiedAt: new Date(),
};

const firstShiftMockData = {
  id: "776c12b8-c1b4-11ed-afa1-0242ac120002",
  agentId: "6f7eeb39-15d6-4c1a-8511-9c1c36609a46",
  facilityId: "fc2b5cb6-c1af-11ed-afa1-0242ac120002",
  startsAt: new Date(),
  finishedAt: new Date(),
  createdAt: new Date(),
  modifiedAt: new Date(),
};

const secondShiftMockData = {
  id: "7cd3002c-c1b4-11ed-afa1-0242ac120002",
  agentId: "6f7eeb39-15d6-4c1a-8511-9c1c36609a46",
  facilityId: "fc2b5cb6-c1af-11ed-afa1-0242ac120002",
  startsAt: new Date(),
  finishedAt: new Date(),
  createdAt: new Date(),
  modifiedAt: new Date(),
};

describe("Get Shifts By Facilities Tests", () => {
  beforeAll(() => {
    agentsRepository.create(agentMockData);

    facilitiesRepository.create(facilityMockData);

    shiftsRepository.create(firstShiftMockData);
    shiftsRepository.create(secondShiftMockData);
  });

  it("should not return shifts if the facility has not one", () => {
    const result = getShiftByFacilitiesUseCase.execute({
      facilityId: "facility-without-shifts",
    });
    expect(result).toEqual([]);
  });

  it("should return all shifts from facilityId", () => {
    const result = getShiftByFacilitiesUseCase.execute({
      facilityId: "fc2b5cb6-c1af-11ed-afa1-0242ac120002",
    });

    expect(result).toHaveLength(2);
  });

  it("should return all shifts from facilityId with agent metadata", () => {
    const result = getShiftByFacilitiesUseCase.execute({
      facilityId: "fc2b5cb6-c1af-11ed-afa1-0242ac120002",
    });

    expect(result).toEqual([
      {
        shift: firstShiftMockData,
        agent: agentMockData,
      },
      { shift: secondShiftMockData, agent: agentMockData },
    ]);
  });
});
