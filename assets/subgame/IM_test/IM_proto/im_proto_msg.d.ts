import * as $protobuf from "./im_protobuf";
/** Namespace mproto. */
export namespace mproto {

    /** MessageID enum. */
    enum MessageID {
        REQ_PING = 0,
        RESP_PONG = 1,
        REQ_LOGIN = 100,
        RESP_LOGIN_RESP = 200,
        REQ_CONVERSION_LIST = 101,
        RESP_CONVERSION_LIST = 201,
        REQ_CHAT_MSG_LIST = 102,
        RESP_CHAT_MSG_LIST = 202,
        REQ_SEND_CHAT_MSG = 103,
        RESP_SEND_CHAT_MSG = 203,
        PUSH_RECEIVE_CHAT_MSG = 303,
        REQ_READ_MSG = 104,
        RESP_READ_MSG = 204,
        REQ_GET_UNREAD_NUM = 105,
        RESP_GET_UNREAD_NUM = 205,
        REQ_DELETE_MSG = 106,
        RESP_DELETE_MSG = 206,
        REQ_DELETE_CONVERSION = 107,
        RESP_DELETE_CONVERSION = 207,
        REQ_EDIT_MSG = 108,
        RESP_EDIT_MSG = 208,
        REQ_SEARCH_USER = 109,
        RESP_SEARCH_USER = 209,
        REQ_SEARCH_SUB_USER = 110,
        RESP_SEARCH_SUB_USER = 210,
        REQ_GET_SUB_USER_LIST = 111,
        RESP_GET_SUB_USER_LIST = 211,
        REQ_MATCH_SERVICE = 112,
        REQ_GET_QUICK_REPLY = 113,
        RESP_GET_QUICK_REPLY = 213,
        PUSH_AUTO_ENTER_CONVERSION = 304,
        MSG_CLOSE_CONN_PUSH = 500,
        MSG_ERR_MSG_PUSH = 501
    }

    /** Properties of a PING. */
    interface IPING {

        /** PING time */
        time?: (number|Long|null);
    }

    /** Represents a PING. */
    class PING implements IPING {

        /**
         * Constructs a new PING.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IPING);

        /** PING time. */
        public time: (number|Long);

        /**
         * Creates a new PING instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PING instance
         */
        public static create(properties?: mproto.IPING): mproto.PING;

        /**
         * Encodes the specified PING message. Does not implicitly {@link mproto.PING.verify|verify} messages.
         * @param message PING message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IPING, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PING message, length delimited. Does not implicitly {@link mproto.PING.verify|verify} messages.
         * @param message PING message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IPING, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PING message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PING
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.PING;

        /**
         * Decodes a PING message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PING
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.PING;

        /**
         * Verifies a PING message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PING message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PING
         */
        public static fromObject(object: { [k: string]: any }): mproto.PING;

        /**
         * Creates a plain object from a PING message. Also converts values to other types if specified.
         * @param message PING
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.PING, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PING to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqLogin. */
    interface IReqLogin {

        /** ReqLogin userId */
        userId?: (string|null);

        /** ReqLogin userPassword */
        userPassword?: (string|null);

        /** ReqLogin token */
        token?: (string|null);
    }

    /** Represents a ReqLogin. */
    class ReqLogin implements IReqLogin {

        /**
         * Constructs a new ReqLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqLogin);

        /** ReqLogin userId. */
        public userId: string;

        /** ReqLogin userPassword. */
        public userPassword: string;

        /** ReqLogin token. */
        public token: string;

        /**
         * Creates a new ReqLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqLogin instance
         */
        public static create(properties?: mproto.IReqLogin): mproto.ReqLogin;

        /**
         * Encodes the specified ReqLogin message. Does not implicitly {@link mproto.ReqLogin.verify|verify} messages.
         * @param message ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqLogin message, length delimited. Does not implicitly {@link mproto.ReqLogin.verify|verify} messages.
         * @param message ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqLogin;

        /**
         * Decodes a ReqLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqLogin;

        /**
         * Verifies a ReqLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqLogin
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqLogin;

        /**
         * Creates a plain object from a ReqLogin message. Also converts values to other types if specified.
         * @param message ReqLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqConversionList. */
    interface IReqConversionList {

        /** ReqConversionList userId */
        userId?: (string|null);

        /** ReqConversionList skip */
        skip?: (number|null);

        /** ReqConversionList limit */
        limit?: (number|null);
    }

    /** Represents a ReqConversionList. */
    class ReqConversionList implements IReqConversionList {

        /**
         * Constructs a new ReqConversionList.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqConversionList);

        /** ReqConversionList userId. */
        public userId: string;

        /** ReqConversionList skip. */
        public skip: number;

        /** ReqConversionList limit. */
        public limit: number;

        /**
         * Creates a new ReqConversionList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqConversionList instance
         */
        public static create(properties?: mproto.IReqConversionList): mproto.ReqConversionList;

        /**
         * Encodes the specified ReqConversionList message. Does not implicitly {@link mproto.ReqConversionList.verify|verify} messages.
         * @param message ReqConversionList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqConversionList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqConversionList message, length delimited. Does not implicitly {@link mproto.ReqConversionList.verify|verify} messages.
         * @param message ReqConversionList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqConversionList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqConversionList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqConversionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqConversionList;

        /**
         * Decodes a ReqConversionList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqConversionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqConversionList;

        /**
         * Verifies a ReqConversionList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqConversionList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqConversionList
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqConversionList;

        /**
         * Creates a plain object from a ReqConversionList message. Also converts values to other types if specified.
         * @param message ReqConversionList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqConversionList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqConversionList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqMsgList. */
    interface IReqMsgList {

        /** ReqMsgList userId */
        userId?: (string|null);

        /** ReqMsgList toUserId */
        toUserId?: (string|null);

        /** ReqMsgList skip */
        skip?: (number|null);

        /** ReqMsgList limit */
        limit?: (number|null);
    }

    /** Represents a ReqMsgList. */
    class ReqMsgList implements IReqMsgList {

        /**
         * Constructs a new ReqMsgList.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqMsgList);

        /** ReqMsgList userId. */
        public userId: string;

        /** ReqMsgList toUserId. */
        public toUserId: string;

        /** ReqMsgList skip. */
        public skip: number;

        /** ReqMsgList limit. */
        public limit: number;

        /**
         * Creates a new ReqMsgList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqMsgList instance
         */
        public static create(properties?: mproto.IReqMsgList): mproto.ReqMsgList;

        /**
         * Encodes the specified ReqMsgList message. Does not implicitly {@link mproto.ReqMsgList.verify|verify} messages.
         * @param message ReqMsgList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqMsgList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqMsgList message, length delimited. Does not implicitly {@link mproto.ReqMsgList.verify|verify} messages.
         * @param message ReqMsgList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqMsgList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqMsgList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqMsgList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqMsgList;

        /**
         * Decodes a ReqMsgList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqMsgList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqMsgList;

        /**
         * Verifies a ReqMsgList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqMsgList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqMsgList
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqMsgList;

        /**
         * Creates a plain object from a ReqMsgList message. Also converts values to other types if specified.
         * @param message ReqMsgList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqMsgList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqMsgList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqSendChatMsg. */
    interface IReqSendChatMsg {

        /** ReqSendChatMsg chatMsg */
        chatMsg?: (mproto.IChatMsg|null);
    }

    /** Represents a ReqSendChatMsg. */
    class ReqSendChatMsg implements IReqSendChatMsg {

