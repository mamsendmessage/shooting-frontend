export enum Result {
    SUCCESS = 0,
    ERROR = -1,
}

export enum TicketState {
    "Waiting" = 0,
    "In Game" = 1,
    "Planned" = 2,
    "Finished" = 3,
    "Ready"=4
}

export enum UserType {
    "New Registration" = 1,
    "Already Registered" = 2
}

export enum TicketType {
    "Online" = 1,
    "Promotion" = 2,
    "Walk Through " = 3
}


export enum PlayerLevel {
    "Beginner" = 1,
    "Intermediate" = 2,
    "Professional" = 3,
    "Competition" = 4
}

export enum GameType {
    "Normal" = 1,
    "Special sessions" = 2,
    "Competition" = 3
}