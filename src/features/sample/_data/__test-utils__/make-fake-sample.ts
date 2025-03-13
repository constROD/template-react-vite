import { faker } from '@faker-js/faker';
import { type Sample } from '../../_types/sample';

export function makeFakeSample(overrides?: Partial<Sample>) {
  return {
    id: faker.number.int(),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    userId: faker.number.int(),
    ...overrides,
  } satisfies Sample;
}
