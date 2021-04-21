import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

var noop = function noop() {}; // https://react-dnd.github.io/react-dnd/examples/sortable/simple


function DnDOption(_ref) {
  var option = _ref.option,
      index = _ref.index,
      labelKey = _ref.labelKey,
      onAction = _ref.onAction,
      moveOption = _ref.moveOption;
  var ref = useRef(null);

  var _useDrop = useDrop({
    accept: 'option',
    collect: function collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover: function hover(item, monitor) {
      var _ref$current;

      if (!ref.current) {
        return;
      }

      var dragIndex = item.index;
      var hoverIndex = index; // Don't replace items with themselves

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      } // Determine rectangle on screen


      // Determine rectangle on screen
      var hoverBoundingRect = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect(); // Get vertical middle

      // Get vertical middle
      var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Determine mouse position

      // Determine mouse position
      var clientOffset = monitor.getClientOffset(); // Get pixels to the top

      // Get pixels to the top
      var hoverClientY = clientOffset.y - hoverBoundingRect.top; // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      } // Dragging upwards


      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      } // Time to actually perform the action


      // Time to actually perform the action
      moveOption(dragIndex, hoverIndex); // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      handlerId = _useDrop2[0].handlerId,
      drop = _useDrop2[1];

  var _useDrag = useDrag({
    type: 'option',
    item: function item() {
      return {
        index: index
      };
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    }
  }),
      _useDrag2 = _slicedToArray(_useDrag, 2),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1];

  drag(drop(ref));
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    "data-handler-id": handlerId
  }, /*#__PURE__*/React.createElement("a", {
    href: "",
    style: {
      cursor: isDragging ? 'move' : 'pointer'
    },
    onClick: function onClick(e) {
      return e.preventDefault();
    },
    onDoubleClick: function onDoubleClick(e) {
      e.preventDefault();
      onAction([option]);
    }
  }, option[labelKey]), /*#__PURE__*/React.createElement("br", null));
}

__signature__(DnDOption, "useRef{ref}\nuseDrop{[{handlerId}, drop]}\nuseDrag{[{isDragging}, drag]}", function () {
  return [useDrop, useDrag];
});

DnDOption.propTypes = {
  option: PropTypes.object,
  index: PropTypes.number,
  labelKey: PropTypes.string,
  onAction: PropTypes.func,
  moveOption: PropTypes.func
};

