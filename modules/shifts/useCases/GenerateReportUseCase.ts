import { jsPDF } from "jspdf";
import { differenceInSeconds, intervalToDuration } from "date-fns";

import { Agent, AgentRepository } from "../../agents/entity";
import { Facility, FacilityRepository } from "../../facilities/entity";
import { Shift, ShiftRepository } from "../entity";
import slugify from "slugify";

interface IShiftAndAgent {
  agent: Agent | undefined;
  facility: Facility;
  shifts: Shift[];
}

interface IGenerateReportUseCase {
  facilityId: string;
  agentId: string;
}

export enum GenerateReportUseCaseErrors {
  "facility-not-exists" = "@shifts/invalid-facility-id",
  "agent-not-exists" = "@shifts/invalid-agent-id",
}

export class GenerateReportUseCase {
  constructor(
    private agentsRepository = new AgentRepository(),
    private facilitiesRepository = new FacilityRepository(),
    private shiftsRepository = new ShiftRepository()
  ) {}

  execute({ facilityId, agentId }: IGenerateReportUseCase): IShiftAndAgent {
    const agent = this.agentsRepository.findById(agentId);

    if (!agent) {
      throw new Error(GenerateReportUseCaseErrors["agent-not-exists"]);
    }

    const facility = this.facilitiesRepository.findById(facilityId);

    if (!facility) {
      throw new Error(GenerateReportUseCaseErrors["facility-not-exists"]);
    }

    const shiftsByFacility = this.shiftsRepository.findByFacilityId(facilityId);

    const shiftsByAgent = shiftsByFacility.filter(
      (shift) => shift.agentId === agentId
    );

    const pdf = new jsPDF();

    pdf.setFontSize(35);
    pdf.text("SHIFT QUARTER REPORT", 25, 15);

    pdf.setFontSize(18);
    pdf.text(`${facility.name}`, 80, 30);

    pdf.setFontSize(10);
    pdf.text(`${agent.name} - ${agent.document}`, 25, 40);
    pdf.text(`${new Date()}`, 60, 40);

    const values = shiftsByFacility.map((shift, index) => {
      const secondsWorked = intervalToDuration({
        start: shift.startsAt,
        end: shift.finishedAt,
      });

      return {
        "#": (index + 1).toString(),
        date: shift.startsAt.toISOString().substring(0, 10),
        start_at: shift.startsAt.toTimeString().substring(0, 8),
        finish_at: shift.finishedAt.toTimeString().substring(0, 8),
        total: `${secondsWorked.hours}h ${secondsWorked.minutes}m`,
      };
    });

    pdf.table(25, 50, values, ["#", "date", "start_at", "finish_at", "total"], {
      autoSize: false,
      headerBackgroundColor: "black",
      headerTextColor: "white",
    });

    const pdfName = slugify(agent.name + " " + facility.name, {
      lower: true,
    });

    pdf.save(`${pdfName}.pdf`);

    return {
      agent,
      facility,
      shifts: shiftsByAgent,
    };
  }
}
