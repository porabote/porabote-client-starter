import React from 'react'

type TabPanelType = {
    tabKey?: number;
    selectedIndex?: number;
    children?: React.ReactChild
};

const TabPanel = (props: TabPanelType) => {

    const selectedState = (props.tabKey != props.selectedIndex) ? '' : 'selected'

    return(
        <div className={`tabs__item ${selectedState}`}>
            {props.children}
        </div>
    )
}

export default TabPanel