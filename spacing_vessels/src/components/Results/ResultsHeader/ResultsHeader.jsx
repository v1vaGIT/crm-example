import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import * as s from './style.module.scss'
import {MenuTabs} from '../../MenuTabs/MenuTabs'

const ResultsHeader = ({tabs}) => {
    const [showDescriptionPopup, setShowDescriptionPopup] = useState(false)
    const [activeTabId, setActiveTabId] = useState(tabs[0].id)
    const location = useLocation()
    const allDesignations = [
        {
            id: 0,
            title: 'P_ZK - Минтай Западная Камчатка',
            background: '#E27A4D',
        },
        {
            id: 1,
            title: 'P_KK - Минтай Камчато-Курильская',
            background: '#62C7BB',
        },
        {
            id: 2,
            title: 'P_COM - Минтай Северо-ОхотоМорский',
            background: '#6AAA78',
        },
        {
            id: 3,
            title: 'P_VS - Минтай Восточный Сахалин',
            background: '#919A2C',
        },
        {
            id: 4,
            title: 'P_BME - Минтай Западно-Беринговоморский',
            background: '#6998F4',
        },
        {
            id: 5,
            title: 'P_KAR - Минтай Карагинский',
            background: '#DA4646',
        },
        {
            id: 6,
            title: 'P_SK - Минтай Северные Курилы',
            background: '#CA628D',
        },
        {
            id: 7,
            title: 'P_PK - Минтай Петропавловск-Командорская',
            background: '#1466DF',
        },
        {
            id: 8,
            title: 'P_UK - Минтай Южные Курилы (оно же з.ЮК)',
            background: '#8B3131',
        },
        {
            id: 9,
            title: 'H_COM - Сельдь Северо-ОхотоМорский',
            background: '#8E63D4',
        },
        {
            id: 10,
            title: 'H_ZK - Сельдь Западная Камчатка',
            background: '#26665E',
        },
        {
            id: 11,
            title: 'H_BME - Сельдь Западно-Беринговоморский',
            background: '#8F643C',
        },
        {
            id: 12,
            title: 'LEM_JP - Лемонема Зона Японии',
            background: '#7DC188',
        },
        {
            id: 13,
            title: 'LEM_UK - Лемонема Южные Курилы',
            background: '#673535',
        },
        {
            id: 14,
            title: 'MAK_UK - Скумбрия Южные Курилы',
            background: '#E5A754',
        },
        {
            id: 15,
            title: 'Простой в порту',
            background: '#E8E8E8',
        },
    ]

    useEffect(() => {
        const curTab = tabs.find((tab) => location.pathname.includes(tab.path))
        if (!curTab) return
        setActiveTabId(curTab.id)
    }, [location.pathname])

    const designations = allDesignations.map((designation) => {
        return (
            <div className={s.designationWrap} key={designation.id}>
                <span
                    className={s.designationCircle}
                    style={{background: designation.background}}
                />
                <p className={s.designationTitle}>{designation.title}</p>
            </div>
        )
    })

    return (
        <div className={s.wrapper}>
            <MenuTabs tabs={tabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
            {activeTabId === tabs[0].id && (
                <div
                    className={s.descriptionWrap}
                    onClick={() => setShowDescriptionPopup(!showDescriptionPopup)}
                >
                    <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M11.4766 16.95C11.2004 16.95 10.9766 16.7261 10.9766 16.45V10.5864C10.9766 10.3102 11.2004 10.0864 11.4766 10.0864H12.5188C12.795 10.0864 13.0188 10.3102 13.0188 10.5864V16.45C13.0188 16.7261 12.795 16.95 12.5188 16.95H11.4766Z'
                            fill='#85858C'
                        />
                        <path
                            d='M12.001 8.63715C11.6974 8.63715 11.4369 8.53647 11.2196 8.33512C11.0054 8.13058 10.8984 7.88608 10.8984 7.60163C10.8984 7.32038 11.0054 7.07909 11.2196 6.87774C11.4369 6.67319 11.6974 6.57092 12.001 6.57092C12.3046 6.57092 12.5635 6.67319 12.7776 6.87774C12.995 7.07909 13.1036 7.32038 13.1036 7.60163C13.1036 7.88608 12.995 8.13058 12.7776 8.33512C12.5635 8.53647 12.3046 8.63715 12.001 8.63715Z'
                            fill='#85858C'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z'
                            fill='#85858C'
                        />
                    </svg>
                    <p className={s.description}>Обозначения</p>
                    {showDescriptionPopup && (
                        <div className={s.descriptionPopup} onClick={(e) => e.stopPropagation()}>
                            {designations}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export {ResultsHeader}
