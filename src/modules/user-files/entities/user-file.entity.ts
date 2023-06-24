import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
