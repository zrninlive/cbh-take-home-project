import { IFacilityRepository } from "./interface";
import { Facility } from "./schema";

export class FacilityRepository implements IFacilityRepository {
  private facilitiesBase: Facility[] = [];

  constructor() {}

  list(): Facility[] {
    return this.facilitiesBase;
  }

  findById(facilityId: string): Facility | undefined {
    return this.facilitiesBase.find((facility) => facility.id === facilityId);
  }

  create(facility: Facility): Facility {
    const alreadyRegistered = this.facilitiesBase.find(
      (facilityBase) => facilityBase.code === facility.code
    );

    if (alreadyRegistered) {
      throw new Error("@facilities/failed-create-facility");
    }

    this.facilitiesBase.push(facility);

    return facility;
  }

  update(facilityData: Facility): Facility {
    const facilityToUpdate = this.facilitiesBase.findIndex(
      (facility) => facility.id === facilityData.id
    );

    if (!facilityToUpdate) {
      throw new Error("@facilities/failed-update-facility");
    }

    this.facilitiesBase[facilityToUpdate] = facilityData;

    return facilityData;
  }

  delete(facilityId: string) {
    const facilityToDelete = this.facilitiesBase.findIndex(
      (facility) => facility.id === facilityId
    );

    if (!facilityToDelete) {
      throw new Error("@facilities/failed-delete-facility");
    }

    this.facilitiesBase.splice(facilityToDelete, 1);
  }
}
