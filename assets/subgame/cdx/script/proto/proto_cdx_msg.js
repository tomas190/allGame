/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("./cocos_proto");

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
     * MessageID enum.
     * @name msg.MessageID
     * @enum {string}
     * @property {number} MSG_Ping=0 MSG_Ping value
     * @property {number} MSG_Pong=1 MSG_Pong value
     * @property {number} MSG_Login_C2S=2 MSG_Login_C2S value
     * @property {number} MSG_Login_S2C=3 MSG_Login_S2C value
     * @property {number} MSG_Logout_C2S=4 MSG_Logout_C2S value
     * @property {number} MSG_Logout_S2C=5 MSG_Logout_S2C value
     * @property {number} MSG_JoinRoom_C2S=6 MSG_JoinRoom_C2S value
     * @property {number} MSG_JoinRoom_S2C=7 MSG_JoinRoom_S2C value
     * @property {number} MSG_EnterRoom_S2C=8 MSG_EnterRoom_S2C value
     * @property {number} MSG_LeaveRoom_C2S=9 MSG_LeaveRoom_C2S value
     * @property {number} MSG_LeaveRoom_S2C=10 MSG_LeaveRoom_S2C value
     * @property {number} MSG_ActionTime_S2C=11 MSG_ActionTime_S2C value
     * @property {number} MSG_PlayerAction_C2S=12 MSG_PlayerAction_C2S value
     * @property {number} MSG_PlayerAction_S2C=13 MSG_PlayerAction_S2C value
     * @property {number} MSG_PotChangeMoney_S2C=14 MSG_PotChangeMoney_S2C value
     * @property {number} MSG_UptPlayerList_S2C=15 MSG_UptPlayerList_S2C value
     * @property {number} MSG_ResultData_S2C=16 MSG_ResultData_S2C value
     * @property {number} MSG_BankerData_C2S=17 MSG_BankerData_C2S value
     * @property {number} MSG_BankerData_S2C=18 MSG_BankerData_S2C value
     * @property {number} MSG_EmojiChat_C2S=19 MSG_EmojiChat_C2S value
     * @property {number} MSG_EmojiChat_S2C=20 MSG_EmojiChat_S2C value
     * @property {number} MSG_SendActTime_S2C=21 MSG_SendActTime_S2C value
     */
    msg.MessageID = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "MSG_Ping"] = 0;
        values[valuesById[1] = "MSG_Pong"] = 1;
        values[valuesById[2] = "MSG_Login_C2S"] = 2;
        values[valuesById[3] = "MSG_Login_S2C"] = 3;
        values[valuesById[4] = "MSG_Logout_C2S"] = 4;
        values[valuesById[5] = "MSG_Logout_S2C"] = 5;
        values[valuesById[6] = "MSG_JoinRoom_C2S"] = 6;
        values[valuesById[7] = "MSG_JoinRoom_S2C"] = 7;
        values[valuesById[8] = "MSG_EnterRoom_S2C"] = 8;
        values[valuesById[9] = "MSG_LeaveRoom_C2S"] = 9;
        values[valuesById[10] = "MSG_LeaveRoom_S2C"] = 10;
        values[valuesById[11] = "MSG_ActionTime_S2C"] = 11;
        values[valuesById[12] = "MSG_PlayerAction_C2S"] = 12;
        values[valuesById[13] = "MSG_PlayerAction_S2C"] = 13;
        values[valuesById[14] = "MSG_PotChangeMoney_S2C"] = 14;
        values[valuesById[15] = "MSG_UptPlayerList_S2C"] = 15;
        values[valuesById[16] = "MSG_ResultData_S2C"] = 16;
        values[valuesById[17] = "MSG_BankerData_C2S"] = 17;
        values[valuesById[18] = "MSG_BankerData_S2C"] = 18;
        values[valuesById[19] = "MSG_EmojiChat_C2S"] = 19;
        values[valuesById[20] = "MSG_EmojiChat_S2C"] = 20;
        values[valuesById[21] = "MSG_SendActTime_S2C"] = 21;
        return values;
    })();

    /**
     * GameStep enum.
     * @name msg.GameStep
     * @enum {string}
     * @property {number} XX_Step=0 XX_Step value
     * @property {number} Banker=1 Banker value
     * @property {number} Banker2=2 Banker2 value
     * @property {number} DownBet=3 DownBet value
     * @property {number} Settle=4 Settle value
     */
    msg.GameStep = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "XX_Step"] = 0;
        values[valuesById[1] = "Banker"] = 1;
        values[valuesById[2] = "Banker2"] = 2;
        values[valuesById[3] = "DownBet"] = 3;
        values[valuesById[4] = "Settle"] = 4;
        return values;
    })();

    /**
     * PlayerStatus enum.
     * @name msg.PlayerStatus
     * @enum {string}
     * @property {number} XX_Status=0 XX_Status value
     * @property {number} PlayGame=1 PlayGame value
     * @property {number} WatchGame=2 WatchGame value
     */
    msg.PlayerStatus = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "XX_Status"] = 0;
        values[valuesById[1] = "PlayGame"] = 1;
        values[valuesById[2] = "WatchGame"] = 2;
        return values;
    })();

    /**
     * BankerStatus enum.
     * @name msg.BankerStatus
     * @enum {string}
     * @property {number} BankerNot=0 BankerNot value
     * @property {number} BankerUp=1 BankerUp value
     * @property {number} BankerDown=2 BankerDown value
     */
    msg.BankerStatus = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "BankerNot"] = 0;
        values[valuesById[1] = "BankerUp"] = 1;
        values[valuesById[2] = "BankerDown"] = 2;
        return values;
    })();

    /**
     * PotType enum.
     * @name msg.PotType
     * @enum {string}
     * @property {number} XX_Pot=0 XX_Pot value
     * @property {number} BigPot=1 BigPot value
     * @property {number} SmallPot=2 SmallPot value
     * @property {number} SinglePot=3 SinglePot value
     * @property {number} DoublePot=4 DoublePot value
     * @property {number} PairPot=5 PairPot value
     * @property {number} StraightPot=6 StraightPot value
     * @property {number} LeopardPot=7 LeopardPot value
     */
    msg.PotType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "XX_Pot"] = 0;
        values[valuesById[1] = "BigPot"] = 1;
        values[valuesById[2] = "SmallPot"] = 2;
        values[valuesById[3] = "SinglePot"] = 3;
        values[valuesById[4] = "DoublePot"] = 4;
        values[valuesById[5] = "PairPot"] = 5;
        values[valuesById[6] = "StraightPot"] = 6;
        values[valuesById[7] = "LeopardPot"] = 7;
        return values;
    })();

    /**
     * CardsType enum.
     * @name msg.CardsType
     * @enum {string}
     * @property {number} XX_Card=0 XX_Card value
     * @property {number} Pair=1 Pair value
     * @property {number} Straight=2 Straight value
     * @property {number} Leopard=3 Leopard value
     */
    msg.CardsType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "XX_Card"] = 0;
        values[valuesById[1] = "Pair"] = 1;
        values[valuesById[2] = "Straight"] = 2;
        values[valuesById[3] = "Leopard"] = 3;
        return values;
    })();

    msg.Ping = (function() {

        /**
         * Properties of a Ping.
         * @memberof msg
         * @interface IPing
         */

        /**
         * Constructs a new Ping.
         * @memberof msg
         * @classdesc Represents a Ping.
         * @implements IPing
         * @constructor
         * @param {msg.IPing=} [properties] Properties to set
         */
        function Ping(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Ping instance using the specified properties.
         * @function create
         * @memberof msg.Ping
         * @static
         * @param {msg.IPing=} [properties] Properties to set
         * @returns {msg.Ping} Ping instance
         */
        Ping.create = function create(properties) {
            return new Ping(properties);
        };

        /**
         * Encodes the specified Ping message. Does not implicitly {@link msg.Ping.verify|verify} messages.
         * @function encode
         * @memberof msg.Ping
         * @static
         * @param {msg.IPing} message Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ping.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Ping message, length delimited. Does not implicitly {@link msg.Ping.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.Ping
         * @static
         * @param {msg.IPing} message Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ping.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Ping message from the specified reader or buffer.
         * @function decode
         * @memberof msg.Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.Ping} Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ping.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Ping();
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
         * Decodes a Ping message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.Ping} Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ping.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Ping message.
         * @function verify
         * @memberof msg.Ping
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ping.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Ping message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.Ping
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.Ping} Ping
         */
        Ping.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.Ping)
                return object;
            return new $root.msg.Ping();
        };

        /**
         * Creates a plain object from a Ping message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.Ping
         * @static
         * @param {msg.Ping} message Ping
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ping.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Ping to JSON.
         * @function toJSON
         * @memberof msg.Ping
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ping.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Ping;
    })();

    msg.Pong = (function() {

        /**
         * Properties of a Pong.
         * @memberof msg
         * @interface IPong
         * @property {number|Long|null} [serverTime] Pong serverTime
         */

        /**
         * Constructs a new Pong.
         * @memberof msg
         * @classdesc Represents a Pong.
         * @implements IPong
         * @constructor
         * @param {msg.IPong=} [properties] Properties to set
         */
        function Pong(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Pong serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.Pong
         * @instance
         */
        Pong.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Pong instance using the specified properties.
         * @function create
         * @memberof msg.Pong
         * @static
         * @param {msg.IPong=} [properties] Properties to set
         * @returns {msg.Pong} Pong instance
         */
        Pong.create = function create(properties) {
            return new Pong(properties);
        };

        /**
         * Encodes the specified Pong message. Does not implicitly {@link msg.Pong.verify|verify} messages.
         * @function encode
         * @memberof msg.Pong
         * @static
         * @param {msg.IPong} message Pong message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pong.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            return writer;
        };

        /**
         * Encodes the specified Pong message, length delimited. Does not implicitly {@link msg.Pong.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.Pong
         * @static
         * @param {msg.IPong} message Pong message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pong.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Pong message from the specified reader or buffer.
         * @function decode
         * @memberof msg.Pong
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.Pong} Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pong.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Pong();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
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
         * Decodes a Pong message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.Pong
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.Pong} Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pong.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Pong message.
         * @function verify
         * @memberof msg.Pong
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Pong.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a Pong message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.Pong
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.Pong} Pong
         */
        Pong.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.Pong)
                return object;
            var message = new $root.msg.Pong();
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
         * Creates a plain object from a Pong message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.Pong
         * @static
         * @param {msg.Pong} message Pong
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Pong.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            return object;
        };

        /**
         * Converts this Pong to JSON.
         * @function toJSON
         * @memberof msg.Pong
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Pong.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Pong;
    })();

    msg.PlayerInfo = (function() {

        /**
         * Properties of a PlayerInfo.
         * @memberof msg
         * @interface IPlayerInfo
         * @property {string|null} [Id] PlayerInfo Id
         * @property {string|null} [nickName] PlayerInfo nickName
         * @property {string|null} [headImg] PlayerInfo headImg
         * @property {number|null} [account] PlayerInfo account
         */

        /**
         * Constructs a new PlayerInfo.
         * @memberof msg
         * @classdesc Represents a PlayerInfo.
         * @implements IPlayerInfo
         * @constructor
         * @param {msg.IPlayerInfo=} [properties] Properties to set
         */
        function PlayerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfo Id.
         * @member {string} Id
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.Id = "";

        /**
         * PlayerInfo nickName.
         * @member {string} nickName
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.nickName = "";

        /**
         * PlayerInfo headImg.
         * @member {string} headImg
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.headImg = "";

        /**
         * PlayerInfo account.
         * @member {number} account
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.account = 0;

        /**
         * Creates a new PlayerInfo instance using the specified properties.
         * @function create
         * @memberof msg.PlayerInfo
         * @static
         * @param {msg.IPlayerInfo=} [properties] Properties to set
         * @returns {msg.PlayerInfo} PlayerInfo instance
         */
        PlayerInfo.create = function create(properties) {
            return new PlayerInfo(properties);
        };

        /**
         * Encodes the specified PlayerInfo message. Does not implicitly {@link msg.PlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerInfo
         * @static
         * @param {msg.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Id != null && message.hasOwnProperty("Id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Id);
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickName);
            if (message.headImg != null && message.hasOwnProperty("headImg"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.headImg);
            if (message.account != null && message.hasOwnProperty("account"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.account);
            return writer;
        };

        /**
         * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link msg.PlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerInfo
         * @static
         * @param {msg.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Id = reader.string();
                    break;
                case 2:
                    message.nickName = reader.string();
                    break;
                case 3:
                    message.headImg = reader.string();
                    break;
                case 4:
                    message.account = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfo message.
         * @function verify
         * @memberof msg.PlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Id != null && message.hasOwnProperty("Id"))
                if (!$util.isString(message.Id))
                    return "Id: string expected";
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                if (!$util.isString(message.nickName))
                    return "nickName: string expected";
            if (message.headImg != null && message.hasOwnProperty("headImg"))
                if (!$util.isString(message.headImg))
                    return "headImg: string expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (typeof message.account !== "number")
                    return "account: number expected";
            return null;
        };

        /**
         * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerInfo} PlayerInfo
         */
        PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerInfo)
                return object;
            var message = new $root.msg.PlayerInfo();
            if (object.Id != null)
                message.Id = String(object.Id);
            if (object.nickName != null)
                message.nickName = String(object.nickName);
            if (object.headImg != null)
                message.headImg = String(object.headImg);
            if (object.account != null)
                message.account = Number(object.account);
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerInfo
         * @static
         * @param {msg.PlayerInfo} message PlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Id = "";
                object.nickName = "";
                object.headImg = "";
                object.account = 0;
            }
            if (message.Id != null && message.hasOwnProperty("Id"))
                object.Id = message.Id;
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                object.nickName = message.nickName;
            if (message.headImg != null && message.hasOwnProperty("headImg"))
                object.headImg = message.headImg;
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = options.json && !isFinite(message.account) ? String(message.account) : message.account;
            return object;
        };

        /**
         * Converts this PlayerInfo to JSON.
         * @function toJSON
         * @memberof msg.PlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerInfo;
    })();

    msg.Login_C2S = (function() {

        /**
         * Properties of a Login_C2S.
         * @memberof msg
         * @interface ILogin_C2S
         * @property {string|null} [Id] Login_C2S Id
         * @property {string|null} [PassWord] Login_C2S PassWord
         * @property {string|null} [Token] Login_C2S Token
         */

        /**
         * Constructs a new Login_C2S.
         * @memberof msg
         * @classdesc Represents a Login_C2S.
         * @implements ILogin_C2S
         * @constructor
         * @param {msg.ILogin_C2S=} [properties] Properties to set
         */
        function Login_C2S(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Login_C2S Id.
         * @member {string} Id
         * @memberof msg.Login_C2S
         * @instance
         */
        Login_C2S.prototype.Id = "";

        /**
         * Login_C2S PassWord.
         * @member {string} PassWord
         * @memberof msg.Login_C2S
         * @instance
         */
        Login_C2S.prototype.PassWord = "";

        /**
         * Login_C2S Token.
         * @member {string} Token
         * @memberof msg.Login_C2S
         * @instance
         */
        Login_C2S.prototype.Token = "";

        /**
         * Creates a new Login_C2S instance using the specified properties.
         * @function create
         * @memberof msg.Login_C2S
         * @static
         * @param {msg.ILogin_C2S=} [properties] Properties to set
         * @returns {msg.Login_C2S} Login_C2S instance
         */
        Login_C2S.create = function create(properties) {
            return new Login_C2S(properties);
        };

        /**
         * Encodes the specified Login_C2S message. Does not implicitly {@link msg.Login_C2S.verify|verify} messages.
         * @function encode
         * @memberof msg.Login_C2S
         * @static
         * @param {msg.ILogin_C2S} message Login_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login_C2S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Id != null && message.hasOwnProperty("Id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Id);
            if (message.PassWord != null && message.hasOwnProperty("PassWord"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.PassWord);
            if (message.Token != null && message.hasOwnProperty("Token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.Token);
            return writer;
        };

        /**
         * Encodes the specified Login_C2S message, length delimited. Does not implicitly {@link msg.Login_C2S.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.Login_C2S
         * @static
         * @param {msg.ILogin_C2S} message Login_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login_C2S.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Login_C2S message from the specified reader or buffer.
         * @function decode
         * @memberof msg.Login_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.Login_C2S} Login_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login_C2S.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Login_C2S();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Id = reader.string();
                    break;
                case 2:
                    message.PassWord = reader.string();
                    break;
                case 3:
                    message.Token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Login_C2S message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.Login_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.Login_C2S} Login_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login_C2S.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Login_C2S message.
         * @function verify
         * @memberof msg.Login_C2S
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Login_C2S.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Id != null && message.hasOwnProperty("Id"))
                if (!$util.isString(message.Id))
                    return "Id: string expected";
            if (message.PassWord != null && message.hasOwnProperty("PassWord"))
                if (!$util.isString(message.PassWord))
                    return "PassWord: string expected";
            if (message.Token != null && message.hasOwnProperty("Token"))
                if (!$util.isString(message.Token))
                    return "Token: string expected";
            return null;
        };

        /**
         * Creates a Login_C2S message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.Login_C2S
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.Login_C2S} Login_C2S
         */
        Login_C2S.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.Login_C2S)
                return object;
            var message = new $root.msg.Login_C2S();
            if (object.Id != null)
                message.Id = String(object.Id);
            if (object.PassWord != null)
                message.PassWord = String(object.PassWord);
            if (object.Token != null)
                message.Token = String(object.Token);
            return message;
        };

        /**
         * Creates a plain object from a Login_C2S message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.Login_C2S
         * @static
         * @param {msg.Login_C2S} message Login_C2S
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Login_C2S.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Id = "";
                object.PassWord = "";
                object.Token = "";
            }
            if (message.Id != null && message.hasOwnProperty("Id"))
                object.Id = message.Id;
            if (message.PassWord != null && message.hasOwnProperty("PassWord"))
                object.PassWord = message.PassWord;
            if (message.Token != null && message.hasOwnProperty("Token"))
                object.Token = message.Token;
            return object;
        };

        /**
         * Converts this Login_C2S to JSON.
         * @function toJSON
         * @memberof msg.Login_C2S
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Login_C2S.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Login_C2S;
    })();

    msg.Login_S2C = (function() {

        /**
         * Properties of a Login_S2C.
         * @memberof msg
         * @interface ILogin_S2C
         * @property {msg.IPlayerInfo|null} [playerInfo] Login_S2C playerInfo
         * @property {boolean|null} [backroom] Login_S2C backroom
         * @property {number|null} [PlayerNum] Login_S2C PlayerNum
         */

        /**
         * Constructs a new Login_S2C.
         * @memberof msg
         * @classdesc Represents a Login_S2C.
         * @implements ILogin_S2C
         * @constructor
         * @param {msg.ILogin_S2C=} [properties] Properties to set
         */
        function Login_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Login_S2C playerInfo.
         * @member {msg.IPlayerInfo|null|undefined} playerInfo
         * @memberof msg.Login_S2C
         * @instance
         */
        Login_S2C.prototype.playerInfo = null;

        /**
         * Login_S2C backroom.
         * @member {boolean} backroom
         * @memberof msg.Login_S2C
         * @instance
         */
        Login_S2C.prototype.backroom = false;

        /**
         * Login_S2C PlayerNum.
         * @member {number} PlayerNum
         * @memberof msg.Login_S2C
         * @instance
         */
        Login_S2C.prototype.PlayerNum = 0;

        /**
         * Creates a new Login_S2C instance using the specified properties.
         * @function create
         * @memberof msg.Login_S2C
         * @static
         * @param {msg.ILogin_S2C=} [properties] Properties to set
         * @returns {msg.Login_S2C} Login_S2C instance
         */
        Login_S2C.create = function create(properties) {
            return new Login_S2C(properties);
        };

        /**
         * Encodes the specified Login_S2C message. Does not implicitly {@link msg.Login_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.Login_S2C
         * @static
         * @param {msg.ILogin_S2C} message Login_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                $root.msg.PlayerInfo.encode(message.playerInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.backroom != null && message.hasOwnProperty("backroom"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.backroom);
            if (message.PlayerNum != null && message.hasOwnProperty("PlayerNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.PlayerNum);
            return writer;
        };

        /**
         * Encodes the specified Login_S2C message, length delimited. Does not implicitly {@link msg.Login_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.Login_S2C
         * @static
         * @param {msg.ILogin_S2C} message Login_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Login_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.Login_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.Login_S2C} Login_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Login_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerInfo = $root.msg.PlayerInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.backroom = reader.bool();
                    break;
                case 3:
                    message.PlayerNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Login_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.Login_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.Login_S2C} Login_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Login_S2C message.
         * @function verify
         * @memberof msg.Login_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Login_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo")) {
                var error = $root.msg.PlayerInfo.verify(message.playerInfo);
                if (error)
                    return "playerInfo." + error;
            }
            if (message.backroom != null && message.hasOwnProperty("backroom"))
                if (typeof message.backroom !== "boolean")
                    return "backroom: boolean expected";
            if (message.PlayerNum != null && message.hasOwnProperty("PlayerNum"))
                if (!$util.isInteger(message.PlayerNum))
                    return "PlayerNum: integer expected";
            return null;
        };

        /**
         * Creates a Login_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.Login_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.Login_S2C} Login_S2C
         */
        Login_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.Login_S2C)
                return object;
            var message = new $root.msg.Login_S2C();
            if (object.playerInfo != null) {
                if (typeof object.playerInfo !== "object")
                    throw TypeError(".msg.Login_S2C.playerInfo: object expected");
                message.playerInfo = $root.msg.PlayerInfo.fromObject(object.playerInfo);
            }
            if (object.backroom != null)
                message.backroom = Boolean(object.backroom);
            if (object.PlayerNum != null)
                message.PlayerNum = object.PlayerNum | 0;
            return message;
        };

        /**
         * Creates a plain object from a Login_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.Login_S2C
         * @static
         * @param {msg.Login_S2C} message Login_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Login_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.playerInfo = null;
                object.backroom = false;
                object.PlayerNum = 0;
            }
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                object.playerInfo = $root.msg.PlayerInfo.toObject(message.playerInfo, options);
            if (message.backroom != null && message.hasOwnProperty("backroom"))
                object.backroom = message.backroom;
            if (message.PlayerNum != null && message.hasOwnProperty("PlayerNum"))
                object.PlayerNum = message.PlayerNum;
            return object;
        };

        /**
         * Converts this Login_S2C to JSON.
         * @function toJSON
         * @memberof msg.Login_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Login_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Login_S2C;
    })();

    msg.Logout_C2S = (function() {

        /**
         * Properties of a Logout_C2S.
         * @memberof msg
         * @interface ILogout_C2S
         */

        /**
         * Constructs a new Logout_C2S.
         * @memberof msg
         * @classdesc Represents a Logout_C2S.
         * @implements ILogout_C2S
         * @constructor
         * @param {msg.ILogout_C2S=} [properties] Properties to set
         */
        function Logout_C2S(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Logout_C2S instance using the specified properties.
         * @function create
         * @memberof msg.Logout_C2S
         * @static
         * @param {msg.ILogout_C2S=} [properties] Properties to set
         * @returns {msg.Logout_C2S} Logout_C2S instance
         */
        Logout_C2S.create = function create(properties) {
            return new Logout_C2S(properties);
        };

        /**
         * Encodes the specified Logout_C2S message. Does not implicitly {@link msg.Logout_C2S.verify|verify} messages.
         * @function encode
         * @memberof msg.Logout_C2S
         * @static
         * @param {msg.ILogout_C2S} message Logout_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Logout_C2S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Logout_C2S message, length delimited. Does not implicitly {@link msg.Logout_C2S.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.Logout_C2S
         * @static
         * @param {msg.ILogout_C2S} message Logout_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Logout_C2S.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Logout_C2S message from the specified reader or buffer.
         * @function decode
         * @memberof msg.Logout_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.Logout_C2S} Logout_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Logout_C2S.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Logout_C2S();
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
         * Decodes a Logout_C2S message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.Logout_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.Logout_C2S} Logout_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Logout_C2S.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Logout_C2S message.
         * @function verify
         * @memberof msg.Logout_C2S
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Logout_C2S.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Logout_C2S message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.Logout_C2S
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.Logout_C2S} Logout_C2S
         */
        Logout_C2S.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.Logout_C2S)
                return object;
            return new $root.msg.Logout_C2S();
        };

        /**
         * Creates a plain object from a Logout_C2S message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.Logout_C2S
         * @static
         * @param {msg.Logout_C2S} message Logout_C2S
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Logout_C2S.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Logout_C2S to JSON.
         * @function toJSON
         * @memberof msg.Logout_C2S
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Logout_C2S.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Logout_C2S;
    })();

    msg.Logout_S2C = (function() {

        /**
         * Properties of a Logout_S2C.
         * @memberof msg
         * @interface ILogout_S2C
         */

        /**
         * Constructs a new Logout_S2C.
         * @memberof msg
         * @classdesc Represents a Logout_S2C.
         * @implements ILogout_S2C
         * @constructor
         * @param {msg.ILogout_S2C=} [properties] Properties to set
         */
        function Logout_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Logout_S2C instance using the specified properties.
         * @function create
         * @memberof msg.Logout_S2C
         * @static
         * @param {msg.ILogout_S2C=} [properties] Properties to set
         * @returns {msg.Logout_S2C} Logout_S2C instance
         */
        Logout_S2C.create = function create(properties) {
            return new Logout_S2C(properties);
        };

        /**
         * Encodes the specified Logout_S2C message. Does not implicitly {@link msg.Logout_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.Logout_S2C
         * @static
         * @param {msg.ILogout_S2C} message Logout_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Logout_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Logout_S2C message, length delimited. Does not implicitly {@link msg.Logout_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.Logout_S2C
         * @static
         * @param {msg.ILogout_S2C} message Logout_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Logout_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Logout_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.Logout_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.Logout_S2C} Logout_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Logout_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Logout_S2C();
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
         * Decodes a Logout_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.Logout_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.Logout_S2C} Logout_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Logout_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Logout_S2C message.
         * @function verify
         * @memberof msg.Logout_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Logout_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Logout_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.Logout_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.Logout_S2C} Logout_S2C
         */
        Logout_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.Logout_S2C)
                return object;
            return new $root.msg.Logout_S2C();
        };

        /**
         * Creates a plain object from a Logout_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.Logout_S2C
         * @static
         * @param {msg.Logout_S2C} message Logout_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Logout_S2C.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Logout_S2C to JSON.
         * @function toJSON
         * @memberof msg.Logout_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Logout_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Logout_S2C;
    })();

    msg.DownBetMoney = (function() {

        /**
         * Properties of a DownBetMoney.
         * @memberof msg
         * @interface IDownBetMoney
         * @property {number|null} [BigDownBet] DownBetMoney BigDownBet
         * @property {number|null} [SmallDownBet] DownBetMoney SmallDownBet
         * @property {number|null} [SingleDownBet] DownBetMoney SingleDownBet
         * @property {number|null} [DoubleDownBet] DownBetMoney DoubleDownBet
         * @property {number|null} [PairDownBet] DownBetMoney PairDownBet
         * @property {number|null} [StraightDownBet] DownBetMoney StraightDownBet
         * @property {number|null} [LeopardDownBet] DownBetMoney LeopardDownBet
         */

        /**
         * Constructs a new DownBetMoney.
         * @memberof msg
         * @classdesc Represents a DownBetMoney.
         * @implements IDownBetMoney
         * @constructor
         * @param {msg.IDownBetMoney=} [properties] Properties to set
         */
        function DownBetMoney(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DownBetMoney BigDownBet.
         * @member {number} BigDownBet
         * @memberof msg.DownBetMoney
         * @instance
         */
        DownBetMoney.prototype.BigDownBet = 0;

        /**
         * DownBetMoney SmallDownBet.
         * @member {number} SmallDownBet
         * @memberof msg.DownBetMoney
         * @instance
         */
        DownBetMoney.prototype.SmallDownBet = 0;

        /**
         * DownBetMoney SingleDownBet.
         * @member {number} SingleDownBet
         * @memberof msg.DownBetMoney
         * @instance
         */
        DownBetMoney.prototype.SingleDownBet = 0;

        /**
         * DownBetMoney DoubleDownBet.
         * @member {number} DoubleDownBet
         * @memberof msg.DownBetMoney
         * @instance
         */
        DownBetMoney.prototype.DoubleDownBet = 0;

        /**
         * DownBetMoney PairDownBet.
         * @member {number} PairDownBet
         * @memberof msg.DownBetMoney
         * @instance
         */
        DownBetMoney.prototype.PairDownBet = 0;

        /**
         * DownBetMoney StraightDownBet.
         * @member {number} StraightDownBet
         * @memberof msg.DownBetMoney
         * @instance
         */
        DownBetMoney.prototype.StraightDownBet = 0;

        /**
         * DownBetMoney LeopardDownBet.
         * @member {number} LeopardDownBet
         * @memberof msg.DownBetMoney
         * @instance
         */
        DownBetMoney.prototype.LeopardDownBet = 0;

        /**
         * Creates a new DownBetMoney instance using the specified properties.
         * @function create
         * @memberof msg.DownBetMoney
         * @static
         * @param {msg.IDownBetMoney=} [properties] Properties to set
         * @returns {msg.DownBetMoney} DownBetMoney instance
         */
        DownBetMoney.create = function create(properties) {
            return new DownBetMoney(properties);
        };

        /**
         * Encodes the specified DownBetMoney message. Does not implicitly {@link msg.DownBetMoney.verify|verify} messages.
         * @function encode
         * @memberof msg.DownBetMoney
         * @static
         * @param {msg.IDownBetMoney} message DownBetMoney message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DownBetMoney.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.BigDownBet != null && message.hasOwnProperty("BigDownBet"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.BigDownBet);
            if (message.SmallDownBet != null && message.hasOwnProperty("SmallDownBet"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.SmallDownBet);
            if (message.SingleDownBet != null && message.hasOwnProperty("SingleDownBet"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.SingleDownBet);
            if (message.DoubleDownBet != null && message.hasOwnProperty("DoubleDownBet"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.DoubleDownBet);
            if (message.PairDownBet != null && message.hasOwnProperty("PairDownBet"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.PairDownBet);
            if (message.StraightDownBet != null && message.hasOwnProperty("StraightDownBet"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.StraightDownBet);
            if (message.LeopardDownBet != null && message.hasOwnProperty("LeopardDownBet"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.LeopardDownBet);
            return writer;
        };

        /**
         * Encodes the specified DownBetMoney message, length delimited. Does not implicitly {@link msg.DownBetMoney.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.DownBetMoney
         * @static
         * @param {msg.IDownBetMoney} message DownBetMoney message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DownBetMoney.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DownBetMoney message from the specified reader or buffer.
         * @function decode
         * @memberof msg.DownBetMoney
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.DownBetMoney} DownBetMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DownBetMoney.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.DownBetMoney();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.BigDownBet = reader.int32();
                    break;
                case 2:
                    message.SmallDownBet = reader.int32();
                    break;
                case 3:
                    message.SingleDownBet = reader.int32();
                    break;
                case 4:
                    message.DoubleDownBet = reader.int32();
                    break;
                case 5:
                    message.PairDownBet = reader.int32();
                    break;
                case 6:
                    message.StraightDownBet = reader.int32();
                    break;
                case 7:
                    message.LeopardDownBet = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DownBetMoney message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.DownBetMoney
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.DownBetMoney} DownBetMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DownBetMoney.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DownBetMoney message.
         * @function verify
         * @memberof msg.DownBetMoney
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DownBetMoney.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.BigDownBet != null && message.hasOwnProperty("BigDownBet"))
                if (!$util.isInteger(message.BigDownBet))
                    return "BigDownBet: integer expected";
            if (message.SmallDownBet != null && message.hasOwnProperty("SmallDownBet"))
                if (!$util.isInteger(message.SmallDownBet))
                    return "SmallDownBet: integer expected";
            if (message.SingleDownBet != null && message.hasOwnProperty("SingleDownBet"))
                if (!$util.isInteger(message.SingleDownBet))
                    return "SingleDownBet: integer expected";
            if (message.DoubleDownBet != null && message.hasOwnProperty("DoubleDownBet"))
                if (!$util.isInteger(message.DoubleDownBet))
                    return "DoubleDownBet: integer expected";
            if (message.PairDownBet != null && message.hasOwnProperty("PairDownBet"))
                if (!$util.isInteger(message.PairDownBet))
                    return "PairDownBet: integer expected";
            if (message.StraightDownBet != null && message.hasOwnProperty("StraightDownBet"))
                if (!$util.isInteger(message.StraightDownBet))
                    return "StraightDownBet: integer expected";
            if (message.LeopardDownBet != null && message.hasOwnProperty("LeopardDownBet"))
                if (!$util.isInteger(message.LeopardDownBet))
                    return "LeopardDownBet: integer expected";
            return null;
        };

        /**
         * Creates a DownBetMoney message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.DownBetMoney
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.DownBetMoney} DownBetMoney
         */
        DownBetMoney.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.DownBetMoney)
                return object;
            var message = new $root.msg.DownBetMoney();
            if (object.BigDownBet != null)
                message.BigDownBet = object.BigDownBet | 0;
            if (object.SmallDownBet != null)
                message.SmallDownBet = object.SmallDownBet | 0;
            if (object.SingleDownBet != null)
                message.SingleDownBet = object.SingleDownBet | 0;
            if (object.DoubleDownBet != null)
                message.DoubleDownBet = object.DoubleDownBet | 0;
            if (object.PairDownBet != null)
                message.PairDownBet = object.PairDownBet | 0;
            if (object.StraightDownBet != null)
                message.StraightDownBet = object.StraightDownBet | 0;
            if (object.LeopardDownBet != null)
                message.LeopardDownBet = object.LeopardDownBet | 0;
            return message;
        };

        /**
         * Creates a plain object from a DownBetMoney message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.DownBetMoney
         * @static
         * @param {msg.DownBetMoney} message DownBetMoney
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DownBetMoney.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.BigDownBet = 0;
                object.SmallDownBet = 0;
                object.SingleDownBet = 0;
                object.DoubleDownBet = 0;
                object.PairDownBet = 0;
                object.StraightDownBet = 0;
                object.LeopardDownBet = 0;
            }
            if (message.BigDownBet != null && message.hasOwnProperty("BigDownBet"))
                object.BigDownBet = message.BigDownBet;
            if (message.SmallDownBet != null && message.hasOwnProperty("SmallDownBet"))
                object.SmallDownBet = message.SmallDownBet;
            if (message.SingleDownBet != null && message.hasOwnProperty("SingleDownBet"))
                object.SingleDownBet = message.SingleDownBet;
            if (message.DoubleDownBet != null && message.hasOwnProperty("DoubleDownBet"))
                object.DoubleDownBet = message.DoubleDownBet;
            if (message.PairDownBet != null && message.hasOwnProperty("PairDownBet"))
                object.PairDownBet = message.PairDownBet;
            if (message.StraightDownBet != null && message.hasOwnProperty("StraightDownBet"))
                object.StraightDownBet = message.StraightDownBet;
            if (message.LeopardDownBet != null && message.hasOwnProperty("LeopardDownBet"))
                object.LeopardDownBet = message.LeopardDownBet;
            return object;
        };

        /**
         * Converts this DownBetMoney to JSON.
         * @function toJSON
         * @memberof msg.DownBetMoney
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DownBetMoney.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DownBetMoney;
    })();

    msg.PotWinList = (function() {

        /**
         * Properties of a PotWinList.
         * @memberof msg
         * @interface IPotWinList
         * @property {number|null} [resultNum] PotWinList resultNum
         * @property {number|null} [bigSmall] PotWinList bigSmall
         * @property {number|null} [sinDouble] PotWinList sinDouble
         * @property {msg.CardsType|null} [cardType] PotWinList cardType
         */

        /**
         * Constructs a new PotWinList.
         * @memberof msg
         * @classdesc Represents a PotWinList.
         * @implements IPotWinList
         * @constructor
         * @param {msg.IPotWinList=} [properties] Properties to set
         */
        function PotWinList(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PotWinList resultNum.
         * @member {number} resultNum
         * @memberof msg.PotWinList
         * @instance
         */
        PotWinList.prototype.resultNum = 0;

        /**
         * PotWinList bigSmall.
         * @member {number} bigSmall
         * @memberof msg.PotWinList
         * @instance
         */
        PotWinList.prototype.bigSmall = 0;

        /**
         * PotWinList sinDouble.
         * @member {number} sinDouble
         * @memberof msg.PotWinList
         * @instance
         */
        PotWinList.prototype.sinDouble = 0;

        /**
         * PotWinList cardType.
         * @member {msg.CardsType} cardType
         * @memberof msg.PotWinList
         * @instance
         */
        PotWinList.prototype.cardType = 0;

        /**
         * Creates a new PotWinList instance using the specified properties.
         * @function create
         * @memberof msg.PotWinList
         * @static
         * @param {msg.IPotWinList=} [properties] Properties to set
         * @returns {msg.PotWinList} PotWinList instance
         */
        PotWinList.create = function create(properties) {
            return new PotWinList(properties);
        };

        /**
         * Encodes the specified PotWinList message. Does not implicitly {@link msg.PotWinList.verify|verify} messages.
         * @function encode
         * @memberof msg.PotWinList
         * @static
         * @param {msg.IPotWinList} message PotWinList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PotWinList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.resultNum != null && message.hasOwnProperty("resultNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.resultNum);
            if (message.bigSmall != null && message.hasOwnProperty("bigSmall"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.bigSmall);
            if (message.sinDouble != null && message.hasOwnProperty("sinDouble"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.sinDouble);
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.cardType);
            return writer;
        };

        /**
         * Encodes the specified PotWinList message, length delimited. Does not implicitly {@link msg.PotWinList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PotWinList
         * @static
         * @param {msg.IPotWinList} message PotWinList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PotWinList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PotWinList message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PotWinList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PotWinList} PotWinList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PotWinList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PotWinList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.resultNum = reader.int32();
                    break;
                case 2:
                    message.bigSmall = reader.int32();
                    break;
                case 3:
                    message.sinDouble = reader.int32();
                    break;
                case 4:
                    message.cardType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PotWinList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PotWinList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PotWinList} PotWinList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PotWinList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PotWinList message.
         * @function verify
         * @memberof msg.PotWinList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PotWinList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.resultNum != null && message.hasOwnProperty("resultNum"))
                if (!$util.isInteger(message.resultNum))
                    return "resultNum: integer expected";
            if (message.bigSmall != null && message.hasOwnProperty("bigSmall"))
                if (!$util.isInteger(message.bigSmall))
                    return "bigSmall: integer expected";
            if (message.sinDouble != null && message.hasOwnProperty("sinDouble"))
                if (!$util.isInteger(message.sinDouble))
                    return "sinDouble: integer expected";
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                switch (message.cardType) {
                default:
                    return "cardType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a PotWinList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PotWinList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PotWinList} PotWinList
         */
        PotWinList.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PotWinList)
                return object;
            var message = new $root.msg.PotWinList();
            if (object.resultNum != null)
                message.resultNum = object.resultNum | 0;
            if (object.bigSmall != null)
                message.bigSmall = object.bigSmall | 0;
            if (object.sinDouble != null)
                message.sinDouble = object.sinDouble | 0;
            switch (object.cardType) {
            case "XX_Card":
            case 0:
                message.cardType = 0;
                break;
            case "Pair":
            case 1:
                message.cardType = 1;
                break;
            case "Straight":
            case 2:
                message.cardType = 2;
                break;
            case "Leopard":
            case 3:
                message.cardType = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a PotWinList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PotWinList
         * @static
         * @param {msg.PotWinList} message PotWinList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PotWinList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.resultNum = 0;
                object.bigSmall = 0;
                object.sinDouble = 0;
                object.cardType = options.enums === String ? "XX_Card" : 0;
            }
            if (message.resultNum != null && message.hasOwnProperty("resultNum"))
                object.resultNum = message.resultNum;
            if (message.bigSmall != null && message.hasOwnProperty("bigSmall"))
                object.bigSmall = message.bigSmall;
            if (message.sinDouble != null && message.hasOwnProperty("sinDouble"))
                object.sinDouble = message.sinDouble;
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                object.cardType = options.enums === String ? $root.msg.CardsType[message.cardType] : message.cardType;
            return object;
        };

        /**
         * Converts this PotWinList to JSON.
         * @function toJSON
         * @memberof msg.PotWinList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PotWinList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PotWinList;
    })();

    msg.PlayerData = (function() {

        /**
         * Properties of a PlayerData.
         * @memberof msg
         * @interface IPlayerData
         * @property {msg.IPlayerInfo|null} [playerInfo] PlayerData playerInfo
         * @property {msg.IDownBetMoney|null} [downBetMoney] PlayerData downBetMoney
         * @property {msg.PlayerStatus|null} [status] PlayerData status
         * @property {number|null} [bankerMoney] PlayerData bankerMoney
         * @property {number|null} [bankerCount] PlayerData bankerCount
         * @property {number|null} [totalDownBet] PlayerData totalDownBet
         * @property {number|null} [winTotalCount] PlayerData winTotalCount
         * @property {number|null} [resultMoney] PlayerData resultMoney
         * @property {Array.<msg.IPotWinList>|null} [potWinList] PlayerData potWinList
         * @property {Array.<msg.IDownBetHistory>|null} [downBetHistory] PlayerData downBetHistory
         * @property {boolean|null} [IsAction] PlayerData IsAction
         * @property {boolean|null} [IsBanker] PlayerData IsBanker
         * @property {boolean|null} [IsRobot] PlayerData IsRobot
         */

        /**
         * Constructs a new PlayerData.
         * @memberof msg
         * @classdesc Represents a PlayerData.
         * @implements IPlayerData
         * @constructor
         * @param {msg.IPlayerData=} [properties] Properties to set
         */
        function PlayerData(properties) {
            this.potWinList = [];
            this.downBetHistory = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerData playerInfo.
         * @member {msg.IPlayerInfo|null|undefined} playerInfo
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.playerInfo = null;

        /**
         * PlayerData downBetMoney.
         * @member {msg.IDownBetMoney|null|undefined} downBetMoney
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.downBetMoney = null;

        /**
         * PlayerData status.
         * @member {msg.PlayerStatus} status
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.status = 0;

        /**
         * PlayerData bankerMoney.
         * @member {number} bankerMoney
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.bankerMoney = 0;

        /**
         * PlayerData bankerCount.
         * @member {number} bankerCount
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.bankerCount = 0;

        /**
         * PlayerData totalDownBet.
         * @member {number} totalDownBet
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.totalDownBet = 0;

        /**
         * PlayerData winTotalCount.
         * @member {number} winTotalCount
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.winTotalCount = 0;

        /**
         * PlayerData resultMoney.
         * @member {number} resultMoney
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.resultMoney = 0;

        /**
         * PlayerData potWinList.
         * @member {Array.<msg.IPotWinList>} potWinList
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.potWinList = $util.emptyArray;

        /**
         * PlayerData downBetHistory.
         * @member {Array.<msg.IDownBetHistory>} downBetHistory
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.downBetHistory = $util.emptyArray;

        /**
         * PlayerData IsAction.
         * @member {boolean} IsAction
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.IsAction = false;

        /**
         * PlayerData IsBanker.
         * @member {boolean} IsBanker
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.IsBanker = false;

        /**
         * PlayerData IsRobot.
         * @member {boolean} IsRobot
         * @memberof msg.PlayerData
         * @instance
         */
        PlayerData.prototype.IsRobot = false;

        /**
         * Creates a new PlayerData instance using the specified properties.
         * @function create
         * @memberof msg.PlayerData
         * @static
         * @param {msg.IPlayerData=} [properties] Properties to set
         * @returns {msg.PlayerData} PlayerData instance
         */
        PlayerData.create = function create(properties) {
            return new PlayerData(properties);
        };

        /**
         * Encodes the specified PlayerData message. Does not implicitly {@link msg.PlayerData.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerData
         * @static
         * @param {msg.IPlayerData} message PlayerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                $root.msg.PlayerInfo.encode(message.playerInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.downBetMoney != null && message.hasOwnProperty("downBetMoney"))
                $root.msg.DownBetMoney.encode(message.downBetMoney, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
            if (message.bankerMoney != null && message.hasOwnProperty("bankerMoney"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.bankerMoney);
            if (message.bankerCount != null && message.hasOwnProperty("bankerCount"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.bankerCount);
            if (message.totalDownBet != null && message.hasOwnProperty("totalDownBet"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.totalDownBet);
            if (message.winTotalCount != null && message.hasOwnProperty("winTotalCount"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.winTotalCount);
            if (message.resultMoney != null && message.hasOwnProperty("resultMoney"))
                writer.uint32(/* id 8, wireType 1 =*/65).double(message.resultMoney);
            if (message.potWinList != null && message.potWinList.length)
                for (var i = 0; i < message.potWinList.length; ++i)
                    $root.msg.PotWinList.encode(message.potWinList[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.downBetHistory != null && message.downBetHistory.length)
                for (var i = 0; i < message.downBetHistory.length; ++i)
                    $root.msg.DownBetHistory.encode(message.downBetHistory[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.IsAction != null && message.hasOwnProperty("IsAction"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.IsAction);
            if (message.IsBanker != null && message.hasOwnProperty("IsBanker"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.IsBanker);
            if (message.IsRobot != null && message.hasOwnProperty("IsRobot"))
                writer.uint32(/* id 13, wireType 0 =*/104).bool(message.IsRobot);
            return writer;
        };

        /**
         * Encodes the specified PlayerData message, length delimited. Does not implicitly {@link msg.PlayerData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerData
         * @static
         * @param {msg.IPlayerData} message PlayerData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerData message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerData} PlayerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerInfo = $root.msg.PlayerInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.downBetMoney = $root.msg.DownBetMoney.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.status = reader.int32();
                    break;
                case 4:
                    message.bankerMoney = reader.double();
                    break;
                case 5:
                    message.bankerCount = reader.int32();
                    break;
                case 6:
                    message.totalDownBet = reader.int32();
                    break;
                case 7:
                    message.winTotalCount = reader.int32();
                    break;
                case 8:
                    message.resultMoney = reader.double();
                    break;
                case 9:
                    if (!(message.potWinList && message.potWinList.length))
                        message.potWinList = [];
                    message.potWinList.push($root.msg.PotWinList.decode(reader, reader.uint32()));
                    break;
                case 10:
                    if (!(message.downBetHistory && message.downBetHistory.length))
                        message.downBetHistory = [];
                    message.downBetHistory.push($root.msg.DownBetHistory.decode(reader, reader.uint32()));
                    break;
                case 11:
                    message.IsAction = reader.bool();
                    break;
                case 12:
                    message.IsBanker = reader.bool();
                    break;
                case 13:
                    message.IsRobot = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerData} PlayerData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerData message.
         * @function verify
         * @memberof msg.PlayerData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo")) {
                var error = $root.msg.PlayerInfo.verify(message.playerInfo);
                if (error)
                    return "playerInfo." + error;
            }
            if (message.downBetMoney != null && message.hasOwnProperty("downBetMoney")) {
                var error = $root.msg.DownBetMoney.verify(message.downBetMoney);
                if (error)
                    return "downBetMoney." + error;
            }
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.bankerMoney != null && message.hasOwnProperty("bankerMoney"))
                if (typeof message.bankerMoney !== "number")
                    return "bankerMoney: number expected";
            if (message.bankerCount != null && message.hasOwnProperty("bankerCount"))
                if (!$util.isInteger(message.bankerCount))
                    return "bankerCount: integer expected";
            if (message.totalDownBet != null && message.hasOwnProperty("totalDownBet"))
                if (!$util.isInteger(message.totalDownBet))
                    return "totalDownBet: integer expected";
            if (message.winTotalCount != null && message.hasOwnProperty("winTotalCount"))
                if (!$util.isInteger(message.winTotalCount))
                    return "winTotalCount: integer expected";
            if (message.resultMoney != null && message.hasOwnProperty("resultMoney"))
                if (typeof message.resultMoney !== "number")
                    return "resultMoney: number expected";
            if (message.potWinList != null && message.hasOwnProperty("potWinList")) {
                if (!Array.isArray(message.potWinList))
                    return "potWinList: array expected";
                for (var i = 0; i < message.potWinList.length; ++i) {
                    var error = $root.msg.PotWinList.verify(message.potWinList[i]);
                    if (error)
                        return "potWinList." + error;
                }
            }
            if (message.downBetHistory != null && message.hasOwnProperty("downBetHistory")) {
                if (!Array.isArray(message.downBetHistory))
                    return "downBetHistory: array expected";
                for (var i = 0; i < message.downBetHistory.length; ++i) {
                    var error = $root.msg.DownBetHistory.verify(message.downBetHistory[i]);
                    if (error)
                        return "downBetHistory." + error;
                }
            }
            if (message.IsAction != null && message.hasOwnProperty("IsAction"))
                if (typeof message.IsAction !== "boolean")
                    return "IsAction: boolean expected";
            if (message.IsBanker != null && message.hasOwnProperty("IsBanker"))
                if (typeof message.IsBanker !== "boolean")
                    return "IsBanker: boolean expected";
            if (message.IsRobot != null && message.hasOwnProperty("IsRobot"))
                if (typeof message.IsRobot !== "boolean")
                    return "IsRobot: boolean expected";
            return null;
        };

        /**
         * Creates a PlayerData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerData} PlayerData
         */
        PlayerData.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerData)
                return object;
            var message = new $root.msg.PlayerData();
            if (object.playerInfo != null) {
                if (typeof object.playerInfo !== "object")
                    throw TypeError(".msg.PlayerData.playerInfo: object expected");
                message.playerInfo = $root.msg.PlayerInfo.fromObject(object.playerInfo);
            }
            if (object.downBetMoney != null) {
                if (typeof object.downBetMoney !== "object")
                    throw TypeError(".msg.PlayerData.downBetMoney: object expected");
                message.downBetMoney = $root.msg.DownBetMoney.fromObject(object.downBetMoney);
            }
            switch (object.status) {
            case "XX_Status":
            case 0:
                message.status = 0;
                break;
            case "PlayGame":
            case 1:
                message.status = 1;
                break;
            case "WatchGame":
            case 2:
                message.status = 2;
                break;
            }
            if (object.bankerMoney != null)
                message.bankerMoney = Number(object.bankerMoney);
            if (object.bankerCount != null)
                message.bankerCount = object.bankerCount | 0;
            if (object.totalDownBet != null)
                message.totalDownBet = object.totalDownBet | 0;
            if (object.winTotalCount != null)
                message.winTotalCount = object.winTotalCount | 0;
            if (object.resultMoney != null)
                message.resultMoney = Number(object.resultMoney);
            if (object.potWinList) {
                if (!Array.isArray(object.potWinList))
                    throw TypeError(".msg.PlayerData.potWinList: array expected");
                message.potWinList = [];
                for (var i = 0; i < object.potWinList.length; ++i) {
                    if (typeof object.potWinList[i] !== "object")
                        throw TypeError(".msg.PlayerData.potWinList: object expected");
                    message.potWinList[i] = $root.msg.PotWinList.fromObject(object.potWinList[i]);
                }
            }
            if (object.downBetHistory) {
                if (!Array.isArray(object.downBetHistory))
                    throw TypeError(".msg.PlayerData.downBetHistory: array expected");
                message.downBetHistory = [];
                for (var i = 0; i < object.downBetHistory.length; ++i) {
                    if (typeof object.downBetHistory[i] !== "object")
                        throw TypeError(".msg.PlayerData.downBetHistory: object expected");
                    message.downBetHistory[i] = $root.msg.DownBetHistory.fromObject(object.downBetHistory[i]);
                }
            }
            if (object.IsAction != null)
                message.IsAction = Boolean(object.IsAction);
            if (object.IsBanker != null)
                message.IsBanker = Boolean(object.IsBanker);
            if (object.IsRobot != null)
                message.IsRobot = Boolean(object.IsRobot);
            return message;
        };

        /**
         * Creates a plain object from a PlayerData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerData
         * @static
         * @param {msg.PlayerData} message PlayerData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.potWinList = [];
                object.downBetHistory = [];
            }
            if (options.defaults) {
                object.playerInfo = null;
                object.downBetMoney = null;
                object.status = options.enums === String ? "XX_Status" : 0;
                object.bankerMoney = 0;
                object.bankerCount = 0;
                object.totalDownBet = 0;
                object.winTotalCount = 0;
                object.resultMoney = 0;
                object.IsAction = false;
                object.IsBanker = false;
                object.IsRobot = false;
            }
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                object.playerInfo = $root.msg.PlayerInfo.toObject(message.playerInfo, options);
            if (message.downBetMoney != null && message.hasOwnProperty("downBetMoney"))
                object.downBetMoney = $root.msg.DownBetMoney.toObject(message.downBetMoney, options);
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.msg.PlayerStatus[message.status] : message.status;
            if (message.bankerMoney != null && message.hasOwnProperty("bankerMoney"))
                object.bankerMoney = options.json && !isFinite(message.bankerMoney) ? String(message.bankerMoney) : message.bankerMoney;
            if (message.bankerCount != null && message.hasOwnProperty("bankerCount"))
                object.bankerCount = message.bankerCount;
            if (message.totalDownBet != null && message.hasOwnProperty("totalDownBet"))
                object.totalDownBet = message.totalDownBet;
            if (message.winTotalCount != null && message.hasOwnProperty("winTotalCount"))
                object.winTotalCount = message.winTotalCount;
            if (message.resultMoney != null && message.hasOwnProperty("resultMoney"))
                object.resultMoney = options.json && !isFinite(message.resultMoney) ? String(message.resultMoney) : message.resultMoney;
            if (message.potWinList && message.potWinList.length) {
                object.potWinList = [];
                for (var j = 0; j < message.potWinList.length; ++j)
                    object.potWinList[j] = $root.msg.PotWinList.toObject(message.potWinList[j], options);
            }
            if (message.downBetHistory && message.downBetHistory.length) {
                object.downBetHistory = [];
                for (var j = 0; j < message.downBetHistory.length; ++j)
                    object.downBetHistory[j] = $root.msg.DownBetHistory.toObject(message.downBetHistory[j], options);
            }
            if (message.IsAction != null && message.hasOwnProperty("IsAction"))
                object.IsAction = message.IsAction;
            if (message.IsBanker != null && message.hasOwnProperty("IsBanker"))
                object.IsBanker = message.IsBanker;
            if (message.IsRobot != null && message.hasOwnProperty("IsRobot"))
                object.IsRobot = message.IsRobot;
            return object;
        };

        /**
         * Converts this PlayerData to JSON.
         * @function toJSON
         * @memberof msg.PlayerData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerData;
    })();

    msg.DownBetHistory = (function() {

        /**
         * Properties of a DownBetHistory.
         * @memberof msg
         * @interface IDownBetHistory
         * @property {string|null} [timeFmt] DownBetHistory timeFmt
         * @property {Array.<number>|null} [resNum] DownBetHistory resNum
         * @property {number|null} [result] DownBetHistory result
         * @property {number|null} [sinDouble] DownBetHistory sinDouble
         * @property {number|null} [bigSmall] DownBetHistory bigSmall
         * @property {msg.CardsType|null} [cardType] DownBetHistory cardType
         * @property {msg.IDownBetMoney|null} [downBetMoney] DownBetHistory downBetMoney
         */

        /**
         * Constructs a new DownBetHistory.
         * @memberof msg
         * @classdesc Represents a DownBetHistory.
         * @implements IDownBetHistory
         * @constructor
         * @param {msg.IDownBetHistory=} [properties] Properties to set
         */
        function DownBetHistory(properties) {
            this.resNum = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DownBetHistory timeFmt.
         * @member {string} timeFmt
         * @memberof msg.DownBetHistory
         * @instance
         */
        DownBetHistory.prototype.timeFmt = "";

        /**
         * DownBetHistory resNum.
         * @member {Array.<number>} resNum
         * @memberof msg.DownBetHistory
         * @instance
         */
        DownBetHistory.prototype.resNum = $util.emptyArray;

        /**
         * DownBetHistory result.
         * @member {number} result
         * @memberof msg.DownBetHistory
         * @instance
         */
        DownBetHistory.prototype.result = 0;

        /**
         * DownBetHistory sinDouble.
         * @member {number} sinDouble
         * @memberof msg.DownBetHistory
         * @instance
         */
        DownBetHistory.prototype.sinDouble = 0;

        /**
         * DownBetHistory bigSmall.
         * @member {number} bigSmall
         * @memberof msg.DownBetHistory
         * @instance
         */
        DownBetHistory.prototype.bigSmall = 0;

        /**
         * DownBetHistory cardType.
         * @member {msg.CardsType} cardType
         * @memberof msg.DownBetHistory
         * @instance
         */
        DownBetHistory.prototype.cardType = 0;

        /**
         * DownBetHistory downBetMoney.
         * @member {msg.IDownBetMoney|null|undefined} downBetMoney
         * @memberof msg.DownBetHistory
         * @instance
         */
        DownBetHistory.prototype.downBetMoney = null;

        /**
         * Creates a new DownBetHistory instance using the specified properties.
         * @function create
         * @memberof msg.DownBetHistory
         * @static
         * @param {msg.IDownBetHistory=} [properties] Properties to set
         * @returns {msg.DownBetHistory} DownBetHistory instance
         */
        DownBetHistory.create = function create(properties) {
            return new DownBetHistory(properties);
        };

        /**
         * Encodes the specified DownBetHistory message. Does not implicitly {@link msg.DownBetHistory.verify|verify} messages.
         * @function encode
         * @memberof msg.DownBetHistory
         * @static
         * @param {msg.IDownBetHistory} message DownBetHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DownBetHistory.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timeFmt != null && message.hasOwnProperty("timeFmt"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.timeFmt);
            if (message.resNum != null && message.resNum.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (var i = 0; i < message.resNum.length; ++i)
                    writer.int32(message.resNum[i]);
                writer.ldelim();
            }
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.result);
            if (message.sinDouble != null && message.hasOwnProperty("sinDouble"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.sinDouble);
            if (message.bigSmall != null && message.hasOwnProperty("bigSmall"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.bigSmall);
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.cardType);
            if (message.downBetMoney != null && message.hasOwnProperty("downBetMoney"))
                $root.msg.DownBetMoney.encode(message.downBetMoney, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DownBetHistory message, length delimited. Does not implicitly {@link msg.DownBetHistory.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.DownBetHistory
         * @static
         * @param {msg.IDownBetHistory} message DownBetHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DownBetHistory.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DownBetHistory message from the specified reader or buffer.
         * @function decode
         * @memberof msg.DownBetHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.DownBetHistory} DownBetHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DownBetHistory.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.DownBetHistory();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.timeFmt = reader.string();
                    break;
                case 2:
                    if (!(message.resNum && message.resNum.length))
                        message.resNum = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.resNum.push(reader.int32());
                    } else
                        message.resNum.push(reader.int32());
                    break;
                case 3:
                    message.result = reader.int32();
                    break;
                case 4:
                    message.sinDouble = reader.int32();
                    break;
                case 5:
                    message.bigSmall = reader.int32();
                    break;
                case 6:
                    message.cardType = reader.int32();
                    break;
                case 7:
                    message.downBetMoney = $root.msg.DownBetMoney.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DownBetHistory message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.DownBetHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.DownBetHistory} DownBetHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DownBetHistory.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DownBetHistory message.
         * @function verify
         * @memberof msg.DownBetHistory
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DownBetHistory.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timeFmt != null && message.hasOwnProperty("timeFmt"))
                if (!$util.isString(message.timeFmt))
                    return "timeFmt: string expected";
            if (message.resNum != null && message.hasOwnProperty("resNum")) {
                if (!Array.isArray(message.resNum))
                    return "resNum: array expected";
                for (var i = 0; i < message.resNum.length; ++i)
                    if (!$util.isInteger(message.resNum[i]))
                        return "resNum: integer[] expected";
            }
            if (message.result != null && message.hasOwnProperty("result"))
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
            if (message.sinDouble != null && message.hasOwnProperty("sinDouble"))
                if (!$util.isInteger(message.sinDouble))
                    return "sinDouble: integer expected";
            if (message.bigSmall != null && message.hasOwnProperty("bigSmall"))
                if (!$util.isInteger(message.bigSmall))
                    return "bigSmall: integer expected";
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                switch (message.cardType) {
                default:
                    return "cardType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.downBetMoney != null && message.hasOwnProperty("downBetMoney")) {
                var error = $root.msg.DownBetMoney.verify(message.downBetMoney);
                if (error)
                    return "downBetMoney." + error;
            }
            return null;
        };

        /**
         * Creates a DownBetHistory message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.DownBetHistory
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.DownBetHistory} DownBetHistory
         */
        DownBetHistory.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.DownBetHistory)
                return object;
            var message = new $root.msg.DownBetHistory();
            if (object.timeFmt != null)
                message.timeFmt = String(object.timeFmt);
            if (object.resNum) {
                if (!Array.isArray(object.resNum))
                    throw TypeError(".msg.DownBetHistory.resNum: array expected");
                message.resNum = [];
                for (var i = 0; i < object.resNum.length; ++i)
                    message.resNum[i] = object.resNum[i] | 0;
            }
            if (object.result != null)
                message.result = object.result | 0;
            if (object.sinDouble != null)
                message.sinDouble = object.sinDouble | 0;
            if (object.bigSmall != null)
                message.bigSmall = object.bigSmall | 0;
            switch (object.cardType) {
            case "XX_Card":
            case 0:
                message.cardType = 0;
                break;
            case "Pair":
            case 1:
                message.cardType = 1;
                break;
            case "Straight":
            case 2:
                message.cardType = 2;
                break;
            case "Leopard":
            case 3:
                message.cardType = 3;
                break;
            }
            if (object.downBetMoney != null) {
                if (typeof object.downBetMoney !== "object")
                    throw TypeError(".msg.DownBetHistory.downBetMoney: object expected");
                message.downBetMoney = $root.msg.DownBetMoney.fromObject(object.downBetMoney);
            }
            return message;
        };

        /**
         * Creates a plain object from a DownBetHistory message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.DownBetHistory
         * @static
         * @param {msg.DownBetHistory} message DownBetHistory
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DownBetHistory.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.resNum = [];
            if (options.defaults) {
                object.timeFmt = "";
                object.result = 0;
                object.sinDouble = 0;
                object.bigSmall = 0;
                object.cardType = options.enums === String ? "XX_Card" : 0;
                object.downBetMoney = null;
            }
            if (message.timeFmt != null && message.hasOwnProperty("timeFmt"))
                object.timeFmt = message.timeFmt;
            if (message.resNum && message.resNum.length) {
                object.resNum = [];
                for (var j = 0; j < message.resNum.length; ++j)
                    object.resNum[j] = message.resNum[j];
            }
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = message.result;
            if (message.sinDouble != null && message.hasOwnProperty("sinDouble"))
                object.sinDouble = message.sinDouble;
            if (message.bigSmall != null && message.hasOwnProperty("bigSmall"))
                object.bigSmall = message.bigSmall;
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                object.cardType = options.enums === String ? $root.msg.CardsType[message.cardType] : message.cardType;
            if (message.downBetMoney != null && message.hasOwnProperty("downBetMoney"))
                object.downBetMoney = $root.msg.DownBetMoney.toObject(message.downBetMoney, options);
            return object;
        };

        /**
         * Converts this DownBetHistory to JSON.
         * @function toJSON
         * @memberof msg.DownBetHistory
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DownBetHistory.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DownBetHistory;
    })();

    msg.HistoryData = (function() {

        /**
         * Properties of a HistoryData.
         * @memberof msg
         * @interface IHistoryData
         * @property {string|null} [timeFmt] HistoryData timeFmt
         * @property {Array.<number>|null} [resNum] HistoryData resNum
         * @property {number|null} [result] HistoryData result
         * @property {number|null} [sinDouble] HistoryData sinDouble
         * @property {number|null} [bigSmall] HistoryData bigSmall
         * @property {msg.CardsType|null} [cardType] HistoryData cardType
         */

        /**
         * Constructs a new HistoryData.
         * @memberof msg
         * @classdesc Represents a HistoryData.
         * @implements IHistoryData
         * @constructor
         * @param {msg.IHistoryData=} [properties] Properties to set
         */
        function HistoryData(properties) {
            this.resNum = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HistoryData timeFmt.
         * @member {string} timeFmt
         * @memberof msg.HistoryData
         * @instance
         */
        HistoryData.prototype.timeFmt = "";

        /**
         * HistoryData resNum.
         * @member {Array.<number>} resNum
         * @memberof msg.HistoryData
         * @instance
         */
        HistoryData.prototype.resNum = $util.emptyArray;

        /**
         * HistoryData result.
         * @member {number} result
         * @memberof msg.HistoryData
         * @instance
         */
        HistoryData.prototype.result = 0;

        /**
         * HistoryData sinDouble.
         * @member {number} sinDouble
         * @memberof msg.HistoryData
         * @instance
         */
        HistoryData.prototype.sinDouble = 0;

        /**
         * HistoryData bigSmall.
         * @member {number} bigSmall
         * @memberof msg.HistoryData
         * @instance
         */
        HistoryData.prototype.bigSmall = 0;

        /**
         * HistoryData cardType.
         * @member {msg.CardsType} cardType
         * @memberof msg.HistoryData
         * @instance
         */
        HistoryData.prototype.cardType = 0;

        /**
         * Creates a new HistoryData instance using the specified properties.
         * @function create
         * @memberof msg.HistoryData
         * @static
         * @param {msg.IHistoryData=} [properties] Properties to set
         * @returns {msg.HistoryData} HistoryData instance
         */
        HistoryData.create = function create(properties) {
            return new HistoryData(properties);
        };

        /**
         * Encodes the specified HistoryData message. Does not implicitly {@link msg.HistoryData.verify|verify} messages.
         * @function encode
         * @memberof msg.HistoryData
         * @static
         * @param {msg.IHistoryData} message HistoryData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HistoryData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timeFmt != null && message.hasOwnProperty("timeFmt"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.timeFmt);
            if (message.resNum != null && message.resNum.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (var i = 0; i < message.resNum.length; ++i)
                    writer.int32(message.resNum[i]);
                writer.ldelim();
            }
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.result);
            if (message.sinDouble != null && message.hasOwnProperty("sinDouble"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.sinDouble);
            if (message.bigSmall != null && message.hasOwnProperty("bigSmall"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.bigSmall);
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.cardType);
            return writer;
        };

        /**
         * Encodes the specified HistoryData message, length delimited. Does not implicitly {@link msg.HistoryData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.HistoryData
         * @static
         * @param {msg.IHistoryData} message HistoryData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HistoryData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HistoryData message from the specified reader or buffer.
         * @function decode
         * @memberof msg.HistoryData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.HistoryData} HistoryData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HistoryData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.HistoryData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.timeFmt = reader.string();
                    break;
                case 2:
                    if (!(message.resNum && message.resNum.length))
                        message.resNum = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.resNum.push(reader.int32());
                    } else
                        message.resNum.push(reader.int32());
                    break;
                case 3:
                    message.result = reader.int32();
                    break;
                case 4:
                    message.sinDouble = reader.int32();
                    break;
                case 5:
                    message.bigSmall = reader.int32();
                    break;
                case 6:
                    message.cardType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HistoryData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.HistoryData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.HistoryData} HistoryData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HistoryData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HistoryData message.
         * @function verify
         * @memberof msg.HistoryData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HistoryData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timeFmt != null && message.hasOwnProperty("timeFmt"))
                if (!$util.isString(message.timeFmt))
                    return "timeFmt: string expected";
            if (message.resNum != null && message.hasOwnProperty("resNum")) {
                if (!Array.isArray(message.resNum))
                    return "resNum: array expected";
                for (var i = 0; i < message.resNum.length; ++i)
                    if (!$util.isInteger(message.resNum[i]))
                        return "resNum: integer[] expected";
            }
            if (message.result != null && message.hasOwnProperty("result"))
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
            if (message.sinDouble != null && message.hasOwnProperty("sinDouble"))
                if (!$util.isInteger(message.sinDouble))
                    return "sinDouble: integer expected";
            if (message.bigSmall != null && message.hasOwnProperty("bigSmall"))
                if (!$util.isInteger(message.bigSmall))
                    return "bigSmall: integer expected";
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                switch (message.cardType) {
                default:
                    return "cardType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a HistoryData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.HistoryData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.HistoryData} HistoryData
         */
        HistoryData.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.HistoryData)
                return object;
            var message = new $root.msg.HistoryData();
            if (object.timeFmt != null)
                message.timeFmt = String(object.timeFmt);
            if (object.resNum) {
                if (!Array.isArray(object.resNum))
                    throw TypeError(".msg.HistoryData.resNum: array expected");
                message.resNum = [];
                for (var i = 0; i < object.resNum.length; ++i)
                    message.resNum[i] = object.resNum[i] | 0;
            }
            if (object.result != null)
                message.result = object.result | 0;
            if (object.sinDouble != null)
                message.sinDouble = object.sinDouble | 0;
            if (object.bigSmall != null)
                message.bigSmall = object.bigSmall | 0;
            switch (object.cardType) {
            case "XX_Card":
            case 0:
                message.cardType = 0;
                break;
            case "Pair":
            case 1:
                message.cardType = 1;
                break;
            case "Straight":
            case 2:
                message.cardType = 2;
                break;
            case "Leopard":
            case 3:
                message.cardType = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a HistoryData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.HistoryData
         * @static
         * @param {msg.HistoryData} message HistoryData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HistoryData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.resNum = [];
            if (options.defaults) {
                object.timeFmt = "";
                object.result = 0;
                object.sinDouble = 0;
                object.bigSmall = 0;
                object.cardType = options.enums === String ? "XX_Card" : 0;
            }
            if (message.timeFmt != null && message.hasOwnProperty("timeFmt"))
                object.timeFmt = message.timeFmt;
            if (message.resNum && message.resNum.length) {
                object.resNum = [];
                for (var j = 0; j < message.resNum.length; ++j)
                    object.resNum[j] = message.resNum[j];
            }
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = message.result;
            if (message.sinDouble != null && message.hasOwnProperty("sinDouble"))
                object.sinDouble = message.sinDouble;
            if (message.bigSmall != null && message.hasOwnProperty("bigSmall"))
                object.bigSmall = message.bigSmall;
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                object.cardType = options.enums === String ? $root.msg.CardsType[message.cardType] : message.cardType;
            return object;
        };

        /**
         * Converts this HistoryData to JSON.
         * @function toJSON
         * @memberof msg.HistoryData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HistoryData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HistoryData;
    })();

    msg.RoomData = (function() {

        /**
         * Properties of a RoomData.
         * @memberof msg
         * @interface IRoomData
         * @property {string|null} [roomId] RoomData roomId
         * @property {Array.<msg.IPlayerData>|null} [playerData] RoomData playerData
         * @property {number|null} [gameTime] RoomData gameTime
         * @property {msg.GameStep|null} [gameStep] RoomData gameStep
         * @property {Array.<number>|null} [resultInt] RoomData resultInt
         * @property {msg.IDownBetMoney|null} [potMoneyCount] RoomData potMoneyCount
         * @property {Array.<msg.IPotWinList>|null} [potWinList] RoomData potWinList
         * @property {Array.<msg.IHistoryData>|null} [historyData] RoomData historyData
         * @property {Array.<msg.IPlayerData>|null} [tablePlayer] RoomData tablePlayer
         */

        /**
         * Constructs a new RoomData.
         * @memberof msg
         * @classdesc Represents a RoomData.
         * @implements IRoomData
         * @constructor
         * @param {msg.IRoomData=} [properties] Properties to set
         */
        function RoomData(properties) {
            this.playerData = [];
            this.resultInt = [];
            this.potWinList = [];
            this.historyData = [];
            this.tablePlayer = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomData roomId.
         * @member {string} roomId
         * @memberof msg.RoomData
         * @instance
         */
        RoomData.prototype.roomId = "";

        /**
         * RoomData playerData.
         * @member {Array.<msg.IPlayerData>} playerData
         * @memberof msg.RoomData
         * @instance
         */
        RoomData.prototype.playerData = $util.emptyArray;

        /**
         * RoomData gameTime.
         * @member {number} gameTime
         * @memberof msg.RoomData
         * @instance
         */
        RoomData.prototype.gameTime = 0;

        /**
         * RoomData gameStep.
         * @member {msg.GameStep} gameStep
         * @memberof msg.RoomData
         * @instance
         */
        RoomData.prototype.gameStep = 0;

        /**
         * RoomData resultInt.
         * @member {Array.<number>} resultInt
         * @memberof msg.RoomData
         * @instance
         */
        RoomData.prototype.resultInt = $util.emptyArray;

        /**
         * RoomData potMoneyCount.
         * @member {msg.IDownBetMoney|null|undefined} potMoneyCount
         * @memberof msg.RoomData
         * @instance
         */
        RoomData.prototype.potMoneyCount = null;

        /**
         * RoomData potWinList.
         * @member {Array.<msg.IPotWinList>} potWinList
         * @memberof msg.RoomData
         * @instance
         */
        RoomData.prototype.potWinList = $util.emptyArray;

        /**
         * RoomData historyData.
         * @member {Array.<msg.IHistoryData>} historyData
         * @memberof msg.RoomData
         * @instance
         */
        RoomData.prototype.historyData = $util.emptyArray;

        /**
         * RoomData tablePlayer.
         * @member {Array.<msg.IPlayerData>} tablePlayer
         * @memberof msg.RoomData
         * @instance
         */
        RoomData.prototype.tablePlayer = $util.emptyArray;

        /**
         * Creates a new RoomData instance using the specified properties.
         * @function create
         * @memberof msg.RoomData
         * @static
         * @param {msg.IRoomData=} [properties] Properties to set
         * @returns {msg.RoomData} RoomData instance
         */
        RoomData.create = function create(properties) {
            return new RoomData(properties);
        };

        /**
         * Encodes the specified RoomData message. Does not implicitly {@link msg.RoomData.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomData
         * @static
         * @param {msg.IRoomData} message RoomData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            if (message.playerData != null && message.playerData.length)
                for (var i = 0; i < message.playerData.length; ++i)
                    $root.msg.PlayerData.encode(message.playerData[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.gameTime != null && message.hasOwnProperty("gameTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.gameTime);
            if (message.gameStep != null && message.hasOwnProperty("gameStep"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.gameStep);
            if (message.resultInt != null && message.resultInt.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (var i = 0; i < message.resultInt.length; ++i)
                    writer.int32(message.resultInt[i]);
                writer.ldelim();
            }
            if (message.potMoneyCount != null && message.hasOwnProperty("potMoneyCount"))
                $root.msg.DownBetMoney.encode(message.potMoneyCount, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.potWinList != null && message.potWinList.length)
                for (var i = 0; i < message.potWinList.length; ++i)
                    $root.msg.PotWinList.encode(message.potWinList[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.historyData != null && message.historyData.length)
                for (var i = 0; i < message.historyData.length; ++i)
                    $root.msg.HistoryData.encode(message.historyData[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.tablePlayer != null && message.tablePlayer.length)
                for (var i = 0; i < message.tablePlayer.length; ++i)
                    $root.msg.PlayerData.encode(message.tablePlayer[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RoomData message, length delimited. Does not implicitly {@link msg.RoomData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomData
         * @static
         * @param {msg.IRoomData} message RoomData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomData message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomData} RoomData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                case 2:
                    if (!(message.playerData && message.playerData.length))
                        message.playerData = [];
                    message.playerData.push($root.msg.PlayerData.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.gameTime = reader.int32();
                    break;
                case 4:
                    message.gameStep = reader.int32();
                    break;
                case 5:
                    if (!(message.resultInt && message.resultInt.length))
                        message.resultInt = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.resultInt.push(reader.int32());
                    } else
                        message.resultInt.push(reader.int32());
                    break;
                case 6:
                    message.potMoneyCount = $root.msg.DownBetMoney.decode(reader, reader.uint32());
                    break;
                case 7:
                    if (!(message.potWinList && message.potWinList.length))
                        message.potWinList = [];
                    message.potWinList.push($root.msg.PotWinList.decode(reader, reader.uint32()));
                    break;
                case 8:
                    if (!(message.historyData && message.historyData.length))
                        message.historyData = [];
                    message.historyData.push($root.msg.HistoryData.decode(reader, reader.uint32()));
                    break;
                case 9:
                    if (!(message.tablePlayer && message.tablePlayer.length))
                        message.tablePlayer = [];
                    message.tablePlayer.push($root.msg.PlayerData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomData} RoomData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomData message.
         * @function verify
         * @memberof msg.RoomData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.playerData != null && message.hasOwnProperty("playerData")) {
                if (!Array.isArray(message.playerData))
                    return "playerData: array expected";
                for (var i = 0; i < message.playerData.length; ++i) {
                    var error = $root.msg.PlayerData.verify(message.playerData[i]);
                    if (error)
                        return "playerData." + error;
                }
            }
            if (message.gameTime != null && message.hasOwnProperty("gameTime"))
                if (!$util.isInteger(message.gameTime))
                    return "gameTime: integer expected";
            if (message.gameStep != null && message.hasOwnProperty("gameStep"))
                switch (message.gameStep) {
                default:
                    return "gameStep: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.resultInt != null && message.hasOwnProperty("resultInt")) {
                if (!Array.isArray(message.resultInt))
                    return "resultInt: array expected";
                for (var i = 0; i < message.resultInt.length; ++i)
                    if (!$util.isInteger(message.resultInt[i]))
                        return "resultInt: integer[] expected";
            }
            if (message.potMoneyCount != null && message.hasOwnProperty("potMoneyCount")) {
                var error = $root.msg.DownBetMoney.verify(message.potMoneyCount);
                if (error)
                    return "potMoneyCount." + error;
            }
            if (message.potWinList != null && message.hasOwnProperty("potWinList")) {
                if (!Array.isArray(message.potWinList))
                    return "potWinList: array expected";
                for (var i = 0; i < message.potWinList.length; ++i) {
                    var error = $root.msg.PotWinList.verify(message.potWinList[i]);
                    if (error)
                        return "potWinList." + error;
                }
            }
            if (message.historyData != null && message.hasOwnProperty("historyData")) {
                if (!Array.isArray(message.historyData))
                    return "historyData: array expected";
                for (var i = 0; i < message.historyData.length; ++i) {
                    var error = $root.msg.HistoryData.verify(message.historyData[i]);
                    if (error)
                        return "historyData." + error;
                }
            }
            if (message.tablePlayer != null && message.hasOwnProperty("tablePlayer")) {
                if (!Array.isArray(message.tablePlayer))
                    return "tablePlayer: array expected";
                for (var i = 0; i < message.tablePlayer.length; ++i) {
                    var error = $root.msg.PlayerData.verify(message.tablePlayer[i]);
                    if (error)
                        return "tablePlayer." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RoomData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomData} RoomData
         */
        RoomData.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomData)
                return object;
            var message = new $root.msg.RoomData();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.playerData) {
                if (!Array.isArray(object.playerData))
                    throw TypeError(".msg.RoomData.playerData: array expected");
                message.playerData = [];
                for (var i = 0; i < object.playerData.length; ++i) {
                    if (typeof object.playerData[i] !== "object")
                        throw TypeError(".msg.RoomData.playerData: object expected");
                    message.playerData[i] = $root.msg.PlayerData.fromObject(object.playerData[i]);
                }
            }
            if (object.gameTime != null)
                message.gameTime = object.gameTime | 0;
            switch (object.gameStep) {
            case "XX_Step":
            case 0:
                message.gameStep = 0;
                break;
            case "Banker":
            case 1:
                message.gameStep = 1;
                break;
            case "Banker2":
            case 2:
                message.gameStep = 2;
                break;
            case "DownBet":
            case 3:
                message.gameStep = 3;
                break;
            case "Settle":
            case 4:
                message.gameStep = 4;
                break;
            }
            if (object.resultInt) {
                if (!Array.isArray(object.resultInt))
                    throw TypeError(".msg.RoomData.resultInt: array expected");
                message.resultInt = [];
                for (var i = 0; i < object.resultInt.length; ++i)
                    message.resultInt[i] = object.resultInt[i] | 0;
            }
            if (object.potMoneyCount != null) {
                if (typeof object.potMoneyCount !== "object")
                    throw TypeError(".msg.RoomData.potMoneyCount: object expected");
                message.potMoneyCount = $root.msg.DownBetMoney.fromObject(object.potMoneyCount);
            }
            if (object.potWinList) {
                if (!Array.isArray(object.potWinList))
                    throw TypeError(".msg.RoomData.potWinList: array expected");
                message.potWinList = [];
                for (var i = 0; i < object.potWinList.length; ++i) {
                    if (typeof object.potWinList[i] !== "object")
                        throw TypeError(".msg.RoomData.potWinList: object expected");
                    message.potWinList[i] = $root.msg.PotWinList.fromObject(object.potWinList[i]);
                }
            }
            if (object.historyData) {
                if (!Array.isArray(object.historyData))
                    throw TypeError(".msg.RoomData.historyData: array expected");
                message.historyData = [];
                for (var i = 0; i < object.historyData.length; ++i) {
                    if (typeof object.historyData[i] !== "object")
                        throw TypeError(".msg.RoomData.historyData: object expected");
                    message.historyData[i] = $root.msg.HistoryData.fromObject(object.historyData[i]);
                }
            }
            if (object.tablePlayer) {
                if (!Array.isArray(object.tablePlayer))
                    throw TypeError(".msg.RoomData.tablePlayer: array expected");
                message.tablePlayer = [];
                for (var i = 0; i < object.tablePlayer.length; ++i) {
                    if (typeof object.tablePlayer[i] !== "object")
                        throw TypeError(".msg.RoomData.tablePlayer: object expected");
                    message.tablePlayer[i] = $root.msg.PlayerData.fromObject(object.tablePlayer[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RoomData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomData
         * @static
         * @param {msg.RoomData} message RoomData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.playerData = [];
                object.resultInt = [];
                object.potWinList = [];
                object.historyData = [];
                object.tablePlayer = [];
            }
            if (options.defaults) {
                object.roomId = "";
                object.gameTime = 0;
                object.gameStep = options.enums === String ? "XX_Step" : 0;
                object.potMoneyCount = null;
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.playerData && message.playerData.length) {
                object.playerData = [];
                for (var j = 0; j < message.playerData.length; ++j)
                    object.playerData[j] = $root.msg.PlayerData.toObject(message.playerData[j], options);
            }
            if (message.gameTime != null && message.hasOwnProperty("gameTime"))
                object.gameTime = message.gameTime;
            if (message.gameStep != null && message.hasOwnProperty("gameStep"))
                object.gameStep = options.enums === String ? $root.msg.GameStep[message.gameStep] : message.gameStep;
            if (message.resultInt && message.resultInt.length) {
                object.resultInt = [];
                for (var j = 0; j < message.resultInt.length; ++j)
                    object.resultInt[j] = message.resultInt[j];
            }
            if (message.potMoneyCount != null && message.hasOwnProperty("potMoneyCount"))
                object.potMoneyCount = $root.msg.DownBetMoney.toObject(message.potMoneyCount, options);
            if (message.potWinList && message.potWinList.length) {
                object.potWinList = [];
                for (var j = 0; j < message.potWinList.length; ++j)
                    object.potWinList[j] = $root.msg.PotWinList.toObject(message.potWinList[j], options);
            }
            if (message.historyData && message.historyData.length) {
                object.historyData = [];
                for (var j = 0; j < message.historyData.length; ++j)
                    object.historyData[j] = $root.msg.HistoryData.toObject(message.historyData[j], options);
            }
            if (message.tablePlayer && message.tablePlayer.length) {
                object.tablePlayer = [];
                for (var j = 0; j < message.tablePlayer.length; ++j)
                    object.tablePlayer[j] = $root.msg.PlayerData.toObject(message.tablePlayer[j], options);
            }
            return object;
        };

        /**
         * Converts this RoomData to JSON.
         * @function toJSON
         * @memberof msg.RoomData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomData;
    })();

    msg.JoinRoom_C2S = (function() {

        /**
         * Properties of a JoinRoom_C2S.
         * @memberof msg
         * @interface IJoinRoom_C2S
         * @property {string|null} [roomId] JoinRoom_C2S roomId
         */

        /**
         * Constructs a new JoinRoom_C2S.
         * @memberof msg
         * @classdesc Represents a JoinRoom_C2S.
         * @implements IJoinRoom_C2S
         * @constructor
         * @param {msg.IJoinRoom_C2S=} [properties] Properties to set
         */
        function JoinRoom_C2S(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoom_C2S roomId.
         * @member {string} roomId
         * @memberof msg.JoinRoom_C2S
         * @instance
         */
        JoinRoom_C2S.prototype.roomId = "";

        /**
         * Creates a new JoinRoom_C2S instance using the specified properties.
         * @function create
         * @memberof msg.JoinRoom_C2S
         * @static
         * @param {msg.IJoinRoom_C2S=} [properties] Properties to set
         * @returns {msg.JoinRoom_C2S} JoinRoom_C2S instance
         */
        JoinRoom_C2S.create = function create(properties) {
            return new JoinRoom_C2S(properties);
        };

        /**
         * Encodes the specified JoinRoom_C2S message. Does not implicitly {@link msg.JoinRoom_C2S.verify|verify} messages.
         * @function encode
         * @memberof msg.JoinRoom_C2S
         * @static
         * @param {msg.IJoinRoom_C2S} message JoinRoom_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoom_C2S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
            return writer;
        };

        /**
         * Encodes the specified JoinRoom_C2S message, length delimited. Does not implicitly {@link msg.JoinRoom_C2S.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.JoinRoom_C2S
         * @static
         * @param {msg.IJoinRoom_C2S} message JoinRoom_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoom_C2S.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoom_C2S message from the specified reader or buffer.
         * @function decode
         * @memberof msg.JoinRoom_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.JoinRoom_C2S} JoinRoom_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoom_C2S.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.JoinRoom_C2S();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoom_C2S message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.JoinRoom_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.JoinRoom_C2S} JoinRoom_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoom_C2S.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoom_C2S message.
         * @function verify
         * @memberof msg.JoinRoom_C2S
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoom_C2S.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            return null;
        };

        /**
         * Creates a JoinRoom_C2S message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.JoinRoom_C2S
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.JoinRoom_C2S} JoinRoom_C2S
         */
        JoinRoom_C2S.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.JoinRoom_C2S)
                return object;
            var message = new $root.msg.JoinRoom_C2S();
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            return message;
        };

        /**
         * Creates a plain object from a JoinRoom_C2S message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.JoinRoom_C2S
         * @static
         * @param {msg.JoinRoom_C2S} message JoinRoom_C2S
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoom_C2S.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.roomId = "";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            return object;
        };

        /**
         * Converts this JoinRoom_C2S to JSON.
         * @function toJSON
         * @memberof msg.JoinRoom_C2S
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoom_C2S.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoom_C2S;
    })();

    msg.JoinRoom_S2C = (function() {

        /**
         * Properties of a JoinRoom_S2C.
         * @memberof msg
         * @interface IJoinRoom_S2C
         * @property {msg.IRoomData|null} [roomData] JoinRoom_S2C roomData
         */

        /**
         * Constructs a new JoinRoom_S2C.
         * @memberof msg
         * @classdesc Represents a JoinRoom_S2C.
         * @implements IJoinRoom_S2C
         * @constructor
         * @param {msg.IJoinRoom_S2C=} [properties] Properties to set
         */
        function JoinRoom_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoom_S2C roomData.
         * @member {msg.IRoomData|null|undefined} roomData
         * @memberof msg.JoinRoom_S2C
         * @instance
         */
        JoinRoom_S2C.prototype.roomData = null;

        /**
         * Creates a new JoinRoom_S2C instance using the specified properties.
         * @function create
         * @memberof msg.JoinRoom_S2C
         * @static
         * @param {msg.IJoinRoom_S2C=} [properties] Properties to set
         * @returns {msg.JoinRoom_S2C} JoinRoom_S2C instance
         */
        JoinRoom_S2C.create = function create(properties) {
            return new JoinRoom_S2C(properties);
        };

        /**
         * Encodes the specified JoinRoom_S2C message. Does not implicitly {@link msg.JoinRoom_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.JoinRoom_S2C
         * @static
         * @param {msg.IJoinRoom_S2C} message JoinRoom_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoom_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomData != null && message.hasOwnProperty("roomData"))
                $root.msg.RoomData.encode(message.roomData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified JoinRoom_S2C message, length delimited. Does not implicitly {@link msg.JoinRoom_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.JoinRoom_S2C
         * @static
         * @param {msg.IJoinRoom_S2C} message JoinRoom_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoom_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoom_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.JoinRoom_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.JoinRoom_S2C} JoinRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoom_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.JoinRoom_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomData = $root.msg.RoomData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoom_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.JoinRoom_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.JoinRoom_S2C} JoinRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoom_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoom_S2C message.
         * @function verify
         * @memberof msg.JoinRoom_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoom_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomData != null && message.hasOwnProperty("roomData")) {
                var error = $root.msg.RoomData.verify(message.roomData);
                if (error)
                    return "roomData." + error;
            }
            return null;
        };

        /**
         * Creates a JoinRoom_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.JoinRoom_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.JoinRoom_S2C} JoinRoom_S2C
         */
        JoinRoom_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.JoinRoom_S2C)
                return object;
            var message = new $root.msg.JoinRoom_S2C();
            if (object.roomData != null) {
                if (typeof object.roomData !== "object")
                    throw TypeError(".msg.JoinRoom_S2C.roomData: object expected");
                message.roomData = $root.msg.RoomData.fromObject(object.roomData);
            }
            return message;
        };

        /**
         * Creates a plain object from a JoinRoom_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.JoinRoom_S2C
         * @static
         * @param {msg.JoinRoom_S2C} message JoinRoom_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoom_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.roomData = null;
            if (message.roomData != null && message.hasOwnProperty("roomData"))
                object.roomData = $root.msg.RoomData.toObject(message.roomData, options);
            return object;
        };

        /**
         * Converts this JoinRoom_S2C to JSON.
         * @function toJSON
         * @memberof msg.JoinRoom_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoom_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoom_S2C;
    })();

    msg.EnterRoom_S2C = (function() {

        /**
         * Properties of an EnterRoom_S2C.
         * @memberof msg
         * @interface IEnterRoom_S2C
         * @property {msg.IRoomData|null} [roomData] EnterRoom_S2C roomData
         */

        /**
         * Constructs a new EnterRoom_S2C.
         * @memberof msg
         * @classdesc Represents an EnterRoom_S2C.
         * @implements IEnterRoom_S2C
         * @constructor
         * @param {msg.IEnterRoom_S2C=} [properties] Properties to set
         */
        function EnterRoom_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterRoom_S2C roomData.
         * @member {msg.IRoomData|null|undefined} roomData
         * @memberof msg.EnterRoom_S2C
         * @instance
         */
        EnterRoom_S2C.prototype.roomData = null;

        /**
         * Creates a new EnterRoom_S2C instance using the specified properties.
         * @function create
         * @memberof msg.EnterRoom_S2C
         * @static
         * @param {msg.IEnterRoom_S2C=} [properties] Properties to set
         * @returns {msg.EnterRoom_S2C} EnterRoom_S2C instance
         */
        EnterRoom_S2C.create = function create(properties) {
            return new EnterRoom_S2C(properties);
        };

        /**
         * Encodes the specified EnterRoom_S2C message. Does not implicitly {@link msg.EnterRoom_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.EnterRoom_S2C
         * @static
         * @param {msg.IEnterRoom_S2C} message EnterRoom_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoom_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomData != null && message.hasOwnProperty("roomData"))
                $root.msg.RoomData.encode(message.roomData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EnterRoom_S2C message, length delimited. Does not implicitly {@link msg.EnterRoom_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.EnterRoom_S2C
         * @static
         * @param {msg.IEnterRoom_S2C} message EnterRoom_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoom_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterRoom_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.EnterRoom_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.EnterRoom_S2C} EnterRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoom_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.EnterRoom_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomData = $root.msg.RoomData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterRoom_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.EnterRoom_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.EnterRoom_S2C} EnterRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoom_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterRoom_S2C message.
         * @function verify
         * @memberof msg.EnterRoom_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterRoom_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomData != null && message.hasOwnProperty("roomData")) {
                var error = $root.msg.RoomData.verify(message.roomData);
                if (error)
                    return "roomData." + error;
            }
            return null;
        };

        /**
         * Creates an EnterRoom_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.EnterRoom_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.EnterRoom_S2C} EnterRoom_S2C
         */
        EnterRoom_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.EnterRoom_S2C)
                return object;
            var message = new $root.msg.EnterRoom_S2C();
            if (object.roomData != null) {
                if (typeof object.roomData !== "object")
                    throw TypeError(".msg.EnterRoom_S2C.roomData: object expected");
                message.roomData = $root.msg.RoomData.fromObject(object.roomData);
            }
            return message;
        };

        /**
         * Creates a plain object from an EnterRoom_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.EnterRoom_S2C
         * @static
         * @param {msg.EnterRoom_S2C} message EnterRoom_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterRoom_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.roomData = null;
            if (message.roomData != null && message.hasOwnProperty("roomData"))
                object.roomData = $root.msg.RoomData.toObject(message.roomData, options);
            return object;
        };

        /**
         * Converts this EnterRoom_S2C to JSON.
         * @function toJSON
         * @memberof msg.EnterRoom_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterRoom_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterRoom_S2C;
    })();

    msg.LeaveRoom_C2S = (function() {

        /**
         * Properties of a LeaveRoom_C2S.
         * @memberof msg
         * @interface ILeaveRoom_C2S
         */

        /**
         * Constructs a new LeaveRoom_C2S.
         * @memberof msg
         * @classdesc Represents a LeaveRoom_C2S.
         * @implements ILeaveRoom_C2S
         * @constructor
         * @param {msg.ILeaveRoom_C2S=} [properties] Properties to set
         */
        function LeaveRoom_C2S(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new LeaveRoom_C2S instance using the specified properties.
         * @function create
         * @memberof msg.LeaveRoom_C2S
         * @static
         * @param {msg.ILeaveRoom_C2S=} [properties] Properties to set
         * @returns {msg.LeaveRoom_C2S} LeaveRoom_C2S instance
         */
        LeaveRoom_C2S.create = function create(properties) {
            return new LeaveRoom_C2S(properties);
        };

        /**
         * Encodes the specified LeaveRoom_C2S message. Does not implicitly {@link msg.LeaveRoom_C2S.verify|verify} messages.
         * @function encode
         * @memberof msg.LeaveRoom_C2S
         * @static
         * @param {msg.ILeaveRoom_C2S} message LeaveRoom_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoom_C2S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified LeaveRoom_C2S message, length delimited. Does not implicitly {@link msg.LeaveRoom_C2S.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LeaveRoom_C2S
         * @static
         * @param {msg.ILeaveRoom_C2S} message LeaveRoom_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoom_C2S.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeaveRoom_C2S message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LeaveRoom_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LeaveRoom_C2S} LeaveRoom_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoom_C2S.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LeaveRoom_C2S();
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
         * Decodes a LeaveRoom_C2S message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LeaveRoom_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LeaveRoom_C2S} LeaveRoom_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoom_C2S.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveRoom_C2S message.
         * @function verify
         * @memberof msg.LeaveRoom_C2S
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveRoom_C2S.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a LeaveRoom_C2S message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LeaveRoom_C2S
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LeaveRoom_C2S} LeaveRoom_C2S
         */
        LeaveRoom_C2S.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LeaveRoom_C2S)
                return object;
            return new $root.msg.LeaveRoom_C2S();
        };

        /**
         * Creates a plain object from a LeaveRoom_C2S message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LeaveRoom_C2S
         * @static
         * @param {msg.LeaveRoom_C2S} message LeaveRoom_C2S
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveRoom_C2S.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this LeaveRoom_C2S to JSON.
         * @function toJSON
         * @memberof msg.LeaveRoom_C2S
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveRoom_C2S.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LeaveRoom_C2S;
    })();

    msg.LeaveRoom_S2C = (function() {

        /**
         * Properties of a LeaveRoom_S2C.
         * @memberof msg
         * @interface ILeaveRoom_S2C
         * @property {msg.IPlayerInfo|null} [playerInfo] LeaveRoom_S2C playerInfo
         */

        /**
         * Constructs a new LeaveRoom_S2C.
         * @memberof msg
         * @classdesc Represents a LeaveRoom_S2C.
         * @implements ILeaveRoom_S2C
         * @constructor
         * @param {msg.ILeaveRoom_S2C=} [properties] Properties to set
         */
        function LeaveRoom_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LeaveRoom_S2C playerInfo.
         * @member {msg.IPlayerInfo|null|undefined} playerInfo
         * @memberof msg.LeaveRoom_S2C
         * @instance
         */
        LeaveRoom_S2C.prototype.playerInfo = null;

        /**
         * Creates a new LeaveRoom_S2C instance using the specified properties.
         * @function create
         * @memberof msg.LeaveRoom_S2C
         * @static
         * @param {msg.ILeaveRoom_S2C=} [properties] Properties to set
         * @returns {msg.LeaveRoom_S2C} LeaveRoom_S2C instance
         */
        LeaveRoom_S2C.create = function create(properties) {
            return new LeaveRoom_S2C(properties);
        };

        /**
         * Encodes the specified LeaveRoom_S2C message. Does not implicitly {@link msg.LeaveRoom_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.LeaveRoom_S2C
         * @static
         * @param {msg.ILeaveRoom_S2C} message LeaveRoom_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoom_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                $root.msg.PlayerInfo.encode(message.playerInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified LeaveRoom_S2C message, length delimited. Does not implicitly {@link msg.LeaveRoom_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LeaveRoom_S2C
         * @static
         * @param {msg.ILeaveRoom_S2C} message LeaveRoom_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoom_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeaveRoom_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LeaveRoom_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LeaveRoom_S2C} LeaveRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoom_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LeaveRoom_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerInfo = $root.msg.PlayerInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LeaveRoom_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LeaveRoom_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LeaveRoom_S2C} LeaveRoom_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoom_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveRoom_S2C message.
         * @function verify
         * @memberof msg.LeaveRoom_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveRoom_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo")) {
                var error = $root.msg.PlayerInfo.verify(message.playerInfo);
                if (error)
                    return "playerInfo." + error;
            }
            return null;
        };

        /**
         * Creates a LeaveRoom_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LeaveRoom_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LeaveRoom_S2C} LeaveRoom_S2C
         */
        LeaveRoom_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LeaveRoom_S2C)
                return object;
            var message = new $root.msg.LeaveRoom_S2C();
            if (object.playerInfo != null) {
                if (typeof object.playerInfo !== "object")
                    throw TypeError(".msg.LeaveRoom_S2C.playerInfo: object expected");
                message.playerInfo = $root.msg.PlayerInfo.fromObject(object.playerInfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a LeaveRoom_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LeaveRoom_S2C
         * @static
         * @param {msg.LeaveRoom_S2C} message LeaveRoom_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveRoom_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.playerInfo = null;
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                object.playerInfo = $root.msg.PlayerInfo.toObject(message.playerInfo, options);
            return object;
        };

        /**
         * Converts this LeaveRoom_S2C to JSON.
         * @function toJSON
         * @memberof msg.LeaveRoom_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveRoom_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LeaveRoom_S2C;
    })();

    msg.ActionTime_S2C = (function() {

        /**
         * Properties of an ActionTime_S2C.
         * @memberof msg
         * @interface IActionTime_S2C
         * @property {msg.GameStep|null} [gameStep] ActionTime_S2C gameStep
         * @property {msg.IRoomData|null} [roomData] ActionTime_S2C roomData
         */

        /**
         * Constructs a new ActionTime_S2C.
         * @memberof msg
         * @classdesc Represents an ActionTime_S2C.
         * @implements IActionTime_S2C
         * @constructor
         * @param {msg.IActionTime_S2C=} [properties] Properties to set
         */
        function ActionTime_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActionTime_S2C gameStep.
         * @member {msg.GameStep} gameStep
         * @memberof msg.ActionTime_S2C
         * @instance
         */
        ActionTime_S2C.prototype.gameStep = 0;

        /**
         * ActionTime_S2C roomData.
         * @member {msg.IRoomData|null|undefined} roomData
         * @memberof msg.ActionTime_S2C
         * @instance
         */
        ActionTime_S2C.prototype.roomData = null;

        /**
         * Creates a new ActionTime_S2C instance using the specified properties.
         * @function create
         * @memberof msg.ActionTime_S2C
         * @static
         * @param {msg.IActionTime_S2C=} [properties] Properties to set
         * @returns {msg.ActionTime_S2C} ActionTime_S2C instance
         */
        ActionTime_S2C.create = function create(properties) {
            return new ActionTime_S2C(properties);
        };

        /**
         * Encodes the specified ActionTime_S2C message. Does not implicitly {@link msg.ActionTime_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.ActionTime_S2C
         * @static
         * @param {msg.IActionTime_S2C} message ActionTime_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActionTime_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameStep != null && message.hasOwnProperty("gameStep"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameStep);
            if (message.roomData != null && message.hasOwnProperty("roomData"))
                $root.msg.RoomData.encode(message.roomData, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ActionTime_S2C message, length delimited. Does not implicitly {@link msg.ActionTime_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ActionTime_S2C
         * @static
         * @param {msg.IActionTime_S2C} message ActionTime_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActionTime_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ActionTime_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ActionTime_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ActionTime_S2C} ActionTime_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActionTime_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ActionTime_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gameStep = reader.int32();
                    break;
                case 2:
                    message.roomData = $root.msg.RoomData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ActionTime_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ActionTime_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ActionTime_S2C} ActionTime_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActionTime_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ActionTime_S2C message.
         * @function verify
         * @memberof msg.ActionTime_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ActionTime_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameStep != null && message.hasOwnProperty("gameStep"))
                switch (message.gameStep) {
                default:
                    return "gameStep: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.roomData != null && message.hasOwnProperty("roomData")) {
                var error = $root.msg.RoomData.verify(message.roomData);
                if (error)
                    return "roomData." + error;
            }
            return null;
        };

        /**
         * Creates an ActionTime_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ActionTime_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ActionTime_S2C} ActionTime_S2C
         */
        ActionTime_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ActionTime_S2C)
                return object;
            var message = new $root.msg.ActionTime_S2C();
            switch (object.gameStep) {
            case "XX_Step":
            case 0:
                message.gameStep = 0;
                break;
            case "Banker":
            case 1:
                message.gameStep = 1;
                break;
            case "Banker2":
            case 2:
                message.gameStep = 2;
                break;
            case "DownBet":
            case 3:
                message.gameStep = 3;
                break;
            case "Settle":
            case 4:
                message.gameStep = 4;
                break;
            }
            if (object.roomData != null) {
                if (typeof object.roomData !== "object")
                    throw TypeError(".msg.ActionTime_S2C.roomData: object expected");
                message.roomData = $root.msg.RoomData.fromObject(object.roomData);
            }
            return message;
        };

        /**
         * Creates a plain object from an ActionTime_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ActionTime_S2C
         * @static
         * @param {msg.ActionTime_S2C} message ActionTime_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActionTime_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameStep = options.enums === String ? "XX_Step" : 0;
                object.roomData = null;
            }
            if (message.gameStep != null && message.hasOwnProperty("gameStep"))
                object.gameStep = options.enums === String ? $root.msg.GameStep[message.gameStep] : message.gameStep;
            if (message.roomData != null && message.hasOwnProperty("roomData"))
                object.roomData = $root.msg.RoomData.toObject(message.roomData, options);
            return object;
        };

        /**
         * Converts this ActionTime_S2C to JSON.
         * @function toJSON
         * @memberof msg.ActionTime_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ActionTime_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ActionTime_S2C;
    })();

    msg.PlayerAction_C2S = (function() {

        /**
         * Properties of a PlayerAction_C2S.
         * @memberof msg
         * @interface IPlayerAction_C2S
         * @property {number|null} [downBet] PlayerAction_C2S downBet
         * @property {msg.PotType|null} [downPot] PlayerAction_C2S downPot
         * @property {boolean|null} [IsAction] PlayerAction_C2S IsAction
         */

        /**
         * Constructs a new PlayerAction_C2S.
         * @memberof msg
         * @classdesc Represents a PlayerAction_C2S.
         * @implements IPlayerAction_C2S
         * @constructor
         * @param {msg.IPlayerAction_C2S=} [properties] Properties to set
         */
        function PlayerAction_C2S(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerAction_C2S downBet.
         * @member {number} downBet
         * @memberof msg.PlayerAction_C2S
         * @instance
         */
        PlayerAction_C2S.prototype.downBet = 0;

        /**
         * PlayerAction_C2S downPot.
         * @member {msg.PotType} downPot
         * @memberof msg.PlayerAction_C2S
         * @instance
         */
        PlayerAction_C2S.prototype.downPot = 0;

        /**
         * PlayerAction_C2S IsAction.
         * @member {boolean} IsAction
         * @memberof msg.PlayerAction_C2S
         * @instance
         */
        PlayerAction_C2S.prototype.IsAction = false;

        /**
         * Creates a new PlayerAction_C2S instance using the specified properties.
         * @function create
         * @memberof msg.PlayerAction_C2S
         * @static
         * @param {msg.IPlayerAction_C2S=} [properties] Properties to set
         * @returns {msg.PlayerAction_C2S} PlayerAction_C2S instance
         */
        PlayerAction_C2S.create = function create(properties) {
            return new PlayerAction_C2S(properties);
        };

        /**
         * Encodes the specified PlayerAction_C2S message. Does not implicitly {@link msg.PlayerAction_C2S.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerAction_C2S
         * @static
         * @param {msg.IPlayerAction_C2S} message PlayerAction_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerAction_C2S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.downBet != null && message.hasOwnProperty("downBet"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.downBet);
            if (message.downPot != null && message.hasOwnProperty("downPot"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.downPot);
            if (message.IsAction != null && message.hasOwnProperty("IsAction"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.IsAction);
            return writer;
        };

        /**
         * Encodes the specified PlayerAction_C2S message, length delimited. Does not implicitly {@link msg.PlayerAction_C2S.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerAction_C2S
         * @static
         * @param {msg.IPlayerAction_C2S} message PlayerAction_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerAction_C2S.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerAction_C2S message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerAction_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerAction_C2S} PlayerAction_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerAction_C2S.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerAction_C2S();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.downBet = reader.int32();
                    break;
                case 2:
                    message.downPot = reader.int32();
                    break;
                case 3:
                    message.IsAction = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerAction_C2S message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerAction_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerAction_C2S} PlayerAction_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerAction_C2S.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerAction_C2S message.
         * @function verify
         * @memberof msg.PlayerAction_C2S
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerAction_C2S.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.downBet != null && message.hasOwnProperty("downBet"))
                if (!$util.isInteger(message.downBet))
                    return "downBet: integer expected";
            if (message.downPot != null && message.hasOwnProperty("downPot"))
                switch (message.downPot) {
                default:
                    return "downPot: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    break;
                }
            if (message.IsAction != null && message.hasOwnProperty("IsAction"))
                if (typeof message.IsAction !== "boolean")
                    return "IsAction: boolean expected";
            return null;
        };

        /**
         * Creates a PlayerAction_C2S message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerAction_C2S
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerAction_C2S} PlayerAction_C2S
         */
        PlayerAction_C2S.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerAction_C2S)
                return object;
            var message = new $root.msg.PlayerAction_C2S();
            if (object.downBet != null)
                message.downBet = object.downBet | 0;
            switch (object.downPot) {
            case "XX_Pot":
            case 0:
                message.downPot = 0;
                break;
            case "BigPot":
            case 1:
                message.downPot = 1;
                break;
            case "SmallPot":
            case 2:
                message.downPot = 2;
                break;
            case "SinglePot":
            case 3:
                message.downPot = 3;
                break;
            case "DoublePot":
            case 4:
                message.downPot = 4;
                break;
            case "PairPot":
            case 5:
                message.downPot = 5;
                break;
            case "StraightPot":
            case 6:
                message.downPot = 6;
                break;
            case "LeopardPot":
            case 7:
                message.downPot = 7;
                break;
            }
            if (object.IsAction != null)
                message.IsAction = Boolean(object.IsAction);
            return message;
        };

        /**
         * Creates a plain object from a PlayerAction_C2S message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerAction_C2S
         * @static
         * @param {msg.PlayerAction_C2S} message PlayerAction_C2S
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerAction_C2S.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.downBet = 0;
                object.downPot = options.enums === String ? "XX_Pot" : 0;
                object.IsAction = false;
            }
            if (message.downBet != null && message.hasOwnProperty("downBet"))
                object.downBet = message.downBet;
            if (message.downPot != null && message.hasOwnProperty("downPot"))
                object.downPot = options.enums === String ? $root.msg.PotType[message.downPot] : message.downPot;
            if (message.IsAction != null && message.hasOwnProperty("IsAction"))
                object.IsAction = message.IsAction;
            return object;
        };

        /**
         * Converts this PlayerAction_C2S to JSON.
         * @function toJSON
         * @memberof msg.PlayerAction_C2S
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerAction_C2S.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerAction_C2S;
    })();

    msg.PlayerAction_S2C = (function() {

        /**
         * Properties of a PlayerAction_S2C.
         * @memberof msg
         * @interface IPlayerAction_S2C
         * @property {string|null} [Id] PlayerAction_S2C Id
         * @property {number|null} [downBet] PlayerAction_S2C downBet
         * @property {msg.PotType|null} [downPot] PlayerAction_S2C downPot
         * @property {boolean|null} [IsAction] PlayerAction_S2C IsAction
         * @property {number|null} [account] PlayerAction_S2C account
         */

        /**
         * Constructs a new PlayerAction_S2C.
         * @memberof msg
         * @classdesc Represents a PlayerAction_S2C.
         * @implements IPlayerAction_S2C
         * @constructor
         * @param {msg.IPlayerAction_S2C=} [properties] Properties to set
         */
        function PlayerAction_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerAction_S2C Id.
         * @member {string} Id
         * @memberof msg.PlayerAction_S2C
         * @instance
         */
        PlayerAction_S2C.prototype.Id = "";

        /**
         * PlayerAction_S2C downBet.
         * @member {number} downBet
         * @memberof msg.PlayerAction_S2C
         * @instance
         */
        PlayerAction_S2C.prototype.downBet = 0;

        /**
         * PlayerAction_S2C downPot.
         * @member {msg.PotType} downPot
         * @memberof msg.PlayerAction_S2C
         * @instance
         */
        PlayerAction_S2C.prototype.downPot = 0;

        /**
         * PlayerAction_S2C IsAction.
         * @member {boolean} IsAction
         * @memberof msg.PlayerAction_S2C
         * @instance
         */
        PlayerAction_S2C.prototype.IsAction = false;

        /**
         * PlayerAction_S2C account.
         * @member {number} account
         * @memberof msg.PlayerAction_S2C
         * @instance
         */
        PlayerAction_S2C.prototype.account = 0;

        /**
         * Creates a new PlayerAction_S2C instance using the specified properties.
         * @function create
         * @memberof msg.PlayerAction_S2C
         * @static
         * @param {msg.IPlayerAction_S2C=} [properties] Properties to set
         * @returns {msg.PlayerAction_S2C} PlayerAction_S2C instance
         */
        PlayerAction_S2C.create = function create(properties) {
            return new PlayerAction_S2C(properties);
        };

        /**
         * Encodes the specified PlayerAction_S2C message. Does not implicitly {@link msg.PlayerAction_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerAction_S2C
         * @static
         * @param {msg.IPlayerAction_S2C} message PlayerAction_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerAction_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Id != null && message.hasOwnProperty("Id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Id);
            if (message.downBet != null && message.hasOwnProperty("downBet"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.downBet);
            if (message.downPot != null && message.hasOwnProperty("downPot"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.downPot);
            if (message.IsAction != null && message.hasOwnProperty("IsAction"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.IsAction);
            if (message.account != null && message.hasOwnProperty("account"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.account);
            return writer;
        };

        /**
         * Encodes the specified PlayerAction_S2C message, length delimited. Does not implicitly {@link msg.PlayerAction_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerAction_S2C
         * @static
         * @param {msg.IPlayerAction_S2C} message PlayerAction_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerAction_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerAction_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerAction_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerAction_S2C} PlayerAction_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerAction_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerAction_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Id = reader.string();
                    break;
                case 2:
                    message.downBet = reader.int32();
                    break;
                case 3:
                    message.downPot = reader.int32();
                    break;
                case 4:
                    message.IsAction = reader.bool();
                    break;
                case 5:
                    message.account = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerAction_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerAction_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerAction_S2C} PlayerAction_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerAction_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerAction_S2C message.
         * @function verify
         * @memberof msg.PlayerAction_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerAction_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Id != null && message.hasOwnProperty("Id"))
                if (!$util.isString(message.Id))
                    return "Id: string expected";
            if (message.downBet != null && message.hasOwnProperty("downBet"))
                if (!$util.isInteger(message.downBet))
                    return "downBet: integer expected";
            if (message.downPot != null && message.hasOwnProperty("downPot"))
                switch (message.downPot) {
                default:
                    return "downPot: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    break;
                }
            if (message.IsAction != null && message.hasOwnProperty("IsAction"))
                if (typeof message.IsAction !== "boolean")
                    return "IsAction: boolean expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (typeof message.account !== "number")
                    return "account: number expected";
            return null;
        };

        /**
         * Creates a PlayerAction_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerAction_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerAction_S2C} PlayerAction_S2C
         */
        PlayerAction_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerAction_S2C)
                return object;
            var message = new $root.msg.PlayerAction_S2C();
            if (object.Id != null)
                message.Id = String(object.Id);
            if (object.downBet != null)
                message.downBet = object.downBet | 0;
            switch (object.downPot) {
            case "XX_Pot":
            case 0:
                message.downPot = 0;
                break;
            case "BigPot":
            case 1:
                message.downPot = 1;
                break;
            case "SmallPot":
            case 2:
                message.downPot = 2;
                break;
            case "SinglePot":
            case 3:
                message.downPot = 3;
                break;
            case "DoublePot":
            case 4:
                message.downPot = 4;
                break;
            case "PairPot":
            case 5:
                message.downPot = 5;
                break;
            case "StraightPot":
            case 6:
                message.downPot = 6;
                break;
            case "LeopardPot":
            case 7:
                message.downPot = 7;
                break;
            }
            if (object.IsAction != null)
                message.IsAction = Boolean(object.IsAction);
            if (object.account != null)
                message.account = Number(object.account);
            return message;
        };

        /**
         * Creates a plain object from a PlayerAction_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerAction_S2C
         * @static
         * @param {msg.PlayerAction_S2C} message PlayerAction_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerAction_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Id = "";
                object.downBet = 0;
                object.downPot = options.enums === String ? "XX_Pot" : 0;
                object.IsAction = false;
                object.account = 0;
            }
            if (message.Id != null && message.hasOwnProperty("Id"))
                object.Id = message.Id;
            if (message.downBet != null && message.hasOwnProperty("downBet"))
                object.downBet = message.downBet;
            if (message.downPot != null && message.hasOwnProperty("downPot"))
                object.downPot = options.enums === String ? $root.msg.PotType[message.downPot] : message.downPot;
            if (message.IsAction != null && message.hasOwnProperty("IsAction"))
                object.IsAction = message.IsAction;
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = options.json && !isFinite(message.account) ? String(message.account) : message.account;
            return object;
        };

        /**
         * Converts this PlayerAction_S2C to JSON.
         * @function toJSON
         * @memberof msg.PlayerAction_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerAction_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerAction_S2C;
    })();

    msg.PotChangeMoney_S2C = (function() {

        /**
         * Properties of a PotChangeMoney_S2C.
         * @memberof msg
         * @interface IPotChangeMoney_S2C
         * @property {msg.IDownBetMoney|null} [potMoneyCount] PotChangeMoney_S2C potMoneyCount
         */

        /**
         * Constructs a new PotChangeMoney_S2C.
         * @memberof msg
         * @classdesc Represents a PotChangeMoney_S2C.
         * @implements IPotChangeMoney_S2C
         * @constructor
         * @param {msg.IPotChangeMoney_S2C=} [properties] Properties to set
         */
        function PotChangeMoney_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PotChangeMoney_S2C potMoneyCount.
         * @member {msg.IDownBetMoney|null|undefined} potMoneyCount
         * @memberof msg.PotChangeMoney_S2C
         * @instance
         */
        PotChangeMoney_S2C.prototype.potMoneyCount = null;

        /**
         * Creates a new PotChangeMoney_S2C instance using the specified properties.
         * @function create
         * @memberof msg.PotChangeMoney_S2C
         * @static
         * @param {msg.IPotChangeMoney_S2C=} [properties] Properties to set
         * @returns {msg.PotChangeMoney_S2C} PotChangeMoney_S2C instance
         */
        PotChangeMoney_S2C.create = function create(properties) {
            return new PotChangeMoney_S2C(properties);
        };

        /**
         * Encodes the specified PotChangeMoney_S2C message. Does not implicitly {@link msg.PotChangeMoney_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.PotChangeMoney_S2C
         * @static
         * @param {msg.IPotChangeMoney_S2C} message PotChangeMoney_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PotChangeMoney_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.potMoneyCount != null && message.hasOwnProperty("potMoneyCount"))
                $root.msg.DownBetMoney.encode(message.potMoneyCount, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PotChangeMoney_S2C message, length delimited. Does not implicitly {@link msg.PotChangeMoney_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PotChangeMoney_S2C
         * @static
         * @param {msg.IPotChangeMoney_S2C} message PotChangeMoney_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PotChangeMoney_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PotChangeMoney_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PotChangeMoney_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PotChangeMoney_S2C} PotChangeMoney_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PotChangeMoney_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PotChangeMoney_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.potMoneyCount = $root.msg.DownBetMoney.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PotChangeMoney_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PotChangeMoney_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PotChangeMoney_S2C} PotChangeMoney_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PotChangeMoney_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PotChangeMoney_S2C message.
         * @function verify
         * @memberof msg.PotChangeMoney_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PotChangeMoney_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.potMoneyCount != null && message.hasOwnProperty("potMoneyCount")) {
                var error = $root.msg.DownBetMoney.verify(message.potMoneyCount);
                if (error)
                    return "potMoneyCount." + error;
            }
            return null;
        };

        /**
         * Creates a PotChangeMoney_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PotChangeMoney_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PotChangeMoney_S2C} PotChangeMoney_S2C
         */
        PotChangeMoney_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PotChangeMoney_S2C)
                return object;
            var message = new $root.msg.PotChangeMoney_S2C();
            if (object.potMoneyCount != null) {
                if (typeof object.potMoneyCount !== "object")
                    throw TypeError(".msg.PotChangeMoney_S2C.potMoneyCount: object expected");
                message.potMoneyCount = $root.msg.DownBetMoney.fromObject(object.potMoneyCount);
            }
            return message;
        };

        /**
         * Creates a plain object from a PotChangeMoney_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PotChangeMoney_S2C
         * @static
         * @param {msg.PotChangeMoney_S2C} message PotChangeMoney_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PotChangeMoney_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.potMoneyCount = null;
            if (message.potMoneyCount != null && message.hasOwnProperty("potMoneyCount"))
                object.potMoneyCount = $root.msg.DownBetMoney.toObject(message.potMoneyCount, options);
            return object;
        };

        /**
         * Converts this PotChangeMoney_S2C to JSON.
         * @function toJSON
         * @memberof msg.PotChangeMoney_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PotChangeMoney_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PotChangeMoney_S2C;
    })();

    msg.UptPlayerList_S2C = (function() {

        /**
         * Properties of an UptPlayerList_S2C.
         * @memberof msg
         * @interface IUptPlayerList_S2C
         * @property {Array.<msg.IPlayerData>|null} [playerList] UptPlayerList_S2C playerList
         */

        /**
         * Constructs a new UptPlayerList_S2C.
         * @memberof msg
         * @classdesc Represents an UptPlayerList_S2C.
         * @implements IUptPlayerList_S2C
         * @constructor
         * @param {msg.IUptPlayerList_S2C=} [properties] Properties to set
         */
        function UptPlayerList_S2C(properties) {
            this.playerList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UptPlayerList_S2C playerList.
         * @member {Array.<msg.IPlayerData>} playerList
         * @memberof msg.UptPlayerList_S2C
         * @instance
         */
        UptPlayerList_S2C.prototype.playerList = $util.emptyArray;

        /**
         * Creates a new UptPlayerList_S2C instance using the specified properties.
         * @function create
         * @memberof msg.UptPlayerList_S2C
         * @static
         * @param {msg.IUptPlayerList_S2C=} [properties] Properties to set
         * @returns {msg.UptPlayerList_S2C} UptPlayerList_S2C instance
         */
        UptPlayerList_S2C.create = function create(properties) {
            return new UptPlayerList_S2C(properties);
        };

        /**
         * Encodes the specified UptPlayerList_S2C message. Does not implicitly {@link msg.UptPlayerList_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.UptPlayerList_S2C
         * @static
         * @param {msg.IUptPlayerList_S2C} message UptPlayerList_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UptPlayerList_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerList != null && message.playerList.length)
                for (var i = 0; i < message.playerList.length; ++i)
                    $root.msg.PlayerData.encode(message.playerList[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UptPlayerList_S2C message, length delimited. Does not implicitly {@link msg.UptPlayerList_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UptPlayerList_S2C
         * @static
         * @param {msg.IUptPlayerList_S2C} message UptPlayerList_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UptPlayerList_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UptPlayerList_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UptPlayerList_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UptPlayerList_S2C} UptPlayerList_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UptPlayerList_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UptPlayerList_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.playerList && message.playerList.length))
                        message.playerList = [];
                    message.playerList.push($root.msg.PlayerData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UptPlayerList_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UptPlayerList_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UptPlayerList_S2C} UptPlayerList_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UptPlayerList_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UptPlayerList_S2C message.
         * @function verify
         * @memberof msg.UptPlayerList_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UptPlayerList_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerList != null && message.hasOwnProperty("playerList")) {
                if (!Array.isArray(message.playerList))
                    return "playerList: array expected";
                for (var i = 0; i < message.playerList.length; ++i) {
                    var error = $root.msg.PlayerData.verify(message.playerList[i]);
                    if (error)
                        return "playerList." + error;
                }
            }
            return null;
        };

        /**
         * Creates an UptPlayerList_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UptPlayerList_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UptPlayerList_S2C} UptPlayerList_S2C
         */
        UptPlayerList_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UptPlayerList_S2C)
                return object;
            var message = new $root.msg.UptPlayerList_S2C();
            if (object.playerList) {
                if (!Array.isArray(object.playerList))
                    throw TypeError(".msg.UptPlayerList_S2C.playerList: array expected");
                message.playerList = [];
                for (var i = 0; i < object.playerList.length; ++i) {
                    if (typeof object.playerList[i] !== "object")
                        throw TypeError(".msg.UptPlayerList_S2C.playerList: object expected");
                    message.playerList[i] = $root.msg.PlayerData.fromObject(object.playerList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an UptPlayerList_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UptPlayerList_S2C
         * @static
         * @param {msg.UptPlayerList_S2C} message UptPlayerList_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UptPlayerList_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.playerList = [];
            if (message.playerList && message.playerList.length) {
                object.playerList = [];
                for (var j = 0; j < message.playerList.length; ++j)
                    object.playerList[j] = $root.msg.PlayerData.toObject(message.playerList[j], options);
            }
            return object;
        };

        /**
         * Converts this UptPlayerList_S2C to JSON.
         * @function toJSON
         * @memberof msg.UptPlayerList_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UptPlayerList_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UptPlayerList_S2C;
    })();

    msg.ResultData_S2C = (function() {

        /**
         * Properties of a ResultData_S2C.
         * @memberof msg
         * @interface IResultData_S2C
         * @property {msg.IRoomData|null} [roomData] ResultData_S2C roomData
         */

        /**
         * Constructs a new ResultData_S2C.
         * @memberof msg
         * @classdesc Represents a ResultData_S2C.
         * @implements IResultData_S2C
         * @constructor
         * @param {msg.IResultData_S2C=} [properties] Properties to set
         */
        function ResultData_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResultData_S2C roomData.
         * @member {msg.IRoomData|null|undefined} roomData
         * @memberof msg.ResultData_S2C
         * @instance
         */
        ResultData_S2C.prototype.roomData = null;

        /**
         * Creates a new ResultData_S2C instance using the specified properties.
         * @function create
         * @memberof msg.ResultData_S2C
         * @static
         * @param {msg.IResultData_S2C=} [properties] Properties to set
         * @returns {msg.ResultData_S2C} ResultData_S2C instance
         */
        ResultData_S2C.create = function create(properties) {
            return new ResultData_S2C(properties);
        };

        /**
         * Encodes the specified ResultData_S2C message. Does not implicitly {@link msg.ResultData_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.ResultData_S2C
         * @static
         * @param {msg.IResultData_S2C} message ResultData_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultData_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomData != null && message.hasOwnProperty("roomData"))
                $root.msg.RoomData.encode(message.roomData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ResultData_S2C message, length delimited. Does not implicitly {@link msg.ResultData_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ResultData_S2C
         * @static
         * @param {msg.IResultData_S2C} message ResultData_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultData_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResultData_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ResultData_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ResultData_S2C} ResultData_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultData_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ResultData_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomData = $root.msg.RoomData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResultData_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ResultData_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ResultData_S2C} ResultData_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultData_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResultData_S2C message.
         * @function verify
         * @memberof msg.ResultData_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResultData_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomData != null && message.hasOwnProperty("roomData")) {
                var error = $root.msg.RoomData.verify(message.roomData);
                if (error)
                    return "roomData." + error;
            }
            return null;
        };

        /**
         * Creates a ResultData_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ResultData_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ResultData_S2C} ResultData_S2C
         */
        ResultData_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ResultData_S2C)
                return object;
            var message = new $root.msg.ResultData_S2C();
            if (object.roomData != null) {
                if (typeof object.roomData !== "object")
                    throw TypeError(".msg.ResultData_S2C.roomData: object expected");
                message.roomData = $root.msg.RoomData.fromObject(object.roomData);
            }
            return message;
        };

        /**
         * Creates a plain object from a ResultData_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ResultData_S2C
         * @static
         * @param {msg.ResultData_S2C} message ResultData_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResultData_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.roomData = null;
            if (message.roomData != null && message.hasOwnProperty("roomData"))
                object.roomData = $root.msg.RoomData.toObject(message.roomData, options);
            return object;
        };

        /**
         * Converts this ResultData_S2C to JSON.
         * @function toJSON
         * @memberof msg.ResultData_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResultData_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ResultData_S2C;
    })();

    msg.BankerData_C2S = (function() {

        /**
         * Properties of a BankerData_C2S.
         * @memberof msg
         * @interface IBankerData_C2S
         * @property {msg.BankerStatus|null} [status] BankerData_C2S status
         * @property {number|null} [takeMoney] BankerData_C2S takeMoney
         */

        /**
         * Constructs a new BankerData_C2S.
         * @memberof msg
         * @classdesc Represents a BankerData_C2S.
         * @implements IBankerData_C2S
         * @constructor
         * @param {msg.IBankerData_C2S=} [properties] Properties to set
         */
        function BankerData_C2S(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BankerData_C2S status.
         * @member {msg.BankerStatus} status
         * @memberof msg.BankerData_C2S
         * @instance
         */
        BankerData_C2S.prototype.status = 0;

        /**
         * BankerData_C2S takeMoney.
         * @member {number} takeMoney
         * @memberof msg.BankerData_C2S
         * @instance
         */
        BankerData_C2S.prototype.takeMoney = 0;

        /**
         * Creates a new BankerData_C2S instance using the specified properties.
         * @function create
         * @memberof msg.BankerData_C2S
         * @static
         * @param {msg.IBankerData_C2S=} [properties] Properties to set
         * @returns {msg.BankerData_C2S} BankerData_C2S instance
         */
        BankerData_C2S.create = function create(properties) {
            return new BankerData_C2S(properties);
        };

        /**
         * Encodes the specified BankerData_C2S message. Does not implicitly {@link msg.BankerData_C2S.verify|verify} messages.
         * @function encode
         * @memberof msg.BankerData_C2S
         * @static
         * @param {msg.IBankerData_C2S} message BankerData_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BankerData_C2S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
            if (message.takeMoney != null && message.hasOwnProperty("takeMoney"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.takeMoney);
            return writer;
        };

        /**
         * Encodes the specified BankerData_C2S message, length delimited. Does not implicitly {@link msg.BankerData_C2S.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BankerData_C2S
         * @static
         * @param {msg.IBankerData_C2S} message BankerData_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BankerData_C2S.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BankerData_C2S message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BankerData_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BankerData_C2S} BankerData_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BankerData_C2S.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BankerData_C2S();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.status = reader.int32();
                    break;
                case 2:
                    message.takeMoney = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BankerData_C2S message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BankerData_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BankerData_C2S} BankerData_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BankerData_C2S.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BankerData_C2S message.
         * @function verify
         * @memberof msg.BankerData_C2S
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BankerData_C2S.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.takeMoney != null && message.hasOwnProperty("takeMoney"))
                if (!$util.isInteger(message.takeMoney))
                    return "takeMoney: integer expected";
            return null;
        };

        /**
         * Creates a BankerData_C2S message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BankerData_C2S
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BankerData_C2S} BankerData_C2S
         */
        BankerData_C2S.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BankerData_C2S)
                return object;
            var message = new $root.msg.BankerData_C2S();
            switch (object.status) {
            case "BankerNot":
            case 0:
                message.status = 0;
                break;
            case "BankerUp":
            case 1:
                message.status = 1;
                break;
            case "BankerDown":
            case 2:
                message.status = 2;
                break;
            }
            if (object.takeMoney != null)
                message.takeMoney = object.takeMoney | 0;
            return message;
        };

        /**
         * Creates a plain object from a BankerData_C2S message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BankerData_C2S
         * @static
         * @param {msg.BankerData_C2S} message BankerData_C2S
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BankerData_C2S.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.status = options.enums === String ? "BankerNot" : 0;
                object.takeMoney = 0;
            }
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.msg.BankerStatus[message.status] : message.status;
            if (message.takeMoney != null && message.hasOwnProperty("takeMoney"))
                object.takeMoney = message.takeMoney;
            return object;
        };

        /**
         * Converts this BankerData_C2S to JSON.
         * @function toJSON
         * @memberof msg.BankerData_C2S
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BankerData_C2S.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BankerData_C2S;
    })();

    msg.BankerData_S2C = (function() {

        /**
         * Properties of a BankerData_S2C.
         * @memberof msg
         * @interface IBankerData_S2C
         * @property {msg.IPlayerData|null} [banker] BankerData_S2C banker
         * @property {number|null} [takeMoney] BankerData_S2C takeMoney
         */

        /**
         * Constructs a new BankerData_S2C.
         * @memberof msg
         * @classdesc Represents a BankerData_S2C.
         * @implements IBankerData_S2C
         * @constructor
         * @param {msg.IBankerData_S2C=} [properties] Properties to set
         */
        function BankerData_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BankerData_S2C banker.
         * @member {msg.IPlayerData|null|undefined} banker
         * @memberof msg.BankerData_S2C
         * @instance
         */
        BankerData_S2C.prototype.banker = null;

        /**
         * BankerData_S2C takeMoney.
         * @member {number} takeMoney
         * @memberof msg.BankerData_S2C
         * @instance
         */
        BankerData_S2C.prototype.takeMoney = 0;

        /**
         * Creates a new BankerData_S2C instance using the specified properties.
         * @function create
         * @memberof msg.BankerData_S2C
         * @static
         * @param {msg.IBankerData_S2C=} [properties] Properties to set
         * @returns {msg.BankerData_S2C} BankerData_S2C instance
         */
        BankerData_S2C.create = function create(properties) {
            return new BankerData_S2C(properties);
        };

        /**
         * Encodes the specified BankerData_S2C message. Does not implicitly {@link msg.BankerData_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.BankerData_S2C
         * @static
         * @param {msg.IBankerData_S2C} message BankerData_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BankerData_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.banker != null && message.hasOwnProperty("banker"))
                $root.msg.PlayerData.encode(message.banker, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.takeMoney != null && message.hasOwnProperty("takeMoney"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.takeMoney);
            return writer;
        };

        /**
         * Encodes the specified BankerData_S2C message, length delimited. Does not implicitly {@link msg.BankerData_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BankerData_S2C
         * @static
         * @param {msg.IBankerData_S2C} message BankerData_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BankerData_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BankerData_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BankerData_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BankerData_S2C} BankerData_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BankerData_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BankerData_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.banker = $root.msg.PlayerData.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.takeMoney = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BankerData_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BankerData_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BankerData_S2C} BankerData_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BankerData_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BankerData_S2C message.
         * @function verify
         * @memberof msg.BankerData_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BankerData_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.banker != null && message.hasOwnProperty("banker")) {
                var error = $root.msg.PlayerData.verify(message.banker);
                if (error)
                    return "banker." + error;
            }
            if (message.takeMoney != null && message.hasOwnProperty("takeMoney"))
                if (!$util.isInteger(message.takeMoney))
                    return "takeMoney: integer expected";
            return null;
        };

        /**
         * Creates a BankerData_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BankerData_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BankerData_S2C} BankerData_S2C
         */
        BankerData_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BankerData_S2C)
                return object;
            var message = new $root.msg.BankerData_S2C();
            if (object.banker != null) {
                if (typeof object.banker !== "object")
                    throw TypeError(".msg.BankerData_S2C.banker: object expected");
                message.banker = $root.msg.PlayerData.fromObject(object.banker);
            }
            if (object.takeMoney != null)
                message.takeMoney = object.takeMoney | 0;
            return message;
        };

        /**
         * Creates a plain object from a BankerData_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BankerData_S2C
         * @static
         * @param {msg.BankerData_S2C} message BankerData_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BankerData_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.banker = null;
                object.takeMoney = 0;
            }
            if (message.banker != null && message.hasOwnProperty("banker"))
                object.banker = $root.msg.PlayerData.toObject(message.banker, options);
            if (message.takeMoney != null && message.hasOwnProperty("takeMoney"))
                object.takeMoney = message.takeMoney;
            return object;
        };

        /**
         * Converts this BankerData_S2C to JSON.
         * @function toJSON
         * @memberof msg.BankerData_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BankerData_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BankerData_S2C;
    })();

    msg.EmojiChat_C2S = (function() {

        /**
         * Properties of an EmojiChat_C2S.
         * @memberof msg
         * @interface IEmojiChat_C2S
         * @property {number|null} [actNum] EmojiChat_C2S actNum
         * @property {string|null} [goalId] EmojiChat_C2S goalId
         */

        /**
         * Constructs a new EmojiChat_C2S.
         * @memberof msg
         * @classdesc Represents an EmojiChat_C2S.
         * @implements IEmojiChat_C2S
         * @constructor
         * @param {msg.IEmojiChat_C2S=} [properties] Properties to set
         */
        function EmojiChat_C2S(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EmojiChat_C2S actNum.
         * @member {number} actNum
         * @memberof msg.EmojiChat_C2S
         * @instance
         */
        EmojiChat_C2S.prototype.actNum = 0;

        /**
         * EmojiChat_C2S goalId.
         * @member {string} goalId
         * @memberof msg.EmojiChat_C2S
         * @instance
         */
        EmojiChat_C2S.prototype.goalId = "";

        /**
         * Creates a new EmojiChat_C2S instance using the specified properties.
         * @function create
         * @memberof msg.EmojiChat_C2S
         * @static
         * @param {msg.IEmojiChat_C2S=} [properties] Properties to set
         * @returns {msg.EmojiChat_C2S} EmojiChat_C2S instance
         */
        EmojiChat_C2S.create = function create(properties) {
            return new EmojiChat_C2S(properties);
        };

        /**
         * Encodes the specified EmojiChat_C2S message. Does not implicitly {@link msg.EmojiChat_C2S.verify|verify} messages.
         * @function encode
         * @memberof msg.EmojiChat_C2S
         * @static
         * @param {msg.IEmojiChat_C2S} message EmojiChat_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EmojiChat_C2S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.actNum != null && message.hasOwnProperty("actNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.actNum);
            if (message.goalId != null && message.hasOwnProperty("goalId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.goalId);
            return writer;
        };

        /**
         * Encodes the specified EmojiChat_C2S message, length delimited. Does not implicitly {@link msg.EmojiChat_C2S.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.EmojiChat_C2S
         * @static
         * @param {msg.IEmojiChat_C2S} message EmojiChat_C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EmojiChat_C2S.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EmojiChat_C2S message from the specified reader or buffer.
         * @function decode
         * @memberof msg.EmojiChat_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.EmojiChat_C2S} EmojiChat_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EmojiChat_C2S.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.EmojiChat_C2S();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.actNum = reader.int32();
                    break;
                case 2:
                    message.goalId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EmojiChat_C2S message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.EmojiChat_C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.EmojiChat_C2S} EmojiChat_C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EmojiChat_C2S.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EmojiChat_C2S message.
         * @function verify
         * @memberof msg.EmojiChat_C2S
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EmojiChat_C2S.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.actNum != null && message.hasOwnProperty("actNum"))
                if (!$util.isInteger(message.actNum))
                    return "actNum: integer expected";
            if (message.goalId != null && message.hasOwnProperty("goalId"))
                if (!$util.isString(message.goalId))
                    return "goalId: string expected";
            return null;
        };

        /**
         * Creates an EmojiChat_C2S message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.EmojiChat_C2S
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.EmojiChat_C2S} EmojiChat_C2S
         */
        EmojiChat_C2S.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.EmojiChat_C2S)
                return object;
            var message = new $root.msg.EmojiChat_C2S();
            if (object.actNum != null)
                message.actNum = object.actNum | 0;
            if (object.goalId != null)
                message.goalId = String(object.goalId);
            return message;
        };

        /**
         * Creates a plain object from an EmojiChat_C2S message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.EmojiChat_C2S
         * @static
         * @param {msg.EmojiChat_C2S} message EmojiChat_C2S
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EmojiChat_C2S.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.actNum = 0;
                object.goalId = "";
            }
            if (message.actNum != null && message.hasOwnProperty("actNum"))
                object.actNum = message.actNum;
            if (message.goalId != null && message.hasOwnProperty("goalId"))
                object.goalId = message.goalId;
            return object;
        };

        /**
         * Converts this EmojiChat_C2S to JSON.
         * @function toJSON
         * @memberof msg.EmojiChat_C2S
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EmojiChat_C2S.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EmojiChat_C2S;
    })();

    msg.EmojiChat_S2C = (function() {

        /**
         * Properties of an EmojiChat_S2C.
         * @memberof msg
         * @interface IEmojiChat_S2C
         * @property {number|null} [actNum] EmojiChat_S2C actNum
         * @property {string|null} [actId] EmojiChat_S2C actId
         * @property {string|null} [goalId] EmojiChat_S2C goalId
         */

        /**
         * Constructs a new EmojiChat_S2C.
         * @memberof msg
         * @classdesc Represents an EmojiChat_S2C.
         * @implements IEmojiChat_S2C
         * @constructor
         * @param {msg.IEmojiChat_S2C=} [properties] Properties to set
         */
        function EmojiChat_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EmojiChat_S2C actNum.
         * @member {number} actNum
         * @memberof msg.EmojiChat_S2C
         * @instance
         */
        EmojiChat_S2C.prototype.actNum = 0;

        /**
         * EmojiChat_S2C actId.
         * @member {string} actId
         * @memberof msg.EmojiChat_S2C
         * @instance
         */
        EmojiChat_S2C.prototype.actId = "";

        /**
         * EmojiChat_S2C goalId.
         * @member {string} goalId
         * @memberof msg.EmojiChat_S2C
         * @instance
         */
        EmojiChat_S2C.prototype.goalId = "";

        /**
         * Creates a new EmojiChat_S2C instance using the specified properties.
         * @function create
         * @memberof msg.EmojiChat_S2C
         * @static
         * @param {msg.IEmojiChat_S2C=} [properties] Properties to set
         * @returns {msg.EmojiChat_S2C} EmojiChat_S2C instance
         */
        EmojiChat_S2C.create = function create(properties) {
            return new EmojiChat_S2C(properties);
        };

        /**
         * Encodes the specified EmojiChat_S2C message. Does not implicitly {@link msg.EmojiChat_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.EmojiChat_S2C
         * @static
         * @param {msg.IEmojiChat_S2C} message EmojiChat_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EmojiChat_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.actNum != null && message.hasOwnProperty("actNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.actNum);
            if (message.actId != null && message.hasOwnProperty("actId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.actId);
            if (message.goalId != null && message.hasOwnProperty("goalId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.goalId);
            return writer;
        };

        /**
         * Encodes the specified EmojiChat_S2C message, length delimited. Does not implicitly {@link msg.EmojiChat_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.EmojiChat_S2C
         * @static
         * @param {msg.IEmojiChat_S2C} message EmojiChat_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EmojiChat_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EmojiChat_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.EmojiChat_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.EmojiChat_S2C} EmojiChat_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EmojiChat_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.EmojiChat_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.actNum = reader.int32();
                    break;
                case 2:
                    message.actId = reader.string();
                    break;
                case 3:
                    message.goalId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EmojiChat_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.EmojiChat_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.EmojiChat_S2C} EmojiChat_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EmojiChat_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EmojiChat_S2C message.
         * @function verify
         * @memberof msg.EmojiChat_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EmojiChat_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.actNum != null && message.hasOwnProperty("actNum"))
                if (!$util.isInteger(message.actNum))
                    return "actNum: integer expected";
            if (message.actId != null && message.hasOwnProperty("actId"))
                if (!$util.isString(message.actId))
                    return "actId: string expected";
            if (message.goalId != null && message.hasOwnProperty("goalId"))
                if (!$util.isString(message.goalId))
                    return "goalId: string expected";
            return null;
        };

        /**
         * Creates an EmojiChat_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.EmojiChat_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.EmojiChat_S2C} EmojiChat_S2C
         */
        EmojiChat_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.EmojiChat_S2C)
                return object;
            var message = new $root.msg.EmojiChat_S2C();
            if (object.actNum != null)
                message.actNum = object.actNum | 0;
            if (object.actId != null)
                message.actId = String(object.actId);
            if (object.goalId != null)
                message.goalId = String(object.goalId);
            return message;
        };

        /**
         * Creates a plain object from an EmojiChat_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.EmojiChat_S2C
         * @static
         * @param {msg.EmojiChat_S2C} message EmojiChat_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EmojiChat_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.actNum = 0;
                object.actId = "";
                object.goalId = "";
            }
            if (message.actNum != null && message.hasOwnProperty("actNum"))
                object.actNum = message.actNum;
            if (message.actId != null && message.hasOwnProperty("actId"))
                object.actId = message.actId;
            if (message.goalId != null && message.hasOwnProperty("goalId"))
                object.goalId = message.goalId;
            return object;
        };

        /**
         * Converts this EmojiChat_S2C to JSON.
         * @function toJSON
         * @memberof msg.EmojiChat_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EmojiChat_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EmojiChat_S2C;
    })();

    msg.SendActTime_S2C = (function() {

        /**
         * Properties of a SendActTime_S2C.
         * @memberof msg
         * @interface ISendActTime_S2C
         * @property {number|null} [startTime] SendActTime_S2C startTime
         * @property {number|null} [gameTime] SendActTime_S2C gameTime
         * @property {msg.GameStep|null} [gameStep] SendActTime_S2C gameStep
         */

        /**
         * Constructs a new SendActTime_S2C.
         * @memberof msg
         * @classdesc Represents a SendActTime_S2C.
         * @implements ISendActTime_S2C
         * @constructor
         * @param {msg.ISendActTime_S2C=} [properties] Properties to set
         */
        function SendActTime_S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SendActTime_S2C startTime.
         * @member {number} startTime
         * @memberof msg.SendActTime_S2C
         * @instance
         */
        SendActTime_S2C.prototype.startTime = 0;

        /**
         * SendActTime_S2C gameTime.
         * @member {number} gameTime
         * @memberof msg.SendActTime_S2C
         * @instance
         */
        SendActTime_S2C.prototype.gameTime = 0;

        /**
         * SendActTime_S2C gameStep.
         * @member {msg.GameStep} gameStep
         * @memberof msg.SendActTime_S2C
         * @instance
         */
        SendActTime_S2C.prototype.gameStep = 0;

        /**
         * Creates a new SendActTime_S2C instance using the specified properties.
         * @function create
         * @memberof msg.SendActTime_S2C
         * @static
         * @param {msg.ISendActTime_S2C=} [properties] Properties to set
         * @returns {msg.SendActTime_S2C} SendActTime_S2C instance
         */
        SendActTime_S2C.create = function create(properties) {
            return new SendActTime_S2C(properties);
        };

        /**
         * Encodes the specified SendActTime_S2C message. Does not implicitly {@link msg.SendActTime_S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.SendActTime_S2C
         * @static
         * @param {msg.ISendActTime_S2C} message SendActTime_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendActTime_S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.startTime);
            if (message.gameTime != null && message.hasOwnProperty("gameTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gameTime);
            if (message.gameStep != null && message.hasOwnProperty("gameStep"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.gameStep);
            return writer;
        };

        /**
         * Encodes the specified SendActTime_S2C message, length delimited. Does not implicitly {@link msg.SendActTime_S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.SendActTime_S2C
         * @static
         * @param {msg.ISendActTime_S2C} message SendActTime_S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendActTime_S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SendActTime_S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.SendActTime_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.SendActTime_S2C} SendActTime_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendActTime_S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.SendActTime_S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.startTime = reader.int32();
                    break;
                case 2:
                    message.gameTime = reader.int32();
                    break;
                case 3:
                    message.gameStep = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SendActTime_S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.SendActTime_S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.SendActTime_S2C} SendActTime_S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendActTime_S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SendActTime_S2C message.
         * @function verify
         * @memberof msg.SendActTime_S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SendActTime_S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime))
                    return "startTime: integer expected";
            if (message.gameTime != null && message.hasOwnProperty("gameTime"))
                if (!$util.isInteger(message.gameTime))
                    return "gameTime: integer expected";
            if (message.gameStep != null && message.hasOwnProperty("gameStep"))
                switch (message.gameStep) {
                default:
                    return "gameStep: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            return null;
        };

        /**
         * Creates a SendActTime_S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.SendActTime_S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.SendActTime_S2C} SendActTime_S2C
         */
        SendActTime_S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.SendActTime_S2C)
                return object;
            var message = new $root.msg.SendActTime_S2C();
            if (object.startTime != null)
                message.startTime = object.startTime | 0;
            if (object.gameTime != null)
                message.gameTime = object.gameTime | 0;
            switch (object.gameStep) {
            case "XX_Step":
            case 0:
                message.gameStep = 0;
                break;
            case "Banker":
            case 1:
                message.gameStep = 1;
                break;
            case "Banker2":
            case 2:
                message.gameStep = 2;
                break;
            case "DownBet":
            case 3:
                message.gameStep = 3;
                break;
            case "Settle":
            case 4:
                message.gameStep = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a SendActTime_S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.SendActTime_S2C
         * @static
         * @param {msg.SendActTime_S2C} message SendActTime_S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SendActTime_S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.startTime = 0;
                object.gameTime = 0;
                object.gameStep = options.enums === String ? "XX_Step" : 0;
            }
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                object.startTime = message.startTime;
            if (message.gameTime != null && message.hasOwnProperty("gameTime"))
                object.gameTime = message.gameTime;
            if (message.gameStep != null && message.hasOwnProperty("gameStep"))
                object.gameStep = options.enums === String ? $root.msg.GameStep[message.gameStep] : message.gameStep;
            return object;
        };

        /**
         * Converts this SendActTime_S2C to JSON.
         * @function toJSON
         * @memberof msg.SendActTime_S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SendActTime_S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SendActTime_S2C;
    })();

    return msg;
})();

module.exports = $root;
