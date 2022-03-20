import * as Faker from "faker";
import { define } from "typeorm-seeding";

import Friend from "../entities/Friend";

define(Friend, (faker: typeof Faker) => {
  const friend = new Friend();
  friend.accepted = Boolean(faker.random.number(1));
  const date = faker.date.recent(30);
  friend.createdAt = date;
  friend.updatedAt = date;
  return friend;
});
