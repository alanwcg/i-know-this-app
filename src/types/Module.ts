import { Technology } from "./Technology";

type UserModule = {
  id: string;
  user_id: string;
  level_id: string;
  module_id: string;
  progression: 3,
}

export type Module = {
  id: string;
  name: string;
  content: string;
  links: string;
  level_id: string;
  technology_id: string;
  technology: Technology;
  userModules: UserModule[];
}