import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'
import 'handsontable/dist/handsontable.full.min.css'
import {useTableObserver} from '../../../hooks/useTableObserver'
import {useShortcut} from '../../../hooks/useShortcut'

const SensitiveCoefficientsTable = ({tableFilling, isEditable, sendTableChanges}) => {
    const settings = useMemo(
        () => ({
            nestedHeaders: [
                [
                    'Продуктовая группа',
                    {label: 'Характеристики', colspan: 2},
                    'Район',
                    'Коэффициент выхода продукции',
                    'Коэффициент отходов',
                ],
            ],
            columns: [
                {data: 'product', readOnly: true, className: 'htLeft'},
                {
                    data: 'feature',
                    readOnly: true,
                    className: 'htCenter',
                    placeholder: '—',
                },
                {
                    data: 'coefficient',
                    readOnly: true,
                    className: 'htCenter',
                    placeholder: '—',
                    width: 30,
                },
                {
                    data: 'area',
                    readOnly: true,
                    className: 'htCenter',
                    placeholder: '—',
                },
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
            nestedHeaders={settings.nestedHeaders}
            columns={settings.columns}
            data={tableFilling.rowsData}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {SensitiveCoefficientsTable}
