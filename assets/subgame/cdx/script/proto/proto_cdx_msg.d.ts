import * as $protobuf from "protobufjs";
/** Namespace msg. */
export namespace msg {

    /** MessageID enum. */
    enum MessageID {
        MSG_Ping = 0,
        MSG_Pong = 1,
        MSG_Login_C2S = 2,
        MSG_Login_S2C = 3,
        MSG_Logout_C2S = 4,
        MSG_Logout_S2C = 5,
        MSG_JoinRoom_C2S = 6,
        MSG_JoinRoom_S2C = 7,
        MSG_EnterRoom_S2C = 8,
        MSG_LeaveRoom_C2S = 9,
        MSG_LeaveRoom_S2C = 10,
        MSG_ActionTime_S2C = 11,
        MSG_PlayerAction_C2S = 12,
        MSG_PlayerAction_S2C = 13,
        MSG_PotChangeMoney_S2C = 14,
        MSG_UptPlayerList_S2C = 15,
        MSG_ResultData_S2C = 16,
        MSG_BankerData_C2S = 17,
        MSG_BankerData_S2C = 18,
        MSG_EmojiChat_C2S = 19,
        MSG_EmojiChat_S2C = 20,
        MSG_SendActTime_S2C = 21
    }

    /** GameStep enum. */
    enum GameStep {
        XX_Step = 0,
        Banker = 1,
        Banker2 = 2,
        DownBet = 3,
        Settle = 4
    }

    /** PlayerStatus enum. */
    enum PlayerStatus {
        XX_Status = 0,
        PlayGame = 1,
        WatchGame = 2
    }

    /** BankerStatus enum. */
    enum BankerStatus {
        BankerNot = 0,
        BankerUp = 1,
        BankerDown = 2
    }

    /** PotType enum. */
    enum PotType {
        XX_Pot = 0,
        BigPot = 1,
        SmallPot = 2,
        SinglePot = 3,
        DoublePot = 4,
        PairPot = 5,
        StraightPot = 6,
        LeopardPot = 7
    }

    /** CardsType enum. */
    enum CardsType {
        XX_Card = 0,
        Pair = 1,
        Straight = 2,
        Leopard = 3
    }

    /** Properties of a Ping. */
    interface IPing {
    }

    /** Represents a Ping. */
    class Ping implements IPing {

        /**
         * Constructs a new Ping.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPing);

        /**
         * Creates a new Ping instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ping instance
         */
        public static create(properties?: msg.IPing): msg.Ping;

        /**
         * Encodes the specified Ping message. Does not implicitly {@link msg.Ping.verify|verify} messages.
         * @param message Ping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ping message, length delimited. Does not implicitly {@link msg.Ping.verify|verify} messages.
         * @param message Ping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Ping message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.Ping;

        /**
         * Decodes a Ping message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.Ping;

        /**
         * Verifies a Ping message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Ping message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ping
         */
        public static fromObject(object: { [k: string]: any }): msg.Ping;

        /**
         * Creates a plain object from a Ping message. Also converts values to other types if specified.
         * @param message Ping
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ping to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Pong. */
    interface IPong {

        /** Pong serverTime */
        serverTime?: (number|Long|null);
    }

    /** Represents a Pong. */
    class Pong implements IPong {

        /**
         * Constructs a new Pong.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPong);

        /** Pong serverTime. */
        public serverTime: (number|Long);

        /**
         * Creates a new Pong instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Pong instance
         */
        public static create(properties?: msg.IPong): msg.Pong;

        /**
         * Encodes the specified Pong message. Does not implicitly {@link msg.Pong.verify|verify} messages.
         * @param message Pong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Pong message, length delimited. Does not implicitly {@link msg.Pong.verify|verify} messages.
         * @param message Pong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Pong message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.Pong;

        /**
         * Decodes a Pong message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.Pong;

        /**
         * Verifies a Pong message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Pong message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Pong
         */
        public static fromObject(object: { [k: string]: any }): msg.Pong;

        /**
         * Creates a plain object from a Pong message. Also converts values to other types if specified.
         * @param message Pong
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Pong, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Pong to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerInfo. */
    interface IPlayerInfo {

        /** PlayerInfo Id */
        Id?: (string|null);

        /** PlayerInfo nickName */
        nickName?: (string|null);

        /** PlayerInfo headImg */
        headImg?: (string|null);

        /** PlayerInfo account */
        account?: (number|null);
    }

    /** Represents a PlayerInfo. */
    class PlayerInfo implements IPlayerInfo {

        /**
         * Constructs a new PlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerInfo);

        /** PlayerInfo Id. */
        public Id: string;

        /** PlayerInfo nickName. */
        public nickName: string;

        /** PlayerInfo headImg. */
        public headImg: string;

        /** PlayerInfo account. */
        public account: number;

        /**
         * Creates a new PlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerInfo instance
         */
        public static create(properties?: msg.IPlayerInfo): msg.PlayerInfo;

        /**
         * Encodes the specified PlayerInfo message. Does not implicitly {@link msg.PlayerInfo.verify|verify} messages.
         * @param message PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link msg.PlayerInfo.verify|verify} messages.
         * @param message PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerInfo;

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerInfo;

        /**
         * Verifies a PlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerInfo;

        /**
         * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
         * @param message PlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Login_C2S. */
    interface ILogin_C2S {

        /** Login_C2S Id */
        Id?: (string|null);

        /** Login_C2S PassWord */
        PassWord?: (string|null);

        /** Login_C2S Token */
        Token?: (string|null);
    }

    /** Represents a Login_C2S. */
    class Login_C2S implements ILogin_C2S {

        /**
         * Constructs a new Login_C2S.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILogin_C2S);

        /** Login_C2S Id. */
        public Id: string;

        /** Login_C2S PassWord. */
        public PassWord: string;

        /** Login_C2S Token. */
        public Token: string;

        /**
         * Creates a new Login_C2S instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Login_C2S instance
         */
        public static create(properties?: msg.ILogin_C2S): msg.Login_C2S;