        /**
         * Constructs a new ReqSendChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqSendChatMsg);

        /** ReqSendChatMsg chatMsg. */
        public chatMsg?: (mproto.IChatMsg|null);

        /**
         * Creates a new ReqSendChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqSendChatMsg instance
         */
        public static create(properties?: mproto.IReqSendChatMsg): mproto.ReqSendChatMsg;

        /**
         * Encodes the specified ReqSendChatMsg message. Does not implicitly {@link mproto.ReqSendChatMsg.verify|verify} messages.
         * @param message ReqSendChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqSendChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqSendChatMsg message, length delimited. Does not implicitly {@link mproto.ReqSendChatMsg.verify|verify} messages.
         * @param message ReqSendChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqSendChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqSendChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqSendChatMsg;

        /**
         * Decodes a ReqSendChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqSendChatMsg;

        /**
         * Verifies a ReqSendChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqSendChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqSendChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqSendChatMsg;

        /**
         * Creates a plain object from a ReqSendChatMsg message. Also converts values to other types if specified.
         * @param message ReqSendChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqSendChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqSendChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqReadChatMsg. */
    interface IReqReadChatMsg {

        /** ReqReadChatMsg msgId */
        msgId?: (string|null);

        /** ReqReadChatMsg userId */
        userId?: (string|null);

        /** ReqReadChatMsg toUserId */
        toUserId?: (string|null);
    }

    /** Represents a ReqReadChatMsg. */
    class ReqReadChatMsg implements IReqReadChatMsg {

        /**
         * Constructs a new ReqReadChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqReadChatMsg);

        /** ReqReadChatMsg msgId. */
        public msgId: string;

        /** ReqReadChatMsg userId. */
        public userId: string;

        /** ReqReadChatMsg toUserId. */
        public toUserId: string;

        /**
         * Creates a new ReqReadChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqReadChatMsg instance
         */
        public static create(properties?: mproto.IReqReadChatMsg): mproto.ReqReadChatMsg;

        /**
         * Encodes the specified ReqReadChatMsg message. Does not implicitly {@link mproto.ReqReadChatMsg.verify|verify} messages.
         * @param message ReqReadChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqReadChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqReadChatMsg message, length delimited. Does not implicitly {@link mproto.ReqReadChatMsg.verify|verify} messages.
         * @param message ReqReadChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqReadChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqReadChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqReadChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqReadChatMsg;

        /**
         * Decodes a ReqReadChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqReadChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqReadChatMsg;

        /**
         * Verifies a ReqReadChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqReadChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqReadChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqReadChatMsg;

        /**
         * Creates a plain object from a ReqReadChatMsg message. Also converts values to other types if specified.
         * @param message ReqReadChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqReadChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqReadChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqGetUnReadNum. */
    interface IReqGetUnReadNum {

        /** ReqGetUnReadNum conversionId */
        conversionId?: (string|null);

        /** ReqGetUnReadNum userId */
        userId?: (string|null);

        /** ReqGetUnReadNum toUserId */
        toUserId?: (string|null);
    }

    /** Represents a ReqGetUnReadNum. */
    class ReqGetUnReadNum implements IReqGetUnReadNum {

        /**
         * Constructs a new ReqGetUnReadNum.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqGetUnReadNum);

        /** ReqGetUnReadNum conversionId. */
        public conversionId: string;

        /** ReqGetUnReadNum userId. */
        public userId: string;

        /** ReqGetUnReadNum toUserId. */
        public toUserId: string;

        /**
         * Creates a new ReqGetUnReadNum instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqGetUnReadNum instance
         */
        public static create(properties?: mproto.IReqGetUnReadNum): mproto.ReqGetUnReadNum;

        /**
         * Encodes the specified ReqGetUnReadNum message. Does not implicitly {@link mproto.ReqGetUnReadNum.verify|verify} messages.
         * @param message ReqGetUnReadNum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqGetUnReadNum, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqGetUnReadNum message, length delimited. Does not implicitly {@link mproto.ReqGetUnReadNum.verify|verify} messages.
         * @param message ReqGetUnReadNum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqGetUnReadNum, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqGetUnReadNum message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqGetUnReadNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqGetUnReadNum;

        /**
         * Decodes a ReqGetUnReadNum message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqGetUnReadNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqGetUnReadNum;

        /**
         * Verifies a ReqGetUnReadNum message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqGetUnReadNum message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqGetUnReadNum
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqGetUnReadNum;

        /**
         * Creates a plain object from a ReqGetUnReadNum message. Also converts values to other types if specified.
         * @param message ReqGetUnReadNum
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqGetUnReadNum, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqGetUnReadNum to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqDeleteChatMsg. */
    interface IReqDeleteChatMsg {

        /** ReqDeleteChatMsg reqUserId */
        reqUserId?: (string|null);

        /** ReqDeleteChatMsg msgId */
        msgId?: (string|null);

        /** ReqDeleteChatMsg userId */
        userId?: (string|null);

        /** ReqDeleteChatMsg toUserId */
        toUserId?: (string|null);
    }

    /** Represents a ReqDeleteChatMsg. */
    class ReqDeleteChatMsg implements IReqDeleteChatMsg {

        /**
         * Constructs a new ReqDeleteChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqDeleteChatMsg);

        /** ReqDeleteChatMsg reqUserId. */
        public reqUserId: string;

        /** ReqDeleteChatMsg msgId. */
        public msgId: string;

        /** ReqDeleteChatMsg userId. */
        public userId: string;

        /** ReqDeleteChatMsg toUserId. */
        public toUserId: string;

        /**
         * Creates a new ReqDeleteChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqDeleteChatMsg instance
         */
        public static create(properties?: mproto.IReqDeleteChatMsg): mproto.ReqDeleteChatMsg;

        /**
         * Encodes the specified ReqDeleteChatMsg message. Does not implicitly {@link mproto.ReqDeleteChatMsg.verify|verify} messages.
         * @param message ReqDeleteChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqDeleteChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqDeleteChatMsg message, length delimited. Does not implicitly {@link mproto.ReqDeleteChatMsg.verify|verify} messages.
         * @param message ReqDeleteChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqDeleteChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqDeleteChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqDeleteChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqDeleteChatMsg;

        /**
         * Decodes a ReqDeleteChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqDeleteChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqDeleteChatMsg;

        /**
         * Verifies a ReqDeleteChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqDeleteChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqDeleteChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqDeleteChatMsg;

        /**
         * Creates a plain object from a ReqDeleteChatMsg message. Also converts values to other types if specified.
         * @param message ReqDeleteChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqDeleteChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqDeleteChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqDeleteConversion. */
    interface IReqDeleteConversion {

        /** ReqDeleteConversion conversionId */
        conversionId?: (string|null);

        /** ReqDeleteConversion userId */
        userId?: (string|null);

        /** ReqDeleteConversion toUserId */
        toUserId?: (string|null);
    }

    /** Represents a ReqDeleteConversion. */
    class ReqDeleteConversion implements IReqDeleteConversion {

        /**
         * Constructs a new ReqDeleteConversion.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqDeleteConversion);

        /** ReqDeleteConversion conversionId. */
        public conversionId: string;

        /** ReqDeleteConversion userId. */
        public userId: string;

        /** ReqDeleteConversion toUserId. */
        public toUserId: string;

