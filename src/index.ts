import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import { DataSource } from "typeorm";

import { TodoItem } from "./models/TodoItem.js";
import swaggerDocs from './swagger.js'

app.use(cors());
app.use(express.json())



const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "rkis3_user",
    password: "123",
    database: "todo",
    synchronize: true,
    entities: [
        TodoItem
    ]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

//ROUTES
//POST
      /**
   * @openapi
   * /todos:
   *  get:
   *     tags:
   *        - ToDoList
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
const TodoRepository = AppDataSource.getRepository(TodoItem)
 /**
   * @openapi
   * '/todos':
   *  post:
   *     tags:
   *        - ToDoList
   *     summary: sending data
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateTodoInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateTodoResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
app.post("/todos", async (req: Request, res: Response) => {

    try {

        const { title, description, start_date, end_date } = req.body as TodoItem

        const todoItem = await TodoRepository.save({
            title,
            description,
            start_date,
            end_date
        })
        res.json(todoItem);


    } catch (err) {
        console.error(err.message);
    }
});
 /**
   * @openapi
   * '/todos:id':
   *  put:
   *     tags:
   *        - ToDoList
   *     summary: sending data
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

//GET
app.get("/todos", async (req, res) => {

    try {
        const TodoRepository = AppDataSource.getRepository(TodoItem)

        const allTodos = await TodoRepository.find()

        res.json(allTodos);

    } catch (err) {
        console.error(err.message)
    }
});
 /**
   * @openapi
   * '/todos:id':
   *  delete:
   *     tags:
   *        - ToDoList
   *     summary: sending data
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
//GET A TODO
app.get("/todos/:id", async (req, res) => {
        try {
            const { id } = req.params;

            const todo = await TodoRepository.findOne({where: { id: Number(id) }})
            res.json(todo);

        } catch (err) {
            console.error(err.message);
        }
})

//UPDATE
app.put("/todos/:id", async (req, res) => {
    try { //ДОБАВИТЬ!!!!!!!!
        const { id } = req.params;
        
        const { title, description, start_date, end_date } = req.body as TodoItem;

        await TodoRepository.update({ id: Number(id) },{
            title,
            description,
            start_date,
            end_date
        })
        const todoItem = await TodoRepository.findOne({where: { id: Number(id) }})

        res.json(todoItem);

    } catch (err) {
        console.error(err.message);
    }
});

//DELETE
app.delete("/todos/:id", async (req, res) => {
    try { 
        const { id } = req.params;
        await TodoRepository.delete(id)
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    swaggerDocs(app);
    console.log("сервер запущен");
    
});