        /**
         * Encodes the specified Login_C2S message. Does not implicitly {@link msg.Login_C2S.verify|verify} messages.
         * @param message Login_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILogin_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Login_C2S message, length delimited. Does not implicitly {@link msg.Login_C2S.verify|verify} messages.
         * @param message Login_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILogin_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Login_C2S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Login_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.Login_C2S;

        /**
         * Decodes a Login_C2S message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Login_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.Login_C2S;

        /**
         * Verifies a Login_C2S message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Login_C2S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Login_C2S
         */
        public static fromObject(object: { [k: string]: any }): msg.Login_C2S;

        /**
         * Creates a plain object from a Login_C2S message. Also converts values to other types if specified.
         * @param message Login_C2S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Login_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Login_C2S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Login_S2C. */
    interface ILogin_S2C {

        /** Login_S2C playerInfo */
        playerInfo?: (msg.IPlayerInfo|null);

        /** Login_S2C backroom */
        backroom?: (boolean|null);

        /** Login_S2C PlayerNum */
        PlayerNum?: (number|null);
    }

    /** Represents a Login_S2C. */
    class Login_S2C implements ILogin_S2C {

        /**
         * Constructs a new Login_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILogin_S2C);

        /** Login_S2C playerInfo. */
        public playerInfo?: (msg.IPlayerInfo|null);

        /** Login_S2C backroom. */
        public backroom: boolean;

        /** Login_S2C PlayerNum. */
        public PlayerNum: number;

        /**
         * Creates a new Login_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Login_S2C instance
         */
        public static create(properties?: msg.ILogin_S2C): msg.Login_S2C;

        /**
         * Encodes the specified Login_S2C message. Does not implicitly {@link msg.Login_S2C.verify|verify} messages.
         * @param message Login_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILogin_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Login_S2C message, length delimited. Does not implicitly {@link msg.Login_S2C.verify|verify} messages.
         * @param message Login_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILogin_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Login_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Login_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.Login_S2C;

        /**
         * Decodes a Login_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Login_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.Login_S2C;

        /**
         * Verifies a Login_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Login_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Login_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.Login_S2C;

        /**
         * Creates a plain object from a Login_S2C message. Also converts values to other types if specified.
         * @param message Login_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Login_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Login_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Logout_C2S. */
    interface ILogout_C2S {
    }

    /** Represents a Logout_C2S. */
    class Logout_C2S implements ILogout_C2S {

        /**
         * Constructs a new Logout_C2S.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILogout_C2S);

        /**
         * Creates a new Logout_C2S instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Logout_C2S instance
         */
        public static create(properties?: msg.ILogout_C2S): msg.Logout_C2S;

        /**
         * Encodes the specified Logout_C2S message. Does not implicitly {@link msg.Logout_C2S.verify|verify} messages.
         * @param message Logout_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILogout_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Logout_C2S message, length delimited. Does not implicitly {@link msg.Logout_C2S.verify|verify} messages.
         * @param message Logout_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILogout_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Logout_C2S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Logout_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.Logout_C2S;

        /**
         * Decodes a Logout_C2S message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Logout_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.Logout_C2S;

        /**
         * Verifies a Logout_C2S message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Logout_C2S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Logout_C2S
         */
        public static fromObject(object: { [k: string]: any }): msg.Logout_C2S;

        /**
         * Creates a plain object from a Logout_C2S message. Also converts values to other types if specified.
         * @param message Logout_C2S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Logout_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Logout_C2S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Logout_S2C. */
    interface ILogout_S2C {
    }

    /** Represents a Logout_S2C. */
    class Logout_S2C implements ILogout_S2C {

        /**
         * Constructs a new Logout_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILogout_S2C);

        /**
         * Creates a new Logout_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Logout_S2C instance
         */
        public static create(properties?: msg.ILogout_S2C): msg.Logout_S2C;

        /**
         * Encodes the specified Logout_S2C message. Does not implicitly {@link msg.Logout_S2C.verify|verify} messages.
         * @param message Logout_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILogout_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Logout_S2C message, length delimited. Does not implicitly {@link msg.Logout_S2C.verify|verify} messages.
         * @param message Logout_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILogout_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Logout_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Logout_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.Logout_S2C;

        /**
         * Decodes a Logout_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Logout_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.Logout_S2C;

        /**
         * Verifies a Logout_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Logout_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Logout_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.Logout_S2C;

        /**
         * Creates a plain object from a Logout_S2C message. Also converts values to other types if specified.
         * @param message Logout_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Logout_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Logout_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DownBetMoney. */
    interface IDownBetMoney {

        /** DownBetMoney BigDownBet */
        BigDownBet?: (number|null);

        /** DownBetMoney SmallDownBet */
        SmallDownBet?: (number|null);

        /** DownBetMoney SingleDownBet */
        SingleDownBet?: (number|null);

        /** DownBetMoney DoubleDownBet */
        DoubleDownBet?: (number|null);

        /** DownBetMoney PairDownBet */
        PairDownBet?: (number|null);

        /** DownBetMoney StraightDownBet */
        StraightDownBet?: (number|null);

        /** DownBetMoney LeopardDownBet */
        LeopardDownBet?: (number|null);
    }

    /** Represents a DownBetMoney. */
    class DownBetMoney implements IDownBetMoney {

        /**
         * Constructs a new DownBetMoney.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IDownBetMoney);

        /** DownBetMoney BigDownBet. */
        public BigDownBet: number;

        /** DownBetMoney SmallDownBet. */
        public SmallDownBet: number;

        /** DownBetMoney SingleDownBet. */
        public SingleDownBet: number;

        /** DownBetMoney DoubleDownBet. */
        public DoubleDownBet: number;

        /** DownBetMoney PairDownBet. */
        public PairDownBet: number;

        /** DownBetMoney StraightDownBet. */
        public StraightDownBet: number;

        /** DownBetMoney LeopardDownBet. */
        public LeopardDownBet: number;

        /**
         * Creates a new DownBetMoney instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DownBetMoney instance
         */
        public static create(properties?: msg.IDownBetMoney): msg.DownBetMoney;