        /**
         * Creates a new ReqDeleteConversion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqDeleteConversion instance
         */
        public static create(properties?: mproto.IReqDeleteConversion): mproto.ReqDeleteConversion;

        /**
         * Encodes the specified ReqDeleteConversion message. Does not implicitly {@link mproto.ReqDeleteConversion.verify|verify} messages.
         * @param message ReqDeleteConversion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqDeleteConversion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqDeleteConversion message, length delimited. Does not implicitly {@link mproto.ReqDeleteConversion.verify|verify} messages.
         * @param message ReqDeleteConversion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqDeleteConversion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqDeleteConversion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqDeleteConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqDeleteConversion;

        /**
         * Decodes a ReqDeleteConversion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqDeleteConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqDeleteConversion;

        /**
         * Verifies a ReqDeleteConversion message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqDeleteConversion message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqDeleteConversion
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqDeleteConversion;

        /**
         * Creates a plain object from a ReqDeleteConversion message. Also converts values to other types if specified.
         * @param message ReqDeleteConversion
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqDeleteConversion, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqDeleteConversion to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqEditChatMsg. */
    interface IReqEditChatMsg {

        /** ReqEditChatMsg msgId */
        msgId?: (string|null);

        /** ReqEditChatMsg userId */
        userId?: (string|null);

        /** ReqEditChatMsg toUserId */
        toUserId?: (string|null);

        /** ReqEditChatMsg newMsgContent */
        newMsgContent?: (string|null);
    }

    /** Represents a ReqEditChatMsg. */
    class ReqEditChatMsg implements IReqEditChatMsg {

        /**
         * Constructs a new ReqEditChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqEditChatMsg);

        /** ReqEditChatMsg msgId. */
        public msgId: string;

        /** ReqEditChatMsg userId. */
        public userId: string;

        /** ReqEditChatMsg toUserId. */
        public toUserId: string;

        /** ReqEditChatMsg newMsgContent. */
        public newMsgContent: string;

        /**
         * Creates a new ReqEditChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqEditChatMsg instance
         */
        public static create(properties?: mproto.IReqEditChatMsg): mproto.ReqEditChatMsg;

        /**
         * Encodes the specified ReqEditChatMsg message. Does not implicitly {@link mproto.ReqEditChatMsg.verify|verify} messages.
         * @param message ReqEditChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqEditChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqEditChatMsg message, length delimited. Does not implicitly {@link mproto.ReqEditChatMsg.verify|verify} messages.
         * @param message ReqEditChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqEditChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqEditChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqEditChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqEditChatMsg;

        /**
         * Decodes a ReqEditChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqEditChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqEditChatMsg;

        /**
         * Verifies a ReqEditChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqEditChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqEditChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqEditChatMsg;

        /**
         * Creates a plain object from a ReqEditChatMsg message. Also converts values to other types if specified.
         * @param message ReqEditChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqEditChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqEditChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqSearchUser. */
    interface IReqSearchUser {

        /** ReqSearchUser userId */
        userId?: (string|null);

        /** ReqSearchUser searchUserId */
        searchUserId?: (string|null);
    }

    /** Represents a ReqSearchUser. */
    class ReqSearchUser implements IReqSearchUser {

        /**
         * Constructs a new ReqSearchUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqSearchUser);

        /** ReqSearchUser userId. */
        public userId: string;

        /** ReqSearchUser searchUserId. */
        public searchUserId: string;

        /**
         * Creates a new ReqSearchUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqSearchUser instance
         */
        public static create(properties?: mproto.IReqSearchUser): mproto.ReqSearchUser;

        /**
         * Encodes the specified ReqSearchUser message. Does not implicitly {@link mproto.ReqSearchUser.verify|verify} messages.
         * @param message ReqSearchUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqSearchUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqSearchUser message, length delimited. Does not implicitly {@link mproto.ReqSearchUser.verify|verify} messages.
         * @param message ReqSearchUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqSearchUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqSearchUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqSearchUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqSearchUser;

        /**
         * Decodes a ReqSearchUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqSearchUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqSearchUser;

        /**
         * Verifies a ReqSearchUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqSearchUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqSearchUser
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqSearchUser;

        /**
         * Creates a plain object from a ReqSearchUser message. Also converts values to other types if specified.
         * @param message ReqSearchUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqSearchUser, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqSearchUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqSearchSubUser. */
    interface IReqSearchSubUser {

        /** ReqSearchSubUser userId */
        userId?: (string|null);

        /** ReqSearchSubUser searchUserId */
        searchUserId?: (string|null);
    }

    /** Represents a ReqSearchSubUser. */
    class ReqSearchSubUser implements IReqSearchSubUser {

        /**
         * Constructs a new ReqSearchSubUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqSearchSubUser);

        /** ReqSearchSubUser userId. */
        public userId: string;

        /** ReqSearchSubUser searchUserId. */
        public searchUserId: string;

        /**
         * Creates a new ReqSearchSubUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqSearchSubUser instance
         */
        public static create(properties?: mproto.IReqSearchSubUser): mproto.ReqSearchSubUser;

        /**
         * Encodes the specified ReqSearchSubUser message. Does not implicitly {@link mproto.ReqSearchSubUser.verify|verify} messages.
         * @param message ReqSearchSubUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqSearchSubUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqSearchSubUser message, length delimited. Does not implicitly {@link mproto.ReqSearchSubUser.verify|verify} messages.
         * @param message ReqSearchSubUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqSearchSubUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqSearchSubUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqSearchSubUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqSearchSubUser;

        /**
         * Decodes a ReqSearchSubUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqSearchSubUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqSearchSubUser;

        /**
         * Verifies a ReqSearchSubUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqSearchSubUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqSearchSubUser
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqSearchSubUser;

        /**
         * Creates a plain object from a ReqSearchSubUser message. Also converts values to other types if specified.
         * @param message ReqSearchSubUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqSearchSubUser, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqSearchSubUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqGetSubUserList. */
    interface IReqGetSubUserList {

        /** ReqGetSubUserList userId */
        userId?: (string|null);

        /** ReqGetSubUserList skip */
        skip?: (number|null);

        /** ReqGetSubUserList limit */
        limit?: (number|null);
    }

    /** Represents a ReqGetSubUserList. */
    class ReqGetSubUserList implements IReqGetSubUserList {

        /**
         * Constructs a new ReqGetSubUserList.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqGetSubUserList);

        /** ReqGetSubUserList userId. */
        public userId: string;

        /** ReqGetSubUserList skip. */
        public skip: number;

        /** ReqGetSubUserList limit. */
        public limit: number;

        /**
         * Creates a new ReqGetSubUserList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqGetSubUserList instance
         */
        public static create(properties?: mproto.IReqGetSubUserList): mproto.ReqGetSubUserList;

        /**
         * Encodes the specified ReqGetSubUserList message. Does not implicitly {@link mproto.ReqGetSubUserList.verify|verify} messages.
         * @param message ReqGetSubUserList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqGetSubUserList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqGetSubUserList message, length delimited. Does not implicitly {@link mproto.ReqGetSubUserList.verify|verify} messages.
         * @param message ReqGetSubUserList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqGetSubUserList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqGetSubUserList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqGetSubUserList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqGetSubUserList;

        /**
         * Decodes a ReqGetSubUserList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqGetSubUserList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqGetSubUserList;

        /**
         * Verifies a ReqGetSubUserList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqGetSubUserList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqGetSubUserList
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqGetSubUserList;

        /**
         * Creates a plain object from a ReqGetSubUserList message. Also converts values to other types if specified.
         * @param message ReqGetSubUserList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqGetSubUserList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqGetSubUserList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqMatchService. */
    interface IReqMatchService {

