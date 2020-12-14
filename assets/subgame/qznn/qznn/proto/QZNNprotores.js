/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("QZNNprotobuf");

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

    msg.UserLogin = (function() {

        /**
         * Properties of a UserLogin.
         * @memberof msg
         * @interface IUserLogin
         * @property {number|Long|null} [uid] UserLogin uid
         * @property {string|null} [pwd] UserLogin pwd
         * @property {string|null} [token] UserLogin token
         * @property {string|null} [gameId] UserLogin gameId
         */

        /**
         * Constructs a new UserLogin.
         * @memberof msg
         * @classdesc Represents a UserLogin.
         * @implements IUserLogin
         * @constructor
         * @param {msg.IUserLogin=} [properties] Properties to set
         */
        function UserLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserLogin uid.
         * @member {number|Long} uid
         * @memberof msg.UserLogin
         * @instance
         */
        UserLogin.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserLogin pwd.
         * @member {string} pwd
         * @memberof msg.UserLogin
         * @instance
         */
        UserLogin.prototype.pwd = "";

        /**
         * UserLogin token.
         * @member {string} token
         * @memberof msg.UserLogin
         * @instance
         */
        UserLogin.prototype.token = "";

        /**
         * UserLogin gameId.
         * @member {string} gameId
         * @memberof msg.UserLogin
         * @instance
         */
        UserLogin.prototype.gameId = "";

        /**
         * Creates a new UserLogin instance using the specified properties.
         * @function create
         * @memberof msg.UserLogin
         * @static
         * @param {msg.IUserLogin=} [properties] Properties to set
         * @returns {msg.UserLogin} UserLogin instance
         */
        UserLogin.create = function create(properties) {
            return new UserLogin(properties);
        };

        /**
         * Encodes the specified UserLogin message. Does not implicitly {@link msg.UserLogin.verify|verify} messages.
         * @function encode
         * @memberof msg.UserLogin
         * @static
         * @param {msg.IUserLogin} message UserLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.uid);
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.pwd);
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.token);
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.gameId);
            return writer;
        };

        /**
         * Encodes the specified UserLogin message, length delimited. Does not implicitly {@link msg.UserLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UserLogin
         * @static
         * @param {msg.IUserLogin} message UserLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserLogin message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UserLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UserLogin} UserLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UserLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int64();
                    break;
                case 2:
                    message.pwd = reader.string();
                    break;
                case 3:
                    message.token = reader.string();
                    break;
                case 4:
                    message.gameId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UserLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UserLogin} UserLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserLogin message.
         * @function verify
         * @memberof msg.UserLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                    return "uid: integer|Long expected";
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                if (!$util.isString(message.pwd))
                    return "pwd: string expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isString(message.gameId))
                    return "gameId: string expected";
            return null;
        };

        /**
         * Creates a UserLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UserLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UserLogin} UserLogin
         */
        UserLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UserLogin)
                return object;
            var message = new $root.msg.UserLogin();
            if (object.uid != null)
                if ($util.Long)
                    (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                else if (typeof object.uid === "string")
                    message.uid = parseInt(object.uid, 10);
                else if (typeof object.uid === "number")
                    message.uid = object.uid;
                else if (typeof object.uid === "object")
                    message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
            if (object.pwd != null)
                message.pwd = String(object.pwd);
            if (object.token != null)
                message.token = String(object.token);
            if (object.gameId != null)
                message.gameId = String(object.gameId);
            return message;
        };

        /**
         * Creates a plain object from a UserLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UserLogin
         * @static
         * @param {msg.UserLogin} message UserLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.uid = options.longs === String ? "0" : 0;
                object.pwd = "";
                object.token = "";
                object.gameId = "";
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (typeof message.uid === "number")
                    object.uid = options.longs === String ? String(message.uid) : message.uid;
                else
                    object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                object.pwd = message.pwd;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            return object;
        };

        /**
         * Converts this UserLogin to JSON.
         * @function toJSON
         * @memberof msg.UserLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserLogin;
    })();

    msg.UserLogout = (function() {

        /**
         * Properties of a UserLogout.
         * @memberof msg
         * @interface IUserLogout
         */

        /**
         * Constructs a new UserLogout.
         * @memberof msg
         * @classdesc Represents a UserLogout.
         * @implements IUserLogout
         * @constructor
         * @param {msg.IUserLogout=} [properties] Properties to set
         */
        function UserLogout(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new UserLogout instance using the specified properties.
         * @function create
         * @memberof msg.UserLogout
         * @static
         * @param {msg.IUserLogout=} [properties] Properties to set
         * @returns {msg.UserLogout} UserLogout instance
         */
        UserLogout.create = function create(properties) {
            return new UserLogout(properties);
        };

        /**
         * Encodes the specified UserLogout message. Does not implicitly {@link msg.UserLogout.verify|verify} messages.
         * @function encode
         * @memberof msg.UserLogout
         * @static
         * @param {msg.IUserLogout} message UserLogout message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLogout.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified UserLogout message, length delimited. Does not implicitly {@link msg.UserLogout.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UserLogout
         * @static
         * @param {msg.IUserLogout} message UserLogout message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserLogout.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserLogout message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UserLogout
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UserLogout} UserLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLogout.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UserLogout();
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
         * Decodes a UserLogout message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UserLogout
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UserLogout} UserLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserLogout.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserLogout message.
         * @function verify
         * @memberof msg.UserLogout
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserLogout.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a UserLogout message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UserLogout
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UserLogout} UserLogout
         */
        UserLogout.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UserLogout)
                return object;
            return new $root.msg.UserLogout();
        };

        /**
         * Creates a plain object from a UserLogout message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UserLogout
         * @static
         * @param {msg.UserLogout} message UserLogout
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserLogout.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this UserLogout to JSON.
         * @function toJSON
         * @memberof msg.UserLogout
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserLogout.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserLogout;
    })();

    msg.ClientBreath = (function() {

        /**
         * Properties of a ClientBreath.
         * @memberof msg
         * @interface IClientBreath
         */

        /**
         * Constructs a new ClientBreath.
         * @memberof msg
         * @classdesc Represents a ClientBreath.
         * @implements IClientBreath
         * @constructor
         * @param {msg.IClientBreath=} [properties] Properties to set
         */
        function ClientBreath(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new ClientBreath instance using the specified properties.
         * @function create
         * @memberof msg.ClientBreath
         * @static
         * @param {msg.IClientBreath=} [properties] Properties to set
         * @returns {msg.ClientBreath} ClientBreath instance
         */
        ClientBreath.create = function create(properties) {
            return new ClientBreath(properties);
        };

        /**
         * Encodes the specified ClientBreath message. Does not implicitly {@link msg.ClientBreath.verify|verify} messages.
         * @function encode
         * @memberof msg.ClientBreath
         * @static
         * @param {msg.IClientBreath} message ClientBreath message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientBreath.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified ClientBreath message, length delimited. Does not implicitly {@link msg.ClientBreath.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ClientBreath
         * @static
         * @param {msg.IClientBreath} message ClientBreath message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientBreath.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientBreath message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ClientBreath
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ClientBreath} ClientBreath
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientBreath.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ClientBreath();
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
         * Decodes a ClientBreath message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ClientBreath
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ClientBreath} ClientBreath
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientBreath.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientBreath message.
         * @function verify
         * @memberof msg.ClientBreath
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientBreath.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a ClientBreath message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ClientBreath
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ClientBreath} ClientBreath
         */
        ClientBreath.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ClientBreath)
                return object;
            return new $root.msg.ClientBreath();
        };

        /**
         * Creates a plain object from a ClientBreath message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ClientBreath
         * @static
         * @param {msg.ClientBreath} message ClientBreath
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientBreath.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ClientBreath to JSON.
         * @function toJSON
         * @memberof msg.ClientBreath
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientBreath.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ClientBreath;
    })();

    msg.RandomMatchReq = (function() {

        /**
         * Properties of a RandomMatchReq.
         * @memberof msg
         * @interface IRandomMatchReq
         * @property {number|null} [level] RandomMatchReq level
         */

        /**
         * Constructs a new RandomMatchReq.
         * @memberof msg
         * @classdesc Represents a RandomMatchReq.
         * @implements IRandomMatchReq
         * @constructor
         * @param {msg.IRandomMatchReq=} [properties] Properties to set
         */
        function RandomMatchReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RandomMatchReq level.
         * @member {number} level
         * @memberof msg.RandomMatchReq
         * @instance
         */
        RandomMatchReq.prototype.level = 0;

        /**
         * Creates a new RandomMatchReq instance using the specified properties.
         * @function create
         * @memberof msg.RandomMatchReq
         * @static
         * @param {msg.IRandomMatchReq=} [properties] Properties to set
         * @returns {msg.RandomMatchReq} RandomMatchReq instance
         */
        RandomMatchReq.create = function create(properties) {
            return new RandomMatchReq(properties);
        };

        /**
         * Encodes the specified RandomMatchReq message. Does not implicitly {@link msg.RandomMatchReq.verify|verify} messages.
         * @function encode
         * @memberof msg.RandomMatchReq
         * @static
         * @param {msg.IRandomMatchReq} message RandomMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RandomMatchReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.level != null && message.hasOwnProperty("level"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.level);
            return writer;
        };

        /**
         * Encodes the specified RandomMatchReq message, length delimited. Does not implicitly {@link msg.RandomMatchReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RandomMatchReq
         * @static
         * @param {msg.IRandomMatchReq} message RandomMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RandomMatchReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RandomMatchReq message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RandomMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RandomMatchReq} RandomMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RandomMatchReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RandomMatchReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.level = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RandomMatchReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RandomMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RandomMatchReq} RandomMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RandomMatchReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RandomMatchReq message.
         * @function verify
         * @memberof msg.RandomMatchReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RandomMatchReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.level != null && message.hasOwnProperty("level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            return null;
        };

        /**
         * Creates a RandomMatchReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RandomMatchReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RandomMatchReq} RandomMatchReq
         */
        RandomMatchReq.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RandomMatchReq)
                return object;
            var message = new $root.msg.RandomMatchReq();
            if (object.level != null)
                message.level = object.level | 0;
            return message;
        };

        /**
         * Creates a plain object from a RandomMatchReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RandomMatchReq
         * @static
         * @param {msg.RandomMatchReq} message RandomMatchReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RandomMatchReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.level = 0;
            if (message.level != null && message.hasOwnProperty("level"))
                object.level = message.level;
            return object;
        };

        /**
         * Converts this RandomMatchReq to JSON.
         * @function toJSON
         * @memberof msg.RandomMatchReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RandomMatchReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RandomMatchReq;
    })();

    msg.RecoverGameScene = (function() {

        /**
         * Properties of a RecoverGameScene.
         * @memberof msg
         * @interface IRecoverGameScene
         */

        /**
         * Constructs a new RecoverGameScene.
         * @memberof msg
         * @classdesc Represents a RecoverGameScene.
         * @implements IRecoverGameScene
         * @constructor
         * @param {msg.IRecoverGameScene=} [properties] Properties to set
         */
        function RecoverGameScene(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RecoverGameScene instance using the specified properties.
         * @function create
         * @memberof msg.RecoverGameScene
         * @static
         * @param {msg.IRecoverGameScene=} [properties] Properties to set
         * @returns {msg.RecoverGameScene} RecoverGameScene instance
         */
        RecoverGameScene.create = function create(properties) {
            return new RecoverGameScene(properties);
        };

        /**
         * Encodes the specified RecoverGameScene message. Does not implicitly {@link msg.RecoverGameScene.verify|verify} messages.
         * @function encode
         * @memberof msg.RecoverGameScene
         * @static
         * @param {msg.IRecoverGameScene} message RecoverGameScene message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RecoverGameScene.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RecoverGameScene message, length delimited. Does not implicitly {@link msg.RecoverGameScene.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RecoverGameScene
         * @static
         * @param {msg.IRecoverGameScene} message RecoverGameScene message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RecoverGameScene.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RecoverGameScene message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RecoverGameScene
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RecoverGameScene} RecoverGameScene
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RecoverGameScene.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RecoverGameScene();
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
         * Decodes a RecoverGameScene message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RecoverGameScene
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RecoverGameScene} RecoverGameScene
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RecoverGameScene.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RecoverGameScene message.
         * @function verify
         * @memberof msg.RecoverGameScene
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RecoverGameScene.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RecoverGameScene message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RecoverGameScene
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RecoverGameScene} RecoverGameScene
         */
        RecoverGameScene.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RecoverGameScene)
                return object;
            return new $root.msg.RecoverGameScene();
        };

        /**
         * Creates a plain object from a RecoverGameScene message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RecoverGameScene
         * @static
         * @param {msg.RecoverGameScene} message RecoverGameScene
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RecoverGameScene.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RecoverGameScene to JSON.
         * @function toJSON
         * @memberof msg.RecoverGameScene
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RecoverGameScene.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RecoverGameScene;
    })();

    msg.LeaveRoomReq = (function() {

        /**
         * Properties of a LeaveRoomReq.
         * @memberof msg
         * @interface ILeaveRoomReq
         */

        /**
         * Constructs a new LeaveRoomReq.
         * @memberof msg
         * @classdesc Represents a LeaveRoomReq.
         * @implements ILeaveRoomReq
         * @constructor
         * @param {msg.ILeaveRoomReq=} [properties] Properties to set
         */
        function LeaveRoomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new LeaveRoomReq instance using the specified properties.
         * @function create
         * @memberof msg.LeaveRoomReq
         * @static
         * @param {msg.ILeaveRoomReq=} [properties] Properties to set
         * @returns {msg.LeaveRoomReq} LeaveRoomReq instance
         */
        LeaveRoomReq.create = function create(properties) {
            return new LeaveRoomReq(properties);
        };

        /**
         * Encodes the specified LeaveRoomReq message. Does not implicitly {@link msg.LeaveRoomReq.verify|verify} messages.
         * @function encode
         * @memberof msg.LeaveRoomReq
         * @static
         * @param {msg.ILeaveRoomReq} message LeaveRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified LeaveRoomReq message, length delimited. Does not implicitly {@link msg.LeaveRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LeaveRoomReq
         * @static
         * @param {msg.ILeaveRoomReq} message LeaveRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeaveRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LeaveRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LeaveRoomReq} LeaveRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LeaveRoomReq();
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
         * Decodes a LeaveRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LeaveRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LeaveRoomReq} LeaveRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveRoomReq message.
         * @function verify
         * @memberof msg.LeaveRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a LeaveRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LeaveRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LeaveRoomReq} LeaveRoomReq
         */
        LeaveRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LeaveRoomReq)
                return object;
            return new $root.msg.LeaveRoomReq();
        };

        /**
         * Creates a plain object from a LeaveRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LeaveRoomReq
         * @static
         * @param {msg.LeaveRoomReq} message LeaveRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveRoomReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this LeaveRoomReq to JSON.
         * @function toJSON
         * @memberof msg.LeaveRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LeaveRoomReq;
    })();

    msg.CompeteBanker = (function() {

        /**
         * Properties of a CompeteBanker.
         * @memberof msg
         * @interface ICompeteBanker
         * @property {number|null} [multiple] CompeteBanker multiple
         */

        /**
         * Constructs a new CompeteBanker.
         * @memberof msg
         * @classdesc Represents a CompeteBanker.
         * @implements ICompeteBanker
         * @constructor
         * @param {msg.ICompeteBanker=} [properties] Properties to set
         */
        function CompeteBanker(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CompeteBanker multiple.
         * @member {number} multiple
         * @memberof msg.CompeteBanker
         * @instance
         */
        CompeteBanker.prototype.multiple = 0;

        /**
         * Creates a new CompeteBanker instance using the specified properties.
         * @function create
         * @memberof msg.CompeteBanker
         * @static
         * @param {msg.ICompeteBanker=} [properties] Properties to set
         * @returns {msg.CompeteBanker} CompeteBanker instance
         */
        CompeteBanker.create = function create(properties) {
            return new CompeteBanker(properties);
        };

        /**
         * Encodes the specified CompeteBanker message. Does not implicitly {@link msg.CompeteBanker.verify|verify} messages.
         * @function encode
         * @memberof msg.CompeteBanker
         * @static
         * @param {msg.ICompeteBanker} message CompeteBanker message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompeteBanker.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.multiple);
            return writer;
        };

        /**
         * Encodes the specified CompeteBanker message, length delimited. Does not implicitly {@link msg.CompeteBanker.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.CompeteBanker
         * @static
         * @param {msg.ICompeteBanker} message CompeteBanker message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompeteBanker.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CompeteBanker message from the specified reader or buffer.
         * @function decode
         * @memberof msg.CompeteBanker
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.CompeteBanker} CompeteBanker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompeteBanker.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.CompeteBanker();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.multiple = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CompeteBanker message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.CompeteBanker
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.CompeteBanker} CompeteBanker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompeteBanker.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CompeteBanker message.
         * @function verify
         * @memberof msg.CompeteBanker
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CompeteBanker.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                if (!$util.isInteger(message.multiple))
                    return "multiple: integer expected";
            return null;
        };

        /**
         * Creates a CompeteBanker message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.CompeteBanker
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.CompeteBanker} CompeteBanker
         */
        CompeteBanker.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.CompeteBanker)
                return object;
            var message = new $root.msg.CompeteBanker();
            if (object.multiple != null)
                message.multiple = object.multiple | 0;
            return message;
        };

        /**
         * Creates a plain object from a CompeteBanker message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.CompeteBanker
         * @static
         * @param {msg.CompeteBanker} message CompeteBanker
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CompeteBanker.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.multiple = 0;
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                object.multiple = message.multiple;
            return object;
        };

        /**
         * Converts this CompeteBanker to JSON.
         * @function toJSON
         * @memberof msg.CompeteBanker
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CompeteBanker.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CompeteBanker;
    })();

    msg.PlayerSelectBet = (function() {

        /**
         * Properties of a PlayerSelectBet.
         * @memberof msg
         * @interface IPlayerSelectBet
         * @property {number|null} [multiple] PlayerSelectBet multiple
         */

        /**
         * Constructs a new PlayerSelectBet.
         * @memberof msg
         * @classdesc Represents a PlayerSelectBet.
         * @implements IPlayerSelectBet
         * @constructor
         * @param {msg.IPlayerSelectBet=} [properties] Properties to set
         */
        function PlayerSelectBet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerSelectBet multiple.
         * @member {number} multiple
         * @memberof msg.PlayerSelectBet
         * @instance
         */
        PlayerSelectBet.prototype.multiple = 0;

        /**
         * Creates a new PlayerSelectBet instance using the specified properties.
         * @function create
         * @memberof msg.PlayerSelectBet
         * @static
         * @param {msg.IPlayerSelectBet=} [properties] Properties to set
         * @returns {msg.PlayerSelectBet} PlayerSelectBet instance
         */
        PlayerSelectBet.create = function create(properties) {
            return new PlayerSelectBet(properties);
        };

        /**
         * Encodes the specified PlayerSelectBet message. Does not implicitly {@link msg.PlayerSelectBet.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerSelectBet
         * @static
         * @param {msg.IPlayerSelectBet} message PlayerSelectBet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerSelectBet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.multiple);
            return writer;
        };

        /**
         * Encodes the specified PlayerSelectBet message, length delimited. Does not implicitly {@link msg.PlayerSelectBet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerSelectBet
         * @static
         * @param {msg.IPlayerSelectBet} message PlayerSelectBet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerSelectBet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerSelectBet message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerSelectBet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerSelectBet} PlayerSelectBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerSelectBet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerSelectBet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.multiple = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerSelectBet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerSelectBet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerSelectBet} PlayerSelectBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerSelectBet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerSelectBet message.
         * @function verify
         * @memberof msg.PlayerSelectBet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerSelectBet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                if (!$util.isInteger(message.multiple))
                    return "multiple: integer expected";
            return null;
        };

        /**
         * Creates a PlayerSelectBet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerSelectBet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerSelectBet} PlayerSelectBet
         */
        PlayerSelectBet.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerSelectBet)
                return object;
            var message = new $root.msg.PlayerSelectBet();
            if (object.multiple != null)
                message.multiple = object.multiple | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerSelectBet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerSelectBet
         * @static
         * @param {msg.PlayerSelectBet} message PlayerSelectBet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerSelectBet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.multiple = 0;
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                object.multiple = message.multiple;
            return object;
        };

        /**
         * Converts this PlayerSelectBet to JSON.
         * @function toJSON
         * @memberof msg.PlayerSelectBet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerSelectBet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerSelectBet;
    })();

    msg.S2C = (function() {

        /**
         * Properties of a S2C.
         * @memberof msg
         * @interface IS2C
         * @property {number|null} [code] S2C code
         * @property {Uint8Array|null} [data] S2C data
         */

        /**
         * Constructs a new S2C.
         * @memberof msg
         * @classdesc Represents a S2C.
         * @implements IS2C
         * @constructor
         * @param {msg.IS2C=} [properties] Properties to set
         */
        function S2C(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C code.
         * @member {number} code
         * @memberof msg.S2C
         * @instance
         */
        S2C.prototype.code = 0;

        /**
         * S2C data.
         * @member {Uint8Array} data
         * @memberof msg.S2C
         * @instance
         */
        S2C.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new S2C instance using the specified properties.
         * @function create
         * @memberof msg.S2C
         * @static
         * @param {msg.IS2C=} [properties] Properties to set
         * @returns {msg.S2C} S2C instance
         */
        S2C.create = function create(properties) {
            return new S2C(properties);
        };

        /**
         * Encodes the specified S2C message. Does not implicitly {@link msg.S2C.verify|verify} messages.
         * @function encode
         * @memberof msg.S2C
         * @static
         * @param {msg.IS2C} message S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.data != null && message.hasOwnProperty("data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified S2C message, length delimited. Does not implicitly {@link msg.S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.S2C
         * @static
         * @param {msg.IS2C} message S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C message from the specified reader or buffer.
         * @function decode
         * @memberof msg.S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.S2C} S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.S2C();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.S2C} S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C message.
         * @function verify
         * @memberof msg.S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.S2C} S2C
         */
        S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.S2C)
                return object;
            var message = new $root.msg.S2C();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.S2C
         * @static
         * @param {msg.S2C} message S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this S2C to JSON.
         * @function toJSON
         * @memberof msg.S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C;
    })();

    msg.RoomTypeInfo = (function() {

        /**
         * Properties of a RoomTypeInfo.
         * @memberof msg
         * @interface IRoomTypeInfo
         * @property {number|null} [level] RoomTypeInfo level
         * @property {number|null} [minLimit] RoomTypeInfo minLimit
         * @property {number|null} [baseMoney] RoomTypeInfo baseMoney
         * @property {string|null} [name] RoomTypeInfo name
         */

        /**
         * Constructs a new RoomTypeInfo.
         * @memberof msg
         * @classdesc Represents a RoomTypeInfo.
         * @implements IRoomTypeInfo
         * @constructor
         * @param {msg.IRoomTypeInfo=} [properties] Properties to set
         */
        function RoomTypeInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomTypeInfo level.
         * @member {number} level
         * @memberof msg.RoomTypeInfo
         * @instance
         */
        RoomTypeInfo.prototype.level = 0;

        /**
         * RoomTypeInfo minLimit.
         * @member {number} minLimit
         * @memberof msg.RoomTypeInfo
         * @instance
         */
        RoomTypeInfo.prototype.minLimit = 0;

        /**
         * RoomTypeInfo baseMoney.
         * @member {number} baseMoney
         * @memberof msg.RoomTypeInfo
         * @instance
         */
        RoomTypeInfo.prototype.baseMoney = 0;

        /**
         * RoomTypeInfo name.
         * @member {string} name
         * @memberof msg.RoomTypeInfo
         * @instance
         */
        RoomTypeInfo.prototype.name = "";

        /**
         * Creates a new RoomTypeInfo instance using the specified properties.
         * @function create
         * @memberof msg.RoomTypeInfo
         * @static
         * @param {msg.IRoomTypeInfo=} [properties] Properties to set
         * @returns {msg.RoomTypeInfo} RoomTypeInfo instance
         */
        RoomTypeInfo.create = function create(properties) {
            return new RoomTypeInfo(properties);
        };

        /**
         * Encodes the specified RoomTypeInfo message. Does not implicitly {@link msg.RoomTypeInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomTypeInfo
         * @static
         * @param {msg.IRoomTypeInfo} message RoomTypeInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomTypeInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.level != null && message.hasOwnProperty("level"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.level);
            if (message.minLimit != null && message.hasOwnProperty("minLimit"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.minLimit);
            if (message.baseMoney != null && message.hasOwnProperty("baseMoney"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.baseMoney);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified RoomTypeInfo message, length delimited. Does not implicitly {@link msg.RoomTypeInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomTypeInfo
         * @static
         * @param {msg.IRoomTypeInfo} message RoomTypeInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomTypeInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomTypeInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomTypeInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomTypeInfo} RoomTypeInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomTypeInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomTypeInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.level = reader.int32();
                    break;
                case 2:
                    message.minLimit = reader.double();
                    break;
                case 3:
                    message.baseMoney = reader.double();
                    break;
                case 4:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomTypeInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomTypeInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomTypeInfo} RoomTypeInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomTypeInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomTypeInfo message.
         * @function verify
         * @memberof msg.RoomTypeInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomTypeInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.level != null && message.hasOwnProperty("level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            if (message.minLimit != null && message.hasOwnProperty("minLimit"))
                if (typeof message.minLimit !== "number")
                    return "minLimit: number expected";
            if (message.baseMoney != null && message.hasOwnProperty("baseMoney"))
                if (typeof message.baseMoney !== "number")
                    return "baseMoney: number expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a RoomTypeInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomTypeInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomTypeInfo} RoomTypeInfo
         */
        RoomTypeInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomTypeInfo)
                return object;
            var message = new $root.msg.RoomTypeInfo();
            if (object.level != null)
                message.level = object.level | 0;
            if (object.minLimit != null)
                message.minLimit = Number(object.minLimit);
            if (object.baseMoney != null)
                message.baseMoney = Number(object.baseMoney);
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a RoomTypeInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomTypeInfo
         * @static
         * @param {msg.RoomTypeInfo} message RoomTypeInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomTypeInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.level = 0;
                object.minLimit = 0;
                object.baseMoney = 0;
                object.name = "";
            }
            if (message.level != null && message.hasOwnProperty("level"))
                object.level = message.level;
            if (message.minLimit != null && message.hasOwnProperty("minLimit"))
                object.minLimit = options.json && !isFinite(message.minLimit) ? String(message.minLimit) : message.minLimit;
            if (message.baseMoney != null && message.hasOwnProperty("baseMoney"))
                object.baseMoney = options.json && !isFinite(message.baseMoney) ? String(message.baseMoney) : message.baseMoney;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this RoomTypeInfo to JSON.
         * @function toJSON
         * @memberof msg.RoomTypeInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomTypeInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomTypeInfo;
    })();

    msg.PlayerBaseInfo = (function() {

        /**
         * Properties of a PlayerBaseInfo.
         * @memberof msg
         * @interface IPlayerBaseInfo
         * @property {number|null} [money] PlayerBaseInfo money
         * @property {string|null} [nick] PlayerBaseInfo nick
         * @property {string|null} [avatarUrl] PlayerBaseInfo avatarUrl
         */

        /**
         * Constructs a new PlayerBaseInfo.
         * @memberof msg
         * @classdesc Represents a PlayerBaseInfo.
         * @implements IPlayerBaseInfo
         * @constructor
         * @param {msg.IPlayerBaseInfo=} [properties] Properties to set
         */
        function PlayerBaseInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerBaseInfo money.
         * @member {number} money
         * @memberof msg.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.money = 0;

        /**
         * PlayerBaseInfo nick.
         * @member {string} nick
         * @memberof msg.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.nick = "";

        /**
         * PlayerBaseInfo avatarUrl.
         * @member {string} avatarUrl
         * @memberof msg.PlayerBaseInfo
         * @instance
         */
        PlayerBaseInfo.prototype.avatarUrl = "";

        /**
         * Creates a new PlayerBaseInfo instance using the specified properties.
         * @function create
         * @memberof msg.PlayerBaseInfo
         * @static
         * @param {msg.IPlayerBaseInfo=} [properties] Properties to set
         * @returns {msg.PlayerBaseInfo} PlayerBaseInfo instance
         */
        PlayerBaseInfo.create = function create(properties) {
            return new PlayerBaseInfo(properties);
        };

        /**
         * Encodes the specified PlayerBaseInfo message. Does not implicitly {@link msg.PlayerBaseInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerBaseInfo
         * @static
         * @param {msg.IPlayerBaseInfo} message PlayerBaseInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBaseInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.money != null && message.hasOwnProperty("money"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.money);
            if (message.nick != null && message.hasOwnProperty("nick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nick);
            if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatarUrl);
            return writer;
        };

        /**
         * Encodes the specified PlayerBaseInfo message, length delimited. Does not implicitly {@link msg.PlayerBaseInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerBaseInfo
         * @static
         * @param {msg.IPlayerBaseInfo} message PlayerBaseInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBaseInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerBaseInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerBaseInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerBaseInfo} PlayerBaseInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBaseInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerBaseInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.money = reader.double();
                    break;
                case 2:
                    message.nick = reader.string();
                    break;
                case 3:
                    message.avatarUrl = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerBaseInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerBaseInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerBaseInfo} PlayerBaseInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBaseInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerBaseInfo message.
         * @function verify
         * @memberof msg.PlayerBaseInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerBaseInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.money != null && message.hasOwnProperty("money"))
                if (typeof message.money !== "number")
                    return "money: number expected";
            if (message.nick != null && message.hasOwnProperty("nick"))
                if (!$util.isString(message.nick))
                    return "nick: string expected";
            if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                if (!$util.isString(message.avatarUrl))
                    return "avatarUrl: string expected";
            return null;
        };

        /**
         * Creates a PlayerBaseInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerBaseInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerBaseInfo} PlayerBaseInfo
         */
        PlayerBaseInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerBaseInfo)
                return object;
            var message = new $root.msg.PlayerBaseInfo();
            if (object.money != null)
                message.money = Number(object.money);
            if (object.nick != null)
                message.nick = String(object.nick);
            if (object.avatarUrl != null)
                message.avatarUrl = String(object.avatarUrl);
            return message;
        };

        /**
         * Creates a plain object from a PlayerBaseInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerBaseInfo
         * @static
         * @param {msg.PlayerBaseInfo} message PlayerBaseInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerBaseInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.money = 0;
                object.nick = "";
                object.avatarUrl = "";
            }
            if (message.money != null && message.hasOwnProperty("money"))
                object.money = options.json && !isFinite(message.money) ? String(message.money) : message.money;
            if (message.nick != null && message.hasOwnProperty("nick"))
                object.nick = message.nick;
            if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                object.avatarUrl = message.avatarUrl;
            return object;
        };

        /**
         * Converts this PlayerBaseInfo to JSON.
         * @function toJSON
         * @memberof msg.PlayerBaseInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerBaseInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerBaseInfo;
    })();

    msg.PlayerLoginResp = (function() {

        /**
         * Properties of a PlayerLoginResp.
         * @memberof msg
         * @interface IPlayerLoginResp
         * @property {number|Long|null} [uid] PlayerLoginResp uid
         * @property {msg.IPlayerBaseInfo|null} [playerInfo] PlayerLoginResp playerInfo
         * @property {Array.<msg.IRoomTypeInfo>|null} [roomTypeList] PlayerLoginResp roomTypeList
         */

        /**
         * Constructs a new PlayerLoginResp.
         * @memberof msg
         * @classdesc Represents a PlayerLoginResp.
         * @implements IPlayerLoginResp
         * @constructor
         * @param {msg.IPlayerLoginResp=} [properties] Properties to set
         */
        function PlayerLoginResp(properties) {
            this.roomTypeList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerLoginResp uid.
         * @member {number|Long} uid
         * @memberof msg.PlayerLoginResp
         * @instance
         */
        PlayerLoginResp.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PlayerLoginResp playerInfo.
         * @member {msg.IPlayerBaseInfo|null|undefined} playerInfo
         * @memberof msg.PlayerLoginResp
         * @instance
         */
        PlayerLoginResp.prototype.playerInfo = null;

        /**
         * PlayerLoginResp roomTypeList.
         * @member {Array.<msg.IRoomTypeInfo>} roomTypeList
         * @memberof msg.PlayerLoginResp
         * @instance
         */
        PlayerLoginResp.prototype.roomTypeList = $util.emptyArray;

        /**
         * Creates a new PlayerLoginResp instance using the specified properties.
         * @function create
         * @memberof msg.PlayerLoginResp
         * @static
         * @param {msg.IPlayerLoginResp=} [properties] Properties to set
         * @returns {msg.PlayerLoginResp} PlayerLoginResp instance
         */
        PlayerLoginResp.create = function create(properties) {
            return new PlayerLoginResp(properties);
        };

        /**
         * Encodes the specified PlayerLoginResp message. Does not implicitly {@link msg.PlayerLoginResp.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerLoginResp
         * @static
         * @param {msg.IPlayerLoginResp} message PlayerLoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerLoginResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.uid);
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                $root.msg.PlayerBaseInfo.encode(message.playerInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.roomTypeList != null && message.roomTypeList.length)
                for (var i = 0; i < message.roomTypeList.length; ++i)
                    $root.msg.RoomTypeInfo.encode(message.roomTypeList[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerLoginResp message, length delimited. Does not implicitly {@link msg.PlayerLoginResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerLoginResp
         * @static
         * @param {msg.IPlayerLoginResp} message PlayerLoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerLoginResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerLoginResp message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerLoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerLoginResp} PlayerLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerLoginResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerLoginResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.int64();
                    break;
                case 2:
                    message.playerInfo = $root.msg.PlayerBaseInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.roomTypeList && message.roomTypeList.length))
                        message.roomTypeList = [];
                    message.roomTypeList.push($root.msg.RoomTypeInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerLoginResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerLoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerLoginResp} PlayerLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerLoginResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerLoginResp message.
         * @function verify
         * @memberof msg.PlayerLoginResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerLoginResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                    return "uid: integer|Long expected";
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo")) {
                var error = $root.msg.PlayerBaseInfo.verify(message.playerInfo);
                if (error)
                    return "playerInfo." + error;
            }
            if (message.roomTypeList != null && message.hasOwnProperty("roomTypeList")) {
                if (!Array.isArray(message.roomTypeList))
                    return "roomTypeList: array expected";
                for (var i = 0; i < message.roomTypeList.length; ++i) {
                    var error = $root.msg.RoomTypeInfo.verify(message.roomTypeList[i]);
                    if (error)
                        return "roomTypeList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PlayerLoginResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerLoginResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerLoginResp} PlayerLoginResp
         */
        PlayerLoginResp.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerLoginResp)
                return object;
            var message = new $root.msg.PlayerLoginResp();
            if (object.uid != null)
                if ($util.Long)
                    (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                else if (typeof object.uid === "string")
                    message.uid = parseInt(object.uid, 10);
                else if (typeof object.uid === "number")
                    message.uid = object.uid;
                else if (typeof object.uid === "object")
                    message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
            if (object.playerInfo != null) {
                if (typeof object.playerInfo !== "object")
                    throw TypeError(".msg.PlayerLoginResp.playerInfo: object expected");
                message.playerInfo = $root.msg.PlayerBaseInfo.fromObject(object.playerInfo);
            }
            if (object.roomTypeList) {
                if (!Array.isArray(object.roomTypeList))
                    throw TypeError(".msg.PlayerLoginResp.roomTypeList: array expected");
                message.roomTypeList = [];
                for (var i = 0; i < object.roomTypeList.length; ++i) {
                    if (typeof object.roomTypeList[i] !== "object")
                        throw TypeError(".msg.PlayerLoginResp.roomTypeList: object expected");
                    message.roomTypeList[i] = $root.msg.RoomTypeInfo.fromObject(object.roomTypeList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerLoginResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerLoginResp
         * @static
         * @param {msg.PlayerLoginResp} message PlayerLoginResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerLoginResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.roomTypeList = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.uid = options.longs === String ? "0" : 0;
                object.playerInfo = null;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (typeof message.uid === "number")
                    object.uid = options.longs === String ? String(message.uid) : message.uid;
                else
                    object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                object.playerInfo = $root.msg.PlayerBaseInfo.toObject(message.playerInfo, options);
            if (message.roomTypeList && message.roomTypeList.length) {
                object.roomTypeList = [];
                for (var j = 0; j < message.roomTypeList.length; ++j)
                    object.roomTypeList[j] = $root.msg.RoomTypeInfo.toObject(message.roomTypeList[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerLoginResp to JSON.
         * @function toJSON
         * @memberof msg.PlayerLoginResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerLoginResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerLoginResp;
    })();

    msg.LeaveRoomResp = (function() {

        /**
         * Properties of a LeaveRoomResp.
         * @memberof msg
         * @interface ILeaveRoomResp
         * @property {number|null} [chair] LeaveRoomResp chair
         */

        /**
         * Constructs a new LeaveRoomResp.
         * @memberof msg
         * @classdesc Represents a LeaveRoomResp.
         * @implements ILeaveRoomResp
         * @constructor
         * @param {msg.ILeaveRoomResp=} [properties] Properties to set
         */
        function LeaveRoomResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LeaveRoomResp chair.
         * @member {number} chair
         * @memberof msg.LeaveRoomResp
         * @instance
         */
        LeaveRoomResp.prototype.chair = 0;

        /**
         * Creates a new LeaveRoomResp instance using the specified properties.
         * @function create
         * @memberof msg.LeaveRoomResp
         * @static
         * @param {msg.ILeaveRoomResp=} [properties] Properties to set
         * @returns {msg.LeaveRoomResp} LeaveRoomResp instance
         */
        LeaveRoomResp.create = function create(properties) {
            return new LeaveRoomResp(properties);
        };

        /**
         * Encodes the specified LeaveRoomResp message. Does not implicitly {@link msg.LeaveRoomResp.verify|verify} messages.
         * @function encode
         * @memberof msg.LeaveRoomResp
         * @static
         * @param {msg.ILeaveRoomResp} message LeaveRoomResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chair != null && message.hasOwnProperty("chair"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chair);
            return writer;
        };

        /**
         * Encodes the specified LeaveRoomResp message, length delimited. Does not implicitly {@link msg.LeaveRoomResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LeaveRoomResp
         * @static
         * @param {msg.ILeaveRoomResp} message LeaveRoomResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeaveRoomResp message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LeaveRoomResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LeaveRoomResp} LeaveRoomResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LeaveRoomResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chair = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LeaveRoomResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LeaveRoomResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LeaveRoomResp} LeaveRoomResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveRoomResp message.
         * @function verify
         * @memberof msg.LeaveRoomResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveRoomResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chair != null && message.hasOwnProperty("chair"))
                if (!$util.isInteger(message.chair))
                    return "chair: integer expected";
            return null;
        };

        /**
         * Creates a LeaveRoomResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LeaveRoomResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LeaveRoomResp} LeaveRoomResp
         */
        LeaveRoomResp.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LeaveRoomResp)
                return object;
            var message = new $root.msg.LeaveRoomResp();
            if (object.chair != null)
                message.chair = object.chair | 0;
            return message;
        };

        /**
         * Creates a plain object from a LeaveRoomResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LeaveRoomResp
         * @static
         * @param {msg.LeaveRoomResp} message LeaveRoomResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveRoomResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chair = 0;
            if (message.chair != null && message.hasOwnProperty("chair"))
                object.chair = message.chair;
            return object;
        };

        /**
         * Converts this LeaveRoomResp to JSON.
         * @function toJSON
         * @memberof msg.LeaveRoomResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveRoomResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LeaveRoomResp;
    })();

    msg.RandomMatchResp = (function() {

        /**
         * Properties of a RandomMatchResp.
         * @memberof msg
         * @interface IRandomMatchResp
         * @property {number|null} [level] RandomMatchResp level
         */

        /**
         * Constructs a new RandomMatchResp.
         * @memberof msg
         * @classdesc Represents a RandomMatchResp.
         * @implements IRandomMatchResp
         * @constructor
         * @param {msg.IRandomMatchResp=} [properties] Properties to set
         */
        function RandomMatchResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RandomMatchResp level.
         * @member {number} level
         * @memberof msg.RandomMatchResp
         * @instance
         */
        RandomMatchResp.prototype.level = 0;

        /**
         * Creates a new RandomMatchResp instance using the specified properties.
         * @function create
         * @memberof msg.RandomMatchResp
         * @static
         * @param {msg.IRandomMatchResp=} [properties] Properties to set
         * @returns {msg.RandomMatchResp} RandomMatchResp instance
         */
        RandomMatchResp.create = function create(properties) {
            return new RandomMatchResp(properties);
        };

        /**
         * Encodes the specified RandomMatchResp message. Does not implicitly {@link msg.RandomMatchResp.verify|verify} messages.
         * @function encode
         * @memberof msg.RandomMatchResp
         * @static
         * @param {msg.IRandomMatchResp} message RandomMatchResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RandomMatchResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.level != null && message.hasOwnProperty("level"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.level);
            return writer;
        };

        /**
         * Encodes the specified RandomMatchResp message, length delimited. Does not implicitly {@link msg.RandomMatchResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RandomMatchResp
         * @static
         * @param {msg.IRandomMatchResp} message RandomMatchResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RandomMatchResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RandomMatchResp message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RandomMatchResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RandomMatchResp} RandomMatchResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RandomMatchResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RandomMatchResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.level = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RandomMatchResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RandomMatchResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RandomMatchResp} RandomMatchResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RandomMatchResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RandomMatchResp message.
         * @function verify
         * @memberof msg.RandomMatchResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RandomMatchResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.level != null && message.hasOwnProperty("level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            return null;
        };

        /**
         * Creates a RandomMatchResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RandomMatchResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RandomMatchResp} RandomMatchResp
         */
        RandomMatchResp.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RandomMatchResp)
                return object;
            var message = new $root.msg.RandomMatchResp();
            if (object.level != null)
                message.level = object.level | 0;
            return message;
        };

        /**
         * Creates a plain object from a RandomMatchResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RandomMatchResp
         * @static
         * @param {msg.RandomMatchResp} message RandomMatchResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RandomMatchResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.level = 0;
            if (message.level != null && message.hasOwnProperty("level"))
                object.level = message.level;
            return object;
        };

        /**
         * Converts this RandomMatchResp to JSON.
         * @function toJSON
         * @memberof msg.RandomMatchResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RandomMatchResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RandomMatchResp;
    })();

    msg.DeskPlayer = (function() {

        /**
         * Properties of a DeskPlayer.
         * @memberof msg
         * @interface IDeskPlayer
         * @property {number|null} [chair] DeskPlayer chair
         * @property {msg.IPlayerBaseInfo|null} [playerInfo] DeskPlayer playerInfo
         */

        /**
         * Constructs a new DeskPlayer.
         * @memberof msg
         * @classdesc Represents a DeskPlayer.
         * @implements IDeskPlayer
         * @constructor
         * @param {msg.IDeskPlayer=} [properties] Properties to set
         */
        function DeskPlayer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeskPlayer chair.
         * @member {number} chair
         * @memberof msg.DeskPlayer
         * @instance
         */
        DeskPlayer.prototype.chair = 0;

        /**
         * DeskPlayer playerInfo.
         * @member {msg.IPlayerBaseInfo|null|undefined} playerInfo
         * @memberof msg.DeskPlayer
         * @instance
         */
        DeskPlayer.prototype.playerInfo = null;

        /**
         * Creates a new DeskPlayer instance using the specified properties.
         * @function create
         * @memberof msg.DeskPlayer
         * @static
         * @param {msg.IDeskPlayer=} [properties] Properties to set
         * @returns {msg.DeskPlayer} DeskPlayer instance
         */
        DeskPlayer.create = function create(properties) {
            return new DeskPlayer(properties);
        };

        /**
         * Encodes the specified DeskPlayer message. Does not implicitly {@link msg.DeskPlayer.verify|verify} messages.
         * @function encode
         * @memberof msg.DeskPlayer
         * @static
         * @param {msg.IDeskPlayer} message DeskPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeskPlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chair != null && message.hasOwnProperty("chair"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chair);
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                $root.msg.PlayerBaseInfo.encode(message.playerInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DeskPlayer message, length delimited. Does not implicitly {@link msg.DeskPlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.DeskPlayer
         * @static
         * @param {msg.IDeskPlayer} message DeskPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeskPlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeskPlayer message from the specified reader or buffer.
         * @function decode
         * @memberof msg.DeskPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.DeskPlayer} DeskPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeskPlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.DeskPlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chair = reader.int32();
                    break;
                case 2:
                    message.playerInfo = $root.msg.PlayerBaseInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeskPlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.DeskPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.DeskPlayer} DeskPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeskPlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeskPlayer message.
         * @function verify
         * @memberof msg.DeskPlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeskPlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chair != null && message.hasOwnProperty("chair"))
                if (!$util.isInteger(message.chair))
                    return "chair: integer expected";
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo")) {
                var error = $root.msg.PlayerBaseInfo.verify(message.playerInfo);
                if (error)
                    return "playerInfo." + error;
            }
            return null;
        };

        /**
         * Creates a DeskPlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.DeskPlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.DeskPlayer} DeskPlayer
         */
        DeskPlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.DeskPlayer)
                return object;
            var message = new $root.msg.DeskPlayer();
            if (object.chair != null)
                message.chair = object.chair | 0;
            if (object.playerInfo != null) {
                if (typeof object.playerInfo !== "object")
                    throw TypeError(".msg.DeskPlayer.playerInfo: object expected");
                message.playerInfo = $root.msg.PlayerBaseInfo.fromObject(object.playerInfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a DeskPlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.DeskPlayer
         * @static
         * @param {msg.DeskPlayer} message DeskPlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeskPlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chair = 0;
                object.playerInfo = null;
            }
            if (message.chair != null && message.hasOwnProperty("chair"))
                object.chair = message.chair;
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                object.playerInfo = $root.msg.PlayerBaseInfo.toObject(message.playerInfo, options);
            return object;
        };

        /**
         * Converts this DeskPlayer to JSON.
         * @function toJSON
         * @memberof msg.DeskPlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeskPlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DeskPlayer;
    })();

    msg.PlayerInfoWhenGaming = (function() {

        /**
         * Properties of a PlayerInfoWhenGaming.
         * @memberof msg
         * @interface IPlayerInfoWhenGaming
         * @property {number|null} [chair] PlayerInfoWhenGaming chair
         * @property {number|null} [multiple] PlayerInfoWhenGaming multiple
         * @property {number|null} [cardType] PlayerInfoWhenGaming cardType
         * @property {boolean|null} [isInGame] PlayerInfoWhenGaming isInGame
         * @property {Uint8Array|null} [cards] PlayerInfoWhenGaming cards
         * @property {number|null} [change] PlayerInfoWhenGaming change
         * @property {msg.IPlayerBaseInfo|null} [playerInfo] PlayerInfoWhenGaming playerInfo
         */

        /**
         * Constructs a new PlayerInfoWhenGaming.
         * @memberof msg
         * @classdesc Represents a PlayerInfoWhenGaming.
         * @implements IPlayerInfoWhenGaming
         * @constructor
         * @param {msg.IPlayerInfoWhenGaming=} [properties] Properties to set
         */
        function PlayerInfoWhenGaming(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfoWhenGaming chair.
         * @member {number} chair
         * @memberof msg.PlayerInfoWhenGaming
         * @instance
         */
        PlayerInfoWhenGaming.prototype.chair = 0;

        /**
         * PlayerInfoWhenGaming multiple.
         * @member {number} multiple
         * @memberof msg.PlayerInfoWhenGaming
         * @instance
         */
        PlayerInfoWhenGaming.prototype.multiple = 0;

        /**
         * PlayerInfoWhenGaming cardType.
         * @member {number} cardType
         * @memberof msg.PlayerInfoWhenGaming
         * @instance
         */
        PlayerInfoWhenGaming.prototype.cardType = 0;

        /**
         * PlayerInfoWhenGaming isInGame.
         * @member {boolean} isInGame
         * @memberof msg.PlayerInfoWhenGaming
         * @instance
         */
        PlayerInfoWhenGaming.prototype.isInGame = false;

        /**
         * PlayerInfoWhenGaming cards.
         * @member {Uint8Array} cards
         * @memberof msg.PlayerInfoWhenGaming
         * @instance
         */
        PlayerInfoWhenGaming.prototype.cards = $util.newBuffer([]);

        /**
         * PlayerInfoWhenGaming change.
         * @member {number} change
         * @memberof msg.PlayerInfoWhenGaming
         * @instance
         */
        PlayerInfoWhenGaming.prototype.change = 0;

        /**
         * PlayerInfoWhenGaming playerInfo.
         * @member {msg.IPlayerBaseInfo|null|undefined} playerInfo
         * @memberof msg.PlayerInfoWhenGaming
         * @instance
         */
        PlayerInfoWhenGaming.prototype.playerInfo = null;

        /**
         * Creates a new PlayerInfoWhenGaming instance using the specified properties.
         * @function create
         * @memberof msg.PlayerInfoWhenGaming
         * @static
         * @param {msg.IPlayerInfoWhenGaming=} [properties] Properties to set
         * @returns {msg.PlayerInfoWhenGaming} PlayerInfoWhenGaming instance
         */
        PlayerInfoWhenGaming.create = function create(properties) {
            return new PlayerInfoWhenGaming(properties);
        };

        /**
         * Encodes the specified PlayerInfoWhenGaming message. Does not implicitly {@link msg.PlayerInfoWhenGaming.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerInfoWhenGaming
         * @static
         * @param {msg.IPlayerInfoWhenGaming} message PlayerInfoWhenGaming message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoWhenGaming.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chair != null && message.hasOwnProperty("chair"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chair);
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.multiple);
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.cardType);
            if (message.isInGame != null && message.hasOwnProperty("isInGame"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isInGame);
            if (message.cards != null && message.hasOwnProperty("cards"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.cards);
            if (message.change != null && message.hasOwnProperty("change"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.change);
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                $root.msg.PlayerBaseInfo.encode(message.playerInfo, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerInfoWhenGaming message, length delimited. Does not implicitly {@link msg.PlayerInfoWhenGaming.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerInfoWhenGaming
         * @static
         * @param {msg.IPlayerInfoWhenGaming} message PlayerInfoWhenGaming message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoWhenGaming.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfoWhenGaming message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerInfoWhenGaming
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerInfoWhenGaming} PlayerInfoWhenGaming
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoWhenGaming.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerInfoWhenGaming();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chair = reader.int32();
                    break;
                case 2:
                    message.multiple = reader.sint32();
                    break;
                case 3:
                    message.cardType = reader.int32();
                    break;
                case 4:
                    message.isInGame = reader.bool();
                    break;
                case 5:
                    message.cards = reader.bytes();
                    break;
                case 6:
                    message.change = reader.double();
                    break;
                case 7:
                    message.playerInfo = $root.msg.PlayerBaseInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerInfoWhenGaming message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerInfoWhenGaming
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerInfoWhenGaming} PlayerInfoWhenGaming
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoWhenGaming.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfoWhenGaming message.
         * @function verify
         * @memberof msg.PlayerInfoWhenGaming
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfoWhenGaming.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chair != null && message.hasOwnProperty("chair"))
                if (!$util.isInteger(message.chair))
                    return "chair: integer expected";
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                if (!$util.isInteger(message.multiple))
                    return "multiple: integer expected";
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                if (!$util.isInteger(message.cardType))
                    return "cardType: integer expected";
            if (message.isInGame != null && message.hasOwnProperty("isInGame"))
                if (typeof message.isInGame !== "boolean")
                    return "isInGame: boolean expected";
            if (message.cards != null && message.hasOwnProperty("cards"))
                if (!(message.cards && typeof message.cards.length === "number" || $util.isString(message.cards)))
                    return "cards: buffer expected";
            if (message.change != null && message.hasOwnProperty("change"))
                if (typeof message.change !== "number")
                    return "change: number expected";
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo")) {
                var error = $root.msg.PlayerBaseInfo.verify(message.playerInfo);
                if (error)
                    return "playerInfo." + error;
            }
            return null;
        };

        /**
         * Creates a PlayerInfoWhenGaming message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerInfoWhenGaming
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerInfoWhenGaming} PlayerInfoWhenGaming
         */
        PlayerInfoWhenGaming.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerInfoWhenGaming)
                return object;
            var message = new $root.msg.PlayerInfoWhenGaming();
            if (object.chair != null)
                message.chair = object.chair | 0;
            if (object.multiple != null)
                message.multiple = object.multiple | 0;
            if (object.cardType != null)
                message.cardType = object.cardType | 0;
            if (object.isInGame != null)
                message.isInGame = Boolean(object.isInGame);
            if (object.cards != null)
                if (typeof object.cards === "string")
                    $util.base64.decode(object.cards, message.cards = $util.newBuffer($util.base64.length(object.cards)), 0);
                else if (object.cards.length)
                    message.cards = object.cards;
            if (object.change != null)
                message.change = Number(object.change);
            if (object.playerInfo != null) {
                if (typeof object.playerInfo !== "object")
                    throw TypeError(".msg.PlayerInfoWhenGaming.playerInfo: object expected");
                message.playerInfo = $root.msg.PlayerBaseInfo.fromObject(object.playerInfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfoWhenGaming message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerInfoWhenGaming
         * @static
         * @param {msg.PlayerInfoWhenGaming} message PlayerInfoWhenGaming
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfoWhenGaming.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chair = 0;
                object.multiple = 0;
                object.cardType = 0;
                object.isInGame = false;
                if (options.bytes === String)
                    object.cards = "";
                else {
                    object.cards = [];
                    if (options.bytes !== Array)
                        object.cards = $util.newBuffer(object.cards);
                }
                object.change = 0;
                object.playerInfo = null;
            }
            if (message.chair != null && message.hasOwnProperty("chair"))
                object.chair = message.chair;
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                object.multiple = message.multiple;
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                object.cardType = message.cardType;
            if (message.isInGame != null && message.hasOwnProperty("isInGame"))
                object.isInGame = message.isInGame;
            if (message.cards != null && message.hasOwnProperty("cards"))
                object.cards = options.bytes === String ? $util.base64.encode(message.cards, 0, message.cards.length) : options.bytes === Array ? Array.prototype.slice.call(message.cards) : message.cards;
            if (message.change != null && message.hasOwnProperty("change"))
                object.change = options.json && !isFinite(message.change) ? String(message.change) : message.change;
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                object.playerInfo = $root.msg.PlayerBaseInfo.toObject(message.playerInfo, options);
            return object;
        };

        /**
         * Converts this PlayerInfoWhenGaming to JSON.
         * @function toJSON
         * @memberof msg.PlayerInfoWhenGaming
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfoWhenGaming.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerInfoWhenGaming;
    })();

    msg.GameScene4Gaming = (function() {

        /**
         * Properties of a GameScene4Gaming.
         * @memberof msg
         * @interface IGameScene4Gaming
         * @property {number|Long|null} [countDown] GameScene4Gaming countDown
         * @property {number|null} [myChair] GameScene4Gaming myChair
         * @property {number|null} [bankerChair] GameScene4Gaming bankerChair
         * @property {number|null} [currStatus] GameScene4Gaming currStatus
         * @property {number|null} [basePoint] GameScene4Gaming basePoint
         * @property {Array.<msg.IPlayerInfoWhenGaming>|null} [allPlayers] GameScene4Gaming allPlayers
         */

        /**
         * Constructs a new GameScene4Gaming.
         * @memberof msg
         * @classdesc Represents a GameScene4Gaming.
         * @implements IGameScene4Gaming
         * @constructor
         * @param {msg.IGameScene4Gaming=} [properties] Properties to set
         */
        function GameScene4Gaming(properties) {
            this.allPlayers = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameScene4Gaming countDown.
         * @member {number|Long} countDown
         * @memberof msg.GameScene4Gaming
         * @instance
         */
        GameScene4Gaming.prototype.countDown = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GameScene4Gaming myChair.
         * @member {number} myChair
         * @memberof msg.GameScene4Gaming
         * @instance
         */
        GameScene4Gaming.prototype.myChair = 0;

        /**
         * GameScene4Gaming bankerChair.
         * @member {number} bankerChair
         * @memberof msg.GameScene4Gaming
         * @instance
         */
        GameScene4Gaming.prototype.bankerChair = 0;

        /**
         * GameScene4Gaming currStatus.
         * @member {number} currStatus
         * @memberof msg.GameScene4Gaming
         * @instance
         */
        GameScene4Gaming.prototype.currStatus = 0;

        /**
         * GameScene4Gaming basePoint.
         * @member {number} basePoint
         * @memberof msg.GameScene4Gaming
         * @instance
         */
        GameScene4Gaming.prototype.basePoint = 0;

        /**
         * GameScene4Gaming allPlayers.
         * @member {Array.<msg.IPlayerInfoWhenGaming>} allPlayers
         * @memberof msg.GameScene4Gaming
         * @instance
         */
        GameScene4Gaming.prototype.allPlayers = $util.emptyArray;

        /**
         * Creates a new GameScene4Gaming instance using the specified properties.
         * @function create
         * @memberof msg.GameScene4Gaming
         * @static
         * @param {msg.IGameScene4Gaming=} [properties] Properties to set
         * @returns {msg.GameScene4Gaming} GameScene4Gaming instance
         */
        GameScene4Gaming.create = function create(properties) {
            return new GameScene4Gaming(properties);
        };

        /**
         * Encodes the specified GameScene4Gaming message. Does not implicitly {@link msg.GameScene4Gaming.verify|verify} messages.
         * @function encode
         * @memberof msg.GameScene4Gaming
         * @static
         * @param {msg.IGameScene4Gaming} message GameScene4Gaming message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameScene4Gaming.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.countDown != null && message.hasOwnProperty("countDown"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.countDown);
            if (message.myChair != null && message.hasOwnProperty("myChair"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.myChair);
            if (message.bankerChair != null && message.hasOwnProperty("bankerChair"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.bankerChair);
            if (message.currStatus != null && message.hasOwnProperty("currStatus"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.currStatus);
            if (message.basePoint != null && message.hasOwnProperty("basePoint"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.basePoint);
            if (message.allPlayers != null && message.allPlayers.length)
                for (var i = 0; i < message.allPlayers.length; ++i)
                    $root.msg.PlayerInfoWhenGaming.encode(message.allPlayers[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameScene4Gaming message, length delimited. Does not implicitly {@link msg.GameScene4Gaming.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.GameScene4Gaming
         * @static
         * @param {msg.IGameScene4Gaming} message GameScene4Gaming message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameScene4Gaming.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameScene4Gaming message from the specified reader or buffer.
         * @function decode
         * @memberof msg.GameScene4Gaming
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.GameScene4Gaming} GameScene4Gaming
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameScene4Gaming.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.GameScene4Gaming();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.countDown = reader.int64();
                    break;
                case 2:
                    message.myChair = reader.int32();
                    break;
                case 3:
                    message.bankerChair = reader.int32();
                    break;
                case 4:
                    message.currStatus = reader.int32();
                    break;
                case 5:
                    message.basePoint = reader.double();
                    break;
                case 6:
                    if (!(message.allPlayers && message.allPlayers.length))
                        message.allPlayers = [];
                    message.allPlayers.push($root.msg.PlayerInfoWhenGaming.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameScene4Gaming message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.GameScene4Gaming
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.GameScene4Gaming} GameScene4Gaming
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameScene4Gaming.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameScene4Gaming message.
         * @function verify
         * @memberof msg.GameScene4Gaming
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameScene4Gaming.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.countDown != null && message.hasOwnProperty("countDown"))
                if (!$util.isInteger(message.countDown) && !(message.countDown && $util.isInteger(message.countDown.low) && $util.isInteger(message.countDown.high)))
                    return "countDown: integer|Long expected";
            if (message.myChair != null && message.hasOwnProperty("myChair"))
                if (!$util.isInteger(message.myChair))
                    return "myChair: integer expected";
            if (message.bankerChair != null && message.hasOwnProperty("bankerChair"))
                if (!$util.isInteger(message.bankerChair))
                    return "bankerChair: integer expected";
            if (message.currStatus != null && message.hasOwnProperty("currStatus"))
                if (!$util.isInteger(message.currStatus))
                    return "currStatus: integer expected";
            if (message.basePoint != null && message.hasOwnProperty("basePoint"))
                if (typeof message.basePoint !== "number")
                    return "basePoint: number expected";
            if (message.allPlayers != null && message.hasOwnProperty("allPlayers")) {
                if (!Array.isArray(message.allPlayers))
                    return "allPlayers: array expected";
                for (var i = 0; i < message.allPlayers.length; ++i) {
                    var error = $root.msg.PlayerInfoWhenGaming.verify(message.allPlayers[i]);
                    if (error)
                        return "allPlayers." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameScene4Gaming message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.GameScene4Gaming
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.GameScene4Gaming} GameScene4Gaming
         */
        GameScene4Gaming.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.GameScene4Gaming)
                return object;
            var message = new $root.msg.GameScene4Gaming();
            if (object.countDown != null)
                if ($util.Long)
                    (message.countDown = $util.Long.fromValue(object.countDown)).unsigned = false;
                else if (typeof object.countDown === "string")
                    message.countDown = parseInt(object.countDown, 10);
                else if (typeof object.countDown === "number")
                    message.countDown = object.countDown;
                else if (typeof object.countDown === "object")
                    message.countDown = new $util.LongBits(object.countDown.low >>> 0, object.countDown.high >>> 0).toNumber();
            if (object.myChair != null)
                message.myChair = object.myChair | 0;
            if (object.bankerChair != null)
                message.bankerChair = object.bankerChair | 0;
            if (object.currStatus != null)
                message.currStatus = object.currStatus | 0;
            if (object.basePoint != null)
                message.basePoint = Number(object.basePoint);
            if (object.allPlayers) {
                if (!Array.isArray(object.allPlayers))
                    throw TypeError(".msg.GameScene4Gaming.allPlayers: array expected");
                message.allPlayers = [];
                for (var i = 0; i < object.allPlayers.length; ++i) {
                    if (typeof object.allPlayers[i] !== "object")
                        throw TypeError(".msg.GameScene4Gaming.allPlayers: object expected");
                    message.allPlayers[i] = $root.msg.PlayerInfoWhenGaming.fromObject(object.allPlayers[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GameScene4Gaming message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.GameScene4Gaming
         * @static
         * @param {msg.GameScene4Gaming} message GameScene4Gaming
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameScene4Gaming.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.allPlayers = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.countDown = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.countDown = options.longs === String ? "0" : 0;
                object.myChair = 0;
                object.bankerChair = 0;
                object.currStatus = 0;
                object.basePoint = 0;
            }
            if (message.countDown != null && message.hasOwnProperty("countDown"))
                if (typeof message.countDown === "number")
                    object.countDown = options.longs === String ? String(message.countDown) : message.countDown;
                else
                    object.countDown = options.longs === String ? $util.Long.prototype.toString.call(message.countDown) : options.longs === Number ? new $util.LongBits(message.countDown.low >>> 0, message.countDown.high >>> 0).toNumber() : message.countDown;
            if (message.myChair != null && message.hasOwnProperty("myChair"))
                object.myChair = message.myChair;
            if (message.bankerChair != null && message.hasOwnProperty("bankerChair"))
                object.bankerChair = message.bankerChair;
            if (message.currStatus != null && message.hasOwnProperty("currStatus"))
                object.currStatus = message.currStatus;
            if (message.basePoint != null && message.hasOwnProperty("basePoint"))
                object.basePoint = options.json && !isFinite(message.basePoint) ? String(message.basePoint) : message.basePoint;
            if (message.allPlayers && message.allPlayers.length) {
                object.allPlayers = [];
                for (var j = 0; j < message.allPlayers.length; ++j)
                    object.allPlayers[j] = $root.msg.PlayerInfoWhenGaming.toObject(message.allPlayers[j], options);
            }
            return object;
        };

        /**
         * Converts this GameScene4Gaming to JSON.
         * @function toJSON
         * @memberof msg.GameScene4Gaming
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameScene4Gaming.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameScene4Gaming;
    })();

    msg.CompeteBankerResp = (function() {

        /**
         * Properties of a CompeteBankerResp.
         * @memberof msg
         * @interface ICompeteBankerResp
         * @property {number|null} [chair] CompeteBankerResp chair
         * @property {number|null} [multiple] CompeteBankerResp multiple
         * @property {number|Long|null} [countDown] CompeteBankerResp countDown
         */

        /**
         * Constructs a new CompeteBankerResp.
         * @memberof msg
         * @classdesc Represents a CompeteBankerResp.
         * @implements ICompeteBankerResp
         * @constructor
         * @param {msg.ICompeteBankerResp=} [properties] Properties to set
         */
        function CompeteBankerResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CompeteBankerResp chair.
         * @member {number} chair
         * @memberof msg.CompeteBankerResp
         * @instance
         */
        CompeteBankerResp.prototype.chair = 0;

        /**
         * CompeteBankerResp multiple.
         * @member {number} multiple
         * @memberof msg.CompeteBankerResp
         * @instance
         */
        CompeteBankerResp.prototype.multiple = 0;

        /**
         * CompeteBankerResp countDown.
         * @member {number|Long} countDown
         * @memberof msg.CompeteBankerResp
         * @instance
         */
        CompeteBankerResp.prototype.countDown = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new CompeteBankerResp instance using the specified properties.
         * @function create
         * @memberof msg.CompeteBankerResp
         * @static
         * @param {msg.ICompeteBankerResp=} [properties] Properties to set
         * @returns {msg.CompeteBankerResp} CompeteBankerResp instance
         */
        CompeteBankerResp.create = function create(properties) {
            return new CompeteBankerResp(properties);
        };

        /**
         * Encodes the specified CompeteBankerResp message. Does not implicitly {@link msg.CompeteBankerResp.verify|verify} messages.
         * @function encode
         * @memberof msg.CompeteBankerResp
         * @static
         * @param {msg.ICompeteBankerResp} message CompeteBankerResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompeteBankerResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chair != null && message.hasOwnProperty("chair"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chair);
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.multiple);
            if (message.countDown != null && message.hasOwnProperty("countDown"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.countDown);
            return writer;
        };

        /**
         * Encodes the specified CompeteBankerResp message, length delimited. Does not implicitly {@link msg.CompeteBankerResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.CompeteBankerResp
         * @static
         * @param {msg.ICompeteBankerResp} message CompeteBankerResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompeteBankerResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CompeteBankerResp message from the specified reader or buffer.
         * @function decode
         * @memberof msg.CompeteBankerResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.CompeteBankerResp} CompeteBankerResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompeteBankerResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.CompeteBankerResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chair = reader.int32();
                    break;
                case 2:
                    message.multiple = reader.int32();
                    break;
                case 3:
                    message.countDown = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CompeteBankerResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.CompeteBankerResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.CompeteBankerResp} CompeteBankerResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompeteBankerResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CompeteBankerResp message.
         * @function verify
         * @memberof msg.CompeteBankerResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CompeteBankerResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chair != null && message.hasOwnProperty("chair"))
                if (!$util.isInteger(message.chair))
                    return "chair: integer expected";
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                if (!$util.isInteger(message.multiple))
                    return "multiple: integer expected";
            if (message.countDown != null && message.hasOwnProperty("countDown"))
                if (!$util.isInteger(message.countDown) && !(message.countDown && $util.isInteger(message.countDown.low) && $util.isInteger(message.countDown.high)))
                    return "countDown: integer|Long expected";
            return null;
        };

        /**
         * Creates a CompeteBankerResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.CompeteBankerResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.CompeteBankerResp} CompeteBankerResp
         */
        CompeteBankerResp.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.CompeteBankerResp)
                return object;
            var message = new $root.msg.CompeteBankerResp();
            if (object.chair != null)
                message.chair = object.chair | 0;
            if (object.multiple != null)
                message.multiple = object.multiple | 0;
            if (object.countDown != null)
                if ($util.Long)
                    (message.countDown = $util.Long.fromValue(object.countDown)).unsigned = false;
                else if (typeof object.countDown === "string")
                    message.countDown = parseInt(object.countDown, 10);
                else if (typeof object.countDown === "number")
                    message.countDown = object.countDown;
                else if (typeof object.countDown === "object")
                    message.countDown = new $util.LongBits(object.countDown.low >>> 0, object.countDown.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a CompeteBankerResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.CompeteBankerResp
         * @static
         * @param {msg.CompeteBankerResp} message CompeteBankerResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CompeteBankerResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chair = 0;
                object.multiple = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.countDown = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.countDown = options.longs === String ? "0" : 0;
            }
            if (message.chair != null && message.hasOwnProperty("chair"))
                object.chair = message.chair;
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                object.multiple = message.multiple;
            if (message.countDown != null && message.hasOwnProperty("countDown"))
                if (typeof message.countDown === "number")
                    object.countDown = options.longs === String ? String(message.countDown) : message.countDown;
                else
                    object.countDown = options.longs === String ? $util.Long.prototype.toString.call(message.countDown) : options.longs === Number ? new $util.LongBits(message.countDown.low >>> 0, message.countDown.high >>> 0).toNumber() : message.countDown;
            return object;
        };

        /**
         * Converts this CompeteBankerResp to JSON.
         * @function toJSON
         * @memberof msg.CompeteBankerResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CompeteBankerResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CompeteBankerResp;
    })();

    msg.KickedPlayer = (function() {

        /**
         * Properties of a KickedPlayer.
         * @memberof msg
         * @interface IKickedPlayer
         * @property {number|Long|null} [serverTime] KickedPlayer serverTime
         * @property {string|null} [msg] KickedPlayer msg
         */

        /**
         * Constructs a new KickedPlayer.
         * @memberof msg
         * @classdesc Represents a KickedPlayer.
         * @implements IKickedPlayer
         * @constructor
         * @param {msg.IKickedPlayer=} [properties] Properties to set
         */
        function KickedPlayer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KickedPlayer serverTime.
         * @member {number|Long} serverTime
         * @memberof msg.KickedPlayer
         * @instance
         */
        KickedPlayer.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * KickedPlayer msg.
         * @member {string} msg
         * @memberof msg.KickedPlayer
         * @instance
         */
        KickedPlayer.prototype.msg = "";

        /**
         * Creates a new KickedPlayer instance using the specified properties.
         * @function create
         * @memberof msg.KickedPlayer
         * @static
         * @param {msg.IKickedPlayer=} [properties] Properties to set
         * @returns {msg.KickedPlayer} KickedPlayer instance
         */
        KickedPlayer.create = function create(properties) {
            return new KickedPlayer(properties);
        };

        /**
         * Encodes the specified KickedPlayer message. Does not implicitly {@link msg.KickedPlayer.verify|verify} messages.
         * @function encode
         * @memberof msg.KickedPlayer
         * @static
         * @param {msg.IKickedPlayer} message KickedPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickedPlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified KickedPlayer message, length delimited. Does not implicitly {@link msg.KickedPlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.KickedPlayer
         * @static
         * @param {msg.IKickedPlayer} message KickedPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KickedPlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KickedPlayer message from the specified reader or buffer.
         * @function decode
         * @memberof msg.KickedPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.KickedPlayer} KickedPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickedPlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.KickedPlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a KickedPlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.KickedPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.KickedPlayer} KickedPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KickedPlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KickedPlayer message.
         * @function verify
         * @memberof msg.KickedPlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KickedPlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a KickedPlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.KickedPlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.KickedPlayer} KickedPlayer
         */
        KickedPlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.KickedPlayer)
                return object;
            var message = new $root.msg.KickedPlayer();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a KickedPlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.KickedPlayer
         * @static
         * @param {msg.KickedPlayer} message KickedPlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KickedPlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
                object.msg = "";
            }
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this KickedPlayer to JSON.
         * @function toJSON
         * @memberof msg.KickedPlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KickedPlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return KickedPlayer;
    })();

    msg.NotifyPlayerEnterRoom = (function() {

        /**
         * Properties of a NotifyPlayerEnterRoom.
         * @memberof msg
         * @interface INotifyPlayerEnterRoom
         * @property {number|null} [chair] NotifyPlayerEnterRoom chair
         * @property {number|null} [money] NotifyPlayerEnterRoom money
         * @property {string|null} [nick] NotifyPlayerEnterRoom nick
         * @property {string|null} [avator] NotifyPlayerEnterRoom avator
         */

        /**
         * Constructs a new NotifyPlayerEnterRoom.
         * @memberof msg
         * @classdesc Represents a NotifyPlayerEnterRoom.
         * @implements INotifyPlayerEnterRoom
         * @constructor
         * @param {msg.INotifyPlayerEnterRoom=} [properties] Properties to set
         */
        function NotifyPlayerEnterRoom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotifyPlayerEnterRoom chair.
         * @member {number} chair
         * @memberof msg.NotifyPlayerEnterRoom
         * @instance
         */
        NotifyPlayerEnterRoom.prototype.chair = 0;

        /**
         * NotifyPlayerEnterRoom money.
         * @member {number} money
         * @memberof msg.NotifyPlayerEnterRoom
         * @instance
         */
        NotifyPlayerEnterRoom.prototype.money = 0;

        /**
         * NotifyPlayerEnterRoom nick.
         * @member {string} nick
         * @memberof msg.NotifyPlayerEnterRoom
         * @instance
         */
        NotifyPlayerEnterRoom.prototype.nick = "";

        /**
         * NotifyPlayerEnterRoom avator.
         * @member {string} avator
         * @memberof msg.NotifyPlayerEnterRoom
         * @instance
         */
        NotifyPlayerEnterRoom.prototype.avator = "";

        /**
         * Creates a new NotifyPlayerEnterRoom instance using the specified properties.
         * @function create
         * @memberof msg.NotifyPlayerEnterRoom
         * @static
         * @param {msg.INotifyPlayerEnterRoom=} [properties] Properties to set
         * @returns {msg.NotifyPlayerEnterRoom} NotifyPlayerEnterRoom instance
         */
        NotifyPlayerEnterRoom.create = function create(properties) {
            return new NotifyPlayerEnterRoom(properties);
        };

        /**
         * Encodes the specified NotifyPlayerEnterRoom message. Does not implicitly {@link msg.NotifyPlayerEnterRoom.verify|verify} messages.
         * @function encode
         * @memberof msg.NotifyPlayerEnterRoom
         * @static
         * @param {msg.INotifyPlayerEnterRoom} message NotifyPlayerEnterRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyPlayerEnterRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chair != null && message.hasOwnProperty("chair"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chair);
            if (message.money != null && message.hasOwnProperty("money"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.money);
            if (message.nick != null && message.hasOwnProperty("nick"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nick);
            if (message.avator != null && message.hasOwnProperty("avator"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.avator);
            return writer;
        };

        /**
         * Encodes the specified NotifyPlayerEnterRoom message, length delimited. Does not implicitly {@link msg.NotifyPlayerEnterRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.NotifyPlayerEnterRoom
         * @static
         * @param {msg.INotifyPlayerEnterRoom} message NotifyPlayerEnterRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyPlayerEnterRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NotifyPlayerEnterRoom message from the specified reader or buffer.
         * @function decode
         * @memberof msg.NotifyPlayerEnterRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.NotifyPlayerEnterRoom} NotifyPlayerEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyPlayerEnterRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.NotifyPlayerEnterRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chair = reader.int32();
                    break;
                case 2:
                    message.money = reader.double();
                    break;
                case 3:
                    message.nick = reader.string();
                    break;
                case 4:
                    message.avator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NotifyPlayerEnterRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.NotifyPlayerEnterRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.NotifyPlayerEnterRoom} NotifyPlayerEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyPlayerEnterRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotifyPlayerEnterRoom message.
         * @function verify
         * @memberof msg.NotifyPlayerEnterRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotifyPlayerEnterRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chair != null && message.hasOwnProperty("chair"))
                if (!$util.isInteger(message.chair))
                    return "chair: integer expected";
            if (message.money != null && message.hasOwnProperty("money"))
                if (typeof message.money !== "number")
                    return "money: number expected";
            if (message.nick != null && message.hasOwnProperty("nick"))
                if (!$util.isString(message.nick))
                    return "nick: string expected";
            if (message.avator != null && message.hasOwnProperty("avator"))
                if (!$util.isString(message.avator))
                    return "avator: string expected";
            return null;
        };

        /**
         * Creates a NotifyPlayerEnterRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.NotifyPlayerEnterRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.NotifyPlayerEnterRoom} NotifyPlayerEnterRoom
         */
        NotifyPlayerEnterRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.NotifyPlayerEnterRoom)
                return object;
            var message = new $root.msg.NotifyPlayerEnterRoom();
            if (object.chair != null)
                message.chair = object.chair | 0;
            if (object.money != null)
                message.money = Number(object.money);
            if (object.nick != null)
                message.nick = String(object.nick);
            if (object.avator != null)
                message.avator = String(object.avator);
            return message;
        };

        /**
         * Creates a plain object from a NotifyPlayerEnterRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.NotifyPlayerEnterRoom
         * @static
         * @param {msg.NotifyPlayerEnterRoom} message NotifyPlayerEnterRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotifyPlayerEnterRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chair = 0;
                object.money = 0;
                object.nick = "";
                object.avator = "";
            }
            if (message.chair != null && message.hasOwnProperty("chair"))
                object.chair = message.chair;
            if (message.money != null && message.hasOwnProperty("money"))
                object.money = options.json && !isFinite(message.money) ? String(message.money) : message.money;
            if (message.nick != null && message.hasOwnProperty("nick"))
                object.nick = message.nick;
            if (message.avator != null && message.hasOwnProperty("avator"))
                object.avator = message.avator;
            return object;
        };

        /**
         * Converts this NotifyPlayerEnterRoom to JSON.
         * @function toJSON
         * @memberof msg.NotifyPlayerEnterRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotifyPlayerEnterRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NotifyPlayerEnterRoom;
    })();

    msg.NotifyPlayerNetCut = (function() {

        /**
         * Properties of a NotifyPlayerNetCut.
         * @memberof msg
         * @interface INotifyPlayerNetCut
         * @property {number|null} [chair] NotifyPlayerNetCut chair
         */

        /**
         * Constructs a new NotifyPlayerNetCut.
         * @memberof msg
         * @classdesc Represents a NotifyPlayerNetCut.
         * @implements INotifyPlayerNetCut
         * @constructor
         * @param {msg.INotifyPlayerNetCut=} [properties] Properties to set
         */
        function NotifyPlayerNetCut(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotifyPlayerNetCut chair.
         * @member {number} chair
         * @memberof msg.NotifyPlayerNetCut
         * @instance
         */
        NotifyPlayerNetCut.prototype.chair = 0;

        /**
         * Creates a new NotifyPlayerNetCut instance using the specified properties.
         * @function create
         * @memberof msg.NotifyPlayerNetCut
         * @static
         * @param {msg.INotifyPlayerNetCut=} [properties] Properties to set
         * @returns {msg.NotifyPlayerNetCut} NotifyPlayerNetCut instance
         */
        NotifyPlayerNetCut.create = function create(properties) {
            return new NotifyPlayerNetCut(properties);
        };

        /**
         * Encodes the specified NotifyPlayerNetCut message. Does not implicitly {@link msg.NotifyPlayerNetCut.verify|verify} messages.
         * @function encode
         * @memberof msg.NotifyPlayerNetCut
         * @static
         * @param {msg.INotifyPlayerNetCut} message NotifyPlayerNetCut message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyPlayerNetCut.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chair != null && message.hasOwnProperty("chair"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chair);
            return writer;
        };

        /**
         * Encodes the specified NotifyPlayerNetCut message, length delimited. Does not implicitly {@link msg.NotifyPlayerNetCut.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.NotifyPlayerNetCut
         * @static
         * @param {msg.INotifyPlayerNetCut} message NotifyPlayerNetCut message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyPlayerNetCut.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NotifyPlayerNetCut message from the specified reader or buffer.
         * @function decode
         * @memberof msg.NotifyPlayerNetCut
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.NotifyPlayerNetCut} NotifyPlayerNetCut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyPlayerNetCut.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.NotifyPlayerNetCut();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chair = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NotifyPlayerNetCut message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.NotifyPlayerNetCut
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.NotifyPlayerNetCut} NotifyPlayerNetCut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyPlayerNetCut.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotifyPlayerNetCut message.
         * @function verify
         * @memberof msg.NotifyPlayerNetCut
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotifyPlayerNetCut.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chair != null && message.hasOwnProperty("chair"))
                if (!$util.isInteger(message.chair))
                    return "chair: integer expected";
            return null;
        };

        /**
         * Creates a NotifyPlayerNetCut message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.NotifyPlayerNetCut
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.NotifyPlayerNetCut} NotifyPlayerNetCut
         */
        NotifyPlayerNetCut.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.NotifyPlayerNetCut)
                return object;
            var message = new $root.msg.NotifyPlayerNetCut();
            if (object.chair != null)
                message.chair = object.chair | 0;
            return message;
        };

        /**
         * Creates a plain object from a NotifyPlayerNetCut message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.NotifyPlayerNetCut
         * @static
         * @param {msg.NotifyPlayerNetCut} message NotifyPlayerNetCut
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotifyPlayerNetCut.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chair = 0;
            if (message.chair != null && message.hasOwnProperty("chair"))
                object.chair = message.chair;
            return object;
        };

        /**
         * Converts this NotifyPlayerNetCut to JSON.
         * @function toJSON
         * @memberof msg.NotifyPlayerNetCut
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotifyPlayerNetCut.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NotifyPlayerNetCut;
    })();

    msg.NotifyCountDown = (function() {

        /**
         * Properties of a NotifyCountDown.
         * @memberof msg
         * @interface INotifyCountDown
         * @property {number|null} [countDown] NotifyCountDown countDown
         */

        /**
         * Constructs a new NotifyCountDown.
         * @memberof msg
         * @classdesc Represents a NotifyCountDown.
         * @implements INotifyCountDown
         * @constructor
         * @param {msg.INotifyCountDown=} [properties] Properties to set
         */
        function NotifyCountDown(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotifyCountDown countDown.
         * @member {number} countDown
         * @memberof msg.NotifyCountDown
         * @instance
         */
        NotifyCountDown.prototype.countDown = 0;

        /**
         * Creates a new NotifyCountDown instance using the specified properties.
         * @function create
         * @memberof msg.NotifyCountDown
         * @static
         * @param {msg.INotifyCountDown=} [properties] Properties to set
         * @returns {msg.NotifyCountDown} NotifyCountDown instance
         */
        NotifyCountDown.create = function create(properties) {
            return new NotifyCountDown(properties);
        };

        /**
         * Encodes the specified NotifyCountDown message. Does not implicitly {@link msg.NotifyCountDown.verify|verify} messages.
         * @function encode
         * @memberof msg.NotifyCountDown
         * @static
         * @param {msg.INotifyCountDown} message NotifyCountDown message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyCountDown.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.countDown != null && message.hasOwnProperty("countDown"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.countDown);
            return writer;
        };

        /**
         * Encodes the specified NotifyCountDown message, length delimited. Does not implicitly {@link msg.NotifyCountDown.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.NotifyCountDown
         * @static
         * @param {msg.INotifyCountDown} message NotifyCountDown message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotifyCountDown.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NotifyCountDown message from the specified reader or buffer.
         * @function decode
         * @memberof msg.NotifyCountDown
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.NotifyCountDown} NotifyCountDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyCountDown.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.NotifyCountDown();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.countDown = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NotifyCountDown message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.NotifyCountDown
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.NotifyCountDown} NotifyCountDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotifyCountDown.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotifyCountDown message.
         * @function verify
         * @memberof msg.NotifyCountDown
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotifyCountDown.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.countDown != null && message.hasOwnProperty("countDown"))
                if (!$util.isInteger(message.countDown))
                    return "countDown: integer expected";
            return null;
        };

        /**
         * Creates a NotifyCountDown message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.NotifyCountDown
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.NotifyCountDown} NotifyCountDown
         */
        NotifyCountDown.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.NotifyCountDown)
                return object;
            var message = new $root.msg.NotifyCountDown();
            if (object.countDown != null)
                message.countDown = object.countDown | 0;
            return message;
        };

        /**
         * Creates a plain object from a NotifyCountDown message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.NotifyCountDown
         * @static
         * @param {msg.NotifyCountDown} message NotifyCountDown
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotifyCountDown.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.countDown = 0;
            if (message.countDown != null && message.hasOwnProperty("countDown"))
                object.countDown = message.countDown;
            return object;
        };

        /**
         * Converts this NotifyCountDown to JSON.
         * @function toJSON
         * @memberof msg.NotifyCountDown
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotifyCountDown.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NotifyCountDown;
    })();

    msg.SendCardsInfo = (function() {

        /**
         * Properties of a SendCardsInfo.
         * @memberof msg
         * @interface ISendCardsInfo
         * @property {Uint8Array|null} [myCards] SendCardsInfo myCards
         * @property {Array.<number>|null} [sendCardsPlayer] SendCardsInfo sendCardsPlayer
         */

        /**
         * Constructs a new SendCardsInfo.
         * @memberof msg
         * @classdesc Represents a SendCardsInfo.
         * @implements ISendCardsInfo
         * @constructor
         * @param {msg.ISendCardsInfo=} [properties] Properties to set
         */
        function SendCardsInfo(properties) {
            this.sendCardsPlayer = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SendCardsInfo myCards.
         * @member {Uint8Array} myCards
         * @memberof msg.SendCardsInfo
         * @instance
         */
        SendCardsInfo.prototype.myCards = $util.newBuffer([]);

        /**
         * SendCardsInfo sendCardsPlayer.
         * @member {Array.<number>} sendCardsPlayer
         * @memberof msg.SendCardsInfo
         * @instance
         */
        SendCardsInfo.prototype.sendCardsPlayer = $util.emptyArray;

        /**
         * Creates a new SendCardsInfo instance using the specified properties.
         * @function create
         * @memberof msg.SendCardsInfo
         * @static
         * @param {msg.ISendCardsInfo=} [properties] Properties to set
         * @returns {msg.SendCardsInfo} SendCardsInfo instance
         */
        SendCardsInfo.create = function create(properties) {
            return new SendCardsInfo(properties);
        };

        /**
         * Encodes the specified SendCardsInfo message. Does not implicitly {@link msg.SendCardsInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.SendCardsInfo
         * @static
         * @param {msg.ISendCardsInfo} message SendCardsInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendCardsInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.myCards != null && message.hasOwnProperty("myCards"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.myCards);
            if (message.sendCardsPlayer != null && message.sendCardsPlayer.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (var i = 0; i < message.sendCardsPlayer.length; ++i)
                    writer.int32(message.sendCardsPlayer[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified SendCardsInfo message, length delimited. Does not implicitly {@link msg.SendCardsInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.SendCardsInfo
         * @static
         * @param {msg.ISendCardsInfo} message SendCardsInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendCardsInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SendCardsInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.SendCardsInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.SendCardsInfo} SendCardsInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendCardsInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.SendCardsInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.myCards = reader.bytes();
                    break;
                case 2:
                    if (!(message.sendCardsPlayer && message.sendCardsPlayer.length))
                        message.sendCardsPlayer = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.sendCardsPlayer.push(reader.int32());
                    } else
                        message.sendCardsPlayer.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SendCardsInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.SendCardsInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.SendCardsInfo} SendCardsInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendCardsInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SendCardsInfo message.
         * @function verify
         * @memberof msg.SendCardsInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SendCardsInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.myCards != null && message.hasOwnProperty("myCards"))
                if (!(message.myCards && typeof message.myCards.length === "number" || $util.isString(message.myCards)))
                    return "myCards: buffer expected";
            if (message.sendCardsPlayer != null && message.hasOwnProperty("sendCardsPlayer")) {
                if (!Array.isArray(message.sendCardsPlayer))
                    return "sendCardsPlayer: array expected";
                for (var i = 0; i < message.sendCardsPlayer.length; ++i)
                    if (!$util.isInteger(message.sendCardsPlayer[i]))
                        return "sendCardsPlayer: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a SendCardsInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.SendCardsInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.SendCardsInfo} SendCardsInfo
         */
        SendCardsInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.SendCardsInfo)
                return object;
            var message = new $root.msg.SendCardsInfo();
            if (object.myCards != null)
                if (typeof object.myCards === "string")
                    $util.base64.decode(object.myCards, message.myCards = $util.newBuffer($util.base64.length(object.myCards)), 0);
                else if (object.myCards.length)
                    message.myCards = object.myCards;
            if (object.sendCardsPlayer) {
                if (!Array.isArray(object.sendCardsPlayer))
                    throw TypeError(".msg.SendCardsInfo.sendCardsPlayer: array expected");
                message.sendCardsPlayer = [];
                for (var i = 0; i < object.sendCardsPlayer.length; ++i)
                    message.sendCardsPlayer[i] = object.sendCardsPlayer[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a SendCardsInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.SendCardsInfo
         * @static
         * @param {msg.SendCardsInfo} message SendCardsInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SendCardsInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.sendCardsPlayer = [];
            if (options.defaults)
                if (options.bytes === String)
                    object.myCards = "";
                else {
                    object.myCards = [];
                    if (options.bytes !== Array)
                        object.myCards = $util.newBuffer(object.myCards);
                }
            if (message.myCards != null && message.hasOwnProperty("myCards"))
                object.myCards = options.bytes === String ? $util.base64.encode(message.myCards, 0, message.myCards.length) : options.bytes === Array ? Array.prototype.slice.call(message.myCards) : message.myCards;
            if (message.sendCardsPlayer && message.sendCardsPlayer.length) {
                object.sendCardsPlayer = [];
                for (var j = 0; j < message.sendCardsPlayer.length; ++j)
                    object.sendCardsPlayer[j] = message.sendCardsPlayer[j];
            }
            return object;
        };

        /**
         * Converts this SendCardsInfo to JSON.
         * @function toJSON
         * @memberof msg.SendCardsInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SendCardsInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SendCardsInfo;
    })();

    msg.PlayerResultInfo = (function() {

        /**
         * Properties of a PlayerResultInfo.
         * @memberof msg
         * @interface IPlayerResultInfo
         * @property {number|null} [chair] PlayerResultInfo chair
         * @property {number|null} [cardType] PlayerResultInfo cardType
         * @property {Uint8Array|null} [cards] PlayerResultInfo cards
         * @property {number|null} [moneyChange] PlayerResultInfo moneyChange
         * @property {number|null} [residueMoney] PlayerResultInfo residueMoney
         */

        /**
         * Constructs a new PlayerResultInfo.
         * @memberof msg
         * @classdesc Represents a PlayerResultInfo.
         * @implements IPlayerResultInfo
         * @constructor
         * @param {msg.IPlayerResultInfo=} [properties] Properties to set
         */
        function PlayerResultInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerResultInfo chair.
         * @member {number} chair
         * @memberof msg.PlayerResultInfo
         * @instance
         */
        PlayerResultInfo.prototype.chair = 0;

        /**
         * PlayerResultInfo cardType.
         * @member {number} cardType
         * @memberof msg.PlayerResultInfo
         * @instance
         */
        PlayerResultInfo.prototype.cardType = 0;

        /**
         * PlayerResultInfo cards.
         * @member {Uint8Array} cards
         * @memberof msg.PlayerResultInfo
         * @instance
         */
        PlayerResultInfo.prototype.cards = $util.newBuffer([]);

        /**
         * PlayerResultInfo moneyChange.
         * @member {number} moneyChange
         * @memberof msg.PlayerResultInfo
         * @instance
         */
        PlayerResultInfo.prototype.moneyChange = 0;

        /**
         * PlayerResultInfo residueMoney.
         * @member {number} residueMoney
         * @memberof msg.PlayerResultInfo
         * @instance
         */
        PlayerResultInfo.prototype.residueMoney = 0;

        /**
         * Creates a new PlayerResultInfo instance using the specified properties.
         * @function create
         * @memberof msg.PlayerResultInfo
         * @static
         * @param {msg.IPlayerResultInfo=} [properties] Properties to set
         * @returns {msg.PlayerResultInfo} PlayerResultInfo instance
         */
        PlayerResultInfo.create = function create(properties) {
            return new PlayerResultInfo(properties);
        };

        /**
         * Encodes the specified PlayerResultInfo message. Does not implicitly {@link msg.PlayerResultInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerResultInfo
         * @static
         * @param {msg.IPlayerResultInfo} message PlayerResultInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerResultInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chair != null && message.hasOwnProperty("chair"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chair);
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.cardType);
            if (message.cards != null && message.hasOwnProperty("cards"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.cards);
            if (message.moneyChange != null && message.hasOwnProperty("moneyChange"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.moneyChange);
            if (message.residueMoney != null && message.hasOwnProperty("residueMoney"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.residueMoney);
            return writer;
        };

        /**
         * Encodes the specified PlayerResultInfo message, length delimited. Does not implicitly {@link msg.PlayerResultInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerResultInfo
         * @static
         * @param {msg.IPlayerResultInfo} message PlayerResultInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerResultInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerResultInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerResultInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerResultInfo} PlayerResultInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerResultInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerResultInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.chair = reader.int32();
                    break;
                case 2:
                    message.cardType = reader.int32();
                    break;
                case 3:
                    message.cards = reader.bytes();
                    break;
                case 4:
                    message.moneyChange = reader.double();
                    break;
                case 5:
                    message.residueMoney = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerResultInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerResultInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerResultInfo} PlayerResultInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerResultInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerResultInfo message.
         * @function verify
         * @memberof msg.PlayerResultInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerResultInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chair != null && message.hasOwnProperty("chair"))
                if (!$util.isInteger(message.chair))
                    return "chair: integer expected";
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                if (!$util.isInteger(message.cardType))
                    return "cardType: integer expected";
            if (message.cards != null && message.hasOwnProperty("cards"))
                if (!(message.cards && typeof message.cards.length === "number" || $util.isString(message.cards)))
                    return "cards: buffer expected";
            if (message.moneyChange != null && message.hasOwnProperty("moneyChange"))
                if (typeof message.moneyChange !== "number")
                    return "moneyChange: number expected";
            if (message.residueMoney != null && message.hasOwnProperty("residueMoney"))
                if (typeof message.residueMoney !== "number")
                    return "residueMoney: number expected";
            return null;
        };

        /**
         * Creates a PlayerResultInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerResultInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerResultInfo} PlayerResultInfo
         */
        PlayerResultInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerResultInfo)
                return object;
            var message = new $root.msg.PlayerResultInfo();
            if (object.chair != null)
                message.chair = object.chair | 0;
            if (object.cardType != null)
                message.cardType = object.cardType | 0;
            if (object.cards != null)
                if (typeof object.cards === "string")
                    $util.base64.decode(object.cards, message.cards = $util.newBuffer($util.base64.length(object.cards)), 0);
                else if (object.cards.length)
                    message.cards = object.cards;
            if (object.moneyChange != null)
                message.moneyChange = Number(object.moneyChange);
            if (object.residueMoney != null)
                message.residueMoney = Number(object.residueMoney);
            return message;
        };

        /**
         * Creates a plain object from a PlayerResultInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerResultInfo
         * @static
         * @param {msg.PlayerResultInfo} message PlayerResultInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerResultInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chair = 0;
                object.cardType = 0;
                if (options.bytes === String)
                    object.cards = "";
                else {
                    object.cards = [];
                    if (options.bytes !== Array)
                        object.cards = $util.newBuffer(object.cards);
                }
                object.moneyChange = 0;
                object.residueMoney = 0;
            }
            if (message.chair != null && message.hasOwnProperty("chair"))
                object.chair = message.chair;
            if (message.cardType != null && message.hasOwnProperty("cardType"))
                object.cardType = message.cardType;
            if (message.cards != null && message.hasOwnProperty("cards"))
                object.cards = options.bytes === String ? $util.base64.encode(message.cards, 0, message.cards.length) : options.bytes === Array ? Array.prototype.slice.call(message.cards) : message.cards;
            if (message.moneyChange != null && message.hasOwnProperty("moneyChange"))
                object.moneyChange = options.json && !isFinite(message.moneyChange) ? String(message.moneyChange) : message.moneyChange;
            if (message.residueMoney != null && message.hasOwnProperty("residueMoney"))
                object.residueMoney = options.json && !isFinite(message.residueMoney) ? String(message.residueMoney) : message.residueMoney;
            return object;
        };

        /**
         * Converts this PlayerResultInfo to JSON.
         * @function toJSON
         * @memberof msg.PlayerResultInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerResultInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerResultInfo;
    })();

    msg.AllPlayersResults = (function() {

        /**
         * Properties of an AllPlayersResults.
         * @memberof msg
         * @interface IAllPlayersResults
         * @property {Array.<msg.IPlayerResultInfo>|null} [results] AllPlayersResults results
         */

        /**
         * Constructs a new AllPlayersResults.
         * @memberof msg
         * @classdesc Represents an AllPlayersResults.
         * @implements IAllPlayersResults
         * @constructor
         * @param {msg.IAllPlayersResults=} [properties] Properties to set
         */
        function AllPlayersResults(properties) {
            this.results = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AllPlayersResults results.
         * @member {Array.<msg.IPlayerResultInfo>} results
         * @memberof msg.AllPlayersResults
         * @instance
         */
        AllPlayersResults.prototype.results = $util.emptyArray;

        /**
         * Creates a new AllPlayersResults instance using the specified properties.
         * @function create
         * @memberof msg.AllPlayersResults
         * @static
         * @param {msg.IAllPlayersResults=} [properties] Properties to set
         * @returns {msg.AllPlayersResults} AllPlayersResults instance
         */
        AllPlayersResults.create = function create(properties) {
            return new AllPlayersResults(properties);
        };

        /**
         * Encodes the specified AllPlayersResults message. Does not implicitly {@link msg.AllPlayersResults.verify|verify} messages.
         * @function encode
         * @memberof msg.AllPlayersResults
         * @static
         * @param {msg.IAllPlayersResults} message AllPlayersResults message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllPlayersResults.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.results != null && message.results.length)
                for (var i = 0; i < message.results.length; ++i)
                    $root.msg.PlayerResultInfo.encode(message.results[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AllPlayersResults message, length delimited. Does not implicitly {@link msg.AllPlayersResults.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.AllPlayersResults
         * @static
         * @param {msg.IAllPlayersResults} message AllPlayersResults message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllPlayersResults.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AllPlayersResults message from the specified reader or buffer.
         * @function decode
         * @memberof msg.AllPlayersResults
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.AllPlayersResults} AllPlayersResults
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllPlayersResults.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.AllPlayersResults();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.results && message.results.length))
                        message.results = [];
                    message.results.push($root.msg.PlayerResultInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AllPlayersResults message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.AllPlayersResults
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.AllPlayersResults} AllPlayersResults
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllPlayersResults.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AllPlayersResults message.
         * @function verify
         * @memberof msg.AllPlayersResults
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AllPlayersResults.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.results != null && message.hasOwnProperty("results")) {
                if (!Array.isArray(message.results))
                    return "results: array expected";
                for (var i = 0; i < message.results.length; ++i) {
                    var error = $root.msg.PlayerResultInfo.verify(message.results[i]);
                    if (error)
                        return "results." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AllPlayersResults message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.AllPlayersResults
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.AllPlayersResults} AllPlayersResults
         */
        AllPlayersResults.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.AllPlayersResults)
                return object;
            var message = new $root.msg.AllPlayersResults();
            if (object.results) {
                if (!Array.isArray(object.results))
                    throw TypeError(".msg.AllPlayersResults.results: array expected");
                message.results = [];
                for (var i = 0; i < object.results.length; ++i) {
                    if (typeof object.results[i] !== "object")
                        throw TypeError(".msg.AllPlayersResults.results: object expected");
                    message.results[i] = $root.msg.PlayerResultInfo.fromObject(object.results[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AllPlayersResults message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.AllPlayersResults
         * @static
         * @param {msg.AllPlayersResults} message AllPlayersResults
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AllPlayersResults.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.results = [];
            if (message.results && message.results.length) {
                object.results = [];
                for (var j = 0; j < message.results.length; ++j)
                    object.results[j] = $root.msg.PlayerResultInfo.toObject(message.results[j], options);
            }
            return object;
        };

        /**
         * Converts this AllPlayersResults to JSON.
         * @function toJSON
         * @memberof msg.AllPlayersResults
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AllPlayersResults.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AllPlayersResults;
    })();

    msg.OperationOutTimeNotify = (function() {

        /**
         * Properties of an OperationOutTimeNotify.
         * @memberof msg
         * @interface IOperationOutTimeNotify
         * @property {number|null} [multiple] OperationOutTimeNotify multiple
         * @property {Array.<number>|null} [chairSet] OperationOutTimeNotify chairSet
         */

        /**
         * Constructs a new OperationOutTimeNotify.
         * @memberof msg
         * @classdesc Represents an OperationOutTimeNotify.
         * @implements IOperationOutTimeNotify
         * @constructor
         * @param {msg.IOperationOutTimeNotify=} [properties] Properties to set
         */
        function OperationOutTimeNotify(properties) {
            this.chairSet = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OperationOutTimeNotify multiple.
         * @member {number} multiple
         * @memberof msg.OperationOutTimeNotify
         * @instance
         */
        OperationOutTimeNotify.prototype.multiple = 0;

        /**
         * OperationOutTimeNotify chairSet.
         * @member {Array.<number>} chairSet
         * @memberof msg.OperationOutTimeNotify
         * @instance
         */
        OperationOutTimeNotify.prototype.chairSet = $util.emptyArray;

        /**
         * Creates a new OperationOutTimeNotify instance using the specified properties.
         * @function create
         * @memberof msg.OperationOutTimeNotify
         * @static
         * @param {msg.IOperationOutTimeNotify=} [properties] Properties to set
         * @returns {msg.OperationOutTimeNotify} OperationOutTimeNotify instance
         */
        OperationOutTimeNotify.create = function create(properties) {
            return new OperationOutTimeNotify(properties);
        };

        /**
         * Encodes the specified OperationOutTimeNotify message. Does not implicitly {@link msg.OperationOutTimeNotify.verify|verify} messages.
         * @function encode
         * @memberof msg.OperationOutTimeNotify
         * @static
         * @param {msg.IOperationOutTimeNotify} message OperationOutTimeNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationOutTimeNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.multiple);
            if (message.chairSet != null && message.chairSet.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (var i = 0; i < message.chairSet.length; ++i)
                    writer.int32(message.chairSet[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified OperationOutTimeNotify message, length delimited. Does not implicitly {@link msg.OperationOutTimeNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.OperationOutTimeNotify
         * @static
         * @param {msg.IOperationOutTimeNotify} message OperationOutTimeNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperationOutTimeNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OperationOutTimeNotify message from the specified reader or buffer.
         * @function decode
         * @memberof msg.OperationOutTimeNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.OperationOutTimeNotify} OperationOutTimeNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationOutTimeNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.OperationOutTimeNotify();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.multiple = reader.int32();
                    break;
                case 2:
                    if (!(message.chairSet && message.chairSet.length))
                        message.chairSet = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.chairSet.push(reader.int32());
                    } else
                        message.chairSet.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OperationOutTimeNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.OperationOutTimeNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.OperationOutTimeNotify} OperationOutTimeNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperationOutTimeNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OperationOutTimeNotify message.
         * @function verify
         * @memberof msg.OperationOutTimeNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OperationOutTimeNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                if (!$util.isInteger(message.multiple))
                    return "multiple: integer expected";
            if (message.chairSet != null && message.hasOwnProperty("chairSet")) {
                if (!Array.isArray(message.chairSet))
                    return "chairSet: array expected";
                for (var i = 0; i < message.chairSet.length; ++i)
                    if (!$util.isInteger(message.chairSet[i]))
                        return "chairSet: integer[] expected";
            }
            return null;
        };

        /**
         * Creates an OperationOutTimeNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.OperationOutTimeNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.OperationOutTimeNotify} OperationOutTimeNotify
         */
        OperationOutTimeNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.OperationOutTimeNotify)
                return object;
            var message = new $root.msg.OperationOutTimeNotify();
            if (object.multiple != null)
                message.multiple = object.multiple | 0;
            if (object.chairSet) {
                if (!Array.isArray(object.chairSet))
                    throw TypeError(".msg.OperationOutTimeNotify.chairSet: array expected");
                message.chairSet = [];
                for (var i = 0; i < object.chairSet.length; ++i)
                    message.chairSet[i] = object.chairSet[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from an OperationOutTimeNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.OperationOutTimeNotify
         * @static
         * @param {msg.OperationOutTimeNotify} message OperationOutTimeNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OperationOutTimeNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.chairSet = [];
            if (options.defaults)
                object.multiple = 0;
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                object.multiple = message.multiple;
            if (message.chairSet && message.chairSet.length) {
                object.chairSet = [];
                for (var j = 0; j < message.chairSet.length; ++j)
                    object.chairSet[j] = message.chairSet[j];
            }
            return object;
        };

        /**
         * Converts this OperationOutTimeNotify to JSON.
         * @function toJSON
         * @memberof msg.OperationOutTimeNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OperationOutTimeNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OperationOutTimeNotify;
    })();

    msg.CompeteResult = (function() {

        /**
         * Properties of a CompeteResult.
         * @memberof msg
         * @interface ICompeteResult
         * @property {number|null} [multiple] CompeteResult multiple
         * @property {number|null} [bankerChair] CompeteResult bankerChair
         * @property {Array.<number>|null} [competeList] CompeteResult competeList
         */

        /**
         * Constructs a new CompeteResult.
         * @memberof msg
         * @classdesc Represents a CompeteResult.
         * @implements ICompeteResult
         * @constructor
         * @param {msg.ICompeteResult=} [properties] Properties to set
         */
        function CompeteResult(properties) {
            this.competeList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CompeteResult multiple.
         * @member {number} multiple
         * @memberof msg.CompeteResult
         * @instance
         */
        CompeteResult.prototype.multiple = 0;

        /**
         * CompeteResult bankerChair.
         * @member {number} bankerChair
         * @memberof msg.CompeteResult
         * @instance
         */
        CompeteResult.prototype.bankerChair = 0;

        /**
         * CompeteResult competeList.
         * @member {Array.<number>} competeList
         * @memberof msg.CompeteResult
         * @instance
         */
        CompeteResult.prototype.competeList = $util.emptyArray;

        /**
         * Creates a new CompeteResult instance using the specified properties.
         * @function create
         * @memberof msg.CompeteResult
         * @static
         * @param {msg.ICompeteResult=} [properties] Properties to set
         * @returns {msg.CompeteResult} CompeteResult instance
         */
        CompeteResult.create = function create(properties) {
            return new CompeteResult(properties);
        };

        /**
         * Encodes the specified CompeteResult message. Does not implicitly {@link msg.CompeteResult.verify|verify} messages.
         * @function encode
         * @memberof msg.CompeteResult
         * @static
         * @param {msg.ICompeteResult} message CompeteResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompeteResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.multiple);
            if (message.bankerChair != null && message.hasOwnProperty("bankerChair"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.bankerChair);
            if (message.competeList != null && message.competeList.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (var i = 0; i < message.competeList.length; ++i)
                    writer.int32(message.competeList[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified CompeteResult message, length delimited. Does not implicitly {@link msg.CompeteResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.CompeteResult
         * @static
         * @param {msg.ICompeteResult} message CompeteResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompeteResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CompeteResult message from the specified reader or buffer.
         * @function decode
         * @memberof msg.CompeteResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.CompeteResult} CompeteResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompeteResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.CompeteResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.multiple = reader.int32();
                    break;
                case 2:
                    message.bankerChair = reader.int32();
                    break;
                case 3:
                    if (!(message.competeList && message.competeList.length))
                        message.competeList = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.competeList.push(reader.int32());
                    } else
                        message.competeList.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CompeteResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.CompeteResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.CompeteResult} CompeteResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompeteResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CompeteResult message.
         * @function verify
         * @memberof msg.CompeteResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CompeteResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                if (!$util.isInteger(message.multiple))
                    return "multiple: integer expected";
            if (message.bankerChair != null && message.hasOwnProperty("bankerChair"))
                if (!$util.isInteger(message.bankerChair))
                    return "bankerChair: integer expected";
            if (message.competeList != null && message.hasOwnProperty("competeList")) {
                if (!Array.isArray(message.competeList))
                    return "competeList: array expected";
                for (var i = 0; i < message.competeList.length; ++i)
                    if (!$util.isInteger(message.competeList[i]))
                        return "competeList: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a CompeteResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.CompeteResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.CompeteResult} CompeteResult
         */
        CompeteResult.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.CompeteResult)
                return object;
            var message = new $root.msg.CompeteResult();
            if (object.multiple != null)
                message.multiple = object.multiple | 0;
            if (object.bankerChair != null)
                message.bankerChair = object.bankerChair | 0;
            if (object.competeList) {
                if (!Array.isArray(object.competeList))
                    throw TypeError(".msg.CompeteResult.competeList: array expected");
                message.competeList = [];
                for (var i = 0; i < object.competeList.length; ++i)
                    message.competeList[i] = object.competeList[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a CompeteResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.CompeteResult
         * @static
         * @param {msg.CompeteResult} message CompeteResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CompeteResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.competeList = [];
            if (options.defaults) {
                object.multiple = 0;
                object.bankerChair = 0;
            }
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                object.multiple = message.multiple;
            if (message.bankerChair != null && message.hasOwnProperty("bankerChair"))
                object.bankerChair = message.bankerChair;
            if (message.competeList && message.competeList.length) {
                object.competeList = [];
                for (var j = 0; j < message.competeList.length; ++j)
                    object.competeList[j] = message.competeList[j];
            }
            return object;
        };

        /**
         * Converts this CompeteResult to JSON.
         * @function toJSON
         * @memberof msg.CompeteResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CompeteResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CompeteResult;
    })();

    msg.TestCardsType = (function() {

        /**
         * Properties of a TestCardsType.
         * @memberof msg
         * @interface ITestCardsType
         * @property {Uint8Array|null} [cards] TestCardsType cards
         * @property {number|Long|null} [uid] TestCardsType uid
         */

        /**
         * Constructs a new TestCardsType.
         * @memberof msg
         * @classdesc Represents a TestCardsType.
         * @implements ITestCardsType
         * @constructor
         * @param {msg.ITestCardsType=} [properties] Properties to set
         */
        function TestCardsType(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TestCardsType cards.
         * @member {Uint8Array} cards
         * @memberof msg.TestCardsType
         * @instance
         */
        TestCardsType.prototype.cards = $util.newBuffer([]);

        /**
         * TestCardsType uid.
         * @member {number|Long} uid
         * @memberof msg.TestCardsType
         * @instance
         */
        TestCardsType.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new TestCardsType instance using the specified properties.
         * @function create
         * @memberof msg.TestCardsType
         * @static
         * @param {msg.ITestCardsType=} [properties] Properties to set
         * @returns {msg.TestCardsType} TestCardsType instance
         */
        TestCardsType.create = function create(properties) {
            return new TestCardsType(properties);
        };

        /**
         * Encodes the specified TestCardsType message. Does not implicitly {@link msg.TestCardsType.verify|verify} messages.
         * @function encode
         * @memberof msg.TestCardsType
         * @static
         * @param {msg.ITestCardsType} message TestCardsType message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestCardsType.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cards != null && message.hasOwnProperty("cards"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.cards);
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.uid);
            return writer;
        };

        /**
         * Encodes the specified TestCardsType message, length delimited. Does not implicitly {@link msg.TestCardsType.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.TestCardsType
         * @static
         * @param {msg.ITestCardsType} message TestCardsType message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestCardsType.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TestCardsType message from the specified reader or buffer.
         * @function decode
         * @memberof msg.TestCardsType
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.TestCardsType} TestCardsType
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestCardsType.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.TestCardsType();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cards = reader.bytes();
                    break;
                case 2:
                    message.uid = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TestCardsType message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.TestCardsType
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.TestCardsType} TestCardsType
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestCardsType.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TestCardsType message.
         * @function verify
         * @memberof msg.TestCardsType
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TestCardsType.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cards != null && message.hasOwnProperty("cards"))
                if (!(message.cards && typeof message.cards.length === "number" || $util.isString(message.cards)))
                    return "cards: buffer expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                    return "uid: integer|Long expected";
            return null;
        };

        /**
         * Creates a TestCardsType message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.TestCardsType
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.TestCardsType} TestCardsType
         */
        TestCardsType.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.TestCardsType)
                return object;
            var message = new $root.msg.TestCardsType();
            if (object.cards != null)
                if (typeof object.cards === "string")
                    $util.base64.decode(object.cards, message.cards = $util.newBuffer($util.base64.length(object.cards)), 0);
                else if (object.cards.length)
                    message.cards = object.cards;
            if (object.uid != null)
                if ($util.Long)
                    (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                else if (typeof object.uid === "string")
                    message.uid = parseInt(object.uid, 10);
                else if (typeof object.uid === "number")
                    message.uid = object.uid;
                else if (typeof object.uid === "object")
                    message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a TestCardsType message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.TestCardsType
         * @static
         * @param {msg.TestCardsType} message TestCardsType
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TestCardsType.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.cards = "";
                else {
                    object.cards = [];
                    if (options.bytes !== Array)
                        object.cards = $util.newBuffer(object.cards);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.uid = options.longs === String ? "0" : 0;
            }
            if (message.cards != null && message.hasOwnProperty("cards"))
                object.cards = options.bytes === String ? $util.base64.encode(message.cards, 0, message.cards.length) : options.bytes === Array ? Array.prototype.slice.call(message.cards) : message.cards;
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (typeof message.uid === "number")
                    object.uid = options.longs === String ? String(message.uid) : message.uid;
                else
                    object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
            return object;
        };

        /**
         * Converts this TestCardsType to JSON.
         * @function toJSON
         * @memberof msg.TestCardsType
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TestCardsType.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TestCardsType;
    })();

    return msg;
})();

module.exports = $root;
