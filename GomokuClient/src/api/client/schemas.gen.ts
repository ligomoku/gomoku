// This file is auto-generated by @hey-api/openapi-ts

export const GameInfoSchema = {
    type: 'object',
    properties: {
        gameId: {
            type: 'integer',
            format: 'int32'
        },
        yourTurn: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const MoveSchema = {
    type: 'object',
    properties: {
        gameId: {
            type: 'integer',
            format: 'int32'
        },
        player: {
            type: 'string',
            nullable: true
        },
        row: {
            type: 'integer',
            format: 'int32'
        },
        column: {
            type: 'integer',
            format: 'int32'
        }
    },
    additionalProperties: false
} as const;