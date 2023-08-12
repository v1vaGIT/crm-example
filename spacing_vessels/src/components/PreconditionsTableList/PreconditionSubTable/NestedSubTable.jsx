import React, {memo, useMemo, useState} from 'react'

import * as s from '../style.module.scss'

import {NestedSubTableHeader} from './NestedSubTableHeader/NestedSubTableHeader'
import {TableFilling} from '../TableFilling/TableFilling'

const NestedSubTable = ({
    isEditable,
    isApproved,
    tableCode,
    subTable,
    tablesFilling,
    approveSubTable,
    sendTableChanges,
}) => {
    const [isOpenedTable, setIsOpenedTable] = useState(false)
    const toggleTable = () => {
        setIsOpenedTable(!isOpenedTable)
    }

    const nestedSubTableList = useMemo(
        () =>
            subTable?.children?.map((childTable) => (
                <NestedSubTable
                    key={childTable.code}
                    isEditable={isEditable}
                    tableCode={tableCode}
                    subTable={childTable}
                    tablesFilling={tablesFilling}
                    approveSubTable={approveSubTable}
                    sendTableChanges={sendTableChanges}
                />
            )),
        [tablesFilling, isEditable, isApproved]
    )

    return (
        <div className={s.tableWrap}>
            <NestedSubTableHeader title={subTable.name} toggleTable={toggleTable} />

            {isOpenedTable &&
                (subTable?.children ? (
                    <div className={s.nestedTables}>{nestedSubTableList}</div>
                ) : (
                    <TableFilling
                        tableFilling={tablesFilling[subTable.code]}
                        tableCode={tableCode}
                        isEditable={isEditable && !tablesFilling?.[subTable.code]?.isApproved}
                        sendTableChanges={(postData) => sendTableChanges(postData, subTable.code)}
                        approveTable={() => approveSubTable(subTable.code)}
                    />
                ))}
        </div>
    )
}

const MemoizedNestedSubTable = memo(NestedSubTable)
export {MemoizedNestedSubTable as NestedSubTable}
