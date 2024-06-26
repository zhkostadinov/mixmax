const { expect, test } = require('@playwright/test');
const { load_model } = require("../../utils/data_loader");
import { faker } from '@faker-js/faker/locale/en';

let add_person_model;

test.beforeEach( async({ request })=> {
    add_person_model = await load_model('api_add_person');
    add_person_model.username = faker.internet.userName();
    add_person_model.firstName = faker.person.firstName();
    add_person_model.lastName = faker.person.lastName();
    add_person_model.email = faker.internet.email();
    add_person_model.password = faker.internet.password();
    add_person_model.phone = faker.phone.imei();

    await request.post(`user`, { data: add_person_model } );
});

test.describe('API update not logged person tests', {tag: '@api',}, () => {
    test.skip('should response with status code 200 when update person username', async ({ request }) => {
        const original_username = add_person_model.username; 
        add_person_model.username = faker.internet.userName();

        await request.put(`user/${original_username}`, { data: add_person_model});
        const get_original_person_request = await request.get(`user/${original_username}`);
        const original_person = await get_original_person_request.json();

        const get_updated_person_request = await request.get(`user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();    


        expect(original_person.username).not.toEqual(updated_person.username);
        expect(original_person.id).not.toEqual(updated_person.id);
    });
    
    test.skip('should response with status code 200 when update person firstName', async ({ request }) => {
        const original_first_name = add_person_model.firstName; 
        add_person_model.firstName = faker.person.firstName();

        await request.put(`user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(original_first_name).toEqual(updated_person.firstName)
    });

    test.skip('should response with status code 200 when update person lastName', async ({ request }) => {
        const original_last_name = add_person_model.lastName; 
        add_person_model.lastName = faker.person.lastName();

        await request.put(`user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(original_last_name).toEqual(updated_person.lastName)
    });

    test.skip('should response with status code 200 when update person email', async ({ request }) => {
        const original_person_email = add_person_model.email;
        add_person_model.email = faker.internet.email();

        await request.put(`user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(original_person_email).toEqual(updated_person.email)
    });

    test.skip('should response with status code 200 when update person password', async ({ request }) => {
        const original_person_password = add_person_model.password;
        add_person_model.password = faker.internet.password();

        await request.put(`user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(original_person_password).toEqual(updated_person.password)
    });

    test.skip('should response with status code 200 when update person phone', async ({ request }) => {
        const original_person_phone = add_person_model.phone;
        add_person_model.phone = faker.phone.imei();

        await request.put(`user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(original_person_phone).toEqual(updated_person.phone)
    });
})