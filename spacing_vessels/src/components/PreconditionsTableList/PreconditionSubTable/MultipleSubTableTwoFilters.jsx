import React, {memo, useState} from 'react'

import * as s from '../style.module.scss'

import {TableFilling} from '../TableFilling/TableFilling'
import {MultipleSubTableTwoFiltersHeader} from './MultipleSubTableTwoFiltersHeader/MultipleSubTableTwoFiltersHeader'

const MultipleSubTableTwoFilters = ({
    isEditable,
    tableCode,
    subTable,
    dictionary,
    preparedTablesCodes,
    dataForDisabling,
    setDataForDisabling,
    setPreparedTablesCodes,
    approveSubTable,
    sendTableChanges,
    changesTableFilter,
    copySubTable,
    setSelectedByCodes,
    setSelectedGroupByCodes,
}) => {
    const [isOpenedTable, setIsOpenedTable] = useState(true)
    const [selectedCodes, setSelectedCodes] = useState({
        vessels: subTable.vessels,
        zones: subTable.zones,
    })

    const removeCodes = (removeCodesAr, filterName) => {
        let preparedFunction = setSelectedByCodes
        if (filterName === 'vessels') {
            preparedFunction = setSelectedGroupByCodes
        }

        setPreparedTablesCodes((prevState) => ({
            ...prevState,
            [filterName]: preparedFunction(
                removeCodesAr,
                structuredClone(prevState[filterName]),
                false
            ),
        }))

        setSelectedCodes((prevFilterList) => {
            const newFilterList = prevFilterList[filterName].filter(
                (code) => !removeCodesAr.includes(code)
            )
            changesTableFilter({[filterName]: newFilterList}, [filterName])
            return {...prevFilterList, [filterName]: newFilterList}
        })
    }

    const editFilter = (codeDifference, curSelectedCodes) => {
        const preparedTablesCodesCopy = structuredClone(preparedTablesCodes)

        let newPreparedVessels = setSelectedGroupByCodes(
            codeDifference.needAdd.vessels,
            preparedTablesCodesCopy.vessels,
            true
        )
        newPreparedVessels = setSelectedGroupByCodes(
            codeDifference.needRemove.vessels,
            newPreparedVessels,
            false
        )
        let newPreparedZones = setSelectedByCodes(
            codeDifference.needAdd.zones,
            preparedTablesCodesCopy.zones,
            true
        )
        newPreparedZones = setSelectedByCodes(
            codeDifference.needRemove.zones,
            newPreparedZones,
            false
        )

        const newPreparedTablesCodes = {
            vessels: newPreparedVessels,
            zones: newPreparedZones,
        }

        setPreparedTablesCodes(newPreparedTablesCodes)
        setSelectedCodes(curSelectedCodes)
        changesTableFilter(curSelectedCodes, ['vessels', 'zones'])
    }

    const toggleTable = () => setIsOpenedTable(!isOpenedTable)

    const prepareBeforeSending = (data, idx) => {
        const collectedData = subTable.rowsData.map((blockTable, curIdx) =>
            idx === curIdx ? data : blockTable
        )
        sendTableChanges(collectedData)
    }

    return (
        <div className={s.tableWrap}>
            <MultipleSubTableTwoFiltersHeader
                selectedCodes={selectedCodes}
                dictionary={dictionary}
                preparedTablesCodes={preparedTablesCodes}
                dataForDisabling={dataForDisabling}
                setDataForDisabling={setDataForDisabling}
                isEditable={isEditable && !subTable.isApproved}
                setPreparedTablesCodes={setPreparedTablesCodes}
                copySubTable={copySubTable}
                toggleTable={toggleTable}
                removeCodes={removeCodes}
                editFilter={editFilter}
                changesTableFilter={changesTableFilter}
                setSelectedByCodes={setSelectedByCodes}
                setSelectedGroupByCodes={setSelectedGroupByCodes}
            />

            {isOpenedTable && (
                <div className={s.tableFillingWrap}>
                    {tableCode === 'variety-distribution' ? (
                        <>
                            {subTable.rowsData.map((tableBlock, idx) => (
                                <TableFilling
                                    key={idx}
                                    tableFilling={tableBlock}
                                    tableCode={tableCode}
                                    isEditable={isEditable && !subTable.isApproved}
                                    sendTableChanges={(data) => prepareBeforeSending(data, idx)}
                                    approveTable={approveSubTable}
                                    withApproving={false}
                                    withHeader={idx === 0}
                                />
                            ))}
                            {isEditable && !subTable.isApproved && (
                                <div className={s.approveBtn} onClick={approveSubTable}>
                                    <svg
                                        width='16'
                                        height='16'
                                        viewBox='0 0 16 16'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M13.997 4.64285C14.2582 4.3833 14.2594 3.96119 13.9999 3.70005C13.7403 3.43891 13.3182
                    3.43763 13.0571 3.69719L5.98457 10.7269L2.94268 7.70489C2.68147 7.44542 2.25936 7.44682
                    1.99987 7.70802C1.74038 7.96922 1.74176 8.39129 2.00296 8.65082L5.51484 12.1397C5.77487
                    12.398 6.19469 12.398 6.45466 12.1396L13.997 4.64285Z'
                                            fill='white'
                                        />
                                    </svg>
                                    Утвердить таблицу
                                </div>
                            )}
                        </>
                    ) : (
                        <TableFilling
                            tableFilling={subTable}
                            tableCode={tableCode}
                            isEditable={isEditable && !subTable.isApproved}
                            sendTableChanges={sendTableChanges}
                            approveTable={approveSubTable}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

const MemoizedMultipleSubTableTwoFilters = memo(MultipleSubTableTwoFilters)
export {MemoizedMultipleSubTableTwoFilters as MultipleSubTableTwoFilters}
