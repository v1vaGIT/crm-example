import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import './style.scss'
import 'handsontable/dist/handsontable.full.min.css'

import {divideNumbersIntoDigits} from '../../../utils/divideNumbersIntoDigits'

const VbrTax = ({tableFilling, isEditable, forwardedRef}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Ставка', ...tableFilling.zonesDictionary.map((zone) => zone.code)],
            columns: [
                {data: 'rate', readOnly: true, className: 'htLeft', width: 243},
                ...tableFilling.zonesDictionary.map((zone) => ({
                    data: zone.code,
                    readOnly: !isEditable,
                    validator: 'customNumeric',
                    className: 'htCenter',
                    width: 57,
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
            className={'vbr-table'}
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

export {VbrTax}
