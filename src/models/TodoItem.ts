import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class TodoItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    start_date: Date

    @Column()
    end_date: Date
}