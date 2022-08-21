export class Lead {
  leadId!: string;

  email?: string | null;

  phone?: string | null;

  name?: string | null;

  age?: number | null;

  valor_total_plano?: number | null;

  status!: string;

  obs?: string | null;

  createdAt!: Date;

  updatedAt?: Date | null;

  userIdFk!: string;
}
