import LoadPanel from 'devextreme-react/load-panel';
import 'devextreme/dist/css/dx.common.css';
import React from 'react';
import { AliveScope } from 'react-activation';
import { HashRouter as Router } from 'react-router-dom';
import Content from './Content';
import { AuthProvider, useAuth } from './contexts/auth';
import { NavigationProvider } from './contexts/navigation';
import './dx-styles.scss';
import './themes/generated/theme.additional.css';
import './themes/generated/theme.base.css';
import UnauthenticatedContent from './UnauthenticatedContent';
import { useScreenSizeClass } from './utils/media-query';

import viMessages from "devextreme/localization/messages/vi.json";

import { locale, loadMessages, formatMessage } from "devextreme/localization";
function App() {
  locale("vi");
  loadMessages(viMessages);
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (user) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
}

export default function Root() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <AliveScope>
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <div className={`app ${screenSizeClass}`}>
            <App />
          </div>
        </NavigationProvider>
      </AuthProvider>
    </Router>
    </AliveScope>
  );
}
