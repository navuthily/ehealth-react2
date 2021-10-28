import { Sortable } from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';
import 'devextreme/data/odata/store';
import { HomePage, ProfilePage, TasksPage } from 'pages';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { onTabDrop, removeMenuRouter } from 'store/module/tagViews';
import './header.scss';

export const fetchUser = (dis, state) => async (dispatch, getState) => {
  return dis(onTabDrop(state));
}

function HeaderTwo() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const history = useHistory();
  let isArrayHtml = [];
  const list = useSelector((state) => state.tagViews);
  const [selectedItem, setSelectedItem] = React.useState({});
  for (const [key, value] of Object.entries(list)) {
    isArrayHtml.push(list[key][0].meta);
  }
  const closeButtonHandler = React.useCallback((item) => {
    const index = isArrayHtml.indexOf(item);
    dispatch(removeMenuRouter(item));
    if (index <= isArrayHtml.length && index > 0) {
      const getPositionIndex = isArrayHtml[index - 1];
      history.push(getPositionIndex?.path);
      setSelectedItem(getPositionIndex);
    }
  });

  useEffect(() => {
    isArrayHtml.map(index => {
      if (index?.path === pathname) {
        setSelectedItem(index);
      }
    })
  }, [pathname, isArrayHtml])

  const closeHandler = React.useCallback((data) => {
    return () => closeButtonHandler(data);
  });

  const renderTitle = React.useCallback((data) => {
    return (
      <React.Fragment>
        <div>
          <span>
            {data?.text}
          </span>
          {isArrayHtml.length >= 1 && <i className="dx-icon dx-icon-close" onClick={closeHandler(data)} />}
        </div>
      </React.Fragment>
    );
  });

  // const onTabsSelectionChanged = (args)  => {
  //    history.push(args?.removedItems[0]?.path);
  // }

  const onSelectionChanged = React.useCallback((args) => {
    setSelectedItem(args?.addedItems[0]);
    history.push(args?.addedItems[0].path);
  });

  const onTabDragStart = React.useCallback((e) => {
    e.itemData = e.fromData[e.fromIndex];
  });

  const onTabDrop = React.useCallback((e) => {
    isArrayHtml.splice(e.fromIndex, 1);
    isArrayHtml.splice(e.toIndex, 0, e.itemData);
    const result = fetchUser(dispatch, isArrayHtml);
    result();
  });

  return (
    <React.Fragment>
      <Sortable
        filter=".dx-tab"
        data={isArrayHtml}
        itemOrientation="horizontal"
        dragDirection="horizontal"
        onDragStart={onTabDragStart}
        onReorder={onTabDrop}
      >
        <TabPanel
          dataSource={isArrayHtml}
          height={"100%"}
          itemTitleRender={renderTitle}
          deferRendering={false}
          showNavButtons={true}
          selectedItem={selectedItem}
          repaintChangesOnly={true}
          onSelectionChanged={onSelectionChanged}
          itemComponent={() => { return <> </> }}
        />
        {/* <Tabs
            dataSource={isArrayHtml}
            selectedIndex={selectedItem}
            // onOptionChanged={onTabsSelectionChanged}
            deferRendering={false}
            showNavButtons={true}
            onSelectionChanged={onTabsSelectionChanged}
          /> */}
      </Sortable>
      {/* <Tasks /> */}
    </React.Fragment>
  );
}

export default HeaderTwo;
