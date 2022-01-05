/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("ZHIBO_protobufjs");

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
     * SubCommand enum.
     * @name msg.SubCommand
     * @enum {number}
     * @property {number} EnumSubLoginReq=0 EnumSubLoginReq value
     * @property {number} EnumSubLoginResp=1 EnumSubLoginResp value
     * @property {number} EnumSubFrontEndLog=2 EnumSubFrontEndLog value
     */
    msg.SubCommand = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "EnumSubLoginReq"] = 0;
        values[valuesById[1] = "EnumSubLoginResp"] = 1;
        values[valuesById[2] = "EnumSubFrontEndLog"] = 2;
        return values;
    })();

    msg.LoginReq = (function() {

        /**
         * Properties of a LoginReq.
         * @memberof msg
         * @interface ILoginReq
         * @property {number|null} [userID] LoginReq userID
         * @property {string|null} [userName] LoginReq userName
         * @property {string|null} [userAvatar] LoginReq userAvatar
         */

        /**
         * Constructs a new LoginReq.
         * @memberof msg
         * @classdesc Represents a LoginReq.
         * @implements ILoginReq
         * @constructor
         * @param {msg.ILoginReq=} [properties] Properties to set
         */
        function LoginReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginReq userID.
         * @member {number} userID
         * @memberof msg.LoginReq
         * @instance
         */
        LoginReq.prototype.userID = 0;

        /**
         * LoginReq userName.
         * @member {string} userName
         * @memberof msg.LoginReq
         * @instance
         */
        LoginReq.prototype.userName = "";

        /**
         * LoginReq userAvatar.
         * @member {string} userAvatar
         * @memberof msg.LoginReq
         * @instance
         */
        LoginReq.prototype.userAvatar = "";

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @function create
         * @memberof msg.LoginReq
         * @static
         * @param {msg.ILoginReq=} [properties] Properties to set
         * @returns {msg.LoginReq} LoginReq instance
         */
        LoginReq.create = function create(properties) {
            return new LoginReq(properties);
        };

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link msg.LoginReq.verify|verify} messages.
         * @function encode
         * @memberof msg.LoginReq
         * @static
         * @param {msg.ILoginReq} message LoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userID);
            if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
            if (message.userAvatar != null && Object.hasOwnProperty.call(message, "userAvatar"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.userAvatar);
            return writer;
        };

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link msg.LoginReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LoginReq
         * @static
         * @param {msg.ILoginReq} message LoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LoginReq} LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LoginReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userID = reader.uint32();
                    break;
                case 2:
                    message.userName = reader.string();
                    break;
                case 3:
                    message.userAvatar = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LoginReq} LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginReq message.
         * @function verify
         * @memberof msg.LoginReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userID != null && message.hasOwnProperty("userID"))
                if (!$util.isInteger(message.userID))
                    return "userID: integer expected";
            if (message.userName != null && message.hasOwnProperty("userName"))
                if (!$util.isString(message.userName))
                    return "userName: string expected";
            if (message.userAvatar != null && message.hasOwnProperty("userAvatar"))
                if (!$util.isString(message.userAvatar))
                    return "userAvatar: string expected";
            return null;
        };

        /**
         * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LoginReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LoginReq} LoginReq
         */
        LoginReq.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LoginReq)
                return object;
            var message = new $root.msg.LoginReq();
            if (object.userID != null)
                message.userID = object.userID >>> 0;
            if (object.userName != null)
                message.userName = String(object.userName);
            if (object.userAvatar != null)
                message.userAvatar = String(object.userAvatar);
            return message;
        };

        /**
         * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LoginReq
         * @static
         * @param {msg.LoginReq} message LoginReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userID = 0;
                object.userName = "";
                object.userAvatar = "";
            }
            if (message.userID != null && message.hasOwnProperty("userID"))
                object.userID = message.userID;
            if (message.userName != null && message.hasOwnProperty("userName"))
                object.userName = message.userName;
            if (message.userAvatar != null && message.hasOwnProperty("userAvatar"))
                object.userAvatar = message.userAvatar;
            return object;
        };

        /**
         * Converts this LoginReq to JSON.
         * @function toJSON
         * @memberof msg.LoginReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginReq;
    })();

    msg.LoginResp = (function() {

        /**
         * Properties of a LoginResp.
         * @memberof msg
         * @interface ILoginResp
         * @property {msg.ICommandResult|null} [result] LoginResp result
         * @property {string|null} [version] LoginResp version
         * @property {Array.<msg.IRoomInfo>|null} [roomList] LoginResp roomList
         * @property {Array.<string>|null} [lineList] LoginResp lineList
         * @property {string|null} [loadUrl] LoginResp loadUrl
         */

        /**
         * Constructs a new LoginResp.
         * @memberof msg
         * @classdesc Represents a LoginResp.
         * @implements ILoginResp
         * @constructor
         * @param {msg.ILoginResp=} [properties] Properties to set
         */
        function LoginResp(properties) {
            this.roomList = [];
            this.lineList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginResp result.
         * @member {msg.ICommandResult|null|undefined} result
         * @memberof msg.LoginResp
         * @instance
         */
        LoginResp.prototype.result = null;

        /**
         * LoginResp version.
         * @member {string} version
         * @memberof msg.LoginResp
         * @instance
         */
        LoginResp.prototype.version = "";

        /**
         * LoginResp roomList.
         * @member {Array.<msg.IRoomInfo>} roomList
         * @memberof msg.LoginResp
         * @instance
         */
        LoginResp.prototype.roomList = $util.emptyArray;

        /**
         * LoginResp lineList.
         * @member {Array.<string>} lineList
         * @memberof msg.LoginResp
         * @instance
         */
        LoginResp.prototype.lineList = $util.emptyArray;

        /**
         * LoginResp loadUrl.
         * @member {string} loadUrl
         * @memberof msg.LoginResp
         * @instance
         */
        LoginResp.prototype.loadUrl = "";

        /**
         * Creates a new LoginResp instance using the specified properties.
         * @function create
         * @memberof msg.LoginResp
         * @static
         * @param {msg.ILoginResp=} [properties] Properties to set
         * @returns {msg.LoginResp} LoginResp instance
         */
        LoginResp.create = function create(properties) {
            return new LoginResp(properties);
        };

        /**
         * Encodes the specified LoginResp message. Does not implicitly {@link msg.LoginResp.verify|verify} messages.
         * @function encode
         * @memberof msg.LoginResp
         * @static
         * @param {msg.ILoginResp} message LoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.msg.CommandResult.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
            if (message.roomList != null && message.roomList.length)
                for (var i = 0; i < message.roomList.length; ++i)
                    $root.msg.RoomInfo.encode(message.roomList[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.lineList != null && message.lineList.length)
                for (var i = 0; i < message.lineList.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.lineList[i]);
            if (message.loadUrl != null && Object.hasOwnProperty.call(message, "loadUrl"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.loadUrl);
            return writer;
        };

        /**
         * Encodes the specified LoginResp message, length delimited. Does not implicitly {@link msg.LoginResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LoginResp
         * @static
         * @param {msg.ILoginResp} message LoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginResp message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LoginResp} LoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LoginResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = $root.msg.CommandResult.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.version = reader.string();
                    break;
                case 3:
                    if (!(message.roomList && message.roomList.length))
                        message.roomList = [];
                    message.roomList.push($root.msg.RoomInfo.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.lineList && message.lineList.length))
                        message.lineList = [];
                    message.lineList.push(reader.string());
                    break;
                case 5:
                    message.loadUrl = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LoginResp} LoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginResp message.
         * @function verify
         * @memberof msg.LoginResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.msg.CommandResult.verify(message.result);
                if (error)
                    return "result." + error;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.roomList != null && message.hasOwnProperty("roomList")) {
                if (!Array.isArray(message.roomList))
                    return "roomList: array expected";
                for (var i = 0; i < message.roomList.length; ++i) {
                    var error = $root.msg.RoomInfo.verify(message.roomList[i]);
                    if (error)
                        return "roomList." + error;
                }
            }
            if (message.lineList != null && message.hasOwnProperty("lineList")) {
                if (!Array.isArray(message.lineList))
                    return "lineList: array expected";
                for (var i = 0; i < message.lineList.length; ++i)
                    if (!$util.isString(message.lineList[i]))
                        return "lineList: string[] expected";
            }
            if (message.loadUrl != null && message.hasOwnProperty("loadUrl"))
                if (!$util.isString(message.loadUrl))
                    return "loadUrl: string expected";
            return null;
        };

        /**
         * Creates a LoginResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LoginResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LoginResp} LoginResp
         */
        LoginResp.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LoginResp)
                return object;
            var message = new $root.msg.LoginResp();
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".msg.LoginResp.result: object expected");
                message.result = $root.msg.CommandResult.fromObject(object.result);
            }
            if (object.version != null)
                message.version = String(object.version);
            if (object.roomList) {
                if (!Array.isArray(object.roomList))
                    throw TypeError(".msg.LoginResp.roomList: array expected");
                message.roomList = [];
                for (var i = 0; i < object.roomList.length; ++i) {
                    if (typeof object.roomList[i] !== "object")
                        throw TypeError(".msg.LoginResp.roomList: object expected");
                    message.roomList[i] = $root.msg.RoomInfo.fromObject(object.roomList[i]);
                }
            }
            if (object.lineList) {
                if (!Array.isArray(object.lineList))
                    throw TypeError(".msg.LoginResp.lineList: array expected");
                message.lineList = [];
                for (var i = 0; i < object.lineList.length; ++i)
                    message.lineList[i] = String(object.lineList[i]);
            }
            if (object.loadUrl != null)
                message.loadUrl = String(object.loadUrl);
            return message;
        };

        /**
         * Creates a plain object from a LoginResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LoginResp
         * @static
         * @param {msg.LoginResp} message LoginResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.roomList = [];
                object.lineList = [];
            }
            if (options.defaults) {
                object.result = null;
                object.version = "";
                object.loadUrl = "";
            }
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.msg.CommandResult.toObject(message.result, options);
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.roomList && message.roomList.length) {
                object.roomList = [];
                for (var j = 0; j < message.roomList.length; ++j)
                    object.roomList[j] = $root.msg.RoomInfo.toObject(message.roomList[j], options);
            }
            if (message.lineList && message.lineList.length) {
                object.lineList = [];
                for (var j = 0; j < message.lineList.length; ++j)
                    object.lineList[j] = message.lineList[j];
            }
            if (message.loadUrl != null && message.hasOwnProperty("loadUrl"))
                object.loadUrl = message.loadUrl;
            return object;
        };

        /**
         * Converts this LoginResp to JSON.
         * @function toJSON
         * @memberof msg.LoginResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginResp;
    })();

    msg.RoomInfo = (function() {

        /**
         * Properties of a RoomInfo.
         * @memberof msg
         * @interface IRoomInfo
         * @property {string|null} [liveUserName] RoomInfo liveUserName
         * @property {string|null} [gameCode] RoomInfo gameCode
         * @property {string|null} [roomCode] RoomInfo roomCode
         * @property {string|null} [roomUrl] RoomInfo roomUrl
         * @property {string|null} [liveUserAvatar] RoomInfo liveUserAvatar
         */

        /**
         * Constructs a new RoomInfo.
         * @memberof msg
         * @classdesc Represents a RoomInfo.
         * @implements IRoomInfo
         * @constructor
         * @param {msg.IRoomInfo=} [properties] Properties to set
         */
        function RoomInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomInfo liveUserName.
         * @member {string} liveUserName
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.liveUserName = "";

        /**
         * RoomInfo gameCode.
         * @member {string} gameCode
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.gameCode = "";

        /**
         * RoomInfo roomCode.
         * @member {string} roomCode
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomCode = "";

        /**
         * RoomInfo roomUrl.
         * @member {string} roomUrl
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomUrl = "";

        /**
         * RoomInfo liveUserAvatar.
         * @member {string} liveUserAvatar
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.liveUserAvatar = "";

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @function create
         * @memberof msg.RoomInfo
         * @static
         * @param {msg.IRoomInfo=} [properties] Properties to set
         * @returns {msg.RoomInfo} RoomInfo instance
         */
        RoomInfo.create = function create(properties) {
            return new RoomInfo(properties);
        };

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link msg.RoomInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomInfo
         * @static
         * @param {msg.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.liveUserName != null && Object.hasOwnProperty.call(message, "liveUserName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.liveUserName);
            if (message.gameCode != null && Object.hasOwnProperty.call(message, "gameCode"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameCode);
            if (message.roomCode != null && Object.hasOwnProperty.call(message, "roomCode"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.roomCode);
            if (message.roomUrl != null && Object.hasOwnProperty.call(message, "roomUrl"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.roomUrl);
            if (message.liveUserAvatar != null && Object.hasOwnProperty.call(message, "liveUserAvatar"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.liveUserAvatar);
            return writer;
        };

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link msg.RoomInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomInfo
         * @static
         * @param {msg.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.liveUserName = reader.string();
                    break;
                case 2:
                    message.gameCode = reader.string();
                    break;
                case 3:
                    message.roomCode = reader.string();
                    break;
                case 4:
                    message.roomUrl = reader.string();
                    break;
                case 5:
                    message.liveUserAvatar = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomInfo message.
         * @function verify
         * @memberof msg.RoomInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.liveUserName != null && message.hasOwnProperty("liveUserName"))
                if (!$util.isString(message.liveUserName))
                    return "liveUserName: string expected";
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                if (!$util.isString(message.gameCode))
                    return "gameCode: string expected";
            if (message.roomCode != null && message.hasOwnProperty("roomCode"))
                if (!$util.isString(message.roomCode))
                    return "roomCode: string expected";
            if (message.roomUrl != null && message.hasOwnProperty("roomUrl"))
                if (!$util.isString(message.roomUrl))
                    return "roomUrl: string expected";
            if (message.liveUserAvatar != null && message.hasOwnProperty("liveUserAvatar"))
                if (!$util.isString(message.liveUserAvatar))
                    return "liveUserAvatar: string expected";
            return null;
        };

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomInfo} RoomInfo
         */
        RoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomInfo)
                return object;
            var message = new $root.msg.RoomInfo();
            if (object.liveUserName != null)
                message.liveUserName = String(object.liveUserName);
            if (object.gameCode != null)
                message.gameCode = String(object.gameCode);
            if (object.roomCode != null)
                message.roomCode = String(object.roomCode);
            if (object.roomUrl != null)
                message.roomUrl = String(object.roomUrl);
            if (object.liveUserAvatar != null)
                message.liveUserAvatar = String(object.liveUserAvatar);
            return message;
        };

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomInfo
         * @static
         * @param {msg.RoomInfo} message RoomInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.liveUserName = "";
                object.gameCode = "";
                object.roomCode = "";
                object.roomUrl = "";
                object.liveUserAvatar = "";
            }
            if (message.liveUserName != null && message.hasOwnProperty("liveUserName"))
                object.liveUserName = message.liveUserName;
            if (message.gameCode != null && message.hasOwnProperty("gameCode"))
                object.gameCode = message.gameCode;
            if (message.roomCode != null && message.hasOwnProperty("roomCode"))
                object.roomCode = message.roomCode;
            if (message.roomUrl != null && message.hasOwnProperty("roomUrl"))
                object.roomUrl = message.roomUrl;
            if (message.liveUserAvatar != null && message.hasOwnProperty("liveUserAvatar"))
                object.liveUserAvatar = message.liveUserAvatar;
            return object;
        };

        /**
         * Converts this RoomInfo to JSON.
         * @function toJSON
         * @memberof msg.RoomInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomInfo;
    })();

    msg.FrontEndLog = (function() {

        /**
         * Properties of a FrontEndLog.
         * @memberof msg
         * @interface IFrontEndLog
         * @property {number|null} [code] FrontEndLog code
         * @property {string|null} [description] FrontEndLog description
         */

        /**
         * Constructs a new FrontEndLog.
         * @memberof msg
         * @classdesc Represents a FrontEndLog.
         * @implements IFrontEndLog
         * @constructor
         * @param {msg.IFrontEndLog=} [properties] Properties to set
         */
        function FrontEndLog(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FrontEndLog code.
         * @member {number} code
         * @memberof msg.FrontEndLog
         * @instance
         */
        FrontEndLog.prototype.code = 0;

        /**
         * FrontEndLog description.
         * @member {string} description
         * @memberof msg.FrontEndLog
         * @instance
         */
        FrontEndLog.prototype.description = "";

        /**
         * Creates a new FrontEndLog instance using the specified properties.
         * @function create
         * @memberof msg.FrontEndLog
         * @static
         * @param {msg.IFrontEndLog=} [properties] Properties to set
         * @returns {msg.FrontEndLog} FrontEndLog instance
         */
        FrontEndLog.create = function create(properties) {
            return new FrontEndLog(properties);
        };

        /**
         * Encodes the specified FrontEndLog message. Does not implicitly {@link msg.FrontEndLog.verify|verify} messages.
         * @function encode
         * @memberof msg.FrontEndLog
         * @static
         * @param {msg.IFrontEndLog} message FrontEndLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FrontEndLog.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.code);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
            return writer;
        };

        /**
         * Encodes the specified FrontEndLog message, length delimited. Does not implicitly {@link msg.FrontEndLog.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.FrontEndLog
         * @static
         * @param {msg.IFrontEndLog} message FrontEndLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FrontEndLog.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FrontEndLog message from the specified reader or buffer.
         * @function decode
         * @memberof msg.FrontEndLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.FrontEndLog} FrontEndLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FrontEndLog.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.FrontEndLog();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FrontEndLog message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.FrontEndLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.FrontEndLog} FrontEndLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FrontEndLog.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FrontEndLog message.
         * @function verify
         * @memberof msg.FrontEndLog
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FrontEndLog.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            return null;
        };

        /**
         * Creates a FrontEndLog message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.FrontEndLog
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.FrontEndLog} FrontEndLog
         */
        FrontEndLog.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.FrontEndLog)
                return object;
            var message = new $root.msg.FrontEndLog();
            if (object.code != null)
                message.code = object.code >>> 0;
            if (object.description != null)
                message.description = String(object.description);
            return message;
        };

        /**
         * Creates a plain object from a FrontEndLog message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.FrontEndLog
         * @static
         * @param {msg.FrontEndLog} message FrontEndLog
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FrontEndLog.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.description = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            return object;
        };

        /**
         * Converts this FrontEndLog to JSON.
         * @function toJSON
         * @memberof msg.FrontEndLog
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FrontEndLog.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FrontEndLog;
    })();

    msg.CommandResult = (function() {

        /**
         * Properties of a CommandResult.
         * @memberof msg
         * @interface ICommandResult
         * @property {msg.CommandResult.ResultCode|null} [resultCode] CommandResult resultCode
         * @property {string|null} [message] CommandResult message
         */

        /**
         * Constructs a new CommandResult.
         * @memberof msg
         * @classdesc Represents a CommandResult.
         * @implements ICommandResult
         * @constructor
         * @param {msg.ICommandResult=} [properties] Properties to set
         */
        function CommandResult(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CommandResult resultCode.
         * @member {msg.CommandResult.ResultCode} resultCode
         * @memberof msg.CommandResult
         * @instance
         */
        CommandResult.prototype.resultCode = 0;

        /**
         * CommandResult message.
         * @member {string} message
         * @memberof msg.CommandResult
         * @instance
         */
        CommandResult.prototype.message = "";

        /**
         * Creates a new CommandResult instance using the specified properties.
         * @function create
         * @memberof msg.CommandResult
         * @static
         * @param {msg.ICommandResult=} [properties] Properties to set
         * @returns {msg.CommandResult} CommandResult instance
         */
        CommandResult.create = function create(properties) {
            return new CommandResult(properties);
        };

        /**
         * Encodes the specified CommandResult message. Does not implicitly {@link msg.CommandResult.verify|verify} messages.
         * @function encode
         * @memberof msg.CommandResult
         * @static
         * @param {msg.ICommandResult} message CommandResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommandResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.resultCode != null && Object.hasOwnProperty.call(message, "resultCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.resultCode);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified CommandResult message, length delimited. Does not implicitly {@link msg.CommandResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.CommandResult
         * @static
         * @param {msg.ICommandResult} message CommandResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommandResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CommandResult message from the specified reader or buffer.
         * @function decode
         * @memberof msg.CommandResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.CommandResult} CommandResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommandResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.CommandResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.resultCode = reader.int32();
                    break;
                case 3:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CommandResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.CommandResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.CommandResult} CommandResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommandResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CommandResult message.
         * @function verify
         * @memberof msg.CommandResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommandResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.resultCode != null && message.hasOwnProperty("resultCode"))
                switch (message.resultCode) {
                default:
                    return "resultCode: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 11:
                case 12:
                case 13:
                case 14:
                    break;
                }
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates a CommandResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.CommandResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.CommandResult} CommandResult
         */
        CommandResult.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.CommandResult)
                return object;
            var message = new $root.msg.CommandResult();
            switch (object.resultCode) {
            case "UNKNOWN":
            case 0:
                message.resultCode = 0;
                break;
            case "SUCCESS":
            case 1:
                message.resultCode = 1;
                break;
            case "DATA_ILLEGAL":
            case 2:
                message.resultCode = 2;
                break;
            case "FIND_USER_BY_AGENT_ERROR":
            case 3:
                message.resultCode = 3;
                break;
            case "DATABASE_READ_WRITE_FAILED":
            case 4:
                message.resultCode = 4;
                break;
            case "CENTER_SERVER_DISCONNECT":
            case 5:
                message.resultCode = 5;
                break;
            case "USER_NOT_EXIST":
            case 11:
                message.resultCode = 11;
                break;
            case "OTHER_DEVICES_LOGIN":
            case 12:
                message.resultCode = 12;
                break;
            case "USER_DISABLE":
            case 13:
                message.resultCode = 13;
                break;
            case "NOT_ENOUGH_MIN_ENTRY_AMOUNT":
            case 14:
                message.resultCode = 14;
                break;
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a CommandResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.CommandResult
         * @static
         * @param {msg.CommandResult} message CommandResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommandResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.resultCode = options.enums === String ? "UNKNOWN" : 0;
                object.message = "";
            }
            if (message.resultCode != null && message.hasOwnProperty("resultCode"))
                object.resultCode = options.enums === String ? $root.msg.CommandResult.ResultCode[message.resultCode] : message.resultCode;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this CommandResult to JSON.
         * @function toJSON
         * @memberof msg.CommandResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommandResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * ResultCode enum.
         * @name msg.CommandResult.ResultCode
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} SUCCESS=1 SUCCESS value
         * @property {number} DATA_ILLEGAL=2 DATA_ILLEGAL value
         * @property {number} FIND_USER_BY_AGENT_ERROR=3 FIND_USER_BY_AGENT_ERROR value
         * @property {number} DATABASE_READ_WRITE_FAILED=4 DATABASE_READ_WRITE_FAILED value
         * @property {number} CENTER_SERVER_DISCONNECT=5 CENTER_SERVER_DISCONNECT value
         * @property {number} USER_NOT_EXIST=11 USER_NOT_EXIST value
         * @property {number} OTHER_DEVICES_LOGIN=12 OTHER_DEVICES_LOGIN value
         * @property {number} USER_DISABLE=13 USER_DISABLE value
         * @property {number} NOT_ENOUGH_MIN_ENTRY_AMOUNT=14 NOT_ENOUGH_MIN_ENTRY_AMOUNT value
         */
        CommandResult.ResultCode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "SUCCESS"] = 1;
            values[valuesById[2] = "DATA_ILLEGAL"] = 2;
            values[valuesById[3] = "FIND_USER_BY_AGENT_ERROR"] = 3;
            values[valuesById[4] = "DATABASE_READ_WRITE_FAILED"] = 4;
            values[valuesById[5] = "CENTER_SERVER_DISCONNECT"] = 5;
            values[valuesById[11] = "USER_NOT_EXIST"] = 11;
            values[valuesById[12] = "OTHER_DEVICES_LOGIN"] = 12;
            values[valuesById[13] = "USER_DISABLE"] = 13;
            values[valuesById[14] = "NOT_ENOUGH_MIN_ENTRY_AMOUNT"] = 14;
            return values;
        })();

        return CommandResult;
    })();

    return msg;
})();

module.exports = $root;
