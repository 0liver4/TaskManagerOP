import checkPremiumAccess from "../functions/checkPremiumAccess.js";
import express from "express"
import tasks from "../utils/Mock.js";

const app = express();
app.use(express.json());

const port = 3000;

/* GET - GET ALL THE TASKS */
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

/* POST - CREATE A NEW TASK */
app.post("/api/tasks", (req, res) => {
    
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
        tier: req.body.tier || "basic"
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

/* PATCH - CHANGES STATE */
app.patch("/api/tasks/:id", checkPremiumAccess, (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    task.completed = !task.completed;

    res.json(task);
});

app.listen(port, () => {
    console.log("SERVER RUNNING AT: " + port);
});