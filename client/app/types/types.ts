/* UI types */
export type DrawerTypes =
    | "reports"
    | "newsroom"
    | "dashboard"
    | "controller"
    | "profile"
    | "settings"
    | "";

/* General Types used throughout the App */
export type User = {
    model?: "User",
    _id: string,
    name: string,
    role?: Role,
};

export type Team = {
    _id?: string,
    name: string,
    shortName?: string,
    code: string,
    roles?: Role[],
    prTrack?: number[],
    prLevel?: number
    type?: 'N' | 'M' | 'P' | 'C'
};

export type Role = {
    _id: string,
    model: "Role",
    title: string,
    type: string,
    user?: User,
    team?: Team,
}

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
    self?: boolean,
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
    status: "In Progress" | "Published" | 'New',
    author: User | string,
    team: Team | string,
    createdAt: string,
    headline: string,
    body: string,
    comments: Comment[]
    tags: string[],
};

export type Comment = {
    user: User,
    body: string,
    replies: Comment[],
}

export type Reaction = {
    user: string,
    emoji: string,
};

