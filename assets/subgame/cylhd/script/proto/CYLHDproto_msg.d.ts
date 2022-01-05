import * as $protobuf from "protobufjs";
/** Namespace msg. */
export namespace msg {

    /** SysCodeEnum enum. */
    enum SysCodeEnum {
        SUCCESS = 0,
        DATA_ILLEGAL = 1,
        BALANCE_NOT_ENOUGH = 2,
        DATABASE_READ_WRITE_FAILED = 3,
        CENTER_SERVER_DISCONNECT = 4,
        EXCEED_LIMIT_BET = 5,
        USER_NOT_EXIST = 100,
        OTHER_DEVICES_LOGIN = 101,
        USER_DISABLE = 102,
        BET_TIME_END = 103,
        MORETHAN_LIMIT = 104,
        IN_OTHER_ROOM = 105,
        NOT_IN_THIS_ROOM = 107,
        ROOM_NOT_EXIST = 111,
        ROOM_NOT_OPEN = 112
    }

    /** MessageKind enum. */
    enum MessageKind {
        Ping = 0,
        Pong = 1,
        Login = 2,
        LoginR = 3,
        Logout = 4,
        LogoutR = 5,
        JoinRoom = 6,
        JoinRoomR = 7,
        ExitRoom = 8,
        ExitRoomR = 9,
        Bet = 10,
        BetR = 11,
        KeepBet = 12,
        KeepBetR = 13,
        History = 14,
        HistoryR = 15,
        RoundPlayInfoP = 16,
        RoomListLobbyP = 17,
        CancelRoundP = 18,
        BetP = 19,
        ResultRoundP = 20,
        UpdateBalanceP = 21,
        UpdateServiceP = 22,
        PauseServiceP = 23,
        KickedOutP = 24,
        Error = 25,
        UserRank = 26,
        UserRankR = 27,
        BetRecord = 28,
        BetRecordR = 29,
        RoomRedLimit = 30,
        RoomRedLimitR = 31,
        ZhiBoUpdateBalanceP = 32
    }

    /** Properties of an InfoBet. */
    interface IInfoBet {

        /** InfoBet type */
        type?: (number|null);

        /** InfoBet val */
        val?: (number|null);

        /** InfoBet position */
        position?: (number|null);
    }

    /** Represents an InfoBet. */
    class InfoBet implements IInfoBet {

        /**
         * Constructs a new InfoBet.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IInfoBet);

        /** InfoBet type. */
        public type: number;

        /** InfoBet val. */
        public val: number;

        /** InfoBet position. */
        public position: number;

        /**
         * Creates a new InfoBet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InfoBet instance
         */
        public static create(properties?: msg.IInfoBet): msg.InfoBet;

        /**
         * Encodes the specified InfoBet message. Does not implicitly {@link msg.InfoBet.verify|verify} messages.
         * @param message InfoBet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IInfoBet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InfoBet message, length delimited. Does not implicitly {@link msg.InfoBet.verify|verify} messages.
         * @param message InfoBet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IInfoBet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InfoBet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InfoBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.InfoBet;

        /**
         * Decodes an InfoBet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InfoBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.InfoBet;

        /**
         * Verifies an InfoBet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InfoBet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InfoBet
         */
        public static fromObject(object: { [k: string]: any }): msg.InfoBet;

        /**
         * Creates a plain object from an InfoBet message. Also converts values to other types if specified.
         * @param message InfoBet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.InfoBet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InfoBet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HeartBeatRequest. */
    interface IHeartBeatRequest {
    }

    /** Represents a HeartBeatRequest. */
    class HeartBeatRequest implements IHeartBeatRequest {

        /**
         * Constructs a new HeartBeatRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IHeartBeatRequest);

        /**
         * Creates a new HeartBeatRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartBeatRequest instance
         */
        public static create(properties?: msg.IHeartBeatRequest): msg.HeartBeatRequest;

        /**
         * Encodes the specified HeartBeatRequest message. Does not implicitly {@link msg.HeartBeatRequest.verify|verify} messages.
         * @param message HeartBeatRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IHeartBeatRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartBeatRequest message, length delimited. Does not implicitly {@link msg.HeartBeatRequest.verify|verify} messages.
         * @param message HeartBeatRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IHeartBeatRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartBeatRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartBeatRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.HeartBeatRequest;

        /**
         * Decodes a HeartBeatRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartBeatRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.HeartBeatRequest;

        /**
         * Verifies a HeartBeatRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartBeatRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartBeatRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.HeartBeatRequest;

        /**
         * Creates a plain object from a HeartBeatRequest message. Also converts values to other types if specified.
         * @param message HeartBeatRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.HeartBeatRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartBeatRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HeartBeatResponse. */
    interface IHeartBeatResponse {
    }

    /** Represents a HeartBeatResponse. */
    class HeartBeatResponse implements IHeartBeatResponse {

        /**
         * Constructs a new HeartBeatResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IHeartBeatResponse);

        /**
         * Creates a new HeartBeatResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartBeatResponse instance
         */
        public static create(properties?: msg.IHeartBeatResponse): msg.HeartBeatResponse;

        /**
         * Encodes the specified HeartBeatResponse message. Does not implicitly {@link msg.HeartBeatResponse.verify|verify} messages.
         * @param message HeartBeatResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IHeartBeatResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartBeatResponse message, length delimited. Does not implicitly {@link msg.HeartBeatResponse.verify|verify} messages.
         * @param message HeartBeatResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IHeartBeatResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartBeatResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartBeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.HeartBeatResponse;

        /**
         * Decodes a HeartBeatResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartBeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.HeartBeatResponse;

        /**
         * Verifies a HeartBeatResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartBeatResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartBeatResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.HeartBeatResponse;

        /**
         * Creates a plain object from a HeartBeatResponse message. Also converts values to other types if specified.
         * @param message HeartBeatResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.HeartBeatResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartBeatResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginRequest. */
    interface ILoginRequest {

        /** LoginRequest userID */
        userID?: (number|null);

        /** LoginRequest gameID */
        gameID?: (string|null);

        /** LoginRequest password */
        password?: (string|null);
    }

    /** Represents a LoginRequest. */
    class LoginRequest implements ILoginRequest {

        /**
         * Constructs a new LoginRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILoginRequest);

        /** LoginRequest userID. */
        public userID: number;

        /** LoginRequest gameID. */
        public gameID: string;

        /** LoginRequest password. */
        public password: string;

        /**
         * Creates a new LoginRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginRequest instance
         */
        public static create(properties?: msg.ILoginRequest): msg.LoginRequest;

        /**
         * Encodes the specified LoginRequest message. Does not implicitly {@link msg.LoginRequest.verify|verify} messages.
         * @param message LoginRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link msg.LoginRequest.verify|verify} messages.
         * @param message LoginRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.LoginRequest;

        /**
         * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.LoginRequest;

        /**
         * Verifies a LoginRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.LoginRequest;

        /**
         * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
         * @param message LoginRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserInfo. */
    interface IUserInfo {

        /** UserInfo userID */
        userID?: (number|null);

        /** UserInfo createTime */
        createTime?: (number|null);

        /** UserInfo balance */
        balance?: (number|null);

        /** UserInfo lockMoney */
        lockMoney?: (number|null);

        /** UserInfo userName */
        userName?: (string|null);

        /** UserInfo headUrl */
        headUrl?: (string|null);

        /** UserInfo roomNumber */
        roomNumber?: (string|null);
    }

    /** Represents a UserInfo. */
    class UserInfo implements IUserInfo {

        /**
         * Constructs a new UserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserInfo);

        /** UserInfo userID. */
        public userID: number;

        /** UserInfo createTime. */
        public createTime: number;

        /** UserInfo balance. */
        public balance: number;

        /** UserInfo lockMoney. */
        public lockMoney: number;

        /** UserInfo userName. */
        public userName: string;

        /** UserInfo headUrl. */
        public headUrl: string;

        /** UserInfo roomNumber. */
        public roomNumber: string;

        /**
         * Creates a new UserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserInfo instance
         */
        public static create(properties?: msg.IUserInfo): msg.UserInfo;

        /**
         * Encodes the specified UserInfo message. Does not implicitly {@link msg.UserInfo.verify|verify} messages.
         * @param message UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link msg.UserInfo.verify|verify} messages.
         * @param message UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.UserInfo;

        /**
         * Decodes a UserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.UserInfo;

        /**
         * Verifies a UserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.UserInfo;

        /**
         * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
         * @param message UserInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginResponse. */
    interface ILoginResponse {

        /** LoginResponse serverTime */
        serverTime?: (number|Long|null);

        /** LoginResponse code */
        code?: (number|null);

        /** LoginResponse user */
        user?: (msg.IUserInfo|null);

        /** LoginResponse version */
        version?: (string|null);

        /** LoginResponse taxPt */
        taxPt?: (number|null);
    }

    /** Represents a LoginResponse. */
    class LoginResponse implements ILoginResponse {

        /**
         * Constructs a new LoginResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILoginResponse);

        /** LoginResponse serverTime. */
        public serverTime: (number|Long);

