import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTodoInput:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - start_date
 *        - end_date
 *      properties:
 *        title:
 *          type: string
 *          default: task name
 *        description:
 *          type: string
 *          default: task description
 *        start_date:
 *          type: string
 *          default: 2023-06-23
 *        end_date:
 *          type: string
 *          default: 2023-06-24
 *    CreateTodoResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        start_date:
 *          type: string
 *        end_date:
 *          type: string

 */

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