        /**
         * Encodes the specified DownBetMoney message. Does not implicitly {@link msg.DownBetMoney.verify|verify} messages.
         * @param message DownBetMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IDownBetMoney, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DownBetMoney message, length delimited. Does not implicitly {@link msg.DownBetMoney.verify|verify} messages.
         * @param message DownBetMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IDownBetMoney, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DownBetMoney message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DownBetMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.DownBetMoney;

        /**
         * Decodes a DownBetMoney message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DownBetMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.DownBetMoney;

        /**
         * Verifies a DownBetMoney message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DownBetMoney message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DownBetMoney
         */
        public static fromObject(object: { [k: string]: any }): msg.DownBetMoney;

        /**
         * Creates a plain object from a DownBetMoney message. Also converts values to other types if specified.
         * @param message DownBetMoney
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.DownBetMoney, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DownBetMoney to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PotWinList. */
    interface IPotWinList {

        /** PotWinList resultNum */
        resultNum?: (number|null);

        /** PotWinList bigSmall */
        bigSmall?: (number|null);

        /** PotWinList sinDouble */
        sinDouble?: (number|null);

        /** PotWinList cardType */
        cardType?: (msg.CardsType|null);
    }

    /** Represents a PotWinList. */
    class PotWinList implements IPotWinList {

        /**
         * Constructs a new PotWinList.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPotWinList);

        /** PotWinList resultNum. */
        public resultNum: number;

        /** PotWinList bigSmall. */
        public bigSmall: number;

        /** PotWinList sinDouble. */
        public sinDouble: number;

        /** PotWinList cardType. */
        public cardType: msg.CardsType;

        /**
         * Creates a new PotWinList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PotWinList instance
         */
        public static create(properties?: msg.IPotWinList): msg.PotWinList;

        /**
         * Encodes the specified PotWinList message. Does not implicitly {@link msg.PotWinList.verify|verify} messages.
         * @param message PotWinList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPotWinList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PotWinList message, length delimited. Does not implicitly {@link msg.PotWinList.verify|verify} messages.
         * @param message PotWinList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPotWinList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PotWinList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PotWinList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PotWinList;

        /**
         * Decodes a PotWinList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PotWinList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PotWinList;

        /**
         * Verifies a PotWinList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PotWinList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PotWinList
         */
        public static fromObject(object: { [k: string]: any }): msg.PotWinList;

        /**
         * Creates a plain object from a PotWinList message. Also converts values to other types if specified.
         * @param message PotWinList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PotWinList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PotWinList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerData. */
    interface IPlayerData {

        /** PlayerData playerInfo */
        playerInfo?: (msg.IPlayerInfo|null);

        /** PlayerData downBetMoney */
        downBetMoney?: (msg.IDownBetMoney|null);

        /** PlayerData status */
        status?: (msg.PlayerStatus|null);

        /** PlayerData bankerMoney */
        bankerMoney?: (number|null);

        /** PlayerData bankerCount */
        bankerCount?: (number|null);

        /** PlayerData totalDownBet */
        totalDownBet?: (number|null);

        /** PlayerData winTotalCount */
        winTotalCount?: (number|null);

        /** PlayerData resultMoney */
        resultMoney?: (number|null);

        /** PlayerData potWinList */
        potWinList?: (msg.IPotWinList[]|null);

        /** PlayerData downBetHistory */
        downBetHistory?: (msg.IDownBetHistory[]|null);

        /** PlayerData IsAction */
        IsAction?: (boolean|null);

        /** PlayerData IsBanker */
        IsBanker?: (boolean|null);

        /** PlayerData IsRobot */
        IsRobot?: (boolean|null);
    }

    /** Represents a PlayerData. */
    class PlayerData implements IPlayerData {

        /**
         * Constructs a new PlayerData.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerData);

        /** PlayerData playerInfo. */
        public playerInfo?: (msg.IPlayerInfo|null);

        /** PlayerData downBetMoney. */
        public downBetMoney?: (msg.IDownBetMoney|null);

        /** PlayerData status. */
        public status: msg.PlayerStatus;

        /** PlayerData bankerMoney. */
        public bankerMoney: number;

        /** PlayerData bankerCount. */
        public bankerCount: number;

        /** PlayerData totalDownBet. */
        public totalDownBet: number;

        /** PlayerData winTotalCount. */
        public winTotalCount: number;

        /** PlayerData resultMoney. */
        public resultMoney: number;

        /** PlayerData potWinList. */
        public potWinList: msg.IPotWinList[];

        /** PlayerData downBetHistory. */
        public downBetHistory: msg.IDownBetHistory[];

        /** PlayerData IsAction. */
        public IsAction: boolean;

        /** PlayerData IsBanker. */
        public IsBanker: boolean;

        /** PlayerData IsRobot. */
        public IsRobot: boolean;

        /**
         * Creates a new PlayerData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerData instance
         */
        public static create(properties?: msg.IPlayerData): msg.PlayerData;

        /**
         * Encodes the specified PlayerData message. Does not implicitly {@link msg.PlayerData.verify|verify} messages.
         * @param message PlayerData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerData message, length delimited. Does not implicitly {@link msg.PlayerData.verify|verify} messages.
         * @param message PlayerData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerData;

        /**
         * Decodes a PlayerData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerData;

        /**
         * Verifies a PlayerData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerData
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerData;

        /**
         * Creates a plain object from a PlayerData message. Also converts values to other types if specified.
         * @param message PlayerData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DownBetHistory. */
    interface IDownBetHistory {

        /** DownBetHistory timeFmt */
        timeFmt?: (string|null);

        /** DownBetHistory resNum */
        resNum?: (number[]|null);

        /** DownBetHistory result */
        result?: (number|null);

        /** DownBetHistory sinDouble */
        sinDouble?: (number|null);

        /** DownBetHistory bigSmall */
        bigSmall?: (number|null);

        /** DownBetHistory cardType */
        cardType?: (msg.CardsType|null);

        /** DownBetHistory downBetMoney */
        downBetMoney?: (msg.IDownBetMoney|null);
    }

    /** Represents a DownBetHistory. */
    class DownBetHistory implements IDownBetHistory {

        /**
         * Constructs a new DownBetHistory.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IDownBetHistory);

        /** DownBetHistory timeFmt. */
        public timeFmt: string;

        /** DownBetHistory resNum. */
        public resNum: number[];

        /** DownBetHistory result. */
        public result: number;

