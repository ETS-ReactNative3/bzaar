/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { StyleProvider, Root } from 'native-base';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import OneSignal from 'react-native-onesignal';
import intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import reducer from './reducers/index';
import AppWithNavigationState from './components/navigation';
import PushController from './components/pushController';
import getTheme from '../native-base-theme/components';
import theme from '../native-base-theme/variables/commonColor';
// import PushNotification from 'react-native-push-notification';

// Intl Polyfill NumberFormat for android
if (!global.Intl.NumberFormat) {
  Intl.NumberFormat = intl.NumberFormat;
}

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
export const addListener = createReduxBoundAddListener('root');

const loggerMiddleware = createLogger();
const store = createStore(reducer, applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
  navMiddleware,
));

class Bzaar extends Component {
  componentDidMount() {
    OneSignal.init('c05d8228-2801-4667-837c-58229d79d06f');
  }
  /*
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    // AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      /* Desabilitado pois não teve uso
      PushNotification.localNotificationSchedule({
        message: "Volta aqui!!!", // (required)
        date: new Date(Date.now() + (1 * 1000)) // in 60 secs
      });
      console.log('The app is in background');
    }
  }
  */

  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(theme)}>
          <Root>
            <AppWithNavigationState />
            <PushController />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}

// export default codePush(codePushOptions)(Bzaar);
export default Bzaar;
