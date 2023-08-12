import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import 'handsontable/dist/handsontable.full.min.css'

import {divideNumbersIntoDigits} from '../../../utils/divideNumbersIntoDigits'

const QuotaVolumeTable = ({tableFilling, isEditable, forwardedRef}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Зоны', 'Квоты, т', 'СОК, $'],
            columns: [
                {
                    data: 'zones',
                    readOnly: true,
                    className: 'htLeft',
                    width: 300,
                },
                {
                    data: 'quotas',
                    readOnly: !isEditable,
                    validator: 'customNumeric',
                    className: 'htCenter',
                    width: 300,
                },
                {
                    data: 'sokTonnes',
                    readOnly: !isEditable,
                    validator: 'customNumeric',
                    className: 'htCenter',
                    width: 300,
                },
            ],
        }),
        [isEditable]
    )

    const preparedData = useMemo(
        () => divideNumbersIntoDigits(structuredClone(tableFilling.rowsData)),
        []
    )

    return (
        <HotTable
            ref={forwardedRef}
            className={'simple-table'}
            width={'100%'}
            height={'auto'}
            stretchH={'all'}
            language={'ru-RU'}
            licenseKey={'non-commercial-and-evaluation'}
            colHeaders={settings.columnHeaders}
            columns={settings.columns}
            data={preparedData}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {QuotaVolumeTable}
