import { getHeroAction } from "@/heroes/actions/get-hero.action"
import { describe, test, expect } from "vitest"

const BASE_URL = import.meta.env.VITE_API_URL;

describe('getHeroAction', () => {
    test('should fetch hero data and return with complete image url', async () => {
        const result = await getHeroAction('clark-kent');
        // Esto valida la estructura
        expect(result).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
            alias: expect.any(String),
            powers: expect.arrayContaining([expect.any(String)]),
            description: expect.any(String),
            strength: expect.any(Number),
            intelligence: expect.any(Number),
            speed: expect.any(Number),
            durability: expect.any(Number),
            team: expect.any(String),
            image: expect.any(String),
            firstAppearance: expect.any(String),
            status: expect.any(String),
            category: expect.any(String),
            universe: expect.any(String)
        })

        // Esto valida la data
        expect(result).toStrictEqual({
            id: '1',
            name: 'Clark Kent',
            slug: 'clark-kent',
            alias: 'Superman',
            powers: [
                'Súper fuerza',
                'Vuelo',
                'Visión de calor',
                'Visión de rayos X',
                'Invulnerabilidad',
                'Súper velocidad'
            ],
            description: 'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
            strength: 10,
            intelligence: 8,
            speed: 9,
            durability: 10,
            team: 'Liga de la Justicia',
            image: 'http://localhost:3001/images/1.jpeg',
            firstAppearance: '1938',
            status: 'Active',
            category: 'Hero',
            universe: 'DC'
        })
        expect(result.image).toEqual(`${BASE_URL}/images/${result.image.slice(result.image.lastIndexOf('/') + 1)}`)
    })

    test('should throw an error if hero is not found', async () => {
        const result = await getHeroAction('testing-hero').catch((error) => {
            expect(error).toBeDefined();
            expect(error.message).toBe('Request failed with status code 404');
        })

        expect(result).toBeUndefined();
    })
})