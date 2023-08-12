import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import * as s from './style.module.scss'
import {resultsApi} from '../../../api/resultsApi'

import {ResultsFilter} from '../../../components/Results/ResultsFilter/ResultsFilter'
import {Preloader} from '../../../components/Preloader/Preloader'
import {CatchWithFilter} from '../../../components/resultTables/CatchWithFilter/CatchWithFilter'

const Catch = () => {
    const [filterList, setFilterList] = useState(null)
    const [zonesSelectedItems, setZonesSelectedItems] = useState([])
    const [vesselsSelectedItems, setVesselsSelectedItems] = useState([])
    const [tableFilling, setTableFilling] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        getFilterList(id)
    }, [setFilterList])

    useEffect(() => {
        const filterItems = {
            fishingZones: zonesSelectedItems.map((item) => item.id),
            vessels: vesselsSelectedItems.map((item) => item.id),
        }

        getCatchingCountsTable(id, 'catching-counts', filterItems)
    }, [zonesSelectedItems, vesselsSelectedItems])

    const getFilterList = async (spacingId) => {
        try {
            const filters = await fetchFilterList(spacingId)
            setFilterList({
                fishingZones: filters.fishingZones,
                vessels: filters.vessels,
            })
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

    const getCatchingCountsTable = async (spacingId, tableCode, filterItems) => {
        try {
            const tableFillingResponse = await fetchCatchingCountsTable(
                spacingId,
                tableCode,
                filterItems
            )
            setTableFilling(tableFillingResponse.vessels)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchCatchingCountsTable = async (spacingId, tableCode, filterItems) => {
        const response = await resultsApi.fetchResultTable(spacingId, tableCode, filterItems)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    return (
        <>
            {filterList && (
                <>
                    <h3 className={s.filtersTitle}>Фильтр вылова</h3>
                    <div className={s.filtersWrapper}>
                        <ResultsFilter
                            filter={filterList.fishingZones}
                            filterName={'Зоны'}
                            selectedItems={zonesSelectedItems}
                            setSelectedItems={setZonesSelectedItems}
                        />
                        <ResultsFilter
                            filter={filterList.vessels}
                            filterName={'Суда'}
                            selectedItems={vesselsSelectedItems}
                            setSelectedItems={setVesselsSelectedItems}
                        />
                    </div>
                </>
            )}

            {filterList && tableFilling ? (
                <CatchWithFilter table={tableFilling} />
            ) : (
                <div className={s.preloaderWrap}>
                    <Preloader />
                </div>
            )}
        </>
    )
}

export {Catch}
