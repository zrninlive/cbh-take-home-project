import { describe, it, expect, beforeAll } from "vitest";

import { CreateShiftUseCase, CreateShiftErrors } from "./CreateShiftUseCase";

import { AgentRepository } from "../../agents/entity";
import { FacilityRepository } from "../../facilities/entity";
import { ShiftRepository } from "../entity/repository";

const agentsRepository = new AgentRepository();
const facilitiesRepository = new FacilityRepository();
const shiftsRepository = new ShiftRepository();

const createFacilityUseCase = new CreateShiftUseCase(
  agentsRepository,
  facilitiesRepository,
  shiftsRepository
);

describe("Create Shift Tests", () => {
  beforeAll(() => {
    agentsRepository.create({
      id: "6f7eeb39-15d6-4c1a-8511-9c1c36609a46",
      name: "John Doe",
      document: "123456",
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    facilitiesRepository.create({
      id: "fc2b5cb6-c1af-11ed-afa1-0242ac120002",
      name: "FACILITY 01",
      code: "FAC-01",
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
  });

  it("should not create a shift with an invalid agent", () => {
    try {
      createFacilityUseCase.execute({
        id: "4c23cc30-c1b0-11ed-afa1-0242ac120002",
        agentId: "invalid-agent-uid",
        facilityId: "fc2b5cb6-c1af-11ed-afa1-0242ac120002",
        startsAt: new Date(),
        finishedAt: new Date(),
        createdAt: new Date(),
        modifiedAt: new Date(),
      });
    } catch (err) {
      expect(err.message).toBe(CreateShiftErrors["agent-not-exists"]);
    }
  });

  it("should not create a shift with an invalid facility", () => {
    try {
      createFacilityUseCase.execute({
        id: "4c23cc30-c1b0-11ed-afa1-0242ac120002",
        agentId: "6f7eeb39-15d6-4c1a-8511-9c1c36609a46",
        facilityId: "invalid-facility-uid",
        startsAt: new Date(),
        finishedAt: new Date(),
        createdAt: new Date(),
        modifiedAt: new Date(),
      });
    } catch (err) {
      expect(err.message).toBe(CreateShiftErrors["facility-not-exists"]);
    }
  });

  it("should create a new shift successfully", () => {
    const newShift = {
      id: "4c23cc30-c1b0-11ed-afa1-0242ac120002",
      agentId: "6f7eeb39-15d6-4c1a-8511-9c1c36609a46",
      facilityId: "fc2b5cb6-c1af-11ed-afa1-0242ac120002",
      startsAt: new Date(),
      finishedAt: new Date(),
      createdAt: new Date(),
      modifiedAt: new Date(),
    };

    const result = createFacilityUseCase.execute(newShift);

    expect(result).toEqual(newShift);
  });
});
