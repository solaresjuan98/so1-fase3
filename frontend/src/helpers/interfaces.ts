export interface Logs {
    _id: ID;
    game_id: string;
    players: string;
    game_name: string;
    winner: string;
    queuename?: string;
    queue?: string;
}

export interface ID {
    $oid: string;
}