        /** DownBetHistory sinDouble. */
        public sinDouble: number;

        /** DownBetHistory bigSmall. */
        public bigSmall: number;

        /** DownBetHistory cardType. */
        public cardType: msg.CardsType;

        /** DownBetHistory downBetMoney. */
        public downBetMoney?: (msg.IDownBetMoney|null);

        /**
         * Creates a new DownBetHistory instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DownBetHistory instance
         */
        public static create(properties?: msg.IDownBetHistory): msg.DownBetHistory;

        /**
         * Encodes the specified DownBetHistory message. Does not implicitly {@link msg.DownBetHistory.verify|verify} messages.
         * @param message DownBetHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IDownBetHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DownBetHistory message, length delimited. Does not implicitly {@link msg.DownBetHistory.verify|verify} messages.
         * @param message DownBetHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IDownBetHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DownBetHistory message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DownBetHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.DownBetHistory;

        /**
         * Decodes a DownBetHistory message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DownBetHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.DownBetHistory;

        /**
         * Verifies a DownBetHistory message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DownBetHistory message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DownBetHistory
         */
        public static fromObject(object: { [k: string]: any }): msg.DownBetHistory;

        /**
         * Creates a plain object from a DownBetHistory message. Also converts values to other types if specified.
         * @param message DownBetHistory
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.DownBetHistory, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DownBetHistory to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HistoryData. */
    interface IHistoryData {

        /** HistoryData timeFmt */
        timeFmt?: (string|null);

        /** HistoryData resNum */
        resNum?: (number[]|null);

        /** HistoryData result */
        result?: (number|null);

        /** HistoryData sinDouble */
        sinDouble?: (number|null);

        /** HistoryData bigSmall */
        bigSmall?: (number|null);

        /** HistoryData cardType */
        cardType?: (msg.CardsType|null);
    }

    /** Represents a HistoryData. */
    class HistoryData implements IHistoryData {

        /**
         * Constructs a new HistoryData.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IHistoryData);

        /** HistoryData timeFmt. */
        public timeFmt: string;

        /** HistoryData resNum. */
        public resNum: number[];

        /** HistoryData result. */
        public result: number;

        /** HistoryData sinDouble. */
        public sinDouble: number;

        /** HistoryData bigSmall. */
        public bigSmall: number;

        /** HistoryData cardType. */
        public cardType: msg.CardsType;

        /**
         * Creates a new HistoryData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HistoryData instance
         */
        public static create(properties?: msg.IHistoryData): msg.HistoryData;

        /**
         * Encodes the specified HistoryData message. Does not implicitly {@link msg.HistoryData.verify|verify} messages.
         * @param message HistoryData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IHistoryData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HistoryData message, length delimited. Does not implicitly {@link msg.HistoryData.verify|verify} messages.
         * @param message HistoryData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IHistoryData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HistoryData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HistoryData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.HistoryData;

        /**
         * Decodes a HistoryData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HistoryData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.HistoryData;

        /**
         * Verifies a HistoryData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HistoryData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HistoryData
         */
        public static fromObject(object: { [k: string]: any }): msg.HistoryData;

        /**
         * Creates a plain object from a HistoryData message. Also converts values to other types if specified.
         * @param message HistoryData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.HistoryData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HistoryData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomData. */
    interface IRoomData {

        /** RoomData roomId */
        roomId?: (string|null);

        /** RoomData playerData */
        playerData?: (msg.IPlayerData[]|null);

        /** RoomData gameTime */
        gameTime?: (number|null);

        /** RoomData gameStep */
        gameStep?: (msg.GameStep|null);

        /** RoomData resultInt */
        resultInt?: (number[]|null);

        /** RoomData potMoneyCount */
        potMoneyCount?: (msg.IDownBetMoney|null);

        /** RoomData potWinList */
        potWinList?: (msg.IPotWinList[]|null);

        /** RoomData historyData */
        historyData?: (msg.IHistoryData[]|null);

        /** RoomData tablePlayer */
        tablePlayer?: (msg.IPlayerData[]|null);
    }

    /** Represents a RoomData. */
    class RoomData implements IRoomData {

        /**
         * Constructs a new RoomData.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomData);

        /** RoomData roomId. */
        public roomId: string;

        /** RoomData playerData. */
        public playerData: msg.IPlayerData[];

        /** RoomData gameTime. */
        public gameTime: number;

        /** RoomData gameStep. */
        public gameStep: msg.GameStep;

        /** RoomData resultInt. */
        public resultInt: number[];

        /** RoomData potMoneyCount. */
        public potMoneyCount?: (msg.IDownBetMoney|null);

        /** RoomData potWinList. */
        public potWinList: msg.IPotWinList[];

        /** RoomData historyData. */
        public historyData: msg.IHistoryData[];

        /** RoomData tablePlayer. */
        public tablePlayer: msg.IPlayerData[];

        /**
         * Creates a new RoomData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomData instance
         */
        public static create(properties?: msg.IRoomData): msg.RoomData;

        /**
         * Encodes the specified RoomData message. Does not implicitly {@link msg.RoomData.verify|verify} messages.
         * @param message RoomData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomData message, length delimited. Does not implicitly {@link msg.RoomData.verify|verify} messages.
         * @param message RoomData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomData;

        /**
         * Decodes a RoomData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomData;

        /**
         * Verifies a RoomData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomData
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomData;

        /**
         * Creates a plain object from a RoomData message. Also converts values to other types if specified.
         * @param message RoomData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JoinRoom_C2S. */
    interface IJoinRoom_C2S {

        /** JoinRoom_C2S roomId */
        roomId?: (string|null);
    }

    /** Represents a JoinRoom_C2S. */
    class JoinRoom_C2S implements IJoinRoom_C2S {

        /**
         * Constructs a new JoinRoom_C2S.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IJoinRoom_C2S);

        /** JoinRoom_C2S roomId. */
        public roomId: string;

        /**
         * Creates a new JoinRoom_C2S instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoom_C2S instance
         */
        public static create(properties?: msg.IJoinRoom_C2S): msg.JoinRoom_C2S;

