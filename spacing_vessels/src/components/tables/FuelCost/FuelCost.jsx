import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import 'handsontable/dist/handsontable.full.min.css'

import {monthListEng, monthListRu} from '../../../assets/helperArrays/helperArrays'
import {divideNumbersIntoDigits} from '../../../utils/divideNumbersIntoDigits'

const FuelCost = ({tableFilling, isEditable, forwardedRef}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Топливо', ...monthListRu],
            columns: [
                {data: 'fuel', readOnly: true, className: 'htLeft'},
                ...monthListEng.map((month) => ({
                    data: month,
                    readOnly: !isEditable,
                    validator: 'customNumeric',
                    placeholder: '—',
                    className: 'htCenter',
                    width: 72,
                })),
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

export {FuelCost}
