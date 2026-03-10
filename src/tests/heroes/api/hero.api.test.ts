import { heroApi } from "@/heroes/api/hero.api";
import { describe, expect, test } from "vitest";

const BASE_URL = import.meta.env.VITE_API_URL;

describe('HeroApi', () => {
    test('Should be configure pointing to the testing server', () => {

        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
        expect(BASE_URL).toContain('3001');

    })
})