        /** ReqMatchService userId */
        userId?: (string|null);

        /** ReqMatchService serviceType */
        serviceType?: (string|null);

        /** ReqMatchService brand */
        brand?: (string|null);
    }

    /** Represents a ReqMatchService. */
    class ReqMatchService implements IReqMatchService {

        /**
         * Constructs a new ReqMatchService.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqMatchService);

        /** ReqMatchService userId. */
        public userId: string;

        /** ReqMatchService serviceType. */
        public serviceType: string;

        /** ReqMatchService brand. */
        public brand: string;

        /**
         * Creates a new ReqMatchService instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqMatchService instance
         */
        public static create(properties?: mproto.IReqMatchService): mproto.ReqMatchService;

        /**
         * Encodes the specified ReqMatchService message. Does not implicitly {@link mproto.ReqMatchService.verify|verify} messages.
         * @param message ReqMatchService message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqMatchService, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqMatchService message, length delimited. Does not implicitly {@link mproto.ReqMatchService.verify|verify} messages.
         * @param message ReqMatchService message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqMatchService, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqMatchService message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqMatchService
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqMatchService;

        /**
         * Decodes a ReqMatchService message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqMatchService
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqMatchService;

        /**
         * Verifies a ReqMatchService message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqMatchService message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqMatchService
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqMatchService;

        /**
         * Creates a plain object from a ReqMatchService message. Also converts values to other types if specified.
         * @param message ReqMatchService
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqMatchService, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqMatchService to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReqGetQuickReplyList. */
    interface IReqGetQuickReplyList {

        /** ReqGetQuickReplyList serviceType */
        serviceType?: (string|null);
    }

    /** Represents a ReqGetQuickReplyList. */
    class ReqGetQuickReplyList implements IReqGetQuickReplyList {

        /**
         * Constructs a new ReqGetQuickReplyList.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IReqGetQuickReplyList);

        /** ReqGetQuickReplyList serviceType. */
        public serviceType: string;

        /**
         * Creates a new ReqGetQuickReplyList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqGetQuickReplyList instance
         */
        public static create(properties?: mproto.IReqGetQuickReplyList): mproto.ReqGetQuickReplyList;

        /**
         * Encodes the specified ReqGetQuickReplyList message. Does not implicitly {@link mproto.ReqGetQuickReplyList.verify|verify} messages.
         * @param message ReqGetQuickReplyList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IReqGetQuickReplyList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqGetQuickReplyList message, length delimited. Does not implicitly {@link mproto.ReqGetQuickReplyList.verify|verify} messages.
         * @param message ReqGetQuickReplyList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IReqGetQuickReplyList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqGetQuickReplyList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqGetQuickReplyList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ReqGetQuickReplyList;

        /**
         * Decodes a ReqGetQuickReplyList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqGetQuickReplyList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ReqGetQuickReplyList;

        /**
         * Verifies a ReqGetQuickReplyList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqGetQuickReplyList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqGetQuickReplyList
         */
        public static fromObject(object: { [k: string]: any }): mproto.ReqGetQuickReplyList;

        /**
         * Creates a plain object from a ReqGetQuickReplyList message. Also converts values to other types if specified.
         * @param message ReqGetQuickReplyList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ReqGetQuickReplyList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqGetQuickReplyList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PONG. */
    interface IPONG {

        /** PONG time */
        time?: (number|Long|null);
    }

    /** Represents a PONG. */
    class PONG implements IPONG {

        /**
         * Constructs a new PONG.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IPONG);

        /** PONG time. */
        public time: (number|Long);

        /**
         * Creates a new PONG instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PONG instance
         */
        public static create(properties?: mproto.IPONG): mproto.PONG;

        /**
         * Encodes the specified PONG message. Does not implicitly {@link mproto.PONG.verify|verify} messages.
         * @param message PONG message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IPONG, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PONG message, length delimited. Does not implicitly {@link mproto.PONG.verify|verify} messages.
         * @param message PONG message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IPONG, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PONG message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PONG
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.PONG;

        /**
         * Decodes a PONG message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PONG
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.PONG;

        /**
         * Verifies a PONG message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PONG message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PONG
         */
        public static fromObject(object: { [k: string]: any }): mproto.PONG;

        /**
         * Creates a plain object from a PONG message. Also converts values to other types if specified.
         * @param message PONG
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.PONG, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PONG to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespLogin. */
    interface IRespLogin {

        /** RespLogin userInfo */
        userInfo?: (mproto.IUserInfo|null);
    }

    /** Represents a RespLogin. */
    class RespLogin implements IRespLogin {

        /**
         * Constructs a new RespLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespLogin);

        /** RespLogin userInfo. */
        public userInfo?: (mproto.IUserInfo|null);

        /**
         * Creates a new RespLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespLogin instance
         */
        public static create(properties?: mproto.IRespLogin): mproto.RespLogin;

        /**
         * Encodes the specified RespLogin message. Does not implicitly {@link mproto.RespLogin.verify|verify} messages.
         * @param message RespLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespLogin message, length delimited. Does not implicitly {@link mproto.RespLogin.verify|verify} messages.
         * @param message RespLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespLogin;

        /**
         * Decodes a RespLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespLogin;

        /**
         * Verifies a RespLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespLogin
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespLogin;

        /**
         * Creates a plain object from a RespLogin message. Also converts values to other types if specified.
         * @param message RespLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespConversionList. */
    interface IRespConversionList {

        /** RespConversionList conversions */
        conversions?: (mproto.IConversion[]|null);

        /** RespConversionList skip */
        skip?: (number|null);
    }

    /** Represents a RespConversionList. */
    class RespConversionList implements IRespConversionList {

        /**
         * Constructs a new RespConversionList.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespConversionList);

        /** RespConversionList conversions. */
        public conversions: mproto.IConversion[];

        /** RespConversionList skip. */
        public skip: number;

        /**
         * Creates a new RespConversionList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespConversionList instance
         */
        public static create(properties?: mproto.IRespConversionList): mproto.RespConversionList;

        /**
         * Encodes the specified RespConversionList message. Does not implicitly {@link mproto.RespConversionList.verify|verify} messages.
         * @param message RespConversionList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespConversionList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespConversionList message, length delimited. Does not implicitly {@link mproto.RespConversionList.verify|verify} messages.
         * @param message RespConversionList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespConversionList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespConversionList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespConversionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespConversionList;

        /**
         * Decodes a RespConversionList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespConversionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespConversionList;

        /**
         * Verifies a RespConversionList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespConversionList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespConversionList
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespConversionList;

        /**
         * Creates a plain object from a RespConversionList message. Also converts values to other types if specified.
         * @param message RespConversionList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespConversionList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespConversionList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespChatMsgList. */
    interface IRespChatMsgList {

        /** RespChatMsgList chatMsg */
        chatMsg?: (mproto.IChatMsg[]|null);
    }

    /** Represents a RespChatMsgList. */
    class RespChatMsgList implements IRespChatMsgList {

        /**
         * Constructs a new RespChatMsgList.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespChatMsgList);

        /** RespChatMsgList chatMsg. */
        public chatMsg: mproto.IChatMsg[];

        /**
         * Creates a new RespChatMsgList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespChatMsgList instance
         */
        public static create(properties?: mproto.IRespChatMsgList): mproto.RespChatMsgList;

