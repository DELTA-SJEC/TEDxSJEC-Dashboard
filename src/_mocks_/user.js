import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  email: faker.internet.email(),
  status: sample(['active', 'banned']),
  amount: faker.finance.amount(),
  paymentId: faker.datatype.uuid()
}));

export default users;
