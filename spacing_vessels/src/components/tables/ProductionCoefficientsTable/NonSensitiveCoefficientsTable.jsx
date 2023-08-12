import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import 'handsontable/dist/handsontable.full.min.css'
import {useTableObserver} from '../../../hooks/useTableObserver'
import {useShortcut} from '../../../hooks/useShortcut'

const NonSensitiveCoefficientsTable = ({tableFilling, isEditable, sendTableChanges}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: [
                'Продуктовая группа',
                'Характеристики',
                'Коэффициент выхода продукции',
                'Коэффициент отходов',
            ],
            columns: [
                {data: 'product', readOnly: true, className: 'htLeft'},
                {data: 'coefficient', readOnly: true, className: 'htCenter'},
                {
                    data: 'outputRatio',
                    readOnly: !isEditable,
                    type: 'numeric',
                    className: 'htCenter',
                    placeholder: '—',
                },
                {
                    data: 'wasteRatio',
                    readOnly: !isEditable,
                    type: 'numeric',
                    className: 'htCenter',
                    placeholder: '—',
                },
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

export {NonSensitiveCoefficientsTable}
