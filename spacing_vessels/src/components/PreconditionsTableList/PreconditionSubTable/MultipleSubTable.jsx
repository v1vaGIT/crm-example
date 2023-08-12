import React, {memo, useState} from 'react'

import * as s from '../style.module.scss'

import {MultipleSubTableHeader} from './MultipleSubTableHeader/MultipleSubTableHeader'
import {TableFilling} from '../TableFilling/TableFilling'

const MultipleSubTable = ({
    isEditable,
    tableCode,
    subTable,
    filterName,
    dictionary,
    preparedTablesCodes,
    setPreparedTablesCodes,
    approveSubTable,
    sendTableChanges,
    changesTableFilter,
    copySubTable,
    setSelectedByCodes,
}) => {
    const [isOpenedTable, setIsOpenedTable] = useState(true)
    const [selectedCodes, setSelectedCodes] = useState(subTable.vessels || subTable.zones)

    const addCodes = (codesAr) => {
        setPreparedTablesCodes((prevState) => setSelectedByCodes(codesAr, [...prevState], true))
        setSelectedCodes((prevState) => {
            const temp = [...prevState]
            codesAr.forEach((curCode) => !temp.includes(curCode) && temp.push(curCode))
            return temp
        })
    }

    const removeCodes = (removeCodesAr) => {
        setPreparedTablesCodes((prevState) =>
            setSelectedByCodes(removeCodesAr, [...prevState], false)
        )
        setSelectedCodes((prevFilterList) => {
            const newFilterList = prevFilterList.filter((code) => !removeCodesAr.includes(code))
            changesTableFilter(newFilterList)
            return newFilterList
        })
    }

    const toggleTable = () => setIsOpenedTable(!isOpenedTable)

    return (
        <div className={s.tableWrap}>
            <MultipleSubTableHeader
                selectedCodes={selectedCodes}
                dictionary={dictionary}
                preparedTablesCodes={preparedTablesCodes}
                filterName={filterName}
                isEditable={isEditable && !subTable.isApproved}
                setPreparedTablesCodes={setPreparedTablesCodes}
                copySubTable={copySubTable}
                toggleTable={toggleTable}
                addCodes={addCodes}
                removeCodes={removeCodes}
                changesTableFilter={changesTableFilter}
                setSelectedByCodes={setSelectedByCodes}
            />

            {isOpenedTable && (
                <div className={s.tableFillingWrap}>
                    <TableFilling
                        tableFilling={subTable}
                        tableCode={tableCode}
                        isEditable={isEditable && !subTable.isApproved}
                        sendTableChanges={sendTableChanges}
                        approveTable={approveSubTable}
                    />
                </div>
            )}
        </div>
    )
}

const MemoizedMultipleSubTable = memo(MultipleSubTable)
export {MemoizedMultipleSubTable as MultipleSubTable}