        /** LoginResponse code. */
        public code: number;

        /** LoginResponse user. */
        public user?: (msg.IUserInfo|null);

        /** LoginResponse version. */
        public version: string;

        /** LoginResponse taxPt. */
        public taxPt: number;

        /**
         * Creates a new LoginResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginResponse instance
         */
        public static create(properties?: msg.ILoginResponse): msg.LoginResponse;

        /**
         * Encodes the specified LoginResponse message. Does not implicitly {@link msg.LoginResponse.verify|verify} messages.
         * @param message LoginResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link msg.LoginResponse.verify|verify} messages.
         * @param message LoginResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.LoginResponse;

        /**
         * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.LoginResponse;

        /**
         * Verifies a LoginResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.LoginResponse;

        /**
         * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
         * @param message LoginResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LogoutRequest. */
    interface ILogoutRequest {
    }

    /** Represents a LogoutRequest. */
    class LogoutRequest implements ILogoutRequest {

        /**
         * Constructs a new LogoutRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILogoutRequest);

        /**
         * Creates a new LogoutRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LogoutRequest instance
         */
        public static create(properties?: msg.ILogoutRequest): msg.LogoutRequest;

        /**
         * Encodes the specified LogoutRequest message. Does not implicitly {@link msg.LogoutRequest.verify|verify} messages.
         * @param message LogoutRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILogoutRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LogoutRequest message, length delimited. Does not implicitly {@link msg.LogoutRequest.verify|verify} messages.
         * @param message LogoutRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILogoutRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LogoutRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LogoutRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.LogoutRequest;

        /**
         * Decodes a LogoutRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LogoutRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.LogoutRequest;

        /**
         * Verifies a LogoutRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LogoutRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LogoutRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.LogoutRequest;

        /**
         * Creates a plain object from a LogoutRequest message. Also converts values to other types if specified.
         * @param message LogoutRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LogoutRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LogoutRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LogoutResponse. */
    interface ILogoutResponse {

        /** LogoutResponse code */
        code?: (number|null);

        /** LogoutResponse serverTime */
        serverTime?: (number|Long|null);
    }

    /** Represents a LogoutResponse. */
    class LogoutResponse implements ILogoutResponse {

        /**
         * Constructs a new LogoutResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILogoutResponse);

        /** LogoutResponse code. */
        public code: number;

        /** LogoutResponse serverTime. */
        public serverTime: (number|Long);

        /**
         * Creates a new LogoutResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LogoutResponse instance
         */
        public static create(properties?: msg.ILogoutResponse): msg.LogoutResponse;

        /**
         * Encodes the specified LogoutResponse message. Does not implicitly {@link msg.LogoutResponse.verify|verify} messages.
         * @param message LogoutResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILogoutResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LogoutResponse message, length delimited. Does not implicitly {@link msg.LogoutResponse.verify|verify} messages.
         * @param message LogoutResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILogoutResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LogoutResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LogoutResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.LogoutResponse;

        /**
         * Decodes a LogoutResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LogoutResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.LogoutResponse;

        /**
         * Verifies a LogoutResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LogoutResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LogoutResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.LogoutResponse;

        /**
         * Creates a plain object from a LogoutResponse message. Also converts values to other types if specified.
         * @param message LogoutResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LogoutResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LogoutResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JoinRoomRequest. */
    interface IJoinRoomRequest {

        /** JoinRoomRequest roomNumber */
        roomNumber?: (string|null);
    }

    /** Represents a JoinRoomRequest. */
    class JoinRoomRequest implements IJoinRoomRequest {

        /**
         * Constructs a new JoinRoomRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IJoinRoomRequest);

        /** JoinRoomRequest roomNumber. */
        public roomNumber: string;

        /**
         * Creates a new JoinRoomRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoomRequest instance
         */
        public static create(properties?: msg.IJoinRoomRequest): msg.JoinRoomRequest;

        /**
         * Encodes the specified JoinRoomRequest message. Does not implicitly {@link msg.JoinRoomRequest.verify|verify} messages.
         * @param message JoinRoomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IJoinRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoomRequest message, length delimited. Does not implicitly {@link msg.JoinRoomRequest.verify|verify} messages.
         * @param message JoinRoomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IJoinRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoomRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.JoinRoomRequest;

        /**
         * Decodes a JoinRoomRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.JoinRoomRequest;

        /**
         * Verifies a JoinRoomRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoomRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoomRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.JoinRoomRequest;

        /**
         * Creates a plain object from a JoinRoomRequest message. Also converts values to other types if specified.
         * @param message JoinRoomRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.JoinRoomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoomRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JoinRoomResponse. */
    interface IJoinRoomResponse {

        /** JoinRoomResponse serverTime */
        serverTime?: (number|Long|null);

        /** JoinRoomResponse code */
        code?: (number|null);

        /** JoinRoomResponse roomNumber */
        roomNumber?: (string|null);

        /** JoinRoomResponse roundInfo */
        roundInfo?: (msg.IRoundPlayInfoPush|null);

        /** JoinRoomResponse timeInterval */
        timeInterval?: (number[]|null);
    }

    /** Represents a JoinRoomResponse. */
    class JoinRoomResponse implements IJoinRoomResponse {

        /**
         * Constructs a new JoinRoomResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IJoinRoomResponse);

        /** JoinRoomResponse serverTime. */
        public serverTime: (number|Long);

        /** JoinRoomResponse code. */
        public code: number;

        /** JoinRoomResponse roomNumber. */
        public roomNumber: string;

        /** JoinRoomResponse roundInfo. */
        public roundInfo?: (msg.IRoundPlayInfoPush|null);

        /** JoinRoomResponse timeInterval. */
        public timeInterval: number[];

        /**
         * Creates a new JoinRoomResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoomResponse instance
         */
        public static create(properties?: msg.IJoinRoomResponse): msg.JoinRoomResponse;

        /**
         * Encodes the specified JoinRoomResponse message. Does not implicitly {@link msg.JoinRoomResponse.verify|verify} messages.
         * @param message JoinRoomResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IJoinRoomResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoomResponse message, length delimited. Does not implicitly {@link msg.JoinRoomResponse.verify|verify} messages.
         * @param message JoinRoomResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IJoinRoomResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoomResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoomResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.JoinRoomResponse;

        /**
         * Decodes a JoinRoomResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoomResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.JoinRoomResponse;

        /**
         * Verifies a JoinRoomResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoomResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoomResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.JoinRoomResponse;

        /**
         * Creates a plain object from a JoinRoomResponse message. Also converts values to other types if specified.
         * @param message JoinRoomResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.JoinRoomResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoomResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExitRoomRequest. */
    interface IExitRoomRequest {
    }

    /** Represents an ExitRoomRequest. */
    class ExitRoomRequest implements IExitRoomRequest {

        /**
         * Constructs a new ExitRoomRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IExitRoomRequest);

        /**
         * Creates a new ExitRoomRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExitRoomRequest instance
         */
        public static create(properties?: msg.IExitRoomRequest): msg.ExitRoomRequest;

        /**
         * Encodes the specified ExitRoomRequest message. Does not implicitly {@link msg.ExitRoomRequest.verify|verify} messages.
         * @param message ExitRoomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IExitRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExitRoomRequest message, length delimited. Does not implicitly {@link msg.ExitRoomRequest.verify|verify} messages.
         * @param message ExitRoomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IExitRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExitRoomRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExitRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ExitRoomRequest;

        /**
         * Decodes an ExitRoomRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExitRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ExitRoomRequest;

        /**
         * Verifies an ExitRoomRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExitRoomRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExitRoomRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.ExitRoomRequest;

        /**
         * Creates a plain object from an ExitRoomRequest message. Also converts values to other types if specified.
         * @param message ExitRoomRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ExitRoomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExitRoomRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExitRoomResponse. */
    interface IExitRoomResponse {

        /** ExitRoomResponse serverTime */
        serverTime?: (number|Long|null);

        /** ExitRoomResponse code */
        code?: (number|null);
    }

    /** Represents an ExitRoomResponse. */
    class ExitRoomResponse implements IExitRoomResponse {

        /**
         * Constructs a new ExitRoomResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IExitRoomResponse);

        /** ExitRoomResponse serverTime. */
        public serverTime: (number|Long);

        /** ExitRoomResponse code. */
        public code: number;

        /**
         * Creates a new ExitRoomResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExitRoomResponse instance
         */
        public static create(properties?: msg.IExitRoomResponse): msg.ExitRoomResponse;

        /**
         * Encodes the specified ExitRoomResponse message. Does not implicitly {@link msg.ExitRoomResponse.verify|verify} messages.
         * @param message ExitRoomResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IExitRoomResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExitRoomResponse message, length delimited. Does not implicitly {@link msg.ExitRoomResponse.verify|verify} messages.
         * @param message ExitRoomResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IExitRoomResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExitRoomResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExitRoomResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ExitRoomResponse;

        /**
         * Decodes an ExitRoomResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExitRoomResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ExitRoomResponse;

        /**
         * Verifies an ExitRoomResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExitRoomResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExitRoomResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.ExitRoomResponse;

        /**
         * Creates a plain object from an ExitRoomResponse message. Also converts values to other types if specified.
         * @param message ExitRoomResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ExitRoomResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExitRoomResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BetRequest. */
    interface IBetRequest {

