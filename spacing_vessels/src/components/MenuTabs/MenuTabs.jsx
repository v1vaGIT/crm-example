import React from 'react'
import cn from 'classnames'
import * as s from './style.module.scss'
import {useNavigate} from 'react-router'

const MenuTabs = ({tabs, activeTabId, setActiveTabId}) => {
    const navigate = useNavigate()
    const navigateToCorrectTab = (id, path) => {
        if (id === activeTabId) return

        setActiveTabId(id)
        navigate(path)
    }

    return (
        <div className={s.tabs}>
            {tabs.map((tab) => {
                const tabStyle = cn(s.tab, {[s.active]: tab.id === activeTabId})
                return (
                    <div
                        key={tab.id}
                        id={tab.id}
                        className={tabStyle}
                        onClick={() => navigateToCorrectTab(tab.id, tab.path)}
                    >
                        {tab.title}
                    </div>
                )
            })}
        </div>
    )
}

export {MenuTabs}
