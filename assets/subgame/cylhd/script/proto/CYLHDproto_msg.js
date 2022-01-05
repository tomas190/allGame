/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("../libs/CYLHDprotobuf");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.msg = (function() {

    /**
     * Namespace msg.
     * @exports msg
     * @namespace
     */
    var msg = {};

    /**
     * SysCodeEnum enum.
     * @name msg.SysCodeEnum
     * @enum {number}
     * @property {number} SUCCESS=0 SUCCESS value
     * @property {number} DATA_ILLEGAL=1 DATA_ILLEGAL value
     * @property {number} BALANCE_NOT_ENOUGH=2 BALANCE_NOT_ENOUGH value
     * @property {number} DATABASE_READ_WRITE_FAILED=3 DATABASE_READ_WRITE_FAILED value
     * @property {number} CENTER_SERVER_DISCONNECT=4 CENTER_SERVER_DISCONNECT value
     * @property {number} EXCEED_LIMIT_BET=5 EXCEED_LIMIT_BET value
     * @property {number} USER_NOT_EXIST=100 USER_NOT_EXIST value
     * @property {number} OTHER_DEVICES_LOGIN=101 OTHER_DEVICES_LOGIN value
     * @property {number} USER_DISABLE=102 USER_DISABLE value
     * @property {number} BET_TIME_END=103 BET_TIME_END value
     * @property {number} MORETHAN_LIMIT=104 MORETHAN_LIMIT value
     * @property {number} IN_OTHER_ROOM=105 IN_OTHER_ROOM value
     * @property {number} NOT_IN_THIS_ROOM=107 NOT_IN_THIS_ROOM value
     * @property {number} ROOM_NOT_EXIST=111 ROOM_NOT_EXIST value
     * @property {number} ROOM_NOT_OPEN=112 ROOM_NOT_OPEN value
     */
    msg.SysCodeEnum = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SUCCESS"] = 0;
        values[valuesById[1] = "DATA_ILLEGAL"] = 1;
        values[valuesById[2] = "BALANCE_NOT_ENOUGH"] = 2;
        values[valuesById[3] = "DATABASE_READ_WRITE_FAILED"] = 3;
        values[valuesById[4] = "CENTER_SERVER_DISCONNECT"] = 4;
        values[valuesById[5] = "EXCEED_LIMIT_BET"] = 5;
        values[valuesById[100] = "USER_NOT_EXIST"] = 100;
        values[valuesById[101] = "OTHER_DEVICES_LOGIN"] = 101;
        values[valuesById[102] = "USER_DISABLE"] = 102;
        values[valuesById[103] = "BET_TIME_END"] = 103;
        values[valuesById[104] = "MORETHAN_LIMIT"] = 104;
        values[valuesById[105] = "IN_OTHER_ROOM"] = 105;
        values[valuesById[107] = "NOT_IN_THIS_ROOM"] = 107;
        values[valuesById[111] = "ROOM_NOT_EXIST"] = 111;
        values[valuesById[112] = "ROOM_NOT_OPEN"] = 112;
        return values;
    })();

    /**
     * MessageKind enum.
     * @name msg.MessageKind
     * @enum {number}
     * @property {number} Ping=0 Ping value
     * @property {number} Pong=1 Pong value
     * @property {number} Login=2 Login value
     * @property {number} LoginR=3 LoginR value
     * @property {number} Logout=4 Logout value
     * @property {number} LogoutR=5 LogoutR value
     * @property {number} JoinRoom=6 JoinRoom value
     * @property {number} JoinRoomR=7 JoinRoomR value
     * @property {number} ExitRoom=8 ExitRoom value
     * @property {number} ExitRoomR=9 ExitRoomR value
     * @property {number} Bet=10 Bet value
     * @property {number} BetR=11 BetR value
     * @property {number} KeepBet=12 KeepBet value
     * @property {number} KeepBetR=13 KeepBetR value
     * @property {number} History=14 History value
     * @property {number} HistoryR=15 HistoryR value
     * @property {number} RoundPlayInfoP=16 RoundPlayInfoP value
     * @property {number} RoomListLobbyP=17 RoomListLobbyP value
     * @property {number} CancelRoundP=18 CancelRoundP value
     * @property {number} BetP=19 BetP value
     * @property {number} ResultRoundP=20 ResultRoundP value
     * @property {number} UpdateBalanceP=21 UpdateBalanceP value
     * @property {number} UpdateServiceP=22 UpdateServiceP value
     * @property {number} PauseServiceP=23 PauseServiceP value
     * @property {number} KickedOutP=24 KickedOutP value
     * @property {number} Error=25 Error value
     * @property {number} UserRank=26 UserRank value
     * @property {number} UserRankR=27 UserRankR value
     * @property {number} BetRecord=28 BetRecord value
     * @property {number} BetRecordR=29 BetRecordR value
     * @property {number} RoomRedLimit=30 RoomRedLimit value
     * @property {number} RoomRedLimitR=31 RoomRedLimitR value
     * @property {number} ZhiBoUpdateBalanceP=32 ZhiBoUpdateBalanceP value
     */
    msg.MessageKind = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Ping"] = 0;
        values[valuesById[1] = "Pong"] = 1;
        values[valuesById[2] = "Login"] = 2;
        values[valuesById[3] = "LoginR"] = 3;
        values[valuesById[4] = "Logout"] = 4;
        values[valuesById[5] = "LogoutR"] = 5;
        values[valuesById[6] = "JoinRoom"] = 6;
        values[valuesById[7] = "JoinRoomR"] = 7;
        values[valuesById[8] = "ExitRoom"] = 8;
        values[valuesById[9] = "ExitRoomR"] = 9;
        values[valuesById[10] = "Bet"] = 10;
        values[valuesById[11] = "BetR"] = 11;
        values[valuesById[12] = "KeepBet"] = 12;
        values[valuesById[13] = "KeepBetR"] = 13;
        values[valuesById[14] = "History"] = 14;
        values[valuesById[15] = "HistoryR"] = 15;
        values[valuesById[16] = "RoundPlayInfoP"] = 16;
        values[valuesById[17] = "RoomListLobbyP"] = 17;
        values[valuesById[18] = "CancelRoundP"] = 18;
        values[valuesById[19] = "BetP"] = 19;
        values[valuesById[20] = "ResultRoundP"] = 20;
        values[valuesById[21] = "UpdateBalanceP"] = 21;
        values[valuesById[22] = "UpdateServiceP"] = 22;
        values[valuesById[23] = "PauseServiceP"] = 23;
        values[valuesById[24] = "KickedOutP"] = 24;
        values[valuesById[25] = "Error"] = 25;
        values[valuesById[26] = "UserRank"] = 26;
        values[valuesById[27] = "UserRankR"] = 27;
        values[valuesById[28] = "BetRecord"] = 28;
        values[valuesById[29] = "BetRecordR"] = 29;
        values[valuesById[30] = "RoomRedLimit"] = 30;
        values[valuesById[31] = "RoomRedLimitR"] = 31;
        values[valuesById[32] = "ZhiBoUpdateBalanceP"] = 32;
        return values;
    })();

    msg.InfoBet = (function() {

        /**
         * Properties of an InfoBet.
         * @memberof msg
         * @interface IInfoBet
         * @property {number|null} [type] InfoBet type
         * @property {number|null} [val] InfoBet val
         * @property {number|null} [position] InfoBet position
         */

        /**
         * Constructs a new InfoBet.
         * @memberof msg
         * @classdesc Represents an InfoBet.
         * @implements IInfoBet
         * @constructor
         * @param {msg.IInfoBet=} [properties] Properties to set
         */
        function InfoBet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InfoBet type.
         * @member {number} type
         * @memberof msg.InfoBet
         * @instance
         */
        InfoBet.prototype.type = 0;

        /**
         * InfoBet val.
         * @member {number} val
         * @memberof msg.InfoBet
         * @instance
         */
        InfoBet.prototype.val = 0;

        /**
         * InfoBet position.
         * @member {number} position
         * @memberof msg.InfoBet
         * @instance
         */
        InfoBet.prototype.position = 0;

        /**
         * Creates a new InfoBet instance using the specified properties.
         * @function create
         * @memberof msg.InfoBet
         * @static
         * @param {msg.IInfoBet=} [properties] Properties to set
         * @returns {msg.InfoBet} InfoBet instance
         */
        InfoBet.create = function create(properties) {
            return new InfoBet(properties);
        };

        /**
         * Encodes the specified InfoBet message. Does not implicitly {@link msg.InfoBet.verify|verify} messages.
         * @function encode
         * @memberof msg.InfoBet
         * @static
         * @param {msg.IInfoBet} message InfoBet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InfoBet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.val != null && Object.hasOwnProperty.call(message, "val"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.val);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.position);
            return writer;
        };

        /**
         * Encodes the specified InfoBet message, length delimited. Does not implicitly {@link msg.InfoBet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.InfoBet
         * @static
         * @param {msg.IInfoBet} message InfoBet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InfoBet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InfoBet message from the specified reader or buffer.
         * @function decode
         * @memberof msg.InfoBet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.InfoBet} InfoBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InfoBet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.InfoBet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.val = reader.int32();
                    break;
                case 3:
                    message.position = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InfoBet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.InfoBet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.InfoBet} InfoBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InfoBet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InfoBet message.
         * @function verify
         * @memberof msg.InfoBet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InfoBet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.val != null && message.hasOwnProperty("val"))
                if (!$util.isInteger(message.val))
                    return "val: integer expected";
            if (message.position != null && message.hasOwnProperty("position"))
                if (!$util.isInteger(message.position))
                    return "position: integer expected";
            return null;
        };

        /**
         * Creates an InfoBet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.InfoBet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.InfoBet} InfoBet
         */
        InfoBet.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.InfoBet)
                return object;
            var message = new $root.msg.InfoBet();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.val != null)
                message.val = object.val | 0;
            if (object.position != null)
                message.position = object.position | 0;
            return message;
        };

        /**
         * Creates a plain object from an InfoBet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.InfoBet
         * @static
         * @param {msg.InfoBet} message InfoBet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InfoBet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = 0;
                object.val = 0;
                object.position = 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.val != null && message.hasOwnProperty("val"))
                object.val = message.val;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = message.position;
            return object;
        };

        /**
         * Converts this InfoBet to JSON.
         * @function toJSON
         * @memberof msg.InfoBet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InfoBet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InfoBet;
    })();

    msg.HeartBeatRequest = (function() {

        /**
         * Properties of a HeartBeatRequest.
         * @memberof msg
         * @interface IHeartBeatRequest
         */

        /**
         * Constructs a new HeartBeatRequest.
         * @memberof msg
         * @classdesc Represents a HeartBeatRequest.
         * @implements IHeartBeatRequest
         * @constructor
         * @param {msg.IHeartBeatRequest=} [properties] Properties to set
         */
        function HeartBeatRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new HeartBeatRequest instance using the specified properties.
         * @function create
         * @memberof msg.HeartBeatRequest
         * @static
         * @param {msg.IHeartBeatRequest=} [properties] Properties to set
         * @returns {msg.HeartBeatRequest} HeartBeatRequest instance
         */
        HeartBeatRequest.create = function create(properties) {
            return new HeartBeatRequest(properties);
        };

        /**
         * Encodes the specified HeartBeatRequest message. Does not implicitly {@link msg.HeartBeatRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.HeartBeatRequest
         * @static
         * @param {msg.IHeartBeatRequest} message HeartBeatRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified HeartBeatRequest message, length delimited. Does not implicitly {@link msg.HeartBeatRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.HeartBeatRequest
         * @static
         * @param {msg.IHeartBeatRequest} message HeartBeatRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartBeatRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.HeartBeatRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.HeartBeatRequest} HeartBeatRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.HeartBeatRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartBeatRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.HeartBeatRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.HeartBeatRequest} HeartBeatRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartBeatRequest message.
         * @function verify
         * @memberof msg.HeartBeatRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartBeatRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a HeartBeatRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.HeartBeatRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.HeartBeatRequest} HeartBeatRequest
         */
        HeartBeatRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.HeartBeatRequest)
                return object;
            return new $root.msg.HeartBeatRequest();
        };

        /**
         * Creates a plain object from a HeartBeatRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.HeartBeatRequest
         * @static
         * @param {msg.HeartBeatRequest} message HeartBeatRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeartBeatRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this HeartBeatRequest to JSON.
         * @function toJSON
         * @memberof msg.HeartBeatRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeartBeatRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HeartBeatRequest;
    })();

    msg.HeartBeatResponse = (function() {

        /**
         * Properties of a HeartBeatResponse.
         * @memberof msg
         * @interface IHeartBeatResponse
         */

        /**
         * Constructs a new HeartBeatResponse.
         * @memberof msg
         * @classdesc Represents a HeartBeatResponse.
         * @implements IHeartBeatResponse
         * @constructor
         * @param {msg.IHeartBeatResponse=} [properties] Properties to set
         */
        function HeartBeatResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new HeartBeatResponse instance using the specified properties.
         * @function create
         * @memberof msg.HeartBeatResponse
         * @static
         * @param {msg.IHeartBeatResponse=} [properties] Properties to set
         * @returns {msg.HeartBeatResponse} HeartBeatResponse instance
         */
        HeartBeatResponse.create = function create(properties) {
            return new HeartBeatResponse(properties);
        };

        /**
         * Encodes the specified HeartBeatResponse message. Does not implicitly {@link msg.HeartBeatResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.HeartBeatResponse
         * @static
         * @param {msg.IHeartBeatResponse} message HeartBeatResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified HeartBeatResponse message, length delimited. Does not implicitly {@link msg.HeartBeatResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.HeartBeatResponse
         * @static
         * @param {msg.IHeartBeatResponse} message HeartBeatResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartBeatResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.HeartBeatResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.HeartBeatResponse} HeartBeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.HeartBeatResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartBeatResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.HeartBeatResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.HeartBeatResponse} HeartBeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartBeatResponse message.
         * @function verify
         * @memberof msg.HeartBeatResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartBeatResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a HeartBeatResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.HeartBeatResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.HeartBeatResponse} HeartBeatResponse
         */
        HeartBeatResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.HeartBeatResponse)
                return object;
            return new $root.msg.HeartBeatResponse();
        };

        /**
         * Creates a plain object from a HeartBeatResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.HeartBeatResponse
         * @static
         * @param {msg.HeartBeatResponse} message HeartBeatResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeartBeatResponse.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this HeartBeatResponse to JSON.
         * @function toJSON
         * @memberof msg.HeartBeatResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeartBeatResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HeartBeatResponse;
    })();

    msg.LoginRequest = (function() {

        /**
         * Properties of a LoginRequest.
         * @memberof msg
         * @interface ILoginRequest
         * @property {number|null} [userID] LoginRequest userID
         * @property {string|null} [gameID] LoginRequest gameID
         * @property {string|null} [password] LoginRequest password
         */

        /**
         * Constructs a new LoginRequest.
         * @memberof msg
         * @classdesc Represents a LoginRequest.
         * @implements ILoginRequest
         * @constructor
         * @param {msg.ILoginRequest=} [properties] Properties to set
         */
        function LoginRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginRequest userID.
         * @member {number} userID
         * @memberof msg.LoginRequest
         * @instance
         */
        LoginRequest.prototype.userID = 0;

        /**
         * LoginRequest gameID.
         * @member {string} gameID
         * @memberof msg.LoginRequest
         * @instance
         */
        LoginRequest.prototype.gameID = "";

        /**
         * LoginRequest password.
         * @member {string} password
         * @memberof msg.LoginRequest
         * @instance
         */
        LoginRequest.prototype.password = "";

        /**
         * Creates a new LoginRequest instance using the specified properties.
         * @function create
         * @memberof msg.LoginRequest
         * @static
         * @param {msg.ILoginRequest=} [properties] Properties to set
         * @returns {msg.LoginRequest} LoginRequest instance
         */
        LoginRequest.create = function create(properties) {
            return new LoginRequest(properties);
        };

        /**
         * Encodes the specified LoginRequest message. Does not implicitly {@link msg.LoginRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.LoginRequest
         * @static
         * @param {msg.ILoginRequest} message LoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userID);
            if (message.gameID != null && Object.hasOwnProperty.call(message, "gameID"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameID);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.password);
            return writer;
        };

        /**
         * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link msg.LoginRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LoginRequest
         * @static
         * @param {msg.ILoginRequest} message LoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LoginRequest} LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LoginRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userID = reader.int32();
                    break;
                case 2:
                    message.gameID = reader.string();
                    break;
                case 3:
                    message.password = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LoginRequest} LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginRequest message.
         * @function verify
         * @memberof msg.LoginRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userID != null && message.hasOwnProperty("userID"))
                if (!$util.isInteger(message.userID))
                    return "userID: integer expected";
            if (message.gameID != null && message.hasOwnProperty("gameID"))
                if (!$util.isString(message.gameID))
                    return "gameID: string expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            return null;
        };

        /**
         * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LoginRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LoginRequest} LoginRequest
         */
        LoginRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LoginRequest)
                return object;
            var message = new $root.msg.LoginRequest();
            if (object.userID != null)
                message.userID = object.userID | 0;
            if (object.gameID != null)
                message.gameID = String(object.gameID);
            if (object.password != null)
                message.password = String(object.password);
            return message;
        };

        /**
         * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LoginRequest
         * @static
         * @param {msg.LoginRequest} message LoginRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userID = 0;
                object.gameID = "";
                object.password = "";
            }
            if (message.userID != null && message.hasOwnProperty("userID"))
                object.userID = message.userID;
            if (message.gameID != null && message.hasOwnProperty("gameID"))
                object.gameID = message.gameID;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            return object;
        };

        /**
         * Converts this LoginRequest to JSON.
         * @function toJSON
         * @memberof msg.LoginRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginRequest;
    })();

    msg.UserInfo = (function() {

        /**
         * Properties of a UserInfo.
         * @memberof msg
         * @interface IUserInfo
         * @property {number|null} [userID] UserInfo userID
         * @property {number|null} [createTime] UserInfo createTime
         * @property {number|null} [balance] UserInfo balance
         * @property {number|null} [lockMoney] UserInfo lockMoney
         * @property {string|null} [userName] UserInfo userName
         * @property {string|null} [headUrl] UserInfo headUrl
         * @property {string|null} [roomNumber] UserInfo roomNumber
         */

        /**
         * Constructs a new UserInfo.
         * @memberof msg
         * @classdesc Represents a UserInfo.
         * @implements IUserInfo
         * @constructor
         * @param {msg.IUserInfo=} [properties] Properties to set
         */
        function UserInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserInfo userID.
         * @member {number} userID
         * @memberof msg.UserInfo
         * @instance
         */
        UserInfo.prototype.userID = 0;

        /**
         * UserInfo createTime.
         * @member {number} createTime
         * @memberof msg.UserInfo
         * @instance
         */
        UserInfo.prototype.createTime = 0;

        /**
         * UserInfo balance.
         * @member {number} balance
         * @memberof msg.UserInfo
         * @instance
         */
        UserInfo.prototype.balance = 0;

        /**
         * UserInfo lockMoney.
         * @member {number} lockMoney
         * @memberof msg.UserInfo
         * @instance
         */
        UserInfo.prototype.lockMoney = 0;

        /**
         * UserInfo userName.
         * @member {string} userName
         * @memberof msg.UserInfo
         * @instance
         */
        UserInfo.prototype.userName = "";

        /**
         * UserInfo headUrl.
         * @member {string} headUrl
         * @memberof msg.UserInfo
         * @instance
         */
        UserInfo.prototype.headUrl = "";

        /**
         * UserInfo roomNumber.
         * @member {string} roomNumber
         * @memberof msg.UserInfo
         * @instance
         */
        UserInfo.prototype.roomNumber = "";

        /**
         * Creates a new UserInfo instance using the specified properties.
         * @function create
         * @memberof msg.UserInfo
         * @static
         * @param {msg.IUserInfo=} [properties] Properties to set
         * @returns {msg.UserInfo} UserInfo instance
         */
        UserInfo.create = function create(properties) {
            return new UserInfo(properties);
        };

        /**
         * Encodes the specified UserInfo message. Does not implicitly {@link msg.UserInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.UserInfo
         * @static
         * @param {msg.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userID);
            if (message.createTime != null && Object.hasOwnProperty.call(message, "createTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.createTime);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.balance);
            if (message.lockMoney != null && Object.hasOwnProperty.call(message, "lockMoney"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.lockMoney);
            if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.userName);
            if (message.headUrl != null && Object.hasOwnProperty.call(message, "headUrl"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.headUrl);
            if (message.roomNumber != null && Object.hasOwnProperty.call(message, "roomNumber"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.roomNumber);
            return writer;
        };

        /**
         * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link msg.UserInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UserInfo
         * @static
         * @param {msg.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UserInfo} UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UserInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userID = reader.int32();
                    break;
                case 2:
                    message.createTime = reader.uint32();
                    break;
                case 3:
                    message.balance = reader.double();
                    break;
                case 4:
                    message.lockMoney = reader.double();
                    break;
                case 5:
                    message.userName = reader.string();
                    break;
                case 6:
                    message.headUrl = reader.string();
                    break;
                case 7:
                    message.roomNumber = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UserInfo} UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserInfo message.
         * @function verify
         * @memberof msg.UserInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userID != null && message.hasOwnProperty("userID"))
                if (!$util.isInteger(message.userID))
                    return "userID: integer expected";
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (!$util.isInteger(message.createTime))
                    return "createTime: integer expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (typeof message.balance !== "number")
                    return "balance: number expected";
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                if (typeof message.lockMoney !== "number")
                    return "lockMoney: number expected";
            if (message.userName != null && message.hasOwnProperty("userName"))
                if (!$util.isString(message.userName))
                    return "userName: string expected";
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                if (!$util.isString(message.headUrl))
                    return "headUrl: string expected";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                if (!$util.isString(message.roomNumber))
                    return "roomNumber: string expected";
            return null;
        };

        /**
         * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UserInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UserInfo} UserInfo
         */
        UserInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UserInfo)
                return object;
            var message = new $root.msg.UserInfo();
            if (object.userID != null)
                message.userID = object.userID | 0;
            if (object.createTime != null)
                message.createTime = object.createTime >>> 0;
            if (object.balance != null)
                message.balance = Number(object.balance);
            if (object.lockMoney != null)
                message.lockMoney = Number(object.lockMoney);
            if (object.userName != null)
                message.userName = String(object.userName);
            if (object.headUrl != null)
                message.headUrl = String(object.headUrl);
            if (object.roomNumber != null)
                message.roomNumber = String(object.roomNumber);
            return message;
        };

        /**
         * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UserInfo
         * @static
         * @param {msg.UserInfo} message UserInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userID = 0;
                object.createTime = 0;
                object.balance = 0;
                object.lockMoney = 0;
                object.userName = "";
                object.headUrl = "";
                object.roomNumber = "";
            }
            if (message.userID != null && message.hasOwnProperty("userID"))
                object.userID = message.userID;
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                object.createTime = message.createTime;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                object.lockMoney = options.json && !isFinite(message.lockMoney) ? String(message.lockMoney) : message.lockMoney;
            if (message.userName != null && message.hasOwnProperty("userName"))
                object.userName = message.userName;
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                object.headUrl = message.headUrl;
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                object.roomNumber = message.roomNumber;
            return object;
        };

        /**
         * Converts this UserInfo to JSON.
         * @function toJSON
         * @memberof msg.UserInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserInfo;
    })();

    msg.LoginResponse = (function() {

        /**
         * Properties of a LoginResponse.
         * @memberof msg
         * @interface ILoginResponse
         * @property {number|Long|null} [serverTime] LoginResponse serverTime
         * @property {number|null} [code] LoginResponse code
         * @property {msg.IUserInfo|null} [user] LoginResponse user
         * @property {string|null} [version] LoginResponse version
         * @property {number|null} [taxPt] LoginResponse taxPt
         */

        /**
         * Constructs a new LoginResponse.
         * @memberof msg
         * @classdesc Represents a LoginResponse.
         * @implements ILoginResponse
         * @constructor
         * @param {msg.ILoginResponse=} [properties] Properties to set
         */
        function LoginResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginResponse serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.LoginResponse
         * @instance
         */
        LoginResponse.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * LoginResponse code.
         * @member {number} code
         * @memberof msg.LoginResponse
         * @instance
         */
        LoginResponse.prototype.code = 0;

        /**
         * LoginResponse user.
         * @member {msg.IUserInfo|null|undefined} user
         * @memberof msg.LoginResponse
         * @instance
         */
        LoginResponse.prototype.user = null;

        /**
         * LoginResponse version.
         * @member {string} version
         * @memberof msg.LoginResponse
         * @instance
         */
        LoginResponse.prototype.version = "";

        /**
         * LoginResponse taxPt.
         * @member {number} taxPt
         * @memberof msg.LoginResponse
         * @instance
         */
        LoginResponse.prototype.taxPt = 0;

        /**
         * Creates a new LoginResponse instance using the specified properties.
         * @function create
         * @memberof msg.LoginResponse
         * @static
         * @param {msg.ILoginResponse=} [properties] Properties to set
         * @returns {msg.LoginResponse} LoginResponse instance
         */
        LoginResponse.create = function create(properties) {
            return new LoginResponse(properties);
        };

        /**
         * Encodes the specified LoginResponse message. Does not implicitly {@link msg.LoginResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.LoginResponse
         * @static
         * @param {msg.ILoginResponse} message LoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                $root.msg.UserInfo.encode(message.user, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.version);
            if (message.taxPt != null && Object.hasOwnProperty.call(message, "taxPt"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.taxPt);
            return writer;
        };

        /**
         * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link msg.LoginResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LoginResponse
         * @static
         * @param {msg.ILoginResponse} message LoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LoginResponse} LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LoginResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.user = $root.msg.UserInfo.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.version = reader.string();
                    break;
                case 5:
                    message.taxPt = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LoginResponse} LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginResponse message.
         * @function verify
         * @memberof msg.LoginResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.msg.UserInfo.verify(message.user);
                if (error)
                    return "user." + error;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.taxPt != null && message.hasOwnProperty("taxPt"))
                if (typeof message.taxPt !== "number")
                    return "taxPt: number expected";
            return null;
        };

        /**
         * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LoginResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LoginResponse} LoginResponse
         */
        LoginResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LoginResponse)
                return object;
            var message = new $root.msg.LoginResponse();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".msg.LoginResponse.user: object expected");
                message.user = $root.msg.UserInfo.fromObject(object.user);
            }
            if (object.version != null)
                message.version = String(object.version);
            if (object.taxPt != null)
                message.taxPt = Number(object.taxPt);
            return message;
        };

        /**
         * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LoginResponse
         * @static
         * @param {msg.LoginResponse} message LoginResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.user = null;
                object.version = "";
                object.taxPt = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.msg.UserInfo.toObject(message.user, options);
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.taxPt != null && message.hasOwnProperty("taxPt"))
                object.taxPt = options.json && !isFinite(message.taxPt) ? String(message.taxPt) : message.taxPt;
            return object;
        };

        /**
         * Converts this LoginResponse to JSON.
         * @function toJSON
         * @memberof msg.LoginResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginResponse;
    })();

    msg.LogoutRequest = (function() {

        /**
         * Properties of a LogoutRequest.
         * @memberof msg
         * @interface ILogoutRequest
         */

        /**
         * Constructs a new LogoutRequest.
         * @memberof msg
         * @classdesc Represents a LogoutRequest.
         * @implements ILogoutRequest
         * @constructor
         * @param {msg.ILogoutRequest=} [properties] Properties to set
         */
        function LogoutRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new LogoutRequest instance using the specified properties.
         * @function create
         * @memberof msg.LogoutRequest
         * @static
         * @param {msg.ILogoutRequest=} [properties] Properties to set
         * @returns {msg.LogoutRequest} LogoutRequest instance
         */
        LogoutRequest.create = function create(properties) {
            return new LogoutRequest(properties);
        };

        /**
         * Encodes the specified LogoutRequest message. Does not implicitly {@link msg.LogoutRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.LogoutRequest
         * @static
         * @param {msg.ILogoutRequest} message LogoutRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogoutRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified LogoutRequest message, length delimited. Does not implicitly {@link msg.LogoutRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LogoutRequest
         * @static
         * @param {msg.ILogoutRequest} message LogoutRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogoutRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LogoutRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LogoutRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LogoutRequest} LogoutRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogoutRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LogoutRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LogoutRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LogoutRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LogoutRequest} LogoutRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogoutRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogoutRequest message.
         * @function verify
         * @memberof msg.LogoutRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogoutRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a LogoutRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LogoutRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LogoutRequest} LogoutRequest
         */
        LogoutRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LogoutRequest)
                return object;
            return new $root.msg.LogoutRequest();
        };

        /**
         * Creates a plain object from a LogoutRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LogoutRequest
         * @static
         * @param {msg.LogoutRequest} message LogoutRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogoutRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this LogoutRequest to JSON.
         * @function toJSON
         * @memberof msg.LogoutRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogoutRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LogoutRequest;
    })();

    msg.LogoutResponse = (function() {

        /**
         * Properties of a LogoutResponse.
         * @memberof msg
         * @interface ILogoutResponse
         * @property {number|null} [code] LogoutResponse code
         * @property {number|Long|null} [serverTime] LogoutResponse serverTime
         */

        /**
         * Constructs a new LogoutResponse.
         * @memberof msg
         * @classdesc Represents a LogoutResponse.
         * @implements ILogoutResponse
         * @constructor
         * @param {msg.ILogoutResponse=} [properties] Properties to set
         */
        function LogoutResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogoutResponse code.
         * @member {number} code
         * @memberof msg.LogoutResponse
         * @instance
         */
        LogoutResponse.prototype.code = 0;

        /**
         * LogoutResponse serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.LogoutResponse
         * @instance
         */
        LogoutResponse.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new LogoutResponse instance using the specified properties.
         * @function create
         * @memberof msg.LogoutResponse
         * @static
         * @param {msg.ILogoutResponse=} [properties] Properties to set
         * @returns {msg.LogoutResponse} LogoutResponse instance
         */
        LogoutResponse.create = function create(properties) {
            return new LogoutResponse(properties);
        };

        /**
         * Encodes the specified LogoutResponse message. Does not implicitly {@link msg.LogoutResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.LogoutResponse
         * @static
         * @param {msg.ILogoutResponse} message LogoutResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogoutResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.serverTime);
            return writer;
        };

        /**
         * Encodes the specified LogoutResponse message, length delimited. Does not implicitly {@link msg.LogoutResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LogoutResponse
         * @static
         * @param {msg.ILogoutResponse} message LogoutResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogoutResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LogoutResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LogoutResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LogoutResponse} LogoutResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogoutResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LogoutResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.serverTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LogoutResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LogoutResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LogoutResponse} LogoutResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogoutResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogoutResponse message.
         * @function verify
         * @memberof msg.LogoutResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogoutResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a LogoutResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LogoutResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LogoutResponse} LogoutResponse
         */
        LogoutResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LogoutResponse)
                return object;
            var message = new $root.msg.LogoutResponse();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a LogoutResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LogoutResponse
         * @static
         * @param {msg.LogoutResponse} message LogoutResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogoutResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            return object;
        };

        /**
         * Converts this LogoutResponse to JSON.
         * @function toJSON
         * @memberof msg.LogoutResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogoutResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LogoutResponse;
    })();

    msg.JoinRoomRequest = (function() {

        /**
         * Properties of a JoinRoomRequest.
         * @memberof msg
         * @interface IJoinRoomRequest
         * @property {string|null} [roomNumber] JoinRoomRequest roomNumber
         */

        /**
         * Constructs a new JoinRoomRequest.
         * @memberof msg
         * @classdesc Represents a JoinRoomRequest.
         * @implements IJoinRoomRequest
         * @constructor
         * @param {msg.IJoinRoomRequest=} [properties] Properties to set
         */
        function JoinRoomRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoomRequest roomNumber.
         * @member {string} roomNumber
         * @memberof msg.JoinRoomRequest
         * @instance
         */
        JoinRoomRequest.prototype.roomNumber = "";

        /**
         * Creates a new JoinRoomRequest instance using the specified properties.
         * @function create
         * @memberof msg.JoinRoomRequest
         * @static
         * @param {msg.IJoinRoomRequest=} [properties] Properties to set
         * @returns {msg.JoinRoomRequest} JoinRoomRequest instance
         */
        JoinRoomRequest.create = function create(properties) {
            return new JoinRoomRequest(properties);
        };

        /**
         * Encodes the specified JoinRoomRequest message. Does not implicitly {@link msg.JoinRoomRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.JoinRoomRequest
         * @static
         * @param {msg.IJoinRoomRequest} message JoinRoomRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomNumber != null && Object.hasOwnProperty.call(message, "roomNumber"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomNumber);
            return writer;
        };

        /**
         * Encodes the specified JoinRoomRequest message, length delimited. Does not implicitly {@link msg.JoinRoomRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.JoinRoomRequest
         * @static
         * @param {msg.IJoinRoomRequest} message JoinRoomRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoomRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.JoinRoomRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.JoinRoomRequest} JoinRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.JoinRoomRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomNumber = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoomRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.JoinRoomRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.JoinRoomRequest} JoinRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoomRequest message.
         * @function verify
         * @memberof msg.JoinRoomRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoomRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                if (!$util.isString(message.roomNumber))
                    return "roomNumber: string expected";
            return null;
        };

        /**
         * Creates a JoinRoomRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.JoinRoomRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.JoinRoomRequest} JoinRoomRequest
         */
        JoinRoomRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.JoinRoomRequest)
                return object;
            var message = new $root.msg.JoinRoomRequest();
            if (object.roomNumber != null)
                message.roomNumber = String(object.roomNumber);
            return message;
        };

        /**
         * Creates a plain object from a JoinRoomRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.JoinRoomRequest
         * @static
         * @param {msg.JoinRoomRequest} message JoinRoomRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoomRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.roomNumber = "";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                object.roomNumber = message.roomNumber;
            return object;
        };

        /**
         * Converts this JoinRoomRequest to JSON.
         * @function toJSON
         * @memberof msg.JoinRoomRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoomRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoomRequest;
    })();

    msg.JoinRoomResponse = (function() {

        /**
         * Properties of a JoinRoomResponse.
         * @memberof msg
         * @interface IJoinRoomResponse
         * @property {number|Long|null} [serverTime] JoinRoomResponse serverTime
         * @property {number|null} [code] JoinRoomResponse code
         * @property {string|null} [roomNumber] JoinRoomResponse roomNumber
         * @property {msg.IRoundPlayInfoPush|null} [roundInfo] JoinRoomResponse roundInfo
         * @property {Array.<number>|null} [timeInterval] JoinRoomResponse timeInterval
         */

        /**
         * Constructs a new JoinRoomResponse.
         * @memberof msg
         * @classdesc Represents a JoinRoomResponse.
         * @implements IJoinRoomResponse
         * @constructor
         * @param {msg.IJoinRoomResponse=} [properties] Properties to set
         */
        function JoinRoomResponse(properties) {
            this.timeInterval = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoomResponse serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.JoinRoomResponse
         * @instance
         */
        JoinRoomResponse.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * JoinRoomResponse code.
         * @member {number} code
         * @memberof msg.JoinRoomResponse
         * @instance
         */
        JoinRoomResponse.prototype.code = 0;

        /**
         * JoinRoomResponse roomNumber.
         * @member {string} roomNumber
         * @memberof msg.JoinRoomResponse
         * @instance
         */
        JoinRoomResponse.prototype.roomNumber = "";

        /**
         * JoinRoomResponse roundInfo.
         * @member {msg.IRoundPlayInfoPush|null|undefined} roundInfo
         * @memberof msg.JoinRoomResponse
         * @instance
         */
        JoinRoomResponse.prototype.roundInfo = null;

        /**
         * JoinRoomResponse timeInterval.
         * @member {Array.<number>} timeInterval
         * @memberof msg.JoinRoomResponse
         * @instance
         */
        JoinRoomResponse.prototype.timeInterval = $util.emptyArray;

        /**
         * Creates a new JoinRoomResponse instance using the specified properties.
         * @function create
         * @memberof msg.JoinRoomResponse
         * @static
         * @param {msg.IJoinRoomResponse=} [properties] Properties to set
         * @returns {msg.JoinRoomResponse} JoinRoomResponse instance
         */
        JoinRoomResponse.create = function create(properties) {
            return new JoinRoomResponse(properties);
        };

        /**
         * Encodes the specified JoinRoomResponse message. Does not implicitly {@link msg.JoinRoomResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.JoinRoomResponse
         * @static
         * @param {msg.IJoinRoomResponse} message JoinRoomResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.roomNumber != null && Object.hasOwnProperty.call(message, "roomNumber"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.roomNumber);
            if (message.roundInfo != null && Object.hasOwnProperty.call(message, "roundInfo"))
                $root.msg.RoundPlayInfoPush.encode(message.roundInfo, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.timeInterval != null && message.timeInterval.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (var i = 0; i < message.timeInterval.length; ++i)
                    writer.int32(message.timeInterval[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified JoinRoomResponse message, length delimited. Does not implicitly {@link msg.JoinRoomResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.JoinRoomResponse
         * @static
         * @param {msg.IJoinRoomResponse} message JoinRoomResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoomResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.JoinRoomResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.JoinRoomResponse} JoinRoomResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.JoinRoomResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.roomNumber = reader.string();
                    break;
                case 4:
                    message.roundInfo = $root.msg.RoundPlayInfoPush.decode(reader, reader.uint32());
                    break;
                case 5:
                    if (!(message.timeInterval && message.timeInterval.length))
                        message.timeInterval = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.timeInterval.push(reader.int32());
                    } else
                        message.timeInterval.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoomResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.JoinRoomResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.JoinRoomResponse} JoinRoomResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoomResponse message.
         * @function verify
         * @memberof msg.JoinRoomResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoomResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                if (!$util.isString(message.roomNumber))
                    return "roomNumber: string expected";
            if (message.roundInfo != null && message.hasOwnProperty("roundInfo")) {
                var error = $root.msg.RoundPlayInfoPush.verify(message.roundInfo);
                if (error)
                    return "roundInfo." + error;
            }
            if (message.timeInterval != null && message.hasOwnProperty("timeInterval")) {
                if (!Array.isArray(message.timeInterval))
                    return "timeInterval: array expected";
                for (var i = 0; i < message.timeInterval.length; ++i)
                    if (!$util.isInteger(message.timeInterval[i]))
                        return "timeInterval: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a JoinRoomResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.JoinRoomResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.JoinRoomResponse} JoinRoomResponse
         */
        JoinRoomResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.JoinRoomResponse)
                return object;
            var message = new $root.msg.JoinRoomResponse();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.roomNumber != null)
                message.roomNumber = String(object.roomNumber);
            if (object.roundInfo != null) {
                if (typeof object.roundInfo !== "object")
                    throw TypeError(".msg.JoinRoomResponse.roundInfo: object expected");
                message.roundInfo = $root.msg.RoundPlayInfoPush.fromObject(object.roundInfo);
            }
            if (object.timeInterval) {
                if (!Array.isArray(object.timeInterval))
                    throw TypeError(".msg.JoinRoomResponse.timeInterval: array expected");
                message.timeInterval = [];
                for (var i = 0; i < object.timeInterval.length; ++i)
                    message.timeInterval[i] = object.timeInterval[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a JoinRoomResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.JoinRoomResponse
         * @static
         * @param {msg.JoinRoomResponse} message JoinRoomResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoomResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.timeInterval = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.roomNumber = "";
                object.roundInfo = null;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                object.roomNumber = message.roomNumber;
            if (message.roundInfo != null && message.hasOwnProperty("roundInfo"))
                object.roundInfo = $root.msg.RoundPlayInfoPush.toObject(message.roundInfo, options);
            if (message.timeInterval && message.timeInterval.length) {
                object.timeInterval = [];
                for (var j = 0; j < message.timeInterval.length; ++j)
                    object.timeInterval[j] = message.timeInterval[j];
            }
            return object;
        };

        /**
         * Converts this JoinRoomResponse to JSON.
         * @function toJSON
         * @memberof msg.JoinRoomResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoomResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoomResponse;
    })();

    msg.ExitRoomRequest = (function() {

        /**
         * Properties of an ExitRoomRequest.
         * @memberof msg
         * @interface IExitRoomRequest
         */

        /**
         * Constructs a new ExitRoomRequest.
         * @memberof msg
         * @classdesc Represents an ExitRoomRequest.
         * @implements IExitRoomRequest
         * @constructor
         * @param {msg.IExitRoomRequest=} [properties] Properties to set
         */
        function ExitRoomRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new ExitRoomRequest instance using the specified properties.
         * @function create
         * @memberof msg.ExitRoomRequest
         * @static
         * @param {msg.IExitRoomRequest=} [properties] Properties to set
         * @returns {msg.ExitRoomRequest} ExitRoomRequest instance
         */
        ExitRoomRequest.create = function create(properties) {
            return new ExitRoomRequest(properties);
        };

        /**
         * Encodes the specified ExitRoomRequest message. Does not implicitly {@link msg.ExitRoomRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.ExitRoomRequest
         * @static
         * @param {msg.IExitRoomRequest} message ExitRoomRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified ExitRoomRequest message, length delimited. Does not implicitly {@link msg.ExitRoomRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ExitRoomRequest
         * @static
         * @param {msg.IExitRoomRequest} message ExitRoomRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExitRoomRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ExitRoomRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ExitRoomRequest} ExitRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ExitRoomRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExitRoomRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ExitRoomRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ExitRoomRequest} ExitRoomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExitRoomRequest message.
         * @function verify
         * @memberof msg.ExitRoomRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExitRoomRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an ExitRoomRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ExitRoomRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ExitRoomRequest} ExitRoomRequest
         */
        ExitRoomRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ExitRoomRequest)
                return object;
            return new $root.msg.ExitRoomRequest();
        };

        /**
         * Creates a plain object from an ExitRoomRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ExitRoomRequest
         * @static
         * @param {msg.ExitRoomRequest} message ExitRoomRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExitRoomRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ExitRoomRequest to JSON.
         * @function toJSON
         * @memberof msg.ExitRoomRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExitRoomRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExitRoomRequest;
    })();

    msg.ExitRoomResponse = (function() {

        /**
         * Properties of an ExitRoomResponse.
         * @memberof msg
         * @interface IExitRoomResponse
         * @property {number|Long|null} [serverTime] ExitRoomResponse serverTime
         * @property {number|null} [code] ExitRoomResponse code
         */

        /**
         * Constructs a new ExitRoomResponse.
         * @memberof msg
         * @classdesc Represents an ExitRoomResponse.
         * @implements IExitRoomResponse
         * @constructor
         * @param {msg.IExitRoomResponse=} [properties] Properties to set
         */
        function ExitRoomResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExitRoomResponse serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.ExitRoomResponse
         * @instance
         */
        ExitRoomResponse.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ExitRoomResponse code.
         * @member {number} code
         * @memberof msg.ExitRoomResponse
         * @instance
         */
        ExitRoomResponse.prototype.code = 0;

        /**
         * Creates a new ExitRoomResponse instance using the specified properties.
         * @function create
         * @memberof msg.ExitRoomResponse
         * @static
         * @param {msg.IExitRoomResponse=} [properties] Properties to set
         * @returns {msg.ExitRoomResponse} ExitRoomResponse instance
         */
        ExitRoomResponse.create = function create(properties) {
            return new ExitRoomResponse(properties);
        };

        /**
         * Encodes the specified ExitRoomResponse message. Does not implicitly {@link msg.ExitRoomResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.ExitRoomResponse
         * @static
         * @param {msg.IExitRoomResponse} message ExitRoomResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            return writer;
        };

        /**
         * Encodes the specified ExitRoomResponse message, length delimited. Does not implicitly {@link msg.ExitRoomResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ExitRoomResponse
         * @static
         * @param {msg.IExitRoomResponse} message ExitRoomResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExitRoomResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ExitRoomResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ExitRoomResponse} ExitRoomResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ExitRoomResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExitRoomResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ExitRoomResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ExitRoomResponse} ExitRoomResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExitRoomResponse message.
         * @function verify
         * @memberof msg.ExitRoomResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExitRoomResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            return null;
        };

        /**
         * Creates an ExitRoomResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ExitRoomResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ExitRoomResponse} ExitRoomResponse
         */
        ExitRoomResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ExitRoomResponse)
                return object;
            var message = new $root.msg.ExitRoomResponse();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            return message;
        };

        /**
         * Creates a plain object from an ExitRoomResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ExitRoomResponse
         * @static
         * @param {msg.ExitRoomResponse} message ExitRoomResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExitRoomResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            return object;
        };

        /**
         * Converts this ExitRoomResponse to JSON.
         * @function toJSON
         * @memberof msg.ExitRoomResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExitRoomResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExitRoomResponse;
    })();

    msg.BetRequest = (function() {

        /**
         * Properties of a BetRequest.
         * @memberof msg
         * @interface IBetRequest
         * @property {number|null} [roundID] BetRequest roundID
         * @property {msg.IInfoBet|null} [info] BetRequest info
         */

        /**
         * Constructs a new BetRequest.
         * @memberof msg
         * @classdesc Represents a BetRequest.
         * @implements IBetRequest
         * @constructor
         * @param {msg.IBetRequest=} [properties] Properties to set
         */
        function BetRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetRequest roundID.
         * @member {number} roundID
         * @memberof msg.BetRequest
         * @instance
         */
        BetRequest.prototype.roundID = 0;

        /**
         * BetRequest info.
         * @member {msg.IInfoBet|null|undefined} info
         * @memberof msg.BetRequest
         * @instance
         */
        BetRequest.prototype.info = null;

        /**
         * Creates a new BetRequest instance using the specified properties.
         * @function create
         * @memberof msg.BetRequest
         * @static
         * @param {msg.IBetRequest=} [properties] Properties to set
         * @returns {msg.BetRequest} BetRequest instance
         */
        BetRequest.create = function create(properties) {
            return new BetRequest(properties);
        };

        /**
         * Encodes the specified BetRequest message. Does not implicitly {@link msg.BetRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.BetRequest
         * @static
         * @param {msg.IBetRequest} message BetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roundID != null && Object.hasOwnProperty.call(message, "roundID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roundID);
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                $root.msg.InfoBet.encode(message.info, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BetRequest message, length delimited. Does not implicitly {@link msg.BetRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BetRequest
         * @static
         * @param {msg.IBetRequest} message BetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BetRequest} BetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BetRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roundID = reader.int32();
                    break;
                case 2:
                    message.info = $root.msg.InfoBet.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BetRequest} BetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetRequest message.
         * @function verify
         * @memberof msg.BetRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roundID != null && message.hasOwnProperty("roundID"))
                if (!$util.isInteger(message.roundID))
                    return "roundID: integer expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                var error = $root.msg.InfoBet.verify(message.info);
                if (error)
                    return "info." + error;
            }
            return null;
        };

        /**
         * Creates a BetRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BetRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BetRequest} BetRequest
         */
        BetRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BetRequest)
                return object;
            var message = new $root.msg.BetRequest();
            if (object.roundID != null)
                message.roundID = object.roundID | 0;
            if (object.info != null) {
                if (typeof object.info !== "object")
                    throw TypeError(".msg.BetRequest.info: object expected");
                message.info = $root.msg.InfoBet.fromObject(object.info);
            }
            return message;
        };

        /**
         * Creates a plain object from a BetRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BetRequest
         * @static
         * @param {msg.BetRequest} message BetRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roundID = 0;
                object.info = null;
            }
            if (message.roundID != null && message.hasOwnProperty("roundID"))
                object.roundID = message.roundID;
            if (message.info != null && message.hasOwnProperty("info"))
                object.info = $root.msg.InfoBet.toObject(message.info, options);
            return object;
        };

        /**
         * Converts this BetRequest to JSON.
         * @function toJSON
         * @memberof msg.BetRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetRequest;
    })();

    msg.BetResponse = (function() {

        /**
         * Properties of a BetResponse.
         * @memberof msg
         * @interface IBetResponse
         * @property {number|Long|null} [serverTime] BetResponse serverTime
         * @property {number|null} [code] BetResponse code
         * @property {number|null} [balance] BetResponse balance
         * @property {number|null} [lockMoney] BetResponse lockMoney
         */

        /**
         * Constructs a new BetResponse.
         * @memberof msg
         * @classdesc Represents a BetResponse.
         * @implements IBetResponse
         * @constructor
         * @param {msg.IBetResponse=} [properties] Properties to set
         */
        function BetResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetResponse serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.BetResponse
         * @instance
         */
        BetResponse.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BetResponse code.
         * @member {number} code
         * @memberof msg.BetResponse
         * @instance
         */
        BetResponse.prototype.code = 0;

        /**
         * BetResponse balance.
         * @member {number} balance
         * @memberof msg.BetResponse
         * @instance
         */
        BetResponse.prototype.balance = 0;

        /**
         * BetResponse lockMoney.
         * @member {number} lockMoney
         * @memberof msg.BetResponse
         * @instance
         */
        BetResponse.prototype.lockMoney = 0;

        /**
         * Creates a new BetResponse instance using the specified properties.
         * @function create
         * @memberof msg.BetResponse
         * @static
         * @param {msg.IBetResponse=} [properties] Properties to set
         * @returns {msg.BetResponse} BetResponse instance
         */
        BetResponse.create = function create(properties) {
            return new BetResponse(properties);
        };

        /**
         * Encodes the specified BetResponse message. Does not implicitly {@link msg.BetResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.BetResponse
         * @static
         * @param {msg.IBetResponse} message BetResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.balance);
            if (message.lockMoney != null && Object.hasOwnProperty.call(message, "lockMoney"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.lockMoney);
            return writer;
        };

        /**
         * Encodes the specified BetResponse message, length delimited. Does not implicitly {@link msg.BetResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BetResponse
         * @static
         * @param {msg.IBetResponse} message BetResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BetResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BetResponse} BetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BetResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.balance = reader.double();
                    break;
                case 4:
                    message.lockMoney = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BetResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BetResponse} BetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetResponse message.
         * @function verify
         * @memberof msg.BetResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (typeof message.balance !== "number")
                    return "balance: number expected";
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                if (typeof message.lockMoney !== "number")
                    return "lockMoney: number expected";
            return null;
        };

        /**
         * Creates a BetResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BetResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BetResponse} BetResponse
         */
        BetResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BetResponse)
                return object;
            var message = new $root.msg.BetResponse();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.balance != null)
                message.balance = Number(object.balance);
            if (object.lockMoney != null)
                message.lockMoney = Number(object.lockMoney);
            return message;
        };

        /**
         * Creates a plain object from a BetResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BetResponse
         * @static
         * @param {msg.BetResponse} message BetResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.balance = 0;
                object.lockMoney = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                object.lockMoney = options.json && !isFinite(message.lockMoney) ? String(message.lockMoney) : message.lockMoney;
            return object;
        };

        /**
         * Converts this BetResponse to JSON.
         * @function toJSON
         * @memberof msg.BetResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetResponse;
    })();

    msg.KeepBetRequest = (function() {

        /**
         * Properties of a KeepBetRequest.
         * @memberof msg
         * @interface IKeepBetRequest
         * @property {number|null} [roundID] KeepBetRequest roundID
         * @property {Array.<msg.IInfoBet>|null} [info] KeepBetRequest info
         */

        /**
         * Constructs a new KeepBetRequest.
         * @memberof msg
         * @classdesc Represents a KeepBetRequest.
         * @implements IKeepBetRequest
         * @constructor
         * @param {msg.IKeepBetRequest=} [properties] Properties to set
         */
        function KeepBetRequest(properties) {
            this.info = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeepBetRequest roundID.
         * @member {number} roundID
         * @memberof msg.KeepBetRequest
         * @instance
         */
        KeepBetRequest.prototype.roundID = 0;

        /**
         * KeepBetRequest info.
         * @member {Array.<msg.IInfoBet>} info
         * @memberof msg.KeepBetRequest
         * @instance
         */
        KeepBetRequest.prototype.info = $util.emptyArray;

        /**
         * Creates a new KeepBetRequest instance using the specified properties.
         * @function create
         * @memberof msg.KeepBetRequest
         * @static
         * @param {msg.IKeepBetRequest=} [properties] Properties to set
         * @returns {msg.KeepBetRequest} KeepBetRequest instance
         */
        KeepBetRequest.create = function create(properties) {
            return new KeepBetRequest(properties);
        };

        /**
         * Encodes the specified KeepBetRequest message. Does not implicitly {@link msg.KeepBetRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.KeepBetRequest
         * @static
         * @param {msg.IKeepBetRequest} message KeepBetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeepBetRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roundID != null && Object.hasOwnProperty.call(message, "roundID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roundID);
            if (message.info != null && message.info.length)
                for (var i = 0; i < message.info.length; ++i)
                    $root.msg.InfoBet.encode(message.info[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified KeepBetRequest message, length delimited. Does not implicitly {@link msg.KeepBetRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.KeepBetRequest
         * @static
         * @param {msg.IKeepBetRequest} message KeepBetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeepBetRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KeepBetRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.KeepBetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.KeepBetRequest} KeepBetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeepBetRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.KeepBetRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roundID = reader.int32();
                    break;
                case 2:
                    if (!(message.info && message.info.length))
                        message.info = [];
                    message.info.push($root.msg.InfoBet.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a KeepBetRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.KeepBetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.KeepBetRequest} KeepBetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeepBetRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KeepBetRequest message.
         * @function verify
         * @memberof msg.KeepBetRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KeepBetRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roundID != null && message.hasOwnProperty("roundID"))
                if (!$util.isInteger(message.roundID))
                    return "roundID: integer expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                if (!Array.isArray(message.info))
                    return "info: array expected";
                for (var i = 0; i < message.info.length; ++i) {
                    var error = $root.msg.InfoBet.verify(message.info[i]);
                    if (error)
                        return "info." + error;
                }
            }
            return null;
        };

        /**
         * Creates a KeepBetRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.KeepBetRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.KeepBetRequest} KeepBetRequest
         */
        KeepBetRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.KeepBetRequest)
                return object;
            var message = new $root.msg.KeepBetRequest();
            if (object.roundID != null)
                message.roundID = object.roundID | 0;
            if (object.info) {
                if (!Array.isArray(object.info))
                    throw TypeError(".msg.KeepBetRequest.info: array expected");
                message.info = [];
                for (var i = 0; i < object.info.length; ++i) {
                    if (typeof object.info[i] !== "object")
                        throw TypeError(".msg.KeepBetRequest.info: object expected");
                    message.info[i] = $root.msg.InfoBet.fromObject(object.info[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a KeepBetRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.KeepBetRequest
         * @static
         * @param {msg.KeepBetRequest} message KeepBetRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeepBetRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.info = [];
            if (options.defaults)
                object.roundID = 0;
            if (message.roundID != null && message.hasOwnProperty("roundID"))
                object.roundID = message.roundID;
            if (message.info && message.info.length) {
                object.info = [];
                for (var j = 0; j < message.info.length; ++j)
                    object.info[j] = $root.msg.InfoBet.toObject(message.info[j], options);
            }
            return object;
        };

        /**
         * Converts this KeepBetRequest to JSON.
         * @function toJSON
         * @memberof msg.KeepBetRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeepBetRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return KeepBetRequest;
    })();

    msg.KeepBetResponse = (function() {

        /**
         * Properties of a KeepBetResponse.
         * @memberof msg
         * @interface IKeepBetResponse
         * @property {number|Long|null} [serverTime] KeepBetResponse serverTime
         * @property {number|null} [code] KeepBetResponse code
         * @property {number|null} [balance] KeepBetResponse balance
         * @property {number|null} [lockMoney] KeepBetResponse lockMoney
         */

        /**
         * Constructs a new KeepBetResponse.
         * @memberof msg
         * @classdesc Represents a KeepBetResponse.
         * @implements IKeepBetResponse
         * @constructor
         * @param {msg.IKeepBetResponse=} [properties] Properties to set
         */
        function KeepBetResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeepBetResponse serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.KeepBetResponse
         * @instance
         */
        KeepBetResponse.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * KeepBetResponse code.
         * @member {number} code
         * @memberof msg.KeepBetResponse
         * @instance
         */
        KeepBetResponse.prototype.code = 0;

        /**
         * KeepBetResponse balance.
         * @member {number} balance
         * @memberof msg.KeepBetResponse
         * @instance
         */
        KeepBetResponse.prototype.balance = 0;

        /**
         * KeepBetResponse lockMoney.
         * @member {number} lockMoney
         * @memberof msg.KeepBetResponse
         * @instance
         */
        KeepBetResponse.prototype.lockMoney = 0;

        /**
         * Creates a new KeepBetResponse instance using the specified properties.
         * @function create
         * @memberof msg.KeepBetResponse
         * @static
         * @param {msg.IKeepBetResponse=} [properties] Properties to set
         * @returns {msg.KeepBetResponse} KeepBetResponse instance
         */
        KeepBetResponse.create = function create(properties) {
            return new KeepBetResponse(properties);
        };

        /**
         * Encodes the specified KeepBetResponse message. Does not implicitly {@link msg.KeepBetResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.KeepBetResponse
         * @static
         * @param {msg.IKeepBetResponse} message KeepBetResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeepBetResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.balance);
            if (message.lockMoney != null && Object.hasOwnProperty.call(message, "lockMoney"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.lockMoney);
            return writer;
        };

        /**
         * Encodes the specified KeepBetResponse message, length delimited. Does not implicitly {@link msg.KeepBetResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.KeepBetResponse
         * @static
         * @param {msg.IKeepBetResponse} message KeepBetResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeepBetResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KeepBetResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.KeepBetResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.KeepBetResponse} KeepBetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeepBetResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.KeepBetResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.balance = reader.double();
                    break;
                case 4:
                    message.lockMoney = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a KeepBetResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.KeepBetResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.KeepBetResponse} KeepBetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeepBetResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KeepBetResponse message.
         * @function verify
         * @memberof msg.KeepBetResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KeepBetResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (typeof message.balance !== "number")
                    return "balance: number expected";
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                if (typeof message.lockMoney !== "number")
                    return "lockMoney: number expected";
            return null;
        };

        /**
         * Creates a KeepBetResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.KeepBetResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.KeepBetResponse} KeepBetResponse
         */
        KeepBetResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.KeepBetResponse)
                return object;
            var message = new $root.msg.KeepBetResponse();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.balance != null)
                message.balance = Number(object.balance);
            if (object.lockMoney != null)
                message.lockMoney = Number(object.lockMoney);
            return message;
        };

        /**
         * Creates a plain object from a KeepBetResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.KeepBetResponse
         * @static
         * @param {msg.KeepBetResponse} message KeepBetResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeepBetResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.balance = 0;
                object.lockMoney = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                object.lockMoney = options.json && !isFinite(message.lockMoney) ? String(message.lockMoney) : message.lockMoney;
            return object;
        };

        /**
         * Converts this KeepBetResponse to JSON.
         * @function toJSON
         * @memberof msg.KeepBetResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeepBetResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return KeepBetResponse;
    })();

    msg.HistoryRequest = (function() {

        /**
         * Properties of a HistoryRequest.
         * @memberof msg
         * @interface IHistoryRequest
         */

        /**
         * Constructs a new HistoryRequest.
         * @memberof msg
         * @classdesc Represents a HistoryRequest.
         * @implements IHistoryRequest
         * @constructor
         * @param {msg.IHistoryRequest=} [properties] Properties to set
         */
        function HistoryRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new HistoryRequest instance using the specified properties.
         * @function create
         * @memberof msg.HistoryRequest
         * @static
         * @param {msg.IHistoryRequest=} [properties] Properties to set
         * @returns {msg.HistoryRequest} HistoryRequest instance
         */
        HistoryRequest.create = function create(properties) {
            return new HistoryRequest(properties);
        };

        /**
         * Encodes the specified HistoryRequest message. Does not implicitly {@link msg.HistoryRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.HistoryRequest
         * @static
         * @param {msg.IHistoryRequest} message HistoryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HistoryRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified HistoryRequest message, length delimited. Does not implicitly {@link msg.HistoryRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.HistoryRequest
         * @static
         * @param {msg.IHistoryRequest} message HistoryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HistoryRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HistoryRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.HistoryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.HistoryRequest} HistoryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HistoryRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.HistoryRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HistoryRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.HistoryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.HistoryRequest} HistoryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HistoryRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HistoryRequest message.
         * @function verify
         * @memberof msg.HistoryRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HistoryRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a HistoryRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.HistoryRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.HistoryRequest} HistoryRequest
         */
        HistoryRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.HistoryRequest)
                return object;
            return new $root.msg.HistoryRequest();
        };

        /**
         * Creates a plain object from a HistoryRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.HistoryRequest
         * @static
         * @param {msg.HistoryRequest} message HistoryRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HistoryRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this HistoryRequest to JSON.
         * @function toJSON
         * @memberof msg.HistoryRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HistoryRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HistoryRequest;
    })();

    msg.HistoryResponse = (function() {

        /**
         * Properties of a HistoryResponse.
         * @memberof msg
         * @interface IHistoryResponse
         * @property {number|Long|null} [serverTime] HistoryResponse serverTime
         * @property {number|null} [code] HistoryResponse code
         * @property {Array.<msg.HistoryResponse.IH>|null} [list] HistoryResponse list
         */

        /**
         * Constructs a new HistoryResponse.
         * @memberof msg
         * @classdesc Represents a HistoryResponse.
         * @implements IHistoryResponse
         * @constructor
         * @param {msg.IHistoryResponse=} [properties] Properties to set
         */
        function HistoryResponse(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HistoryResponse serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.HistoryResponse
         * @instance
         */
        HistoryResponse.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * HistoryResponse code.
         * @member {number} code
         * @memberof msg.HistoryResponse
         * @instance
         */
        HistoryResponse.prototype.code = 0;

        /**
         * HistoryResponse list.
         * @member {Array.<msg.HistoryResponse.IH>} list
         * @memberof msg.HistoryResponse
         * @instance
         */
        HistoryResponse.prototype.list = $util.emptyArray;

        /**
         * Creates a new HistoryResponse instance using the specified properties.
         * @function create
         * @memberof msg.HistoryResponse
         * @static
         * @param {msg.IHistoryResponse=} [properties] Properties to set
         * @returns {msg.HistoryResponse} HistoryResponse instance
         */
        HistoryResponse.create = function create(properties) {
            return new HistoryResponse(properties);
        };

        /**
         * Encodes the specified HistoryResponse message. Does not implicitly {@link msg.HistoryResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.HistoryResponse
         * @static
         * @param {msg.IHistoryResponse} message HistoryResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HistoryResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.msg.HistoryResponse.H.encode(message.list[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified HistoryResponse message, length delimited. Does not implicitly {@link msg.HistoryResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.HistoryResponse
         * @static
         * @param {msg.IHistoryResponse} message HistoryResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HistoryResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HistoryResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.HistoryResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.HistoryResponse} HistoryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HistoryResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.HistoryResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.msg.HistoryResponse.H.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HistoryResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.HistoryResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.HistoryResponse} HistoryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HistoryResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HistoryResponse message.
         * @function verify
         * @memberof msg.HistoryResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HistoryResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.msg.HistoryResponse.H.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a HistoryResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.HistoryResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.HistoryResponse} HistoryResponse
         */
        HistoryResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.HistoryResponse)
                return object;
            var message = new $root.msg.HistoryResponse();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".msg.HistoryResponse.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".msg.HistoryResponse.list: object expected");
                    message.list[i] = $root.msg.HistoryResponse.H.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a HistoryResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.HistoryResponse
         * @static
         * @param {msg.HistoryResponse} message HistoryResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HistoryResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.msg.HistoryResponse.H.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this HistoryResponse to JSON.
         * @function toJSON
         * @memberof msg.HistoryResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HistoryResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        HistoryResponse.H = (function() {

            /**
             * Properties of a H.
             * @memberof msg.HistoryResponse
             * @interface IH
             * @property {string|null} [issueID] H issueID
             * @property {string|null} [luckyNum] H luckyNum
             */

            /**
             * Constructs a new H.
             * @memberof msg.HistoryResponse
             * @classdesc Represents a H.
             * @implements IH
             * @constructor
             * @param {msg.HistoryResponse.IH=} [properties] Properties to set
             */
            function H(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * H issueID.
             * @member {string} issueID
             * @memberof msg.HistoryResponse.H
             * @instance
             */
            H.prototype.issueID = "";

            /**
             * H luckyNum.
             * @member {string} luckyNum
             * @memberof msg.HistoryResponse.H
             * @instance
             */
            H.prototype.luckyNum = "";

            /**
             * Creates a new H instance using the specified properties.
             * @function create
             * @memberof msg.HistoryResponse.H
             * @static
             * @param {msg.HistoryResponse.IH=} [properties] Properties to set
             * @returns {msg.HistoryResponse.H} H instance
             */
            H.create = function create(properties) {
                return new H(properties);
            };

            /**
             * Encodes the specified H message. Does not implicitly {@link msg.HistoryResponse.H.verify|verify} messages.
             * @function encode
             * @memberof msg.HistoryResponse.H
             * @static
             * @param {msg.HistoryResponse.IH} message H message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            H.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.issueID != null && Object.hasOwnProperty.call(message, "issueID"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.issueID);
                if (message.luckyNum != null && Object.hasOwnProperty.call(message, "luckyNum"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.luckyNum);
                return writer;
            };

            /**
             * Encodes the specified H message, length delimited. Does not implicitly {@link msg.HistoryResponse.H.verify|verify} messages.
             * @function encodeDelimited
             * @memberof msg.HistoryResponse.H
             * @static
             * @param {msg.HistoryResponse.IH} message H message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            H.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a H message from the specified reader or buffer.
             * @function decode
             * @memberof msg.HistoryResponse.H
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {msg.HistoryResponse.H} H
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            H.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.HistoryResponse.H();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.issueID = reader.string();
                        break;
                    case 2:
                        message.luckyNum = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a H message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof msg.HistoryResponse.H
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {msg.HistoryResponse.H} H
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            H.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a H message.
             * @function verify
             * @memberof msg.HistoryResponse.H
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            H.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.issueID != null && message.hasOwnProperty("issueID"))
                    if (!$util.isString(message.issueID))
                        return "issueID: string expected";
                if (message.luckyNum != null && message.hasOwnProperty("luckyNum"))
                    if (!$util.isString(message.luckyNum))
                        return "luckyNum: string expected";
                return null;
            };

            /**
             * Creates a H message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof msg.HistoryResponse.H
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {msg.HistoryResponse.H} H
             */
            H.fromObject = function fromObject(object) {
                if (object instanceof $root.msg.HistoryResponse.H)
                    return object;
                var message = new $root.msg.HistoryResponse.H();
                if (object.issueID != null)
                    message.issueID = String(object.issueID);
                if (object.luckyNum != null)
                    message.luckyNum = String(object.luckyNum);
                return message;
            };

            /**
             * Creates a plain object from a H message. Also converts values to other types if specified.
             * @function toObject
             * @memberof msg.HistoryResponse.H
             * @static
             * @param {msg.HistoryResponse.H} message H
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            H.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.issueID = "";
                    object.luckyNum = "";
                }
                if (message.issueID != null && message.hasOwnProperty("issueID"))
                    object.issueID = message.issueID;
                if (message.luckyNum != null && message.hasOwnProperty("luckyNum"))
                    object.luckyNum = message.luckyNum;
                return object;
            };

            /**
             * Converts this H to JSON.
             * @function toJSON
             * @memberof msg.HistoryResponse.H
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            H.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return H;
        })();

        return HistoryResponse;
    })();

    msg.RoomRedLimitRequest = (function() {

        /**
         * Properties of a RoomRedLimitRequest.
         * @memberof msg
         * @interface IRoomRedLimitRequest
         * @property {string|null} [roomNumber] RoomRedLimitRequest roomNumber
         */

        /**
         * Constructs a new RoomRedLimitRequest.
         * @memberof msg
         * @classdesc Represents a RoomRedLimitRequest.
         * @implements IRoomRedLimitRequest
         * @constructor
         * @param {msg.IRoomRedLimitRequest=} [properties] Properties to set
         */
        function RoomRedLimitRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomRedLimitRequest roomNumber.
         * @member {string} roomNumber
         * @memberof msg.RoomRedLimitRequest
         * @instance
         */
        RoomRedLimitRequest.prototype.roomNumber = "";

        /**
         * Creates a new RoomRedLimitRequest instance using the specified properties.
         * @function create
         * @memberof msg.RoomRedLimitRequest
         * @static
         * @param {msg.IRoomRedLimitRequest=} [properties] Properties to set
         * @returns {msg.RoomRedLimitRequest} RoomRedLimitRequest instance
         */
        RoomRedLimitRequest.create = function create(properties) {
            return new RoomRedLimitRequest(properties);
        };

        /**
         * Encodes the specified RoomRedLimitRequest message. Does not implicitly {@link msg.RoomRedLimitRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomRedLimitRequest
         * @static
         * @param {msg.IRoomRedLimitRequest} message RoomRedLimitRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomRedLimitRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomNumber != null && Object.hasOwnProperty.call(message, "roomNumber"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomNumber);
            return writer;
        };

        /**
         * Encodes the specified RoomRedLimitRequest message, length delimited. Does not implicitly {@link msg.RoomRedLimitRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomRedLimitRequest
         * @static
         * @param {msg.IRoomRedLimitRequest} message RoomRedLimitRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomRedLimitRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomRedLimitRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomRedLimitRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomRedLimitRequest} RoomRedLimitRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomRedLimitRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomRedLimitRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomNumber = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomRedLimitRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomRedLimitRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomRedLimitRequest} RoomRedLimitRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomRedLimitRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomRedLimitRequest message.
         * @function verify
         * @memberof msg.RoomRedLimitRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomRedLimitRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                if (!$util.isString(message.roomNumber))
                    return "roomNumber: string expected";
            return null;
        };

        /**
         * Creates a RoomRedLimitRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomRedLimitRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomRedLimitRequest} RoomRedLimitRequest
         */
        RoomRedLimitRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomRedLimitRequest)
                return object;
            var message = new $root.msg.RoomRedLimitRequest();
            if (object.roomNumber != null)
                message.roomNumber = String(object.roomNumber);
            return message;
        };

        /**
         * Creates a plain object from a RoomRedLimitRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomRedLimitRequest
         * @static
         * @param {msg.RoomRedLimitRequest} message RoomRedLimitRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomRedLimitRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.roomNumber = "";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                object.roomNumber = message.roomNumber;
            return object;
        };

        /**
         * Converts this RoomRedLimitRequest to JSON.
         * @function toJSON
         * @memberof msg.RoomRedLimitRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomRedLimitRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomRedLimitRequest;
    })();

    msg.RoomRedLimitResponse = (function() {

        /**
         * Properties of a RoomRedLimitResponse.
         * @memberof msg
         * @interface IRoomRedLimitResponse
         * @property {number|null} [code] RoomRedLimitResponse code
         * @property {string|null} [roomNumber] RoomRedLimitResponse roomNumber
         * @property {number|null} [minBet] RoomRedLimitResponse minBet
         * @property {number|null} [maxBet] RoomRedLimitResponse maxBet
         */

        /**
         * Constructs a new RoomRedLimitResponse.
         * @memberof msg
         * @classdesc Represents a RoomRedLimitResponse.
         * @implements IRoomRedLimitResponse
         * @constructor
         * @param {msg.IRoomRedLimitResponse=} [properties] Properties to set
         */
        function RoomRedLimitResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomRedLimitResponse code.
         * @member {number} code
         * @memberof msg.RoomRedLimitResponse
         * @instance
         */
        RoomRedLimitResponse.prototype.code = 0;

        /**
         * RoomRedLimitResponse roomNumber.
         * @member {string} roomNumber
         * @memberof msg.RoomRedLimitResponse
         * @instance
         */
        RoomRedLimitResponse.prototype.roomNumber = "";

        /**
         * RoomRedLimitResponse minBet.
         * @member {number} minBet
         * @memberof msg.RoomRedLimitResponse
         * @instance
         */
        RoomRedLimitResponse.prototype.minBet = 0;

        /**
         * RoomRedLimitResponse maxBet.
         * @member {number} maxBet
         * @memberof msg.RoomRedLimitResponse
         * @instance
         */
        RoomRedLimitResponse.prototype.maxBet = 0;

        /**
         * Creates a new RoomRedLimitResponse instance using the specified properties.
         * @function create
         * @memberof msg.RoomRedLimitResponse
         * @static
         * @param {msg.IRoomRedLimitResponse=} [properties] Properties to set
         * @returns {msg.RoomRedLimitResponse} RoomRedLimitResponse instance
         */
        RoomRedLimitResponse.create = function create(properties) {
            return new RoomRedLimitResponse(properties);
        };

        /**
         * Encodes the specified RoomRedLimitResponse message. Does not implicitly {@link msg.RoomRedLimitResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomRedLimitResponse
         * @static
         * @param {msg.IRoomRedLimitResponse} message RoomRedLimitResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomRedLimitResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.roomNumber != null && Object.hasOwnProperty.call(message, "roomNumber"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomNumber);
            if (message.minBet != null && Object.hasOwnProperty.call(message, "minBet"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.minBet);
            if (message.maxBet != null && Object.hasOwnProperty.call(message, "maxBet"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.maxBet);
            return writer;
        };

        /**
         * Encodes the specified RoomRedLimitResponse message, length delimited. Does not implicitly {@link msg.RoomRedLimitResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomRedLimitResponse
         * @static
         * @param {msg.IRoomRedLimitResponse} message RoomRedLimitResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomRedLimitResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomRedLimitResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomRedLimitResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomRedLimitResponse} RoomRedLimitResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomRedLimitResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomRedLimitResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.roomNumber = reader.string();
                    break;
                case 3:
                    message.minBet = reader.double();
                    break;
                case 4:
                    message.maxBet = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomRedLimitResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomRedLimitResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomRedLimitResponse} RoomRedLimitResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomRedLimitResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomRedLimitResponse message.
         * @function verify
         * @memberof msg.RoomRedLimitResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomRedLimitResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                if (!$util.isString(message.roomNumber))
                    return "roomNumber: string expected";
            if (message.minBet != null && message.hasOwnProperty("minBet"))
                if (typeof message.minBet !== "number")
                    return "minBet: number expected";
            if (message.maxBet != null && message.hasOwnProperty("maxBet"))
                if (typeof message.maxBet !== "number")
                    return "maxBet: number expected";
            return null;
        };

        /**
         * Creates a RoomRedLimitResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomRedLimitResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomRedLimitResponse} RoomRedLimitResponse
         */
        RoomRedLimitResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomRedLimitResponse)
                return object;
            var message = new $root.msg.RoomRedLimitResponse();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.roomNumber != null)
                message.roomNumber = String(object.roomNumber);
            if (object.minBet != null)
                message.minBet = Number(object.minBet);
            if (object.maxBet != null)
                message.maxBet = Number(object.maxBet);
            return message;
        };

        /**
         * Creates a plain object from a RoomRedLimitResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomRedLimitResponse
         * @static
         * @param {msg.RoomRedLimitResponse} message RoomRedLimitResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomRedLimitResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.roomNumber = "";
                object.minBet = 0;
                object.maxBet = 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                object.roomNumber = message.roomNumber;
            if (message.minBet != null && message.hasOwnProperty("minBet"))
                object.minBet = options.json && !isFinite(message.minBet) ? String(message.minBet) : message.minBet;
            if (message.maxBet != null && message.hasOwnProperty("maxBet"))
                object.maxBet = options.json && !isFinite(message.maxBet) ? String(message.maxBet) : message.maxBet;
            return object;
        };

        /**
         * Converts this RoomRedLimitResponse to JSON.
         * @function toJSON
         * @memberof msg.RoomRedLimitResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomRedLimitResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomRedLimitResponse;
    })();

    msg.RoundPlayInfoPush = (function() {

        /**
         * Properties of a RoundPlayInfoPush.
         * @memberof msg
         * @interface IRoundPlayInfoPush
         * @property {number|Long|null} [serverTime] RoundPlayInfoPush serverTime
         * @property {number|null} [code] RoundPlayInfoPush code
         * @property {Array.<msg.IInfoBet>|null} [infoBetAll] RoundPlayInfoPush infoBetAll
         * @property {Array.<msg.RoundPlayInfoPush.IUserOnDesk>|null} [usersOnDesk] RoundPlayInfoPush usersOnDesk
         * @property {string|null} [roomNumber] RoundPlayInfoPush roomNumber
         * @property {number|null} [roundID] RoundPlayInfoPush roundID
         * @property {number|null} [startTime] RoundPlayInfoPush startTime
         * @property {Array.<msg.IInfoBet>|null} [infoBetMe] RoundPlayInfoPush infoBetMe
         * @property {string|null} [luckyNum] RoundPlayInfoPush luckyNum
         * @property {string|null} [luckyNumLastRound] RoundPlayInfoPush luckyNumLastRound
         */

        /**
         * Constructs a new RoundPlayInfoPush.
         * @memberof msg
         * @classdesc Represents a RoundPlayInfoPush.
         * @implements IRoundPlayInfoPush
         * @constructor
         * @param {msg.IRoundPlayInfoPush=} [properties] Properties to set
         */
        function RoundPlayInfoPush(properties) {
            this.infoBetAll = [];
            this.usersOnDesk = [];
            this.infoBetMe = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoundPlayInfoPush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RoundPlayInfoPush code.
         * @member {number} code
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.code = 0;

        /**
         * RoundPlayInfoPush infoBetAll.
         * @member {Array.<msg.IInfoBet>} infoBetAll
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.infoBetAll = $util.emptyArray;

        /**
         * RoundPlayInfoPush usersOnDesk.
         * @member {Array.<msg.RoundPlayInfoPush.IUserOnDesk>} usersOnDesk
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.usersOnDesk = $util.emptyArray;

        /**
         * RoundPlayInfoPush roomNumber.
         * @member {string} roomNumber
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.roomNumber = "";

        /**
         * RoundPlayInfoPush roundID.
         * @member {number} roundID
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.roundID = 0;

        /**
         * RoundPlayInfoPush startTime.
         * @member {number} startTime
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.startTime = 0;

        /**
         * RoundPlayInfoPush infoBetMe.
         * @member {Array.<msg.IInfoBet>} infoBetMe
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.infoBetMe = $util.emptyArray;

        /**
         * RoundPlayInfoPush luckyNum.
         * @member {string} luckyNum
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.luckyNum = "";

        /**
         * RoundPlayInfoPush luckyNumLastRound.
         * @member {string} luckyNumLastRound
         * @memberof msg.RoundPlayInfoPush
         * @instance
         */
        RoundPlayInfoPush.prototype.luckyNumLastRound = "";

        /**
         * Creates a new RoundPlayInfoPush instance using the specified properties.
         * @function create
         * @memberof msg.RoundPlayInfoPush
         * @static
         * @param {msg.IRoundPlayInfoPush=} [properties] Properties to set
         * @returns {msg.RoundPlayInfoPush} RoundPlayInfoPush instance
         */
        RoundPlayInfoPush.create = function create(properties) {
            return new RoundPlayInfoPush(properties);
        };

        /**
         * Encodes the specified RoundPlayInfoPush message. Does not implicitly {@link msg.RoundPlayInfoPush.verify|verify} messages.
         * @function encode
         * @memberof msg.RoundPlayInfoPush
         * @static
         * @param {msg.IRoundPlayInfoPush} message RoundPlayInfoPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoundPlayInfoPush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.infoBetAll != null && message.infoBetAll.length)
                for (var i = 0; i < message.infoBetAll.length; ++i)
                    $root.msg.InfoBet.encode(message.infoBetAll[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.usersOnDesk != null && message.usersOnDesk.length)
                for (var i = 0; i < message.usersOnDesk.length; ++i)
                    $root.msg.RoundPlayInfoPush.UserOnDesk.encode(message.usersOnDesk[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.luckyNumLastRound != null && Object.hasOwnProperty.call(message, "luckyNumLastRound"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.luckyNumLastRound);
            if (message.roomNumber != null && Object.hasOwnProperty.call(message, "roomNumber"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.roomNumber);
            if (message.roundID != null && Object.hasOwnProperty.call(message, "roundID"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.roundID);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.startTime);
            if (message.infoBetMe != null && message.infoBetMe.length)
                for (var i = 0; i < message.infoBetMe.length; ++i)
                    $root.msg.InfoBet.encode(message.infoBetMe[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.luckyNum != null && Object.hasOwnProperty.call(message, "luckyNum"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.luckyNum);
            return writer;
        };

        /**
         * Encodes the specified RoundPlayInfoPush message, length delimited. Does not implicitly {@link msg.RoundPlayInfoPush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoundPlayInfoPush
         * @static
         * @param {msg.IRoundPlayInfoPush} message RoundPlayInfoPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoundPlayInfoPush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoundPlayInfoPush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoundPlayInfoPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoundPlayInfoPush} RoundPlayInfoPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoundPlayInfoPush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoundPlayInfoPush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    if (!(message.infoBetAll && message.infoBetAll.length))
                        message.infoBetAll = [];
                    message.infoBetAll.push($root.msg.InfoBet.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.usersOnDesk && message.usersOnDesk.length))
                        message.usersOnDesk = [];
                    message.usersOnDesk.push($root.msg.RoundPlayInfoPush.UserOnDesk.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.roomNumber = reader.string();
                    break;
                case 7:
                    message.roundID = reader.int32();
                    break;
                case 8:
                    message.startTime = reader.int32();
                    break;
                case 9:
                    if (!(message.infoBetMe && message.infoBetMe.length))
                        message.infoBetMe = [];
                    message.infoBetMe.push($root.msg.InfoBet.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.luckyNum = reader.string();
                    break;
                case 5:
                    message.luckyNumLastRound = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoundPlayInfoPush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoundPlayInfoPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoundPlayInfoPush} RoundPlayInfoPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoundPlayInfoPush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoundPlayInfoPush message.
         * @function verify
         * @memberof msg.RoundPlayInfoPush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoundPlayInfoPush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.infoBetAll != null && message.hasOwnProperty("infoBetAll")) {
                if (!Array.isArray(message.infoBetAll))
                    return "infoBetAll: array expected";
                for (var i = 0; i < message.infoBetAll.length; ++i) {
                    var error = $root.msg.InfoBet.verify(message.infoBetAll[i]);
                    if (error)
                        return "infoBetAll." + error;
                }
            }
            if (message.usersOnDesk != null && message.hasOwnProperty("usersOnDesk")) {
                if (!Array.isArray(message.usersOnDesk))
                    return "usersOnDesk: array expected";
                for (var i = 0; i < message.usersOnDesk.length; ++i) {
                    var error = $root.msg.RoundPlayInfoPush.UserOnDesk.verify(message.usersOnDesk[i]);
                    if (error)
                        return "usersOnDesk." + error;
                }
            }
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                if (!$util.isString(message.roomNumber))
                    return "roomNumber: string expected";
            if (message.roundID != null && message.hasOwnProperty("roundID"))
                if (!$util.isInteger(message.roundID))
                    return "roundID: integer expected";
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime))
                    return "startTime: integer expected";
            if (message.infoBetMe != null && message.hasOwnProperty("infoBetMe")) {
                if (!Array.isArray(message.infoBetMe))
                    return "infoBetMe: array expected";
                for (var i = 0; i < message.infoBetMe.length; ++i) {
                    var error = $root.msg.InfoBet.verify(message.infoBetMe[i]);
                    if (error)
                        return "infoBetMe." + error;
                }
            }
            if (message.luckyNum != null && message.hasOwnProperty("luckyNum"))
                if (!$util.isString(message.luckyNum))
                    return "luckyNum: string expected";
            if (message.luckyNumLastRound != null && message.hasOwnProperty("luckyNumLastRound"))
                if (!$util.isString(message.luckyNumLastRound))
                    return "luckyNumLastRound: string expected";
            return null;
        };

        /**
         * Creates a RoundPlayInfoPush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoundPlayInfoPush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoundPlayInfoPush} RoundPlayInfoPush
         */
        RoundPlayInfoPush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoundPlayInfoPush)
                return object;
            var message = new $root.msg.RoundPlayInfoPush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.infoBetAll) {
                if (!Array.isArray(object.infoBetAll))
                    throw TypeError(".msg.RoundPlayInfoPush.infoBetAll: array expected");
                message.infoBetAll = [];
                for (var i = 0; i < object.infoBetAll.length; ++i) {
                    if (typeof object.infoBetAll[i] !== "object")
                        throw TypeError(".msg.RoundPlayInfoPush.infoBetAll: object expected");
                    message.infoBetAll[i] = $root.msg.InfoBet.fromObject(object.infoBetAll[i]);
                }
            }
            if (object.usersOnDesk) {
                if (!Array.isArray(object.usersOnDesk))
                    throw TypeError(".msg.RoundPlayInfoPush.usersOnDesk: array expected");
                message.usersOnDesk = [];
                for (var i = 0; i < object.usersOnDesk.length; ++i) {
                    if (typeof object.usersOnDesk[i] !== "object")
                        throw TypeError(".msg.RoundPlayInfoPush.usersOnDesk: object expected");
                    message.usersOnDesk[i] = $root.msg.RoundPlayInfoPush.UserOnDesk.fromObject(object.usersOnDesk[i]);
                }
            }
            if (object.roomNumber != null)
                message.roomNumber = String(object.roomNumber);
            if (object.roundID != null)
                message.roundID = object.roundID | 0;
            if (object.startTime != null)
                message.startTime = object.startTime | 0;
            if (object.infoBetMe) {
                if (!Array.isArray(object.infoBetMe))
                    throw TypeError(".msg.RoundPlayInfoPush.infoBetMe: array expected");
                message.infoBetMe = [];
                for (var i = 0; i < object.infoBetMe.length; ++i) {
                    if (typeof object.infoBetMe[i] !== "object")
                        throw TypeError(".msg.RoundPlayInfoPush.infoBetMe: object expected");
                    message.infoBetMe[i] = $root.msg.InfoBet.fromObject(object.infoBetMe[i]);
                }
            }
            if (object.luckyNum != null)
                message.luckyNum = String(object.luckyNum);
            if (object.luckyNumLastRound != null)
                message.luckyNumLastRound = String(object.luckyNumLastRound);
            return message;
        };

        /**
         * Creates a plain object from a RoundPlayInfoPush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoundPlayInfoPush
         * @static
         * @param {msg.RoundPlayInfoPush} message RoundPlayInfoPush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoundPlayInfoPush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.infoBetAll = [];
                object.usersOnDesk = [];
                object.infoBetMe = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.luckyNumLastRound = "";
                object.roomNumber = "";
                object.roundID = 0;
                object.startTime = 0;
                object.luckyNum = "";
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.infoBetAll && message.infoBetAll.length) {
                object.infoBetAll = [];
                for (var j = 0; j < message.infoBetAll.length; ++j)
                    object.infoBetAll[j] = $root.msg.InfoBet.toObject(message.infoBetAll[j], options);
            }
            if (message.usersOnDesk && message.usersOnDesk.length) {
                object.usersOnDesk = [];
                for (var j = 0; j < message.usersOnDesk.length; ++j)
                    object.usersOnDesk[j] = $root.msg.RoundPlayInfoPush.UserOnDesk.toObject(message.usersOnDesk[j], options);
            }
            if (message.luckyNumLastRound != null && message.hasOwnProperty("luckyNumLastRound"))
                object.luckyNumLastRound = message.luckyNumLastRound;
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                object.roomNumber = message.roomNumber;
            if (message.roundID != null && message.hasOwnProperty("roundID"))
                object.roundID = message.roundID;
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                object.startTime = message.startTime;
            if (message.infoBetMe && message.infoBetMe.length) {
                object.infoBetMe = [];
                for (var j = 0; j < message.infoBetMe.length; ++j)
                    object.infoBetMe[j] = $root.msg.InfoBet.toObject(message.infoBetMe[j], options);
            }
            if (message.luckyNum != null && message.hasOwnProperty("luckyNum"))
                object.luckyNum = message.luckyNum;
            return object;
        };

        /**
         * Converts this RoundPlayInfoPush to JSON.
         * @function toJSON
         * @memberof msg.RoundPlayInfoPush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoundPlayInfoPush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        RoundPlayInfoPush.UserOnDesk = (function() {

            /**
             * Properties of a UserOnDesk.
             * @memberof msg.RoundPlayInfoPush
             * @interface IUserOnDesk
             * @property {number|null} [userID] UserOnDesk userID
             * @property {string|null} [headUrl] UserOnDesk headUrl
             * @property {number|null} [balance] UserOnDesk balance
             * @property {number|null} [lockMoney] UserOnDesk lockMoney
             * @property {string|null} [userName] UserOnDesk userName
             */

            /**
             * Constructs a new UserOnDesk.
             * @memberof msg.RoundPlayInfoPush
             * @classdesc Represents a UserOnDesk.
             * @implements IUserOnDesk
             * @constructor
             * @param {msg.RoundPlayInfoPush.IUserOnDesk=} [properties] Properties to set
             */
            function UserOnDesk(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UserOnDesk userID.
             * @member {number} userID
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @instance
             */
            UserOnDesk.prototype.userID = 0;

            /**
             * UserOnDesk headUrl.
             * @member {string} headUrl
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @instance
             */
            UserOnDesk.prototype.headUrl = "";

            /**
             * UserOnDesk balance.
             * @member {number} balance
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @instance
             */
            UserOnDesk.prototype.balance = 0;

            /**
             * UserOnDesk lockMoney.
             * @member {number} lockMoney
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @instance
             */
            UserOnDesk.prototype.lockMoney = 0;

            /**
             * UserOnDesk userName.
             * @member {string} userName
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @instance
             */
            UserOnDesk.prototype.userName = "";

            /**
             * Creates a new UserOnDesk instance using the specified properties.
             * @function create
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @static
             * @param {msg.RoundPlayInfoPush.IUserOnDesk=} [properties] Properties to set
             * @returns {msg.RoundPlayInfoPush.UserOnDesk} UserOnDesk instance
             */
            UserOnDesk.create = function create(properties) {
                return new UserOnDesk(properties);
            };

            /**
             * Encodes the specified UserOnDesk message. Does not implicitly {@link msg.RoundPlayInfoPush.UserOnDesk.verify|verify} messages.
             * @function encode
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @static
             * @param {msg.RoundPlayInfoPush.IUserOnDesk} message UserOnDesk message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserOnDesk.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userID);
                if (message.headUrl != null && Object.hasOwnProperty.call(message, "headUrl"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.headUrl);
                if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.balance);
                if (message.lockMoney != null && Object.hasOwnProperty.call(message, "lockMoney"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.lockMoney);
                if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.userName);
                return writer;
            };

            /**
             * Encodes the specified UserOnDesk message, length delimited. Does not implicitly {@link msg.RoundPlayInfoPush.UserOnDesk.verify|verify} messages.
             * @function encodeDelimited
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @static
             * @param {msg.RoundPlayInfoPush.IUserOnDesk} message UserOnDesk message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserOnDesk.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UserOnDesk message from the specified reader or buffer.
             * @function decode
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {msg.RoundPlayInfoPush.UserOnDesk} UserOnDesk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserOnDesk.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoundPlayInfoPush.UserOnDesk();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.userID = reader.int32();
                        break;
                    case 2:
                        message.headUrl = reader.string();
                        break;
                    case 3:
                        message.balance = reader.double();
                        break;
                    case 4:
                        message.lockMoney = reader.double();
                        break;
                    case 5:
                        message.userName = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a UserOnDesk message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {msg.RoundPlayInfoPush.UserOnDesk} UserOnDesk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserOnDesk.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a UserOnDesk message.
             * @function verify
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserOnDesk.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userID != null && message.hasOwnProperty("userID"))
                    if (!$util.isInteger(message.userID))
                        return "userID: integer expected";
                if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                    if (!$util.isString(message.headUrl))
                        return "headUrl: string expected";
                if (message.balance != null && message.hasOwnProperty("balance"))
                    if (typeof message.balance !== "number")
                        return "balance: number expected";
                if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                    if (typeof message.lockMoney !== "number")
                        return "lockMoney: number expected";
                if (message.userName != null && message.hasOwnProperty("userName"))
                    if (!$util.isString(message.userName))
                        return "userName: string expected";
                return null;
            };

            /**
             * Creates a UserOnDesk message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {msg.RoundPlayInfoPush.UserOnDesk} UserOnDesk
             */
            UserOnDesk.fromObject = function fromObject(object) {
                if (object instanceof $root.msg.RoundPlayInfoPush.UserOnDesk)
                    return object;
                var message = new $root.msg.RoundPlayInfoPush.UserOnDesk();
                if (object.userID != null)
                    message.userID = object.userID | 0;
                if (object.headUrl != null)
                    message.headUrl = String(object.headUrl);
                if (object.balance != null)
                    message.balance = Number(object.balance);
                if (object.lockMoney != null)
                    message.lockMoney = Number(object.lockMoney);
                if (object.userName != null)
                    message.userName = String(object.userName);
                return message;
            };

            /**
             * Creates a plain object from a UserOnDesk message. Also converts values to other types if specified.
             * @function toObject
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @static
             * @param {msg.RoundPlayInfoPush.UserOnDesk} message UserOnDesk
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserOnDesk.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.userID = 0;
                    object.headUrl = "";
                    object.balance = 0;
                    object.lockMoney = 0;
                    object.userName = "";
                }
                if (message.userID != null && message.hasOwnProperty("userID"))
                    object.userID = message.userID;
                if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                    object.headUrl = message.headUrl;
                if (message.balance != null && message.hasOwnProperty("balance"))
                    object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
                if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                    object.lockMoney = options.json && !isFinite(message.lockMoney) ? String(message.lockMoney) : message.lockMoney;
                if (message.userName != null && message.hasOwnProperty("userName"))
                    object.userName = message.userName;
                return object;
            };

            /**
             * Converts this UserOnDesk to JSON.
             * @function toJSON
             * @memberof msg.RoundPlayInfoPush.UserOnDesk
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserOnDesk.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UserOnDesk;
        })();

        return RoundPlayInfoPush;
    })();

    msg.RoomListLobbyPush = (function() {

        /**
         * Properties of a RoomListLobbyPush.
         * @memberof msg
         * @interface IRoomListLobbyPush
         * @property {number|Long|null} [serverTime] RoomListLobbyPush serverTime
         * @property {number|null} [code] RoomListLobbyPush code
         * @property {Array.<msg.RoomListLobbyPush.IOneRoom>|null} [rooms] RoomListLobbyPush rooms
         */

        /**
         * Constructs a new RoomListLobbyPush.
         * @memberof msg
         * @classdesc Represents a RoomListLobbyPush.
         * @implements IRoomListLobbyPush
         * @constructor
         * @param {msg.IRoomListLobbyPush=} [properties] Properties to set
         */
        function RoomListLobbyPush(properties) {
            this.rooms = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomListLobbyPush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.RoomListLobbyPush
         * @instance
         */
        RoomListLobbyPush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RoomListLobbyPush code.
         * @member {number} code
         * @memberof msg.RoomListLobbyPush
         * @instance
         */
        RoomListLobbyPush.prototype.code = 0;

        /**
         * RoomListLobbyPush rooms.
         * @member {Array.<msg.RoomListLobbyPush.IOneRoom>} rooms
         * @memberof msg.RoomListLobbyPush
         * @instance
         */
        RoomListLobbyPush.prototype.rooms = $util.emptyArray;

        /**
         * Creates a new RoomListLobbyPush instance using the specified properties.
         * @function create
         * @memberof msg.RoomListLobbyPush
         * @static
         * @param {msg.IRoomListLobbyPush=} [properties] Properties to set
         * @returns {msg.RoomListLobbyPush} RoomListLobbyPush instance
         */
        RoomListLobbyPush.create = function create(properties) {
            return new RoomListLobbyPush(properties);
        };

        /**
         * Encodes the specified RoomListLobbyPush message. Does not implicitly {@link msg.RoomListLobbyPush.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomListLobbyPush
         * @static
         * @param {msg.IRoomListLobbyPush} message RoomListLobbyPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomListLobbyPush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.rooms != null && message.rooms.length)
                for (var i = 0; i < message.rooms.length; ++i)
                    $root.msg.RoomListLobbyPush.OneRoom.encode(message.rooms[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RoomListLobbyPush message, length delimited. Does not implicitly {@link msg.RoomListLobbyPush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomListLobbyPush
         * @static
         * @param {msg.IRoomListLobbyPush} message RoomListLobbyPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomListLobbyPush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomListLobbyPush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomListLobbyPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomListLobbyPush} RoomListLobbyPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomListLobbyPush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomListLobbyPush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    if (!(message.rooms && message.rooms.length))
                        message.rooms = [];
                    message.rooms.push($root.msg.RoomListLobbyPush.OneRoom.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomListLobbyPush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomListLobbyPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomListLobbyPush} RoomListLobbyPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomListLobbyPush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomListLobbyPush message.
         * @function verify
         * @memberof msg.RoomListLobbyPush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomListLobbyPush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.rooms != null && message.hasOwnProperty("rooms")) {
                if (!Array.isArray(message.rooms))
                    return "rooms: array expected";
                for (var i = 0; i < message.rooms.length; ++i) {
                    var error = $root.msg.RoomListLobbyPush.OneRoom.verify(message.rooms[i]);
                    if (error)
                        return "rooms." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RoomListLobbyPush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomListLobbyPush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomListLobbyPush} RoomListLobbyPush
         */
        RoomListLobbyPush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomListLobbyPush)
                return object;
            var message = new $root.msg.RoomListLobbyPush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.rooms) {
                if (!Array.isArray(object.rooms))
                    throw TypeError(".msg.RoomListLobbyPush.rooms: array expected");
                message.rooms = [];
                for (var i = 0; i < object.rooms.length; ++i) {
                    if (typeof object.rooms[i] !== "object")
                        throw TypeError(".msg.RoomListLobbyPush.rooms: object expected");
                    message.rooms[i] = $root.msg.RoomListLobbyPush.OneRoom.fromObject(object.rooms[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RoomListLobbyPush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomListLobbyPush
         * @static
         * @param {msg.RoomListLobbyPush} message RoomListLobbyPush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomListLobbyPush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.rooms = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.rooms && message.rooms.length) {
                object.rooms = [];
                for (var j = 0; j < message.rooms.length; ++j)
                    object.rooms[j] = $root.msg.RoomListLobbyPush.OneRoom.toObject(message.rooms[j], options);
            }
            return object;
        };

        /**
         * Converts this RoomListLobbyPush to JSON.
         * @function toJSON
         * @memberof msg.RoomListLobbyPush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomListLobbyPush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        RoomListLobbyPush.OneRoom = (function() {

            /**
             * Properties of an OneRoom.
             * @memberof msg.RoomListLobbyPush
             * @interface IOneRoom
             * @property {string|null} [roomNumber] OneRoom roomNumber
             * @property {number|null} [open] OneRoom open
             */

            /**
             * Constructs a new OneRoom.
             * @memberof msg.RoomListLobbyPush
             * @classdesc Represents an OneRoom.
             * @implements IOneRoom
             * @constructor
             * @param {msg.RoomListLobbyPush.IOneRoom=} [properties] Properties to set
             */
            function OneRoom(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OneRoom roomNumber.
             * @member {string} roomNumber
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @instance
             */
            OneRoom.prototype.roomNumber = "";

            /**
             * OneRoom open.
             * @member {number} open
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @instance
             */
            OneRoom.prototype.open = 0;

            /**
             * Creates a new OneRoom instance using the specified properties.
             * @function create
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @static
             * @param {msg.RoomListLobbyPush.IOneRoom=} [properties] Properties to set
             * @returns {msg.RoomListLobbyPush.OneRoom} OneRoom instance
             */
            OneRoom.create = function create(properties) {
                return new OneRoom(properties);
            };

            /**
             * Encodes the specified OneRoom message. Does not implicitly {@link msg.RoomListLobbyPush.OneRoom.verify|verify} messages.
             * @function encode
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @static
             * @param {msg.RoomListLobbyPush.IOneRoom} message OneRoom message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneRoom.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.roomNumber != null && Object.hasOwnProperty.call(message, "roomNumber"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomNumber);
                if (message.open != null && Object.hasOwnProperty.call(message, "open"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.open);
                return writer;
            };

            /**
             * Encodes the specified OneRoom message, length delimited. Does not implicitly {@link msg.RoomListLobbyPush.OneRoom.verify|verify} messages.
             * @function encodeDelimited
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @static
             * @param {msg.RoomListLobbyPush.IOneRoom} message OneRoom message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneRoom.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an OneRoom message from the specified reader or buffer.
             * @function decode
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {msg.RoomListLobbyPush.OneRoom} OneRoom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OneRoom.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomListLobbyPush.OneRoom();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.roomNumber = reader.string();
                        break;
                    case 2:
                        message.open = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an OneRoom message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {msg.RoomListLobbyPush.OneRoom} OneRoom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OneRoom.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an OneRoom message.
             * @function verify
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OneRoom.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                    if (!$util.isString(message.roomNumber))
                        return "roomNumber: string expected";
                if (message.open != null && message.hasOwnProperty("open"))
                    if (!$util.isInteger(message.open))
                        return "open: integer expected";
                return null;
            };

            /**
             * Creates an OneRoom message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {msg.RoomListLobbyPush.OneRoom} OneRoom
             */
            OneRoom.fromObject = function fromObject(object) {
                if (object instanceof $root.msg.RoomListLobbyPush.OneRoom)
                    return object;
                var message = new $root.msg.RoomListLobbyPush.OneRoom();
                if (object.roomNumber != null)
                    message.roomNumber = String(object.roomNumber);
                if (object.open != null)
                    message.open = object.open | 0;
                return message;
            };

            /**
             * Creates a plain object from an OneRoom message. Also converts values to other types if specified.
             * @function toObject
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @static
             * @param {msg.RoomListLobbyPush.OneRoom} message OneRoom
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OneRoom.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.roomNumber = "";
                    object.open = 0;
                }
                if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                    object.roomNumber = message.roomNumber;
                if (message.open != null && message.hasOwnProperty("open"))
                    object.open = message.open;
                return object;
            };

            /**
             * Converts this OneRoom to JSON.
             * @function toJSON
             * @memberof msg.RoomListLobbyPush.OneRoom
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OneRoom.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return OneRoom;
        })();

        return RoomListLobbyPush;
    })();

    msg.BetPush = (function() {

        /**
         * Properties of a BetPush.
         * @memberof msg
         * @interface IBetPush
         * @property {number|Long|null} [serverTime] BetPush serverTime
         * @property {number|null} [code] BetPush code
         * @property {number|null} [userID] BetPush userID
         * @property {msg.IInfoBet|null} [info] BetPush info
         * @property {number|null} [balance] BetPush balance
         * @property {number|null} [lockMoney] BetPush lockMoney
         */

        /**
         * Constructs a new BetPush.
         * @memberof msg
         * @classdesc Represents a BetPush.
         * @implements IBetPush
         * @constructor
         * @param {msg.IBetPush=} [properties] Properties to set
         */
        function BetPush(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetPush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.BetPush
         * @instance
         */
        BetPush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BetPush code.
         * @member {number} code
         * @memberof msg.BetPush
         * @instance
         */
        BetPush.prototype.code = 0;

        /**
         * BetPush userID.
         * @member {number} userID
         * @memberof msg.BetPush
         * @instance
         */
        BetPush.prototype.userID = 0;

        /**
         * BetPush info.
         * @member {msg.IInfoBet|null|undefined} info
         * @memberof msg.BetPush
         * @instance
         */
        BetPush.prototype.info = null;

        /**
         * BetPush balance.
         * @member {number} balance
         * @memberof msg.BetPush
         * @instance
         */
        BetPush.prototype.balance = 0;

        /**
         * BetPush lockMoney.
         * @member {number} lockMoney
         * @memberof msg.BetPush
         * @instance
         */
        BetPush.prototype.lockMoney = 0;

        /**
         * Creates a new BetPush instance using the specified properties.
         * @function create
         * @memberof msg.BetPush
         * @static
         * @param {msg.IBetPush=} [properties] Properties to set
         * @returns {msg.BetPush} BetPush instance
         */
        BetPush.create = function create(properties) {
            return new BetPush(properties);
        };

        /**
         * Encodes the specified BetPush message. Does not implicitly {@link msg.BetPush.verify|verify} messages.
         * @function encode
         * @memberof msg.BetPush
         * @static
         * @param {msg.IBetPush} message BetPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetPush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.userID);
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                $root.msg.InfoBet.encode(message.info, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.balance);
            if (message.lockMoney != null && Object.hasOwnProperty.call(message, "lockMoney"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.lockMoney);
            return writer;
        };

        /**
         * Encodes the specified BetPush message, length delimited. Does not implicitly {@link msg.BetPush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BetPush
         * @static
         * @param {msg.IBetPush} message BetPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetPush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetPush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BetPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BetPush} BetPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetPush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BetPush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.userID = reader.int32();
                    break;
                case 4:
                    message.info = $root.msg.InfoBet.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.balance = reader.double();
                    break;
                case 6:
                    message.lockMoney = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetPush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BetPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BetPush} BetPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetPush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetPush message.
         * @function verify
         * @memberof msg.BetPush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetPush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.userID != null && message.hasOwnProperty("userID"))
                if (!$util.isInteger(message.userID))
                    return "userID: integer expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                var error = $root.msg.InfoBet.verify(message.info);
                if (error)
                    return "info." + error;
            }
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (typeof message.balance !== "number")
                    return "balance: number expected";
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                if (typeof message.lockMoney !== "number")
                    return "lockMoney: number expected";
            return null;
        };

        /**
         * Creates a BetPush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BetPush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BetPush} BetPush
         */
        BetPush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BetPush)
                return object;
            var message = new $root.msg.BetPush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.userID != null)
                message.userID = object.userID | 0;
            if (object.info != null) {
                if (typeof object.info !== "object")
                    throw TypeError(".msg.BetPush.info: object expected");
                message.info = $root.msg.InfoBet.fromObject(object.info);
            }
            if (object.balance != null)
                message.balance = Number(object.balance);
            if (object.lockMoney != null)
                message.lockMoney = Number(object.lockMoney);
            return message;
        };

        /**
         * Creates a plain object from a BetPush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BetPush
         * @static
         * @param {msg.BetPush} message BetPush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetPush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.userID = 0;
                object.info = null;
                object.balance = 0;
                object.lockMoney = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.userID != null && message.hasOwnProperty("userID"))
                object.userID = message.userID;
            if (message.info != null && message.hasOwnProperty("info"))
                object.info = $root.msg.InfoBet.toObject(message.info, options);
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                object.lockMoney = options.json && !isFinite(message.lockMoney) ? String(message.lockMoney) : message.lockMoney;
            return object;
        };

        /**
         * Converts this BetPush to JSON.
         * @function toJSON
         * @memberof msg.BetPush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetPush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetPush;
    })();

    msg.ResultRoundPush = (function() {

        /**
         * Properties of a ResultRoundPush.
         * @memberof msg
         * @interface IResultRoundPush
         * @property {number|Long|null} [serverTime] ResultRoundPush serverTime
         * @property {number|null} [code] ResultRoundPush code
         * @property {string|null} [roomNumber] ResultRoundPush roomNumber
         * @property {string|null} [luckyNum] ResultRoundPush luckyNum
         * @property {number|null} [offsetMe] ResultRoundPush offsetMe
         * @property {Array.<number>|null} [offsetUsersDesk] ResultRoundPush offsetUsersDesk
         */

        /**
         * Constructs a new ResultRoundPush.
         * @memberof msg
         * @classdesc Represents a ResultRoundPush.
         * @implements IResultRoundPush
         * @constructor
         * @param {msg.IResultRoundPush=} [properties] Properties to set
         */
        function ResultRoundPush(properties) {
            this.offsetUsersDesk = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResultRoundPush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.ResultRoundPush
         * @instance
         */
        ResultRoundPush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ResultRoundPush code.
         * @member {number} code
         * @memberof msg.ResultRoundPush
         * @instance
         */
        ResultRoundPush.prototype.code = 0;

        /**
         * ResultRoundPush roomNumber.
         * @member {string} roomNumber
         * @memberof msg.ResultRoundPush
         * @instance
         */
        ResultRoundPush.prototype.roomNumber = "";

        /**
         * ResultRoundPush luckyNum.
         * @member {string} luckyNum
         * @memberof msg.ResultRoundPush
         * @instance
         */
        ResultRoundPush.prototype.luckyNum = "";

        /**
         * ResultRoundPush offsetMe.
         * @member {number} offsetMe
         * @memberof msg.ResultRoundPush
         * @instance
         */
        ResultRoundPush.prototype.offsetMe = 0;

        /**
         * ResultRoundPush offsetUsersDesk.
         * @member {Array.<number>} offsetUsersDesk
         * @memberof msg.ResultRoundPush
         * @instance
         */
        ResultRoundPush.prototype.offsetUsersDesk = $util.emptyArray;

        /**
         * Creates a new ResultRoundPush instance using the specified properties.
         * @function create
         * @memberof msg.ResultRoundPush
         * @static
         * @param {msg.IResultRoundPush=} [properties] Properties to set
         * @returns {msg.ResultRoundPush} ResultRoundPush instance
         */
        ResultRoundPush.create = function create(properties) {
            return new ResultRoundPush(properties);
        };

        /**
         * Encodes the specified ResultRoundPush message. Does not implicitly {@link msg.ResultRoundPush.verify|verify} messages.
         * @function encode
         * @memberof msg.ResultRoundPush
         * @static
         * @param {msg.IResultRoundPush} message ResultRoundPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultRoundPush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.roomNumber != null && Object.hasOwnProperty.call(message, "roomNumber"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.roomNumber);
            if (message.luckyNum != null && Object.hasOwnProperty.call(message, "luckyNum"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.luckyNum);
            if (message.offsetMe != null && Object.hasOwnProperty.call(message, "offsetMe"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.offsetMe);
            if (message.offsetUsersDesk != null && message.offsetUsersDesk.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.offsetUsersDesk.length; ++i)
                    writer.double(message.offsetUsersDesk[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified ResultRoundPush message, length delimited. Does not implicitly {@link msg.ResultRoundPush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ResultRoundPush
         * @static
         * @param {msg.IResultRoundPush} message ResultRoundPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultRoundPush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResultRoundPush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ResultRoundPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ResultRoundPush} ResultRoundPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultRoundPush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ResultRoundPush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.roomNumber = reader.string();
                    break;
                case 4:
                    message.luckyNum = reader.string();
                    break;
                case 5:
                    message.offsetMe = reader.double();
                    break;
                case 6:
                    if (!(message.offsetUsersDesk && message.offsetUsersDesk.length))
                        message.offsetUsersDesk = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.offsetUsersDesk.push(reader.double());
                    } else
                        message.offsetUsersDesk.push(reader.double());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResultRoundPush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ResultRoundPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ResultRoundPush} ResultRoundPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultRoundPush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResultRoundPush message.
         * @function verify
         * @memberof msg.ResultRoundPush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResultRoundPush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                if (!$util.isString(message.roomNumber))
                    return "roomNumber: string expected";
            if (message.luckyNum != null && message.hasOwnProperty("luckyNum"))
                if (!$util.isString(message.luckyNum))
                    return "luckyNum: string expected";
            if (message.offsetMe != null && message.hasOwnProperty("offsetMe"))
                if (typeof message.offsetMe !== "number")
                    return "offsetMe: number expected";
            if (message.offsetUsersDesk != null && message.hasOwnProperty("offsetUsersDesk")) {
                if (!Array.isArray(message.offsetUsersDesk))
                    return "offsetUsersDesk: array expected";
                for (var i = 0; i < message.offsetUsersDesk.length; ++i)
                    if (typeof message.offsetUsersDesk[i] !== "number")
                        return "offsetUsersDesk: number[] expected";
            }
            return null;
        };

        /**
         * Creates a ResultRoundPush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ResultRoundPush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ResultRoundPush} ResultRoundPush
         */
        ResultRoundPush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ResultRoundPush)
                return object;
            var message = new $root.msg.ResultRoundPush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.roomNumber != null)
                message.roomNumber = String(object.roomNumber);
            if (object.luckyNum != null)
                message.luckyNum = String(object.luckyNum);
            if (object.offsetMe != null)
                message.offsetMe = Number(object.offsetMe);
            if (object.offsetUsersDesk) {
                if (!Array.isArray(object.offsetUsersDesk))
                    throw TypeError(".msg.ResultRoundPush.offsetUsersDesk: array expected");
                message.offsetUsersDesk = [];
                for (var i = 0; i < object.offsetUsersDesk.length; ++i)
                    message.offsetUsersDesk[i] = Number(object.offsetUsersDesk[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a ResultRoundPush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ResultRoundPush
         * @static
         * @param {msg.ResultRoundPush} message ResultRoundPush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResultRoundPush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.offsetUsersDesk = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.roomNumber = "";
                object.luckyNum = "";
                object.offsetMe = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                object.roomNumber = message.roomNumber;
            if (message.luckyNum != null && message.hasOwnProperty("luckyNum"))
                object.luckyNum = message.luckyNum;
            if (message.offsetMe != null && message.hasOwnProperty("offsetMe"))
                object.offsetMe = options.json && !isFinite(message.offsetMe) ? String(message.offsetMe) : message.offsetMe;
            if (message.offsetUsersDesk && message.offsetUsersDesk.length) {
                object.offsetUsersDesk = [];
                for (var j = 0; j < message.offsetUsersDesk.length; ++j)
                    object.offsetUsersDesk[j] = options.json && !isFinite(message.offsetUsersDesk[j]) ? String(message.offsetUsersDesk[j]) : message.offsetUsersDesk[j];
            }
            return object;
        };

        /**
         * Converts this ResultRoundPush to JSON.
         * @function toJSON
         * @memberof msg.ResultRoundPush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResultRoundPush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ResultRoundPush;
    })();

    msg.UpdateBalancePush = (function() {

        /**
         * Properties of an UpdateBalancePush.
         * @memberof msg
         * @interface IUpdateBalancePush
         * @property {number|Long|null} [serverTime] UpdateBalancePush serverTime
         * @property {number|null} [code] UpdateBalancePush code
         * @property {number|null} [balance] UpdateBalancePush balance
         * @property {number|null} [lockMoney] UpdateBalancePush lockMoney
         * @property {number|null} [diffMoney] UpdateBalancePush diffMoney
         * @property {number|null} [userID] UpdateBalancePush userID
         */

        /**
         * Constructs a new UpdateBalancePush.
         * @memberof msg
         * @classdesc Represents an UpdateBalancePush.
         * @implements IUpdateBalancePush
         * @constructor
         * @param {msg.IUpdateBalancePush=} [properties] Properties to set
         */
        function UpdateBalancePush(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdateBalancePush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.UpdateBalancePush
         * @instance
         */
        UpdateBalancePush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UpdateBalancePush code.
         * @member {number} code
         * @memberof msg.UpdateBalancePush
         * @instance
         */
        UpdateBalancePush.prototype.code = 0;

        /**
         * UpdateBalancePush balance.
         * @member {number} balance
         * @memberof msg.UpdateBalancePush
         * @instance
         */
        UpdateBalancePush.prototype.balance = 0;

        /**
         * UpdateBalancePush lockMoney.
         * @member {number} lockMoney
         * @memberof msg.UpdateBalancePush
         * @instance
         */
        UpdateBalancePush.prototype.lockMoney = 0;

        /**
         * UpdateBalancePush diffMoney.
         * @member {number} diffMoney
         * @memberof msg.UpdateBalancePush
         * @instance
         */
        UpdateBalancePush.prototype.diffMoney = 0;

        /**
         * UpdateBalancePush userID.
         * @member {number} userID
         * @memberof msg.UpdateBalancePush
         * @instance
         */
        UpdateBalancePush.prototype.userID = 0;

        /**
         * Creates a new UpdateBalancePush instance using the specified properties.
         * @function create
         * @memberof msg.UpdateBalancePush
         * @static
         * @param {msg.IUpdateBalancePush=} [properties] Properties to set
         * @returns {msg.UpdateBalancePush} UpdateBalancePush instance
         */
        UpdateBalancePush.create = function create(properties) {
            return new UpdateBalancePush(properties);
        };

        /**
         * Encodes the specified UpdateBalancePush message. Does not implicitly {@link msg.UpdateBalancePush.verify|verify} messages.
         * @function encode
         * @memberof msg.UpdateBalancePush
         * @static
         * @param {msg.IUpdateBalancePush} message UpdateBalancePush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateBalancePush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.balance);
            if (message.lockMoney != null && Object.hasOwnProperty.call(message, "lockMoney"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.lockMoney);
            if (message.diffMoney != null && Object.hasOwnProperty.call(message, "diffMoney"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.diffMoney);
            if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.userID);
            return writer;
        };

        /**
         * Encodes the specified UpdateBalancePush message, length delimited. Does not implicitly {@link msg.UpdateBalancePush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UpdateBalancePush
         * @static
         * @param {msg.IUpdateBalancePush} message UpdateBalancePush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateBalancePush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdateBalancePush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UpdateBalancePush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UpdateBalancePush} UpdateBalancePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateBalancePush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UpdateBalancePush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.balance = reader.double();
                    break;
                case 4:
                    message.lockMoney = reader.double();
                    break;
                case 5:
                    message.diffMoney = reader.double();
                    break;
                case 6:
                    message.userID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpdateBalancePush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UpdateBalancePush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UpdateBalancePush} UpdateBalancePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateBalancePush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdateBalancePush message.
         * @function verify
         * @memberof msg.UpdateBalancePush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpdateBalancePush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (typeof message.balance !== "number")
                    return "balance: number expected";
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                if (typeof message.lockMoney !== "number")
                    return "lockMoney: number expected";
            if (message.diffMoney != null && message.hasOwnProperty("diffMoney"))
                if (typeof message.diffMoney !== "number")
                    return "diffMoney: number expected";
            if (message.userID != null && message.hasOwnProperty("userID"))
                if (!$util.isInteger(message.userID))
                    return "userID: integer expected";
            return null;
        };

        /**
         * Creates an UpdateBalancePush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UpdateBalancePush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UpdateBalancePush} UpdateBalancePush
         */
        UpdateBalancePush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UpdateBalancePush)
                return object;
            var message = new $root.msg.UpdateBalancePush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.balance != null)
                message.balance = Number(object.balance);
            if (object.lockMoney != null)
                message.lockMoney = Number(object.lockMoney);
            if (object.diffMoney != null)
                message.diffMoney = Number(object.diffMoney);
            if (object.userID != null)
                message.userID = object.userID | 0;
            return message;
        };

        /**
         * Creates a plain object from an UpdateBalancePush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UpdateBalancePush
         * @static
         * @param {msg.UpdateBalancePush} message UpdateBalancePush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdateBalancePush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.balance = 0;
                object.lockMoney = 0;
                object.diffMoney = 0;
                object.userID = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                object.lockMoney = options.json && !isFinite(message.lockMoney) ? String(message.lockMoney) : message.lockMoney;
            if (message.diffMoney != null && message.hasOwnProperty("diffMoney"))
                object.diffMoney = options.json && !isFinite(message.diffMoney) ? String(message.diffMoney) : message.diffMoney;
            if (message.userID != null && message.hasOwnProperty("userID"))
                object.userID = message.userID;
            return object;
        };

        /**
         * Converts this UpdateBalancePush to JSON.
         * @function toJSON
         * @memberof msg.UpdateBalancePush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateBalancePush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UpdateBalancePush;
    })();

    msg.UpdateServicePush = (function() {

        /**
         * Properties of an UpdateServicePush.
         * @memberof msg
         * @interface IUpdateServicePush
         * @property {number|Long|null} [serverTime] UpdateServicePush serverTime
         * @property {number|null} [code] UpdateServicePush code
         * @property {msg.UpdateServicePush.IMsgInfo|null} [msg] UpdateServicePush msg
         */

        /**
         * Constructs a new UpdateServicePush.
         * @memberof msg
         * @classdesc Represents an UpdateServicePush.
         * @implements IUpdateServicePush
         * @constructor
         * @param {msg.IUpdateServicePush=} [properties] Properties to set
         */
        function UpdateServicePush(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdateServicePush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.UpdateServicePush
         * @instance
         */
        UpdateServicePush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UpdateServicePush code.
         * @member {number} code
         * @memberof msg.UpdateServicePush
         * @instance
         */
        UpdateServicePush.prototype.code = 0;

        /**
         * UpdateServicePush msg.
         * @member {msg.UpdateServicePush.IMsgInfo|null|undefined} msg
         * @memberof msg.UpdateServicePush
         * @instance
         */
        UpdateServicePush.prototype.msg = null;

        /**
         * Creates a new UpdateServicePush instance using the specified properties.
         * @function create
         * @memberof msg.UpdateServicePush
         * @static
         * @param {msg.IUpdateServicePush=} [properties] Properties to set
         * @returns {msg.UpdateServicePush} UpdateServicePush instance
         */
        UpdateServicePush.create = function create(properties) {
            return new UpdateServicePush(properties);
        };

        /**
         * Encodes the specified UpdateServicePush message. Does not implicitly {@link msg.UpdateServicePush.verify|verify} messages.
         * @function encode
         * @memberof msg.UpdateServicePush
         * @static
         * @param {msg.IUpdateServicePush} message UpdateServicePush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateServicePush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                $root.msg.UpdateServicePush.MsgInfo.encode(message.msg, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UpdateServicePush message, length delimited. Does not implicitly {@link msg.UpdateServicePush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UpdateServicePush
         * @static
         * @param {msg.IUpdateServicePush} message UpdateServicePush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateServicePush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdateServicePush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UpdateServicePush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UpdateServicePush} UpdateServicePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateServicePush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UpdateServicePush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.msg = $root.msg.UpdateServicePush.MsgInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpdateServicePush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UpdateServicePush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UpdateServicePush} UpdateServicePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateServicePush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdateServicePush message.
         * @function verify
         * @memberof msg.UpdateServicePush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpdateServicePush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg")) {
                var error = $root.msg.UpdateServicePush.MsgInfo.verify(message.msg);
                if (error)
                    return "msg." + error;
            }
            return null;
        };

        /**
         * Creates an UpdateServicePush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UpdateServicePush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UpdateServicePush} UpdateServicePush
         */
        UpdateServicePush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UpdateServicePush)
                return object;
            var message = new $root.msg.UpdateServicePush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null) {
                if (typeof object.msg !== "object")
                    throw TypeError(".msg.UpdateServicePush.msg: object expected");
                message.msg = $root.msg.UpdateServicePush.MsgInfo.fromObject(object.msg);
            }
            return message;
        };

        /**
         * Creates a plain object from an UpdateServicePush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UpdateServicePush
         * @static
         * @param {msg.UpdateServicePush} message UpdateServicePush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdateServicePush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.msg = null;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = $root.msg.UpdateServicePush.MsgInfo.toObject(message.msg, options);
            return object;
        };

        /**
         * Converts this UpdateServicePush to JSON.
         * @function toJSON
         * @memberof msg.UpdateServicePush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateServicePush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        UpdateServicePush.MsgInfo = (function() {

            /**
             * Properties of a MsgInfo.
             * @memberof msg.UpdateServicePush
             * @interface IMsgInfo
             * @property {boolean|null} [state] MsgInfo state
             */

            /**
             * Constructs a new MsgInfo.
             * @memberof msg.UpdateServicePush
             * @classdesc Represents a MsgInfo.
             * @implements IMsgInfo
             * @constructor
             * @param {msg.UpdateServicePush.IMsgInfo=} [properties] Properties to set
             */
            function MsgInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgInfo state.
             * @member {boolean} state
             * @memberof msg.UpdateServicePush.MsgInfo
             * @instance
             */
            MsgInfo.prototype.state = false;

            /**
             * Creates a new MsgInfo instance using the specified properties.
             * @function create
             * @memberof msg.UpdateServicePush.MsgInfo
             * @static
             * @param {msg.UpdateServicePush.IMsgInfo=} [properties] Properties to set
             * @returns {msg.UpdateServicePush.MsgInfo} MsgInfo instance
             */
            MsgInfo.create = function create(properties) {
                return new MsgInfo(properties);
            };

            /**
             * Encodes the specified MsgInfo message. Does not implicitly {@link msg.UpdateServicePush.MsgInfo.verify|verify} messages.
             * @function encode
             * @memberof msg.UpdateServicePush.MsgInfo
             * @static
             * @param {msg.UpdateServicePush.IMsgInfo} message MsgInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.state);
                return writer;
            };

            /**
             * Encodes the specified MsgInfo message, length delimited. Does not implicitly {@link msg.UpdateServicePush.MsgInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof msg.UpdateServicePush.MsgInfo
             * @static
             * @param {msg.UpdateServicePush.IMsgInfo} message MsgInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgInfo message from the specified reader or buffer.
             * @function decode
             * @memberof msg.UpdateServicePush.MsgInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {msg.UpdateServicePush.MsgInfo} MsgInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UpdateServicePush.MsgInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.state = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MsgInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof msg.UpdateServicePush.MsgInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {msg.UpdateServicePush.MsgInfo} MsgInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgInfo message.
             * @function verify
             * @memberof msg.UpdateServicePush.MsgInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    if (typeof message.state !== "boolean")
                        return "state: boolean expected";
                return null;
            };

            /**
             * Creates a MsgInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof msg.UpdateServicePush.MsgInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {msg.UpdateServicePush.MsgInfo} MsgInfo
             */
            MsgInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.msg.UpdateServicePush.MsgInfo)
                    return object;
                var message = new $root.msg.UpdateServicePush.MsgInfo();
                if (object.state != null)
                    message.state = Boolean(object.state);
                return message;
            };

            /**
             * Creates a plain object from a MsgInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof msg.UpdateServicePush.MsgInfo
             * @static
             * @param {msg.UpdateServicePush.MsgInfo} message MsgInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.state = false;
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = message.state;
                return object;
            };

            /**
             * Converts this MsgInfo to JSON.
             * @function toJSON
             * @memberof msg.UpdateServicePush.MsgInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgInfo;
        })();

        return UpdateServicePush;
    })();

    msg.PauseServicePush = (function() {

        /**
         * Properties of a PauseServicePush.
         * @memberof msg
         * @interface IPauseServicePush
         * @property {number|Long|null} [serverTime] PauseServicePush serverTime
         * @property {number|null} [code] PauseServicePush code
         */

        /**
         * Constructs a new PauseServicePush.
         * @memberof msg
         * @classdesc Represents a PauseServicePush.
         * @implements IPauseServicePush
         * @constructor
         * @param {msg.IPauseServicePush=} [properties] Properties to set
         */
        function PauseServicePush(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PauseServicePush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.PauseServicePush
         * @instance
         */
        PauseServicePush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PauseServicePush code.
         * @member {number} code
         * @memberof msg.PauseServicePush
         * @instance
         */
        PauseServicePush.prototype.code = 0;

        /**
         * Creates a new PauseServicePush instance using the specified properties.
         * @function create
         * @memberof msg.PauseServicePush
         * @static
         * @param {msg.IPauseServicePush=} [properties] Properties to set
         * @returns {msg.PauseServicePush} PauseServicePush instance
         */
        PauseServicePush.create = function create(properties) {
            return new PauseServicePush(properties);
        };

        /**
         * Encodes the specified PauseServicePush message. Does not implicitly {@link msg.PauseServicePush.verify|verify} messages.
         * @function encode
         * @memberof msg.PauseServicePush
         * @static
         * @param {msg.IPauseServicePush} message PauseServicePush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PauseServicePush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            return writer;
        };

        /**
         * Encodes the specified PauseServicePush message, length delimited. Does not implicitly {@link msg.PauseServicePush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PauseServicePush
         * @static
         * @param {msg.IPauseServicePush} message PauseServicePush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PauseServicePush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PauseServicePush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PauseServicePush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PauseServicePush} PauseServicePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PauseServicePush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PauseServicePush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PauseServicePush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PauseServicePush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PauseServicePush} PauseServicePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PauseServicePush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PauseServicePush message.
         * @function verify
         * @memberof msg.PauseServicePush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PauseServicePush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            return null;
        };

        /**
         * Creates a PauseServicePush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PauseServicePush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PauseServicePush} PauseServicePush
         */
        PauseServicePush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PauseServicePush)
                return object;
            var message = new $root.msg.PauseServicePush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            return message;
        };

        /**
         * Creates a plain object from a PauseServicePush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PauseServicePush
         * @static
         * @param {msg.PauseServicePush} message PauseServicePush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PauseServicePush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            return object;
        };

        /**
         * Converts this PauseServicePush to JSON.
         * @function toJSON
         * @memberof msg.PauseServicePush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PauseServicePush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PauseServicePush;
    })();

    msg.KickedOutPush = (function() {

        /**
         * Properties of a KickedOutPush.
         * @memberof msg
         * @interface IKickedOutPush
         * @property {number|Long|null} [serverTime] KickedOutPush serverTime
         * @property {number|null} [code] KickedOutPush code
         * @property {number|null} [reason] KickedOutPush reason
         */

        /**
         * Constructs a new KickedOutPush.
         * @memberof msg
         * @classdesc Represents a KickedOutPush.
         * @implements IKickedOutPush
         * @constructor
         * @param {msg.IKickedOutPush=} [properties] Properties to set
         */
        function KickedOutPush(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KickedOutPush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.KickedOutPush
         * @instance
         */
        KickedOutPush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * KickedOutPush code.
         * @member {number} code
         * @memberof msg.KickedOutPush
         * @instance
         */
        KickedOutPush.prototype.code = 0;

        /**
         * KickedOutPush reason.
         * @member {number} reason
         * @memberof msg.KickedOutPush
         * @instance
         */
        KickedOutPush.prototype.reason = 0;

        /**
         * Creates a new KickedOutPush instance using the specified properties.
         * @function create
         * @memberof msg.KickedOutPush
         * @static
         * @param {msg.IKickedOutPush=} [properties] Properties to set
         * @returns {msg.KickedOutPush} KickedOutPush instance
         */
        KickedOutPush.create = function create(properties) {
            return new KickedOutPush(properties);
        };

        /**
         * Encodes the specified KickedOutPush message. Does not implicitly {@link msg.KickedOutPush.verify|verify} messages.
         * @function encode
         * @memberof msg.KickedOutPush
         * @static
         * @param {msg.IKickedOutPush} message KickedOutPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickedOutPush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.reason);
            return writer;
        };

        /**
         * Encodes the specified KickedOutPush message, length delimited. Does not implicitly {@link msg.KickedOutPush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.KickedOutPush
         * @static
         * @param {msg.IKickedOutPush} message KickedOutPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickedOutPush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KickedOutPush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.KickedOutPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.KickedOutPush} KickedOutPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickedOutPush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.KickedOutPush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.reason = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a KickedOutPush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.KickedOutPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.KickedOutPush} KickedOutPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickedOutPush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KickedOutPush message.
         * @function verify
         * @memberof msg.KickedOutPush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KickedOutPush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                if (!$util.isInteger(message.reason))
                    return "reason: integer expected";
            return null;
        };

        /**
         * Creates a KickedOutPush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.KickedOutPush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.KickedOutPush} KickedOutPush
         */
        KickedOutPush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.KickedOutPush)
                return object;
            var message = new $root.msg.KickedOutPush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.reason != null)
                message.reason = object.reason | 0;
            return message;
        };

        /**
         * Creates a plain object from a KickedOutPush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.KickedOutPush
         * @static
         * @param {msg.KickedOutPush} message KickedOutPush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KickedOutPush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.reason = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = message.reason;
            return object;
        };

        /**
         * Converts this KickedOutPush to JSON.
         * @function toJSON
         * @memberof msg.KickedOutPush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KickedOutPush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return KickedOutPush;
    })();

    msg.PoolTrend = (function() {

        /**
         * Properties of a PoolTrend.
         * @memberof msg
         * @interface IPoolTrend
         * @property {number|null} [changeTime] PoolTrend changeTime
         * @property {number|null} [changeMoney] PoolTrend changeMoney
         * @property {msg.PoolTrend.IPartnerInfo|null} [user] PoolTrend user
         */

        /**
         * Constructs a new PoolTrend.
         * @memberof msg
         * @classdesc Represents a PoolTrend.
         * @implements IPoolTrend
         * @constructor
         * @param {msg.IPoolTrend=} [properties] Properties to set
         */
        function PoolTrend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PoolTrend changeTime.
         * @member {number} changeTime
         * @memberof msg.PoolTrend
         * @instance
         */
        PoolTrend.prototype.changeTime = 0;

        /**
         * PoolTrend changeMoney.
         * @member {number} changeMoney
         * @memberof msg.PoolTrend
         * @instance
         */
        PoolTrend.prototype.changeMoney = 0;

        /**
         * PoolTrend user.
         * @member {msg.PoolTrend.IPartnerInfo|null|undefined} user
         * @memberof msg.PoolTrend
         * @instance
         */
        PoolTrend.prototype.user = null;

        /**
         * Creates a new PoolTrend instance using the specified properties.
         * @function create
         * @memberof msg.PoolTrend
         * @static
         * @param {msg.IPoolTrend=} [properties] Properties to set
         * @returns {msg.PoolTrend} PoolTrend instance
         */
        PoolTrend.create = function create(properties) {
            return new PoolTrend(properties);
        };

        /**
         * Encodes the specified PoolTrend message. Does not implicitly {@link msg.PoolTrend.verify|verify} messages.
         * @function encode
         * @memberof msg.PoolTrend
         * @static
         * @param {msg.IPoolTrend} message PoolTrend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PoolTrend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.changeTime != null && Object.hasOwnProperty.call(message, "changeTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.changeTime);
            if (message.changeMoney != null && Object.hasOwnProperty.call(message, "changeMoney"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.changeMoney);
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                $root.msg.PoolTrend.PartnerInfo.encode(message.user, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PoolTrend message, length delimited. Does not implicitly {@link msg.PoolTrend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PoolTrend
         * @static
         * @param {msg.IPoolTrend} message PoolTrend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PoolTrend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PoolTrend message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PoolTrend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PoolTrend} PoolTrend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PoolTrend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PoolTrend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.changeTime = reader.uint32();
                    break;
                case 2:
                    message.changeMoney = reader.double();
                    break;
                case 3:
                    message.user = $root.msg.PoolTrend.PartnerInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PoolTrend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PoolTrend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PoolTrend} PoolTrend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PoolTrend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PoolTrend message.
         * @function verify
         * @memberof msg.PoolTrend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PoolTrend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.changeTime != null && message.hasOwnProperty("changeTime"))
                if (!$util.isInteger(message.changeTime))
                    return "changeTime: integer expected";
            if (message.changeMoney != null && message.hasOwnProperty("changeMoney"))
                if (typeof message.changeMoney !== "number")
                    return "changeMoney: number expected";
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.msg.PoolTrend.PartnerInfo.verify(message.user);
                if (error)
                    return "user." + error;
            }
            return null;
        };

        /**
         * Creates a PoolTrend message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PoolTrend
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PoolTrend} PoolTrend
         */
        PoolTrend.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PoolTrend)
                return object;
            var message = new $root.msg.PoolTrend();
            if (object.changeTime != null)
                message.changeTime = object.changeTime >>> 0;
            if (object.changeMoney != null)
                message.changeMoney = Number(object.changeMoney);
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".msg.PoolTrend.user: object expected");
                message.user = $root.msg.PoolTrend.PartnerInfo.fromObject(object.user);
            }
            return message;
        };

        /**
         * Creates a plain object from a PoolTrend message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PoolTrend
         * @static
         * @param {msg.PoolTrend} message PoolTrend
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PoolTrend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.changeTime = 0;
                object.changeMoney = 0;
                object.user = null;
            }
            if (message.changeTime != null && message.hasOwnProperty("changeTime"))
                object.changeTime = message.changeTime;
            if (message.changeMoney != null && message.hasOwnProperty("changeMoney"))
                object.changeMoney = options.json && !isFinite(message.changeMoney) ? String(message.changeMoney) : message.changeMoney;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.msg.PoolTrend.PartnerInfo.toObject(message.user, options);
            return object;
        };

        /**
         * Converts this PoolTrend to JSON.
         * @function toJSON
         * @memberof msg.PoolTrend
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PoolTrend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        PoolTrend.PartnerInfo = (function() {

            /**
             * Properties of a PartnerInfo.
             * @memberof msg.PoolTrend
             * @interface IPartnerInfo
             * @property {number|null} [userID] PartnerInfo userID
             * @property {string|null} [userName] PartnerInfo userName
             * @property {string|null} [headUrl] PartnerInfo headUrl
             */

            /**
             * Constructs a new PartnerInfo.
             * @memberof msg.PoolTrend
             * @classdesc Represents a PartnerInfo.
             * @implements IPartnerInfo
             * @constructor
             * @param {msg.PoolTrend.IPartnerInfo=} [properties] Properties to set
             */
            function PartnerInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PartnerInfo userID.
             * @member {number} userID
             * @memberof msg.PoolTrend.PartnerInfo
             * @instance
             */
            PartnerInfo.prototype.userID = 0;

            /**
             * PartnerInfo userName.
             * @member {string} userName
             * @memberof msg.PoolTrend.PartnerInfo
             * @instance
             */
            PartnerInfo.prototype.userName = "";

            /**
             * PartnerInfo headUrl.
             * @member {string} headUrl
             * @memberof msg.PoolTrend.PartnerInfo
             * @instance
             */
            PartnerInfo.prototype.headUrl = "";

            /**
             * Creates a new PartnerInfo instance using the specified properties.
             * @function create
             * @memberof msg.PoolTrend.PartnerInfo
             * @static
             * @param {msg.PoolTrend.IPartnerInfo=} [properties] Properties to set
             * @returns {msg.PoolTrend.PartnerInfo} PartnerInfo instance
             */
            PartnerInfo.create = function create(properties) {
                return new PartnerInfo(properties);
            };

            /**
             * Encodes the specified PartnerInfo message. Does not implicitly {@link msg.PoolTrend.PartnerInfo.verify|verify} messages.
             * @function encode
             * @memberof msg.PoolTrend.PartnerInfo
             * @static
             * @param {msg.PoolTrend.IPartnerInfo} message PartnerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PartnerInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userID);
                if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
                if (message.headUrl != null && Object.hasOwnProperty.call(message, "headUrl"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.headUrl);
                return writer;
            };

            /**
             * Encodes the specified PartnerInfo message, length delimited. Does not implicitly {@link msg.PoolTrend.PartnerInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof msg.PoolTrend.PartnerInfo
             * @static
             * @param {msg.PoolTrend.IPartnerInfo} message PartnerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PartnerInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PartnerInfo message from the specified reader or buffer.
             * @function decode
             * @memberof msg.PoolTrend.PartnerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {msg.PoolTrend.PartnerInfo} PartnerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PartnerInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PoolTrend.PartnerInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.userID = reader.int32();
                        break;
                    case 2:
                        message.userName = reader.string();
                        break;
                    case 3:
                        message.headUrl = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PartnerInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof msg.PoolTrend.PartnerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {msg.PoolTrend.PartnerInfo} PartnerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PartnerInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PartnerInfo message.
             * @function verify
             * @memberof msg.PoolTrend.PartnerInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PartnerInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userID != null && message.hasOwnProperty("userID"))
                    if (!$util.isInteger(message.userID))
                        return "userID: integer expected";
                if (message.userName != null && message.hasOwnProperty("userName"))
                    if (!$util.isString(message.userName))
                        return "userName: string expected";
                if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                    if (!$util.isString(message.headUrl))
                        return "headUrl: string expected";
                return null;
            };

            /**
             * Creates a PartnerInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof msg.PoolTrend.PartnerInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {msg.PoolTrend.PartnerInfo} PartnerInfo
             */
            PartnerInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.msg.PoolTrend.PartnerInfo)
                    return object;
                var message = new $root.msg.PoolTrend.PartnerInfo();
                if (object.userID != null)
                    message.userID = object.userID | 0;
                if (object.userName != null)
                    message.userName = String(object.userName);
                if (object.headUrl != null)
                    message.headUrl = String(object.headUrl);
                return message;
            };

            /**
             * Creates a plain object from a PartnerInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof msg.PoolTrend.PartnerInfo
             * @static
             * @param {msg.PoolTrend.PartnerInfo} message PartnerInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PartnerInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.userID = 0;
                    object.userName = "";
                    object.headUrl = "";
                }
                if (message.userID != null && message.hasOwnProperty("userID"))
                    object.userID = message.userID;
                if (message.userName != null && message.hasOwnProperty("userName"))
                    object.userName = message.userName;
                if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                    object.headUrl = message.headUrl;
                return object;
            };

            /**
             * Converts this PartnerInfo to JSON.
             * @function toJSON
             * @memberof msg.PoolTrend.PartnerInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PartnerInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PartnerInfo;
        })();

        return PoolTrend;
    })();

    msg.ErrorMsg = (function() {

        /**
         * Properties of an ErrorMsg.
         * @memberof msg
         * @interface IErrorMsg
         * @property {number|Long|null} [serverTime] ErrorMsg serverTime
         * @property {number|null} [code] ErrorMsg code
         */

        /**
         * Constructs a new ErrorMsg.
         * @memberof msg
         * @classdesc Represents an ErrorMsg.
         * @implements IErrorMsg
         * @constructor
         * @param {msg.IErrorMsg=} [properties] Properties to set
         */
        function ErrorMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorMsg serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.ErrorMsg
         * @instance
         */
        ErrorMsg.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ErrorMsg code.
         * @member {number} code
         * @memberof msg.ErrorMsg
         * @instance
         */
        ErrorMsg.prototype.code = 0;

        /**
         * Creates a new ErrorMsg instance using the specified properties.
         * @function create
         * @memberof msg.ErrorMsg
         * @static
         * @param {msg.IErrorMsg=} [properties] Properties to set
         * @returns {msg.ErrorMsg} ErrorMsg instance
         */
        ErrorMsg.create = function create(properties) {
            return new ErrorMsg(properties);
        };

        /**
         * Encodes the specified ErrorMsg message. Does not implicitly {@link msg.ErrorMsg.verify|verify} messages.
         * @function encode
         * @memberof msg.ErrorMsg
         * @static
         * @param {msg.IErrorMsg} message ErrorMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            return writer;
        };

        /**
         * Encodes the specified ErrorMsg message, length delimited. Does not implicitly {@link msg.ErrorMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ErrorMsg
         * @static
         * @param {msg.IErrorMsg} message ErrorMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorMsg message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ErrorMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ErrorMsg} ErrorMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ErrorMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ErrorMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ErrorMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ErrorMsg} ErrorMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorMsg message.
         * @function verify
         * @memberof msg.ErrorMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            return null;
        };

        /**
         * Creates an ErrorMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ErrorMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ErrorMsg} ErrorMsg
         */
        ErrorMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ErrorMsg)
                return object;
            var message = new $root.msg.ErrorMsg();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            return message;
        };

        /**
         * Creates a plain object from an ErrorMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ErrorMsg
         * @static
         * @param {msg.ErrorMsg} message ErrorMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            return object;
        };

        /**
         * Converts this ErrorMsg to JSON.
         * @function toJSON
         * @memberof msg.ErrorMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ErrorMsg;
    })();

    msg.UserRankRequest = (function() {

        /**
         * Properties of a UserRankRequest.
         * @memberof msg
         * @interface IUserRankRequest
         * @property {string|null} [roomNumber] UserRankRequest roomNumber
         */

        /**
         * Constructs a new UserRankRequest.
         * @memberof msg
         * @classdesc Represents a UserRankRequest.
         * @implements IUserRankRequest
         * @constructor
         * @param {msg.IUserRankRequest=} [properties] Properties to set
         */
        function UserRankRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRankRequest roomNumber.
         * @member {string} roomNumber
         * @memberof msg.UserRankRequest
         * @instance
         */
        UserRankRequest.prototype.roomNumber = "";

        /**
         * Creates a new UserRankRequest instance using the specified properties.
         * @function create
         * @memberof msg.UserRankRequest
         * @static
         * @param {msg.IUserRankRequest=} [properties] Properties to set
         * @returns {msg.UserRankRequest} UserRankRequest instance
         */
        UserRankRequest.create = function create(properties) {
            return new UserRankRequest(properties);
        };

        /**
         * Encodes the specified UserRankRequest message. Does not implicitly {@link msg.UserRankRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.UserRankRequest
         * @static
         * @param {msg.IUserRankRequest} message UserRankRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRankRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomNumber != null && Object.hasOwnProperty.call(message, "roomNumber"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomNumber);
            return writer;
        };

        /**
         * Encodes the specified UserRankRequest message, length delimited. Does not implicitly {@link msg.UserRankRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UserRankRequest
         * @static
         * @param {msg.IUserRankRequest} message UserRankRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRankRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserRankRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UserRankRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UserRankRequest} UserRankRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRankRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UserRankRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomNumber = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserRankRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UserRankRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UserRankRequest} UserRankRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRankRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRankRequest message.
         * @function verify
         * @memberof msg.UserRankRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRankRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                if (!$util.isString(message.roomNumber))
                    return "roomNumber: string expected";
            return null;
        };

        /**
         * Creates a UserRankRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UserRankRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UserRankRequest} UserRankRequest
         */
        UserRankRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UserRankRequest)
                return object;
            var message = new $root.msg.UserRankRequest();
            if (object.roomNumber != null)
                message.roomNumber = String(object.roomNumber);
            return message;
        };

        /**
         * Creates a plain object from a UserRankRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UserRankRequest
         * @static
         * @param {msg.UserRankRequest} message UserRankRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRankRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.roomNumber = "";
            if (message.roomNumber != null && message.hasOwnProperty("roomNumber"))
                object.roomNumber = message.roomNumber;
            return object;
        };

        /**
         * Converts this UserRankRequest to JSON.
         * @function toJSON
         * @memberof msg.UserRankRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRankRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserRankRequest;
    })();

    msg.UserInfoRank = (function() {

        /**
         * Properties of a UserInfoRank.
         * @memberof msg
         * @interface IUserInfoRank
         * @property {string|null} [userName] UserInfoRank userName
         * @property {string|null} [headUrl] UserInfoRank headUrl
         * @property {number|null} [balanceAvail] UserInfoRank balanceAvail
         * @property {number|null} [sumWinRound] UserInfoRank sumWinRound
         * @property {number|Long|null} [sumBetVal] UserInfoRank sumBetVal
         * @property {number|null} [userID] UserInfoRank userID
         */

        /**
         * Constructs a new UserInfoRank.
         * @memberof msg
         * @classdesc Represents a UserInfoRank.
         * @implements IUserInfoRank
         * @constructor
         * @param {msg.IUserInfoRank=} [properties] Properties to set
         */
        function UserInfoRank(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserInfoRank userName.
         * @member {string} userName
         * @memberof msg.UserInfoRank
         * @instance
         */
        UserInfoRank.prototype.userName = "";

        /**
         * UserInfoRank headUrl.
         * @member {string} headUrl
         * @memberof msg.UserInfoRank
         * @instance
         */
        UserInfoRank.prototype.headUrl = "";

        /**
         * UserInfoRank balanceAvail.
         * @member {number} balanceAvail
         * @memberof msg.UserInfoRank
         * @instance
         */
        UserInfoRank.prototype.balanceAvail = 0;

        /**
         * UserInfoRank sumWinRound.
         * @member {number} sumWinRound
         * @memberof msg.UserInfoRank
         * @instance
         */
        UserInfoRank.prototype.sumWinRound = 0;

        /**
         * UserInfoRank sumBetVal.
         * @member {number|Long} sumBetVal
         * @memberof msg.UserInfoRank
         * @instance
         */
        UserInfoRank.prototype.sumBetVal = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserInfoRank userID.
         * @member {number} userID
         * @memberof msg.UserInfoRank
         * @instance
         */
        UserInfoRank.prototype.userID = 0;

        /**
         * Creates a new UserInfoRank instance using the specified properties.
         * @function create
         * @memberof msg.UserInfoRank
         * @static
         * @param {msg.IUserInfoRank=} [properties] Properties to set
         * @returns {msg.UserInfoRank} UserInfoRank instance
         */
        UserInfoRank.create = function create(properties) {
            return new UserInfoRank(properties);
        };

        /**
         * Encodes the specified UserInfoRank message. Does not implicitly {@link msg.UserInfoRank.verify|verify} messages.
         * @function encode
         * @memberof msg.UserInfoRank
         * @static
         * @param {msg.IUserInfoRank} message UserInfoRank message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfoRank.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userName);
            if (message.headUrl != null && Object.hasOwnProperty.call(message, "headUrl"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.headUrl);
            if (message.balanceAvail != null && Object.hasOwnProperty.call(message, "balanceAvail"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.balanceAvail);
            if (message.sumWinRound != null && Object.hasOwnProperty.call(message, "sumWinRound"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.sumWinRound);
            if (message.sumBetVal != null && Object.hasOwnProperty.call(message, "sumBetVal"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.sumBetVal);
            if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.userID);
            return writer;
        };

        /**
         * Encodes the specified UserInfoRank message, length delimited. Does not implicitly {@link msg.UserInfoRank.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UserInfoRank
         * @static
         * @param {msg.IUserInfoRank} message UserInfoRank message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfoRank.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserInfoRank message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UserInfoRank
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UserInfoRank} UserInfoRank
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfoRank.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UserInfoRank();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userName = reader.string();
                    break;
                case 2:
                    message.headUrl = reader.string();
                    break;
                case 3:
                    message.balanceAvail = reader.double();
                    break;
                case 4:
                    message.sumWinRound = reader.int32();
                    break;
                case 5:
                    message.sumBetVal = reader.int64();
                    break;
                case 6:
                    message.userID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserInfoRank message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UserInfoRank
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UserInfoRank} UserInfoRank
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfoRank.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserInfoRank message.
         * @function verify
         * @memberof msg.UserInfoRank
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserInfoRank.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userName != null && message.hasOwnProperty("userName"))
                if (!$util.isString(message.userName))
                    return "userName: string expected";
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                if (!$util.isString(message.headUrl))
                    return "headUrl: string expected";
            if (message.balanceAvail != null && message.hasOwnProperty("balanceAvail"))
                if (typeof message.balanceAvail !== "number")
                    return "balanceAvail: number expected";
            if (message.sumWinRound != null && message.hasOwnProperty("sumWinRound"))
                if (!$util.isInteger(message.sumWinRound))
                    return "sumWinRound: integer expected";
            if (message.sumBetVal != null && message.hasOwnProperty("sumBetVal"))
                if (!$util.isInteger(message.sumBetVal) && !(message.sumBetVal && $util.isInteger(message.sumBetVal.low) && $util.isInteger(message.sumBetVal.high)))
                    return "sumBetVal: integer|Long expected";
            if (message.userID != null && message.hasOwnProperty("userID"))
                if (!$util.isInteger(message.userID))
                    return "userID: integer expected";
            return null;
        };

        /**
         * Creates a UserInfoRank message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UserInfoRank
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UserInfoRank} UserInfoRank
         */
        UserInfoRank.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UserInfoRank)
                return object;
            var message = new $root.msg.UserInfoRank();
            if (object.userName != null)
                message.userName = String(object.userName);
            if (object.headUrl != null)
                message.headUrl = String(object.headUrl);
            if (object.balanceAvail != null)
                message.balanceAvail = Number(object.balanceAvail);
            if (object.sumWinRound != null)
                message.sumWinRound = object.sumWinRound | 0;
            if (object.sumBetVal != null)
                if ($util.Long)
                    (message.sumBetVal = $util.Long.fromValue(object.sumBetVal)).unsigned = false;
                else if (typeof object.sumBetVal === "string")
                    message.sumBetVal = parseInt(object.sumBetVal, 10);
                else if (typeof object.sumBetVal === "number")
                    message.sumBetVal = object.sumBetVal;
                else if (typeof object.sumBetVal === "object")
                    message.sumBetVal = new $util.LongBits(object.sumBetVal.low >>> 0, object.sumBetVal.high >>> 0).toNumber();
            if (object.userID != null)
                message.userID = object.userID | 0;
            return message;
        };

        /**
         * Creates a plain object from a UserInfoRank message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UserInfoRank
         * @static
         * @param {msg.UserInfoRank} message UserInfoRank
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserInfoRank.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userName = "";
                object.headUrl = "";
                object.balanceAvail = 0;
                object.sumWinRound = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.sumBetVal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sumBetVal = options.longs === String ? "0" : 0;
                object.userID = 0;
            }
            if (message.userName != null && message.hasOwnProperty("userName"))
                object.userName = message.userName;
            if (message.headUrl != null && message.hasOwnProperty("headUrl"))
                object.headUrl = message.headUrl;
            if (message.balanceAvail != null && message.hasOwnProperty("balanceAvail"))
                object.balanceAvail = options.json && !isFinite(message.balanceAvail) ? String(message.balanceAvail) : message.balanceAvail;
            if (message.sumWinRound != null && message.hasOwnProperty("sumWinRound"))
                object.sumWinRound = message.sumWinRound;
            if (message.sumBetVal != null && message.hasOwnProperty("sumBetVal"))
                if (typeof message.sumBetVal === "number")
                    object.sumBetVal = options.longs === String ? String(message.sumBetVal) : message.sumBetVal;
                else
                    object.sumBetVal = options.longs === String ? $util.Long.prototype.toString.call(message.sumBetVal) : options.longs === Number ? new $util.LongBits(message.sumBetVal.low >>> 0, message.sumBetVal.high >>> 0).toNumber() : message.sumBetVal;
            if (message.userID != null && message.hasOwnProperty("userID"))
                object.userID = message.userID;
            return object;
        };

        /**
         * Converts this UserInfoRank to JSON.
         * @function toJSON
         * @memberof msg.UserInfoRank
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserInfoRank.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserInfoRank;
    })();

    msg.UserRankResponse = (function() {

        /**
         * Properties of a UserRankResponse.
         * @memberof msg
         * @interface IUserRankResponse
         * @property {number|Long|null} [serverTime] UserRankResponse serverTime
         * @property {number|null} [code] UserRankResponse code
         * @property {Array.<msg.IUserInfoRank>|null} [Users] UserRankResponse Users
         */

        /**
         * Constructs a new UserRankResponse.
         * @memberof msg
         * @classdesc Represents a UserRankResponse.
         * @implements IUserRankResponse
         * @constructor
         * @param {msg.IUserRankResponse=} [properties] Properties to set
         */
        function UserRankResponse(properties) {
            this.Users = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRankResponse serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.UserRankResponse
         * @instance
         */
        UserRankResponse.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserRankResponse code.
         * @member {number} code
         * @memberof msg.UserRankResponse
         * @instance
         */
        UserRankResponse.prototype.code = 0;

        /**
         * UserRankResponse Users.
         * @member {Array.<msg.IUserInfoRank>} Users
         * @memberof msg.UserRankResponse
         * @instance
         */
        UserRankResponse.prototype.Users = $util.emptyArray;

        /**
         * Creates a new UserRankResponse instance using the specified properties.
         * @function create
         * @memberof msg.UserRankResponse
         * @static
         * @param {msg.IUserRankResponse=} [properties] Properties to set
         * @returns {msg.UserRankResponse} UserRankResponse instance
         */
        UserRankResponse.create = function create(properties) {
            return new UserRankResponse(properties);
        };

        /**
         * Encodes the specified UserRankResponse message. Does not implicitly {@link msg.UserRankResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.UserRankResponse
         * @static
         * @param {msg.IUserRankResponse} message UserRankResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRankResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.Users != null && message.Users.length)
                for (var i = 0; i < message.Users.length; ++i)
                    $root.msg.UserInfoRank.encode(message.Users[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserRankResponse message, length delimited. Does not implicitly {@link msg.UserRankResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UserRankResponse
         * @static
         * @param {msg.IUserRankResponse} message UserRankResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRankResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserRankResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UserRankResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UserRankResponse} UserRankResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRankResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UserRankResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    if (!(message.Users && message.Users.length))
                        message.Users = [];
                    message.Users.push($root.msg.UserInfoRank.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserRankResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UserRankResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UserRankResponse} UserRankResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRankResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRankResponse message.
         * @function verify
         * @memberof msg.UserRankResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRankResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.Users != null && message.hasOwnProperty("Users")) {
                if (!Array.isArray(message.Users))
                    return "Users: array expected";
                for (var i = 0; i < message.Users.length; ++i) {
                    var error = $root.msg.UserInfoRank.verify(message.Users[i]);
                    if (error)
                        return "Users." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UserRankResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UserRankResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UserRankResponse} UserRankResponse
         */
        UserRankResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UserRankResponse)
                return object;
            var message = new $root.msg.UserRankResponse();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.Users) {
                if (!Array.isArray(object.Users))
                    throw TypeError(".msg.UserRankResponse.Users: array expected");
                message.Users = [];
                for (var i = 0; i < object.Users.length; ++i) {
                    if (typeof object.Users[i] !== "object")
                        throw TypeError(".msg.UserRankResponse.Users: object expected");
                    message.Users[i] = $root.msg.UserInfoRank.fromObject(object.Users[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UserRankResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UserRankResponse
         * @static
         * @param {msg.UserRankResponse} message UserRankResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRankResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.Users = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.Users && message.Users.length) {
                object.Users = [];
                for (var j = 0; j < message.Users.length; ++j)
                    object.Users[j] = $root.msg.UserInfoRank.toObject(message.Users[j], options);
            }
            return object;
        };

        /**
         * Converts this UserRankResponse to JSON.
         * @function toJSON
         * @memberof msg.UserRankResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRankResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserRankResponse;
    })();

    msg.CancelRoundPush = (function() {

        /**
         * Properties of a CancelRoundPush.
         * @memberof msg
         * @interface ICancelRoundPush
         * @property {number|Long|null} [serverTime] CancelRoundPush serverTime
         * @property {number|null} [code] CancelRoundPush code
         * @property {string|null} [issueID] CancelRoundPush issueID
         */

        /**
         * Constructs a new CancelRoundPush.
         * @memberof msg
         * @classdesc Represents a CancelRoundPush.
         * @implements ICancelRoundPush
         * @constructor
         * @param {msg.ICancelRoundPush=} [properties] Properties to set
         */
        function CancelRoundPush(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CancelRoundPush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.CancelRoundPush
         * @instance
         */
        CancelRoundPush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CancelRoundPush code.
         * @member {number} code
         * @memberof msg.CancelRoundPush
         * @instance
         */
        CancelRoundPush.prototype.code = 0;

        /**
         * CancelRoundPush issueID.
         * @member {string} issueID
         * @memberof msg.CancelRoundPush
         * @instance
         */
        CancelRoundPush.prototype.issueID = "";

        /**
         * Creates a new CancelRoundPush instance using the specified properties.
         * @function create
         * @memberof msg.CancelRoundPush
         * @static
         * @param {msg.ICancelRoundPush=} [properties] Properties to set
         * @returns {msg.CancelRoundPush} CancelRoundPush instance
         */
        CancelRoundPush.create = function create(properties) {
            return new CancelRoundPush(properties);
        };

        /**
         * Encodes the specified CancelRoundPush message. Does not implicitly {@link msg.CancelRoundPush.verify|verify} messages.
         * @function encode
         * @memberof msg.CancelRoundPush
         * @static
         * @param {msg.ICancelRoundPush} message CancelRoundPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelRoundPush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.issueID != null && Object.hasOwnProperty.call(message, "issueID"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.issueID);
            return writer;
        };

        /**
         * Encodes the specified CancelRoundPush message, length delimited. Does not implicitly {@link msg.CancelRoundPush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.CancelRoundPush
         * @static
         * @param {msg.ICancelRoundPush} message CancelRoundPush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelRoundPush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CancelRoundPush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.CancelRoundPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.CancelRoundPush} CancelRoundPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelRoundPush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.CancelRoundPush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.issueID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CancelRoundPush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.CancelRoundPush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.CancelRoundPush} CancelRoundPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelRoundPush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CancelRoundPush message.
         * @function verify
         * @memberof msg.CancelRoundPush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CancelRoundPush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.issueID != null && message.hasOwnProperty("issueID"))
                if (!$util.isString(message.issueID))
                    return "issueID: string expected";
            return null;
        };

        /**
         * Creates a CancelRoundPush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.CancelRoundPush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.CancelRoundPush} CancelRoundPush
         */
        CancelRoundPush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.CancelRoundPush)
                return object;
            var message = new $root.msg.CancelRoundPush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.issueID != null)
                message.issueID = String(object.issueID);
            return message;
        };

        /**
         * Creates a plain object from a CancelRoundPush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.CancelRoundPush
         * @static
         * @param {msg.CancelRoundPush} message CancelRoundPush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CancelRoundPush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
                object.issueID = "";
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.issueID != null && message.hasOwnProperty("issueID"))
                object.issueID = message.issueID;
            return object;
        };

        /**
         * Converts this CancelRoundPush to JSON.
         * @function toJSON
         * @memberof msg.CancelRoundPush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CancelRoundPush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CancelRoundPush;
    })();

    msg.BetRecordRequest = (function() {

        /**
         * Properties of a BetRecordRequest.
         * @memberof msg
         * @interface IBetRecordRequest
         * @property {number|null} [userID] BetRecordRequest userID
         */

        /**
         * Constructs a new BetRecordRequest.
         * @memberof msg
         * @classdesc Represents a BetRecordRequest.
         * @implements IBetRecordRequest
         * @constructor
         * @param {msg.IBetRecordRequest=} [properties] Properties to set
         */
        function BetRecordRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetRecordRequest userID.
         * @member {number} userID
         * @memberof msg.BetRecordRequest
         * @instance
         */
        BetRecordRequest.prototype.userID = 0;

        /**
         * Creates a new BetRecordRequest instance using the specified properties.
         * @function create
         * @memberof msg.BetRecordRequest
         * @static
         * @param {msg.IBetRecordRequest=} [properties] Properties to set
         * @returns {msg.BetRecordRequest} BetRecordRequest instance
         */
        BetRecordRequest.create = function create(properties) {
            return new BetRecordRequest(properties);
        };

        /**
         * Encodes the specified BetRecordRequest message. Does not implicitly {@link msg.BetRecordRequest.verify|verify} messages.
         * @function encode
         * @memberof msg.BetRecordRequest
         * @static
         * @param {msg.IBetRecordRequest} message BetRecordRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetRecordRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userID);
            return writer;
        };

        /**
         * Encodes the specified BetRecordRequest message, length delimited. Does not implicitly {@link msg.BetRecordRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BetRecordRequest
         * @static
         * @param {msg.IBetRecordRequest} message BetRecordRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetRecordRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetRecordRequest message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BetRecordRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BetRecordRequest} BetRecordRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetRecordRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BetRecordRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetRecordRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BetRecordRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BetRecordRequest} BetRecordRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetRecordRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetRecordRequest message.
         * @function verify
         * @memberof msg.BetRecordRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetRecordRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userID != null && message.hasOwnProperty("userID"))
                if (!$util.isInteger(message.userID))
                    return "userID: integer expected";
            return null;
        };

        /**
         * Creates a BetRecordRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BetRecordRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BetRecordRequest} BetRecordRequest
         */
        BetRecordRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BetRecordRequest)
                return object;
            var message = new $root.msg.BetRecordRequest();
            if (object.userID != null)
                message.userID = object.userID | 0;
            return message;
        };

        /**
         * Creates a plain object from a BetRecordRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BetRecordRequest
         * @static
         * @param {msg.BetRecordRequest} message BetRecordRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetRecordRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.userID = 0;
            if (message.userID != null && message.hasOwnProperty("userID"))
                object.userID = message.userID;
            return object;
        };

        /**
         * Converts this BetRecordRequest to JSON.
         * @function toJSON
         * @memberof msg.BetRecordRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetRecordRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetRecordRequest;
    })();

    msg.BetRecordResponse = (function() {

        /**
         * Properties of a BetRecordResponse.
         * @memberof msg
         * @interface IBetRecordResponse
         * @property {number|Long|null} [serverTime] BetRecordResponse serverTime
         * @property {number|null} [code] BetRecordResponse code
         * @property {Array.<msg.BetRecordResponse.IR>|null} [list] BetRecordResponse list
         */

        /**
         * Constructs a new BetRecordResponse.
         * @memberof msg
         * @classdesc Represents a BetRecordResponse.
         * @implements IBetRecordResponse
         * @constructor
         * @param {msg.IBetRecordResponse=} [properties] Properties to set
         */
        function BetRecordResponse(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetRecordResponse serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.BetRecordResponse
         * @instance
         */
        BetRecordResponse.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BetRecordResponse code.
         * @member {number} code
         * @memberof msg.BetRecordResponse
         * @instance
         */
        BetRecordResponse.prototype.code = 0;

        /**
         * BetRecordResponse list.
         * @member {Array.<msg.BetRecordResponse.IR>} list
         * @memberof msg.BetRecordResponse
         * @instance
         */
        BetRecordResponse.prototype.list = $util.emptyArray;

        /**
         * Creates a new BetRecordResponse instance using the specified properties.
         * @function create
         * @memberof msg.BetRecordResponse
         * @static
         * @param {msg.IBetRecordResponse=} [properties] Properties to set
         * @returns {msg.BetRecordResponse} BetRecordResponse instance
         */
        BetRecordResponse.create = function create(properties) {
            return new BetRecordResponse(properties);
        };

        /**
         * Encodes the specified BetRecordResponse message. Does not implicitly {@link msg.BetRecordResponse.verify|verify} messages.
         * @function encode
         * @memberof msg.BetRecordResponse
         * @static
         * @param {msg.IBetRecordResponse} message BetRecordResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetRecordResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.msg.BetRecordResponse.R.encode(message.list[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BetRecordResponse message, length delimited. Does not implicitly {@link msg.BetRecordResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BetRecordResponse
         * @static
         * @param {msg.IBetRecordResponse} message BetRecordResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetRecordResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetRecordResponse message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BetRecordResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BetRecordResponse} BetRecordResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetRecordResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BetRecordResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.msg.BetRecordResponse.R.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetRecordResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BetRecordResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BetRecordResponse} BetRecordResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetRecordResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetRecordResponse message.
         * @function verify
         * @memberof msg.BetRecordResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetRecordResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.msg.BetRecordResponse.R.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BetRecordResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BetRecordResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BetRecordResponse} BetRecordResponse
         */
        BetRecordResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BetRecordResponse)
                return object;
            var message = new $root.msg.BetRecordResponse();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".msg.BetRecordResponse.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".msg.BetRecordResponse.list: object expected");
                    message.list[i] = $root.msg.BetRecordResponse.R.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BetRecordResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BetRecordResponse
         * @static
         * @param {msg.BetRecordResponse} message BetRecordResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetRecordResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.code = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.msg.BetRecordResponse.R.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this BetRecordResponse to JSON.
         * @function toJSON
         * @memberof msg.BetRecordResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetRecordResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BetRecordResponse.R = (function() {

            /**
             * Properties of a R.
             * @memberof msg.BetRecordResponse
             * @interface IR
             * @property {string|null} [issueID] R issueID
             * @property {string|null} [luckyNum] R luckyNum
             * @property {Array.<msg.IInfoBet>|null} [bets] R bets
             * @property {number|null} [offset] R offset
             */

            /**
             * Constructs a new R.
             * @memberof msg.BetRecordResponse
             * @classdesc Represents a R.
             * @implements IR
             * @constructor
             * @param {msg.BetRecordResponse.IR=} [properties] Properties to set
             */
            function R(properties) {
                this.bets = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * R issueID.
             * @member {string} issueID
             * @memberof msg.BetRecordResponse.R
             * @instance
             */
            R.prototype.issueID = "";

            /**
             * R luckyNum.
             * @member {string} luckyNum
             * @memberof msg.BetRecordResponse.R
             * @instance
             */
            R.prototype.luckyNum = "";

            /**
             * R bets.
             * @member {Array.<msg.IInfoBet>} bets
             * @memberof msg.BetRecordResponse.R
             * @instance
             */
            R.prototype.bets = $util.emptyArray;

            /**
             * R offset.
             * @member {number} offset
             * @memberof msg.BetRecordResponse.R
             * @instance
             */
            R.prototype.offset = 0;

            /**
             * Creates a new R instance using the specified properties.
             * @function create
             * @memberof msg.BetRecordResponse.R
             * @static
             * @param {msg.BetRecordResponse.IR=} [properties] Properties to set
             * @returns {msg.BetRecordResponse.R} R instance
             */
            R.create = function create(properties) {
                return new R(properties);
            };

            /**
             * Encodes the specified R message. Does not implicitly {@link msg.BetRecordResponse.R.verify|verify} messages.
             * @function encode
             * @memberof msg.BetRecordResponse.R
             * @static
             * @param {msg.BetRecordResponse.IR} message R message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            R.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.issueID != null && Object.hasOwnProperty.call(message, "issueID"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.issueID);
                if (message.luckyNum != null && Object.hasOwnProperty.call(message, "luckyNum"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.luckyNum);
                if (message.bets != null && message.bets.length)
                    for (var i = 0; i < message.bets.length; ++i)
                        $root.msg.InfoBet.encode(message.bets[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                    writer.uint32(/* id 4, wireType 5 =*/37).float(message.offset);
                return writer;
            };

            /**
             * Encodes the specified R message, length delimited. Does not implicitly {@link msg.BetRecordResponse.R.verify|verify} messages.
             * @function encodeDelimited
             * @memberof msg.BetRecordResponse.R
             * @static
             * @param {msg.BetRecordResponse.IR} message R message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            R.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a R message from the specified reader or buffer.
             * @function decode
             * @memberof msg.BetRecordResponse.R
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {msg.BetRecordResponse.R} R
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            R.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BetRecordResponse.R();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.issueID = reader.string();
                        break;
                    case 2:
                        message.luckyNum = reader.string();
                        break;
                    case 3:
                        if (!(message.bets && message.bets.length))
                            message.bets = [];
                        message.bets.push($root.msg.InfoBet.decode(reader, reader.uint32()));
                        break;
                    case 4:
                        message.offset = reader.float();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a R message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof msg.BetRecordResponse.R
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {msg.BetRecordResponse.R} R
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            R.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a R message.
             * @function verify
             * @memberof msg.BetRecordResponse.R
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            R.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.issueID != null && message.hasOwnProperty("issueID"))
                    if (!$util.isString(message.issueID))
                        return "issueID: string expected";
                if (message.luckyNum != null && message.hasOwnProperty("luckyNum"))
                    if (!$util.isString(message.luckyNum))
                        return "luckyNum: string expected";
                if (message.bets != null && message.hasOwnProperty("bets")) {
                    if (!Array.isArray(message.bets))
                        return "bets: array expected";
                    for (var i = 0; i < message.bets.length; ++i) {
                        var error = $root.msg.InfoBet.verify(message.bets[i]);
                        if (error)
                            return "bets." + error;
                    }
                }
                if (message.offset != null && message.hasOwnProperty("offset"))
                    if (typeof message.offset !== "number")
                        return "offset: number expected";
                return null;
            };

            /**
             * Creates a R message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof msg.BetRecordResponse.R
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {msg.BetRecordResponse.R} R
             */
            R.fromObject = function fromObject(object) {
                if (object instanceof $root.msg.BetRecordResponse.R)
                    return object;
                var message = new $root.msg.BetRecordResponse.R();
                if (object.issueID != null)
                    message.issueID = String(object.issueID);
                if (object.luckyNum != null)
                    message.luckyNum = String(object.luckyNum);
                if (object.bets) {
                    if (!Array.isArray(object.bets))
                        throw TypeError(".msg.BetRecordResponse.R.bets: array expected");
                    message.bets = [];
                    for (var i = 0; i < object.bets.length; ++i) {
                        if (typeof object.bets[i] !== "object")
                            throw TypeError(".msg.BetRecordResponse.R.bets: object expected");
                        message.bets[i] = $root.msg.InfoBet.fromObject(object.bets[i]);
                    }
                }
                if (object.offset != null)
                    message.offset = Number(object.offset);
                return message;
            };

            /**
             * Creates a plain object from a R message. Also converts values to other types if specified.
             * @function toObject
             * @memberof msg.BetRecordResponse.R
             * @static
             * @param {msg.BetRecordResponse.R} message R
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            R.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.bets = [];
                if (options.defaults) {
                    object.issueID = "";
                    object.luckyNum = "";
                    object.offset = 0;
                }
                if (message.issueID != null && message.hasOwnProperty("issueID"))
                    object.issueID = message.issueID;
                if (message.luckyNum != null && message.hasOwnProperty("luckyNum"))
                    object.luckyNum = message.luckyNum;
                if (message.bets && message.bets.length) {
                    object.bets = [];
                    for (var j = 0; j < message.bets.length; ++j)
                        object.bets[j] = $root.msg.InfoBet.toObject(message.bets[j], options);
                }
                if (message.offset != null && message.hasOwnProperty("offset"))
                    object.offset = options.json && !isFinite(message.offset) ? String(message.offset) : message.offset;
                return object;
            };

            /**
             * Converts this R to JSON.
             * @function toJSON
             * @memberof msg.BetRecordResponse.R
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            R.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return R;
        })();

        return BetRecordResponse;
    })();

    msg.ZhiBoUpdateBalancePush = (function() {

        /**
         * Properties of a ZhiBoUpdateBalancePush.
         * @memberof msg
         * @interface IZhiBoUpdateBalancePush
         * @property {number|Long|null} [serverTime] ZhiBoUpdateBalancePush serverTime
         * @property {number|null} [userID] ZhiBoUpdateBalancePush userID
         * @property {number|null} [balance] ZhiBoUpdateBalancePush balance
         * @property {number|null} [lockMoney] ZhiBoUpdateBalancePush lockMoney
         * @property {number|null} [giftMoney] ZhiBoUpdateBalancePush giftMoney
         */

        /**
         * Constructs a new ZhiBoUpdateBalancePush.
         * @memberof msg
         * @classdesc Represents a ZhiBoUpdateBalancePush.
         * @implements IZhiBoUpdateBalancePush
         * @constructor
         * @param {msg.IZhiBoUpdateBalancePush=} [properties] Properties to set
         */
        function ZhiBoUpdateBalancePush(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ZhiBoUpdateBalancePush serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.ZhiBoUpdateBalancePush
         * @instance
         */
        ZhiBoUpdateBalancePush.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ZhiBoUpdateBalancePush userID.
         * @member {number} userID
         * @memberof msg.ZhiBoUpdateBalancePush
         * @instance
         */
        ZhiBoUpdateBalancePush.prototype.userID = 0;

        /**
         * ZhiBoUpdateBalancePush balance.
         * @member {number} balance
         * @memberof msg.ZhiBoUpdateBalancePush
         * @instance
         */
        ZhiBoUpdateBalancePush.prototype.balance = 0;

        /**
         * ZhiBoUpdateBalancePush lockMoney.
         * @member {number} lockMoney
         * @memberof msg.ZhiBoUpdateBalancePush
         * @instance
         */
        ZhiBoUpdateBalancePush.prototype.lockMoney = 0;

        /**
         * ZhiBoUpdateBalancePush giftMoney.
         * @member {number} giftMoney
         * @memberof msg.ZhiBoUpdateBalancePush
         * @instance
         */
        ZhiBoUpdateBalancePush.prototype.giftMoney = 0;

        /**
         * Creates a new ZhiBoUpdateBalancePush instance using the specified properties.
         * @function create
         * @memberof msg.ZhiBoUpdateBalancePush
         * @static
         * @param {msg.IZhiBoUpdateBalancePush=} [properties] Properties to set
         * @returns {msg.ZhiBoUpdateBalancePush} ZhiBoUpdateBalancePush instance
         */
        ZhiBoUpdateBalancePush.create = function create(properties) {
            return new ZhiBoUpdateBalancePush(properties);
        };

        /**
         * Encodes the specified ZhiBoUpdateBalancePush message. Does not implicitly {@link msg.ZhiBoUpdateBalancePush.verify|verify} messages.
         * @function encode
         * @memberof msg.ZhiBoUpdateBalancePush
         * @static
         * @param {msg.IZhiBoUpdateBalancePush} message ZhiBoUpdateBalancePush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ZhiBoUpdateBalancePush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.userID);
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.balance);
            if (message.lockMoney != null && Object.hasOwnProperty.call(message, "lockMoney"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.lockMoney);
            if (message.giftMoney != null && Object.hasOwnProperty.call(message, "giftMoney"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.giftMoney);
            return writer;
        };

        /**
         * Encodes the specified ZhiBoUpdateBalancePush message, length delimited. Does not implicitly {@link msg.ZhiBoUpdateBalancePush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ZhiBoUpdateBalancePush
         * @static
         * @param {msg.IZhiBoUpdateBalancePush} message ZhiBoUpdateBalancePush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ZhiBoUpdateBalancePush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ZhiBoUpdateBalancePush message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ZhiBoUpdateBalancePush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ZhiBoUpdateBalancePush} ZhiBoUpdateBalancePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ZhiBoUpdateBalancePush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ZhiBoUpdateBalancePush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.userID = reader.int32();
                    break;
                case 3:
                    message.balance = reader.double();
                    break;
                case 4:
                    message.lockMoney = reader.double();
                    break;
                case 5:
                    message.giftMoney = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ZhiBoUpdateBalancePush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ZhiBoUpdateBalancePush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ZhiBoUpdateBalancePush} ZhiBoUpdateBalancePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ZhiBoUpdateBalancePush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ZhiBoUpdateBalancePush message.
         * @function verify
         * @memberof msg.ZhiBoUpdateBalancePush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ZhiBoUpdateBalancePush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.userID != null && message.hasOwnProperty("userID"))
                if (!$util.isInteger(message.userID))
                    return "userID: integer expected";
            if (message.balance != null && message.hasOwnProperty("balance"))
                if (typeof message.balance !== "number")
                    return "balance: number expected";
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                if (typeof message.lockMoney !== "number")
                    return "lockMoney: number expected";
            if (message.giftMoney != null && message.hasOwnProperty("giftMoney"))
                if (typeof message.giftMoney !== "number")
                    return "giftMoney: number expected";
            return null;
        };

        /**
         * Creates a ZhiBoUpdateBalancePush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ZhiBoUpdateBalancePush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ZhiBoUpdateBalancePush} ZhiBoUpdateBalancePush
         */
        ZhiBoUpdateBalancePush.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ZhiBoUpdateBalancePush)
                return object;
            var message = new $root.msg.ZhiBoUpdateBalancePush();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.userID != null)
                message.userID = object.userID | 0;
            if (object.balance != null)
                message.balance = Number(object.balance);
            if (object.lockMoney != null)
                message.lockMoney = Number(object.lockMoney);
            if (object.giftMoney != null)
                message.giftMoney = Number(object.giftMoney);
            return message;
        };

        /**
         * Creates a plain object from a ZhiBoUpdateBalancePush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ZhiBoUpdateBalancePush
         * @static
         * @param {msg.ZhiBoUpdateBalancePush} message ZhiBoUpdateBalancePush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ZhiBoUpdateBalancePush.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.userID = 0;
                object.balance = 0;
                object.lockMoney = 0;
                object.giftMoney = 0;
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.userID != null && message.hasOwnProperty("userID"))
                object.userID = message.userID;
            if (message.balance != null && message.hasOwnProperty("balance"))
                object.balance = options.json && !isFinite(message.balance) ? String(message.balance) : message.balance;
            if (message.lockMoney != null && message.hasOwnProperty("lockMoney"))
                object.lockMoney = options.json && !isFinite(message.lockMoney) ? String(message.lockMoney) : message.lockMoney;
            if (message.giftMoney != null && message.hasOwnProperty("giftMoney"))
                object.giftMoney = options.json && !isFinite(message.giftMoney) ? String(message.giftMoney) : message.giftMoney;
            return object;
        };

        /**
         * Converts this ZhiBoUpdateBalancePush to JSON.
         * @function toJSON
         * @memberof msg.ZhiBoUpdateBalancePush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ZhiBoUpdateBalancePush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ZhiBoUpdateBalancePush;
    })();

    return msg;
})();

module.exports = $root;
