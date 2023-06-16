export type SpringPage<T> = {
    content: T[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty: boolean;
};

export type User = {
    id:number;
    name: string;
    email: string;
    password: string;
    imgUrl: string;
    roles : Role[];
    notifications: Notification[];
    commentsId: number[];
    groupsId: number[];
    works: Work[];
    tasks: Task[];
    tasksFollowing: Task[];
    totalWorkTime: number;
}

export type Role = {
    id: number;
    authority : string;
}

export type Task = {
    id: number;
    title: string;
    description: string;
    startDate: string;
    status: string;
    totalWorkTime: number;
    creatorId: number;
    followersId: number[];
    works: Work[];
    comments: Comment[];
    usersWorkTime: Record<string, number>;
}

export type Group = {
    id: number;
    name: string;
    totalWorkTime: number;
    users: User[];
}

export type Comment = {
    id: number;
    text: string;
    dateTime: string;
    author: User;
    taskId : number;
}

export type Work = {
    id: number;
    totalTime: number;
    employeeId: number;
    taskId: number;
    dateTimeStart: string;
    dateTimeEnd: string;
}

export type Notification = {
    id: number;
    description: string;
    moment: string;
    read: boolean;
    userId: number;
}

export type PieChartConfig = {
    labels: string[];
    series: number[];
}

export type TasksByStatus = {
    status: string;
    sum: number;
}
