import { overrideValueOrUseDefault } from '@/utils/guard';
import { faker } from '@faker-js/faker';
import { type Sample } from '../../_types/sample';

export function makeFakeSample(args?: Partial<Sample>) {
  return {
    id: overrideValueOrUseDefault(args?.id, faker.number.int()),
    title: overrideValueOrUseDefault(args?.title, faker.lorem.sentence()),
    body: overrideValueOrUseDefault(args?.body, faker.lorem.paragraph()),
    userId: overrideValueOrUseDefault(args?.userId, faker.number.int()),
  } satisfies Sample;
}
