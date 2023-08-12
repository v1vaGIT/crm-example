import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import 'handsontable/dist/handsontable.full.min.css'

import {divideNumbersIntoDigits} from '../../../utils/divideNumbersIntoDigits'

const SellingExpenses = ({tableFilling, isEditable, forwardedRef}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Продукты', ...tableFilling.vesselsDictionary.map((item) => item.code)],
            columns: [
                {
                    data: 'product',
                    readOnly: true,
                    className: 'htLeft',
                    width: 166,
                },
                ...tableFilling.vesselsDictionary.map((item) => ({
                    data: item.code,
                    readOnly: !isEditable,
                    validator: 'customNumeric',
                    className: 'htCenter',
                    width: 67,
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

export {SellingExpenses}
