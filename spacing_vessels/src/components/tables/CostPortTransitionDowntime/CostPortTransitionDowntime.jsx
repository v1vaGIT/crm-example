import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import './style.scss'
import 'handsontable/dist/handsontable.full.min.css'

import {divideNumbersIntoDigits} from '../../../utils/divideNumbersIntoDigits'

const CostPortTransitionDowntime = ({tableFilling, isEditable, forwardedRef}) => {
    const settings = useMemo(
        () => ({
            nestedHeaders: [
                [
                    'Суда',
                    {label: 'Стоимость простоя в порту, $ в сут.', colspan: 6},
                    'Стоимость суток перехода',
                ],
                ['', ...tableFilling.seaportsDictionary.map((port) => port.code), ''],
            ],
            columns: [
                {
                    data: 'vessel',
                    readOnly: true,
                    className: 'htLeft',
                    width: 166,
                },
                ...tableFilling.seaportsDictionary.map((port) => ({
                    data: port.code,
                    readOnly: !isEditable,
                    validator: 'customNumeric',
                    className: 'htCenter',
                    placeholder: '-',
                    width: 113,
                })),
                {
                    data: 'transition-cost',
                    readOnly: !isEditable,
                    validator: 'customNumeric',
                    className: 'htCenter',
                    width: 167,
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
            className={'cost-port-transition-downtime'}
            width={'100%'}
            height={'auto'}
            stretchH={'all'}
            manualColumnResize={true}
            language={'ru-RU'}
            licenseKey={'non-commercial-and-evaluation'}
            nestedHeaders={settings.nestedHeaders}
            columns={settings.columns}
            data={preparedData}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {CostPortTransitionDowntime}
