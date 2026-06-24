import checkPremiumAccess from "../functions/checkPremiumAccess.js";
import express from "express"
import tasks from "../utils/Mock.js";

const app = express();
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "../views");


const port = 3000;

/* GET - GET ALL THE TASKS */
app.get("/", (req, res) => {
    res.render('home');
});

//RENDER THE TASKS LIST
app.get("/api/show_tasks", (req, res) => {
    res.render('tasksList', {
        tasks
    });
});

app.get("/api/create_task", (req, res) => {
    
    const lastTask = tasks.at(tasks.length - 1);

    res.render('setNew', {
        tasks: lastTask ? [lastTask] : []
    });
});


/* POST - CREATE A NEW TASK */
app.post("/api/create_tasks", (req, res) => {
    
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
app.patch("/api/task/:id", checkPremiumAccess, (req, res) => {
    const id = Number.parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    task.completed = !task.completed;

    res.json(task);
});

app.listen(port, () => {
    console.log("SERVER RUNNING AT: " + port);
});