        /**
         * Encodes the specified RespChatMsgList message. Does not implicitly {@link mproto.RespChatMsgList.verify|verify} messages.
         * @param message RespChatMsgList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespChatMsgList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespChatMsgList message, length delimited. Does not implicitly {@link mproto.RespChatMsgList.verify|verify} messages.
         * @param message RespChatMsgList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespChatMsgList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespChatMsgList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespChatMsgList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespChatMsgList;

        /**
         * Decodes a RespChatMsgList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespChatMsgList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespChatMsgList;

        /**
         * Verifies a RespChatMsgList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespChatMsgList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespChatMsgList
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespChatMsgList;

        /**
         * Creates a plain object from a RespChatMsgList message. Also converts values to other types if specified.
         * @param message RespChatMsgList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespChatMsgList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespChatMsgList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespSendChatMsg. */
    interface IRespSendChatMsg {

        /** RespSendChatMsg chatMsg */
        chatMsg?: (mproto.IChatMsg|null);
    }

    /** Represents a RespSendChatMsg. */
    class RespSendChatMsg implements IRespSendChatMsg {

        /**
         * Constructs a new RespSendChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespSendChatMsg);

        /** RespSendChatMsg chatMsg. */
        public chatMsg?: (mproto.IChatMsg|null);

        /**
         * Creates a new RespSendChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespSendChatMsg instance
         */
        public static create(properties?: mproto.IRespSendChatMsg): mproto.RespSendChatMsg;

        /**
         * Encodes the specified RespSendChatMsg message. Does not implicitly {@link mproto.RespSendChatMsg.verify|verify} messages.
         * @param message RespSendChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespSendChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespSendChatMsg message, length delimited. Does not implicitly {@link mproto.RespSendChatMsg.verify|verify} messages.
         * @param message RespSendChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespSendChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespSendChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespSendChatMsg;

        /**
         * Decodes a RespSendChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespSendChatMsg;

        /**
         * Verifies a RespSendChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespSendChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespSendChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespSendChatMsg;

        /**
         * Creates a plain object from a RespSendChatMsg message. Also converts values to other types if specified.
         * @param message RespSendChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespSendChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespSendChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushSendChatMsg. */
    interface IPushSendChatMsg {

        /** PushSendChatMsg chatMsg */
        chatMsg?: (mproto.IChatMsg|null);
    }

    /** Represents a PushSendChatMsg. */
    class PushSendChatMsg implements IPushSendChatMsg {

        /**
         * Constructs a new PushSendChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IPushSendChatMsg);

        /** PushSendChatMsg chatMsg. */
        public chatMsg?: (mproto.IChatMsg|null);

        /**
         * Creates a new PushSendChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushSendChatMsg instance
         */
        public static create(properties?: mproto.IPushSendChatMsg): mproto.PushSendChatMsg;

        /**
         * Encodes the specified PushSendChatMsg message. Does not implicitly {@link mproto.PushSendChatMsg.verify|verify} messages.
         * @param message PushSendChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IPushSendChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushSendChatMsg message, length delimited. Does not implicitly {@link mproto.PushSendChatMsg.verify|verify} messages.
         * @param message PushSendChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IPushSendChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushSendChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.PushSendChatMsg;

        /**
         * Decodes a PushSendChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.PushSendChatMsg;

        /**
         * Verifies a PushSendChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushSendChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushSendChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.PushSendChatMsg;

        /**
         * Creates a plain object from a PushSendChatMsg message. Also converts values to other types if specified.
         * @param message PushSendChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.PushSendChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushSendChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespReadChatMsg. */
    interface IRespReadChatMsg {

        /** RespReadChatMsg chatMsg */
        chatMsg?: (mproto.IChatMsg|null);
    }

    /** Represents a RespReadChatMsg. */
    class RespReadChatMsg implements IRespReadChatMsg {

        /**
         * Constructs a new RespReadChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespReadChatMsg);

        /** RespReadChatMsg chatMsg. */
        public chatMsg?: (mproto.IChatMsg|null);

        /**
         * Creates a new RespReadChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespReadChatMsg instance
         */
        public static create(properties?: mproto.IRespReadChatMsg): mproto.RespReadChatMsg;

        /**
         * Encodes the specified RespReadChatMsg message. Does not implicitly {@link mproto.RespReadChatMsg.verify|verify} messages.
         * @param message RespReadChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespReadChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespReadChatMsg message, length delimited. Does not implicitly {@link mproto.RespReadChatMsg.verify|verify} messages.
         * @param message RespReadChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespReadChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespReadChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespReadChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespReadChatMsg;

        /**
         * Decodes a RespReadChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespReadChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespReadChatMsg;

        /**
         * Verifies a RespReadChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespReadChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespReadChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespReadChatMsg;

        /**
         * Creates a plain object from a RespReadChatMsg message. Also converts values to other types if specified.
         * @param message RespReadChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespReadChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespReadChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespGetUnReadNum. */
    interface IRespGetUnReadNum {

        /** RespGetUnReadNum conversionId */
        conversionId?: (string|null);

        /** RespGetUnReadNum userId */
        userId?: (string|null);

        /** RespGetUnReadNum toUserId */
        toUserId?: (string|null);

        /** RespGetUnReadNum unReadNum */
        unReadNum?: (number|Long|null);

        /** RespGetUnReadNum replaceContent */
        replaceContent?: (string|null);
    }

    /** Represents a RespGetUnReadNum. */
    class RespGetUnReadNum implements IRespGetUnReadNum {

        /**
         * Constructs a new RespGetUnReadNum.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespGetUnReadNum);

        /** RespGetUnReadNum conversionId. */
        public conversionId: string;

        /** RespGetUnReadNum userId. */
        public userId: string;

        /** RespGetUnReadNum toUserId. */
        public toUserId: string;

        /** RespGetUnReadNum unReadNum. */
        public unReadNum: (number|Long);

        /** RespGetUnReadNum replaceContent. */
        public replaceContent: string;

        /**
         * Creates a new RespGetUnReadNum instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespGetUnReadNum instance
         */
        public static create(properties?: mproto.IRespGetUnReadNum): mproto.RespGetUnReadNum;

        /**
         * Encodes the specified RespGetUnReadNum message. Does not implicitly {@link mproto.RespGetUnReadNum.verify|verify} messages.
         * @param message RespGetUnReadNum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespGetUnReadNum, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespGetUnReadNum message, length delimited. Does not implicitly {@link mproto.RespGetUnReadNum.verify|verify} messages.
         * @param message RespGetUnReadNum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespGetUnReadNum, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespGetUnReadNum message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespGetUnReadNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespGetUnReadNum;

        /**
         * Decodes a RespGetUnReadNum message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespGetUnReadNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespGetUnReadNum;

        /**
         * Verifies a RespGetUnReadNum message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespGetUnReadNum message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespGetUnReadNum
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespGetUnReadNum;

        /**
         * Creates a plain object from a RespGetUnReadNum message. Also converts values to other types if specified.
         * @param message RespGetUnReadNum
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespGetUnReadNum, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespGetUnReadNum to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespDeleteChatMsg. */
    interface IRespDeleteChatMsg {

        /** RespDeleteChatMsg chatMsg */
        chatMsg?: (mproto.IChatMsg|null);
    }

    /** Represents a RespDeleteChatMsg. */
    class RespDeleteChatMsg implements IRespDeleteChatMsg {

