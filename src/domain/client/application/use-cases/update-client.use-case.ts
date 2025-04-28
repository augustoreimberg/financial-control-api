import { Injectable, BadRequestException } from "@nestjs/common";
import { ClientRepository } from "../repositories/client-repository";
import { Client } from "../../enterprise/entities/client.entity";

interface UpdateClientUseCaseRequest {
    id: string;
    data: Partial<Client>;
}

@Injectable()
export class UpdateClientUseCase {
    constructor(private clientRepository: ClientRepository) {}

    async execute({ id, data }: UpdateClientUseCaseRequest) {
        try {
            const client = await this.clientRepository.findById(id);

            if (!client) {
                throw new BadRequestException('Client not found');
            }

            if (data.name) client.name = data.name;
            if (data.email) client.email = data.email;
            if (data.sinacorCode) client.sinacorCode = data.sinacorCode;
            if (data.accountNumber) client.accountNumber = data.accountNumber;

            await this.clientRepository.update(id, client);

            return { client };
        } catch (error) {
            console.error('Error in UpdateClientUseCase:', error);
            throw error;
        }
    }
} 