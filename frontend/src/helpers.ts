import { TasksByStatus } from "types";

export const buildTasksByStatusChart = (tasks : TasksByStatus[]) => {
    const labels = tasks.map(task => task.status);
    const series = tasks.map(task => task.sum);

    return {
        labels, 
        series
    };
};

export const convertTimeToHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min `;
};