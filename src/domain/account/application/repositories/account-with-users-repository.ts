export interface AccountWithUsers {
  id: string;
  name: string;
  email: string;
  sinacorCode: string;
  accountNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  users: any[];
}
