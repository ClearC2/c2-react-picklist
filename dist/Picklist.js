'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};

var Pane = function (_Component) {
  _inherits(Pane, _Component);

  function Pane() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pane.__proto__ || Object.getPrototypeOf(Pane)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      search: false,
      searchText: ''
    }, _this.onFlush = function (e) {
      e.preventDefault();
      _this.props.onAction(_this.items());
      _this.setState({ searchText: '' });
    }, _this.items = function () {
      var _this$props = _this.props,
          items = _this$props.items,
          labelKey = _this$props.labelKey;
      var _this$state = _this.state,
          search = _this$state.search,
          searchText = _this$state.searchText;

      if (search) {
        items = items.filter(function (item) {
          return String(item[labelKey]).toLowerCase().includes(searchText.toLowerCase());
        });
      }
      return items;
    }, _this.onSearchElementCLick = function (e) {
      e.preventDefault();
      _this.setState({ search: !_this.state.search, searchText: '' });
    }, _this.renderOption = function (option) {
      var _this$props2 = _this.props,
          panelId = _this$props2.panelId,
          valueKey = _this$props2.valueKey,
          labelKey = _this$props2.labelKey,
          onAction = _this$props2.onAction,
          renderOption = _this$props2.renderOption;

      var onClick = function onClick(e) {
        e.preventDefault();
        onAction([option]);
      };
      if (renderOption) {
        return renderOption({ option: option, onClick: onClick, panelId: panelId });
      }
      return _react2.default.createElement(
        'a',
        {
          href: '',
          'data-testid': panelId + '-' + option[valueKey],
          onClick: function onClick(e) {
            e.preventDefault();
            onAction([option]);
          }
        },
        option[labelKey]
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pane, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          valueKey = _props.valueKey,
          actionElement = _props.actionElement,
          height = _props.height,
          paneRef = _props.paneRef,
          paneLabel = _props.paneLabel,
          panelId = _props.panelId,
          searchElement = _props.searchElement,
          searchInputClassName = _props.searchInputClassName;

      var items = this.items();
      var innerDivStyle = { height: height, overflow: height ? 'auto' : null };
      return _react2.default.createElement(
        'div',
        { ref: paneRef },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-3' },
            paneLabel
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-9 text-right' },
            _react2.default.createElement(
              'a',
              { href: '', onClick: this.onFlush, 'data-testid': panelId + '-bulk-action' },
              actionElement
            ),
            '\xA0\xA0\xA0',
            _react2.default.createElement(
              'a',
              {
                href: '',
                'data-testid': panelId + '-search-toggle',
                onClick: this.onSearchElementCLick
              },
              searchElement
            )
          )
        ),
        _react2.default.createElement('hr', { style: { margin: 0 } }),
        _react2.default.createElement(
          'div',
          { style: innerDivStyle },
          this.state.search ? _react2.default.createElement('input', {
            type: 'text',
            className: searchInputClassName,
            placeholder: 'Search',
            value: this.state.searchText,
            onChange: function onChange(e) {
              return _this2.setState({
                searchText: e.target.value,
                selected: {},
                selectAll: false
              });
            },
            'data-testid': panelId + '-search-input'
          }) : null,
          items.map(function (option) {
            return _react2.default.createElement(
              'span',
              { key: option[valueKey] },
              _this2.renderOption(option),
              _react2.default.createElement('br', null)
            );
          }),
          items.length === 0 ? _react2.default.createElement('br', null) : null
        )
      );
    }
  }]);

  return Pane;
}(_react.Component);

Pane.propTypes = {
  items: _propTypes2.default.array,
  valueKey: _propTypes2.default.string,
  labelKey: _propTypes2.default.string,
  onAction: _propTypes2.default.func,
  actionElement: _propTypes2.default.any,
  paneLabel: _propTypes2.default.any,
  height: _propTypes2.default.number,
  paneRef: _propTypes2.default.func,
  resize: _propTypes2.default.func,
  panelId: _propTypes2.default.string,
  searchElement: _propTypes2.default.any,
  renderItem: _propTypes2.default.func,
  renderOption: _propTypes2.default.func
};
Pane.defaultProps = {
  items: [],
  valueKey: 'value',
  labelKey: 'label',
  onAction: noop,
  actionElement: 'Submit',
  paneLabel: 'Items',
  paneRef: noop,
  resize: noop
};

var Picklist = function (_Component2) {
  _inherits(Picklist, _Component2);

  function Picklist() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, Picklist);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = Picklist.__proto__ || Object.getPrototypeOf(Picklist)).call.apply(_ref2, [this].concat(args))), _this3), _this3.add = function (options) {
      var _this3$props = _this3.props,
          value = _this3$props.value,
          valueKey = _this3$props.valueKey,
          onChange = _this3$props.onChange;

      var values = value.slice(0);
      options.forEach(function (option) {
        var found = values.find(function (o) {
          return o[valueKey] === option[valueKey];
        });
        if (!found) {
          values.push(option);
        }
      });
      onChange(values);
    }, _this3.remove = function (options) {
      var _this3$props2 = _this3.props,
          value = _this3$props2.value,
          valueKey = _this3$props2.valueKey,
          onChange = _this3$props2.onChange;

      var values = value.slice(0);
      var keys = options.map(function (opt) {
        return opt[valueKey];
      });
      keys.forEach(function (key) {
        var index = values.map(function (o) {
          return o[valueKey];
        }).indexOf(key);
        if (index > -1) {
          values.splice(index, 1);
        }
      });
      onChange(values);
    }, _this3.getAvailableOptions = function () {
      var _this3$props3 = _this3.props,
          options = _this3$props3.options,
          value = _this3$props3.value,
          valueKey = _this3$props3.valueKey;

      return options.filter(function (option) {
        return value.find(function (v) {
          return v[valueKey] === option[valueKey];
        }) === undefined;
      });
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(Picklist, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: 'row c2-react-picklist' },
        _react2.default.createElement(
          'div',
          { className: 'col-6 c2-react-picklist-pane' },
          _react2.default.createElement(Pane, _extends({
            actionElement: 'Add all'
          }, this.props, {
            paneLabel: this.props.leftPaneLabel,
            items: this.getAvailableOptions(),
            onAction: function onAction(options) {
              return _this4.add(options);
            },
            panelId: 'options'
          }))
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-6 c2-react-picklist-pane' },
          _react2.default.createElement(Pane, _extends({
            actionElement: 'Remove all'
          }, this.props, {
            paneLabel: this.props.rightPaneLabel,
            items: this.props.value,
            onAction: function onAction(options) {
              return _this4.remove(options);
            },
            panelId: 'selected'
          }))
        )
      );
    }
  }]);

  return Picklist;
}(_react.Component);

Picklist.propTypes = {
  options: _propTypes2.default.array,
  value: _propTypes2.default.array,
  labelKey: _propTypes2.default.string,
  valueKey: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  height: _propTypes2.default.number,
  leftPaneLabel: _propTypes2.default.any,
  rightPaneLabel: _propTypes2.default.any,
  searchElement: _propTypes2.default.any,
  searchInputClassName: _propTypes2.default.any,
  renderOption: _propTypes2.default.func
};
Picklist.defaultProps = {
  options: [],
  labelKey: 'label',
  valueKey: 'value',
  value: [],
  onChange: noop,
  height: null,
  leftPaneLabel: 'Options',
  rightPaneLabel: 'Selected',
  searchElement: _react2.default.createElement(
    'span',
    null,
    '\uD83D\uDD0D'
  ),
  searchInputClassName: 'form-control form-control-sm'
};
exports.default = Picklist;