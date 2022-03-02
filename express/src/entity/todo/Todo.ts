import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
class Todo {
  @PrimaryGeneratedColumn()
  id: number = Number()

  @Column()
  name: string = String()

  @Column()
  is_complete: boolean = Boolean()
}

export default Todo