        /**
         * Encodes the specified JoinRoom_C2S message. Does not implicitly {@link msg.JoinRoom_C2S.verify|verify} messages.
         * @param message JoinRoom_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IJoinRoom_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoom_C2S message, length delimited. Does not implicitly {@link msg.JoinRoom_C2S.verify|verify} messages.
         * @param message JoinRoom_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IJoinRoom_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoom_C2S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoom_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.JoinRoom_C2S;

        /**
         * Decodes a JoinRoom_C2S message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoom_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.JoinRoom_C2S;

        /**
         * Verifies a JoinRoom_C2S message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoom_C2S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoom_C2S
         */
        public static fromObject(object: { [k: string]: any }): msg.JoinRoom_C2S;

        /**
         * Creates a plain object from a JoinRoom_C2S message. Also converts values to other types if specified.
         * @param message JoinRoom_C2S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.JoinRoom_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoom_C2S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JoinRoom_S2C. */
    interface IJoinRoom_S2C {

        /** JoinRoom_S2C roomData */
        roomData?: (msg.IRoomData|null);
    }

    /** Represents a JoinRoom_S2C. */
    class JoinRoom_S2C implements IJoinRoom_S2C {

        /**
         * Constructs a new JoinRoom_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IJoinRoom_S2C);

        /** JoinRoom_S2C roomData. */
        public roomData?: (msg.IRoomData|null);

        /**
         * Creates a new JoinRoom_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoom_S2C instance
         */
        public static create(properties?: msg.IJoinRoom_S2C): msg.JoinRoom_S2C;

        /**
         * Encodes the specified JoinRoom_S2C message. Does not implicitly {@link msg.JoinRoom_S2C.verify|verify} messages.
         * @param message JoinRoom_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IJoinRoom_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoom_S2C message, length delimited. Does not implicitly {@link msg.JoinRoom_S2C.verify|verify} messages.
         * @param message JoinRoom_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IJoinRoom_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoom_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.JoinRoom_S2C;

        /**
         * Decodes a JoinRoom_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.JoinRoom_S2C;

        /**
         * Verifies a JoinRoom_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoom_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoom_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.JoinRoom_S2C;

        /**
         * Creates a plain object from a JoinRoom_S2C message. Also converts values to other types if specified.
         * @param message JoinRoom_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.JoinRoom_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoom_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterRoom_S2C. */
    interface IEnterRoom_S2C {

        /** EnterRoom_S2C roomData */
        roomData?: (msg.IRoomData|null);
    }

    /** Represents an EnterRoom_S2C. */
    class EnterRoom_S2C implements IEnterRoom_S2C {

        /**
         * Constructs a new EnterRoom_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IEnterRoom_S2C);

        /** EnterRoom_S2C roomData. */
        public roomData?: (msg.IRoomData|null);

        /**
         * Creates a new EnterRoom_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterRoom_S2C instance
         */
        public static create(properties?: msg.IEnterRoom_S2C): msg.EnterRoom_S2C;

        /**
         * Encodes the specified EnterRoom_S2C message. Does not implicitly {@link msg.EnterRoom_S2C.verify|verify} messages.
         * @param message EnterRoom_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IEnterRoom_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterRoom_S2C message, length delimited. Does not implicitly {@link msg.EnterRoom_S2C.verify|verify} messages.
         * @param message EnterRoom_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IEnterRoom_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterRoom_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.EnterRoom_S2C;

        /**
         * Decodes an EnterRoom_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.EnterRoom_S2C;

        /**
         * Verifies an EnterRoom_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterRoom_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterRoom_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.EnterRoom_S2C;

        /**
         * Creates a plain object from an EnterRoom_S2C message. Also converts values to other types if specified.
         * @param message EnterRoom_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.EnterRoom_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterRoom_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LeaveRoom_C2S. */
    interface ILeaveRoom_C2S {
    }

    /** Represents a LeaveRoom_C2S. */
    class LeaveRoom_C2S implements ILeaveRoom_C2S {

        /**
         * Constructs a new LeaveRoom_C2S.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILeaveRoom_C2S);

        /**
         * Creates a new LeaveRoom_C2S instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveRoom_C2S instance
         */
        public static create(properties?: msg.ILeaveRoom_C2S): msg.LeaveRoom_C2S;

        /**
         * Encodes the specified LeaveRoom_C2S message. Does not implicitly {@link msg.LeaveRoom_C2S.verify|verify} messages.
         * @param message LeaveRoom_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILeaveRoom_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveRoom_C2S message, length delimited. Does not implicitly {@link msg.LeaveRoom_C2S.verify|verify} messages.
         * @param message LeaveRoom_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILeaveRoom_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveRoom_C2S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveRoom_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.LeaveRoom_C2S;

        /**
         * Decodes a LeaveRoom_C2S message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveRoom_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.LeaveRoom_C2S;

        /**
         * Verifies a LeaveRoom_C2S message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveRoom_C2S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveRoom_C2S
         */
        public static fromObject(object: { [k: string]: any }): msg.LeaveRoom_C2S;

        /**
         * Creates a plain object from a LeaveRoom_C2S message. Also converts values to other types if specified.
         * @param message LeaveRoom_C2S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LeaveRoom_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveRoom_C2S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LeaveRoom_S2C. */
    interface ILeaveRoom_S2C {

        /** LeaveRoom_S2C playerInfo */
        playerInfo?: (msg.IPlayerInfo|null);
    }

    /** Represents a LeaveRoom_S2C. */
    class LeaveRoom_S2C implements ILeaveRoom_S2C {

        /**
         * Constructs a new LeaveRoom_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILeaveRoom_S2C);

        /** LeaveRoom_S2C playerInfo. */
        public playerInfo?: (msg.IPlayerInfo|null);

        /**
         * Creates a new LeaveRoom_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveRoom_S2C instance
         */
        public static create(properties?: msg.ILeaveRoom_S2C): msg.LeaveRoom_S2C;