        /**
         * Constructs a new RespDeleteChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespDeleteChatMsg);

        /** RespDeleteChatMsg chatMsg. */
        public chatMsg?: (mproto.IChatMsg|null);

        /**
         * Creates a new RespDeleteChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespDeleteChatMsg instance
         */
        public static create(properties?: mproto.IRespDeleteChatMsg): mproto.RespDeleteChatMsg;

        /**
         * Encodes the specified RespDeleteChatMsg message. Does not implicitly {@link mproto.RespDeleteChatMsg.verify|verify} messages.
         * @param message RespDeleteChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespDeleteChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespDeleteChatMsg message, length delimited. Does not implicitly {@link mproto.RespDeleteChatMsg.verify|verify} messages.
         * @param message RespDeleteChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespDeleteChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespDeleteChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespDeleteChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespDeleteChatMsg;

        /**
         * Decodes a RespDeleteChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespDeleteChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespDeleteChatMsg;

        /**
         * Verifies a RespDeleteChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespDeleteChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespDeleteChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespDeleteChatMsg;

        /**
         * Creates a plain object from a RespDeleteChatMsg message. Also converts values to other types if specified.
         * @param message RespDeleteChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespDeleteChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespDeleteChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespDeleteConversion. */
    interface IRespDeleteConversion {

        /** RespDeleteConversion conversion */
        conversion?: (mproto.IConversion|null);
    }

    /** Represents a RespDeleteConversion. */
    class RespDeleteConversion implements IRespDeleteConversion {

        /**
         * Constructs a new RespDeleteConversion.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespDeleteConversion);

        /** RespDeleteConversion conversion. */
        public conversion?: (mproto.IConversion|null);

        /**
         * Creates a new RespDeleteConversion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespDeleteConversion instance
         */
        public static create(properties?: mproto.IRespDeleteConversion): mproto.RespDeleteConversion;

        /**
         * Encodes the specified RespDeleteConversion message. Does not implicitly {@link mproto.RespDeleteConversion.verify|verify} messages.
         * @param message RespDeleteConversion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespDeleteConversion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespDeleteConversion message, length delimited. Does not implicitly {@link mproto.RespDeleteConversion.verify|verify} messages.
         * @param message RespDeleteConversion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespDeleteConversion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespDeleteConversion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespDeleteConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespDeleteConversion;

        /**
         * Decodes a RespDeleteConversion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespDeleteConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespDeleteConversion;

        /**
         * Verifies a RespDeleteConversion message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespDeleteConversion message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespDeleteConversion
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespDeleteConversion;

        /**
         * Creates a plain object from a RespDeleteConversion message. Also converts values to other types if specified.
         * @param message RespDeleteConversion
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespDeleteConversion, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespDeleteConversion to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespEditChatMsg. */
    interface IRespEditChatMsg {

        /** RespEditChatMsg chatMsg */
        chatMsg?: (mproto.IChatMsg|null);
    }

    /** Represents a RespEditChatMsg. */
    class RespEditChatMsg implements IRespEditChatMsg {

        /**
         * Constructs a new RespEditChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespEditChatMsg);

        /** RespEditChatMsg chatMsg. */
        public chatMsg?: (mproto.IChatMsg|null);

        /**
         * Creates a new RespEditChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespEditChatMsg instance
         */
        public static create(properties?: mproto.IRespEditChatMsg): mproto.RespEditChatMsg;

        /**
         * Encodes the specified RespEditChatMsg message. Does not implicitly {@link mproto.RespEditChatMsg.verify|verify} messages.
         * @param message RespEditChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespEditChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespEditChatMsg message, length delimited. Does not implicitly {@link mproto.RespEditChatMsg.verify|verify} messages.
         * @param message RespEditChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespEditChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespEditChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespEditChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespEditChatMsg;

        /**
         * Decodes a RespEditChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespEditChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespEditChatMsg;

        /**
         * Verifies a RespEditChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespEditChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespEditChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespEditChatMsg;

        /**
         * Creates a plain object from a RespEditChatMsg message. Also converts values to other types if specified.
         * @param message RespEditChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespEditChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespEditChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespSearchUser. */
    interface IRespSearchUser {

        /** RespSearchUser userInfo */
        userInfo?: (mproto.IUserInfo|null);
    }

    /** Represents a RespSearchUser. */
    class RespSearchUser implements IRespSearchUser {

        /**
         * Constructs a new RespSearchUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespSearchUser);

        /** RespSearchUser userInfo. */
        public userInfo?: (mproto.IUserInfo|null);

        /**
         * Creates a new RespSearchUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespSearchUser instance
         */
        public static create(properties?: mproto.IRespSearchUser): mproto.RespSearchUser;

        /**
         * Encodes the specified RespSearchUser message. Does not implicitly {@link mproto.RespSearchUser.verify|verify} messages.
         * @param message RespSearchUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespSearchUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespSearchUser message, length delimited. Does not implicitly {@link mproto.RespSearchUser.verify|verify} messages.
         * @param message RespSearchUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespSearchUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespSearchUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespSearchUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespSearchUser;

        /**
         * Decodes a RespSearchUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespSearchUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespSearchUser;

        /**
         * Verifies a RespSearchUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespSearchUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespSearchUser
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespSearchUser;

        /**
         * Creates a plain object from a RespSearchUser message. Also converts values to other types if specified.
         * @param message RespSearchUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespSearchUser, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespSearchUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespSearchSubUser. */
    interface IRespSearchSubUser {

        /** RespSearchSubUser userInfo */
        userInfo?: (mproto.IUserInfo|null);
    }

    /** Represents a RespSearchSubUser. */
    class RespSearchSubUser implements IRespSearchSubUser {

        /**
         * Constructs a new RespSearchSubUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespSearchSubUser);

        /** RespSearchSubUser userInfo. */
        public userInfo?: (mproto.IUserInfo|null);

        /**
         * Creates a new RespSearchSubUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespSearchSubUser instance
         */
        public static create(properties?: mproto.IRespSearchSubUser): mproto.RespSearchSubUser;

        /**
         * Encodes the specified RespSearchSubUser message. Does not implicitly {@link mproto.RespSearchSubUser.verify|verify} messages.
         * @param message RespSearchSubUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespSearchSubUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespSearchSubUser message, length delimited. Does not implicitly {@link mproto.RespSearchSubUser.verify|verify} messages.
         * @param message RespSearchSubUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespSearchSubUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespSearchSubUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespSearchSubUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespSearchSubUser;

        /**
         * Decodes a RespSearchSubUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespSearchSubUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespSearchSubUser;

        /**
         * Verifies a RespSearchSubUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespSearchSubUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespSearchSubUser
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespSearchSubUser;

        /**
         * Creates a plain object from a RespSearchSubUser message. Also converts values to other types if specified.
         * @param message RespSearchSubUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespSearchSubUser, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespSearchSubUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespGetSubUserList. */
    interface IRespGetSubUserList {

        /** RespGetSubUserList userInfo */
        userInfo?: (mproto.IUserInfo[]|null);
    }

    /** Represents a RespGetSubUserList. */
    class RespGetSubUserList implements IRespGetSubUserList {

        /**
         * Constructs a new RespGetSubUserList.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespGetSubUserList);

        /** RespGetSubUserList userInfo. */
        public userInfo: mproto.IUserInfo[];

