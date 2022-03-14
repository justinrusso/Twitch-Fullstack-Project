import { Factory, Seeder } from "typeorm-seeding";

import User from "../entities/User";

export default class CreateUsers1647126166881 implements Seeder {
  public async run(factory: Factory): Promise<void> {
    // Create a demo user before others
    await factory(User)().create({
      id: 1,
      firstName: "Demo",
      lastName: "User",
      username: "demouser",
    });

    await factory(User)().createMany(10);
  }
}
