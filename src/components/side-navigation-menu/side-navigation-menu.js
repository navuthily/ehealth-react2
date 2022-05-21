import TreeView from 'devextreme-react/tree-view';
import * as events from 'devextreme/events';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { navigation } from '../../app-navigation';
import { useNavigation } from '../../contexts/navigation';
import { useScreenSize } from '../../utils/media-query';
import './side-navigation-menu.scss';


export default function SideNavigationMenu(props) {
  const {
    children,
    selectedItemChanged,
    openMenu,
    compactMode,
    onMenuReady
  } = props;

  const { isLarge } = useScreenSize();
  function normalizePath () {
    return navigation.map((item) => {
      if(item.path && !(/^\//.test(item.path))){
        item.path = `/${item.path}`;
      }
      return {...item, expanded: isLarge};
    });
  }
  const items = useMemo(
    normalizePath,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { navigationData: { currentPath } } = useNavigation();

  const treeViewRef = useRef();
  const wrapperRef = useRef();
  const getWrapperRef = useCallback((element) => {
    const prevElement = wrapperRef.current;
    if (prevElement) {
      events.off(prevElement, 'dxclick');
    }

    wrapperRef.current = element;
    events.on(element, 'dxclick', e => {
      openMenu(e);
    });
  }, [openMenu]);

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  return (
    <div
      className={'dx-swatch-additional side-navigation-menu'}
      ref={getWrapperRef}
    >
      {children}
      <div className={'menu-container'}>
        <TreeView
          searchEnabled={!compactMode}
          searchMode="contains"
          ref={treeViewRef}
          items={items}
          keyExpr={'path'}
          selectionMode={'single'}
          focusStateEnabled={false}
          expandEvent={'click'}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={'100%'}
        />
      </div>
    </div>
  );
}