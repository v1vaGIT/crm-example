import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import 'handsontable/dist/handsontable.full.min.css'

import {monthListEng, monthListRu} from '../../../assets/helperArrays/helperArrays'
import {useTableObserver} from '../../../hooks/useTableObserver'
import {useShortcut} from '../../../hooks/useShortcut'

const FilletRawDistribution = ({tableFilling, isEditable, sendTableChanges}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Продуктовая группа', ...monthListRu],
            columns: [
                {data: 'product', readOnly: true, className: 'htLeft'},
                ...monthListEng.map((months) => ({
                    data: months,
                    readOnly: !isEditable,
                    type: 'numeric',
                    placeholder: '—',
                    className: 'htCenter',
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

export {FilletRawDistribution}
