import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import 'handsontable/dist/handsontable.full.min.css'

import {useTableObserver} from '../../../hooks/useTableObserver'
import {useShortcut} from '../../../hooks/useShortcut'

const FuelUseTable = ({tableFilling, isEditable, sendTableChanges}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Суда', 'IFO_100', 'IFO_380', 'OIL', 'FM'],
            columns: [
                {data: 'vessel', readOnly: true, className: 'htLeft'},
                {
                    data: 'ifo100',
                    readOnly: !isEditable,
                    type: 'numeric',
                    className: 'htCenter',
                },
                {
                    data: 'ifo380',
                    readOnly: !isEditable,
                    type: 'numeric',
                    className: 'htCenter',
                },
                {
                    data: 'oil',
                    readOnly: !isEditable,
                    type: 'numeric',
                    className: 'htCenter',
                },
                {
                    data: 'fm',
                    readOnly: !isEditable,
                    type: 'numeric',
                    className: 'htCenter',
                },
            ],
            data: tableFilling.rowsData,
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

export {FuelUseTable}
