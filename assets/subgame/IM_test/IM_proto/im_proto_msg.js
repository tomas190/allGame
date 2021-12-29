/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("./im_protobuf");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.mproto = (function() {

    /**
     * Namespace mproto.
     * @exports mproto
     * @namespace
     */
    var mproto = {};

    /**
     * MessageID enum.
     * @name mproto.MessageID
     * @enum {string}
     * @property {number} REQ_PING=0 REQ_PING value
     * @property {number} RESP_PONG=1 RESP_PONG value
     * @property {number} REQ_LOGIN=100 REQ_LOGIN value
     * @property {number} RESP_LOGIN_RESP=200 RESP_LOGIN_RESP value
     * @property {number} REQ_CONVERSION_LIST=101 REQ_CONVERSION_LIST value
     * @property {number} RESP_CONVERSION_LIST=201 RESP_CONVERSION_LIST value
     * @property {number} REQ_CHAT_MSG_LIST=102 REQ_CHAT_MSG_LIST value
     * @property {number} RESP_CHAT_MSG_LIST=202 RESP_CHAT_MSG_LIST value
     * @property {number} REQ_SEND_CHAT_MSG=103 REQ_SEND_CHAT_MSG value
     * @property {number} RESP_SEND_CHAT_MSG=203 RESP_SEND_CHAT_MSG value
     * @property {number} PUSH_RECEIVE_CHAT_MSG=303 PUSH_RECEIVE_CHAT_MSG value
     * @property {number} REQ_READ_MSG=104 REQ_READ_MSG value
     * @property {number} RESP_READ_MSG=204 RESP_READ_MSG value
     * @property {number} REQ_GET_UNREAD_NUM=105 REQ_GET_UNREAD_NUM value
     * @property {number} RESP_GET_UNREAD_NUM=205 RESP_GET_UNREAD_NUM value
     * @property {number} REQ_DELETE_MSG=106 REQ_DELETE_MSG value
     * @property {number} RESP_DELETE_MSG=206 RESP_DELETE_MSG value
     * @property {number} REQ_DELETE_CONVERSION=107 REQ_DELETE_CONVERSION value
     * @property {number} RESP_DELETE_CONVERSION=207 RESP_DELETE_CONVERSION value
     * @property {number} REQ_EDIT_MSG=108 REQ_EDIT_MSG value
     * @property {number} RESP_EDIT_MSG=208 RESP_EDIT_MSG value
     * @property {number} REQ_SEARCH_USER=109 REQ_SEARCH_USER value
     * @property {number} RESP_SEARCH_USER=209 RESP_SEARCH_USER value
     * @property {number} REQ_SEARCH_SUB_USER=110 REQ_SEARCH_SUB_USER value
     * @property {number} RESP_SEARCH_SUB_USER=210 RESP_SEARCH_SUB_USER value
     * @property {number} REQ_GET_SUB_USER_LIST=111 REQ_GET_SUB_USER_LIST value
     * @property {number} RESP_GET_SUB_USER_LIST=211 RESP_GET_SUB_USER_LIST value
     * @property {number} REQ_MATCH_SERVICE=112 REQ_MATCH_SERVICE value
     * @property {number} REQ_GET_QUICK_REPLY=113 REQ_GET_QUICK_REPLY value
     * @property {number} RESP_GET_QUICK_REPLY=213 RESP_GET_QUICK_REPLY value
     * @property {number} PUSH_AUTO_ENTER_CONVERSION=304 PUSH_AUTO_ENTER_CONVERSION value
     * @property {number} MSG_CLOSE_CONN_PUSH=500 MSG_CLOSE_CONN_PUSH value
     * @property {number} MSG_ERR_MSG_PUSH=501 MSG_ERR_MSG_PUSH value
     */
    mproto.MessageID = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "REQ_PING"] = 0;
        values[valuesById[1] = "RESP_PONG"] = 1;
        values[valuesById[100] = "REQ_LOGIN"] = 100;
        values[valuesById[200] = "RESP_LOGIN_RESP"] = 200;
        values[valuesById[101] = "REQ_CONVERSION_LIST"] = 101;
        values[valuesById[201] = "RESP_CONVERSION_LIST"] = 201;
        values[valuesById[102] = "REQ_CHAT_MSG_LIST"] = 102;
        values[valuesById[202] = "RESP_CHAT_MSG_LIST"] = 202;
        values[valuesById[103] = "REQ_SEND_CHAT_MSG"] = 103;
        values[valuesById[203] = "RESP_SEND_CHAT_MSG"] = 203;
        values[valuesById[303] = "PUSH_RECEIVE_CHAT_MSG"] = 303;
        values[valuesById[104] = "REQ_READ_MSG"] = 104;
        values[valuesById[204] = "RESP_READ_MSG"] = 204;
        values[valuesById[105] = "REQ_GET_UNREAD_NUM"] = 105;
        values[valuesById[205] = "RESP_GET_UNREAD_NUM"] = 205;
        values[valuesById[106] = "REQ_DELETE_MSG"] = 106;
        values[valuesById[206] = "RESP_DELETE_MSG"] = 206;
        values[valuesById[107] = "REQ_DELETE_CONVERSION"] = 107;
        values[valuesById[207] = "RESP_DELETE_CONVERSION"] = 207;
        values[valuesById[108] = "REQ_EDIT_MSG"] = 108;
        values[valuesById[208] = "RESP_EDIT_MSG"] = 208;
        values[valuesById[109] = "REQ_SEARCH_USER"] = 109;
        values[valuesById[209] = "RESP_SEARCH_USER"] = 209;
        values[valuesById[110] = "REQ_SEARCH_SUB_USER"] = 110;
        values[valuesById[210] = "RESP_SEARCH_SUB_USER"] = 210;
        values[valuesById[111] = "REQ_GET_SUB_USER_LIST"] = 111;
        values[valuesById[211] = "RESP_GET_SUB_USER_LIST"] = 211;
        values[valuesById[112] = "REQ_MATCH_SERVICE"] = 112;
        values[valuesById[113] = "REQ_GET_QUICK_REPLY"] = 113;
        values[valuesById[213] = "RESP_GET_QUICK_REPLY"] = 213;
        values[valuesById[304] = "PUSH_AUTO_ENTER_CONVERSION"] = 304;
        values[valuesById[500] = "MSG_CLOSE_CONN_PUSH"] = 500;
        values[valuesById[501] = "MSG_ERR_MSG_PUSH"] = 501;
        return values;
    })();

    mproto.PING = (function() {

        /**
         * Properties of a PING.
         * @memberof mproto
         * @interface IPING
         * @property {number|Long|null} [time] PING time
         */

        /**
         * Constructs a new PING.
         * @memberof mproto
         * @classdesc Represents a PING.
         * @implements IPING
         * @constructor
         * @param {mproto.IPING=} [properties] Properties to set
         */
        function PING(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PING time.
         * @member {number|Long} time
         * @memberof mproto.PING
         * @instance
         */
        PING.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PING instance using the specified properties.
         * @function create
         * @memberof mproto.PING
         * @static
         * @param {mproto.IPING=} [properties] Properties to set
         * @returns {mproto.PING} PING instance
         */
        PING.create = function create(properties) {
            return new PING(properties);
        };

        /**
         * Encodes the specified PING message. Does not implicitly {@link mproto.PING.verify|verify} messages.
         * @function encode
         * @memberof mproto.PING
         * @static
         * @param {mproto.IPING} message PING message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PING.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.time);
            return writer;
        };

        /**
         * Encodes the specified PING message, length delimited. Does not implicitly {@link mproto.PING.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.PING
         * @static
         * @param {mproto.IPING} message PING message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PING.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PING message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.PING
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.PING} PING
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PING.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.PING();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PING message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.PING
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.PING} PING
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PING.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PING message.
         * @function verify
         * @memberof mproto.PING
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PING.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates a PING message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.PING
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.PING} PING
         */
        PING.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.PING)
                return object;
            var message = new $root.mproto.PING();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PING message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.PING
         * @static
         * @param {mproto.PING} message PING
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PING.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this PING to JSON.
         * @function toJSON
         * @memberof mproto.PING
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PING.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PING;
    })();

    mproto.ReqLogin = (function() {

        /**
         * Properties of a ReqLogin.
         * @memberof mproto
         * @interface IReqLogin
         * @property {string|null} [userId] ReqLogin userId
         * @property {string|null} [userPassword] ReqLogin userPassword
         * @property {string|null} [token] ReqLogin token
         */

        /**
         * Constructs a new ReqLogin.
         * @memberof mproto
         * @classdesc Represents a ReqLogin.
         * @implements IReqLogin
         * @constructor
         * @param {mproto.IReqLogin=} [properties] Properties to set
         */
        function ReqLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqLogin userId.
         * @member {string} userId
         * @memberof mproto.ReqLogin
         * @instance
         */
        ReqLogin.prototype.userId = "";

        /**
         * ReqLogin userPassword.
         * @member {string} userPassword
         * @memberof mproto.ReqLogin
         * @instance
         */
        ReqLogin.prototype.userPassword = "";

        /**
         * ReqLogin token.
         * @member {string} token
         * @memberof mproto.ReqLogin
         * @instance
         */
        ReqLogin.prototype.token = "";

        /**
         * Creates a new ReqLogin instance using the specified properties.
         * @function create
         * @memberof mproto.ReqLogin
         * @static
         * @param {mproto.IReqLogin=} [properties] Properties to set
         * @returns {mproto.ReqLogin} ReqLogin instance
         */
        ReqLogin.create = function create(properties) {
            return new ReqLogin(properties);
        };

        /**
         * Encodes the specified ReqLogin message. Does not implicitly {@link mproto.ReqLogin.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqLogin
         * @static
         * @param {mproto.IReqLogin} message ReqLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.userPassword != null && message.hasOwnProperty("userPassword"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userPassword);
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified ReqLogin message, length delimited. Does not implicitly {@link mproto.ReqLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqLogin
         * @static
         * @param {mproto.IReqLogin} message ReqLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqLogin message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqLogin} ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.userPassword = reader.string();
                    break;
                case 3:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqLogin} ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqLogin message.
         * @function verify
         * @memberof mproto.ReqLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.userPassword != null && message.hasOwnProperty("userPassword"))
                if (!$util.isString(message.userPassword))
                    return "userPassword: string expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a ReqLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqLogin} ReqLogin
         */
        ReqLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqLogin)
                return object;
            var message = new $root.mproto.ReqLogin();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.userPassword != null)
                message.userPassword = String(object.userPassword);
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a ReqLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqLogin
         * @static
         * @param {mproto.ReqLogin} message ReqLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.userPassword = "";
                object.token = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.userPassword != null && message.hasOwnProperty("userPassword"))
                object.userPassword = message.userPassword;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this ReqLogin to JSON.
         * @function toJSON
         * @memberof mproto.ReqLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqLogin;
    })();

    mproto.ReqConversionList = (function() {

        /**
         * Properties of a ReqConversionList.
         * @memberof mproto
         * @interface IReqConversionList
         * @property {string|null} [userId] ReqConversionList userId
         * @property {number|null} [skip] ReqConversionList skip
         * @property {number|null} [limit] ReqConversionList limit
         */

        /**
         * Constructs a new ReqConversionList.
         * @memberof mproto
         * @classdesc Represents a ReqConversionList.
         * @implements IReqConversionList
         * @constructor
         * @param {mproto.IReqConversionList=} [properties] Properties to set
         */
        function ReqConversionList(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqConversionList userId.
         * @member {string} userId
         * @memberof mproto.ReqConversionList
         * @instance
         */
        ReqConversionList.prototype.userId = "";

        /**
         * ReqConversionList skip.
         * @member {number} skip
         * @memberof mproto.ReqConversionList
         * @instance
         */
        ReqConversionList.prototype.skip = 0;

        /**
         * ReqConversionList limit.
         * @member {number} limit
         * @memberof mproto.ReqConversionList
         * @instance
         */
        ReqConversionList.prototype.limit = 0;

        /**
         * Creates a new ReqConversionList instance using the specified properties.
         * @function create
         * @memberof mproto.ReqConversionList
         * @static
         * @param {mproto.IReqConversionList=} [properties] Properties to set
         * @returns {mproto.ReqConversionList} ReqConversionList instance
         */
        ReqConversionList.create = function create(properties) {
            return new ReqConversionList(properties);
        };

        /**
         * Encodes the specified ReqConversionList message. Does not implicitly {@link mproto.ReqConversionList.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqConversionList
         * @static
         * @param {mproto.IReqConversionList} message ReqConversionList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqConversionList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.skip != null && message.hasOwnProperty("skip"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.skip);
            if (message.limit != null && message.hasOwnProperty("limit"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.limit);
            return writer;
        };

        /**
         * Encodes the specified ReqConversionList message, length delimited. Does not implicitly {@link mproto.ReqConversionList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqConversionList
         * @static
         * @param {mproto.IReqConversionList} message ReqConversionList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqConversionList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqConversionList message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqConversionList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqConversionList} ReqConversionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqConversionList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqConversionList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.skip = reader.int32();
                    break;
                case 3:
                    message.limit = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqConversionList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqConversionList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqConversionList} ReqConversionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqConversionList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqConversionList message.
         * @function verify
         * @memberof mproto.ReqConversionList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqConversionList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.skip != null && message.hasOwnProperty("skip"))
                if (!$util.isInteger(message.skip))
                    return "skip: integer expected";
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (!$util.isInteger(message.limit))
                    return "limit: integer expected";
            return null;
        };

        /**
         * Creates a ReqConversionList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqConversionList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqConversionList} ReqConversionList
         */
        ReqConversionList.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqConversionList)
                return object;
            var message = new $root.mproto.ReqConversionList();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.skip != null)
                message.skip = object.skip | 0;
            if (object.limit != null)
                message.limit = object.limit | 0;
            return message;
        };

        /**
         * Creates a plain object from a ReqConversionList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqConversionList
         * @static
         * @param {mproto.ReqConversionList} message ReqConversionList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqConversionList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.skip = 0;
                object.limit = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.skip != null && message.hasOwnProperty("skip"))
                object.skip = message.skip;
            if (message.limit != null && message.hasOwnProperty("limit"))
                object.limit = message.limit;
            return object;
        };

        /**
         * Converts this ReqConversionList to JSON.
         * @function toJSON
         * @memberof mproto.ReqConversionList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqConversionList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqConversionList;
    })();

    mproto.ReqMsgList = (function() {

        /**
         * Properties of a ReqMsgList.
         * @memberof mproto
         * @interface IReqMsgList
         * @property {string|null} [userId] ReqMsgList userId
         * @property {string|null} [toUserId] ReqMsgList toUserId
         * @property {number|null} [skip] ReqMsgList skip
         * @property {number|null} [limit] ReqMsgList limit
         */

        /**
         * Constructs a new ReqMsgList.
         * @memberof mproto
         * @classdesc Represents a ReqMsgList.
         * @implements IReqMsgList
         * @constructor
         * @param {mproto.IReqMsgList=} [properties] Properties to set
         */
        function ReqMsgList(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqMsgList userId.
         * @member {string} userId
         * @memberof mproto.ReqMsgList
         * @instance
         */
        ReqMsgList.prototype.userId = "";

        /**
         * ReqMsgList toUserId.
         * @member {string} toUserId
         * @memberof mproto.ReqMsgList
         * @instance
         */
        ReqMsgList.prototype.toUserId = "";

        /**
         * ReqMsgList skip.
         * @member {number} skip
         * @memberof mproto.ReqMsgList
         * @instance
         */
        ReqMsgList.prototype.skip = 0;

        /**
         * ReqMsgList limit.
         * @member {number} limit
         * @memberof mproto.ReqMsgList
         * @instance
         */
        ReqMsgList.prototype.limit = 0;

        /**
         * Creates a new ReqMsgList instance using the specified properties.
         * @function create
         * @memberof mproto.ReqMsgList
         * @static
         * @param {mproto.IReqMsgList=} [properties] Properties to set
         * @returns {mproto.ReqMsgList} ReqMsgList instance
         */
        ReqMsgList.create = function create(properties) {
            return new ReqMsgList(properties);
        };

        /**
         * Encodes the specified ReqMsgList message. Does not implicitly {@link mproto.ReqMsgList.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqMsgList
         * @static
         * @param {mproto.IReqMsgList} message ReqMsgList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqMsgList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.toUserId);
            if (message.skip != null && message.hasOwnProperty("skip"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.skip);
            if (message.limit != null && message.hasOwnProperty("limit"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.limit);
            return writer;
        };

        /**
         * Encodes the specified ReqMsgList message, length delimited. Does not implicitly {@link mproto.ReqMsgList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqMsgList
         * @static
         * @param {mproto.IReqMsgList} message ReqMsgList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqMsgList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqMsgList message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqMsgList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqMsgList} ReqMsgList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqMsgList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqMsgList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.toUserId = reader.string();
                    break;
                case 3:
                    message.skip = reader.int32();
                    break;
                case 4:
                    message.limit = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqMsgList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqMsgList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqMsgList} ReqMsgList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqMsgList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqMsgList message.
         * @function verify
         * @memberof mproto.ReqMsgList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqMsgList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                if (!$util.isString(message.toUserId))
                    return "toUserId: string expected";
            if (message.skip != null && message.hasOwnProperty("skip"))
                if (!$util.isInteger(message.skip))
                    return "skip: integer expected";
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (!$util.isInteger(message.limit))
                    return "limit: integer expected";
            return null;
        };

        /**
         * Creates a ReqMsgList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqMsgList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqMsgList} ReqMsgList
         */
        ReqMsgList.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqMsgList)
                return object;
            var message = new $root.mproto.ReqMsgList();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.toUserId != null)
                message.toUserId = String(object.toUserId);
            if (object.skip != null)
                message.skip = object.skip | 0;
            if (object.limit != null)
                message.limit = object.limit | 0;
            return message;
        };

        /**
         * Creates a plain object from a ReqMsgList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqMsgList
         * @static
         * @param {mproto.ReqMsgList} message ReqMsgList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqMsgList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.toUserId = "";
                object.skip = 0;
                object.limit = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                object.toUserId = message.toUserId;
            if (message.skip != null && message.hasOwnProperty("skip"))
                object.skip = message.skip;
            if (message.limit != null && message.hasOwnProperty("limit"))
                object.limit = message.limit;
            return object;
        };

        /**
         * Converts this ReqMsgList to JSON.
         * @function toJSON
         * @memberof mproto.ReqMsgList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqMsgList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqMsgList;
    })();

    mproto.ReqSendChatMsg = (function() {

        /**
         * Properties of a ReqSendChatMsg.
         * @memberof mproto
         * @interface IReqSendChatMsg
         * @property {mproto.IChatMsg|null} [chatMsg] ReqSendChatMsg chatMsg
         */

        /**
         * Constructs a new ReqSendChatMsg.
         * @memberof mproto
         * @classdesc Represents a ReqSendChatMsg.
         * @implements IReqSendChatMsg
         * @constructor
         * @param {mproto.IReqSendChatMsg=} [properties] Properties to set
         */
        function ReqSendChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqSendChatMsg chatMsg.
         * @member {mproto.IChatMsg|null|undefined} chatMsg
         * @memberof mproto.ReqSendChatMsg
         * @instance
         */
        ReqSendChatMsg.prototype.chatMsg = null;

        /**
         * Creates a new ReqSendChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.ReqSendChatMsg
         * @static
         * @param {mproto.IReqSendChatMsg=} [properties] Properties to set
         * @returns {mproto.ReqSendChatMsg} ReqSendChatMsg instance
         */
        ReqSendChatMsg.create = function create(properties) {
            return new ReqSendChatMsg(properties);
        };

        /**
         * Encodes the specified ReqSendChatMsg message. Does not implicitly {@link mproto.ReqSendChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqSendChatMsg
         * @static
         * @param {mproto.IReqSendChatMsg} message ReqSendChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqSendChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                $root.mproto.ChatMsg.encode(message.chatMsg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ReqSendChatMsg message, length delimited. Does not implicitly {@link mproto.ReqSendChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqSendChatMsg
         * @static
         * @param {mproto.IReqSendChatMsg} message ReqSendChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqSendChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqSendChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqSendChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqSendChatMsg} ReqSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqSendChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqSendChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chatMsg = $root.mproto.ChatMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqSendChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqSendChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqSendChatMsg} ReqSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqSendChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqSendChatMsg message.
         * @function verify
         * @memberof mproto.ReqSendChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqSendChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg")) {
                var error = $root.mproto.ChatMsg.verify(message.chatMsg);
                if (error)
                    return "chatMsg." + error;
            }
            return null;
        };

        /**
         * Creates a ReqSendChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqSendChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqSendChatMsg} ReqSendChatMsg
         */
        ReqSendChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqSendChatMsg)
                return object;
            var message = new $root.mproto.ReqSendChatMsg();
            if (object.chatMsg != null) {
                if (typeof object.chatMsg !== "object")
                    throw TypeError(".mproto.ReqSendChatMsg.chatMsg: object expected");
                message.chatMsg = $root.mproto.ChatMsg.fromObject(object.chatMsg);
            }
            return message;
        };

        /**
         * Creates a plain object from a ReqSendChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqSendChatMsg
         * @static
         * @param {mproto.ReqSendChatMsg} message ReqSendChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqSendChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chatMsg = null;
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                object.chatMsg = $root.mproto.ChatMsg.toObject(message.chatMsg, options);
            return object;
        };

        /**
         * Converts this ReqSendChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.ReqSendChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqSendChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqSendChatMsg;
    })();

    mproto.ReqReadChatMsg = (function() {

        /**
         * Properties of a ReqReadChatMsg.
         * @memberof mproto
         * @interface IReqReadChatMsg
         * @property {string|null} [msgId] ReqReadChatMsg msgId
         * @property {string|null} [userId] ReqReadChatMsg userId
         * @property {string|null} [toUserId] ReqReadChatMsg toUserId
         */

        /**
         * Constructs a new ReqReadChatMsg.
         * @memberof mproto
         * @classdesc Represents a ReqReadChatMsg.
         * @implements IReqReadChatMsg
         * @constructor
         * @param {mproto.IReqReadChatMsg=} [properties] Properties to set
         */
        function ReqReadChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqReadChatMsg msgId.
         * @member {string} msgId
         * @memberof mproto.ReqReadChatMsg
         * @instance
         */
        ReqReadChatMsg.prototype.msgId = "";

        /**
         * ReqReadChatMsg userId.
         * @member {string} userId
         * @memberof mproto.ReqReadChatMsg
         * @instance
         */
        ReqReadChatMsg.prototype.userId = "";

        /**
         * ReqReadChatMsg toUserId.
         * @member {string} toUserId
         * @memberof mproto.ReqReadChatMsg
         * @instance
         */
        ReqReadChatMsg.prototype.toUserId = "";

        /**
         * Creates a new ReqReadChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.ReqReadChatMsg
         * @static
         * @param {mproto.IReqReadChatMsg=} [properties] Properties to set
         * @returns {mproto.ReqReadChatMsg} ReqReadChatMsg instance
         */
        ReqReadChatMsg.create = function create(properties) {
            return new ReqReadChatMsg(properties);
        };

        /**
         * Encodes the specified ReqReadChatMsg message. Does not implicitly {@link mproto.ReqReadChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqReadChatMsg
         * @static
         * @param {mproto.IReqReadChatMsg} message ReqReadChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqReadChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.msgId);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.toUserId);
            return writer;
        };

        /**
         * Encodes the specified ReqReadChatMsg message, length delimited. Does not implicitly {@link mproto.ReqReadChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqReadChatMsg
         * @static
         * @param {mproto.IReqReadChatMsg} message ReqReadChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqReadChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqReadChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqReadChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqReadChatMsg} ReqReadChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqReadChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqReadChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msgId = reader.string();
                    break;
                case 2:
                    message.userId = reader.string();
                    break;
                case 3:
                    message.toUserId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqReadChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqReadChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqReadChatMsg} ReqReadChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqReadChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqReadChatMsg message.
         * @function verify
         * @memberof mproto.ReqReadChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqReadChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                if (!$util.isString(message.msgId))
                    return "msgId: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                if (!$util.isString(message.toUserId))
                    return "toUserId: string expected";
            return null;
        };

        /**
         * Creates a ReqReadChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqReadChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqReadChatMsg} ReqReadChatMsg
         */
        ReqReadChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqReadChatMsg)
                return object;
            var message = new $root.mproto.ReqReadChatMsg();
            if (object.msgId != null)
                message.msgId = String(object.msgId);
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.toUserId != null)
                message.toUserId = String(object.toUserId);
            return message;
        };

        /**
         * Creates a plain object from a ReqReadChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqReadChatMsg
         * @static
         * @param {mproto.ReqReadChatMsg} message ReqReadChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqReadChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.msgId = "";
                object.userId = "";
                object.toUserId = "";
            }
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                object.msgId = message.msgId;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                object.toUserId = message.toUserId;
            return object;
        };

        /**
         * Converts this ReqReadChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.ReqReadChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqReadChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqReadChatMsg;
    })();

    mproto.ReqGetUnReadNum = (function() {

        /**
         * Properties of a ReqGetUnReadNum.
         * @memberof mproto
         * @interface IReqGetUnReadNum
         * @property {string|null} [conversionId] ReqGetUnReadNum conversionId
         * @property {string|null} [userId] ReqGetUnReadNum userId
         * @property {string|null} [toUserId] ReqGetUnReadNum toUserId
         */

        /**
         * Constructs a new ReqGetUnReadNum.
         * @memberof mproto
         * @classdesc Represents a ReqGetUnReadNum.
         * @implements IReqGetUnReadNum
         * @constructor
         * @param {mproto.IReqGetUnReadNum=} [properties] Properties to set
         */
        function ReqGetUnReadNum(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqGetUnReadNum conversionId.
         * @member {string} conversionId
         * @memberof mproto.ReqGetUnReadNum
         * @instance
         */
        ReqGetUnReadNum.prototype.conversionId = "";

        /**
         * ReqGetUnReadNum userId.
         * @member {string} userId
         * @memberof mproto.ReqGetUnReadNum
         * @instance
         */
        ReqGetUnReadNum.prototype.userId = "";

        /**
         * ReqGetUnReadNum toUserId.
         * @member {string} toUserId
         * @memberof mproto.ReqGetUnReadNum
         * @instance
         */
        ReqGetUnReadNum.prototype.toUserId = "";

        /**
         * Creates a new ReqGetUnReadNum instance using the specified properties.
         * @function create
         * @memberof mproto.ReqGetUnReadNum
         * @static
         * @param {mproto.IReqGetUnReadNum=} [properties] Properties to set
         * @returns {mproto.ReqGetUnReadNum} ReqGetUnReadNum instance
         */
        ReqGetUnReadNum.create = function create(properties) {
            return new ReqGetUnReadNum(properties);
        };

        /**
         * Encodes the specified ReqGetUnReadNum message. Does not implicitly {@link mproto.ReqGetUnReadNum.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqGetUnReadNum
         * @static
         * @param {mproto.IReqGetUnReadNum} message ReqGetUnReadNum message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqGetUnReadNum.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.conversionId);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.toUserId);
            return writer;
        };

        /**
         * Encodes the specified ReqGetUnReadNum message, length delimited. Does not implicitly {@link mproto.ReqGetUnReadNum.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqGetUnReadNum
         * @static
         * @param {mproto.IReqGetUnReadNum} message ReqGetUnReadNum message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqGetUnReadNum.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqGetUnReadNum message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqGetUnReadNum
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqGetUnReadNum} ReqGetUnReadNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqGetUnReadNum.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqGetUnReadNum();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.conversionId = reader.string();
                    break;
                case 2:
                    message.userId = reader.string();
                    break;
                case 3:
                    message.toUserId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqGetUnReadNum message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqGetUnReadNum
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqGetUnReadNum} ReqGetUnReadNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqGetUnReadNum.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqGetUnReadNum message.
         * @function verify
         * @memberof mproto.ReqGetUnReadNum
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqGetUnReadNum.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                if (!$util.isString(message.conversionId))
                    return "conversionId: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                if (!$util.isString(message.toUserId))
                    return "toUserId: string expected";
            return null;
        };

        /**
         * Creates a ReqGetUnReadNum message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqGetUnReadNum
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqGetUnReadNum} ReqGetUnReadNum
         */
        ReqGetUnReadNum.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqGetUnReadNum)
                return object;
            var message = new $root.mproto.ReqGetUnReadNum();
            if (object.conversionId != null)
                message.conversionId = String(object.conversionId);
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.toUserId != null)
                message.toUserId = String(object.toUserId);
            return message;
        };

        /**
         * Creates a plain object from a ReqGetUnReadNum message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqGetUnReadNum
         * @static
         * @param {mproto.ReqGetUnReadNum} message ReqGetUnReadNum
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqGetUnReadNum.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.conversionId = "";
                object.userId = "";
                object.toUserId = "";
            }
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                object.conversionId = message.conversionId;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                object.toUserId = message.toUserId;
            return object;
        };

        /**
         * Converts this ReqGetUnReadNum to JSON.
         * @function toJSON
         * @memberof mproto.ReqGetUnReadNum
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqGetUnReadNum.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqGetUnReadNum;
    })();

    mproto.ReqDeleteChatMsg = (function() {

        /**
         * Properties of a ReqDeleteChatMsg.
         * @memberof mproto
         * @interface IReqDeleteChatMsg
         * @property {string|null} [reqUserId] ReqDeleteChatMsg reqUserId
         * @property {string|null} [msgId] ReqDeleteChatMsg msgId
         * @property {string|null} [userId] ReqDeleteChatMsg userId
         * @property {string|null} [toUserId] ReqDeleteChatMsg toUserId
         */

        /**
         * Constructs a new ReqDeleteChatMsg.
         * @memberof mproto
         * @classdesc Represents a ReqDeleteChatMsg.
         * @implements IReqDeleteChatMsg
         * @constructor
         * @param {mproto.IReqDeleteChatMsg=} [properties] Properties to set
         */
        function ReqDeleteChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqDeleteChatMsg reqUserId.
         * @member {string} reqUserId
         * @memberof mproto.ReqDeleteChatMsg
         * @instance
         */
        ReqDeleteChatMsg.prototype.reqUserId = "";

        /**
         * ReqDeleteChatMsg msgId.
         * @member {string} msgId
         * @memberof mproto.ReqDeleteChatMsg
         * @instance
         */
        ReqDeleteChatMsg.prototype.msgId = "";

        /**
         * ReqDeleteChatMsg userId.
         * @member {string} userId
         * @memberof mproto.ReqDeleteChatMsg
         * @instance
         */
        ReqDeleteChatMsg.prototype.userId = "";

        /**
         * ReqDeleteChatMsg toUserId.
         * @member {string} toUserId
         * @memberof mproto.ReqDeleteChatMsg
         * @instance
         */
        ReqDeleteChatMsg.prototype.toUserId = "";

        /**
         * Creates a new ReqDeleteChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.ReqDeleteChatMsg
         * @static
         * @param {mproto.IReqDeleteChatMsg=} [properties] Properties to set
         * @returns {mproto.ReqDeleteChatMsg} ReqDeleteChatMsg instance
         */
        ReqDeleteChatMsg.create = function create(properties) {
            return new ReqDeleteChatMsg(properties);
        };

        /**
         * Encodes the specified ReqDeleteChatMsg message. Does not implicitly {@link mproto.ReqDeleteChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqDeleteChatMsg
         * @static
         * @param {mproto.IReqDeleteChatMsg} message ReqDeleteChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqDeleteChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqUserId != null && message.hasOwnProperty("reqUserId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.reqUserId);
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msgId);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.userId);
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.toUserId);
            return writer;
        };

        /**
         * Encodes the specified ReqDeleteChatMsg message, length delimited. Does not implicitly {@link mproto.ReqDeleteChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqDeleteChatMsg
         * @static
         * @param {mproto.IReqDeleteChatMsg} message ReqDeleteChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqDeleteChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqDeleteChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqDeleteChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqDeleteChatMsg} ReqDeleteChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqDeleteChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqDeleteChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reqUserId = reader.string();
                    break;
                case 2:
                    message.msgId = reader.string();
                    break;
                case 3:
                    message.userId = reader.string();
                    break;
                case 4:
                    message.toUserId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqDeleteChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqDeleteChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqDeleteChatMsg} ReqDeleteChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqDeleteChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqDeleteChatMsg message.
         * @function verify
         * @memberof mproto.ReqDeleteChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqDeleteChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqUserId != null && message.hasOwnProperty("reqUserId"))
                if (!$util.isString(message.reqUserId))
                    return "reqUserId: string expected";
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                if (!$util.isString(message.msgId))
                    return "msgId: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                if (!$util.isString(message.toUserId))
                    return "toUserId: string expected";
            return null;
        };

        /**
         * Creates a ReqDeleteChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqDeleteChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqDeleteChatMsg} ReqDeleteChatMsg
         */
        ReqDeleteChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqDeleteChatMsg)
                return object;
            var message = new $root.mproto.ReqDeleteChatMsg();
            if (object.reqUserId != null)
                message.reqUserId = String(object.reqUserId);
            if (object.msgId != null)
                message.msgId = String(object.msgId);
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.toUserId != null)
                message.toUserId = String(object.toUserId);
            return message;
        };

        /**
         * Creates a plain object from a ReqDeleteChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqDeleteChatMsg
         * @static
         * @param {mproto.ReqDeleteChatMsg} message ReqDeleteChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqDeleteChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reqUserId = "";
                object.msgId = "";
                object.userId = "";
                object.toUserId = "";
            }
            if (message.reqUserId != null && message.hasOwnProperty("reqUserId"))
                object.reqUserId = message.reqUserId;
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                object.msgId = message.msgId;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                object.toUserId = message.toUserId;
            return object;
        };

        /**
         * Converts this ReqDeleteChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.ReqDeleteChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqDeleteChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqDeleteChatMsg;
    })();

    mproto.ReqDeleteConversion = (function() {

        /**
         * Properties of a ReqDeleteConversion.
         * @memberof mproto
         * @interface IReqDeleteConversion
         * @property {string|null} [conversionId] ReqDeleteConversion conversionId
         * @property {string|null} [userId] ReqDeleteConversion userId
         * @property {string|null} [toUserId] ReqDeleteConversion toUserId
         */

        /**
         * Constructs a new ReqDeleteConversion.
         * @memberof mproto
         * @classdesc Represents a ReqDeleteConversion.
         * @implements IReqDeleteConversion
         * @constructor
         * @param {mproto.IReqDeleteConversion=} [properties] Properties to set
         */
        function ReqDeleteConversion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqDeleteConversion conversionId.
         * @member {string} conversionId
         * @memberof mproto.ReqDeleteConversion
         * @instance
         */
        ReqDeleteConversion.prototype.conversionId = "";

        /**
         * ReqDeleteConversion userId.
         * @member {string} userId
         * @memberof mproto.ReqDeleteConversion
         * @instance
         */
        ReqDeleteConversion.prototype.userId = "";

        /**
         * ReqDeleteConversion toUserId.
         * @member {string} toUserId
         * @memberof mproto.ReqDeleteConversion
         * @instance
         */
        ReqDeleteConversion.prototype.toUserId = "";

        /**
         * Creates a new ReqDeleteConversion instance using the specified properties.
         * @function create
         * @memberof mproto.ReqDeleteConversion
         * @static
         * @param {mproto.IReqDeleteConversion=} [properties] Properties to set
         * @returns {mproto.ReqDeleteConversion} ReqDeleteConversion instance
         */
        ReqDeleteConversion.create = function create(properties) {
            return new ReqDeleteConversion(properties);
        };

        /**
         * Encodes the specified ReqDeleteConversion message. Does not implicitly {@link mproto.ReqDeleteConversion.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqDeleteConversion
         * @static
         * @param {mproto.IReqDeleteConversion} message ReqDeleteConversion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqDeleteConversion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.conversionId);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.toUserId);
            return writer;
        };

        /**
         * Encodes the specified ReqDeleteConversion message, length delimited. Does not implicitly {@link mproto.ReqDeleteConversion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqDeleteConversion
         * @static
         * @param {mproto.IReqDeleteConversion} message ReqDeleteConversion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqDeleteConversion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqDeleteConversion message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqDeleteConversion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqDeleteConversion} ReqDeleteConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqDeleteConversion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqDeleteConversion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.conversionId = reader.string();
                    break;
                case 2:
                    message.userId = reader.string();
                    break;
                case 3:
                    message.toUserId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqDeleteConversion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqDeleteConversion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqDeleteConversion} ReqDeleteConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqDeleteConversion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqDeleteConversion message.
         * @function verify
         * @memberof mproto.ReqDeleteConversion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqDeleteConversion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                if (!$util.isString(message.conversionId))
                    return "conversionId: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                if (!$util.isString(message.toUserId))
                    return "toUserId: string expected";
            return null;
        };

        /**
         * Creates a ReqDeleteConversion message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqDeleteConversion
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqDeleteConversion} ReqDeleteConversion
         */
        ReqDeleteConversion.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqDeleteConversion)
                return object;
            var message = new $root.mproto.ReqDeleteConversion();
            if (object.conversionId != null)
                message.conversionId = String(object.conversionId);
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.toUserId != null)
                message.toUserId = String(object.toUserId);
            return message;
        };

        /**
         * Creates a plain object from a ReqDeleteConversion message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqDeleteConversion
         * @static
         * @param {mproto.ReqDeleteConversion} message ReqDeleteConversion
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqDeleteConversion.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.conversionId = "";
                object.userId = "";
                object.toUserId = "";
            }
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                object.conversionId = message.conversionId;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                object.toUserId = message.toUserId;
            return object;
        };

        /**
         * Converts this ReqDeleteConversion to JSON.
         * @function toJSON
         * @memberof mproto.ReqDeleteConversion
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqDeleteConversion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqDeleteConversion;
    })();

    mproto.ReqEditChatMsg = (function() {

        /**
         * Properties of a ReqEditChatMsg.
         * @memberof mproto
         * @interface IReqEditChatMsg
         * @property {string|null} [msgId] ReqEditChatMsg msgId
         * @property {string|null} [userId] ReqEditChatMsg userId
         * @property {string|null} [toUserId] ReqEditChatMsg toUserId
         * @property {string|null} [newMsgContent] ReqEditChatMsg newMsgContent
         */

        /**
         * Constructs a new ReqEditChatMsg.
         * @memberof mproto
         * @classdesc Represents a ReqEditChatMsg.
         * @implements IReqEditChatMsg
         * @constructor
         * @param {mproto.IReqEditChatMsg=} [properties] Properties to set
         */
        function ReqEditChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqEditChatMsg msgId.
         * @member {string} msgId
         * @memberof mproto.ReqEditChatMsg
         * @instance
         */
        ReqEditChatMsg.prototype.msgId = "";

        /**
         * ReqEditChatMsg userId.
         * @member {string} userId
         * @memberof mproto.ReqEditChatMsg
         * @instance
         */
        ReqEditChatMsg.prototype.userId = "";

        /**
         * ReqEditChatMsg toUserId.
         * @member {string} toUserId
         * @memberof mproto.ReqEditChatMsg
         * @instance
         */
        ReqEditChatMsg.prototype.toUserId = "";

        /**
         * ReqEditChatMsg newMsgContent.
         * @member {string} newMsgContent
         * @memberof mproto.ReqEditChatMsg
         * @instance
         */
        ReqEditChatMsg.prototype.newMsgContent = "";

        /**
         * Creates a new ReqEditChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.ReqEditChatMsg
         * @static
         * @param {mproto.IReqEditChatMsg=} [properties] Properties to set
         * @returns {mproto.ReqEditChatMsg} ReqEditChatMsg instance
         */
        ReqEditChatMsg.create = function create(properties) {
            return new ReqEditChatMsg(properties);
        };

        /**
         * Encodes the specified ReqEditChatMsg message. Does not implicitly {@link mproto.ReqEditChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqEditChatMsg
         * @static
         * @param {mproto.IReqEditChatMsg} message ReqEditChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqEditChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.msgId);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.toUserId);
            if (message.newMsgContent != null && message.hasOwnProperty("newMsgContent"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.newMsgContent);
            return writer;
        };

        /**
         * Encodes the specified ReqEditChatMsg message, length delimited. Does not implicitly {@link mproto.ReqEditChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqEditChatMsg
         * @static
         * @param {mproto.IReqEditChatMsg} message ReqEditChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqEditChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqEditChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqEditChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqEditChatMsg} ReqEditChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqEditChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqEditChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msgId = reader.string();
                    break;
                case 2:
                    message.userId = reader.string();
                    break;
                case 3:
                    message.toUserId = reader.string();
                    break;
                case 4:
                    message.newMsgContent = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqEditChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqEditChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqEditChatMsg} ReqEditChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqEditChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqEditChatMsg message.
         * @function verify
         * @memberof mproto.ReqEditChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqEditChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                if (!$util.isString(message.msgId))
                    return "msgId: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                if (!$util.isString(message.toUserId))
                    return "toUserId: string expected";
            if (message.newMsgContent != null && message.hasOwnProperty("newMsgContent"))
                if (!$util.isString(message.newMsgContent))
                    return "newMsgContent: string expected";
            return null;
        };

        /**
         * Creates a ReqEditChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqEditChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqEditChatMsg} ReqEditChatMsg
         */
        ReqEditChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqEditChatMsg)
                return object;
            var message = new $root.mproto.ReqEditChatMsg();
            if (object.msgId != null)
                message.msgId = String(object.msgId);
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.toUserId != null)
                message.toUserId = String(object.toUserId);
            if (object.newMsgContent != null)
                message.newMsgContent = String(object.newMsgContent);
            return message;
        };

        /**
         * Creates a plain object from a ReqEditChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqEditChatMsg
         * @static
         * @param {mproto.ReqEditChatMsg} message ReqEditChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqEditChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.msgId = "";
                object.userId = "";
                object.toUserId = "";
                object.newMsgContent = "";
            }
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                object.msgId = message.msgId;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                object.toUserId = message.toUserId;
            if (message.newMsgContent != null && message.hasOwnProperty("newMsgContent"))
                object.newMsgContent = message.newMsgContent;
            return object;
        };

        /**
         * Converts this ReqEditChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.ReqEditChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqEditChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqEditChatMsg;
    })();

    mproto.ReqSearchUser = (function() {

        /**
         * Properties of a ReqSearchUser.
         * @memberof mproto
         * @interface IReqSearchUser
         * @property {string|null} [userId] ReqSearchUser userId
         * @property {string|null} [searchUserId] ReqSearchUser searchUserId
         */

        /**
         * Constructs a new ReqSearchUser.
         * @memberof mproto
         * @classdesc Represents a ReqSearchUser.
         * @implements IReqSearchUser
         * @constructor
         * @param {mproto.IReqSearchUser=} [properties] Properties to set
         */
        function ReqSearchUser(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqSearchUser userId.
         * @member {string} userId
         * @memberof mproto.ReqSearchUser
         * @instance
         */
        ReqSearchUser.prototype.userId = "";

        /**
         * ReqSearchUser searchUserId.
         * @member {string} searchUserId
         * @memberof mproto.ReqSearchUser
         * @instance
         */
        ReqSearchUser.prototype.searchUserId = "";

        /**
         * Creates a new ReqSearchUser instance using the specified properties.
         * @function create
         * @memberof mproto.ReqSearchUser
         * @static
         * @param {mproto.IReqSearchUser=} [properties] Properties to set
         * @returns {mproto.ReqSearchUser} ReqSearchUser instance
         */
        ReqSearchUser.create = function create(properties) {
            return new ReqSearchUser(properties);
        };

        /**
         * Encodes the specified ReqSearchUser message. Does not implicitly {@link mproto.ReqSearchUser.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqSearchUser
         * @static
         * @param {mproto.IReqSearchUser} message ReqSearchUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqSearchUser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.searchUserId != null && message.hasOwnProperty("searchUserId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.searchUserId);
            return writer;
        };

        /**
         * Encodes the specified ReqSearchUser message, length delimited. Does not implicitly {@link mproto.ReqSearchUser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqSearchUser
         * @static
         * @param {mproto.IReqSearchUser} message ReqSearchUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqSearchUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqSearchUser message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqSearchUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqSearchUser} ReqSearchUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqSearchUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqSearchUser();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.searchUserId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqSearchUser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqSearchUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqSearchUser} ReqSearchUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqSearchUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqSearchUser message.
         * @function verify
         * @memberof mproto.ReqSearchUser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqSearchUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.searchUserId != null && message.hasOwnProperty("searchUserId"))
                if (!$util.isString(message.searchUserId))
                    return "searchUserId: string expected";
            return null;
        };

        /**
         * Creates a ReqSearchUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqSearchUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqSearchUser} ReqSearchUser
         */
        ReqSearchUser.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqSearchUser)
                return object;
            var message = new $root.mproto.ReqSearchUser();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.searchUserId != null)
                message.searchUserId = String(object.searchUserId);
            return message;
        };

        /**
         * Creates a plain object from a ReqSearchUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqSearchUser
         * @static
         * @param {mproto.ReqSearchUser} message ReqSearchUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqSearchUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.searchUserId = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.searchUserId != null && message.hasOwnProperty("searchUserId"))
                object.searchUserId = message.searchUserId;
            return object;
        };

        /**
         * Converts this ReqSearchUser to JSON.
         * @function toJSON
         * @memberof mproto.ReqSearchUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqSearchUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqSearchUser;
    })();

    mproto.ReqSearchSubUser = (function() {

        /**
         * Properties of a ReqSearchSubUser.
         * @memberof mproto
         * @interface IReqSearchSubUser
         * @property {string|null} [userId] ReqSearchSubUser userId
         * @property {string|null} [searchUserId] ReqSearchSubUser searchUserId
         */

        /**
         * Constructs a new ReqSearchSubUser.
         * @memberof mproto
         * @classdesc Represents a ReqSearchSubUser.
         * @implements IReqSearchSubUser
         * @constructor
         * @param {mproto.IReqSearchSubUser=} [properties] Properties to set
         */
        function ReqSearchSubUser(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqSearchSubUser userId.
         * @member {string} userId
         * @memberof mproto.ReqSearchSubUser
         * @instance
         */
        ReqSearchSubUser.prototype.userId = "";

        /**
         * ReqSearchSubUser searchUserId.
         * @member {string} searchUserId
         * @memberof mproto.ReqSearchSubUser
         * @instance
         */
        ReqSearchSubUser.prototype.searchUserId = "";

        /**
         * Creates a new ReqSearchSubUser instance using the specified properties.
         * @function create
         * @memberof mproto.ReqSearchSubUser
         * @static
         * @param {mproto.IReqSearchSubUser=} [properties] Properties to set
         * @returns {mproto.ReqSearchSubUser} ReqSearchSubUser instance
         */
        ReqSearchSubUser.create = function create(properties) {
            return new ReqSearchSubUser(properties);
        };

        /**
         * Encodes the specified ReqSearchSubUser message. Does not implicitly {@link mproto.ReqSearchSubUser.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqSearchSubUser
         * @static
         * @param {mproto.IReqSearchSubUser} message ReqSearchSubUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqSearchSubUser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.searchUserId != null && message.hasOwnProperty("searchUserId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.searchUserId);
            return writer;
        };

        /**
         * Encodes the specified ReqSearchSubUser message, length delimited. Does not implicitly {@link mproto.ReqSearchSubUser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqSearchSubUser
         * @static
         * @param {mproto.IReqSearchSubUser} message ReqSearchSubUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqSearchSubUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqSearchSubUser message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqSearchSubUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqSearchSubUser} ReqSearchSubUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqSearchSubUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqSearchSubUser();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.searchUserId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqSearchSubUser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqSearchSubUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqSearchSubUser} ReqSearchSubUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqSearchSubUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqSearchSubUser message.
         * @function verify
         * @memberof mproto.ReqSearchSubUser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqSearchSubUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.searchUserId != null && message.hasOwnProperty("searchUserId"))
                if (!$util.isString(message.searchUserId))
                    return "searchUserId: string expected";
            return null;
        };

        /**
         * Creates a ReqSearchSubUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqSearchSubUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqSearchSubUser} ReqSearchSubUser
         */
        ReqSearchSubUser.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqSearchSubUser)
                return object;
            var message = new $root.mproto.ReqSearchSubUser();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.searchUserId != null)
                message.searchUserId = String(object.searchUserId);
            return message;
        };

        /**
         * Creates a plain object from a ReqSearchSubUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqSearchSubUser
         * @static
         * @param {mproto.ReqSearchSubUser} message ReqSearchSubUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqSearchSubUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.searchUserId = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.searchUserId != null && message.hasOwnProperty("searchUserId"))
                object.searchUserId = message.searchUserId;
            return object;
        };

        /**
         * Converts this ReqSearchSubUser to JSON.
         * @function toJSON
         * @memberof mproto.ReqSearchSubUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqSearchSubUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqSearchSubUser;
    })();

    mproto.ReqGetSubUserList = (function() {

        /**
         * Properties of a ReqGetSubUserList.
         * @memberof mproto
         * @interface IReqGetSubUserList
         * @property {string|null} [userId] ReqGetSubUserList userId
         * @property {number|null} [skip] ReqGetSubUserList skip
         * @property {number|null} [limit] ReqGetSubUserList limit
         */

        /**
         * Constructs a new ReqGetSubUserList.
         * @memberof mproto
         * @classdesc Represents a ReqGetSubUserList.
         * @implements IReqGetSubUserList
         * @constructor
         * @param {mproto.IReqGetSubUserList=} [properties] Properties to set
         */
        function ReqGetSubUserList(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqGetSubUserList userId.
         * @member {string} userId
         * @memberof mproto.ReqGetSubUserList
         * @instance
         */
        ReqGetSubUserList.prototype.userId = "";

        /**
         * ReqGetSubUserList skip.
         * @member {number} skip
         * @memberof mproto.ReqGetSubUserList
         * @instance
         */
        ReqGetSubUserList.prototype.skip = 0;

        /**
         * ReqGetSubUserList limit.
         * @member {number} limit
         * @memberof mproto.ReqGetSubUserList
         * @instance
         */
        ReqGetSubUserList.prototype.limit = 0;

        /**
         * Creates a new ReqGetSubUserList instance using the specified properties.
         * @function create
         * @memberof mproto.ReqGetSubUserList
         * @static
         * @param {mproto.IReqGetSubUserList=} [properties] Properties to set
         * @returns {mproto.ReqGetSubUserList} ReqGetSubUserList instance
         */
        ReqGetSubUserList.create = function create(properties) {
            return new ReqGetSubUserList(properties);
        };

        /**
         * Encodes the specified ReqGetSubUserList message. Does not implicitly {@link mproto.ReqGetSubUserList.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqGetSubUserList
         * @static
         * @param {mproto.IReqGetSubUserList} message ReqGetSubUserList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqGetSubUserList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.skip != null && message.hasOwnProperty("skip"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.skip);
            if (message.limit != null && message.hasOwnProperty("limit"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.limit);
            return writer;
        };

        /**
         * Encodes the specified ReqGetSubUserList message, length delimited. Does not implicitly {@link mproto.ReqGetSubUserList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqGetSubUserList
         * @static
         * @param {mproto.IReqGetSubUserList} message ReqGetSubUserList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqGetSubUserList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqGetSubUserList message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqGetSubUserList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqGetSubUserList} ReqGetSubUserList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqGetSubUserList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqGetSubUserList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.skip = reader.int32();
                    break;
                case 3:
                    message.limit = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqGetSubUserList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqGetSubUserList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqGetSubUserList} ReqGetSubUserList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqGetSubUserList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqGetSubUserList message.
         * @function verify
         * @memberof mproto.ReqGetSubUserList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqGetSubUserList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.skip != null && message.hasOwnProperty("skip"))
                if (!$util.isInteger(message.skip))
                    return "skip: integer expected";
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (!$util.isInteger(message.limit))
                    return "limit: integer expected";
            return null;
        };

        /**
         * Creates a ReqGetSubUserList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqGetSubUserList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqGetSubUserList} ReqGetSubUserList
         */
        ReqGetSubUserList.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqGetSubUserList)
                return object;
            var message = new $root.mproto.ReqGetSubUserList();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.skip != null)
                message.skip = object.skip | 0;
            if (object.limit != null)
                message.limit = object.limit | 0;
            return message;
        };

        /**
         * Creates a plain object from a ReqGetSubUserList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqGetSubUserList
         * @static
         * @param {mproto.ReqGetSubUserList} message ReqGetSubUserList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqGetSubUserList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.skip = 0;
                object.limit = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.skip != null && message.hasOwnProperty("skip"))
                object.skip = message.skip;
            if (message.limit != null && message.hasOwnProperty("limit"))
                object.limit = message.limit;
            return object;
        };

        /**
         * Converts this ReqGetSubUserList to JSON.
         * @function toJSON
         * @memberof mproto.ReqGetSubUserList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqGetSubUserList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqGetSubUserList;
    })();

    mproto.ReqMatchService = (function() {

        /**
         * Properties of a ReqMatchService.
         * @memberof mproto
         * @interface IReqMatchService
         * @property {string|null} [userId] ReqMatchService userId
         * @property {string|null} [serviceType] ReqMatchService serviceType
         * @property {string|null} [brand] ReqMatchService brand
         */

        /**
         * Constructs a new ReqMatchService.
         * @memberof mproto
         * @classdesc Represents a ReqMatchService.
         * @implements IReqMatchService
         * @constructor
         * @param {mproto.IReqMatchService=} [properties] Properties to set
         */
        function ReqMatchService(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqMatchService userId.
         * @member {string} userId
         * @memberof mproto.ReqMatchService
         * @instance
         */
        ReqMatchService.prototype.userId = "";

        /**
         * ReqMatchService serviceType.
         * @member {string} serviceType
         * @memberof mproto.ReqMatchService
         * @instance
         */
        ReqMatchService.prototype.serviceType = "";

        /**
         * ReqMatchService brand.
         * @member {string} brand
         * @memberof mproto.ReqMatchService
         * @instance
         */
        ReqMatchService.prototype.brand = "";

        /**
         * Creates a new ReqMatchService instance using the specified properties.
         * @function create
         * @memberof mproto.ReqMatchService
         * @static
         * @param {mproto.IReqMatchService=} [properties] Properties to set
         * @returns {mproto.ReqMatchService} ReqMatchService instance
         */
        ReqMatchService.create = function create(properties) {
            return new ReqMatchService(properties);
        };

        /**
         * Encodes the specified ReqMatchService message. Does not implicitly {@link mproto.ReqMatchService.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqMatchService
         * @static
         * @param {mproto.IReqMatchService} message ReqMatchService message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqMatchService.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.serviceType != null && message.hasOwnProperty("serviceType"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceType);
            if (message.brand != null && message.hasOwnProperty("brand"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.brand);
            return writer;
        };

        /**
         * Encodes the specified ReqMatchService message, length delimited. Does not implicitly {@link mproto.ReqMatchService.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqMatchService
         * @static
         * @param {mproto.IReqMatchService} message ReqMatchService message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqMatchService.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqMatchService message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqMatchService
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqMatchService} ReqMatchService
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqMatchService.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqMatchService();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.serviceType = reader.string();
                    break;
                case 3:
                    message.brand = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqMatchService message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqMatchService
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqMatchService} ReqMatchService
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqMatchService.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqMatchService message.
         * @function verify
         * @memberof mproto.ReqMatchService
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqMatchService.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.serviceType != null && message.hasOwnProperty("serviceType"))
                if (!$util.isString(message.serviceType))
                    return "serviceType: string expected";
            if (message.brand != null && message.hasOwnProperty("brand"))
                if (!$util.isString(message.brand))
                    return "brand: string expected";
            return null;
        };

        /**
         * Creates a ReqMatchService message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqMatchService
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqMatchService} ReqMatchService
         */
        ReqMatchService.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqMatchService)
                return object;
            var message = new $root.mproto.ReqMatchService();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.serviceType != null)
                message.serviceType = String(object.serviceType);
            if (object.brand != null)
                message.brand = String(object.brand);
            return message;
        };

        /**
         * Creates a plain object from a ReqMatchService message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqMatchService
         * @static
         * @param {mproto.ReqMatchService} message ReqMatchService
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqMatchService.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.serviceType = "";
                object.brand = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.serviceType != null && message.hasOwnProperty("serviceType"))
                object.serviceType = message.serviceType;
            if (message.brand != null && message.hasOwnProperty("brand"))
                object.brand = message.brand;
            return object;
        };

        /**
         * Converts this ReqMatchService to JSON.
         * @function toJSON
         * @memberof mproto.ReqMatchService
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqMatchService.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqMatchService;
    })();

    mproto.ReqGetQuickReplyList = (function() {

        /**
         * Properties of a ReqGetQuickReplyList.
         * @memberof mproto
         * @interface IReqGetQuickReplyList
         * @property {string|null} [serviceType] ReqGetQuickReplyList serviceType
         */

        /**
         * Constructs a new ReqGetQuickReplyList.
         * @memberof mproto
         * @classdesc Represents a ReqGetQuickReplyList.
         * @implements IReqGetQuickReplyList
         * @constructor
         * @param {mproto.IReqGetQuickReplyList=} [properties] Properties to set
         */
        function ReqGetQuickReplyList(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqGetQuickReplyList serviceType.
         * @member {string} serviceType
         * @memberof mproto.ReqGetQuickReplyList
         * @instance
         */
        ReqGetQuickReplyList.prototype.serviceType = "";

        /**
         * Creates a new ReqGetQuickReplyList instance using the specified properties.
         * @function create
         * @memberof mproto.ReqGetQuickReplyList
         * @static
         * @param {mproto.IReqGetQuickReplyList=} [properties] Properties to set
         * @returns {mproto.ReqGetQuickReplyList} ReqGetQuickReplyList instance
         */
        ReqGetQuickReplyList.create = function create(properties) {
            return new ReqGetQuickReplyList(properties);
        };

        /**
         * Encodes the specified ReqGetQuickReplyList message. Does not implicitly {@link mproto.ReqGetQuickReplyList.verify|verify} messages.
         * @function encode
         * @memberof mproto.ReqGetQuickReplyList
         * @static
         * @param {mproto.IReqGetQuickReplyList} message ReqGetQuickReplyList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqGetQuickReplyList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serviceType != null && message.hasOwnProperty("serviceType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.serviceType);
            return writer;
        };

        /**
         * Encodes the specified ReqGetQuickReplyList message, length delimited. Does not implicitly {@link mproto.ReqGetQuickReplyList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ReqGetQuickReplyList
         * @static
         * @param {mproto.IReqGetQuickReplyList} message ReqGetQuickReplyList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqGetQuickReplyList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqGetQuickReplyList message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ReqGetQuickReplyList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ReqGetQuickReplyList} ReqGetQuickReplyList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqGetQuickReplyList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ReqGetQuickReplyList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serviceType = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqGetQuickReplyList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ReqGetQuickReplyList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ReqGetQuickReplyList} ReqGetQuickReplyList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqGetQuickReplyList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqGetQuickReplyList message.
         * @function verify
         * @memberof mproto.ReqGetQuickReplyList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqGetQuickReplyList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serviceType != null && message.hasOwnProperty("serviceType"))
                if (!$util.isString(message.serviceType))
                    return "serviceType: string expected";
            return null;
        };

        /**
         * Creates a ReqGetQuickReplyList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ReqGetQuickReplyList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ReqGetQuickReplyList} ReqGetQuickReplyList
         */
        ReqGetQuickReplyList.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ReqGetQuickReplyList)
                return object;
            var message = new $root.mproto.ReqGetQuickReplyList();
            if (object.serviceType != null)
                message.serviceType = String(object.serviceType);
            return message;
        };

        /**
         * Creates a plain object from a ReqGetQuickReplyList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ReqGetQuickReplyList
         * @static
         * @param {mproto.ReqGetQuickReplyList} message ReqGetQuickReplyList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqGetQuickReplyList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.serviceType = "";
            if (message.serviceType != null && message.hasOwnProperty("serviceType"))
                object.serviceType = message.serviceType;
            return object;
        };

        /**
         * Converts this ReqGetQuickReplyList to JSON.
         * @function toJSON
         * @memberof mproto.ReqGetQuickReplyList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqGetQuickReplyList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqGetQuickReplyList;
    })();

    mproto.PONG = (function() {

        /**
         * Properties of a PONG.
         * @memberof mproto
         * @interface IPONG
         * @property {number|Long|null} [time] PONG time
         */

        /**
         * Constructs a new PONG.
         * @memberof mproto
         * @classdesc Represents a PONG.
         * @implements IPONG
         * @constructor
         * @param {mproto.IPONG=} [properties] Properties to set
         */
        function PONG(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PONG time.
         * @member {number|Long} time
         * @memberof mproto.PONG
         * @instance
         */
        PONG.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PONG instance using the specified properties.
         * @function create
         * @memberof mproto.PONG
         * @static
         * @param {mproto.IPONG=} [properties] Properties to set
         * @returns {mproto.PONG} PONG instance
         */
        PONG.create = function create(properties) {
            return new PONG(properties);
        };

        /**
         * Encodes the specified PONG message. Does not implicitly {@link mproto.PONG.verify|verify} messages.
         * @function encode
         * @memberof mproto.PONG
         * @static
         * @param {mproto.IPONG} message PONG message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PONG.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.time);
            return writer;
        };

        /**
         * Encodes the specified PONG message, length delimited. Does not implicitly {@link mproto.PONG.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.PONG
         * @static
         * @param {mproto.IPONG} message PONG message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PONG.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PONG message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.PONG
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.PONG} PONG
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PONG.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.PONG();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PONG message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.PONG
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.PONG} PONG
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PONG.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PONG message.
         * @function verify
         * @memberof mproto.PONG
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PONG.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates a PONG message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.PONG
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.PONG} PONG
         */
        PONG.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.PONG)
                return object;
            var message = new $root.mproto.PONG();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PONG message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.PONG
         * @static
         * @param {mproto.PONG} message PONG
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PONG.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this PONG to JSON.
         * @function toJSON
         * @memberof mproto.PONG
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PONG.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PONG;
    })();

    mproto.RespLogin = (function() {

        /**
         * Properties of a RespLogin.
         * @memberof mproto
         * @interface IRespLogin
         * @property {mproto.IUserInfo|null} [userInfo] RespLogin userInfo
         */

        /**
         * Constructs a new RespLogin.
         * @memberof mproto
         * @classdesc Represents a RespLogin.
         * @implements IRespLogin
         * @constructor
         * @param {mproto.IRespLogin=} [properties] Properties to set
         */
        function RespLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespLogin userInfo.
         * @member {mproto.IUserInfo|null|undefined} userInfo
         * @memberof mproto.RespLogin
         * @instance
         */
        RespLogin.prototype.userInfo = null;

        /**
         * Creates a new RespLogin instance using the specified properties.
         * @function create
         * @memberof mproto.RespLogin
         * @static
         * @param {mproto.IRespLogin=} [properties] Properties to set
         * @returns {mproto.RespLogin} RespLogin instance
         */
        RespLogin.create = function create(properties) {
            return new RespLogin(properties);
        };

        /**
         * Encodes the specified RespLogin message. Does not implicitly {@link mproto.RespLogin.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespLogin
         * @static
         * @param {mproto.IRespLogin} message RespLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                $root.mproto.UserInfo.encode(message.userInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespLogin message, length delimited. Does not implicitly {@link mproto.RespLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespLogin
         * @static
         * @param {mproto.IRespLogin} message RespLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespLogin message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespLogin} RespLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userInfo = $root.mproto.UserInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespLogin} RespLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespLogin message.
         * @function verify
         * @memberof mproto.RespLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userInfo != null && message.hasOwnProperty("userInfo")) {
                var error = $root.mproto.UserInfo.verify(message.userInfo);
                if (error)
                    return "userInfo." + error;
            }
            return null;
        };

        /**
         * Creates a RespLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespLogin} RespLogin
         */
        RespLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespLogin)
                return object;
            var message = new $root.mproto.RespLogin();
            if (object.userInfo != null) {
                if (typeof object.userInfo !== "object")
                    throw TypeError(".mproto.RespLogin.userInfo: object expected");
                message.userInfo = $root.mproto.UserInfo.fromObject(object.userInfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a RespLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespLogin
         * @static
         * @param {mproto.RespLogin} message RespLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.userInfo = null;
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                object.userInfo = $root.mproto.UserInfo.toObject(message.userInfo, options);
            return object;
        };

        /**
         * Converts this RespLogin to JSON.
         * @function toJSON
         * @memberof mproto.RespLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespLogin;
    })();

    mproto.RespConversionList = (function() {

        /**
         * Properties of a RespConversionList.
         * @memberof mproto
         * @interface IRespConversionList
         * @property {Array.<mproto.IConversion>|null} [conversions] RespConversionList conversions
         * @property {number|null} [skip] RespConversionList skip
         */

        /**
         * Constructs a new RespConversionList.
         * @memberof mproto
         * @classdesc Represents a RespConversionList.
         * @implements IRespConversionList
         * @constructor
         * @param {mproto.IRespConversionList=} [properties] Properties to set
         */
        function RespConversionList(properties) {
            this.conversions = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespConversionList conversions.
         * @member {Array.<mproto.IConversion>} conversions
         * @memberof mproto.RespConversionList
         * @instance
         */
        RespConversionList.prototype.conversions = $util.emptyArray;

        /**
         * RespConversionList skip.
         * @member {number} skip
         * @memberof mproto.RespConversionList
         * @instance
         */
        RespConversionList.prototype.skip = 0;

        /**
         * Creates a new RespConversionList instance using the specified properties.
         * @function create
         * @memberof mproto.RespConversionList
         * @static
         * @param {mproto.IRespConversionList=} [properties] Properties to set
         * @returns {mproto.RespConversionList} RespConversionList instance
         */
        RespConversionList.create = function create(properties) {
            return new RespConversionList(properties);
        };

        /**
         * Encodes the specified RespConversionList message. Does not implicitly {@link mproto.RespConversionList.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespConversionList
         * @static
         * @param {mproto.IRespConversionList} message RespConversionList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespConversionList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.conversions != null && message.conversions.length)
                for (var i = 0; i < message.conversions.length; ++i)
                    $root.mproto.Conversion.encode(message.conversions[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.skip != null && message.hasOwnProperty("skip"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.skip);
            return writer;
        };

        /**
         * Encodes the specified RespConversionList message, length delimited. Does not implicitly {@link mproto.RespConversionList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespConversionList
         * @static
         * @param {mproto.IRespConversionList} message RespConversionList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespConversionList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespConversionList message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespConversionList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespConversionList} RespConversionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespConversionList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespConversionList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.conversions && message.conversions.length))
                        message.conversions = [];
                    message.conversions.push($root.mproto.Conversion.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.skip = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespConversionList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespConversionList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespConversionList} RespConversionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespConversionList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespConversionList message.
         * @function verify
         * @memberof mproto.RespConversionList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespConversionList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.conversions != null && message.hasOwnProperty("conversions")) {
                if (!Array.isArray(message.conversions))
                    return "conversions: array expected";
                for (var i = 0; i < message.conversions.length; ++i) {
                    var error = $root.mproto.Conversion.verify(message.conversions[i]);
                    if (error)
                        return "conversions." + error;
                }
            }
            if (message.skip != null && message.hasOwnProperty("skip"))
                if (!$util.isInteger(message.skip))
                    return "skip: integer expected";
            return null;
        };

        /**
         * Creates a RespConversionList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespConversionList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespConversionList} RespConversionList
         */
        RespConversionList.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespConversionList)
                return object;
            var message = new $root.mproto.RespConversionList();
            if (object.conversions) {
                if (!Array.isArray(object.conversions))
                    throw TypeError(".mproto.RespConversionList.conversions: array expected");
                message.conversions = [];
                for (var i = 0; i < object.conversions.length; ++i) {
                    if (typeof object.conversions[i] !== "object")
                        throw TypeError(".mproto.RespConversionList.conversions: object expected");
                    message.conversions[i] = $root.mproto.Conversion.fromObject(object.conversions[i]);
                }
            }
            if (object.skip != null)
                message.skip = object.skip | 0;
            return message;
        };

        /**
         * Creates a plain object from a RespConversionList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespConversionList
         * @static
         * @param {mproto.RespConversionList} message RespConversionList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespConversionList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.conversions = [];
            if (options.defaults)
                object.skip = 0;
            if (message.conversions && message.conversions.length) {
                object.conversions = [];
                for (var j = 0; j < message.conversions.length; ++j)
                    object.conversions[j] = $root.mproto.Conversion.toObject(message.conversions[j], options);
            }
            if (message.skip != null && message.hasOwnProperty("skip"))
                object.skip = message.skip;
            return object;
        };

        /**
         * Converts this RespConversionList to JSON.
         * @function toJSON
         * @memberof mproto.RespConversionList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespConversionList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespConversionList;
    })();

    mproto.RespChatMsgList = (function() {

        /**
         * Properties of a RespChatMsgList.
         * @memberof mproto
         * @interface IRespChatMsgList
         * @property {Array.<mproto.IChatMsg>|null} [chatMsg] RespChatMsgList chatMsg
         */

        /**
         * Constructs a new RespChatMsgList.
         * @memberof mproto
         * @classdesc Represents a RespChatMsgList.
         * @implements IRespChatMsgList
         * @constructor
         * @param {mproto.IRespChatMsgList=} [properties] Properties to set
         */
        function RespChatMsgList(properties) {
            this.chatMsg = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespChatMsgList chatMsg.
         * @member {Array.<mproto.IChatMsg>} chatMsg
         * @memberof mproto.RespChatMsgList
         * @instance
         */
        RespChatMsgList.prototype.chatMsg = $util.emptyArray;

        /**
         * Creates a new RespChatMsgList instance using the specified properties.
         * @function create
         * @memberof mproto.RespChatMsgList
         * @static
         * @param {mproto.IRespChatMsgList=} [properties] Properties to set
         * @returns {mproto.RespChatMsgList} RespChatMsgList instance
         */
        RespChatMsgList.create = function create(properties) {
            return new RespChatMsgList(properties);
        };

        /**
         * Encodes the specified RespChatMsgList message. Does not implicitly {@link mproto.RespChatMsgList.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespChatMsgList
         * @static
         * @param {mproto.IRespChatMsgList} message RespChatMsgList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespChatMsgList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chatMsg != null && message.chatMsg.length)
                for (var i = 0; i < message.chatMsg.length; ++i)
                    $root.mproto.ChatMsg.encode(message.chatMsg[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespChatMsgList message, length delimited. Does not implicitly {@link mproto.RespChatMsgList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespChatMsgList
         * @static
         * @param {mproto.IRespChatMsgList} message RespChatMsgList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespChatMsgList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespChatMsgList message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespChatMsgList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespChatMsgList} RespChatMsgList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespChatMsgList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespChatMsgList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.chatMsg && message.chatMsg.length))
                        message.chatMsg = [];
                    message.chatMsg.push($root.mproto.ChatMsg.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespChatMsgList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespChatMsgList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespChatMsgList} RespChatMsgList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespChatMsgList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespChatMsgList message.
         * @function verify
         * @memberof mproto.RespChatMsgList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespChatMsgList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg")) {
                if (!Array.isArray(message.chatMsg))
                    return "chatMsg: array expected";
                for (var i = 0; i < message.chatMsg.length; ++i) {
                    var error = $root.mproto.ChatMsg.verify(message.chatMsg[i]);
                    if (error)
                        return "chatMsg." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RespChatMsgList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespChatMsgList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespChatMsgList} RespChatMsgList
         */
        RespChatMsgList.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespChatMsgList)
                return object;
            var message = new $root.mproto.RespChatMsgList();
            if (object.chatMsg) {
                if (!Array.isArray(object.chatMsg))
                    throw TypeError(".mproto.RespChatMsgList.chatMsg: array expected");
                message.chatMsg = [];
                for (var i = 0; i < object.chatMsg.length; ++i) {
                    if (typeof object.chatMsg[i] !== "object")
                        throw TypeError(".mproto.RespChatMsgList.chatMsg: object expected");
                    message.chatMsg[i] = $root.mproto.ChatMsg.fromObject(object.chatMsg[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RespChatMsgList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespChatMsgList
         * @static
         * @param {mproto.RespChatMsgList} message RespChatMsgList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespChatMsgList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.chatMsg = [];
            if (message.chatMsg && message.chatMsg.length) {
                object.chatMsg = [];
                for (var j = 0; j < message.chatMsg.length; ++j)
                    object.chatMsg[j] = $root.mproto.ChatMsg.toObject(message.chatMsg[j], options);
            }
            return object;
        };

        /**
         * Converts this RespChatMsgList to JSON.
         * @function toJSON
         * @memberof mproto.RespChatMsgList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespChatMsgList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespChatMsgList;
    })();

    mproto.RespSendChatMsg = (function() {

        /**
         * Properties of a RespSendChatMsg.
         * @memberof mproto
         * @interface IRespSendChatMsg
         * @property {mproto.IChatMsg|null} [chatMsg] RespSendChatMsg chatMsg
         */

        /**
         * Constructs a new RespSendChatMsg.
         * @memberof mproto
         * @classdesc Represents a RespSendChatMsg.
         * @implements IRespSendChatMsg
         * @constructor
         * @param {mproto.IRespSendChatMsg=} [properties] Properties to set
         */
        function RespSendChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespSendChatMsg chatMsg.
         * @member {mproto.IChatMsg|null|undefined} chatMsg
         * @memberof mproto.RespSendChatMsg
         * @instance
         */
        RespSendChatMsg.prototype.chatMsg = null;

        /**
         * Creates a new RespSendChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.RespSendChatMsg
         * @static
         * @param {mproto.IRespSendChatMsg=} [properties] Properties to set
         * @returns {mproto.RespSendChatMsg} RespSendChatMsg instance
         */
        RespSendChatMsg.create = function create(properties) {
            return new RespSendChatMsg(properties);
        };

        /**
         * Encodes the specified RespSendChatMsg message. Does not implicitly {@link mproto.RespSendChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespSendChatMsg
         * @static
         * @param {mproto.IRespSendChatMsg} message RespSendChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespSendChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                $root.mproto.ChatMsg.encode(message.chatMsg, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespSendChatMsg message, length delimited. Does not implicitly {@link mproto.RespSendChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespSendChatMsg
         * @static
         * @param {mproto.IRespSendChatMsg} message RespSendChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespSendChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespSendChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespSendChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespSendChatMsg} RespSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespSendChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespSendChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 3:
                    message.chatMsg = $root.mproto.ChatMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespSendChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespSendChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespSendChatMsg} RespSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespSendChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespSendChatMsg message.
         * @function verify
         * @memberof mproto.RespSendChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespSendChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg")) {
                var error = $root.mproto.ChatMsg.verify(message.chatMsg);
                if (error)
                    return "chatMsg." + error;
            }
            return null;
        };

        /**
         * Creates a RespSendChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespSendChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespSendChatMsg} RespSendChatMsg
         */
        RespSendChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespSendChatMsg)
                return object;
            var message = new $root.mproto.RespSendChatMsg();
            if (object.chatMsg != null) {
                if (typeof object.chatMsg !== "object")
                    throw TypeError(".mproto.RespSendChatMsg.chatMsg: object expected");
                message.chatMsg = $root.mproto.ChatMsg.fromObject(object.chatMsg);
            }
            return message;
        };

        /**
         * Creates a plain object from a RespSendChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespSendChatMsg
         * @static
         * @param {mproto.RespSendChatMsg} message RespSendChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespSendChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chatMsg = null;
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                object.chatMsg = $root.mproto.ChatMsg.toObject(message.chatMsg, options);
            return object;
        };

        /**
         * Converts this RespSendChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.RespSendChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespSendChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespSendChatMsg;
    })();

    mproto.PushSendChatMsg = (function() {

        /**
         * Properties of a PushSendChatMsg.
         * @memberof mproto
         * @interface IPushSendChatMsg
         * @property {mproto.IChatMsg|null} [chatMsg] PushSendChatMsg chatMsg
         */

        /**
         * Constructs a new PushSendChatMsg.
         * @memberof mproto
         * @classdesc Represents a PushSendChatMsg.
         * @implements IPushSendChatMsg
         * @constructor
         * @param {mproto.IPushSendChatMsg=} [properties] Properties to set
         */
        function PushSendChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PushSendChatMsg chatMsg.
         * @member {mproto.IChatMsg|null|undefined} chatMsg
         * @memberof mproto.PushSendChatMsg
         * @instance
         */
        PushSendChatMsg.prototype.chatMsg = null;

        /**
         * Creates a new PushSendChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.PushSendChatMsg
         * @static
         * @param {mproto.IPushSendChatMsg=} [properties] Properties to set
         * @returns {mproto.PushSendChatMsg} PushSendChatMsg instance
         */
        PushSendChatMsg.create = function create(properties) {
            return new PushSendChatMsg(properties);
        };

        /**
         * Encodes the specified PushSendChatMsg message. Does not implicitly {@link mproto.PushSendChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.PushSendChatMsg
         * @static
         * @param {mproto.IPushSendChatMsg} message PushSendChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushSendChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                $root.mproto.ChatMsg.encode(message.chatMsg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PushSendChatMsg message, length delimited. Does not implicitly {@link mproto.PushSendChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.PushSendChatMsg
         * @static
         * @param {mproto.IPushSendChatMsg} message PushSendChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushSendChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PushSendChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.PushSendChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.PushSendChatMsg} PushSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushSendChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.PushSendChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chatMsg = $root.mproto.ChatMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PushSendChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.PushSendChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.PushSendChatMsg} PushSendChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushSendChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PushSendChatMsg message.
         * @function verify
         * @memberof mproto.PushSendChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PushSendChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg")) {
                var error = $root.mproto.ChatMsg.verify(message.chatMsg);
                if (error)
                    return "chatMsg." + error;
            }
            return null;
        };

        /**
         * Creates a PushSendChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.PushSendChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.PushSendChatMsg} PushSendChatMsg
         */
        PushSendChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.PushSendChatMsg)
                return object;
            var message = new $root.mproto.PushSendChatMsg();
            if (object.chatMsg != null) {
                if (typeof object.chatMsg !== "object")
                    throw TypeError(".mproto.PushSendChatMsg.chatMsg: object expected");
                message.chatMsg = $root.mproto.ChatMsg.fromObject(object.chatMsg);
            }
            return message;
        };

        /**
         * Creates a plain object from a PushSendChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.PushSendChatMsg
         * @static
         * @param {mproto.PushSendChatMsg} message PushSendChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PushSendChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chatMsg = null;
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                object.chatMsg = $root.mproto.ChatMsg.toObject(message.chatMsg, options);
            return object;
        };

        /**
         * Converts this PushSendChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.PushSendChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PushSendChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PushSendChatMsg;
    })();

    mproto.RespReadChatMsg = (function() {

        /**
         * Properties of a RespReadChatMsg.
         * @memberof mproto
         * @interface IRespReadChatMsg
         * @property {mproto.IChatMsg|null} [chatMsg] RespReadChatMsg chatMsg
         */

        /**
         * Constructs a new RespReadChatMsg.
         * @memberof mproto
         * @classdesc Represents a RespReadChatMsg.
         * @implements IRespReadChatMsg
         * @constructor
         * @param {mproto.IRespReadChatMsg=} [properties] Properties to set
         */
        function RespReadChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespReadChatMsg chatMsg.
         * @member {mproto.IChatMsg|null|undefined} chatMsg
         * @memberof mproto.RespReadChatMsg
         * @instance
         */
        RespReadChatMsg.prototype.chatMsg = null;

        /**
         * Creates a new RespReadChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.RespReadChatMsg
         * @static
         * @param {mproto.IRespReadChatMsg=} [properties] Properties to set
         * @returns {mproto.RespReadChatMsg} RespReadChatMsg instance
         */
        RespReadChatMsg.create = function create(properties) {
            return new RespReadChatMsg(properties);
        };

        /**
         * Encodes the specified RespReadChatMsg message. Does not implicitly {@link mproto.RespReadChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespReadChatMsg
         * @static
         * @param {mproto.IRespReadChatMsg} message RespReadChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespReadChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                $root.mproto.ChatMsg.encode(message.chatMsg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespReadChatMsg message, length delimited. Does not implicitly {@link mproto.RespReadChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespReadChatMsg
         * @static
         * @param {mproto.IRespReadChatMsg} message RespReadChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespReadChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespReadChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespReadChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespReadChatMsg} RespReadChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespReadChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespReadChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chatMsg = $root.mproto.ChatMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespReadChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespReadChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespReadChatMsg} RespReadChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespReadChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespReadChatMsg message.
         * @function verify
         * @memberof mproto.RespReadChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespReadChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg")) {
                var error = $root.mproto.ChatMsg.verify(message.chatMsg);
                if (error)
                    return "chatMsg." + error;
            }
            return null;
        };

        /**
         * Creates a RespReadChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespReadChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespReadChatMsg} RespReadChatMsg
         */
        RespReadChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespReadChatMsg)
                return object;
            var message = new $root.mproto.RespReadChatMsg();
            if (object.chatMsg != null) {
                if (typeof object.chatMsg !== "object")
                    throw TypeError(".mproto.RespReadChatMsg.chatMsg: object expected");
                message.chatMsg = $root.mproto.ChatMsg.fromObject(object.chatMsg);
            }
            return message;
        };

        /**
         * Creates a plain object from a RespReadChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespReadChatMsg
         * @static
         * @param {mproto.RespReadChatMsg} message RespReadChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespReadChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chatMsg = null;
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                object.chatMsg = $root.mproto.ChatMsg.toObject(message.chatMsg, options);
            return object;
        };

        /**
         * Converts this RespReadChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.RespReadChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespReadChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespReadChatMsg;
    })();

    mproto.RespGetUnReadNum = (function() {

        /**
         * Properties of a RespGetUnReadNum.
         * @memberof mproto
         * @interface IRespGetUnReadNum
         * @property {string|null} [conversionId] RespGetUnReadNum conversionId
         * @property {string|null} [userId] RespGetUnReadNum userId
         * @property {string|null} [toUserId] RespGetUnReadNum toUserId
         * @property {number|Long|null} [unReadNum] RespGetUnReadNum unReadNum
         * @property {string|null} [replaceContent] RespGetUnReadNum replaceContent
         */

        /**
         * Constructs a new RespGetUnReadNum.
         * @memberof mproto
         * @classdesc Represents a RespGetUnReadNum.
         * @implements IRespGetUnReadNum
         * @constructor
         * @param {mproto.IRespGetUnReadNum=} [properties] Properties to set
         */
        function RespGetUnReadNum(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespGetUnReadNum conversionId.
         * @member {string} conversionId
         * @memberof mproto.RespGetUnReadNum
         * @instance
         */
        RespGetUnReadNum.prototype.conversionId = "";

        /**
         * RespGetUnReadNum userId.
         * @member {string} userId
         * @memberof mproto.RespGetUnReadNum
         * @instance
         */
        RespGetUnReadNum.prototype.userId = "";

        /**
         * RespGetUnReadNum toUserId.
         * @member {string} toUserId
         * @memberof mproto.RespGetUnReadNum
         * @instance
         */
        RespGetUnReadNum.prototype.toUserId = "";

        /**
         * RespGetUnReadNum unReadNum.
         * @member {number|Long} unReadNum
         * @memberof mproto.RespGetUnReadNum
         * @instance
         */
        RespGetUnReadNum.prototype.unReadNum = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RespGetUnReadNum replaceContent.
         * @member {string} replaceContent
         * @memberof mproto.RespGetUnReadNum
         * @instance
         */
        RespGetUnReadNum.prototype.replaceContent = "";

        /**
         * Creates a new RespGetUnReadNum instance using the specified properties.
         * @function create
         * @memberof mproto.RespGetUnReadNum
         * @static
         * @param {mproto.IRespGetUnReadNum=} [properties] Properties to set
         * @returns {mproto.RespGetUnReadNum} RespGetUnReadNum instance
         */
        RespGetUnReadNum.create = function create(properties) {
            return new RespGetUnReadNum(properties);
        };

        /**
         * Encodes the specified RespGetUnReadNum message. Does not implicitly {@link mproto.RespGetUnReadNum.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespGetUnReadNum
         * @static
         * @param {mproto.IRespGetUnReadNum} message RespGetUnReadNum message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespGetUnReadNum.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.conversionId);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.toUserId);
            if (message.unReadNum != null && message.hasOwnProperty("unReadNum"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.unReadNum);
            if (message.replaceContent != null && message.hasOwnProperty("replaceContent"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.replaceContent);
            return writer;
        };

        /**
         * Encodes the specified RespGetUnReadNum message, length delimited. Does not implicitly {@link mproto.RespGetUnReadNum.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespGetUnReadNum
         * @static
         * @param {mproto.IRespGetUnReadNum} message RespGetUnReadNum message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespGetUnReadNum.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespGetUnReadNum message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespGetUnReadNum
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespGetUnReadNum} RespGetUnReadNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespGetUnReadNum.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespGetUnReadNum();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.conversionId = reader.string();
                    break;
                case 2:
                    message.userId = reader.string();
                    break;
                case 3:
                    message.toUserId = reader.string();
                    break;
                case 4:
                    message.unReadNum = reader.int64();
                    break;
                case 5:
                    message.replaceContent = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespGetUnReadNum message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespGetUnReadNum
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespGetUnReadNum} RespGetUnReadNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespGetUnReadNum.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespGetUnReadNum message.
         * @function verify
         * @memberof mproto.RespGetUnReadNum
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespGetUnReadNum.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                if (!$util.isString(message.conversionId))
                    return "conversionId: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                if (!$util.isString(message.toUserId))
                    return "toUserId: string expected";
            if (message.unReadNum != null && message.hasOwnProperty("unReadNum"))
                if (!$util.isInteger(message.unReadNum) && !(message.unReadNum && $util.isInteger(message.unReadNum.low) && $util.isInteger(message.unReadNum.high)))
                    return "unReadNum: integer|Long expected";
            if (message.replaceContent != null && message.hasOwnProperty("replaceContent"))
                if (!$util.isString(message.replaceContent))
                    return "replaceContent: string expected";
            return null;
        };

        /**
         * Creates a RespGetUnReadNum message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespGetUnReadNum
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespGetUnReadNum} RespGetUnReadNum
         */
        RespGetUnReadNum.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespGetUnReadNum)
                return object;
            var message = new $root.mproto.RespGetUnReadNum();
            if (object.conversionId != null)
                message.conversionId = String(object.conversionId);
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.toUserId != null)
                message.toUserId = String(object.toUserId);
            if (object.unReadNum != null)
                if ($util.Long)
                    (message.unReadNum = $util.Long.fromValue(object.unReadNum)).unsigned = false;
                else if (typeof object.unReadNum === "string")
                    message.unReadNum = parseInt(object.unReadNum, 10);
                else if (typeof object.unReadNum === "number")
                    message.unReadNum = object.unReadNum;
                else if (typeof object.unReadNum === "object")
                    message.unReadNum = new $util.LongBits(object.unReadNum.low >>> 0, object.unReadNum.high >>> 0).toNumber();
            if (object.replaceContent != null)
                message.replaceContent = String(object.replaceContent);
            return message;
        };

        /**
         * Creates a plain object from a RespGetUnReadNum message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespGetUnReadNum
         * @static
         * @param {mproto.RespGetUnReadNum} message RespGetUnReadNum
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespGetUnReadNum.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.conversionId = "";
                object.userId = "";
                object.toUserId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.unReadNum = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.unReadNum = options.longs === String ? "0" : 0;
                object.replaceContent = "";
            }
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                object.conversionId = message.conversionId;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                object.toUserId = message.toUserId;
            if (message.unReadNum != null && message.hasOwnProperty("unReadNum"))
                if (typeof message.unReadNum === "number")
                    object.unReadNum = options.longs === String ? String(message.unReadNum) : message.unReadNum;
                else
                    object.unReadNum = options.longs === String ? $util.Long.prototype.toString.call(message.unReadNum) : options.longs === Number ? new $util.LongBits(message.unReadNum.low >>> 0, message.unReadNum.high >>> 0).toNumber() : message.unReadNum;
            if (message.replaceContent != null && message.hasOwnProperty("replaceContent"))
                object.replaceContent = message.replaceContent;
            return object;
        };

        /**
         * Converts this RespGetUnReadNum to JSON.
         * @function toJSON
         * @memberof mproto.RespGetUnReadNum
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespGetUnReadNum.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespGetUnReadNum;
    })();

    mproto.RespDeleteChatMsg = (function() {

        /**
         * Properties of a RespDeleteChatMsg.
         * @memberof mproto
         * @interface IRespDeleteChatMsg
         * @property {mproto.IChatMsg|null} [chatMsg] RespDeleteChatMsg chatMsg
         */

        /**
         * Constructs a new RespDeleteChatMsg.
         * @memberof mproto
         * @classdesc Represents a RespDeleteChatMsg.
         * @implements IRespDeleteChatMsg
         * @constructor
         * @param {mproto.IRespDeleteChatMsg=} [properties] Properties to set
         */
        function RespDeleteChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespDeleteChatMsg chatMsg.
         * @member {mproto.IChatMsg|null|undefined} chatMsg
         * @memberof mproto.RespDeleteChatMsg
         * @instance
         */
        RespDeleteChatMsg.prototype.chatMsg = null;

        /**
         * Creates a new RespDeleteChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.RespDeleteChatMsg
         * @static
         * @param {mproto.IRespDeleteChatMsg=} [properties] Properties to set
         * @returns {mproto.RespDeleteChatMsg} RespDeleteChatMsg instance
         */
        RespDeleteChatMsg.create = function create(properties) {
            return new RespDeleteChatMsg(properties);
        };

        /**
         * Encodes the specified RespDeleteChatMsg message. Does not implicitly {@link mproto.RespDeleteChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespDeleteChatMsg
         * @static
         * @param {mproto.IRespDeleteChatMsg} message RespDeleteChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespDeleteChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                $root.mproto.ChatMsg.encode(message.chatMsg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespDeleteChatMsg message, length delimited. Does not implicitly {@link mproto.RespDeleteChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespDeleteChatMsg
         * @static
         * @param {mproto.IRespDeleteChatMsg} message RespDeleteChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespDeleteChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespDeleteChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespDeleteChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespDeleteChatMsg} RespDeleteChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespDeleteChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespDeleteChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chatMsg = $root.mproto.ChatMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespDeleteChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespDeleteChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespDeleteChatMsg} RespDeleteChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespDeleteChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespDeleteChatMsg message.
         * @function verify
         * @memberof mproto.RespDeleteChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespDeleteChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg")) {
                var error = $root.mproto.ChatMsg.verify(message.chatMsg);
                if (error)
                    return "chatMsg." + error;
            }
            return null;
        };

        /**
         * Creates a RespDeleteChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespDeleteChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespDeleteChatMsg} RespDeleteChatMsg
         */
        RespDeleteChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespDeleteChatMsg)
                return object;
            var message = new $root.mproto.RespDeleteChatMsg();
            if (object.chatMsg != null) {
                if (typeof object.chatMsg !== "object")
                    throw TypeError(".mproto.RespDeleteChatMsg.chatMsg: object expected");
                message.chatMsg = $root.mproto.ChatMsg.fromObject(object.chatMsg);
            }
            return message;
        };

        /**
         * Creates a plain object from a RespDeleteChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespDeleteChatMsg
         * @static
         * @param {mproto.RespDeleteChatMsg} message RespDeleteChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespDeleteChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chatMsg = null;
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                object.chatMsg = $root.mproto.ChatMsg.toObject(message.chatMsg, options);
            return object;
        };

        /**
         * Converts this RespDeleteChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.RespDeleteChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespDeleteChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespDeleteChatMsg;
    })();

    mproto.RespDeleteConversion = (function() {

        /**
         * Properties of a RespDeleteConversion.
         * @memberof mproto
         * @interface IRespDeleteConversion
         * @property {mproto.IConversion|null} [conversion] RespDeleteConversion conversion
         */

        /**
         * Constructs a new RespDeleteConversion.
         * @memberof mproto
         * @classdesc Represents a RespDeleteConversion.
         * @implements IRespDeleteConversion
         * @constructor
         * @param {mproto.IRespDeleteConversion=} [properties] Properties to set
         */
        function RespDeleteConversion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespDeleteConversion conversion.
         * @member {mproto.IConversion|null|undefined} conversion
         * @memberof mproto.RespDeleteConversion
         * @instance
         */
        RespDeleteConversion.prototype.conversion = null;

        /**
         * Creates a new RespDeleteConversion instance using the specified properties.
         * @function create
         * @memberof mproto.RespDeleteConversion
         * @static
         * @param {mproto.IRespDeleteConversion=} [properties] Properties to set
         * @returns {mproto.RespDeleteConversion} RespDeleteConversion instance
         */
        RespDeleteConversion.create = function create(properties) {
            return new RespDeleteConversion(properties);
        };

        /**
         * Encodes the specified RespDeleteConversion message. Does not implicitly {@link mproto.RespDeleteConversion.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespDeleteConversion
         * @static
         * @param {mproto.IRespDeleteConversion} message RespDeleteConversion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespDeleteConversion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.conversion != null && message.hasOwnProperty("conversion"))
                $root.mproto.Conversion.encode(message.conversion, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespDeleteConversion message, length delimited. Does not implicitly {@link mproto.RespDeleteConversion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespDeleteConversion
         * @static
         * @param {mproto.IRespDeleteConversion} message RespDeleteConversion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespDeleteConversion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespDeleteConversion message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespDeleteConversion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespDeleteConversion} RespDeleteConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespDeleteConversion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespDeleteConversion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.conversion = $root.mproto.Conversion.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespDeleteConversion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespDeleteConversion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespDeleteConversion} RespDeleteConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespDeleteConversion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespDeleteConversion message.
         * @function verify
         * @memberof mproto.RespDeleteConversion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespDeleteConversion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.conversion != null && message.hasOwnProperty("conversion")) {
                var error = $root.mproto.Conversion.verify(message.conversion);
                if (error)
                    return "conversion." + error;
            }
            return null;
        };

        /**
         * Creates a RespDeleteConversion message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespDeleteConversion
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespDeleteConversion} RespDeleteConversion
         */
        RespDeleteConversion.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespDeleteConversion)
                return object;
            var message = new $root.mproto.RespDeleteConversion();
            if (object.conversion != null) {
                if (typeof object.conversion !== "object")
                    throw TypeError(".mproto.RespDeleteConversion.conversion: object expected");
                message.conversion = $root.mproto.Conversion.fromObject(object.conversion);
            }
            return message;
        };

        /**
         * Creates a plain object from a RespDeleteConversion message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespDeleteConversion
         * @static
         * @param {mproto.RespDeleteConversion} message RespDeleteConversion
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespDeleteConversion.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.conversion = null;
            if (message.conversion != null && message.hasOwnProperty("conversion"))
                object.conversion = $root.mproto.Conversion.toObject(message.conversion, options);
            return object;
        };

        /**
         * Converts this RespDeleteConversion to JSON.
         * @function toJSON
         * @memberof mproto.RespDeleteConversion
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespDeleteConversion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespDeleteConversion;
    })();

    mproto.RespEditChatMsg = (function() {

        /**
         * Properties of a RespEditChatMsg.
         * @memberof mproto
         * @interface IRespEditChatMsg
         * @property {mproto.IChatMsg|null} [chatMsg] RespEditChatMsg chatMsg
         */

        /**
         * Constructs a new RespEditChatMsg.
         * @memberof mproto
         * @classdesc Represents a RespEditChatMsg.
         * @implements IRespEditChatMsg
         * @constructor
         * @param {mproto.IRespEditChatMsg=} [properties] Properties to set
         */
        function RespEditChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespEditChatMsg chatMsg.
         * @member {mproto.IChatMsg|null|undefined} chatMsg
         * @memberof mproto.RespEditChatMsg
         * @instance
         */
        RespEditChatMsg.prototype.chatMsg = null;

        /**
         * Creates a new RespEditChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.RespEditChatMsg
         * @static
         * @param {mproto.IRespEditChatMsg=} [properties] Properties to set
         * @returns {mproto.RespEditChatMsg} RespEditChatMsg instance
         */
        RespEditChatMsg.create = function create(properties) {
            return new RespEditChatMsg(properties);
        };

        /**
         * Encodes the specified RespEditChatMsg message. Does not implicitly {@link mproto.RespEditChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespEditChatMsg
         * @static
         * @param {mproto.IRespEditChatMsg} message RespEditChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespEditChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                $root.mproto.ChatMsg.encode(message.chatMsg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespEditChatMsg message, length delimited. Does not implicitly {@link mproto.RespEditChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespEditChatMsg
         * @static
         * @param {mproto.IRespEditChatMsg} message RespEditChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespEditChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespEditChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespEditChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespEditChatMsg} RespEditChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespEditChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespEditChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chatMsg = $root.mproto.ChatMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespEditChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespEditChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespEditChatMsg} RespEditChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespEditChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespEditChatMsg message.
         * @function verify
         * @memberof mproto.RespEditChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespEditChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg")) {
                var error = $root.mproto.ChatMsg.verify(message.chatMsg);
                if (error)
                    return "chatMsg." + error;
            }
            return null;
        };

        /**
         * Creates a RespEditChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespEditChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespEditChatMsg} RespEditChatMsg
         */
        RespEditChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespEditChatMsg)
                return object;
            var message = new $root.mproto.RespEditChatMsg();
            if (object.chatMsg != null) {
                if (typeof object.chatMsg !== "object")
                    throw TypeError(".mproto.RespEditChatMsg.chatMsg: object expected");
                message.chatMsg = $root.mproto.ChatMsg.fromObject(object.chatMsg);
            }
            return message;
        };

        /**
         * Creates a plain object from a RespEditChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespEditChatMsg
         * @static
         * @param {mproto.RespEditChatMsg} message RespEditChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespEditChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chatMsg = null;
            if (message.chatMsg != null && message.hasOwnProperty("chatMsg"))
                object.chatMsg = $root.mproto.ChatMsg.toObject(message.chatMsg, options);
            return object;
        };

        /**
         * Converts this RespEditChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.RespEditChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespEditChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespEditChatMsg;
    })();

    mproto.RespSearchUser = (function() {

        /**
         * Properties of a RespSearchUser.
         * @memberof mproto
         * @interface IRespSearchUser
         * @property {mproto.IUserInfo|null} [userInfo] RespSearchUser userInfo
         */

        /**
         * Constructs a new RespSearchUser.
         * @memberof mproto
         * @classdesc Represents a RespSearchUser.
         * @implements IRespSearchUser
         * @constructor
         * @param {mproto.IRespSearchUser=} [properties] Properties to set
         */
        function RespSearchUser(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespSearchUser userInfo.
         * @member {mproto.IUserInfo|null|undefined} userInfo
         * @memberof mproto.RespSearchUser
         * @instance
         */
        RespSearchUser.prototype.userInfo = null;

        /**
         * Creates a new RespSearchUser instance using the specified properties.
         * @function create
         * @memberof mproto.RespSearchUser
         * @static
         * @param {mproto.IRespSearchUser=} [properties] Properties to set
         * @returns {mproto.RespSearchUser} RespSearchUser instance
         */
        RespSearchUser.create = function create(properties) {
            return new RespSearchUser(properties);
        };

        /**
         * Encodes the specified RespSearchUser message. Does not implicitly {@link mproto.RespSearchUser.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespSearchUser
         * @static
         * @param {mproto.IRespSearchUser} message RespSearchUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespSearchUser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                $root.mproto.UserInfo.encode(message.userInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespSearchUser message, length delimited. Does not implicitly {@link mproto.RespSearchUser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespSearchUser
         * @static
         * @param {mproto.IRespSearchUser} message RespSearchUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespSearchUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespSearchUser message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespSearchUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespSearchUser} RespSearchUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespSearchUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespSearchUser();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userInfo = $root.mproto.UserInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespSearchUser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespSearchUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespSearchUser} RespSearchUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespSearchUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespSearchUser message.
         * @function verify
         * @memberof mproto.RespSearchUser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespSearchUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userInfo != null && message.hasOwnProperty("userInfo")) {
                var error = $root.mproto.UserInfo.verify(message.userInfo);
                if (error)
                    return "userInfo." + error;
            }
            return null;
        };

        /**
         * Creates a RespSearchUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespSearchUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespSearchUser} RespSearchUser
         */
        RespSearchUser.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespSearchUser)
                return object;
            var message = new $root.mproto.RespSearchUser();
            if (object.userInfo != null) {
                if (typeof object.userInfo !== "object")
                    throw TypeError(".mproto.RespSearchUser.userInfo: object expected");
                message.userInfo = $root.mproto.UserInfo.fromObject(object.userInfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a RespSearchUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespSearchUser
         * @static
         * @param {mproto.RespSearchUser} message RespSearchUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespSearchUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.userInfo = null;
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                object.userInfo = $root.mproto.UserInfo.toObject(message.userInfo, options);
            return object;
        };

        /**
         * Converts this RespSearchUser to JSON.
         * @function toJSON
         * @memberof mproto.RespSearchUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespSearchUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespSearchUser;
    })();

    mproto.RespSearchSubUser = (function() {

        /**
         * Properties of a RespSearchSubUser.
         * @memberof mproto
         * @interface IRespSearchSubUser
         * @property {mproto.IUserInfo|null} [userInfo] RespSearchSubUser userInfo
         */

        /**
         * Constructs a new RespSearchSubUser.
         * @memberof mproto
         * @classdesc Represents a RespSearchSubUser.
         * @implements IRespSearchSubUser
         * @constructor
         * @param {mproto.IRespSearchSubUser=} [properties] Properties to set
         */
        function RespSearchSubUser(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespSearchSubUser userInfo.
         * @member {mproto.IUserInfo|null|undefined} userInfo
         * @memberof mproto.RespSearchSubUser
         * @instance
         */
        RespSearchSubUser.prototype.userInfo = null;

        /**
         * Creates a new RespSearchSubUser instance using the specified properties.
         * @function create
         * @memberof mproto.RespSearchSubUser
         * @static
         * @param {mproto.IRespSearchSubUser=} [properties] Properties to set
         * @returns {mproto.RespSearchSubUser} RespSearchSubUser instance
         */
        RespSearchSubUser.create = function create(properties) {
            return new RespSearchSubUser(properties);
        };

        /**
         * Encodes the specified RespSearchSubUser message. Does not implicitly {@link mproto.RespSearchSubUser.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespSearchSubUser
         * @static
         * @param {mproto.IRespSearchSubUser} message RespSearchSubUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespSearchSubUser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                $root.mproto.UserInfo.encode(message.userInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespSearchSubUser message, length delimited. Does not implicitly {@link mproto.RespSearchSubUser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespSearchSubUser
         * @static
         * @param {mproto.IRespSearchSubUser} message RespSearchSubUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespSearchSubUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespSearchSubUser message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespSearchSubUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespSearchSubUser} RespSearchSubUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespSearchSubUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespSearchSubUser();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userInfo = $root.mproto.UserInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespSearchSubUser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespSearchSubUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespSearchSubUser} RespSearchSubUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespSearchSubUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespSearchSubUser message.
         * @function verify
         * @memberof mproto.RespSearchSubUser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespSearchSubUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userInfo != null && message.hasOwnProperty("userInfo")) {
                var error = $root.mproto.UserInfo.verify(message.userInfo);
                if (error)
                    return "userInfo." + error;
            }
            return null;
        };

        /**
         * Creates a RespSearchSubUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespSearchSubUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespSearchSubUser} RespSearchSubUser
         */
        RespSearchSubUser.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespSearchSubUser)
                return object;
            var message = new $root.mproto.RespSearchSubUser();
            if (object.userInfo != null) {
                if (typeof object.userInfo !== "object")
                    throw TypeError(".mproto.RespSearchSubUser.userInfo: object expected");
                message.userInfo = $root.mproto.UserInfo.fromObject(object.userInfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a RespSearchSubUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespSearchSubUser
         * @static
         * @param {mproto.RespSearchSubUser} message RespSearchSubUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespSearchSubUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.userInfo = null;
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                object.userInfo = $root.mproto.UserInfo.toObject(message.userInfo, options);
            return object;
        };

        /**
         * Converts this RespSearchSubUser to JSON.
         * @function toJSON
         * @memberof mproto.RespSearchSubUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespSearchSubUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespSearchSubUser;
    })();

    mproto.RespGetSubUserList = (function() {

        /**
         * Properties of a RespGetSubUserList.
         * @memberof mproto
         * @interface IRespGetSubUserList
         * @property {Array.<mproto.IUserInfo>|null} [userInfo] RespGetSubUserList userInfo
         */

        /**
         * Constructs a new RespGetSubUserList.
         * @memberof mproto
         * @classdesc Represents a RespGetSubUserList.
         * @implements IRespGetSubUserList
         * @constructor
         * @param {mproto.IRespGetSubUserList=} [properties] Properties to set
         */
        function RespGetSubUserList(properties) {
            this.userInfo = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespGetSubUserList userInfo.
         * @member {Array.<mproto.IUserInfo>} userInfo
         * @memberof mproto.RespGetSubUserList
         * @instance
         */
        RespGetSubUserList.prototype.userInfo = $util.emptyArray;

        /**
         * Creates a new RespGetSubUserList instance using the specified properties.
         * @function create
         * @memberof mproto.RespGetSubUserList
         * @static
         * @param {mproto.IRespGetSubUserList=} [properties] Properties to set
         * @returns {mproto.RespGetSubUserList} RespGetSubUserList instance
         */
        RespGetSubUserList.create = function create(properties) {
            return new RespGetSubUserList(properties);
        };

        /**
         * Encodes the specified RespGetSubUserList message. Does not implicitly {@link mproto.RespGetSubUserList.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespGetSubUserList
         * @static
         * @param {mproto.IRespGetSubUserList} message RespGetSubUserList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespGetSubUserList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userInfo != null && message.userInfo.length)
                for (var i = 0; i < message.userInfo.length; ++i)
                    $root.mproto.UserInfo.encode(message.userInfo[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RespGetSubUserList message, length delimited. Does not implicitly {@link mproto.RespGetSubUserList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespGetSubUserList
         * @static
         * @param {mproto.IRespGetSubUserList} message RespGetSubUserList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespGetSubUserList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespGetSubUserList message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespGetSubUserList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespGetSubUserList} RespGetSubUserList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespGetSubUserList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespGetSubUserList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.userInfo && message.userInfo.length))
                        message.userInfo = [];
                    message.userInfo.push($root.mproto.UserInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespGetSubUserList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespGetSubUserList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespGetSubUserList} RespGetSubUserList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespGetSubUserList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespGetSubUserList message.
         * @function verify
         * @memberof mproto.RespGetSubUserList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespGetSubUserList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userInfo != null && message.hasOwnProperty("userInfo")) {
                if (!Array.isArray(message.userInfo))
                    return "userInfo: array expected";
                for (var i = 0; i < message.userInfo.length; ++i) {
                    var error = $root.mproto.UserInfo.verify(message.userInfo[i]);
                    if (error)
                        return "userInfo." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RespGetSubUserList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespGetSubUserList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespGetSubUserList} RespGetSubUserList
         */
        RespGetSubUserList.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespGetSubUserList)
                return object;
            var message = new $root.mproto.RespGetSubUserList();
            if (object.userInfo) {
                if (!Array.isArray(object.userInfo))
                    throw TypeError(".mproto.RespGetSubUserList.userInfo: array expected");
                message.userInfo = [];
                for (var i = 0; i < object.userInfo.length; ++i) {
                    if (typeof object.userInfo[i] !== "object")
                        throw TypeError(".mproto.RespGetSubUserList.userInfo: object expected");
                    message.userInfo[i] = $root.mproto.UserInfo.fromObject(object.userInfo[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RespGetSubUserList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespGetSubUserList
         * @static
         * @param {mproto.RespGetSubUserList} message RespGetSubUserList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespGetSubUserList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.userInfo = [];
            if (message.userInfo && message.userInfo.length) {
                object.userInfo = [];
                for (var j = 0; j < message.userInfo.length; ++j)
                    object.userInfo[j] = $root.mproto.UserInfo.toObject(message.userInfo[j], options);
            }
            return object;
        };

        /**
         * Converts this RespGetSubUserList to JSON.
         * @function toJSON
         * @memberof mproto.RespGetSubUserList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespGetSubUserList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespGetSubUserList;
    })();

    mproto.RespGetQuickReplyList = (function() {

        /**
         * Properties of a RespGetQuickReplyList.
         * @memberof mproto
         * @interface IRespGetQuickReplyList
         * @property {Array.<string>|null} [content] RespGetQuickReplyList content
         */

        /**
         * Constructs a new RespGetQuickReplyList.
         * @memberof mproto
         * @classdesc Represents a RespGetQuickReplyList.
         * @implements IRespGetQuickReplyList
         * @constructor
         * @param {mproto.IRespGetQuickReplyList=} [properties] Properties to set
         */
        function RespGetQuickReplyList(properties) {
            this.content = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RespGetQuickReplyList content.
         * @member {Array.<string>} content
         * @memberof mproto.RespGetQuickReplyList
         * @instance
         */
        RespGetQuickReplyList.prototype.content = $util.emptyArray;

        /**
         * Creates a new RespGetQuickReplyList instance using the specified properties.
         * @function create
         * @memberof mproto.RespGetQuickReplyList
         * @static
         * @param {mproto.IRespGetQuickReplyList=} [properties] Properties to set
         * @returns {mproto.RespGetQuickReplyList} RespGetQuickReplyList instance
         */
        RespGetQuickReplyList.create = function create(properties) {
            return new RespGetQuickReplyList(properties);
        };

        /**
         * Encodes the specified RespGetQuickReplyList message. Does not implicitly {@link mproto.RespGetQuickReplyList.verify|verify} messages.
         * @function encode
         * @memberof mproto.RespGetQuickReplyList
         * @static
         * @param {mproto.IRespGetQuickReplyList} message RespGetQuickReplyList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespGetQuickReplyList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.content != null && message.content.length)
                for (var i = 0; i < message.content.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.content[i]);
            return writer;
        };

        /**
         * Encodes the specified RespGetQuickReplyList message, length delimited. Does not implicitly {@link mproto.RespGetQuickReplyList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.RespGetQuickReplyList
         * @static
         * @param {mproto.IRespGetQuickReplyList} message RespGetQuickReplyList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RespGetQuickReplyList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RespGetQuickReplyList message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.RespGetQuickReplyList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.RespGetQuickReplyList} RespGetQuickReplyList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespGetQuickReplyList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.RespGetQuickReplyList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.content && message.content.length))
                        message.content = [];
                    message.content.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RespGetQuickReplyList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.RespGetQuickReplyList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.RespGetQuickReplyList} RespGetQuickReplyList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RespGetQuickReplyList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RespGetQuickReplyList message.
         * @function verify
         * @memberof mproto.RespGetQuickReplyList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RespGetQuickReplyList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.content != null && message.hasOwnProperty("content")) {
                if (!Array.isArray(message.content))
                    return "content: array expected";
                for (var i = 0; i < message.content.length; ++i)
                    if (!$util.isString(message.content[i]))
                        return "content: string[] expected";
            }
            return null;
        };

        /**
         * Creates a RespGetQuickReplyList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.RespGetQuickReplyList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.RespGetQuickReplyList} RespGetQuickReplyList
         */
        RespGetQuickReplyList.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.RespGetQuickReplyList)
                return object;
            var message = new $root.mproto.RespGetQuickReplyList();
            if (object.content) {
                if (!Array.isArray(object.content))
                    throw TypeError(".mproto.RespGetQuickReplyList.content: array expected");
                message.content = [];
                for (var i = 0; i < object.content.length; ++i)
                    message.content[i] = String(object.content[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a RespGetQuickReplyList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.RespGetQuickReplyList
         * @static
         * @param {mproto.RespGetQuickReplyList} message RespGetQuickReplyList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RespGetQuickReplyList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.content = [];
            if (message.content && message.content.length) {
                object.content = [];
                for (var j = 0; j < message.content.length; ++j)
                    object.content[j] = message.content[j];
            }
            return object;
        };

        /**
         * Converts this RespGetQuickReplyList to JSON.
         * @function toJSON
         * @memberof mproto.RespGetQuickReplyList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RespGetQuickReplyList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RespGetQuickReplyList;
    })();

    mproto.PushAutoEnterConversion = (function() {

        /**
         * Properties of a PushAutoEnterConversion.
         * @memberof mproto
         * @interface IPushAutoEnterConversion
         * @property {boolean|null} [isExist] PushAutoEnterConversion isExist
         * @property {mproto.IConversion|null} [conversion] PushAutoEnterConversion conversion
         */

        /**
         * Constructs a new PushAutoEnterConversion.
         * @memberof mproto
         * @classdesc Represents a PushAutoEnterConversion.
         * @implements IPushAutoEnterConversion
         * @constructor
         * @param {mproto.IPushAutoEnterConversion=} [properties] Properties to set
         */
        function PushAutoEnterConversion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PushAutoEnterConversion isExist.
         * @member {boolean} isExist
         * @memberof mproto.PushAutoEnterConversion
         * @instance
         */
        PushAutoEnterConversion.prototype.isExist = false;

        /**
         * PushAutoEnterConversion conversion.
         * @member {mproto.IConversion|null|undefined} conversion
         * @memberof mproto.PushAutoEnterConversion
         * @instance
         */
        PushAutoEnterConversion.prototype.conversion = null;

        /**
         * Creates a new PushAutoEnterConversion instance using the specified properties.
         * @function create
         * @memberof mproto.PushAutoEnterConversion
         * @static
         * @param {mproto.IPushAutoEnterConversion=} [properties] Properties to set
         * @returns {mproto.PushAutoEnterConversion} PushAutoEnterConversion instance
         */
        PushAutoEnterConversion.create = function create(properties) {
            return new PushAutoEnterConversion(properties);
        };

        /**
         * Encodes the specified PushAutoEnterConversion message. Does not implicitly {@link mproto.PushAutoEnterConversion.verify|verify} messages.
         * @function encode
         * @memberof mproto.PushAutoEnterConversion
         * @static
         * @param {mproto.IPushAutoEnterConversion} message PushAutoEnterConversion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushAutoEnterConversion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isExist != null && message.hasOwnProperty("isExist"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isExist);
            if (message.conversion != null && message.hasOwnProperty("conversion"))
                $root.mproto.Conversion.encode(message.conversion, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PushAutoEnterConversion message, length delimited. Does not implicitly {@link mproto.PushAutoEnterConversion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.PushAutoEnterConversion
         * @static
         * @param {mproto.IPushAutoEnterConversion} message PushAutoEnterConversion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushAutoEnterConversion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PushAutoEnterConversion message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.PushAutoEnterConversion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.PushAutoEnterConversion} PushAutoEnterConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushAutoEnterConversion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.PushAutoEnterConversion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.isExist = reader.bool();
                    break;
                case 2:
                    message.conversion = $root.mproto.Conversion.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PushAutoEnterConversion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.PushAutoEnterConversion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.PushAutoEnterConversion} PushAutoEnterConversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushAutoEnterConversion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PushAutoEnterConversion message.
         * @function verify
         * @memberof mproto.PushAutoEnterConversion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PushAutoEnterConversion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isExist != null && message.hasOwnProperty("isExist"))
                if (typeof message.isExist !== "boolean")
                    return "isExist: boolean expected";
            if (message.conversion != null && message.hasOwnProperty("conversion")) {
                var error = $root.mproto.Conversion.verify(message.conversion);
                if (error)
                    return "conversion." + error;
            }
            return null;
        };

        /**
         * Creates a PushAutoEnterConversion message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.PushAutoEnterConversion
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.PushAutoEnterConversion} PushAutoEnterConversion
         */
        PushAutoEnterConversion.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.PushAutoEnterConversion)
                return object;
            var message = new $root.mproto.PushAutoEnterConversion();
            if (object.isExist != null)
                message.isExist = Boolean(object.isExist);
            if (object.conversion != null) {
                if (typeof object.conversion !== "object")
                    throw TypeError(".mproto.PushAutoEnterConversion.conversion: object expected");
                message.conversion = $root.mproto.Conversion.fromObject(object.conversion);
            }
            return message;
        };

        /**
         * Creates a plain object from a PushAutoEnterConversion message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.PushAutoEnterConversion
         * @static
         * @param {mproto.PushAutoEnterConversion} message PushAutoEnterConversion
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PushAutoEnterConversion.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.isExist = false;
                object.conversion = null;
            }
            if (message.isExist != null && message.hasOwnProperty("isExist"))
                object.isExist = message.isExist;
            if (message.conversion != null && message.hasOwnProperty("conversion"))
                object.conversion = $root.mproto.Conversion.toObject(message.conversion, options);
            return object;
        };

        /**
         * Converts this PushAutoEnterConversion to JSON.
         * @function toJSON
         * @memberof mproto.PushAutoEnterConversion
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PushAutoEnterConversion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PushAutoEnterConversion;
    })();

    mproto.CloseConn = (function() {

        /**
         * Properties of a CloseConn.
         * @memberof mproto
         * @interface ICloseConn
         * @property {number|null} [code] CloseConn code
         * @property {string|null} [msg] CloseConn msg
         * @property {number|null} [languageCode] CloseConn languageCode
         */

        /**
         * Constructs a new CloseConn.
         * @memberof mproto
         * @classdesc Represents a CloseConn.
         * @implements ICloseConn
         * @constructor
         * @param {mproto.ICloseConn=} [properties] Properties to set
         */
        function CloseConn(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CloseConn code.
         * @member {number} code
         * @memberof mproto.CloseConn
         * @instance
         */
        CloseConn.prototype.code = 0;

        /**
         * CloseConn msg.
         * @member {string} msg
         * @memberof mproto.CloseConn
         * @instance
         */
        CloseConn.prototype.msg = "";

        /**
         * CloseConn languageCode.
         * @member {number} languageCode
         * @memberof mproto.CloseConn
         * @instance
         */
        CloseConn.prototype.languageCode = 0;

        /**
         * Creates a new CloseConn instance using the specified properties.
         * @function create
         * @memberof mproto.CloseConn
         * @static
         * @param {mproto.ICloseConn=} [properties] Properties to set
         * @returns {mproto.CloseConn} CloseConn instance
         */
        CloseConn.create = function create(properties) {
            return new CloseConn(properties);
        };

        /**
         * Encodes the specified CloseConn message. Does not implicitly {@link mproto.CloseConn.verify|verify} messages.
         * @function encode
         * @memberof mproto.CloseConn
         * @static
         * @param {mproto.ICloseConn} message CloseConn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CloseConn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            if (message.languageCode != null && message.hasOwnProperty("languageCode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.languageCode);
            return writer;
        };

        /**
         * Encodes the specified CloseConn message, length delimited. Does not implicitly {@link mproto.CloseConn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.CloseConn
         * @static
         * @param {mproto.ICloseConn} message CloseConn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CloseConn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CloseConn message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.CloseConn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.CloseConn} CloseConn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CloseConn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.CloseConn();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                case 3:
                    message.languageCode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CloseConn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.CloseConn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.CloseConn} CloseConn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CloseConn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CloseConn message.
         * @function verify
         * @memberof mproto.CloseConn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CloseConn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.languageCode != null && message.hasOwnProperty("languageCode"))
                if (!$util.isInteger(message.languageCode))
                    return "languageCode: integer expected";
            return null;
        };

        /**
         * Creates a CloseConn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.CloseConn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.CloseConn} CloseConn
         */
        CloseConn.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.CloseConn)
                return object;
            var message = new $root.mproto.CloseConn();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            if (object.languageCode != null)
                message.languageCode = object.languageCode | 0;
            return message;
        };

        /**
         * Creates a plain object from a CloseConn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.CloseConn
         * @static
         * @param {mproto.CloseConn} message CloseConn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CloseConn.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
                object.languageCode = 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.languageCode != null && message.hasOwnProperty("languageCode"))
                object.languageCode = message.languageCode;
            return object;
        };

        /**
         * Converts this CloseConn to JSON.
         * @function toJSON
         * @memberof mproto.CloseConn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CloseConn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CloseConn;
    })();

    mproto.ErrMsg = (function() {

        /**
         * Properties of an ErrMsg.
         * @memberof mproto
         * @interface IErrMsg
         * @property {number|null} [msgId] ErrMsg msgId
         * @property {string|null} [msg] ErrMsg msg
         * @property {number|null} [languageCode] ErrMsg languageCode
         */

        /**
         * Constructs a new ErrMsg.
         * @memberof mproto
         * @classdesc Represents an ErrMsg.
         * @implements IErrMsg
         * @constructor
         * @param {mproto.IErrMsg=} [properties] Properties to set
         */
        function ErrMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrMsg msgId.
         * @member {number} msgId
         * @memberof mproto.ErrMsg
         * @instance
         */
        ErrMsg.prototype.msgId = 0;

        /**
         * ErrMsg msg.
         * @member {string} msg
         * @memberof mproto.ErrMsg
         * @instance
         */
        ErrMsg.prototype.msg = "";

        /**
         * ErrMsg languageCode.
         * @member {number} languageCode
         * @memberof mproto.ErrMsg
         * @instance
         */
        ErrMsg.prototype.languageCode = 0;

        /**
         * Creates a new ErrMsg instance using the specified properties.
         * @function create
         * @memberof mproto.ErrMsg
         * @static
         * @param {mproto.IErrMsg=} [properties] Properties to set
         * @returns {mproto.ErrMsg} ErrMsg instance
         */
        ErrMsg.create = function create(properties) {
            return new ErrMsg(properties);
        };

        /**
         * Encodes the specified ErrMsg message. Does not implicitly {@link mproto.ErrMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.ErrMsg
         * @static
         * @param {mproto.IErrMsg} message ErrMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.msgId);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            if (message.languageCode != null && message.hasOwnProperty("languageCode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.languageCode);
            return writer;
        };

        /**
         * Encodes the specified ErrMsg message, length delimited. Does not implicitly {@link mproto.ErrMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ErrMsg
         * @static
         * @param {mproto.IErrMsg} message ErrMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ErrMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ErrMsg} ErrMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ErrMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msgId = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                case 3:
                    message.languageCode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ErrMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ErrMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ErrMsg} ErrMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrMsg message.
         * @function verify
         * @memberof mproto.ErrMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                if (!$util.isInteger(message.msgId))
                    return "msgId: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.languageCode != null && message.hasOwnProperty("languageCode"))
                if (!$util.isInteger(message.languageCode))
                    return "languageCode: integer expected";
            return null;
        };

        /**
         * Creates an ErrMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ErrMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ErrMsg} ErrMsg
         */
        ErrMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ErrMsg)
                return object;
            var message = new $root.mproto.ErrMsg();
            if (object.msgId != null)
                message.msgId = object.msgId | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            if (object.languageCode != null)
                message.languageCode = object.languageCode | 0;
            return message;
        };

        /**
         * Creates a plain object from an ErrMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ErrMsg
         * @static
         * @param {mproto.ErrMsg} message ErrMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.msgId = 0;
                object.msg = "";
                object.languageCode = 0;
            }
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                object.msgId = message.msgId;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.languageCode != null && message.hasOwnProperty("languageCode"))
                object.languageCode = message.languageCode;
            return object;
        };

        /**
         * Converts this ErrMsg to JSON.
         * @function toJSON
         * @memberof mproto.ErrMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ErrMsg;
    })();

    mproto.UserInfo = (function() {

        /**
         * Properties of a UserInfo.
         * @memberof mproto
         * @interface IUserInfo
         * @property {string|null} [userId] UserInfo userId
         * @property {string|null} [userNick] UserInfo userNick
         * @property {string|null} [userHeadImg] UserInfo userHeadImg
         * @property {number|null} [userType] UserInfo userType
         */

        /**
         * Constructs a new UserInfo.
         * @memberof mproto
         * @classdesc Represents a UserInfo.
         * @implements IUserInfo
         * @constructor
         * @param {mproto.IUserInfo=} [properties] Properties to set
         */
        function UserInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserInfo userId.
         * @member {string} userId
         * @memberof mproto.UserInfo
         * @instance
         */
        UserInfo.prototype.userId = "";

        /**
         * UserInfo userNick.
         * @member {string} userNick
         * @memberof mproto.UserInfo
         * @instance
         */
        UserInfo.prototype.userNick = "";

        /**
         * UserInfo userHeadImg.
         * @member {string} userHeadImg
         * @memberof mproto.UserInfo
         * @instance
         */
        UserInfo.prototype.userHeadImg = "";

        /**
         * UserInfo userType.
         * @member {number} userType
         * @memberof mproto.UserInfo
         * @instance
         */
        UserInfo.prototype.userType = 0;

        /**
         * Creates a new UserInfo instance using the specified properties.
         * @function create
         * @memberof mproto.UserInfo
         * @static
         * @param {mproto.IUserInfo=} [properties] Properties to set
         * @returns {mproto.UserInfo} UserInfo instance
         */
        UserInfo.create = function create(properties) {
            return new UserInfo(properties);
        };

        /**
         * Encodes the specified UserInfo message. Does not implicitly {@link mproto.UserInfo.verify|verify} messages.
         * @function encode
         * @memberof mproto.UserInfo
         * @static
         * @param {mproto.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.userNick != null && message.hasOwnProperty("userNick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userNick);
            if (message.userHeadImg != null && message.hasOwnProperty("userHeadImg"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.userHeadImg);
            if (message.userType != null && message.hasOwnProperty("userType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.userType);
            return writer;
        };

        /**
         * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link mproto.UserInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.UserInfo
         * @static
         * @param {mproto.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserInfo message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.UserInfo} UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.UserInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.userNick = reader.string();
                    break;
                case 3:
                    message.userHeadImg = reader.string();
                    break;
                case 4:
                    message.userType = reader.int32();
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
         * @memberof mproto.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.UserInfo} UserInfo
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
         * @memberof mproto.UserInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.userNick != null && message.hasOwnProperty("userNick"))
                if (!$util.isString(message.userNick))
                    return "userNick: string expected";
            if (message.userHeadImg != null && message.hasOwnProperty("userHeadImg"))
                if (!$util.isString(message.userHeadImg))
                    return "userHeadImg: string expected";
            if (message.userType != null && message.hasOwnProperty("userType"))
                if (!$util.isInteger(message.userType))
                    return "userType: integer expected";
            return null;
        };

        /**
         * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.UserInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.UserInfo} UserInfo
         */
        UserInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.UserInfo)
                return object;
            var message = new $root.mproto.UserInfo();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.userNick != null)
                message.userNick = String(object.userNick);
            if (object.userHeadImg != null)
                message.userHeadImg = String(object.userHeadImg);
            if (object.userType != null)
                message.userType = object.userType | 0;
            return message;
        };

        /**
         * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.UserInfo
         * @static
         * @param {mproto.UserInfo} message UserInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.userNick = "";
                object.userHeadImg = "";
                object.userType = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.userNick != null && message.hasOwnProperty("userNick"))
                object.userNick = message.userNick;
            if (message.userHeadImg != null && message.hasOwnProperty("userHeadImg"))
                object.userHeadImg = message.userHeadImg;
            if (message.userType != null && message.hasOwnProperty("userType"))
                object.userType = message.userType;
            return object;
        };

        /**
         * Converts this UserInfo to JSON.
         * @function toJSON
         * @memberof mproto.UserInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserInfo;
    })();

    mproto.Conversion = (function() {

        /**
         * Properties of a Conversion.
         * @memberof mproto
         * @interface IConversion
         * @property {string|null} [userId] Conversion userId
         * @property {string|null} [userNick] Conversion userNick
         * @property {string|null} [headImg] Conversion headImg
         * @property {number|null} [userType] Conversion userType
         * @property {string|null} [toUserId] Conversion toUserId
         * @property {string|null} [toUserNick] Conversion toUserNick
         * @property {string|null} [toUserHeadImg] Conversion toUserHeadImg
         * @property {number|null} [toUserType] Conversion toUserType
         * @property {number|null} [lastMsgType] Conversion lastMsgType
         * @property {number|null} [lastMsgKind] Conversion lastMsgKind
         * @property {string|null} [replaceContent] Conversion replaceContent
         * @property {number|null} [unReadNum] Conversion unReadNum
         * @property {string|null} [conversionId] Conversion conversionId
         * @property {number|Long|null} [createTime] Conversion createTime
         * @property {number|Long|null} [uptTime] Conversion uptTime
         */

        /**
         * Constructs a new Conversion.
         * @memberof mproto
         * @classdesc Represents a Conversion.
         * @implements IConversion
         * @constructor
         * @param {mproto.IConversion=} [properties] Properties to set
         */
        function Conversion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Conversion userId.
         * @member {string} userId
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.userId = "";

        /**
         * Conversion userNick.
         * @member {string} userNick
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.userNick = "";

        /**
         * Conversion headImg.
         * @member {string} headImg
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.headImg = "";

        /**
         * Conversion userType.
         * @member {number} userType
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.userType = 0;

        /**
         * Conversion toUserId.
         * @member {string} toUserId
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.toUserId = "";

        /**
         * Conversion toUserNick.
         * @member {string} toUserNick
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.toUserNick = "";

        /**
         * Conversion toUserHeadImg.
         * @member {string} toUserHeadImg
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.toUserHeadImg = "";

        /**
         * Conversion toUserType.
         * @member {number} toUserType
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.toUserType = 0;

        /**
         * Conversion lastMsgType.
         * @member {number} lastMsgType
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.lastMsgType = 0;

        /**
         * Conversion lastMsgKind.
         * @member {number} lastMsgKind
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.lastMsgKind = 0;

        /**
         * Conversion replaceContent.
         * @member {string} replaceContent
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.replaceContent = "";

        /**
         * Conversion unReadNum.
         * @member {number} unReadNum
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.unReadNum = 0;

        /**
         * Conversion conversionId.
         * @member {string} conversionId
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.conversionId = "";

        /**
         * Conversion createTime.
         * @member {number|Long} createTime
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.createTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Conversion uptTime.
         * @member {number|Long} uptTime
         * @memberof mproto.Conversion
         * @instance
         */
        Conversion.prototype.uptTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Conversion instance using the specified properties.
         * @function create
         * @memberof mproto.Conversion
         * @static
         * @param {mproto.IConversion=} [properties] Properties to set
         * @returns {mproto.Conversion} Conversion instance
         */
        Conversion.create = function create(properties) {
            return new Conversion(properties);
        };

        /**
         * Encodes the specified Conversion message. Does not implicitly {@link mproto.Conversion.verify|verify} messages.
         * @function encode
         * @memberof mproto.Conversion
         * @static
         * @param {mproto.IConversion} message Conversion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Conversion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.userNick != null && message.hasOwnProperty("userNick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userNick);
            if (message.headImg != null && message.hasOwnProperty("headImg"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.headImg);
            if (message.userType != null && message.hasOwnProperty("userType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.userType);
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.toUserId);
            if (message.toUserNick != null && message.hasOwnProperty("toUserNick"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.toUserNick);
            if (message.toUserHeadImg != null && message.hasOwnProperty("toUserHeadImg"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.toUserHeadImg);
            if (message.toUserType != null && message.hasOwnProperty("toUserType"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.toUserType);
            if (message.lastMsgType != null && message.hasOwnProperty("lastMsgType"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.lastMsgType);
            if (message.lastMsgKind != null && message.hasOwnProperty("lastMsgKind"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.lastMsgKind);
            if (message.replaceContent != null && message.hasOwnProperty("replaceContent"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.replaceContent);
            if (message.unReadNum != null && message.hasOwnProperty("unReadNum"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.unReadNum);
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.conversionId);
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                writer.uint32(/* id 14, wireType 0 =*/112).int64(message.createTime);
            if (message.uptTime != null && message.hasOwnProperty("uptTime"))
                writer.uint32(/* id 15, wireType 0 =*/120).int64(message.uptTime);
            return writer;
        };

        /**
         * Encodes the specified Conversion message, length delimited. Does not implicitly {@link mproto.Conversion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.Conversion
         * @static
         * @param {mproto.IConversion} message Conversion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Conversion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Conversion message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.Conversion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.Conversion} Conversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Conversion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.Conversion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.userNick = reader.string();
                    break;
                case 3:
                    message.headImg = reader.string();
                    break;
                case 4:
                    message.userType = reader.int32();
                    break;
                case 5:
                    message.toUserId = reader.string();
                    break;
                case 6:
                    message.toUserNick = reader.string();
                    break;
                case 7:
                    message.toUserHeadImg = reader.string();
                    break;
                case 8:
                    message.toUserType = reader.int32();
                    break;
                case 9:
                    message.lastMsgType = reader.int32();
                    break;
                case 10:
                    message.lastMsgKind = reader.int32();
                    break;
                case 11:
                    message.replaceContent = reader.string();
                    break;
                case 12:
                    message.unReadNum = reader.int32();
                    break;
                case 13:
                    message.conversionId = reader.string();
                    break;
                case 14:
                    message.createTime = reader.int64();
                    break;
                case 15:
                    message.uptTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Conversion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.Conversion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.Conversion} Conversion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Conversion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Conversion message.
         * @function verify
         * @memberof mproto.Conversion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Conversion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.userNick != null && message.hasOwnProperty("userNick"))
                if (!$util.isString(message.userNick))
                    return "userNick: string expected";
            if (message.headImg != null && message.hasOwnProperty("headImg"))
                if (!$util.isString(message.headImg))
                    return "headImg: string expected";
            if (message.userType != null && message.hasOwnProperty("userType"))
                if (!$util.isInteger(message.userType))
                    return "userType: integer expected";
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                if (!$util.isString(message.toUserId))
                    return "toUserId: string expected";
            if (message.toUserNick != null && message.hasOwnProperty("toUserNick"))
                if (!$util.isString(message.toUserNick))
                    return "toUserNick: string expected";
            if (message.toUserHeadImg != null && message.hasOwnProperty("toUserHeadImg"))
                if (!$util.isString(message.toUserHeadImg))
                    return "toUserHeadImg: string expected";
            if (message.toUserType != null && message.hasOwnProperty("toUserType"))
                if (!$util.isInteger(message.toUserType))
                    return "toUserType: integer expected";
            if (message.lastMsgType != null && message.hasOwnProperty("lastMsgType"))
                if (!$util.isInteger(message.lastMsgType))
                    return "lastMsgType: integer expected";
            if (message.lastMsgKind != null && message.hasOwnProperty("lastMsgKind"))
                if (!$util.isInteger(message.lastMsgKind))
                    return "lastMsgKind: integer expected";
            if (message.replaceContent != null && message.hasOwnProperty("replaceContent"))
                if (!$util.isString(message.replaceContent))
                    return "replaceContent: string expected";
            if (message.unReadNum != null && message.hasOwnProperty("unReadNum"))
                if (!$util.isInteger(message.unReadNum))
                    return "unReadNum: integer expected";
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                if (!$util.isString(message.conversionId))
                    return "conversionId: string expected";
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                    return "createTime: integer|Long expected";
            if (message.uptTime != null && message.hasOwnProperty("uptTime"))
                if (!$util.isInteger(message.uptTime) && !(message.uptTime && $util.isInteger(message.uptTime.low) && $util.isInteger(message.uptTime.high)))
                    return "uptTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a Conversion message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.Conversion
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.Conversion} Conversion
         */
        Conversion.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.Conversion)
                return object;
            var message = new $root.mproto.Conversion();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.userNick != null)
                message.userNick = String(object.userNick);
            if (object.headImg != null)
                message.headImg = String(object.headImg);
            if (object.userType != null)
                message.userType = object.userType | 0;
            if (object.toUserId != null)
                message.toUserId = String(object.toUserId);
            if (object.toUserNick != null)
                message.toUserNick = String(object.toUserNick);
            if (object.toUserHeadImg != null)
                message.toUserHeadImg = String(object.toUserHeadImg);
            if (object.toUserType != null)
                message.toUserType = object.toUserType | 0;
            if (object.lastMsgType != null)
                message.lastMsgType = object.lastMsgType | 0;
            if (object.lastMsgKind != null)
                message.lastMsgKind = object.lastMsgKind | 0;
            if (object.replaceContent != null)
                message.replaceContent = String(object.replaceContent);
            if (object.unReadNum != null)
                message.unReadNum = object.unReadNum | 0;
            if (object.conversionId != null)
                message.conversionId = String(object.conversionId);
            if (object.createTime != null)
                if ($util.Long)
                    (message.createTime = $util.Long.fromValue(object.createTime)).unsigned = false;
                else if (typeof object.createTime === "string")
                    message.createTime = parseInt(object.createTime, 10);
                else if (typeof object.createTime === "number")
                    message.createTime = object.createTime;
                else if (typeof object.createTime === "object")
                    message.createTime = new $util.LongBits(object.createTime.low >>> 0, object.createTime.high >>> 0).toNumber();
            if (object.uptTime != null)
                if ($util.Long)
                    (message.uptTime = $util.Long.fromValue(object.uptTime)).unsigned = false;
                else if (typeof object.uptTime === "string")
                    message.uptTime = parseInt(object.uptTime, 10);
                else if (typeof object.uptTime === "number")
                    message.uptTime = object.uptTime;
                else if (typeof object.uptTime === "object")
                    message.uptTime = new $util.LongBits(object.uptTime.low >>> 0, object.uptTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Conversion message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.Conversion
         * @static
         * @param {mproto.Conversion} message Conversion
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Conversion.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.userNick = "";
                object.headImg = "";
                object.userType = 0;
                object.toUserId = "";
                object.toUserNick = "";
                object.toUserHeadImg = "";
                object.toUserType = 0;
                object.lastMsgType = 0;
                object.lastMsgKind = 0;
                object.replaceContent = "";
                object.unReadNum = 0;
                object.conversionId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.createTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.uptTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.uptTime = options.longs === String ? "0" : 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.userNick != null && message.hasOwnProperty("userNick"))
                object.userNick = message.userNick;
            if (message.headImg != null && message.hasOwnProperty("headImg"))
                object.headImg = message.headImg;
            if (message.userType != null && message.hasOwnProperty("userType"))
                object.userType = message.userType;
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                object.toUserId = message.toUserId;
            if (message.toUserNick != null && message.hasOwnProperty("toUserNick"))
                object.toUserNick = message.toUserNick;
            if (message.toUserHeadImg != null && message.hasOwnProperty("toUserHeadImg"))
                object.toUserHeadImg = message.toUserHeadImg;
            if (message.toUserType != null && message.hasOwnProperty("toUserType"))
                object.toUserType = message.toUserType;
            if (message.lastMsgType != null && message.hasOwnProperty("lastMsgType"))
                object.lastMsgType = message.lastMsgType;
            if (message.lastMsgKind != null && message.hasOwnProperty("lastMsgKind"))
                object.lastMsgKind = message.lastMsgKind;
            if (message.replaceContent != null && message.hasOwnProperty("replaceContent"))
                object.replaceContent = message.replaceContent;
            if (message.unReadNum != null && message.hasOwnProperty("unReadNum"))
                object.unReadNum = message.unReadNum;
            if (message.conversionId != null && message.hasOwnProperty("conversionId"))
                object.conversionId = message.conversionId;
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (typeof message.createTime === "number")
                    object.createTime = options.longs === String ? String(message.createTime) : message.createTime;
                else
                    object.createTime = options.longs === String ? $util.Long.prototype.toString.call(message.createTime) : options.longs === Number ? new $util.LongBits(message.createTime.low >>> 0, message.createTime.high >>> 0).toNumber() : message.createTime;
            if (message.uptTime != null && message.hasOwnProperty("uptTime"))
                if (typeof message.uptTime === "number")
                    object.uptTime = options.longs === String ? String(message.uptTime) : message.uptTime;
                else
                    object.uptTime = options.longs === String ? $util.Long.prototype.toString.call(message.uptTime) : options.longs === Number ? new $util.LongBits(message.uptTime.low >>> 0, message.uptTime.high >>> 0).toNumber() : message.uptTime;
            return object;
        };

        /**
         * Converts this Conversion to JSON.
         * @function toJSON
         * @memberof mproto.Conversion
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Conversion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Conversion;
    })();

    mproto.ChatMsg = (function() {

        /**
         * Properties of a ChatMsg.
         * @memberof mproto
         * @interface IChatMsg
         * @property {string|null} [msgId] ChatMsg msgId
         * @property {string|null} [userId] ChatMsg userId
         * @property {string|null} [userNick] ChatMsg userNick
         * @property {string|null} [userHeadImg] ChatMsg userHeadImg
         * @property {number|null} [userType] ChatMsg userType
         * @property {string|null} [toUserId] ChatMsg toUserId
         * @property {string|null} [toUserNick] ChatMsg toUserNick
         * @property {string|null} [toUserHeadImg] ChatMsg toUserHeadImg
         * @property {number|null} [toUserType] ChatMsg toUserType
         * @property {string|null} [content] ChatMsg content
         * @property {number|null} [msgKind] ChatMsg msgKind
         * @property {number|null} [msgType] ChatMsg msgType
         * @property {number|null} [contentType] ChatMsg contentType
         * @property {number|Long|null} [sendTime] ChatMsg sendTime
         * @property {number|Long|null} [readTime] ChatMsg readTime
         * @property {number|Long|null} [EditUptTime] ChatMsg EditUptTime
         * @property {boolean|null} [isRead] ChatMsg isRead
         */

        /**
         * Constructs a new ChatMsg.
         * @memberof mproto
         * @classdesc Represents a ChatMsg.
         * @implements IChatMsg
         * @constructor
         * @param {mproto.IChatMsg=} [properties] Properties to set
         */
        function ChatMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatMsg msgId.
         * @member {string} msgId
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.msgId = "";

        /**
         * ChatMsg userId.
         * @member {string} userId
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.userId = "";

        /**
         * ChatMsg userNick.
         * @member {string} userNick
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.userNick = "";

        /**
         * ChatMsg userHeadImg.
         * @member {string} userHeadImg
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.userHeadImg = "";

        /**
         * ChatMsg userType.
         * @member {number} userType
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.userType = 0;

        /**
         * ChatMsg toUserId.
         * @member {string} toUserId
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.toUserId = "";

        /**
         * ChatMsg toUserNick.
         * @member {string} toUserNick
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.toUserNick = "";

        /**
         * ChatMsg toUserHeadImg.
         * @member {string} toUserHeadImg
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.toUserHeadImg = "";

        /**
         * ChatMsg toUserType.
         * @member {number} toUserType
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.toUserType = 0;

        /**
         * ChatMsg content.
         * @member {string} content
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.content = "";

        /**
         * ChatMsg msgKind.
         * @member {number} msgKind
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.msgKind = 0;

        /**
         * ChatMsg msgType.
         * @member {number} msgType
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.msgType = 0;

        /**
         * ChatMsg contentType.
         * @member {number} contentType
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.contentType = 0;

        /**
         * ChatMsg sendTime.
         * @member {number|Long} sendTime
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.sendTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ChatMsg readTime.
         * @member {number|Long} readTime
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.readTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ChatMsg EditUptTime.
         * @member {number|Long} EditUptTime
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.EditUptTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ChatMsg isRead.
         * @member {boolean} isRead
         * @memberof mproto.ChatMsg
         * @instance
         */
        ChatMsg.prototype.isRead = false;

        /**
         * Creates a new ChatMsg instance using the specified properties.
         * @function create
         * @memberof mproto.ChatMsg
         * @static
         * @param {mproto.IChatMsg=} [properties] Properties to set
         * @returns {mproto.ChatMsg} ChatMsg instance
         */
        ChatMsg.create = function create(properties) {
            return new ChatMsg(properties);
        };

        /**
         * Encodes the specified ChatMsg message. Does not implicitly {@link mproto.ChatMsg.verify|verify} messages.
         * @function encode
         * @memberof mproto.ChatMsg
         * @static
         * @param {mproto.IChatMsg} message ChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.msgId);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
            if (message.userNick != null && message.hasOwnProperty("userNick"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.userNick);
            if (message.userHeadImg != null && message.hasOwnProperty("userHeadImg"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.userHeadImg);
            if (message.userType != null && message.hasOwnProperty("userType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.userType);
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.toUserId);
            if (message.toUserNick != null && message.hasOwnProperty("toUserNick"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.toUserNick);
            if (message.toUserHeadImg != null && message.hasOwnProperty("toUserHeadImg"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.toUserHeadImg);
            if (message.toUserType != null && message.hasOwnProperty("toUserType"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.toUserType);
            if (message.content != null && message.hasOwnProperty("content"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.content);
            if (message.msgKind != null && message.hasOwnProperty("msgKind"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.msgKind);
            if (message.msgType != null && message.hasOwnProperty("msgType"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.msgType);
            if (message.contentType != null && message.hasOwnProperty("contentType"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.contentType);
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                writer.uint32(/* id 14, wireType 0 =*/112).int64(message.sendTime);
            if (message.readTime != null && message.hasOwnProperty("readTime"))
                writer.uint32(/* id 15, wireType 0 =*/120).int64(message.readTime);
            if (message.EditUptTime != null && message.hasOwnProperty("EditUptTime"))
                writer.uint32(/* id 16, wireType 0 =*/128).int64(message.EditUptTime);
            if (message.isRead != null && message.hasOwnProperty("isRead"))
                writer.uint32(/* id 17, wireType 0 =*/136).bool(message.isRead);
            return writer;
        };

        /**
         * Encodes the specified ChatMsg message, length delimited. Does not implicitly {@link mproto.ChatMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mproto.ChatMsg
         * @static
         * @param {mproto.IChatMsg} message ChatMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatMsg message from the specified reader or buffer.
         * @function decode
         * @memberof mproto.ChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mproto.ChatMsg} ChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mproto.ChatMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msgId = reader.string();
                    break;
                case 2:
                    message.userId = reader.string();
                    break;
                case 3:
                    message.userNick = reader.string();
                    break;
                case 4:
                    message.userHeadImg = reader.string();
                    break;
                case 5:
                    message.userType = reader.int32();
                    break;
                case 6:
                    message.toUserId = reader.string();
                    break;
                case 7:
                    message.toUserNick = reader.string();
                    break;
                case 8:
                    message.toUserHeadImg = reader.string();
                    break;
                case 9:
                    message.toUserType = reader.int32();
                    break;
                case 10:
                    message.content = reader.string();
                    break;
                case 11:
                    message.msgKind = reader.int32();
                    break;
                case 12:
                    message.msgType = reader.int32();
                    break;
                case 13:
                    message.contentType = reader.int32();
                    break;
                case 14:
                    message.sendTime = reader.int64();
                    break;
                case 15:
                    message.readTime = reader.int64();
                    break;
                case 16:
                    message.EditUptTime = reader.int64();
                    break;
                case 17:
                    message.isRead = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mproto.ChatMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mproto.ChatMsg} ChatMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatMsg message.
         * @function verify
         * @memberof mproto.ChatMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                if (!$util.isString(message.msgId))
                    return "msgId: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.userNick != null && message.hasOwnProperty("userNick"))
                if (!$util.isString(message.userNick))
                    return "userNick: string expected";
            if (message.userHeadImg != null && message.hasOwnProperty("userHeadImg"))
                if (!$util.isString(message.userHeadImg))
                    return "userHeadImg: string expected";
            if (message.userType != null && message.hasOwnProperty("userType"))
                if (!$util.isInteger(message.userType))
                    return "userType: integer expected";
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                if (!$util.isString(message.toUserId))
                    return "toUserId: string expected";
            if (message.toUserNick != null && message.hasOwnProperty("toUserNick"))
                if (!$util.isString(message.toUserNick))
                    return "toUserNick: string expected";
            if (message.toUserHeadImg != null && message.hasOwnProperty("toUserHeadImg"))
                if (!$util.isString(message.toUserHeadImg))
                    return "toUserHeadImg: string expected";
            if (message.toUserType != null && message.hasOwnProperty("toUserType"))
                if (!$util.isInteger(message.toUserType))
                    return "toUserType: integer expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.msgKind != null && message.hasOwnProperty("msgKind"))
                if (!$util.isInteger(message.msgKind))
                    return "msgKind: integer expected";
            if (message.msgType != null && message.hasOwnProperty("msgType"))
                if (!$util.isInteger(message.msgType))
                    return "msgType: integer expected";
            if (message.contentType != null && message.hasOwnProperty("contentType"))
                if (!$util.isInteger(message.contentType))
                    return "contentType: integer expected";
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                if (!$util.isInteger(message.sendTime) && !(message.sendTime && $util.isInteger(message.sendTime.low) && $util.isInteger(message.sendTime.high)))
                    return "sendTime: integer|Long expected";
            if (message.readTime != null && message.hasOwnProperty("readTime"))
                if (!$util.isInteger(message.readTime) && !(message.readTime && $util.isInteger(message.readTime.low) && $util.isInteger(message.readTime.high)))
                    return "readTime: integer|Long expected";
            if (message.EditUptTime != null && message.hasOwnProperty("EditUptTime"))
                if (!$util.isInteger(message.EditUptTime) && !(message.EditUptTime && $util.isInteger(message.EditUptTime.low) && $util.isInteger(message.EditUptTime.high)))
                    return "EditUptTime: integer|Long expected";
            if (message.isRead != null && message.hasOwnProperty("isRead"))
                if (typeof message.isRead !== "boolean")
                    return "isRead: boolean expected";
            return null;
        };

        /**
         * Creates a ChatMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mproto.ChatMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mproto.ChatMsg} ChatMsg
         */
        ChatMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.mproto.ChatMsg)
                return object;
            var message = new $root.mproto.ChatMsg();
            if (object.msgId != null)
                message.msgId = String(object.msgId);
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.userNick != null)
                message.userNick = String(object.userNick);
            if (object.userHeadImg != null)
                message.userHeadImg = String(object.userHeadImg);
            if (object.userType != null)
                message.userType = object.userType | 0;
            if (object.toUserId != null)
                message.toUserId = String(object.toUserId);
            if (object.toUserNick != null)
                message.toUserNick = String(object.toUserNick);
            if (object.toUserHeadImg != null)
                message.toUserHeadImg = String(object.toUserHeadImg);
            if (object.toUserType != null)
                message.toUserType = object.toUserType | 0;
            if (object.content != null)
                message.content = String(object.content);
            if (object.msgKind != null)
                message.msgKind = object.msgKind | 0;
            if (object.msgType != null)
                message.msgType = object.msgType | 0;
            if (object.contentType != null)
                message.contentType = object.contentType | 0;
            if (object.sendTime != null)
                if ($util.Long)
                    (message.sendTime = $util.Long.fromValue(object.sendTime)).unsigned = false;
                else if (typeof object.sendTime === "string")
                    message.sendTime = parseInt(object.sendTime, 10);
                else if (typeof object.sendTime === "number")
                    message.sendTime = object.sendTime;
                else if (typeof object.sendTime === "object")
                    message.sendTime = new $util.LongBits(object.sendTime.low >>> 0, object.sendTime.high >>> 0).toNumber();
            if (object.readTime != null)
                if ($util.Long)
                    (message.readTime = $util.Long.fromValue(object.readTime)).unsigned = false;
                else if (typeof object.readTime === "string")
                    message.readTime = parseInt(object.readTime, 10);
                else if (typeof object.readTime === "number")
                    message.readTime = object.readTime;
                else if (typeof object.readTime === "object")
                    message.readTime = new $util.LongBits(object.readTime.low >>> 0, object.readTime.high >>> 0).toNumber();
            if (object.EditUptTime != null)
                if ($util.Long)
                    (message.EditUptTime = $util.Long.fromValue(object.EditUptTime)).unsigned = false;
                else if (typeof object.EditUptTime === "string")
                    message.EditUptTime = parseInt(object.EditUptTime, 10);
                else if (typeof object.EditUptTime === "number")
                    message.EditUptTime = object.EditUptTime;
                else if (typeof object.EditUptTime === "object")
                    message.EditUptTime = new $util.LongBits(object.EditUptTime.low >>> 0, object.EditUptTime.high >>> 0).toNumber();
            if (object.isRead != null)
                message.isRead = Boolean(object.isRead);
            return message;
        };

        /**
         * Creates a plain object from a ChatMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mproto.ChatMsg
         * @static
         * @param {mproto.ChatMsg} message ChatMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.msgId = "";
                object.userId = "";
                object.userNick = "";
                object.userHeadImg = "";
                object.userType = 0;
                object.toUserId = "";
                object.toUserNick = "";
                object.toUserHeadImg = "";
                object.toUserType = 0;
                object.content = "";
                object.msgKind = 0;
                object.msgType = 0;
                object.contentType = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.sendTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sendTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.readTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.readTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.EditUptTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.EditUptTime = options.longs === String ? "0" : 0;
                object.isRead = false;
            }
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                object.msgId = message.msgId;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.userNick != null && message.hasOwnProperty("userNick"))
                object.userNick = message.userNick;
            if (message.userHeadImg != null && message.hasOwnProperty("userHeadImg"))
                object.userHeadImg = message.userHeadImg;
            if (message.userType != null && message.hasOwnProperty("userType"))
                object.userType = message.userType;
            if (message.toUserId != null && message.hasOwnProperty("toUserId"))
                object.toUserId = message.toUserId;
            if (message.toUserNick != null && message.hasOwnProperty("toUserNick"))
                object.toUserNick = message.toUserNick;
            if (message.toUserHeadImg != null && message.hasOwnProperty("toUserHeadImg"))
                object.toUserHeadImg = message.toUserHeadImg;
            if (message.toUserType != null && message.hasOwnProperty("toUserType"))
                object.toUserType = message.toUserType;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.msgKind != null && message.hasOwnProperty("msgKind"))
                object.msgKind = message.msgKind;
            if (message.msgType != null && message.hasOwnProperty("msgType"))
                object.msgType = message.msgType;
            if (message.contentType != null && message.hasOwnProperty("contentType"))
                object.contentType = message.contentType;
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                if (typeof message.sendTime === "number")
                    object.sendTime = options.longs === String ? String(message.sendTime) : message.sendTime;
                else
                    object.sendTime = options.longs === String ? $util.Long.prototype.toString.call(message.sendTime) : options.longs === Number ? new $util.LongBits(message.sendTime.low >>> 0, message.sendTime.high >>> 0).toNumber() : message.sendTime;
            if (message.readTime != null && message.hasOwnProperty("readTime"))
                if (typeof message.readTime === "number")
                    object.readTime = options.longs === String ? String(message.readTime) : message.readTime;
                else
                    object.readTime = options.longs === String ? $util.Long.prototype.toString.call(message.readTime) : options.longs === Number ? new $util.LongBits(message.readTime.low >>> 0, message.readTime.high >>> 0).toNumber() : message.readTime;
            if (message.EditUptTime != null && message.hasOwnProperty("EditUptTime"))
                if (typeof message.EditUptTime === "number")
                    object.EditUptTime = options.longs === String ? String(message.EditUptTime) : message.EditUptTime;
                else
                    object.EditUptTime = options.longs === String ? $util.Long.prototype.toString.call(message.EditUptTime) : options.longs === Number ? new $util.LongBits(message.EditUptTime.low >>> 0, message.EditUptTime.high >>> 0).toNumber() : message.EditUptTime;
            if (message.isRead != null && message.hasOwnProperty("isRead"))
                object.isRead = message.isRead;
            return object;
        };

        /**
         * Converts this ChatMsg to JSON.
         * @function toJSON
         * @memberof mproto.ChatMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatMsg;
    })();

    return mproto;
})();

module.exports = $root;
