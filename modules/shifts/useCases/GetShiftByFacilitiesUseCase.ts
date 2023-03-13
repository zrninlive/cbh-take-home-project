import { Agent, AgentRepository } from "../../agents/entity";
import { Shift, ShiftRepository } from "../entity";

interface IShiftAndAgent {
  shift: Shift;
  agent: Agent | undefined;
}

interface IGetGetShiftByFacilitiesUseCase {
  facilityId: string;
}

export enum GetShiftByFacilitiesErrors {
  "facility-not-exists" = "@shifts/there-is-not-shifts-for-this-facility",
}

export class GetShiftByFacilitiesUseCase {
  constructor(
    private shiftsRepository = new ShiftRepository(),
    private agentsRepository = new AgentRepository()
  ) {}

  execute({ facilityId }: IGetGetShiftByFacilitiesUseCase): IShiftAndAgent[] {
    const shiftsByFacility = this.shiftsRepository.findByFacilityId(facilityId);

    if (!shiftsByFacility) {
      return [];
    }

    const shiftsByFacilityWithAgentData = shiftsByFacility.map((shift) => {
      const { agentId } = shift;

      const agentData = this.agentsRepository.findById(agentId);

      return {
        shift,
        agent: agentData,
      };
    });

    return shiftsByFacilityWithAgentData;
  }
}
