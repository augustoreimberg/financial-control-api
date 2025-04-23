import { Client } from "../../enterprise/entities/client.entity";

export abstract class ClientRepository {
    abstract create(client: Client): Promise<void>;
    abstract findById(id: string): Promise<Client | null>;
    abstract findByEmail(email: string): Promise<Client | null>;
    abstract findBySinacorCode(sinacorCode: string): Promise<Client | null>;
    abstract findByAccountNumber(accountNumber: string): Promise<Client | null>;
    abstract findByBrokerId(brokerId: string): Promise<Client[] | null>;
    abstract findByAdvisorId(advisorId: string): Promise<Client[] | null>;
    abstract findAll(): Promise<Client[]>
}