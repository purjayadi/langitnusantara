import Journal from '../../models/accounting/Journal';
import { getAllDataFilters, paginate } from '../../../dto';
import { JournalInput, JournalOutput } from '../../../interfaces';
import { NotFoundError } from '../../../utils/not-found-error';
import Logger from '../../../utils/logger';
import db from '../../../config/db';

class JournalRepository {
    async Journal(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allJournal = Journal.scope('includeAss').findAndCountAll({
                attributes: { exclude: ['accountId','periodeId','userId','tagId','journalTypeId']},
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                where: {
                    ...(filters?.isActive && { isActive: filters?.isActive }),
                    ...(filters?.periodeId && { periodeId: filters?.periodeId }),
                    ...(filters?.journalTypeId && { journalTypeId: filters?.journalTypeId }),
                    ...(filters?.tagId && { tagId: filters?.tagId }),
                },
                raw: true
            });
            return allJournal;
    }

    async Create(payload: JournalInput) {
        const data: any[] = [];
        // sum debit and credit then check if equal
        const sumDebit = payload.reduce((acc: any, curr: { debit: any; }) => acc + curr.debit, 0);
        const sumCredit = payload.reduce((acc: any, curr: { credit: any; }) => acc + curr.credit, 0);
        if (sumDebit !== sumCredit) {
            throw new Error('Debit and Credit must be equal');
        }
        payload.map((item: any) => {
            data.push({
                date: item.date,
                code: item.code,
                journalTypeId: item.journalTypeId,
                accountId: item.accountId,
                periodeId: item.periodeId,
                debit: item.debit,
                credit: item.credit,
                note: item.note,
                userId: item.userId,
                tagId: item.tagId,
                ref: item.ref,
            });
        });
        Logger.debug(data);
        const journal = await Journal.bulkCreate(data);
        return journal;
    }

    async Update(code: string, payload: any){
        const t = await db.transaction();
        const journal = await Journal.findOne({
            where: { code }
        });
        if (!journal) {
            throw new NotFoundError();
        }
        try {
            await Journal.destroy({
                where: { code: code }, transaction: t
            });
            const data: any[] = [];
            // sum debit and credit then check if equal
            const sumDebit = payload.reduce((acc: number, curr: { debit: number; }) => acc + curr.debit, 0);
            const sumCredit = payload.reduce((acc: number, curr: { credit: number; }) => acc + curr.credit, 0);
            Logger.info(sumDebit);
            Logger.info(sumCredit);
            if (sumDebit !== sumCredit) {
                throw new Error('Debit and Credit must be equal');
            }
            payload.map((item: any) => {
                data.push({
                    date: item.date,
                    code: item.code,
                    journalTypeId: item.journalTypeId,
                    accountId: item.accountId,
                    periodeId: item.periodeId,
                    debit: item.debit,
                    credit: item.credit,
                    note: item.note,
                    userId: item.userId,
                    tagId: item.tagId,
                    ref: item.ref,
                });
            });
            Logger.debug(data);
            const CreateNewJournal = await Journal.bulkCreate(data, { transaction: t });
            await t.commit();
            return CreateNewJournal;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async Delete(code: string): Promise<boolean> {
        const journal = await Journal.findOne({
            where: { code }
        });
        if (!journal) {
          // @todo throw custom error
            throw new NotFoundError();
        }
        const deleteJournal = await Journal.destroy({
            where: { code }
        });
        return !!deleteJournal;
    }

    async FindById(id: string): Promise<JournalOutput> {
        const journal = await Journal.findByPk(id);
        if (!journal) {
          // @todo throw custom error
            throw new NotFoundError();
        }
        // @ts-ignore
        return journal;
    }

    async findByCode(code: string){
        const journal = await Journal.scope('includeAss').findAll({
            where: { code }
        });
        if (!journal) {
          // @todo throw custom error
            throw new NotFoundError();
        }
        // @ts-ignore
        return journal;
    }
}

export default JournalRepository;