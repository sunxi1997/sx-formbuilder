"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormBuilder = exports.FormControl = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 * @version 1.0.1
 *
 * @author sunxi1997
 *
 * @desc 表单验证工具
 *
 * 孙玺修改与 2020-5-9
 *
 * https://github.com/sunxi1997/sx-formbuilder
 */

/**
 * @typedef  {Object}    Descriptor             -       验证规则描述对象
 * @property {*}         [defaultValue='']      -       初始值
 * @property {validator} [validator=null]       -       自定义验证函数,支持异步
 * @property {Boolean}   [required=false]       -       是否必填
 * @property {String}    [type=null]            -       类型验证
 */

/**
 * @typedef  {Object}    Message                -       验证错误时的提示信息
 * @property {String}    [validator='']         -       自定义验证规则未通过时错误信息
 * @property {String}    [type='']              -       类型验证未通过时错误信息
 * @property {String}    [required='']          -       必填验证未通过时错误信息
 */

/**
 * @callback  validator             -     值变化时的验证回调函数
 * @param {*} value                 -     变化后的值
 *
 * @return {Boolean,Promise}        -     支持异步验证,返回验证结果(布尔值)
 */

/**
 * @class FormControl   -  表单控件
 *
 * 表单控件,接受描述符,监听自身 value 变化,变化时进行验证并响应更改 valid 属性
 *
 * @property {*}          value      -   控件的值
 * @property {Boolean}    valid      -   验证结果
 * @property {Boolean}    valid      -   验证结果
 * @property {String}     errMsg     -   若验证未通过,此处为错误信息
 *
 * @property {validator}  __options  -   验证规则
 * @property {Message}    __message  -   错误提示
 */
var FormControl = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Descriptor}    [descriptor={}]        -       验证规则
   * @param {Message}       [message={}]           -       提示信息
   */
  function FormControl() {
    var _this = this;

    var descriptor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FormControl);

    this.value = null;
    this.valid = false;
    this.errMsg = null;
    this.__value = null;
    this.__valid = false;
    this.__options = {
      defaultValue: null,
      required: false,
      type: null,
      validator: null
    };
    this.__message = {
      validator: '值验证不通过',
      type: '值类型不正确',
      required: '必填项不能为空'
    };
    Object.defineProperties(this, {
      value: {
        set: this.setValue,
        get: function get() {
          return _this.__value;
        },
        enumerable: true
      },
      valid: {
        get: function get() {
          return _this.getValid();
        },
        set: function set() {
          return null;
        }
      }
    });
    this.setOption(descriptor, message);
  }

  _createClass(FormControl, [{
    key: "reset",
    value: function reset() {
      this.setOption(this.__options);
    }
    /**
     * @method - setOption - 更新规则
     * @param {Descriptor}    [descriptor={}]        -       验证规则
     * @param {Message}       [message={}]           -       提示信息
     */

  }, {
    key: "setOption",
    value: function setOption() {
      var _this2 = this;

      var descriptor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var validator = descriptor.validator,
          _descriptor$value = descriptor.value,
          value = _descriptor$value === void 0 ? this.value : _descriptor$value,
          _descriptor$defaultVa = descriptor.defaultValue,
          defaultValue = _descriptor$defaultVa === void 0 ? value : _descriptor$defaultVa;
      descriptor.defaultValue = defaultValue; // 替换 this 指向

      validator && typeof validator === 'function' && (descriptor.validator = function () {
        for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
          props[_key] = arguments[_key];
        }

        return validator.call.apply(validator, [_this2].concat(props));
      });
      Object.assign(this.__options, descriptor);
      this.setMessage(message);
      if (typeof defaultValue === 'function') defaultValue = defaultValue();
      this.setValue(defaultValue);
    }
  }, {
    key: "setMessage",
    value: function setMessage(message) {
      Object.assign(this.__message, message);
    }
    /**
     * 存值验证
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      var $this = this;
      $this.__value = value;

      var res = this.__validate(value);

      res instanceof Promise ? res.then(ErrMsgHandler) : ErrMsgHandler(res);

      function ErrMsgHandler(errMsg) {
        if (errMsg === true) {
          $this.__valid = true;
          $this.errMsg = null;
        } else {
          $this.__valid = false;
          $this.errMsg = errMsg;
        }

        $this = res = ErrMsgHandler = null;
      }
    }
  }, {
    key: "getValid",
    value: function getValid() {
      this.setValue(this.value);
      return this.__valid;
    }
    /**
     * 验证值是否通过验证
     */

  }, {
    key: "__validate",
    value: function __validate(value) {
      var __options = this.__options,
          __message = this.__message;
      var validator = __options.validator;
      var validatorMsg = __message.validator,
          typeMsg = __message.type,
          requiredMsg = __message.required;
      var errMsg = !this.__validRequired(value) ? requiredMsg : !this.__validType(value) ? typeMsg : true;
      if (errMsg !== true) return errMsg; // 验证自定义验证规则

      if (validator && typeof validator === 'function') {
        var res = validator(value);
        if (res instanceof Promise) return new Promise(function (resolve, reject) {
          res.then(function (valid) {
            return resolve(!valid ? validatorMsg : true);
          }, resolve(validatorMsg));
        });else return !res ? validatorMsg : true;
      }

      return true;
    }
    /**
     * 验证值类型
     */

  }, {
    key: "__validType",
    value: function __validType(value) {
      var type = this.__options.type;
      return !type || _typeof(value) === type || typeof type === 'function' && (value instanceof type || typeCheck(value, type));

      function typeCheck(value, type) {
        var index = [String, Number, Symbol, Boolean].indexOf(type);
        var types = ['string', 'number', 'symbol', 'boolean'];
        return index !== -1 && _typeof(value) === types[index];
      }
    }
    /**
     * 验证必填
     */

  }, {
    key: "__validRequired",
    value: function __validRequired(value) {
      var required = this.__options.required;
      return !required || !!value || [0, false].includes(value);
    }
  }]);

  return FormControl;
}();
/**
 * @class FormControl   -  表单控件
 *
 * 表单控件,接受验证规则, 调用 patchValue 时会验证值
 *
 * @property {*}          value      -   表单的值
 * @property {Boolean}    valid      -   表单验证结果
 */


