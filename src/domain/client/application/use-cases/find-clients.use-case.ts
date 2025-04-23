import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientRepository } from "../repositories/client-repository";

interface FindClientsUseCaseRequest {
    id?: string;
    email?: string;
    sinacorCode?: string;
    accountNumber?: string;
    brokerId?: string;
    advisorId?: string;
}

@Injectable()
export class FindClientsUseCase {
    constructor(private clientRepository: ClientRepository) {}

    async execute({ id, email, sinacorCode, accountNumber, brokerId, advisorId }: FindClientsUseCaseRequest) {
        try {
            if (id) {
                if (typeof id !== 'string') {
                    throw new BadRequestException('Invalid user ID.');
                }
                const client = await this.clientRepository.findById(id);
                if (!client) {
                    throw new BadRequestException('Client not found.');
                }
                return { client };
            }
            
            if (email) {
                if (typeof email !== 'string') {
                    throw new BadRequestException('Invalid email format.');
                }
                const client = await this.clientRepository.findByEmail(email);
                if (!client) {
                    throw new BadRequestException('Client not found.');
                }
                return { client };
            }
            
            if (sinacorCode) {
                if (typeof sinacorCode !== 'string') {
                    throw new BadRequestException('Invalid sinacor code format.');
                }
                const client = await this.clientRepository.findBySinacorCode(sinacorCode);
                if (!client) {
                    throw new BadRequestException('Client not found.');
                }
                return { client };
            }

            if (accountNumber) {
                if (typeof accountNumber !== 'string') {
                    throw new BadRequestException('Invalid account number format.');
                }
                const client = await this.clientRepository.findByAccountNumber(accountNumber);
                if (!client) {
                    throw new BadRequestException('Client not found.');
                }
                return { client };
            }

            if (brokerId) {
                if (typeof brokerId !== 'string') {
                    throw new BadRequestException('Invalid broker ID.');
                }
                const client = await this.clientRepository.findByBrokerId(brokerId);
                if (!client) {
                    throw new BadRequestException('Client not found.');
                }
                return { client };
            }

            if (advisorId) {
                if (typeof advisorId !== 'string') {
                    throw new BadRequestException('Invalid advisor ID.');
                }
                const client = await this.clientRepository.findByAdvisorId(advisorId);
                if (!client) {
                    throw new BadRequestException('Client not found.');
                }
                return { client };
            }

            const clients = await this.clientRepository.findAll();
            return { clients };

        }catch (error) {
            console.error('Error in FindClientsUseCase:', error);
            throw error;
        }
    }
}