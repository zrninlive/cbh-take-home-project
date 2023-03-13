import { Agent } from "./schema";

export interface IAgentRepository {
  create(agent: Agent): Agent;
  list(): Agent[];
  delete(agentId: string): void;
  update(agentData: Agent): Agent;
  findById(agentId: string): Agent | undefined;
}
