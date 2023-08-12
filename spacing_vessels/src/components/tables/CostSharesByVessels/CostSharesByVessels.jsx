import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import 'handsontable/dist/handsontable.full.min.css'

import {divideNumbersIntoDigits} from '../../../utils/divideNumbersIntoDigits'
import {monthListEng, monthListRu} from '../../../assets/helperArrays/helperArrays'

const CostSharesByVessels = ({tableFilling, isEditable, forwardedRef}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Суда', ...monthListRu],
            columns: [
                {
                    data: 'vessel',
                    readOnly: true,
                    className: 'htLeft',
                    width: 166,
                },
                ...monthListEng.map((month) => ({
                    data: month,
                    readOnly: !isEditable,
                    validator: 'customNumeric',
                    className: 'htCenter',
                    width: 78,
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

export {CostSharesByVessels}
