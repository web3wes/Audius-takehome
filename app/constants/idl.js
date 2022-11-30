export const IDL = {
    "version": "0.1.0",
    "name": "trakr",
    "constants": [
      {
        "name": "USER_TAG",
        "type": {
          "defined": "&[u8]"
        },
        "value": "b\"USER_STATE\""
      },
      {
        "name": "TODO_TAG",
        "type": {
          "defined": "&[u8]"
        },
        "value": "b\"TODO_STATE\""
      }
    ],
    "instructions": [
      {
        "name": "initializeUser",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "userProfile",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "addTrack",
        "accounts": [
          {
            "name": "userProfile",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trackAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "content",
            "type": "string"
          }
        ]
      },
      {
        "name": "markTrack",
        "accounts": [
          {
            "name": "userProfile",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trackAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "trackIdx",
            "type": "u8"
          }
        ]
      },
      {
        "name": "removeTodo",
        "accounts": [
          {
            "name": "userProfile",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trackAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "trackIdx",
            "type": "u8"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "UserProfile",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "lastTrack",
              "type": "u8"
            },
            {
              "name": "trackCount",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "TrackAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "idx",
              "type": "u8"
            },
            {
              "name": "content",
              "type": "string"
            },
            {
              "name": "marked",
              "type": "bool"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "Unauthorized",
        "msg": "You are not authorized to perform this action."
      },
      {
        "code": 6001,
        "name": "NotAllowed",
        "msg": "Not allowed"
      },
      {
        "code": 6002,
        "name": "MathOverflow",
        "msg": "Math operation overflow"
      },
      {
        "code": 6003,
        "name": "AlreadyMarked",
        "msg": "Already marked"
      }
    ],
    "metadata": {
      "address": "2WVA8UVVMAXbCCKD5Mf3konR6fVgghCHysk9An4mZR1Q"
    }
  }