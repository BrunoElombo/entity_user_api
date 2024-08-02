const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BankAccountService {
    async createBankAccount(data) {
        let {account_number, amount, cardNumber, id_employee, id_entity, id_external_entity, id_bank} = data;
        return await prisma.bankAccount.create({ 
            data :{
                account_number,
                amount,
                cardNumber,
                id_employee,
                id_entity,
                id_external_entity,
                id_bank
            }
        });
    }

    async getAllBankAccounts() {
        return await prisma.bankAccount.findMany();
    }

    async getBankAccountById(id) {
        return await prisma.bankAccount.findUnique({
            where: { id }
        });
    }

    async updateBankAccount(id, data) {
        return await prisma.bankAccount.update({
            where: { id },
            data
        });
    }

    async deleteBankAccount(id) {
        return await prisma.bankAccount.delete({
            where: { id }
        });
    }
}

module.exports = new BankAccountService();