/* UI types */
export type DrawerTypes =
    | "reports"
    | "newsroom"
    | "dashboard"
    | "controller"
    | "profile"
    | "";

/* General Types used throughout the App */
export type User = {
    // model: "User",
    _id: string,
    name: string,
    role: string,
    team: string,
};

export type Team = {
    name: String,
    shortName: String,
    code: String,
    roles: String[],
    users: User[]
    prTrack: number[]
    prLevel: number
};

export type Timestamp = {
    turn: number,
    phase: string,
    turnNum: number,
    clock: string
};

export type ToasterData = {
    type: "success" | "info" | "error"
    description: string
}

export type Client = {
    userID: string,
    username: string,
    self: boolean,
    team: string,
    role: string
}

/* Terror types used for the terror track */
export type Region = {
    name: string,
    code: string,
    terror: number,
    type: string
}

/* Types used by the Media subgame */
export type Post = {
    _id: string,
    status: "In Progress" | "Published",
    author: User,
    publisher: string,
    createdAt: string,
    // location: string,
    headline: string,
    body: string,
    // reactions: Reaction[],
    comments: Comment[]
    upvotes: number,
    tags: string[],
};

export type Comment = {
    user: User,
    body: string,
    replies: Comment[],
    // timestamp: {
    //     turn: string,
    //     phase: string,
    //     turnNum: number,
    //     clock: string
    // }
}

export type Reaction = {
    user: string,
    emoji: string,
};