        /**
         * Encodes the specified LeaveRoom_S2C message. Does not implicitly {@link msg.LeaveRoom_S2C.verify|verify} messages.
         * @param message LeaveRoom_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILeaveRoom_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveRoom_S2C message, length delimited. Does not implicitly {@link msg.LeaveRoom_S2C.verify|verify} messages.
         * @param message LeaveRoom_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILeaveRoom_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveRoom_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.LeaveRoom_S2C;

        /**
         * Decodes a LeaveRoom_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.LeaveRoom_S2C;

        /**
         * Verifies a LeaveRoom_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveRoom_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveRoom_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.LeaveRoom_S2C;

        /**
         * Creates a plain object from a LeaveRoom_S2C message. Also converts values to other types if specified.
         * @param message LeaveRoom_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LeaveRoom_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveRoom_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActionTime_S2C. */
    interface IActionTime_S2C {

        /** ActionTime_S2C gameStep */
        gameStep?: (msg.GameStep|null);

        /** ActionTime_S2C roomData */
        roomData?: (msg.IRoomData|null);
    }

    /** Represents an ActionTime_S2C. */
    class ActionTime_S2C implements IActionTime_S2C {

        /**
         * Constructs a new ActionTime_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IActionTime_S2C);

        /** ActionTime_S2C gameStep. */
        public gameStep: msg.GameStep;

        /** ActionTime_S2C roomData. */
        public roomData?: (msg.IRoomData|null);

        /**
         * Creates a new ActionTime_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActionTime_S2C instance
         */
        public static create(properties?: msg.IActionTime_S2C): msg.ActionTime_S2C;

        /**
         * Encodes the specified ActionTime_S2C message. Does not implicitly {@link msg.ActionTime_S2C.verify|verify} messages.
         * @param message ActionTime_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IActionTime_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActionTime_S2C message, length delimited. Does not implicitly {@link msg.ActionTime_S2C.verify|verify} messages.
         * @param message ActionTime_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IActionTime_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActionTime_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActionTime_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ActionTime_S2C;

        /**
         * Decodes an ActionTime_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActionTime_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ActionTime_S2C;

        /**
         * Verifies an ActionTime_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActionTime_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActionTime_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.ActionTime_S2C;

        /**
         * Creates a plain object from an ActionTime_S2C message. Also converts values to other types if specified.
         * @param message ActionTime_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ActionTime_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActionTime_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerAction_C2S. */
    interface IPlayerAction_C2S {

        /** PlayerAction_C2S downBet */
        downBet?: (number|null);

        /** PlayerAction_C2S downPot */
        downPot?: (msg.PotType|null);

        /** PlayerAction_C2S IsAction */
        IsAction?: (boolean|null);
    }

    /** Represents a PlayerAction_C2S. */
    class PlayerAction_C2S implements IPlayerAction_C2S {

        /**
         * Constructs a new PlayerAction_C2S.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerAction_C2S);

        /** PlayerAction_C2S downBet. */
        public downBet: number;

        /** PlayerAction_C2S downPot. */
        public downPot: msg.PotType;

        /** PlayerAction_C2S IsAction. */
        public IsAction: boolean;

        /**
         * Creates a new PlayerAction_C2S instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerAction_C2S instance
         */
        public static create(properties?: msg.IPlayerAction_C2S): msg.PlayerAction_C2S;

        /**
         * Encodes the specified PlayerAction_C2S message. Does not implicitly {@link msg.PlayerAction_C2S.verify|verify} messages.
         * @param message PlayerAction_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerAction_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerAction_C2S message, length delimited. Does not implicitly {@link msg.PlayerAction_C2S.verify|verify} messages.
         * @param message PlayerAction_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerAction_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerAction_C2S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerAction_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerAction_C2S;

        /**
         * Decodes a PlayerAction_C2S message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerAction_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerAction_C2S;

        /**
         * Verifies a PlayerAction_C2S message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerAction_C2S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerAction_C2S
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerAction_C2S;

        /**
         * Creates a plain object from a PlayerAction_C2S message. Also converts values to other types if specified.
         * @param message PlayerAction_C2S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerAction_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerAction_C2S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerAction_S2C. */
    interface IPlayerAction_S2C {

        /** PlayerAction_S2C Id */
        Id?: (string|null);

        /** PlayerAction_S2C downBet */
        downBet?: (number|null);

        /** PlayerAction_S2C downPot */
        downPot?: (msg.PotType|null);

        /** PlayerAction_S2C IsAction */
        IsAction?: (boolean|null);

        /** PlayerAction_S2C account */
        account?: (number|null);
    }

    /** Represents a PlayerAction_S2C. */
    class PlayerAction_S2C implements IPlayerAction_S2C {

        /**
         * Constructs a new PlayerAction_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerAction_S2C);

        /** PlayerAction_S2C Id. */
        public Id: string;

        /** PlayerAction_S2C downBet. */
        public downBet: number;

        /** PlayerAction_S2C downPot. */
        public downPot: msg.PotType;

        /** PlayerAction_S2C IsAction. */
        public IsAction: boolean;

        /** PlayerAction_S2C account. */
        public account: number;

        /**
         * Creates a new PlayerAction_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerAction_S2C instance
         */
        public static create(properties?: msg.IPlayerAction_S2C): msg.PlayerAction_S2C;

        /**
         * Encodes the specified PlayerAction_S2C message. Does not implicitly {@link msg.PlayerAction_S2C.verify|verify} messages.
         * @param message PlayerAction_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerAction_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerAction_S2C message, length delimited. Does not implicitly {@link msg.PlayerAction_S2C.verify|verify} messages.
         * @param message PlayerAction_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerAction_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerAction_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerAction_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerAction_S2C;

        /**
         * Decodes a PlayerAction_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerAction_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerAction_S2C;

        /**
         * Verifies a PlayerAction_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerAction_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerAction_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerAction_S2C;

        /**
         * Creates a plain object from a PlayerAction_S2C message. Also converts values to other types if specified.
         * @param message PlayerAction_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerAction_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerAction_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PotChangeMoney_S2C. */
    interface IPotChangeMoney_S2C {

        /** PotChangeMoney_S2C potMoneyCount */
        potMoneyCount?: (msg.IDownBetMoney|null);
    }

    /** Represents a PotChangeMoney_S2C. */
    class PotChangeMoney_S2C implements IPotChangeMoney_S2C {

        /**
         * Constructs a new PotChangeMoney_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPotChangeMoney_S2C);

        /** PotChangeMoney_S2C potMoneyCount. */
        public potMoneyCount?: (msg.IDownBetMoney|null);

