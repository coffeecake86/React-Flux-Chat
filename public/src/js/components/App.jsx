'use strict';
/*jshint quotmark:false */
var React = require('react');

var AppHeader = require('./AppHeader.jsx');
var WelcomePanel = require('./WelcomePanel.jsx');
var LoadingScreen = require('./LoadingScreen.jsx');
var NavigationPanel = require('./NavigationPanel.jsx');
var ChatRoomManager = require('./ChatRoomManager.jsx');

var APP_MODES = require('../constants').APP_MODES;

var AppStore = require('../stores/AppStore');

var App = React.createClass({
  getInitialState: function () {
    return {isInitialized: AppStore.isInitialized(), mode: AppStore.getMode()};
  },

  componentDidMount: function () {
    AppStore.addChangeListener(this._appStoreUpdateListener);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(this._appStoreUpdateListener);
  },

  render: function () {
    var bodyComponent;
    if (this.state.isInitialized) {
      bodyComponent = this._getChatBody();
    } else {
      bodyComponent = this._getLoadingBody();
    }
    return (
      <div>
        <AppHeader />
        <div className="app-content">
            {bodyComponent}
        </div>
      </div>
    );
  },
  _getChatBody: function () {
    var mainViewComponent;
    if (this.state.mode === APP_MODES.CHAT) {
      mainViewComponent = <ChatRoomManager />;
    } else {
      mainViewComponent = <WelcomePanel />;
    }
    return (
      <div>
        <NavigationPanel />
        <div className = "chat-room-col" >
          {mainViewComponent}
        </div>
      </div>
    );
  },
  _getLoadingBody: function () {
    return <LoadingScreen />;
  },
  _appStoreUpdateListener: function () {
    this.setState({isInitialized: AppStore.isInitialized(), mode: AppStore.getMode()});
  }
});

module.exports = App;