        /** BetRequest roundID */
        roundID?: (number|null);

        /** BetRequest info */
        info?: (msg.IInfoBet|null);
    }

    /** Represents a BetRequest. */
    class BetRequest implements IBetRequest {

        /**
         * Constructs a new BetRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBetRequest);

        /** BetRequest roundID. */
        public roundID: number;

        /** BetRequest info. */
        public info?: (msg.IInfoBet|null);

        /**
         * Creates a new BetRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BetRequest instance
         */
        public static create(properties?: msg.IBetRequest): msg.BetRequest;

        /**
         * Encodes the specified BetRequest message. Does not implicitly {@link msg.BetRequest.verify|verify} messages.
         * @param message BetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BetRequest message, length delimited. Does not implicitly {@link msg.BetRequest.verify|verify} messages.
         * @param message BetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BetRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BetRequest;

        /**
         * Decodes a BetRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BetRequest;

        /**
         * Verifies a BetRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BetRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BetRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.BetRequest;

        /**
         * Creates a plain object from a BetRequest message. Also converts values to other types if specified.
         * @param message BetRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BetRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BetRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BetResponse. */
    interface IBetResponse {

        /** BetResponse serverTime */
        serverTime?: (number|Long|null);

        /** BetResponse code */
        code?: (number|null);

        /** BetResponse balance */
        balance?: (number|null);

        /** BetResponse lockMoney */
        lockMoney?: (number|null);
    }

    /** Represents a BetResponse. */
    class BetResponse implements IBetResponse {

        /**
         * Constructs a new BetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBetResponse);

        /** BetResponse serverTime. */
        public serverTime: (number|Long);

        /** BetResponse code. */
        public code: number;

        /** BetResponse balance. */
        public balance: number;

        /** BetResponse lockMoney. */
        public lockMoney: number;

        /**
         * Creates a new BetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BetResponse instance
         */
        public static create(properties?: msg.IBetResponse): msg.BetResponse;

        /**
         * Encodes the specified BetResponse message. Does not implicitly {@link msg.BetResponse.verify|verify} messages.
         * @param message BetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BetResponse message, length delimited. Does not implicitly {@link msg.BetResponse.verify|verify} messages.
         * @param message BetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BetResponse;

        /**
         * Decodes a BetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BetResponse;

        /**
         * Verifies a BetResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BetResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BetResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.BetResponse;

        /**
         * Creates a plain object from a BetResponse message. Also converts values to other types if specified.
         * @param message BetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BetResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a KeepBetRequest. */
    interface IKeepBetRequest {

        /** KeepBetRequest roundID */
        roundID?: (number|null);

        /** KeepBetRequest info */
        info?: (msg.IInfoBet[]|null);
    }

    /** Represents a KeepBetRequest. */
    class KeepBetRequest implements IKeepBetRequest {

        /**
         * Constructs a new KeepBetRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IKeepBetRequest);

        /** KeepBetRequest roundID. */
        public roundID: number;

        /** KeepBetRequest info. */
        public info: msg.IInfoBet[];

        /**
         * Creates a new KeepBetRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KeepBetRequest instance
         */
        public static create(properties?: msg.IKeepBetRequest): msg.KeepBetRequest;

        /**
         * Encodes the specified KeepBetRequest message. Does not implicitly {@link msg.KeepBetRequest.verify|verify} messages.
         * @param message KeepBetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IKeepBetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KeepBetRequest message, length delimited. Does not implicitly {@link msg.KeepBetRequest.verify|verify} messages.
         * @param message KeepBetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IKeepBetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KeepBetRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KeepBetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.KeepBetRequest;

        /**
         * Decodes a KeepBetRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KeepBetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.KeepBetRequest;

        /**
         * Verifies a KeepBetRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KeepBetRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KeepBetRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.KeepBetRequest;

        /**
         * Creates a plain object from a KeepBetRequest message. Also converts values to other types if specified.
         * @param message KeepBetRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.KeepBetRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KeepBetRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a KeepBetResponse. */
    interface IKeepBetResponse {

        /** KeepBetResponse serverTime */
        serverTime?: (number|Long|null);

        /** KeepBetResponse code */
        code?: (number|null);

        /** KeepBetResponse balance */
        balance?: (number|null);

        /** KeepBetResponse lockMoney */
        lockMoney?: (number|null);
    }

    /** Represents a KeepBetResponse. */
    class KeepBetResponse implements IKeepBetResponse {

        /**
         * Constructs a new KeepBetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IKeepBetResponse);

        /** KeepBetResponse serverTime. */
        public serverTime: (number|Long);

        /** KeepBetResponse code. */
        public code: number;

        /** KeepBetResponse balance. */
        public balance: number;

        /** KeepBetResponse lockMoney. */
        public lockMoney: number;

        /**
         * Creates a new KeepBetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KeepBetResponse instance
         */
        public static create(properties?: msg.IKeepBetResponse): msg.KeepBetResponse;

        /**
         * Encodes the specified KeepBetResponse message. Does not implicitly {@link msg.KeepBetResponse.verify|verify} messages.
         * @param message KeepBetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IKeepBetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KeepBetResponse message, length delimited. Does not implicitly {@link msg.KeepBetResponse.verify|verify} messages.
         * @param message KeepBetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IKeepBetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KeepBetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KeepBetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.KeepBetResponse;

        /**
         * Decodes a KeepBetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KeepBetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.KeepBetResponse;

        /**
         * Verifies a KeepBetResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KeepBetResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KeepBetResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.KeepBetResponse;

        /**
         * Creates a plain object from a KeepBetResponse message. Also converts values to other types if specified.
         * @param message KeepBetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.KeepBetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KeepBetResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HistoryRequest. */
    interface IHistoryRequest {
    }

    /** Represents a HistoryRequest. */
    class HistoryRequest implements IHistoryRequest {

        /**
         * Constructs a new HistoryRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IHistoryRequest);

        /**
         * Creates a new HistoryRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HistoryRequest instance
         */
        public static create(properties?: msg.IHistoryRequest): msg.HistoryRequest;

        /**
         * Encodes the specified HistoryRequest message. Does not implicitly {@link msg.HistoryRequest.verify|verify} messages.
         * @param message HistoryRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IHistoryRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HistoryRequest message, length delimited. Does not implicitly {@link msg.HistoryRequest.verify|verify} messages.
         * @param message HistoryRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IHistoryRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HistoryRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HistoryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.HistoryRequest;

        /**
         * Decodes a HistoryRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HistoryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.HistoryRequest;

        /**
         * Verifies a HistoryRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HistoryRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HistoryRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.HistoryRequest;

        /**
         * Creates a plain object from a HistoryRequest message. Also converts values to other types if specified.
         * @param message HistoryRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.HistoryRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HistoryRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HistoryResponse. */
    interface IHistoryResponse {

        /** HistoryResponse serverTime */
        serverTime?: (number|Long|null);

        /** HistoryResponse code */
        code?: (number|null);

        /** HistoryResponse list */
        list?: (msg.HistoryResponse.IH[]|null);
    }

    /** Represents a HistoryResponse. */
    class HistoryResponse implements IHistoryResponse {

        /**
         * Constructs a new HistoryResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IHistoryResponse);

        /** HistoryResponse serverTime. */
        public serverTime: (number|Long);

        /** HistoryResponse code. */
        public code: number;

        /** HistoryResponse list. */
        public list: msg.HistoryResponse.IH[];

        /**
         * Creates a new HistoryResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HistoryResponse instance
         */
        public static create(properties?: msg.IHistoryResponse): msg.HistoryResponse;

        /**
         * Encodes the specified HistoryResponse message. Does not implicitly {@link msg.HistoryResponse.verify|verify} messages.
         * @param message HistoryResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IHistoryResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HistoryResponse message, length delimited. Does not implicitly {@link msg.HistoryResponse.verify|verify} messages.
         * @param message HistoryResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IHistoryResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HistoryResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HistoryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.HistoryResponse;

        /**
         * Decodes a HistoryResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HistoryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.HistoryResponse;

        /**
         * Verifies a HistoryResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HistoryResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HistoryResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.HistoryResponse;

        /**
         * Creates a plain object from a HistoryResponse message. Also converts values to other types if specified.
         * @param message HistoryResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.HistoryResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HistoryResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace HistoryResponse {

        /** Properties of a H. */
        interface IH {

            /** H issueID */
            issueID?: (string|null);

            /** H luckyNum */
            luckyNum?: (string|null);
        }

        /** Represents a H. */
        class H implements IH {

            /**
             * Constructs a new H.
             * @param [properties] Properties to set
             */
            constructor(properties?: msg.HistoryResponse.IH);

