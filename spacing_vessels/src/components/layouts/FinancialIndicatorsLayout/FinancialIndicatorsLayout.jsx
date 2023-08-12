import React, {useEffect, useState} from 'react'
import {Outlet} from 'react-router'

import {MenuTabs} from '../../MenuTabs/MenuTabs'
import * as s from '../../../pages/Results/FinancialIndicators/style.module.scss'
import {ResultsFilter} from '../../Results/ResultsFilter/ResultsFilter'
import {resultsApi} from '../../../api/resultsApi'
import {useLocation, useParams} from 'react-router-dom'
import {Preloader} from '../../Preloader/Preloader'

function FinancialIndicatorsLayout() {
    const [filterList, setFilterList] = useState(null)
    const [zonesSelectedItems, setZonesSelectedItems] = useState([])
    const [vesselsSelectedItems, setVesselsSelectedItems] = useState([])
    const [monthsSelectedItems, setMonthsSelectedItems] = useState([])
    const tabs = [
        {
            id: 0,
            title: 'Все',
            path: 'all',
        },
        {
            id: 1,
            title: 'Месяца',
            path: 'months',
        },
        {
            id: 2,
            title: 'Суда',
            path: 'vessels',
        },
        {
            id: 3,
            title: 'EBITDA',
            path: 'ebitda',
        },
        {
            id: 4,
            title: 'Зоны',
            path: 'zones',
        },
    ]
    const [activeTabId, setActiveTabId] = useState(tabs[0].id)
    const {id} = useParams()
    const location = useLocation()

    useEffect(() => {
        getFilterList(id)
    }, [setFilterList])

    useEffect(() => {
        const curTabPath = location.pathname.split('/').at(-1)
        const curTab = tabs.find((tab) => tab.path === curTabPath)

        if (!curTab) return

        setActiveTabId(curTab.id)
    }, [location.pathname])

    const getFilterList = async (spacingId) => {
        try {
            const filters = await fetchFilterList(spacingId)
            setFilterList(filters)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchFilterList = async (spacingId) => {
        const response = await resultsApi.fetchFilterList(spacingId)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    return (
        <>
            {!filterList
                ? <div className={s.preloaderWrap}><Preloader /></div>
                : <>
                    <h3 className={s.filtersTitle}>Фильтр фин. показатели</h3>
                    <div className={s.filtersWrapper}>
                        <ResultsFilter
                            filter={filterList.months}
                            filterName={'Месяцы'}
                            selectedItems={monthsSelectedItems}
                            setSelectedItems={setMonthsSelectedItems}
                        />
                        <ResultsFilter
                            filter={filterList.vessels}
                            filterName={'Суда'}
                            selectedItems={vesselsSelectedItems}
                            setSelectedItems={setVesselsSelectedItems}
                        />
                        <ResultsFilter
                            filter={filterList.fishingZones}
                            filterName={'Зоны'}
                            selectedItems={zonesSelectedItems}
                            setSelectedItems={setZonesSelectedItems}
                        />
                    </div>
                    <div className={s.tabsWrap}>
                        <MenuTabs
                            tabs={tabs}
                            activeTabId={activeTabId}
                            setActiveTabId={setActiveTabId}
                        />
                    </div>
                </>
            }

            {filterList && (
                <Outlet
                    context={[
                        zonesSelectedItems.map((item) => item.id),
                        vesselsSelectedItems.map((item) => item.id),
                        monthsSelectedItems.map((item) => item.id),
                    ]}
                />
            )}
        </>
    )
}

export {FinancialIndicatorsLayout}
