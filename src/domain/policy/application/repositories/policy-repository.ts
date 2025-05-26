import { Policy } from '../../enterprise/entities/policy.entity';

export abstract class PolicyRepository {
  abstract create(data: Policy): Promise<void>;
  abstract findById(id: string): Promise<Policy | null>;
  abstract findByPolicyNumber(policyNumber: string): Promise<Policy | null>;
  abstract findAll(): Promise<Policy[]>;
  abstract update(id: string, data: Partial<Policy>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
