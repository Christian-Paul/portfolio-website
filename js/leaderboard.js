'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Leaderboard = function (_React$Component) {
  _inherits(Leaderboard, _React$Component);

  function Leaderboard() {
    _classCallCheck(this, Leaderboard);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = { leaders: 0, userImage: 0, recent: 0, alltime: 0, lastUpdate: 0 };
    $.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/recent', function (json) {
      _this.setState({ leaders: json.map(function (item) {
          return item['username'];
        }) });
      _this.setState({ userImage: json.map(function (item) {
          return item['img'];
        }) });
      _this.setState({ recent: json.map(function (item) {
          return item['recent'];
        }) });
      _this.setState({ alltime: json.map(function (item) {
          return item['alltime'];
        }) });
      _this.setState({ lastUpdate: json.map(function (item) {
          return item['lastUpdate'].substring(0, 10);
        }) });
    });
    return _this;
  }

  Leaderboard.prototype.getRecent = function getRecent() {
    var _this2 = this;

    $.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/recent', function (json) {
      _this2.setState({ leaders: json.map(function (item) {
          return item['username'];
        }) });
      _this2.setState({ userImage: json.map(function (item) {
          return item['img'];
        }) });
      _this2.setState({ recent: json.map(function (item) {
          return item['recent'];
        }) });
      _this2.setState({ alltime: json.map(function (item) {
          return item['alltime'];
        }) });
      _this2.setState({ lastUpdate: json.map(function (item) {
          return item['lastUpdate'].substring(0, 10);
        }) });
    });
  };

  Leaderboard.prototype.getAllTime = function getAllTime() {
    var _this3 = this;

    $.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', function (json) {
      _this3.setState({ leaders: json.map(function (item) {
          return item['username'];
        }) });
      _this3.setState({ userImage: json.map(function (item) {
          return item['img'];
        }) });
      _this3.setState({ recent: json.map(function (item) {
          return item['recent'];
        }) });
      _this3.setState({ alltime: json.map(function (item) {
          return item['alltime'];
        }) });
      _this3.setState({ lastUpdate: json.map(function (item) {
          return item['lastUpdate'].substring(0, 10);
        }) });
    });
  };

  Leaderboard.prototype.render = function render() {
    var imageList = this.state.userImage;
    return React.createElement(
      'div',
      { className: 'holder' },
      React.createElement(
        'div',
        { className: 'column column-1' },
        React.createElement(
          'div',
          { className: 'column-title column-1-title' },
          'Name'
        ),
        this.state.leaders
      ),
      React.createElement(
        'div',
        { className: 'column column-2' },
        React.createElement(
          'div',
          { className: 'column-title column-2-title', onClick: this.getRecent.bind(this) },
          'Recent'
        ),
        this.state.recent
      ),
      React.createElement(
        'div',
        { className: 'column column-3' },
        React.createElement(
          'div',
          { className: 'column-title column-3-title', onClick: this.getAllTime.bind(this) },
          'All Time'
        ),
        this.state.alltime
      ),
      React.createElement(
        'div',
        { className: 'column column-4' },
        React.createElement(
          'div',
          { className: 'column-title column-4-title' },
          'Last Updated'
        ),
        this.state.lastUpdate
      )
    );
  };

  return Leaderboard;
}(React.Component);

React.render(React.createElement(Leaderboard, null), document.getElementById('users'));