            /** H issueID. */
            public issueID: string;

            /** H luckyNum. */
            public luckyNum: string;

            /**
             * Creates a new H instance using the specified properties.
             * @param [properties] Properties to set
             * @returns H instance
             */
            public static create(properties?: msg.HistoryResponse.IH): msg.HistoryResponse.H;

            /**
             * Encodes the specified H message. Does not implicitly {@link msg.HistoryResponse.H.verify|verify} messages.
             * @param message H message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: msg.HistoryResponse.IH, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified H message, length delimited. Does not implicitly {@link msg.HistoryResponse.H.verify|verify} messages.
             * @param message H message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: msg.HistoryResponse.IH, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a H message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns H
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.HistoryResponse.H;

            /**
             * Decodes a H message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns H
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.HistoryResponse.H;

            /**
             * Verifies a H message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a H message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns H
             */
            public static fromObject(object: { [k: string]: any }): msg.HistoryResponse.H;

            /**
             * Creates a plain object from a H message. Also converts values to other types if specified.
             * @param message H
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: msg.HistoryResponse.H, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this H to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a RoomRedLimitRequest. */
    interface IRoomRedLimitRequest {

        /** RoomRedLimitRequest roomNumber */
        roomNumber?: (string|null);
    }

    /** Represents a RoomRedLimitRequest. */
    class RoomRedLimitRequest implements IRoomRedLimitRequest {

        /**
         * Constructs a new RoomRedLimitRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomRedLimitRequest);

        /** RoomRedLimitRequest roomNumber. */
        public roomNumber: string;

        /**
         * Creates a new RoomRedLimitRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomRedLimitRequest instance
         */
        public static create(properties?: msg.IRoomRedLimitRequest): msg.RoomRedLimitRequest;

        /**
         * Encodes the specified RoomRedLimitRequest message. Does not implicitly {@link msg.RoomRedLimitRequest.verify|verify} messages.
         * @param message RoomRedLimitRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomRedLimitRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomRedLimitRequest message, length delimited. Does not implicitly {@link msg.RoomRedLimitRequest.verify|verify} messages.
         * @param message RoomRedLimitRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomRedLimitRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomRedLimitRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomRedLimitRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomRedLimitRequest;

        /**
         * Decodes a RoomRedLimitRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomRedLimitRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomRedLimitRequest;

        /**
         * Verifies a RoomRedLimitRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomRedLimitRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomRedLimitRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomRedLimitRequest;

        /**
         * Creates a plain object from a RoomRedLimitRequest message. Also converts values to other types if specified.
         * @param message RoomRedLimitRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomRedLimitRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomRedLimitRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomRedLimitResponse. */
    interface IRoomRedLimitResponse {

        /** RoomRedLimitResponse code */
        code?: (number|null);

        /** RoomRedLimitResponse roomNumber */
        roomNumber?: (string|null);

        /** RoomRedLimitResponse minBet */
        minBet?: (number|null);

        /** RoomRedLimitResponse maxBet */
        maxBet?: (number|null);
    }

    /** Represents a RoomRedLimitResponse. */
    class RoomRedLimitResponse implements IRoomRedLimitResponse {

        /**
         * Constructs a new RoomRedLimitResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomRedLimitResponse);

        /** RoomRedLimitResponse code. */
        public code: number;

        /** RoomRedLimitResponse roomNumber. */
        public roomNumber: string;

        /** RoomRedLimitResponse minBet. */
        public minBet: number;

        /** RoomRedLimitResponse maxBet. */
        public maxBet: number;

        /**
         * Creates a new RoomRedLimitResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomRedLimitResponse instance
         */
        public static create(properties?: msg.IRoomRedLimitResponse): msg.RoomRedLimitResponse;

        /**
         * Encodes the specified RoomRedLimitResponse message. Does not implicitly {@link msg.RoomRedLimitResponse.verify|verify} messages.
         * @param message RoomRedLimitResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomRedLimitResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomRedLimitResponse message, length delimited. Does not implicitly {@link msg.RoomRedLimitResponse.verify|verify} messages.
         * @param message RoomRedLimitResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomRedLimitResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomRedLimitResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomRedLimitResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomRedLimitResponse;

        /**
         * Decodes a RoomRedLimitResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomRedLimitResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomRedLimitResponse;

        /**
         * Verifies a RoomRedLimitResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomRedLimitResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomRedLimitResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomRedLimitResponse;

        /**
         * Creates a plain object from a RoomRedLimitResponse message. Also converts values to other types if specified.
         * @param message RoomRedLimitResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomRedLimitResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomRedLimitResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoundPlayInfoPush. */
    interface IRoundPlayInfoPush {

        /** RoundPlayInfoPush serverTime */
        serverTime?: (number|Long|null);

        /** RoundPlayInfoPush code */
        code?: (number|null);

        /** RoundPlayInfoPush infoBetAll */
        infoBetAll?: (msg.IInfoBet[]|null);

        /** RoundPlayInfoPush usersOnDesk */
        usersOnDesk?: (msg.RoundPlayInfoPush.IUserOnDesk[]|null);

        /** RoundPlayInfoPush roomNumber */
        roomNumber?: (string|null);

        /** RoundPlayInfoPush roundID */
        roundID?: (number|null);

        /** RoundPlayInfoPush startTime */
        startTime?: (number|null);

        /** RoundPlayInfoPush infoBetMe */
        infoBetMe?: (msg.IInfoBet[]|null);

        /** RoundPlayInfoPush luckyNum */
        luckyNum?: (string|null);

        /** RoundPlayInfoPush luckyNumLastRound */
        luckyNumLastRound?: (string|null);
    }

    /** Represents a RoundPlayInfoPush. */
    class RoundPlayInfoPush implements IRoundPlayInfoPush {

        /**
         * Constructs a new RoundPlayInfoPush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoundPlayInfoPush);

        /** RoundPlayInfoPush serverTime. */
        public serverTime: (number|Long);

        /** RoundPlayInfoPush code. */
        public code: number;

        /** RoundPlayInfoPush infoBetAll. */
        public infoBetAll: msg.IInfoBet[];

        /** RoundPlayInfoPush usersOnDesk. */
        public usersOnDesk: msg.RoundPlayInfoPush.IUserOnDesk[];

        /** RoundPlayInfoPush roomNumber. */
        public roomNumber: string;

        /** RoundPlayInfoPush roundID. */
        public roundID: number;

        /** RoundPlayInfoPush startTime. */
        public startTime: number;

        /** RoundPlayInfoPush infoBetMe. */
        public infoBetMe: msg.IInfoBet[];

        /** RoundPlayInfoPush luckyNum. */
        public luckyNum: string;

        /** RoundPlayInfoPush luckyNumLastRound. */
        public luckyNumLastRound: string;

        /**
         * Creates a new RoundPlayInfoPush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoundPlayInfoPush instance
         */
        public static create(properties?: msg.IRoundPlayInfoPush): msg.RoundPlayInfoPush;

        /**
         * Encodes the specified RoundPlayInfoPush message. Does not implicitly {@link msg.RoundPlayInfoPush.verify|verify} messages.
         * @param message RoundPlayInfoPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoundPlayInfoPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoundPlayInfoPush message, length delimited. Does not implicitly {@link msg.RoundPlayInfoPush.verify|verify} messages.
         * @param message RoundPlayInfoPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoundPlayInfoPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoundPlayInfoPush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoundPlayInfoPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoundPlayInfoPush;

        /**
         * Decodes a RoundPlayInfoPush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoundPlayInfoPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoundPlayInfoPush;

        /**
         * Verifies a RoundPlayInfoPush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoundPlayInfoPush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoundPlayInfoPush
         */
        public static fromObject(object: { [k: string]: any }): msg.RoundPlayInfoPush;

        /**
         * Creates a plain object from a RoundPlayInfoPush message. Also converts values to other types if specified.
         * @param message RoundPlayInfoPush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoundPlayInfoPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoundPlayInfoPush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace RoundPlayInfoPush {

        /** Properties of a UserOnDesk. */
        interface IUserOnDesk {

            /** UserOnDesk userID */
            userID?: (number|null);

            /** UserOnDesk headUrl */
            headUrl?: (string|null);

            /** UserOnDesk balance */
            balance?: (number|null);

            /** UserOnDesk lockMoney */
            lockMoney?: (number|null);

            /** UserOnDesk userName */
            userName?: (string|null);
        }

        /** Represents a UserOnDesk. */
        class UserOnDesk implements IUserOnDesk {

            /**
             * Constructs a new UserOnDesk.
             * @param [properties] Properties to set
             */
            constructor(properties?: msg.RoundPlayInfoPush.IUserOnDesk);

            /** UserOnDesk userID. */
            public userID: number;

            /** UserOnDesk headUrl. */
            public headUrl: string;

            /** UserOnDesk balance. */
            public balance: number;

            /** UserOnDesk lockMoney. */
            public lockMoney: number;

            /** UserOnDesk userName. */
            public userName: string;