        /**
         * Creates a new RespGetSubUserList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespGetSubUserList instance
         */
        public static create(properties?: mproto.IRespGetSubUserList): mproto.RespGetSubUserList;

        /**
         * Encodes the specified RespGetSubUserList message. Does not implicitly {@link mproto.RespGetSubUserList.verify|verify} messages.
         * @param message RespGetSubUserList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespGetSubUserList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespGetSubUserList message, length delimited. Does not implicitly {@link mproto.RespGetSubUserList.verify|verify} messages.
         * @param message RespGetSubUserList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespGetSubUserList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespGetSubUserList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespGetSubUserList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespGetSubUserList;

        /**
         * Decodes a RespGetSubUserList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespGetSubUserList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespGetSubUserList;

        /**
         * Verifies a RespGetSubUserList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespGetSubUserList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespGetSubUserList
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespGetSubUserList;

        /**
         * Creates a plain object from a RespGetSubUserList message. Also converts values to other types if specified.
         * @param message RespGetSubUserList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespGetSubUserList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespGetSubUserList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespGetQuickReplyList. */
    interface IRespGetQuickReplyList {

        /** RespGetQuickReplyList content */
        content?: (string[]|null);
    }

    /** Represents a RespGetQuickReplyList. */
    class RespGetQuickReplyList implements IRespGetQuickReplyList {

        /**
         * Constructs a new RespGetQuickReplyList.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IRespGetQuickReplyList);

        /** RespGetQuickReplyList content. */
        public content: string[];

        /**
         * Creates a new RespGetQuickReplyList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespGetQuickReplyList instance
         */
        public static create(properties?: mproto.IRespGetQuickReplyList): mproto.RespGetQuickReplyList;

        /**
         * Encodes the specified RespGetQuickReplyList message. Does not implicitly {@link mproto.RespGetQuickReplyList.verify|verify} messages.
         * @param message RespGetQuickReplyList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IRespGetQuickReplyList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespGetQuickReplyList message, length delimited. Does not implicitly {@link mproto.RespGetQuickReplyList.verify|verify} messages.
         * @param message RespGetQuickReplyList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IRespGetQuickReplyList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespGetQuickReplyList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespGetQuickReplyList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.RespGetQuickReplyList;

        /**
         * Decodes a RespGetQuickReplyList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespGetQuickReplyList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.RespGetQuickReplyList;

        /**
         * Verifies a RespGetQuickReplyList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespGetQuickReplyList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespGetQuickReplyList
         */
        public static fromObject(object: { [k: string]: any }): mproto.RespGetQuickReplyList;

        /**
         * Creates a plain object from a RespGetQuickReplyList message. Also converts values to other types if specified.
         * @param message RespGetQuickReplyList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.RespGetQuickReplyList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespGetQuickReplyList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushAutoEnterConversion. */
    interface IPushAutoEnterConversion {

        /** PushAutoEnterConversion isExist */
        isExist?: (boolean|null);

        /** PushAutoEnterConversion conversion */
        conversion?: (mproto.IConversion|null);
    }

    /** Represents a PushAutoEnterConversion. */
    class PushAutoEnterConversion implements IPushAutoEnterConversion {

        /**
         * Constructs a new PushAutoEnterConversion.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IPushAutoEnterConversion);

        /** PushAutoEnterConversion isExist. */
        public isExist: boolean;

        /** PushAutoEnterConversion conversion. */
        public conversion?: (mproto.IConversion|null);

        /**
         * Creates a new PushAutoEnterConversion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushAutoEnterConversion instance
         */
        public static create(properties?: mproto.IPushAutoEnterConversion): mproto.PushAutoEnterConversion;

        /**
         * Encodes the specified PushAutoEnterConversion message. Does not implicitly {@link mproto.PushAutoEnterConversion.verify|verify} messages.
         * @param message PushAutoEnterConversion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IPushAutoEnterConversion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushAutoEnterConversion message, length delimited. Does not implicitly {@link mproto.PushAutoEnterConversion.verify|verify} messages.
         * @param message PushAutoEnterConversion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IPushAutoEnterConversion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushAutoEnterConversion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushAutoEnterConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.PushAutoEnterConversion;

        /**
         * Decodes a PushAutoEnterConversion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushAutoEnterConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.PushAutoEnterConversion;

        /**
         * Verifies a PushAutoEnterConversion message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushAutoEnterConversion message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushAutoEnterConversion
         */
        public static fromObject(object: { [k: string]: any }): mproto.PushAutoEnterConversion;

        /**
         * Creates a plain object from a PushAutoEnterConversion message. Also converts values to other types if specified.
         * @param message PushAutoEnterConversion
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.PushAutoEnterConversion, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushAutoEnterConversion to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CloseConn. */
    interface ICloseConn {

        /** CloseConn code */
        code?: (number|null);

        /** CloseConn msg */
        msg?: (string|null);

        /** CloseConn languageCode */
        languageCode?: (number|null);
    }

    /** Represents a CloseConn. */
    class CloseConn implements ICloseConn {

        /**
         * Constructs a new CloseConn.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.ICloseConn);

        /** CloseConn code. */
        public code: number;

        /** CloseConn msg. */
        public msg: string;

        /** CloseConn languageCode. */
        public languageCode: number;

        /**
         * Creates a new CloseConn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CloseConn instance
         */
        public static create(properties?: mproto.ICloseConn): mproto.CloseConn;

        /**
         * Encodes the specified CloseConn message. Does not implicitly {@link mproto.CloseConn.verify|verify} messages.
         * @param message CloseConn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.ICloseConn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CloseConn message, length delimited. Does not implicitly {@link mproto.CloseConn.verify|verify} messages.
         * @param message CloseConn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.ICloseConn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CloseConn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CloseConn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.CloseConn;

        /**
         * Decodes a CloseConn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CloseConn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.CloseConn;

        /**
         * Verifies a CloseConn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CloseConn message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CloseConn
         */
        public static fromObject(object: { [k: string]: any }): mproto.CloseConn;

        /**
         * Creates a plain object from a CloseConn message. Also converts values to other types if specified.
         * @param message CloseConn
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.CloseConn, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CloseConn to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ErrMsg. */
    interface IErrMsg {

        /** ErrMsg msgId */
        msgId?: (number|null);

        /** ErrMsg msg */
        msg?: (string|null);

        /** ErrMsg languageCode */
        languageCode?: (number|null);
    }

    /** Represents an ErrMsg. */
    class ErrMsg implements IErrMsg {

        /**
         * Constructs a new ErrMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IErrMsg);

        /** ErrMsg msgId. */
        public msgId: number;

        /** ErrMsg msg. */
        public msg: string;

        /** ErrMsg languageCode. */
        public languageCode: number;

        /**
         * Creates a new ErrMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrMsg instance
         */
        public static create(properties?: mproto.IErrMsg): mproto.ErrMsg;

        /**
         * Encodes the specified ErrMsg message. Does not implicitly {@link mproto.ErrMsg.verify|verify} messages.
         * @param message ErrMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IErrMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrMsg message, length delimited. Does not implicitly {@link mproto.ErrMsg.verify|verify} messages.
         * @param message ErrMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IErrMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ErrMsg;

        /**
         * Decodes an ErrMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ErrMsg;

        /**
         * Verifies an ErrMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.ErrMsg;

        /**
         * Creates a plain object from an ErrMsg message. Also converts values to other types if specified.
         * @param message ErrMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ErrMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserInfo. */
    interface IUserInfo {

        /** UserInfo userId */
        userId?: (string|null);

