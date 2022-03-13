import * as Faker from "faker";
import { define } from "typeorm-seeding";

import User from "../entities/User";

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.password = faker.internet.password();
  user.username = faker.internet.userName();
  user.balance = faker.random.number(100000);
  return user;
});
