import type {Config} from 'jest';

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.ts?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json'
			}
		]
	},
	roots:['./tests/'],
	testMatch: ['**/?(*.)test.ts'],
	testTimeout: 3200,
	moduleNameMapper: {
        "\\.(svg)$": "<rootDir>/tests/__mocks__/svg_mock.ts",
    }
  };
};