            /**
             * Creates a new UserOnDesk instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserOnDesk instance
             */
            public static create(properties?: msg.RoundPlayInfoPush.IUserOnDesk): msg.RoundPlayInfoPush.UserOnDesk;

            /**
             * Encodes the specified UserOnDesk message. Does not implicitly {@link msg.RoundPlayInfoPush.UserOnDesk.verify|verify} messages.
             * @param message UserOnDesk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: msg.RoundPlayInfoPush.IUserOnDesk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UserOnDesk message, length delimited. Does not implicitly {@link msg.RoundPlayInfoPush.UserOnDesk.verify|verify} messages.
             * @param message UserOnDesk message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: msg.RoundPlayInfoPush.IUserOnDesk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UserOnDesk message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserOnDesk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoundPlayInfoPush.UserOnDesk;

            /**
             * Decodes a UserOnDesk message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserOnDesk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoundPlayInfoPush.UserOnDesk;

            /**
             * Verifies a UserOnDesk message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UserOnDesk message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserOnDesk
             */
            public static fromObject(object: { [k: string]: any }): msg.RoundPlayInfoPush.UserOnDesk;

            /**
             * Creates a plain object from a UserOnDesk message. Also converts values to other types if specified.
             * @param message UserOnDesk
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: msg.RoundPlayInfoPush.UserOnDesk, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UserOnDesk to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a RoomListLobbyPush. */
    interface IRoomListLobbyPush {

        /** RoomListLobbyPush serverTime */
        serverTime?: (number|Long|null);

        /** RoomListLobbyPush code */
        code?: (number|null);

        /** RoomListLobbyPush rooms */
        rooms?: (msg.RoomListLobbyPush.IOneRoom[]|null);
    }

    /** Represents a RoomListLobbyPush. */
    class RoomListLobbyPush implements IRoomListLobbyPush {

        /**
         * Constructs a new RoomListLobbyPush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomListLobbyPush);

        /** RoomListLobbyPush serverTime. */
        public serverTime: (number|Long);

        /** RoomListLobbyPush code. */
        public code: number;

        /** RoomListLobbyPush rooms. */
        public rooms: msg.RoomListLobbyPush.IOneRoom[];

        /**
         * Creates a new RoomListLobbyPush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomListLobbyPush instance
         */
        public static create(properties?: msg.IRoomListLobbyPush): msg.RoomListLobbyPush;

        /**
         * Encodes the specified RoomListLobbyPush message. Does not implicitly {@link msg.RoomListLobbyPush.verify|verify} messages.
         * @param message RoomListLobbyPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomListLobbyPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomListLobbyPush message, length delimited. Does not implicitly {@link msg.RoomListLobbyPush.verify|verify} messages.
         * @param message RoomListLobbyPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomListLobbyPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomListLobbyPush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomListLobbyPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomListLobbyPush;

        /**
         * Decodes a RoomListLobbyPush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomListLobbyPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomListLobbyPush;

        /**
         * Verifies a RoomListLobbyPush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomListLobbyPush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomListLobbyPush
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomListLobbyPush;

        /**
         * Creates a plain object from a RoomListLobbyPush message. Also converts values to other types if specified.
         * @param message RoomListLobbyPush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomListLobbyPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomListLobbyPush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace RoomListLobbyPush {

        /** Properties of an OneRoom. */
        interface IOneRoom {

            /** OneRoom roomNumber */
            roomNumber?: (string|null);

            /** OneRoom open */
            open?: (number|null);
        }

        /** Represents an OneRoom. */
        class OneRoom implements IOneRoom {

            /**
             * Constructs a new OneRoom.
             * @param [properties] Properties to set
             */
            constructor(properties?: msg.RoomListLobbyPush.IOneRoom);

            /** OneRoom roomNumber. */
            public roomNumber: string;

            /** OneRoom open. */
            public open: number;

            /**
             * Creates a new OneRoom instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OneRoom instance
             */
            public static create(properties?: msg.RoomListLobbyPush.IOneRoom): msg.RoomListLobbyPush.OneRoom;

            /**
             * Encodes the specified OneRoom message. Does not implicitly {@link msg.RoomListLobbyPush.OneRoom.verify|verify} messages.
             * @param message OneRoom message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: msg.RoomListLobbyPush.IOneRoom, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OneRoom message, length delimited. Does not implicitly {@link msg.RoomListLobbyPush.OneRoom.verify|verify} messages.
             * @param message OneRoom message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: msg.RoomListLobbyPush.IOneRoom, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OneRoom message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneRoom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomListLobbyPush.OneRoom;

            /**
             * Decodes an OneRoom message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneRoom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomListLobbyPush.OneRoom;

            /**
             * Verifies an OneRoom message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OneRoom message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneRoom
             */
            public static fromObject(object: { [k: string]: any }): msg.RoomListLobbyPush.OneRoom;

            /**
             * Creates a plain object from an OneRoom message. Also converts values to other types if specified.
             * @param message OneRoom
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: msg.RoomListLobbyPush.OneRoom, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneRoom to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a BetPush. */
    interface IBetPush {

        /** BetPush serverTime */
        serverTime?: (number|Long|null);

        /** BetPush code */
        code?: (number|null);

        /** BetPush userID */
        userID?: (number|null);

        /** BetPush info */
        info?: (msg.IInfoBet|null);

        /** BetPush balance */
        balance?: (number|null);

        /** BetPush lockMoney */
        lockMoney?: (number|null);
    }

    /** Represents a BetPush. */
    class BetPush implements IBetPush {

        /**
         * Constructs a new BetPush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBetPush);

        /** BetPush serverTime. */
        public serverTime: (number|Long);

        /** BetPush code. */
        public code: number;

        /** BetPush userID. */
        public userID: number;

        /** BetPush info. */
        public info?: (msg.IInfoBet|null);

        /** BetPush balance. */
        public balance: number;

        /** BetPush lockMoney. */
        public lockMoney: number;

        /**
         * Creates a new BetPush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BetPush instance
         */
        public static create(properties?: msg.IBetPush): msg.BetPush;

        /**
         * Encodes the specified BetPush message. Does not implicitly {@link msg.BetPush.verify|verify} messages.
         * @param message BetPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBetPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BetPush message, length delimited. Does not implicitly {@link msg.BetPush.verify|verify} messages.
         * @param message BetPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBetPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BetPush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BetPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BetPush;

        /**
         * Decodes a BetPush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BetPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BetPush;

        /**
         * Verifies a BetPush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BetPush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BetPush
         */
        public static fromObject(object: { [k: string]: any }): msg.BetPush;

        /**
         * Creates a plain object from a BetPush message. Also converts values to other types if specified.
         * @param message BetPush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BetPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BetPush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResultRoundPush. */
    interface IResultRoundPush {

        /** ResultRoundPush serverTime */
        serverTime?: (number|Long|null);

        /** ResultRoundPush code */
        code?: (number|null);

        /** ResultRoundPush roomNumber */
        roomNumber?: (string|null);

        /** ResultRoundPush luckyNum */
        luckyNum?: (string|null);

        /** ResultRoundPush offsetMe */
        offsetMe?: (number|null);

        /** ResultRoundPush offsetUsersDesk */
        offsetUsersDesk?: (number[]|null);
    }

    /** Represents a ResultRoundPush. */
    class ResultRoundPush implements IResultRoundPush {

        /**
         * Constructs a new ResultRoundPush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IResultRoundPush);

        /** ResultRoundPush serverTime. */
        public serverTime: (number|Long);

        /** ResultRoundPush code. */
        public code: number;

        /** ResultRoundPush roomNumber. */
        public roomNumber: string;

        /** ResultRoundPush luckyNum. */
        public luckyNum: string;

        /** ResultRoundPush offsetMe. */
        public offsetMe: number;

        /** ResultRoundPush offsetUsersDesk. */
        public offsetUsersDesk: number[];

        /**
         * Creates a new ResultRoundPush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResultRoundPush instance
         */
        public static create(properties?: msg.IResultRoundPush): msg.ResultRoundPush;

        /**
         * Encodes the specified ResultRoundPush message. Does not implicitly {@link msg.ResultRoundPush.verify|verify} messages.
         * @param message ResultRoundPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IResultRoundPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResultRoundPush message, length delimited. Does not implicitly {@link msg.ResultRoundPush.verify|verify} messages.
         * @param message ResultRoundPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IResultRoundPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResultRoundPush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResultRoundPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ResultRoundPush;

        /**
         * Decodes a ResultRoundPush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResultRoundPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ResultRoundPush;

        /**
         * Verifies a ResultRoundPush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResultRoundPush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResultRoundPush
         */
        public static fromObject(object: { [k: string]: any }): msg.ResultRoundPush;

        /**
         * Creates a plain object from a ResultRoundPush message. Also converts values to other types if specified.
         * @param message ResultRoundPush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ResultRoundPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResultRoundPush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpdateBalancePush. */
    interface IUpdateBalancePush {

        /** UpdateBalancePush serverTime */
        serverTime?: (number|Long|null);

        /** UpdateBalancePush code */
        code?: (number|null);

