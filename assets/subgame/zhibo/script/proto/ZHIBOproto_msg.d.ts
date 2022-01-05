import * as $protobuf from "ZHIBO_protobufjs";
/** Namespace msg. */
export namespace msg {

    /** SubCommand enum. */
    enum SubCommand {
        EnumSubLoginReq = 0,
        EnumSubLoginResp = 1,
        EnumSubFrontEndLog = 2
    }

    /** Properties of a LoginReq. */
    interface ILoginReq {

        /** LoginReq userID */
        userID?: (number|null);

        /** LoginReq userName */
        userName?: (string|null);

        /** LoginReq userAvatar */
        userAvatar?: (string|null);
    }

    /** Represents a LoginReq. */
    class LoginReq implements ILoginReq {

        /**
         * Constructs a new LoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILoginReq);

        /** LoginReq userID. */
        public userID: number;

        /** LoginReq userName. */
        public userName: string;

        /** LoginReq userAvatar. */
        public userAvatar: string;

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginReq instance
         */
        public static create(properties?: msg.ILoginReq): msg.LoginReq;

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link msg.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link msg.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.LoginReq;

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.LoginReq;

        /**
         * Verifies a LoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginReq
         */
        public static fromObject(object: { [k: string]: any }): msg.LoginReq;

        /**
         * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
         * @param message LoginReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LoginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginResp. */
    interface ILoginResp {

        /** LoginResp result */
        result?: (msg.ICommandResult|null);

        /** LoginResp version */
        version?: (string|null);

        /** LoginResp roomList */
        roomList?: (msg.IRoomInfo[]|null);

        /** LoginResp lineList */
        lineList?: (string[]|null);

        /** LoginResp loadUrl */
        loadUrl?: (string|null);
    }

    /** Represents a LoginResp. */
    class LoginResp implements ILoginResp {

        /**
         * Constructs a new LoginResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILoginResp);

        /** LoginResp result. */
        public result?: (msg.ICommandResult|null);

        /** LoginResp version. */
        public version: string;

        /** LoginResp roomList. */
        public roomList: msg.IRoomInfo[];

        /** LoginResp lineList. */
        public lineList: string[];

        /** LoginResp loadUrl. */
        public loadUrl: string;

        /**
         * Creates a new LoginResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginResp instance
         */
        public static create(properties?: msg.ILoginResp): msg.LoginResp;

        /**
         * Encodes the specified LoginResp message. Does not implicitly {@link msg.LoginResp.verify|verify} messages.
         * @param message LoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILoginResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginResp message, length delimited. Does not implicitly {@link msg.LoginResp.verify|verify} messages.
         * @param message LoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILoginResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.LoginResp;

        /**
         * Decodes a LoginResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.LoginResp;

        /**
         * Verifies a LoginResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginResp
         */
        public static fromObject(object: { [k: string]: any }): msg.LoginResp;

        /**
         * Creates a plain object from a LoginResp message. Also converts values to other types if specified.
         * @param message LoginResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LoginResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomInfo. */
    interface IRoomInfo {

        /** RoomInfo liveUserName */
        liveUserName?: (string|null);

        /** RoomInfo gameCode */
        gameCode?: (string|null);

        /** RoomInfo roomCode */
        roomCode?: (string|null);

        /** RoomInfo roomUrl */
        roomUrl?: (string|null);

        /** RoomInfo liveUserAvatar */
        liveUserAvatar?: (string|null);
    }

    /** Represents a RoomInfo. */
    class RoomInfo implements IRoomInfo {

        /**
         * Constructs a new RoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomInfo);

        /** RoomInfo liveUserName. */
        public liveUserName: string;

        /** RoomInfo gameCode. */
        public gameCode: string;

        /** RoomInfo roomCode. */
        public roomCode: string;

        /** RoomInfo roomUrl. */
        public roomUrl: string;

        /** RoomInfo liveUserAvatar. */
        public liveUserAvatar: string;

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomInfo instance
         */
        public static create(properties?: msg.IRoomInfo): msg.RoomInfo;

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link msg.RoomInfo.verify|verify} messages.
         * @param message RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link msg.RoomInfo.verify|verify} messages.
         * @param message RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomInfo;

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomInfo;

        /**
         * Verifies a RoomInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomInfo;

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @param message RoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FrontEndLog. */
    interface IFrontEndLog {

        /** FrontEndLog code */
        code?: (number|null);

        /** FrontEndLog description */
        description?: (string|null);
    }

    /** Represents a FrontEndLog. */
    class FrontEndLog implements IFrontEndLog {

        /**
         * Constructs a new FrontEndLog.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IFrontEndLog);

        /** FrontEndLog code. */
        public code: number;

        /** FrontEndLog description. */
        public description: string;

        /**
         * Creates a new FrontEndLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FrontEndLog instance
         */
        public static create(properties?: msg.IFrontEndLog): msg.FrontEndLog;

        /**
         * Encodes the specified FrontEndLog message. Does not implicitly {@link msg.FrontEndLog.verify|verify} messages.
         * @param message FrontEndLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IFrontEndLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FrontEndLog message, length delimited. Does not implicitly {@link msg.FrontEndLog.verify|verify} messages.
         * @param message FrontEndLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IFrontEndLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FrontEndLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FrontEndLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.FrontEndLog;

        /**
         * Decodes a FrontEndLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FrontEndLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.FrontEndLog;

        /**
         * Verifies a FrontEndLog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FrontEndLog message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FrontEndLog
         */
        public static fromObject(object: { [k: string]: any }): msg.FrontEndLog;

        /**
         * Creates a plain object from a FrontEndLog message. Also converts values to other types if specified.
         * @param message FrontEndLog
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.FrontEndLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FrontEndLog to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CommandResult. */
    interface ICommandResult {

        /** CommandResult resultCode */
        resultCode?: (msg.CommandResult.ResultCode|null);

        /** CommandResult message */
        message?: (string|null);
    }

    /** Represents a CommandResult. */
    class CommandResult implements ICommandResult {

        /**
         * Constructs a new CommandResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ICommandResult);

        /** CommandResult resultCode. */
        public resultCode: msg.CommandResult.ResultCode;

        /** CommandResult message. */
        public message: string;

        /**
         * Creates a new CommandResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommandResult instance
         */
        public static create(properties?: msg.ICommandResult): msg.CommandResult;

        /**
         * Encodes the specified CommandResult message. Does not implicitly {@link msg.CommandResult.verify|verify} messages.
         * @param message CommandResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ICommandResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommandResult message, length delimited. Does not implicitly {@link msg.CommandResult.verify|verify} messages.
         * @param message CommandResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ICommandResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommandResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommandResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.CommandResult;

        /**
         * Decodes a CommandResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommandResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.CommandResult;

        /**
         * Verifies a CommandResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommandResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommandResult
         */
        public static fromObject(object: { [k: string]: any }): msg.CommandResult;

        /**
         * Creates a plain object from a CommandResult message. Also converts values to other types if specified.
         * @param message CommandResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.CommandResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommandResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace CommandResult {

        /** ResultCode enum. */
        enum ResultCode {
            UNKNOWN = 0,
            SUCCESS = 1,
            DATA_ILLEGAL = 2,
            FIND_USER_BY_AGENT_ERROR = 3,
            DATABASE_READ_WRITE_FAILED = 4,
            CENTER_SERVER_DISCONNECT = 5,
            USER_NOT_EXIST = 11,
            OTHER_DEVICES_LOGIN = 12,
            USER_DISABLE = 13,
            NOT_ENOUGH_MIN_ENTRY_AMOUNT = 14
        }
    }
}
