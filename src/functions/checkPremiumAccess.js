import tasks from "../utils/Mock.js";

function checkPremiumAccess(req, res, next) {

    // 1. OBTAINS THE ROLE FROM THE HEADER
    const role = req.headers["x-user-role"];

    // 2. OBTAINS THE TASK ID
    const taskId = parseInt(req.params.id);

    // 3. OBTAIN THE TASK
    const task = tasks.find(t => t.id === taskId);

    // 4. VALIDATE IF IT EXISTS
    if (!task) {
        return res.status(404).json({
            message: "Task no encontrada"
        });
    }

    // 5. ACCESS RULE
    if (task.tier === "premium" && role !== "admin") {
        return res.status(403).json({
            message: "403 Forbidden - You have no access to this premium task"
        });
    }

    // 6. CONTINUES
    next();
}

export default checkPremiumAccess;