        /** UpdateBalancePush balance */
        balance?: (number|null);

        /** UpdateBalancePush lockMoney */
        lockMoney?: (number|null);

        /** UpdateBalancePush diffMoney */
        diffMoney?: (number|null);

        /** UpdateBalancePush userID */
        userID?: (number|null);
    }

    /** Represents an UpdateBalancePush. */
    class UpdateBalancePush implements IUpdateBalancePush {

        /**
         * Constructs a new UpdateBalancePush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUpdateBalancePush);

        /** UpdateBalancePush serverTime. */
        public serverTime: (number|Long);

        /** UpdateBalancePush code. */
        public code: number;

        /** UpdateBalancePush balance. */
        public balance: number;

        /** UpdateBalancePush lockMoney. */
        public lockMoney: number;

        /** UpdateBalancePush diffMoney. */
        public diffMoney: number;

        /** UpdateBalancePush userID. */
        public userID: number;

        /**
         * Creates a new UpdateBalancePush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateBalancePush instance
         */
        public static create(properties?: msg.IUpdateBalancePush): msg.UpdateBalancePush;

        /**
         * Encodes the specified UpdateBalancePush message. Does not implicitly {@link msg.UpdateBalancePush.verify|verify} messages.
         * @param message UpdateBalancePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUpdateBalancePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateBalancePush message, length delimited. Does not implicitly {@link msg.UpdateBalancePush.verify|verify} messages.
         * @param message UpdateBalancePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUpdateBalancePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateBalancePush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateBalancePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.UpdateBalancePush;

        /**
         * Decodes an UpdateBalancePush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateBalancePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.UpdateBalancePush;

        /**
         * Verifies an UpdateBalancePush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateBalancePush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateBalancePush
         */
        public static fromObject(object: { [k: string]: any }): msg.UpdateBalancePush;

        /**
         * Creates a plain object from an UpdateBalancePush message. Also converts values to other types if specified.
         * @param message UpdateBalancePush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UpdateBalancePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateBalancePush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpdateServicePush. */
    interface IUpdateServicePush {

        /** UpdateServicePush serverTime */
        serverTime?: (number|Long|null);

        /** UpdateServicePush code */
        code?: (number|null);

        /** UpdateServicePush msg */
        msg?: (msg.UpdateServicePush.IMsgInfo|null);
    }

    /** Represents an UpdateServicePush. */
    class UpdateServicePush implements IUpdateServicePush {

        /**
         * Constructs a new UpdateServicePush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUpdateServicePush);

        /** UpdateServicePush serverTime. */
        public serverTime: (number|Long);

        /** UpdateServicePush code. */
        public code: number;

        /** UpdateServicePush msg. */
        public msg?: (msg.UpdateServicePush.IMsgInfo|null);

        /**
         * Creates a new UpdateServicePush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateServicePush instance
         */
        public static create(properties?: msg.IUpdateServicePush): msg.UpdateServicePush;

        /**
         * Encodes the specified UpdateServicePush message. Does not implicitly {@link msg.UpdateServicePush.verify|verify} messages.
         * @param message UpdateServicePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUpdateServicePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateServicePush message, length delimited. Does not implicitly {@link msg.UpdateServicePush.verify|verify} messages.
         * @param message UpdateServicePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUpdateServicePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateServicePush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateServicePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.UpdateServicePush;

        /**
         * Decodes an UpdateServicePush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateServicePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.UpdateServicePush;

        /**
         * Verifies an UpdateServicePush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateServicePush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateServicePush
         */
        public static fromObject(object: { [k: string]: any }): msg.UpdateServicePush;

        /**
         * Creates a plain object from an UpdateServicePush message. Also converts values to other types if specified.
         * @param message UpdateServicePush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UpdateServicePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateServicePush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace UpdateServicePush {

        /** Properties of a MsgInfo. */
        interface IMsgInfo {

            /** MsgInfo state */
            state?: (boolean|null);
        }

        /** Represents a MsgInfo. */
        class MsgInfo implements IMsgInfo {

            /**
             * Constructs a new MsgInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: msg.UpdateServicePush.IMsgInfo);

            /** MsgInfo state. */
            public state: boolean;

            /**
             * Creates a new MsgInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MsgInfo instance
             */
            public static create(properties?: msg.UpdateServicePush.IMsgInfo): msg.UpdateServicePush.MsgInfo;

            /**
             * Encodes the specified MsgInfo message. Does not implicitly {@link msg.UpdateServicePush.MsgInfo.verify|verify} messages.
             * @param message MsgInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: msg.UpdateServicePush.IMsgInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgInfo message, length delimited. Does not implicitly {@link msg.UpdateServicePush.MsgInfo.verify|verify} messages.
             * @param message MsgInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: msg.UpdateServicePush.IMsgInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MsgInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.UpdateServicePush.MsgInfo;

            /**
             * Decodes a MsgInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MsgInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.UpdateServicePush.MsgInfo;

            /**
             * Verifies a MsgInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgInfo
             */
            public static fromObject(object: { [k: string]: any }): msg.UpdateServicePush.MsgInfo;

            /**
             * Creates a plain object from a MsgInfo message. Also converts values to other types if specified.
             * @param message MsgInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: msg.UpdateServicePush.MsgInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a PauseServicePush. */
    interface IPauseServicePush {

        /** PauseServicePush serverTime */
        serverTime?: (number|Long|null);

        /** PauseServicePush code */
        code?: (number|null);
    }

    /** Represents a PauseServicePush. */
    class PauseServicePush implements IPauseServicePush {

        /**
         * Constructs a new PauseServicePush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPauseServicePush);

        /** PauseServicePush serverTime. */
        public serverTime: (number|Long);

        /** PauseServicePush code. */
        public code: number;

        /**
         * Creates a new PauseServicePush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PauseServicePush instance
         */
        public static create(properties?: msg.IPauseServicePush): msg.PauseServicePush;

        /**
         * Encodes the specified PauseServicePush message. Does not implicitly {@link msg.PauseServicePush.verify|verify} messages.
         * @param message PauseServicePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPauseServicePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PauseServicePush message, length delimited. Does not implicitly {@link msg.PauseServicePush.verify|verify} messages.
         * @param message PauseServicePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPauseServicePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PauseServicePush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PauseServicePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PauseServicePush;

        /**
         * Decodes a PauseServicePush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PauseServicePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PauseServicePush;

        /**
         * Verifies a PauseServicePush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PauseServicePush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PauseServicePush
         */
        public static fromObject(object: { [k: string]: any }): msg.PauseServicePush;

        /**
         * Creates a plain object from a PauseServicePush message. Also converts values to other types if specified.
         * @param message PauseServicePush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PauseServicePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PauseServicePush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a KickedOutPush. */
    interface IKickedOutPush {

        /** KickedOutPush serverTime */
        serverTime?: (number|Long|null);

        /** KickedOutPush code */
        code?: (number|null);

        /** KickedOutPush reason */
        reason?: (number|null);
    }

    /** Represents a KickedOutPush. */
    class KickedOutPush implements IKickedOutPush {

        /**
         * Constructs a new KickedOutPush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IKickedOutPush);

        /** KickedOutPush serverTime. */
        public serverTime: (number|Long);

        /** KickedOutPush code. */
        public code: number;

        /** KickedOutPush reason. */
        public reason: number;

        /**
         * Creates a new KickedOutPush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KickedOutPush instance
         */
        public static create(properties?: msg.IKickedOutPush): msg.KickedOutPush;

        /**
         * Encodes the specified KickedOutPush message. Does not implicitly {@link msg.KickedOutPush.verify|verify} messages.
         * @param message KickedOutPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IKickedOutPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KickedOutPush message, length delimited. Does not implicitly {@link msg.KickedOutPush.verify|verify} messages.
         * @param message KickedOutPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IKickedOutPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KickedOutPush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KickedOutPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.KickedOutPush;

        /**
         * Decodes a KickedOutPush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KickedOutPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.KickedOutPush;

        /**
         * Verifies a KickedOutPush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KickedOutPush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KickedOutPush
         */
        public static fromObject(object: { [k: string]: any }): msg.KickedOutPush;

        /**
         * Creates a plain object from a KickedOutPush message. Also converts values to other types if specified.
         * @param message KickedOutPush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.KickedOutPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KickedOutPush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PoolTrend. */
    interface IPoolTrend {

        /** PoolTrend changeTime */
        changeTime?: (number|null);

        /** PoolTrend changeMoney */
        changeMoney?: (number|null);

        /** PoolTrend user */
        user?: (msg.PoolTrend.IPartnerInfo|null);
    }

    /** Represents a PoolTrend. */
    class PoolTrend implements IPoolTrend {

        /**
         * Constructs a new PoolTrend.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPoolTrend);

        /** PoolTrend changeTime. */
        public changeTime: number;

        /** PoolTrend changeMoney. */
        public changeMoney: number;

        /** PoolTrend user. */
        public user?: (msg.PoolTrend.IPartnerInfo|null);

