import { ScrollView } from 'devextreme-react';
import Button from 'devextreme-react/button';
import { Template } from 'devextreme-react/core/template';
import Drawer from 'devextreme-react/drawer';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addMenuRouter } from 'store/module/tagViews';
import { Footer, Header, SideNavigationMenu } from '../../components';
import HeaderTwo from '../../components/headertwo/header';
import { useScreenSize } from '../../utils/media-query';
import { useMenuPatch } from '../../utils/patches';
import './side-nav-inner-toolbar.scss';
export default function SideNavInnerToolbar({ title, children }) {
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const history = useHistory();
  // const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(
    MenuStatus.Opened 
  );

  const toggleMenu = useCallback(({ event }) => {
    setMenuStatus(
      prevMenuStatus => prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed
    );
    event.stopPropagation();
  }, []);

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus(
      prevMenuStatus => prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus
    );
  }, []);

  // const onOutsideClick = useCallback(() => {
  //   setMenuStatus(
  //     prevMenuStatus => prevMenuStatus !== MenuStatus.Closed && !isLarge
  //       ? MenuStatus.Closed
  //       : prevMenuStatus
  //   );
  // }, [isLarge]);

  const onNavigationChanged = useCallback(({ itemData: { path }, event, node, itemData: {children} }) => {
    if (menuStatus === MenuStatus.Closed || !path || node.selected) {
       event.preventDefault();
      return;
    }
    history.push(path);
    const action = addMenuRouter(children);
    dispatch(action);
    // scrollViewRef.current.instance.scrollTo(0);
    // if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
    //    setMenuStatus(MenuStatus.Closed);
    //    event.stopPropagation();
    // }
  }, [history, menuStatus]);
  return (
    <div className={'side-nav-inner-toolbar'}>
      <Drawer
        className={['drawer', patchCssClass].join(' ')}
        position={'before'}
        // closeOnOutsideClick={onOutsideClick}
        openedStateMode='shrink'
        revealMode= 'expand'
        minSize={ 60}
        maxSize={250}
        shading={false}
        opened={menuStatus === MenuStatus.Closed ? false : true}
        template={'menu'}
      >
        <div className={'container'}>
            <Header
              // menuToggleEnabled={isXSmall}
              // toggleMenu={toggleMenu}
            />
          <HeaderTwo
            // menuToggleEnabled={isXSmall}
            // toggleMenu={toggleMenu}
          />
          <ScrollView ref={scrollViewRef} className={'layout-body with-footer'}>
            <div className={'content'}>
              {React.Children.map(children, item => {
                return item.type !== Footer && item;
              })}
            </div>
            <div className={'content-block'}>
              {React.Children.map(children, item => {
                return item.type === Footer && item;
              })}
            </div>
          </ScrollView>
        </div>
        <Template name={'menu'}>
          <SideNavigationMenu
            compactMode={menuStatus === MenuStatus.Closed}
            selectedItemChanged={onNavigationChanged}
            openMenu={temporaryOpenMenu}
            onMenuReady={onMenuReady}
          >
            <Toolbar id={'navigation-header'}>
              
               
                <Item
                  location={'before'}
                  cssClass={'menu-button'}
                >
                  <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
                </Item>
              
              <Item location={'before'} cssClass={'header-title'} text={title} />
            </Toolbar>
          </SideNavigationMenu>
        </Template>
      </Drawer>
    </div>
  );
}

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3
};