exports.FormControl = FormControl;

var FormBuilder = /*#__PURE__*/function () {
  /**
   * @constructor
   *
   * @param {Object}      ruler                  -       表单规则
   * @param {Descriptor}  ruler[*]               -       所有 key 对应的值都应为 Descriptor 类型
   *
   * @param {Object}      messages               -       规则对应的提示信息
   * @param {Message}     messages[*]            -       所有 key 对应的值都应为 Descriptor 类型
   *
   */
  function FormBuilder(ruler) {
    var _this3 = this;

    var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FormBuilder);

    this.value = {};
    this.valid = false;
    this.hasError = false;
    this.errors = [];
    this.errMsg = null;
    this.controls = {};
    this.controls = this.__getControls(ruler, messages);

    var set = function set() {
      return null;
    };

    Object.defineProperties(this, {
      value: {
        get: this.getValue,
        set: set
      },
      valid: {
        get: this.getValid,
        set: set
      },
      errors: {
        get: this.getErrors,
        set: set
      },
      errMsg: {
        get: function get() {
          return _this3.errors[0] ? _this3.errors[0].errMsg : '';
        },
        set: set
      },
      hasError: {
        get: function get() {
          return _this3.errors.length > 0;
        },
        set: set
      }
    }); // this.updateForm();
  }

  _createClass(FormBuilder, [{
    key: "reset",
    value: function reset() {
      Object.values(this.controls).forEach(function (control) {
        return control.reset();
      });
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return Object.entries(this.controls).reduce(function (value, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            control = _ref2[1];

        return value[name] = control.value, value;
      }, {});
    }
  }, {
    key: "getValid",
    value: function getValid() {
      return !Object.values(this.controls).some(function (item) {
        return !item.valid;
      });
    }
  }, {
    key: "getErrors",
    value: function getErrors() {
      return Object.values(this.controls).reduce(function (errors, control) {
        return control.valid || errors.push(control), errors;
      }, []);
    }
  }, {
    key: "addControls",
    value: function addControls(ruler, messages) {
      this.controls = _objectSpread({}, this.controls, {}, this.__getControls(ruler, messages));
    }
    /**
     * @method removeControl   -  移除表单控件
     *
     * @param {string} name    -  表单中的 key
     */

  }, {
    key: "removeControl",
    value: function removeControl(name) {
      if (this.controls[name]) {
        this.controls[name] = null;
        delete this.controls[name];
      }
    }
    /**
     * @method - patchValue -  更新表单值
     *
     * @param {Object} data - 表单
     */

  }, {
    key: "patchValue",
    value: function patchValue(data) {
      var _this4 = this;

      Object.entries(data).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        var control = _this4.controls[key];
        control && control.setValue(value);
      });
    }
    /**
     * @param {Object}      ruler                  -       表单规则
     * @param {Descriptor}  ruler[*]               -       所有 key 对应的值都应为 Descriptor 类型
     *
     * @param {Object}      messages               -       规则对应的提示信息
     * @param {Message}     messages[*]            -       所有 key 对应的值都应为 Descriptor 类型
     */

  }, {
    key: "__getControls",
    value: function __getControls(ruler) {
      var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var controls = {};
      Object.entries(ruler).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            key = _ref6[0],
            option = _ref6[1];

        var message = messages[key];
        controls[key] = new FormControl(option, message);
      });
      return controls;
    }
  }]);

  return FormBuilder;
}();

exports.FormBuilder = FormBuilder;