import { Factory, Seeder } from "typeorm-seeding";

import UserId from "../../../../types/entity/ids/UserId";
import Friend from "../entities/Friend";

export default class CreateFriendships1647732298662 implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Friend)().create({
      userId: 1 as UserId,
      friendId: 2 as UserId,
      accepted: true,
    });
    await factory(Friend)().create({
      userId: 1 as UserId,
      friendId: 3 as UserId,
      accepted: true,
    });
    await factory(Friend)().create({
      userId: 1 as UserId,
      friendId: 4 as UserId,
    });
    await factory(Friend)().create({
      userId: 1 as UserId,
      friendId: 5 as UserId,
    });
    await factory(Friend)().create({
      userId: 1 as UserId,
      friendId: 6 as UserId,
    });
    await factory(Friend)().create({
      userId: 1 as UserId,
      friendId: 7 as UserId,
    });
    await factory(Friend)().create({
      userId: 1 as UserId,
      friendId: 8 as UserId,
    });
  }
}
