import { TasksByStatus } from "types";

export const buildTasksByStatusChart = (tasks : TasksByStatus[]) => {
    const labels = tasks.map(task => task.status);
    const series = tasks.map(task => task.sum);

    return {
        labels, 
        series
    };
};