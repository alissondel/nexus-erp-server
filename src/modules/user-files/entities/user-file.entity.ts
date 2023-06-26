import { UserEntity } from 'src/modules/users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('user_file')
export class UserFileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, unique: true })
  fileName: string

  @Column({ nullable: false })
  contentLength: number

  @Column({ nullable: false })
  contentType: string

  @Column({ nullable: false })
  url: string

  @Column()
  userId: number

  @ManyToOne(() => UserEntity, (user) => user.userFiles)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: UserEntity
}
