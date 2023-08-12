import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import * as s from './style.module.scss'
import {resultsApi} from '../../api/resultsApi'

import {CatchOptimization} from '../resultTables/CatchOptimization/CatchOptimization'
import {Preloader} from '../Preloader/Preloader'
import {Ebitda} from '../resultTables/Ebitda/Ebitda'
import {EbitdaByMonth} from '../resultTables/EbitdaByMonth/EbitdaByMonth'
import {FinancesByMonths} from '../resultTables/FinancesByMonths/FinancesByMonths'
import {FinancesByVessels} from '../resultTables/FinancesByVessels/FinancesByVessels'
import {FinancesByFishingZones} from '../resultTables/FinancesByFishingZones/FinancesByFishingZones'

const ResultTable = ({tableCodes, title, filterItems = null, withExpand = false, firstOpened = false}) => {
    const [currentTableCode, setCurrentTableCode] = useState(tableCodes[0])
    const [tableFilling, setTableFilling] = useState(null)
    const [isOpenedTable, setIsOpenedTable] = useState(firstOpened)
    const [isFetchingTable, setIsFetchingTable] = useState(firstOpened)

    const [isExpandedTable, setIsExpandedTable] = useState(false)
    const [temporaryStore, setTemporaryStore] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        const setNewTableFilling = async () => {
            setIsFetchingTable(true)
            const table = await getResultTable(currentTableCode, filterItems)
            setTableFilling(table)
            setIsFetchingTable(false)
        }

        if (isOpenedTable || tableFilling) setNewTableFilling()
    }, [filterItems])

    const toggleTable = async () => {
        setIsOpenedTable(!isOpenedTable)

        if (!tableFilling) {
            setIsFetchingTable(true)
            const table = await getResultTable(currentTableCode, filterItems)
            setTableFilling(table)
            setIsFetchingTable(false)
        }
    }

    const getResultTable = async (tableCode, filterItems) => {
        try {
            return await fetchResultTable(id, tableCode, filterItems)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchResultTable = async (spacingId, tableCode, filterItems) => {
        const response = await resultsApi.fetchResultTable(spacingId, tableCode, filterItems)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    const toggleExpendTable = async (e) => {
        e.stopPropagation()

        const nextCode = tableCodes.find((code) => code !== currentTableCode)
        setCurrentTableCode(nextCode)

        if (temporaryStore) {
            const tempStoreCopy = structuredClone(temporaryStore)
            setTemporaryStore(tableFilling)
            setTableFilling(tempStoreCopy)
            setIsExpandedTable(!isExpandedTable)
            return
        }

        setIsFetchingTable(true)
        const table = await getResultTable(nextCode)
        setTemporaryStore(tableFilling)
        setTableFilling(table)
        setIsFetchingTable(false)
        setIsExpandedTable(!isExpandedTable)
    }

    const resultTables = {
        'catch-optimization': CatchOptimization,
        ebitda: Ebitda,
        'ebitda-by-month': EbitdaByMonth,
        'finances-by-months': FinancesByMonths,
        'finances-by-vessels': FinancesByVessels,
        'finances-by-fishing-zones': FinancesByFishingZones,
    }

    const TableComponent = resultTables[currentTableCode]

    return (
        <div className={s.tableWrap}>
            <div className={s.tableHeader} onClick={toggleTable}>
                <p className={s.tableTitle}>{title}</p>
                <div className={s.buttonsWrap}>
                    {withExpand && tableFilling && (
                        <div className={s.expendButton} onClick={toggleExpendTable}>
                            {isExpandedTable ? 'Свернуть' : 'Развернуть'}
                        </div>
                    )}
                    <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M5.46394 8.54509L12.0047 15.0858L18.5454 8.54509C18.9359 8.15457 19.5691 8.15457 19.9596 8.54509C20.3501 8.93562 20.3501 9.56878 19.9596 9.9593L12.7118 17.2071C12.5242 17.3947 12.2699 17.5 12.0047 17.5C11.7395 17.5 11.4851 17.3947 11.2976 17.2071L4.04973 9.9593C4.00091 9.91049 3.9582 9.85788 3.92159 9.80243C3.66531 9.41428 3.70802 8.8868 4.04973 8.54509C4.44025 8.15457 5.07342 8.15457 5.46394 8.54509Z'
                            fill='black'
                        />
                    </svg>
                </div>
            </div>

            {isOpenedTable &&
                (isFetchingTable ? (
                    <div className={s.preloaderWrap}>
                        <Preloader />
                    </div>
                ) : (
                    <TableComponent table={tableFilling} />
                ))}
        </div>
    )
}

export {ResultTable}
