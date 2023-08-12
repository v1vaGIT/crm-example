import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import 'handsontable/dist/handsontable.full.min.css'

import {monthListRu, monthListEng} from '../../../assets/helperArrays/helperArrays'
import {useTableObserver} from '../../../hooks/useTableObserver'
import {useShortcut} from '../../../hooks/useShortcut'

const DailyCatchTable = ({tableFilling, isEditable, sendTableChanges}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Зоны', ...monthListRu],
            columns: [
                {data: 'area', readOnly: true, className: 'htLeft', width: 220},
                ...monthListEng.map((month) => ({
                    data: month,
                    readOnly: !isEditable,
                    type: 'numeric',
                    placeholder: '-',
                    className: 'htCenter htMiddle',
                    width: 72,
                })),
            ],
        }),
        [isEditable]
    )

    const ref = useTableObserver(sendTableChanges, tableFilling.rowsData)

    useShortcut(ref)

    return (
        <HotTable
            ref={ref}
            className={'simple-table'}
            width={'100%'}
            height={'auto'}
            stretchH={'all'}
            language={'ru-RU'}
            licenseKey={'non-commercial-and-evaluation'}
            colHeaders={settings.columnHeaders}
            columns={settings.columns}
            data={tableFilling.rowsData}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {DailyCatchTable}
