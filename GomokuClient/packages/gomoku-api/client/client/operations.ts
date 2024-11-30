export const operations = {
    "get_api-game-anonymous-gameid-history": {
        "path": "/api/game/anonymous/:gameId/history",
        "method": "get"
    },
    "get_api-game-anonymous-available-to-join": {
        "path": "/api/game/anonymous/available-to-join",
        "method": "get"
    },
    "get_api-game-anonymous-active": {
        "path": "/api/game/anonymous/active",
        "method": "get"
    },
    "post_api-game-anonymous": {
        "path": "/api/game/anonymous",
        "method": "post"
    },
    "post_api-game-anonymous-gameid-join": {
        "path": "/api/game/anonymous/:gameId/join",
        "method": "post"
    },
    "get_health": {
        "path": "/health",
        "method": "get"
    },
    "get_api-profiles-username-games": {
        "path": "/api/profiles/:userName/games",
        "method": "get"
    },
    "get_api-v1-rapfi-test": {
        "path": "/api/v1/rapfi/test",
        "method": "get"
    },
    "get_api-game-registered-gameid-history": {
        "path": "/api/game/registered/:gameId/history",
        "method": "get"
    },
    "get_api-game-registered-available-to-join": {
        "path": "/api/game/registered/available-to-join",
        "method": "get"
    },
    "get_api-game-registered-active": {
        "path": "/api/game/registered/active",
        "method": "get"
    },
    "post_api-game-registered": {
        "path": "/api/game/registered",
        "method": "post"
    },
    "post_api-game-registered-gameid-join": {
        "path": "/api/game/registered/:gameId/join",
        "method": "post"
    },
    "post_gamehub-anonymous-joingamegroup": {
        "path": "/gamehub/anonymous/JoinGameGroup",
        "method": "post"
    },
    "post_gamehub-anonymous-getclock": {
        "path": "/gamehub/anonymous/GetClock",
        "method": "post"
    },
    "post_gamehub-anonymous-makemove": {
        "path": "/gamehub/anonymous/MakeMove",
        "method": "post"
    },
    "post_gamehub-anonymous-requestundo": {
        "path": "/gamehub/anonymous/RequestUndo",
        "method": "post"
    },
    "post_gamehub-anonymous-approveundo": {
        "path": "/gamehub/anonymous/ApproveUndo",
        "method": "post"
    },
    "post_gamehub-anonymous-resign": {
        "path": "/gamehub/anonymous/Resign",
        "method": "post"
    },
    "post_gamehub-anonymous-requestrematch": {
        "path": "/gamehub/anonymous/RequestRematch",
        "method": "post"
    },
    "post_gamehub-anonymous-approverematch": {
        "path": "/gamehub/anonymous/ApproveRematch",
        "method": "post"
    },
    "post_gamehub-anonymous-sendmessage": {
        "path": "/gamehub/anonymous/SendMessage",
        "method": "post"
    },
    "post_gamehub-anonymous-sendinvitationtoplay": {
        "path": "/gamehub/anonymous/SendInvitationToPlay",
        "method": "post"
    },
    "post_gamehub-registered-joingamegroup": {
        "path": "/gamehub/registered/JoinGameGroup",
        "method": "post"
    },
    "post_gamehub-registered-getclock": {
        "path": "/gamehub/registered/GetClock",
        "method": "post"
    },
    "post_gamehub-registered-makemove": {
        "path": "/gamehub/registered/MakeMove",
        "method": "post"
    },
    "post_gamehub-registered-requestundo": {
        "path": "/gamehub/registered/RequestUndo",
        "method": "post"
    },
    "post_gamehub-registered-approveundo": {
        "path": "/gamehub/registered/ApproveUndo",
        "method": "post"
    },
    "post_gamehub-registered-resign": {
        "path": "/gamehub/registered/Resign",
        "method": "post"
    },
    "post_gamehub-registered-requestrematch": {
        "path": "/gamehub/registered/RequestRematch",
        "method": "post"
    },
    "post_gamehub-registered-approverematch": {
        "path": "/gamehub/registered/ApproveRematch",
        "method": "post"
    },
    "post_gamehub-registered-sendmessage": {
        "path": "/gamehub/registered/SendMessage",
        "method": "post"
    },
    "post_gamehub-registered-sendinvitationtoplay": {
        "path": "/gamehub/registered/SendInvitationToPlay",
        "method": "post"
    }
} as const;