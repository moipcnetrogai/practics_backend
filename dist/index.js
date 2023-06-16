import express from "express";
const app = express();
import cors from "cors";
import pool from "./db.js";
import { DataSource } from "typeorm";
import { TodoItem } from "./models/TodoItem.js";
app.use(cors());
app.use(express.json());
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
});
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
//ROUTES
//POST
const TodoRepository = AppDataSource.getRepository(TodoItem);
app.post("/todos", async (req, res) => {
    try {
        const { title, description, start_date, end_date } = req.body;
        const todoItem = await TodoRepository.save({
            title,
            description,
            start_date,
            end_date
        });
        res.json(todoItem);
    }
    catch (err) {
        console.error(err.message);
    }
});
//GET
app.get("/todos", async (req, res) => {
    try {
        const TodoRepository = AppDataSource.getRepository(TodoItem);
        const allTodos = await TodoRepository.find();
        res.json(allTodos);
    }
    catch (err) {
        console.error(err.message);
    }
});
//GET A TODO
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM zametki WHERE id=$1", [id]);
        res.json(todo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
});
//UPDATE
app.put("/todos/:id", async (req, res) => {
    try { //ДОБАВИТЬ!!!!!!!!
        const { id } = req.params;
        const { zagolovok } = req.body;
        const updateTodo = await pool.query("UPDATE zametki SET zagolovok = $1 WHERE id = $2", [zagolovok, id]);
        res.json("Todo was updated!");
    }
    catch (err) {
        console.error(err.message);
    }
});
//DELETE
app.delete("/todos/:id", async (req, res) => {
    try { //ДОБАВИТЬ!!!!!!!!
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM zametki WHERE id = $1", [id]);
        res.json("Todo was deleted!");
    }
    catch (err) {
        console.error(err.message);
    }
});
app.listen(5000, () => {
    console.log("сервер запущен");
});
/*import React, { Fragment, Component, useState } from "react";


const InputTodo = () => {
    const [zagolovok, setZagolovok] = useState("");
    const [opisanie, setOpisanie] = useState("");
    const [data_nachala, setData_nachala] = useState("");
    const [data_okonchania, setData_okonchania] = useState("");
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { zagolovok, opisanie, data_nachala, data_okonchania };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log(response);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return ( <Fragment >
        <h1 > Добавить заметки </h1>
        <form onSubmit = { onSubmitForm } >

        <input type = "text"
        value = { zagolovok }
        onChange = { e => setZagolovok(e.target.value) }
        />

        <input type = "text"
        value = { opisanie }
        onChange = { e => setOpisanie(e.target.value) }
        />

        <input type = "text"
        value = { data_nachala }
        onChange = { e => setData_nachala(e.target.value) }
        />

        <input type = "text"
        value = { data_okonchania }
        onChange = { e => setData_okonchania(e.target.value) }
        />






        <button > Добавить </button> </form>

        </Fragment>
    )
}

export default InputTodo;*/ 
//# sourceMappingURL=index.js.map