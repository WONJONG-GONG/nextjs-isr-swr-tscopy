import { test, expect, describe } from "@jest/globals";
import { fetchJsonDB } from "../jsonDB/getJsonDB";

describe('mock API test', () => {
    test('jsonDB/index: length should be 10', async () => {
        const arr = await fetchJsonDB('index');
        expect(arr.length).toBe(10);
    });
    test('jsonDB/each: length should be 10', async () => {
        const arr = await fetchJsonDB('each');
        expect(arr.length).toBe(10);
    });

    test('jsonDB/index: object should have `name`, `registered` properties', async () => {
        const arr = await fetchJsonDB('index');
        expect('name' in arr[0]).toBe(true);
        expect('registered' in arr[0]).toBe(true);
    });
    test('json/each: object should have `id`, `about` properties', async () => {
        const arr = await fetchJsonDB('each');
        expect('id' in arr[0]).toBe(true);
        expect('about' in arr[0]).toBe(true);
    });
});