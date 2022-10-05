import { Lead } from "./lead";

export class User{
  userId!: string;

  email!: string 

  phone!: string 

  name!: string 

  roleId!: number 

  createdAt!: string;

  updatedAt?: string 

  icon!: string

  leads?: Lead[];
}