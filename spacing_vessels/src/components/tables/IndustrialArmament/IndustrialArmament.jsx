import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import './style.scss'
import 'handsontable/dist/handsontable.full.min.css'

import {useTableObserver} from '../../../hooks/useTableObserver'
import {useShortcut} from '../../../hooks/useShortcut'

const IndustrialArmament = ({tableFilling, isEditable, sendTableChanges}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Суда', ...tableFilling.zonesDictionary.map((item) => item.code)],
            columns: [
                {
                    data: 'vessel',
                    readOnly: true,
                    className: 'htLeft',
                    width: 166,
                },
                ...tableFilling.zonesDictionary.map((item) => ({
                    data: item.code,
                    readOnly: !isEditable,
                    type: 'numeric',
                    className: 'htCenter',
                    width: 67,
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
            className={'industrial-armament simple-table'}
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

export {IndustrialArmament}
