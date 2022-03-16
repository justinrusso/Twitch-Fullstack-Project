import { Factory, Seeder } from "typeorm-seeding";

import UserId from "../../../../types/entity/ids/UserId";
import User from "../entities/User";

export default class CreateUsers1647126166881 implements Seeder {
  public async run(factory: Factory): Promise<void> {
    // Create a demo user before others
    await factory(User)().create({
      id: 1 as UserId,
      firstName: "Demo",
      lastName: "User",
      username: "demouser",
    });

    await factory(User)().createMany(10);
  }
}