var Pane = /*#__PURE__*/function (_Component) {
  _inherits(Pane, _Component);

  var _super = _createSuper(Pane);

  function Pane() {
    var _context;

    var _this;

    _classCallCheck(this, Pane);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, _concatInstanceProperty(_context = [this]).call(_context, args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      search: false,
      searchText: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onFlush", function (e) {
      e.preventDefault();

      _this.props.onAction(_this.items());

      _this.setState({
        searchText: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "items", function () {
      var _this$props = _this.props,
          items = _this$props.items,
          labelKey = _this$props.labelKey;
      var _this$state = _this.state,
          search = _this$state.search,
          searchText = _this$state.searchText;

      if (search) {
        items = _filterInstanceProperty(items).call(items, function (item) {
          var _context2;

          return _includesInstanceProperty(_context2 = String(item[labelKey]).toLowerCase()).call(_context2, searchText.toLowerCase());
        });
      }

      return items;
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchElementCLick", function (e) {
      e.preventDefault();

      _this.setState({
        search: !_this.state.search,
        searchText: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderOption", function (option) {
      var _context3;

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
        return renderOption({
          option: option,
          onClick: onClick,
          panelId: panelId
        });
      }

      return /*#__PURE__*/React.createElement("a", {
        href: "",
        "data-testid": _concatInstanceProperty(_context3 = "".concat(panelId, "-")).call(_context3, option[valueKey]),
        onClick: onClick
      }, option[labelKey]);
    });

    _defineProperty(_assertThisInitialized(_this), "moveOption", function (dragIndex, hoverIndex) {
      var items = _this.items();

      _spliceInstanceProperty(items).call(items, hoverIndex, 0, _spliceInstanceProperty(items).call(items, dragIndex, 1)[0]);

      _this.props.onChange(items);
    });

    return _this;
  }

  _createClass(Pane, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          valueKey = _this$props3.valueKey,
          labelKey = _this$props3.labelKey,
          actionElement = _this$props3.actionElement,
          onAction = _this$props3.onAction,
          height = _this$props3.height,
          paneRef = _this$props3.paneRef,
          paneLabel = _this$props3.paneLabel,
          panelId = _this$props3.panelId,
          searchElement = _this$props3.searchElement,
          searchInputClassName = _this$props3.searchInputClassName;
      var items = this.items();
      var innerDivStyle = {
        height: height,
        overflow: height ? 'auto' : null
      };
      return /*#__PURE__*/React.createElement("div", {
        ref: paneRef
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-3"
      }, paneLabel), /*#__PURE__*/React.createElement("div", {
        className: "col-9 text-right"
      }, /*#__PURE__*/React.createElement("a", {
        href: "",
        onClick: this.onFlush,
        "data-testid": "".concat(panelId, "-bulk-action")
      }, actionElement), "\xA0\xA0\xA0", /*#__PURE__*/React.createElement("a", {
        href: "",
        "data-testid": "".concat(panelId, "-search-toggle"),
        onClick: this.onSearchElementCLick
      }, searchElement))), /*#__PURE__*/React.createElement("hr", {
        style: {
          margin: 0
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: innerDivStyle
      }, this.state.search ? /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: searchInputClassName,
        placeholder: "Search",
        value: this.state.searchText,
        onChange: function onChange(e) {
          return _this2.setState({
            searchText: e.target.value,
            selected: {},
            selectAll: false
          });
        },
        "data-testid": "".concat(panelId, "-search-input")
      }) : null, _mapInstanceProperty(items).call(items, function (option, i) {
        if (_this2.props.DnD) {
          return /*#__PURE__*/React.createElement(DnDOption, {
            key: option[valueKey],
            option: option,
            index: i,
            labelKey: labelKey,
            onAction: onAction,
            moveOption: _this2.moveOption
          });
        }

        return /*#__PURE__*/React.createElement("span", {
          key: option[valueKey]
        }, _this2.renderOption(option), /*#__PURE__*/React.createElement("br", null));
      }), items.length === 0 ? /*#__PURE__*/React.createElement("br", null) : null));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    value: // @ts-ignore
    function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Pane;
}(Component);

_defineProperty(Pane, "propTypes", {
  items: PropTypes.array,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  onAction: PropTypes.func,
  onChange: PropTypes.func,
  actionElement: PropTypes.any,
  paneLabel: PropTypes.any,
  height: PropTypes.number,
  paneRef: PropTypes.func,
  resize: PropTypes.func,
  panelId: PropTypes.string,
  searchElement: PropTypes.any,
  renderItem: PropTypes.func,
  renderOption: PropTypes.func,
  DnD: PropTypes.bool,
  searchInputClassName: PropTypes.string
});

_defineProperty(Pane, "defaultProps", {
  items: [],
  valueKey: 'value',
  labelKey: 'label',
  onAction: noop,
  onChange: noop,
  actionElement: 'Submit',
  paneLabel: 'Items',
  paneRef: noop,
  resize: noop,
  DnD: false
});

var Picklist = /*#__PURE__*/function (_Component2) {
  _inherits(Picklist, _Component2);

  var _super2 = _createSuper(Picklist);

  function Picklist() {
    var _context4;

    var _this3;

    _classCallCheck(this, Picklist);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _super2.call.apply(_super2, _concatInstanceProperty(_context4 = [this]).call(_context4, args));

    _defineProperty(_assertThisInitialized(_this3), "add", function (options) {
      var _this3$props = _this3.props,
          value = _this3$props.value,
          valueKey = _this3$props.valueKey,
          onChange = _this3$props.onChange;

      var values = _sliceInstanceProperty(value).call(value, 0);

      _forEachInstanceProperty(options).call(options, function (option) {
        var found = _findInstanceProperty(values).call(values, function (o) {
          return o[valueKey] === option[valueKey];
        });

        if (!found) {
          values.push(option);
        }
      });

      onChange(values);
    });

    _defineProperty(_assertThisInitialized(_this3), "remove", function (options) {
      var _this3$props2 = _this3.props,
          value = _this3$props2.value,
          valueKey = _this3$props2.valueKey,
          onChange = _this3$props2.onChange;

      var values = _sliceInstanceProperty(value).call(value, 0);

      var keys = _mapInstanceProperty(options).call(options, function (opt) {
        return opt[valueKey];
      });

      _forEachInstanceProperty(keys).call(keys, function (key) {
        var _context5;

        var index = _indexOfInstanceProperty(_context5 = _mapInstanceProperty(values).call(values, function (o) {
          return o[valueKey];
        })).call(_context5, key);

        if (index > -1) {
          _spliceInstanceProperty(values).call(values, index, 1);
        }
      });

      onChange(values);
    });

    _defineProperty(_assertThisInitialized(_this3), "getAvailableOptions", function () {
      var _this3$props3 = _this3.props,
          options = _this3$props3.options,
          value = _this3$props3.value,
          valueKey = _this3$props3.valueKey;
      return _filterInstanceProperty(options).call(options, function (option) {
        return _findInstanceProperty(value).call(value, function (v) {
          return v[valueKey] === option[valueKey];
        }) === undefined;
      });
    });

    return _this3;
  }

  _createClass(Picklist, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      return /*#__PURE__*/React.createElement(DndProvider, {
        backend: HTML5Backend
      }, /*#__PURE__*/React.createElement("div", {
        className: "row c2-react-picklist"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-6 c2-react-picklist-pane"
      }, /*#__PURE__*/React.createElement(Pane, _extends({
        actionElement: "Add all"
      }, this.props, {
        paneLabel: this.props.leftPaneLabel,
        items: this.getAvailableOptions(),
        onAction: function onAction(options) {
          return _this4.add(options);
        },
        panelId: "options",
        DnD: false
      }))), /*#__PURE__*/React.createElement("div", {
        className: "col-6 c2-react-picklist-pane"
      }, /*#__PURE__*/React.createElement(Pane, _extends({
        actionElement: "Remove all"
      }, this.props, {
        paneLabel: this.props.rightPaneLabel,
        items: this.props.value,
        onAction: function onAction(options) {
          return _this4.remove(options);
        },
        panelId: "selected"
      })))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    value: // @ts-ignore
    function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Picklist;
}(Component);

_defineProperty(Picklist, "propTypes", {
  options: PropTypes.array,
  value: PropTypes.array,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  onChange: PropTypes.func,
  height: PropTypes.number,
  leftPaneLabel: PropTypes.any,
  rightPaneLabel: PropTypes.any,
  searchElement: PropTypes.any,
  searchInputClassName: PropTypes.any,
  renderOption: PropTypes.func,
  DnD: PropTypes.bool
});

_defineProperty(Picklist, "defaultProps", {
  options: [],
  labelKey: 'label',
  valueKey: 'value',
  value: [],
  onChange: noop,
  height: null,
  leftPaneLabel: 'Options',
  rightPaneLabel: 'Selected',
  searchElement: /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD0D"),
  searchInputClassName: 'form-control form-control-sm',
  DnD: false
});

var _default = Picklist;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(noop, "noop", "/home/circleci/repo/src/Picklist.js");
  reactHotLoader.register(DnDOption, "DnDOption", "/home/circleci/repo/src/Picklist.js");
  reactHotLoader.register(Pane, "Pane", "/home/circleci/repo/src/Picklist.js");
  reactHotLoader.register(Picklist, "Picklist", "/home/circleci/repo/src/Picklist.js");
  reactHotLoader.register(_default, "default", "/home/circleci/repo/src/Picklist.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();