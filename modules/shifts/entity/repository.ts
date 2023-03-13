import { Shift } from "./schema";
import { IShiftRepository } from "./interface";

export class ShiftRepository implements IShiftRepository {
  private shiftsBase: Shift[] = [];

  constructor() {}

  list(): Shift[] {
    return this.shiftsBase;
  }

  create(shift: Shift): Shift {
    this.shiftsBase.push(shift);

    return shift;
  }

  findByFacilityId(facilityId: string): Shift[] {
    return this.shiftsBase.filter((shift) => shift.facilityId === facilityId);
  }

  update(shiftData: Shift): Shift {
    const shiftToUpdate = this.shiftsBase.findIndex(
      (shift) => shift.id === shiftData.id
    );

    if (!shiftToUpdate) {
      throw new Error("@shifts/failed-update-shift");
    }

    this.shiftsBase[shiftToUpdate] = shiftData;

    return shiftData;
  }

  delete(shiftId: string) {
    const shiftToDelete = this.shiftsBase.findIndex(
      (shift) => shift.id === shiftId
    );

    if (!shiftToDelete) {
      throw new Error("@shifts/failed-delete-shift");
    }

    this.shiftsBase.splice(shiftToDelete, 1);
  }
}
