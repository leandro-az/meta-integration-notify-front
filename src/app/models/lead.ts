import { User } from "./user";

export class Lead {
  leadId!: string;

  email?: string | null;

  phone?: string | null;

  name?: string | null;

  age?: number | null;

  valor_total_plano?: number | null;

  status!: string;

  obs?: string | null;

  createdAt!: string;

  updatedAt?: string | null;

  userIdFk!: string;

  icon!: string

  userIdFk2?: User

}
