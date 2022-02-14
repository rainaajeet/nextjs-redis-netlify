import { Client, Entity, Schema } from "redis-om";

class GitRepo extends Entity {}

let schema = new Schema(GitRepo, {
  login: { type: "string" },
  url: { type: "string" },
  avatar_url: { type: "string" },
  type: { type: "string" },
  public_repos: { type: "number" },
  followers: { type: "number" },
  following: { type: "number" },
  time: { type: "number" },
});

const client = new Client();

export default async function getRepository() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_OM_URL ?? "redis-18931.c264.ap-south-1-1.ec2.cloud.redislabs.com:18931");
  }

  const repository = client.fetchRepository(schema);

  //  await repository.createIndex();

  return repository;
}
