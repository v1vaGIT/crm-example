import React from 'react'

import * as s from '../style.module.scss'
import './style.scss'

import {useShortcut} from '../../../hooks/useShortcut'
import {useNumericTableObserver} from '../../../hooks/useNumericTableObserver'
import {tables} from './importUtils'

const TableFilling = ({
    tableFilling,
    tableCode,
    isEditable,
    approveTable,
    sendTableChanges,
    withApproving = true,
    withHeader = true,
}) => {
    const ref = useNumericTableObserver(sendTableChanges, tableFilling.rowsData)

    useShortcut(ref)

    const TableComponent = tables[tableCode]

    return (
        <div className={s.tableFillingWrap} data-table-type={tableCode}>
            <TableComponent
                forwardedRef={ref}
                tableFilling={tableFilling}
                isEditable={isEditable}
                sendTableChanges={sendTableChanges}
                withHeader={withHeader}
            />
            <div className={s.descriptionWrap}>
                {tableCode === 'product-mix' && (
                    <div className={s.description}>
                        WR - Неразделка | HG - Без головы | FLT: Филе минтая PBO, Филе минтая PBI,
                        Сурими (филе PBI), Сурими (филе PBO), Мука из сырца, Фарш из сырца
                    </div>
                )}
                {withApproving && isEditable && (
                    <div className={s.approveBtn} onClick={approveTable}>
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
            </div>
        </div>
    )
}

export {TableFilling}
