import { Facility } from "./schema";

export interface IFacilityRepository {
  create(facility: Facility): Facility;
  list(): Facility[];
  delete(facilityId: string): void;
  update(facilityData: Facility): Facility;
  findById(facilityId: string): Facility | undefined;
}