        /**
         * Creates a new PotChangeMoney_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PotChangeMoney_S2C instance
         */
        public static create(properties?: msg.IPotChangeMoney_S2C): msg.PotChangeMoney_S2C;

        /**
         * Encodes the specified PotChangeMoney_S2C message. Does not implicitly {@link msg.PotChangeMoney_S2C.verify|verify} messages.
         * @param message PotChangeMoney_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPotChangeMoney_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PotChangeMoney_S2C message, length delimited. Does not implicitly {@link msg.PotChangeMoney_S2C.verify|verify} messages.
         * @param message PotChangeMoney_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPotChangeMoney_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PotChangeMoney_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PotChangeMoney_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PotChangeMoney_S2C;

        /**
         * Decodes a PotChangeMoney_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PotChangeMoney_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PotChangeMoney_S2C;

        /**
         * Verifies a PotChangeMoney_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PotChangeMoney_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PotChangeMoney_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.PotChangeMoney_S2C;

        /**
         * Creates a plain object from a PotChangeMoney_S2C message. Also converts values to other types if specified.
         * @param message PotChangeMoney_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PotChangeMoney_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PotChangeMoney_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UptPlayerList_S2C. */
    interface IUptPlayerList_S2C {

        /** UptPlayerList_S2C playerList */
        playerList?: (msg.IPlayerData[]|null);
    }

    /** Represents an UptPlayerList_S2C. */
    class UptPlayerList_S2C implements IUptPlayerList_S2C {

        /**
         * Constructs a new UptPlayerList_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUptPlayerList_S2C);

        /** UptPlayerList_S2C playerList. */
        public playerList: msg.IPlayerData[];

        /**
         * Creates a new UptPlayerList_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UptPlayerList_S2C instance
         */
        public static create(properties?: msg.IUptPlayerList_S2C): msg.UptPlayerList_S2C;

        /**
         * Encodes the specified UptPlayerList_S2C message. Does not implicitly {@link msg.UptPlayerList_S2C.verify|verify} messages.
         * @param message UptPlayerList_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUptPlayerList_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UptPlayerList_S2C message, length delimited. Does not implicitly {@link msg.UptPlayerList_S2C.verify|verify} messages.
         * @param message UptPlayerList_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUptPlayerList_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UptPlayerList_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UptPlayerList_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.UptPlayerList_S2C;

        /**
         * Decodes an UptPlayerList_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UptPlayerList_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.UptPlayerList_S2C;

        /**
         * Verifies an UptPlayerList_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UptPlayerList_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UptPlayerList_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.UptPlayerList_S2C;

        /**
         * Creates a plain object from an UptPlayerList_S2C message. Also converts values to other types if specified.
         * @param message UptPlayerList_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UptPlayerList_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UptPlayerList_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResultData_S2C. */
    interface IResultData_S2C {

        /** ResultData_S2C roomData */
        roomData?: (msg.IRoomData|null);
    }

    /** Represents a ResultData_S2C. */
    class ResultData_S2C implements IResultData_S2C {

        /**
         * Constructs a new ResultData_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IResultData_S2C);

        /** ResultData_S2C roomData. */
        public roomData?: (msg.IRoomData|null);

        /**
         * Creates a new ResultData_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResultData_S2C instance
         */
        public static create(properties?: msg.IResultData_S2C): msg.ResultData_S2C;

        /**
         * Encodes the specified ResultData_S2C message. Does not implicitly {@link msg.ResultData_S2C.verify|verify} messages.
         * @param message ResultData_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IResultData_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResultData_S2C message, length delimited. Does not implicitly {@link msg.ResultData_S2C.verify|verify} messages.
         * @param message ResultData_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IResultData_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResultData_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResultData_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ResultData_S2C;

        /**
         * Decodes a ResultData_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResultData_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ResultData_S2C;

        /**
         * Verifies a ResultData_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResultData_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResultData_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.ResultData_S2C;

        /**
         * Creates a plain object from a ResultData_S2C message. Also converts values to other types if specified.
         * @param message ResultData_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ResultData_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResultData_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BankerData_C2S. */
    interface IBankerData_C2S {

        /** BankerData_C2S status */
        status?: (msg.BankerStatus|null);

        /** BankerData_C2S takeMoney */
        takeMoney?: (number|null);
    }

    /** Represents a BankerData_C2S. */
    class BankerData_C2S implements IBankerData_C2S {

        /**
         * Constructs a new BankerData_C2S.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBankerData_C2S);

        /** BankerData_C2S status. */
        public status: msg.BankerStatus;

        /** BankerData_C2S takeMoney. */
        public takeMoney: number;

        /**
         * Creates a new BankerData_C2S instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BankerData_C2S instance
         */
        public static create(properties?: msg.IBankerData_C2S): msg.BankerData_C2S;

        /**
         * Encodes the specified BankerData_C2S message. Does not implicitly {@link msg.BankerData_C2S.verify|verify} messages.
         * @param message BankerData_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBankerData_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BankerData_C2S message, length delimited. Does not implicitly {@link msg.BankerData_C2S.verify|verify} messages.
         * @param message BankerData_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBankerData_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BankerData_C2S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BankerData_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BankerData_C2S;

        /**
         * Decodes a BankerData_C2S message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BankerData_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BankerData_C2S;

        /**
         * Verifies a BankerData_C2S message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BankerData_C2S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BankerData_C2S
         */
        public static fromObject(object: { [k: string]: any }): msg.BankerData_C2S;

        /**
         * Creates a plain object from a BankerData_C2S message. Also converts values to other types if specified.
         * @param message BankerData_C2S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BankerData_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BankerData_C2S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BankerData_S2C. */
    interface IBankerData_S2C {

        /** BankerData_S2C banker */
        banker?: (msg.IPlayerData|null);

        /** BankerData_S2C takeMoney */
        takeMoney?: (number|null);
    }

    /** Represents a BankerData_S2C. */
    class BankerData_S2C implements IBankerData_S2C {

        /**
         * Constructs a new BankerData_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBankerData_S2C);

        /** BankerData_S2C banker. */
        public banker?: (msg.IPlayerData|null);

        /** BankerData_S2C takeMoney. */
        public takeMoney: number;