        /** UserInfo userNick */
        userNick?: (string|null);

        /** UserInfo userHeadImg */
        userHeadImg?: (string|null);

        /** UserInfo userType */
        userType?: (number|null);
    }

    /** Represents a UserInfo. */
    class UserInfo implements IUserInfo {

        /**
         * Constructs a new UserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IUserInfo);

        /** UserInfo userId. */
        public userId: string;

        /** UserInfo userNick. */
        public userNick: string;

        /** UserInfo userHeadImg. */
        public userHeadImg: string;

        /** UserInfo userType. */
        public userType: number;

        /**
         * Creates a new UserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserInfo instance
         */
        public static create(properties?: mproto.IUserInfo): mproto.UserInfo;

        /**
         * Encodes the specified UserInfo message. Does not implicitly {@link mproto.UserInfo.verify|verify} messages.
         * @param message UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link mproto.UserInfo.verify|verify} messages.
         * @param message UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.UserInfo;

        /**
         * Decodes a UserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.UserInfo;

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
        public static fromObject(object: { [k: string]: any }): mproto.UserInfo;

        /**
         * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
         * @param message UserInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.UserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Conversion. */
    interface IConversion {

        /** Conversion userId */
        userId?: (string|null);

        /** Conversion userNick */
        userNick?: (string|null);

        /** Conversion headImg */
        headImg?: (string|null);

        /** Conversion userType */
        userType?: (number|null);

        /** Conversion toUserId */
        toUserId?: (string|null);

        /** Conversion toUserNick */
        toUserNick?: (string|null);

        /** Conversion toUserHeadImg */
        toUserHeadImg?: (string|null);

        /** Conversion toUserType */
        toUserType?: (number|null);

        /** Conversion lastMsgType */
        lastMsgType?: (number|null);

        /** Conversion lastMsgKind */
        lastMsgKind?: (number|null);

        /** Conversion replaceContent */
        replaceContent?: (string|null);

        /** Conversion unReadNum */
        unReadNum?: (number|null);

        /** Conversion conversionId */
        conversionId?: (string|null);

        /** Conversion createTime */
        createTime?: (number|Long|null);

        /** Conversion uptTime */
        uptTime?: (number|Long|null);
    }

    /** Represents a Conversion. */
    class Conversion implements IConversion {

        /**
         * Constructs a new Conversion.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IConversion);

        /** Conversion userId. */
        public userId: string;

        /** Conversion userNick. */
        public userNick: string;

        /** Conversion headImg. */
        public headImg: string;

        /** Conversion userType. */
        public userType: number;

        /** Conversion toUserId. */
        public toUserId: string;

        /** Conversion toUserNick. */
        public toUserNick: string;

        /** Conversion toUserHeadImg. */
        public toUserHeadImg: string;

        /** Conversion toUserType. */
        public toUserType: number;

        /** Conversion lastMsgType. */
        public lastMsgType: number;

        /** Conversion lastMsgKind. */
        public lastMsgKind: number;

        /** Conversion replaceContent. */
        public replaceContent: string;

        /** Conversion unReadNum. */
        public unReadNum: number;

        /** Conversion conversionId. */
        public conversionId: string;

        /** Conversion createTime. */
        public createTime: (number|Long);

        /** Conversion uptTime. */
        public uptTime: (number|Long);

        /**
         * Creates a new Conversion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Conversion instance
         */
        public static create(properties?: mproto.IConversion): mproto.Conversion;

        /**
         * Encodes the specified Conversion message. Does not implicitly {@link mproto.Conversion.verify|verify} messages.
         * @param message Conversion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IConversion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Conversion message, length delimited. Does not implicitly {@link mproto.Conversion.verify|verify} messages.
         * @param message Conversion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IConversion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Conversion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Conversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.Conversion;

        /**
         * Decodes a Conversion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Conversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.Conversion;

        /**
         * Verifies a Conversion message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Conversion message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Conversion
         */
        public static fromObject(object: { [k: string]: any }): mproto.Conversion;

        /**
         * Creates a plain object from a Conversion message. Also converts values to other types if specified.
         * @param message Conversion
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.Conversion, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Conversion to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatMsg. */
    interface IChatMsg {

        /** ChatMsg msgId */
        msgId?: (string|null);

        /** ChatMsg userId */
        userId?: (string|null);

        /** ChatMsg userNick */
        userNick?: (string|null);

        /** ChatMsg userHeadImg */
        userHeadImg?: (string|null);

        /** ChatMsg userType */
        userType?: (number|null);

        /** ChatMsg toUserId */
        toUserId?: (string|null);

        /** ChatMsg toUserNick */
        toUserNick?: (string|null);

        /** ChatMsg toUserHeadImg */
        toUserHeadImg?: (string|null);

        /** ChatMsg toUserType */
        toUserType?: (number|null);

        /** ChatMsg content */
        content?: (string|null);

        /** ChatMsg msgKind */
        msgKind?: (number|null);

        /** ChatMsg msgType */
        msgType?: (number|null);

        /** ChatMsg contentType */
        contentType?: (number|null);

        /** ChatMsg sendTime */
        sendTime?: (number|Long|null);

        /** ChatMsg readTime */
        readTime?: (number|Long|null);

        /** ChatMsg EditUptTime */
        EditUptTime?: (number|Long|null);

        /** ChatMsg isRead */
        isRead?: (boolean|null);
    }

    /** Represents a ChatMsg. */
    class ChatMsg implements IChatMsg {

        /**
         * Constructs a new ChatMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: mproto.IChatMsg);

        /** ChatMsg msgId. */
        public msgId: string;

        /** ChatMsg userId. */
        public userId: string;

        /** ChatMsg userNick. */
        public userNick: string;

        /** ChatMsg userHeadImg. */
        public userHeadImg: string;

        /** ChatMsg userType. */
        public userType: number;

        /** ChatMsg toUserId. */
        public toUserId: string;

        /** ChatMsg toUserNick. */
        public toUserNick: string;

        /** ChatMsg toUserHeadImg. */
        public toUserHeadImg: string;

        /** ChatMsg toUserType. */
        public toUserType: number;

        /** ChatMsg content. */
        public content: string;

        /** ChatMsg msgKind. */
        public msgKind: number;

        /** ChatMsg msgType. */
        public msgType: number;

        /** ChatMsg contentType. */
        public contentType: number;

        /** ChatMsg sendTime. */
        public sendTime: (number|Long);

        /** ChatMsg readTime. */
        public readTime: (number|Long);

        /** ChatMsg EditUptTime. */
        public EditUptTime: (number|Long);

        /** ChatMsg isRead. */
        public isRead: boolean;

        /**
         * Creates a new ChatMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatMsg instance
         */
        public static create(properties?: mproto.IChatMsg): mproto.ChatMsg;

        /**
         * Encodes the specified ChatMsg message. Does not implicitly {@link mproto.ChatMsg.verify|verify} messages.
         * @param message ChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mproto.IChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatMsg message, length delimited. Does not implicitly {@link mproto.ChatMsg.verify|verify} messages.
         * @param message ChatMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mproto.IChatMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mproto.ChatMsg;

        /**
         * Decodes a ChatMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mproto.ChatMsg;

        /**
         * Verifies a ChatMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatMsg
         */
        public static fromObject(object: { [k: string]: any }): mproto.ChatMsg;

        /**
         * Creates a plain object from a ChatMsg message. Also converts values to other types if specified.
         * @param message ChatMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mproto.ChatMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
