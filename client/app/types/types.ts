/* UI types */
export type DrawerTypes =
    | "reports"
    | "newsroom"
    | "dashboard"
    | "controller"
    | "";

/* General Types used throughout the App */
export type Timestamp = {
    turn: number,
    phase: string,
    clock: Date
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

export type Article = {
    id: string,
    status: "In Progress" | "Published",
    publisher: string,
    location: string,
    headline: string,
    body: string,
    reactions: Reaction[],
    comments: [
        
    ]
    published: boolean,
};

export type Comment = {
    user: string,
    comment: string,
    timestamp: {
        turn: string,
        phase: string,
        turnNum: number,
        clock: string
    }
}

export type Reaction = {
    user: string,
    emoji: string,
};

