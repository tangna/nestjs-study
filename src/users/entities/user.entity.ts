import { Exclude, Expose, Transform } from 'class-transformer';
import { RoleEntity } from './role.entity';

export class UserEntity {
  id: number;
  /**
   * The firstName of the User
   * @example na
   */
  firstName: string;
  /**
   * The lastName of the User
   * @default tang
   */
  lastName: string;

  @Exclude()
  password: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Transform(({ value }) => value.name)
  role: RoleEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
