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
    bio: string;
    verified: boolean;
    roles : Role[];
    postsId: number[];
    commentsId: number[];
    followingId: number[];
    followersId: number[];
    postsLikedId: number[];
}

export type Role = {
    id: number;
    authority : string;
}

export type Post = {
    id: number;
    title: string;
    description: string;
    date: string;
    user: User;
    comments: Comment[];
    likes: User[];
}

export type Comment = {
    id: number;
    description: string;
    userId: number;
    postId : number;
}