        /**
         * Creates a new BankerData_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BankerData_S2C instance
         */
        public static create(properties?: msg.IBankerData_S2C): msg.BankerData_S2C;

        /**
         * Encodes the specified BankerData_S2C message. Does not implicitly {@link msg.BankerData_S2C.verify|verify} messages.
         * @param message BankerData_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBankerData_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BankerData_S2C message, length delimited. Does not implicitly {@link msg.BankerData_S2C.verify|verify} messages.
         * @param message BankerData_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBankerData_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BankerData_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BankerData_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BankerData_S2C;

        /**
         * Decodes a BankerData_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BankerData_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BankerData_S2C;

        /**
         * Verifies a BankerData_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BankerData_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BankerData_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.BankerData_S2C;

        /**
         * Creates a plain object from a BankerData_S2C message. Also converts values to other types if specified.
         * @param message BankerData_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BankerData_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BankerData_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EmojiChat_C2S. */
    interface IEmojiChat_C2S {

        /** EmojiChat_C2S actNum */
        actNum?: (number|null);

        /** EmojiChat_C2S goalId */
        goalId?: (string|null);
    }

    /** Represents an EmojiChat_C2S. */
    class EmojiChat_C2S implements IEmojiChat_C2S {

        /**
         * Constructs a new EmojiChat_C2S.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IEmojiChat_C2S);

        /** EmojiChat_C2S actNum. */
        public actNum: number;

        /** EmojiChat_C2S goalId. */
        public goalId: string;

        /**
         * Creates a new EmojiChat_C2S instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EmojiChat_C2S instance
         */
        public static create(properties?: msg.IEmojiChat_C2S): msg.EmojiChat_C2S;

        /**
         * Encodes the specified EmojiChat_C2S message. Does not implicitly {@link msg.EmojiChat_C2S.verify|verify} messages.
         * @param message EmojiChat_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IEmojiChat_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EmojiChat_C2S message, length delimited. Does not implicitly {@link msg.EmojiChat_C2S.verify|verify} messages.
         * @param message EmojiChat_C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IEmojiChat_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EmojiChat_C2S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EmojiChat_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.EmojiChat_C2S;

        /**
         * Decodes an EmojiChat_C2S message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EmojiChat_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.EmojiChat_C2S;

        /**
         * Verifies an EmojiChat_C2S message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EmojiChat_C2S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EmojiChat_C2S
         */
        public static fromObject(object: { [k: string]: any }): msg.EmojiChat_C2S;

        /**
         * Creates a plain object from an EmojiChat_C2S message. Also converts values to other types if specified.
         * @param message EmojiChat_C2S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.EmojiChat_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EmojiChat_C2S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EmojiChat_S2C. */
    interface IEmojiChat_S2C {

        /** EmojiChat_S2C actNum */
        actNum?: (number|null);

        /** EmojiChat_S2C actId */
        actId?: (string|null);

        /** EmojiChat_S2C goalId */
        goalId?: (string|null);
    }

    /** Represents an EmojiChat_S2C. */
    class EmojiChat_S2C implements IEmojiChat_S2C {

        /**
         * Constructs a new EmojiChat_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IEmojiChat_S2C);

        /** EmojiChat_S2C actNum. */
        public actNum: number;

        /** EmojiChat_S2C actId. */
        public actId: string;

        /** EmojiChat_S2C goalId. */
        public goalId: string;

        /**
         * Creates a new EmojiChat_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EmojiChat_S2C instance
         */
        public static create(properties?: msg.IEmojiChat_S2C): msg.EmojiChat_S2C;

        /**
         * Encodes the specified EmojiChat_S2C message. Does not implicitly {@link msg.EmojiChat_S2C.verify|verify} messages.
         * @param message EmojiChat_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IEmojiChat_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EmojiChat_S2C message, length delimited. Does not implicitly {@link msg.EmojiChat_S2C.verify|verify} messages.
         * @param message EmojiChat_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IEmojiChat_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EmojiChat_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EmojiChat_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.EmojiChat_S2C;

        /**
         * Decodes an EmojiChat_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EmojiChat_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.EmojiChat_S2C;

        /**
         * Verifies an EmojiChat_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EmojiChat_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EmojiChat_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.EmojiChat_S2C;

        /**
         * Creates a plain object from an EmojiChat_S2C message. Also converts values to other types if specified.
         * @param message EmojiChat_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.EmojiChat_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EmojiChat_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SendActTime_S2C. */
    interface ISendActTime_S2C {

        /** SendActTime_S2C startTime */
        startTime?: (number|null);

        /** SendActTime_S2C gameTime */
        gameTime?: (number|null);

        /** SendActTime_S2C gameStep */
        gameStep?: (msg.GameStep|null);
    }

    /** Represents a SendActTime_S2C. */
    class SendActTime_S2C implements ISendActTime_S2C {

        /**
         * Constructs a new SendActTime_S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISendActTime_S2C);

        /** SendActTime_S2C startTime. */
        public startTime: number;

        /** SendActTime_S2C gameTime. */
        public gameTime: number;

        /** SendActTime_S2C gameStep. */
        public gameStep: msg.GameStep;

        /**
         * Creates a new SendActTime_S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendActTime_S2C instance
         */
        public static create(properties?: msg.ISendActTime_S2C): msg.SendActTime_S2C;

        /**
         * Encodes the specified SendActTime_S2C message. Does not implicitly {@link msg.SendActTime_S2C.verify|verify} messages.
         * @param message SendActTime_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISendActTime_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendActTime_S2C message, length delimited. Does not implicitly {@link msg.SendActTime_S2C.verify|verify} messages.
         * @param message SendActTime_S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISendActTime_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendActTime_S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendActTime_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.SendActTime_S2C;

        /**
         * Decodes a SendActTime_S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendActTime_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.SendActTime_S2C;

        /**
         * Verifies a SendActTime_S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendActTime_S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendActTime_S2C
         */
        public static fromObject(object: { [k: string]: any }): msg.SendActTime_S2C;

        /**
         * Creates a plain object from a SendActTime_S2C message. Also converts values to other types if specified.
         * @param message SendActTime_S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.SendActTime_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendActTime_S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