        /**
         * Creates a new PoolTrend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PoolTrend instance
         */
        public static create(properties?: msg.IPoolTrend): msg.PoolTrend;

        /**
         * Encodes the specified PoolTrend message. Does not implicitly {@link msg.PoolTrend.verify|verify} messages.
         * @param message PoolTrend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPoolTrend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PoolTrend message, length delimited. Does not implicitly {@link msg.PoolTrend.verify|verify} messages.
         * @param message PoolTrend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPoolTrend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PoolTrend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PoolTrend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PoolTrend;

        /**
         * Decodes a PoolTrend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PoolTrend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PoolTrend;

        /**
         * Verifies a PoolTrend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PoolTrend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PoolTrend
         */
        public static fromObject(object: { [k: string]: any }): msg.PoolTrend;

        /**
         * Creates a plain object from a PoolTrend message. Also converts values to other types if specified.
         * @param message PoolTrend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PoolTrend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PoolTrend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace PoolTrend {

        /** Properties of a PartnerInfo. */
        interface IPartnerInfo {

            /** PartnerInfo userID */
            userID?: (number|null);

            /** PartnerInfo userName */
            userName?: (string|null);

            /** PartnerInfo headUrl */
            headUrl?: (string|null);
        }

        /** Represents a PartnerInfo. */
        class PartnerInfo implements IPartnerInfo {

            /**
             * Constructs a new PartnerInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: msg.PoolTrend.IPartnerInfo);

            /** PartnerInfo userID. */
            public userID: number;

            /** PartnerInfo userName. */
            public userName: string;

            /** PartnerInfo headUrl. */
            public headUrl: string;

            /**
             * Creates a new PartnerInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PartnerInfo instance
             */
            public static create(properties?: msg.PoolTrend.IPartnerInfo): msg.PoolTrend.PartnerInfo;

            /**
             * Encodes the specified PartnerInfo message. Does not implicitly {@link msg.PoolTrend.PartnerInfo.verify|verify} messages.
             * @param message PartnerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: msg.PoolTrend.IPartnerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PartnerInfo message, length delimited. Does not implicitly {@link msg.PoolTrend.PartnerInfo.verify|verify} messages.
             * @param message PartnerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: msg.PoolTrend.IPartnerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PartnerInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PartnerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PoolTrend.PartnerInfo;

            /**
             * Decodes a PartnerInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PartnerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PoolTrend.PartnerInfo;

            /**
             * Verifies a PartnerInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PartnerInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PartnerInfo
             */
            public static fromObject(object: { [k: string]: any }): msg.PoolTrend.PartnerInfo;

            /**
             * Creates a plain object from a PartnerInfo message. Also converts values to other types if specified.
             * @param message PartnerInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: msg.PoolTrend.PartnerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PartnerInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an ErrorMsg. */
    interface IErrorMsg {

        /** ErrorMsg serverTime */
        serverTime?: (number|Long|null);

        /** ErrorMsg code */
        code?: (number|null);
    }

    /** Represents an ErrorMsg. */
    class ErrorMsg implements IErrorMsg {

        /**
         * Constructs a new ErrorMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IErrorMsg);

        /** ErrorMsg serverTime. */
        public serverTime: (number|Long);

        /** ErrorMsg code. */
        public code: number;

        /**
         * Creates a new ErrorMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorMsg instance
         */
        public static create(properties?: msg.IErrorMsg): msg.ErrorMsg;

        /**
         * Encodes the specified ErrorMsg message. Does not implicitly {@link msg.ErrorMsg.verify|verify} messages.
         * @param message ErrorMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IErrorMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorMsg message, length delimited. Does not implicitly {@link msg.ErrorMsg.verify|verify} messages.
         * @param message ErrorMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IErrorMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ErrorMsg;

        /**
         * Decodes an ErrorMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ErrorMsg;

        /**
         * Verifies an ErrorMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorMsg
         */
        public static fromObject(object: { [k: string]: any }): msg.ErrorMsg;

        /**
         * Creates a plain object from an ErrorMsg message. Also converts values to other types if specified.
         * @param message ErrorMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ErrorMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserRankRequest. */
    interface IUserRankRequest {

        /** UserRankRequest roomNumber */
        roomNumber?: (string|null);
    }

    /** Represents a UserRankRequest. */
    class UserRankRequest implements IUserRankRequest {

        /**
         * Constructs a new UserRankRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserRankRequest);

        /** UserRankRequest roomNumber. */
        public roomNumber: string;

        /**
         * Creates a new UserRankRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserRankRequest instance
         */
        public static create(properties?: msg.IUserRankRequest): msg.UserRankRequest;

        /**
         * Encodes the specified UserRankRequest message. Does not implicitly {@link msg.UserRankRequest.verify|verify} messages.
         * @param message UserRankRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserRankRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserRankRequest message, length delimited. Does not implicitly {@link msg.UserRankRequest.verify|verify} messages.
         * @param message UserRankRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserRankRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserRankRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserRankRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.UserRankRequest;

        /**
         * Decodes a UserRankRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserRankRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.UserRankRequest;

        /**
         * Verifies a UserRankRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserRankRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserRankRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.UserRankRequest;

        /**
         * Creates a plain object from a UserRankRequest message. Also converts values to other types if specified.
         * @param message UserRankRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserRankRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserRankRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserInfoRank. */
    interface IUserInfoRank {

        /** UserInfoRank userName */
        userName?: (string|null);

        /** UserInfoRank headUrl */
        headUrl?: (string|null);

        /** UserInfoRank balanceAvail */
        balanceAvail?: (number|null);

        /** UserInfoRank sumWinRound */
        sumWinRound?: (number|null);

        /** UserInfoRank sumBetVal */
        sumBetVal?: (number|Long|null);

        /** UserInfoRank userID */
        userID?: (number|null);
    }

    /** Represents a UserInfoRank. */
    class UserInfoRank implements IUserInfoRank {

        /**
         * Constructs a new UserInfoRank.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserInfoRank);

        /** UserInfoRank userName. */
        public userName: string;

        /** UserInfoRank headUrl. */
        public headUrl: string;

        /** UserInfoRank balanceAvail. */
        public balanceAvail: number;

        /** UserInfoRank sumWinRound. */
        public sumWinRound: number;

        /** UserInfoRank sumBetVal. */
        public sumBetVal: (number|Long);

        /** UserInfoRank userID. */
        public userID: number;

        /**
         * Creates a new UserInfoRank instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserInfoRank instance
         */
        public static create(properties?: msg.IUserInfoRank): msg.UserInfoRank;

        /**
         * Encodes the specified UserInfoRank message. Does not implicitly {@link msg.UserInfoRank.verify|verify} messages.
         * @param message UserInfoRank message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserInfoRank, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserInfoRank message, length delimited. Does not implicitly {@link msg.UserInfoRank.verify|verify} messages.
         * @param message UserInfoRank message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserInfoRank, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserInfoRank message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserInfoRank
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.UserInfoRank;

        /**
         * Decodes a UserInfoRank message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserInfoRank
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.UserInfoRank;

        /**
         * Verifies a UserInfoRank message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserInfoRank message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserInfoRank
         */
        public static fromObject(object: { [k: string]: any }): msg.UserInfoRank;

        /**
         * Creates a plain object from a UserInfoRank message. Also converts values to other types if specified.
         * @param message UserInfoRank
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserInfoRank, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserInfoRank to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserRankResponse. */
    interface IUserRankResponse {

        /** UserRankResponse serverTime */
        serverTime?: (number|Long|null);

        /** UserRankResponse code */
        code?: (number|null);

        /** UserRankResponse Users */
        Users?: (msg.IUserInfoRank[]|null);
    }

    /** Represents a UserRankResponse. */
    class UserRankResponse implements IUserRankResponse {

        /**
         * Constructs a new UserRankResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserRankResponse);

        /** UserRankResponse serverTime. */
        public serverTime: (number|Long);

        /** UserRankResponse code. */
        public code: number;

        /** UserRankResponse Users. */
        public Users: msg.IUserInfoRank[];

        /**
         * Creates a new UserRankResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserRankResponse instance
         */
        public static create(properties?: msg.IUserRankResponse): msg.UserRankResponse;

        /**
         * Encodes the specified UserRankResponse message. Does not implicitly {@link msg.UserRankResponse.verify|verify} messages.
         * @param message UserRankResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserRankResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserRankResponse message, length delimited. Does not implicitly {@link msg.UserRankResponse.verify|verify} messages.
         * @param message UserRankResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserRankResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserRankResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserRankResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.UserRankResponse;

        /**
         * Decodes a UserRankResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserRankResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.UserRankResponse;

        /**
         * Verifies a UserRankResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserRankResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserRankResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.UserRankResponse;

        /**
         * Creates a plain object from a UserRankResponse message. Also converts values to other types if specified.
         * @param message UserRankResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserRankResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserRankResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CancelRoundPush. */
    interface ICancelRoundPush {

        /** CancelRoundPush serverTime */
        serverTime?: (number|Long|null);

        /** CancelRoundPush code */
        code?: (number|null);

