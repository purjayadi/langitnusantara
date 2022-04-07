import UserService from '../UserService';
import UserRepository from '../../database/repository/UserRepository';
import * as Filters_dto from '../../dto/Filters.dto';
import db from '../../../../config/db';
import { UserInput } from '../../interfaces';

describe('UserService', () => {
    let service: UserService;
    const filters = new Filters_dto.getAllDataFilters();
    // eslint-disable-next-line no-undef
    beforeEach(() => {
        service = new UserService();
    });

    test('should be show all users', async () => {
        const result = await service.GetUser(filters);
        expect(result).toBeDefined();
    });

    test('should be create user', async () => {
        const payload: UserInput = {
            firstName: 'test',
            lastName: 'test',
            email: 'test@mail.com',
            password: 'test',
            phone: '123'
        };
        const result = await service.CreateUser(payload);
        expect(result).toBeDefined();
    });

    test('should be phone number is required', async () => {
        const payload: UserInput = {
            firstName: 'test',
            lastName: 'test',
            email: 'test2@mail.com',
            password: 'test',
        };
        const result = await service.CreateUser(payload);
        console.log(result);
        
        expect(result).toEqual({
            error: { status: 500, message: 'phone number is required' }
        });
    });

    afterAll(async () => {
        await db.close();
    });
});