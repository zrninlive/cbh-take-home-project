import { IAgentRepository } from "./interface";
import { Agent } from "./schema";

export class AgentRepository implements IAgentRepository {
  private agentsBase: Agent[] = [];

  constructor() {}

  list(): Agent[] {
    return this.agentsBase;
  }

  findById(agentId: string): Agent | undefined {
    return this.agentsBase.find((agent) => agent.id === agentId);
  }

  create(agent: Agent): Agent {
    const alreadyRegistered = this.agentsBase.find(
      (agentBase) => agentBase.document === agent.document
    );

    if (alreadyRegistered) {
      throw new Error("@facilities/failed-create-agent");
    }

    this.agentsBase.push(agent);

    return agent;
  }

  update(agentData: Agent): Agent {
    const agentToUpdate = this.agentsBase.findIndex(
      (agent) => agent.id === agentData.id
    );

    if (!agentToUpdate) {
      throw new Error("@facilities/failed-update-agent");
    }

    this.agentsBase[agentToUpdate] = agentData;

    return agentData;
  }

  delete(agentId: string) {
    const agentToDelete = this.agentsBase.findIndex(
      (agent) => agent.id === agentId
    );

    if (!agentToDelete) {
      throw new Error("@facilities/failed-delete-agent");
    }

    this.agentsBase.splice(agentToDelete, 1);
  }
}
