import { Shift } from "./schema";

export interface IShiftRepository {
  create(shift: Shift): Shift;
  list(): Shift[];
  delete(shiftId: string): void;
  update(shiftData: Shift): Shift;
  findByFacilityId(facilityId: string): Shift[];
}