        /** CancelRoundPush issueID */
        issueID?: (string|null);
    }

    /** Represents a CancelRoundPush. */
    class CancelRoundPush implements ICancelRoundPush {

        /**
         * Constructs a new CancelRoundPush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ICancelRoundPush);

        /** CancelRoundPush serverTime. */
        public serverTime: (number|Long);

        /** CancelRoundPush code. */
        public code: number;

        /** CancelRoundPush issueID. */
        public issueID: string;

        /**
         * Creates a new CancelRoundPush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CancelRoundPush instance
         */
        public static create(properties?: msg.ICancelRoundPush): msg.CancelRoundPush;

        /**
         * Encodes the specified CancelRoundPush message. Does not implicitly {@link msg.CancelRoundPush.verify|verify} messages.
         * @param message CancelRoundPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ICancelRoundPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CancelRoundPush message, length delimited. Does not implicitly {@link msg.CancelRoundPush.verify|verify} messages.
         * @param message CancelRoundPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ICancelRoundPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CancelRoundPush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CancelRoundPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.CancelRoundPush;

        /**
         * Decodes a CancelRoundPush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CancelRoundPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.CancelRoundPush;

        /**
         * Verifies a CancelRoundPush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CancelRoundPush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CancelRoundPush
         */
        public static fromObject(object: { [k: string]: any }): msg.CancelRoundPush;

        /**
         * Creates a plain object from a CancelRoundPush message. Also converts values to other types if specified.
         * @param message CancelRoundPush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.CancelRoundPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CancelRoundPush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BetRecordRequest. */
    interface IBetRecordRequest {

        /** BetRecordRequest userID */
        userID?: (number|null);
    }

    /** Represents a BetRecordRequest. */
    class BetRecordRequest implements IBetRecordRequest {

        /**
         * Constructs a new BetRecordRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBetRecordRequest);

        /** BetRecordRequest userID. */
        public userID: number;

        /**
         * Creates a new BetRecordRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BetRecordRequest instance
         */
        public static create(properties?: msg.IBetRecordRequest): msg.BetRecordRequest;

        /**
         * Encodes the specified BetRecordRequest message. Does not implicitly {@link msg.BetRecordRequest.verify|verify} messages.
         * @param message BetRecordRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBetRecordRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BetRecordRequest message, length delimited. Does not implicitly {@link msg.BetRecordRequest.verify|verify} messages.
         * @param message BetRecordRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBetRecordRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BetRecordRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BetRecordRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BetRecordRequest;

        /**
         * Decodes a BetRecordRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BetRecordRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BetRecordRequest;

        /**
         * Verifies a BetRecordRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BetRecordRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BetRecordRequest
         */
        public static fromObject(object: { [k: string]: any }): msg.BetRecordRequest;

        /**
         * Creates a plain object from a BetRecordRequest message. Also converts values to other types if specified.
         * @param message BetRecordRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BetRecordRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BetRecordRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BetRecordResponse. */
    interface IBetRecordResponse {

        /** BetRecordResponse serverTime */
        serverTime?: (number|Long|null);

        /** BetRecordResponse code */
        code?: (number|null);

        /** BetRecordResponse list */
        list?: (msg.BetRecordResponse.IR[]|null);
    }

    /** Represents a BetRecordResponse. */
    class BetRecordResponse implements IBetRecordResponse {

        /**
         * Constructs a new BetRecordResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBetRecordResponse);

        /** BetRecordResponse serverTime. */
        public serverTime: (number|Long);

        /** BetRecordResponse code. */
        public code: number;

        /** BetRecordResponse list. */
        public list: msg.BetRecordResponse.IR[];

        /**
         * Creates a new BetRecordResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BetRecordResponse instance
         */
        public static create(properties?: msg.IBetRecordResponse): msg.BetRecordResponse;

        /**
         * Encodes the specified BetRecordResponse message. Does not implicitly {@link msg.BetRecordResponse.verify|verify} messages.
         * @param message BetRecordResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBetRecordResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BetRecordResponse message, length delimited. Does not implicitly {@link msg.BetRecordResponse.verify|verify} messages.
         * @param message BetRecordResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBetRecordResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BetRecordResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BetRecordResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BetRecordResponse;

        /**
         * Decodes a BetRecordResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BetRecordResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BetRecordResponse;

        /**
         * Verifies a BetRecordResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BetRecordResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BetRecordResponse
         */
        public static fromObject(object: { [k: string]: any }): msg.BetRecordResponse;

        /**
         * Creates a plain object from a BetRecordResponse message. Also converts values to other types if specified.
         * @param message BetRecordResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BetRecordResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BetRecordResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BetRecordResponse {

        /** Properties of a R. */
        interface IR {

            /** R issueID */
            issueID?: (string|null);

            /** R luckyNum */
            luckyNum?: (string|null);

            /** R bets */
            bets?: (msg.IInfoBet[]|null);

            /** R offset */
            offset?: (number|null);
        }

        /** Represents a R. */
        class R implements IR {

            /**
             * Constructs a new R.
             * @param [properties] Properties to set
             */
            constructor(properties?: msg.BetRecordResponse.IR);

            /** R issueID. */
            public issueID: string;

            /** R luckyNum. */
            public luckyNum: string;

            /** R bets. */
            public bets: msg.IInfoBet[];

            /** R offset. */
            public offset: number;

            /**
             * Creates a new R instance using the specified properties.
             * @param [properties] Properties to set
             * @returns R instance
             */
            public static create(properties?: msg.BetRecordResponse.IR): msg.BetRecordResponse.R;

            /**
             * Encodes the specified R message. Does not implicitly {@link msg.BetRecordResponse.R.verify|verify} messages.
             * @param message R message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: msg.BetRecordResponse.IR, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified R message, length delimited. Does not implicitly {@link msg.BetRecordResponse.R.verify|verify} messages.
             * @param message R message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: msg.BetRecordResponse.IR, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a R message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns R
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BetRecordResponse.R;

            /**
             * Decodes a R message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns R
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BetRecordResponse.R;

            /**
             * Verifies a R message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a R message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns R
             */
            public static fromObject(object: { [k: string]: any }): msg.BetRecordResponse.R;

            /**
             * Creates a plain object from a R message. Also converts values to other types if specified.
             * @param message R
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: msg.BetRecordResponse.R, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this R to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a ZhiBoUpdateBalancePush. */
    interface IZhiBoUpdateBalancePush {

        /** ZhiBoUpdateBalancePush serverTime */
        serverTime?: (number|Long|null);

        /** ZhiBoUpdateBalancePush userID */
        userID?: (number|null);

        /** ZhiBoUpdateBalancePush balance */
        balance?: (number|null);

        /** ZhiBoUpdateBalancePush lockMoney */
        lockMoney?: (number|null);

        /** ZhiBoUpdateBalancePush giftMoney */
        giftMoney?: (number|null);
    }

    /** Represents a ZhiBoUpdateBalancePush. */
    class ZhiBoUpdateBalancePush implements IZhiBoUpdateBalancePush {

        /**
         * Constructs a new ZhiBoUpdateBalancePush.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IZhiBoUpdateBalancePush);

        /** ZhiBoUpdateBalancePush serverTime. */
        public serverTime: (number|Long);

        /** ZhiBoUpdateBalancePush userID. */
        public userID: number;

        /** ZhiBoUpdateBalancePush balance. */
        public balance: number;

        /** ZhiBoUpdateBalancePush lockMoney. */
        public lockMoney: number;

        /** ZhiBoUpdateBalancePush giftMoney. */
        public giftMoney: number;

        /**
         * Creates a new ZhiBoUpdateBalancePush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZhiBoUpdateBalancePush instance
         */
        public static create(properties?: msg.IZhiBoUpdateBalancePush): msg.ZhiBoUpdateBalancePush;

        /**
         * Encodes the specified ZhiBoUpdateBalancePush message. Does not implicitly {@link msg.ZhiBoUpdateBalancePush.verify|verify} messages.
         * @param message ZhiBoUpdateBalancePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IZhiBoUpdateBalancePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZhiBoUpdateBalancePush message, length delimited. Does not implicitly {@link msg.ZhiBoUpdateBalancePush.verify|verify} messages.
         * @param message ZhiBoUpdateBalancePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IZhiBoUpdateBalancePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZhiBoUpdateBalancePush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZhiBoUpdateBalancePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ZhiBoUpdateBalancePush;

        /**
         * Decodes a ZhiBoUpdateBalancePush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZhiBoUpdateBalancePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ZhiBoUpdateBalancePush;

        /**
         * Verifies a ZhiBoUpdateBalancePush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZhiBoUpdateBalancePush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZhiBoUpdateBalancePush
         */
        public static fromObject(object: { [k: string]: any }): msg.ZhiBoUpdateBalancePush;

        /**
         * Creates a plain object from a ZhiBoUpdateBalancePush message. Also converts values to other types if specified.
         * @param message ZhiBoUpdateBalancePush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ZhiBoUpdateBalancePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZhiBoUpdateBalancePush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
