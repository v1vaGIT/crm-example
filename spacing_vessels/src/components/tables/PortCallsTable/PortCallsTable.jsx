import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import './style.scss'
import 'handsontable/dist/handsontable.full.min.css'

import {useShortcut} from '../../../hooks/useShortcut'
import {useMergedTableObserver} from '../../../hooks/useMergedTableObserver'
import {getReverseDictionary} from '../../../utils/getReverseDictionary'
import {getPreparedDataForMergedTablesBeforeSending} from '../../../utils/getPreparedDataForMergedTablesBeforeSending'
import {daysList, monthListRu} from '../../../assets/helperArrays/helperArrays'

const PortCallsTable = ({
    tableFilling: {data, mergeCells, dataForSelect},
    isEditable,
    sendTableChanges,
}) => {
    const dictionaryByKey = {
        location: dataForSelect.currentLocation,
        port: dataForSelect.port,
    }

    const dictionaryByValue = {
        location: getReverseDictionary(dictionaryByKey.location),
        port: getReverseDictionary(dictionaryByKey.port),
    }

    const settings = useMemo(
        () => ({
            nestedHeaders: [
                [
                    'Исп',
                    'ㅤㅤㅤㅤСудноㅤㅤㅤㅤ',
                    'Текущее местоположение',
                    'Финальное местоположение',
                    {
                        label: 'Заходы в порт',
                        colspan: 4,
                    },
                ],
                ['', '', '', '', 'Начало', 'Конец', 'Дней в порту', 'Порт'],
            ],
            columns: [
                {
                    data: 'isUse',
                    readOnly: !isEditable,
                    type: 'checkbox',
                    className: 'htCenter htMiddle',
                },
                {data: 'vessel', readOnly: true, className: 'htMiddle', width: 168},
                {
                    width: 168,
                    data: 'currentLocation',
                    readOnly: !isEditable,
                    className: 'htMiddle',
                    type: 'dropdown',
                    source: Object.values(dataForSelect.currentLocation),
                },
                {
                    width: 168,
                    data: 'finalLocation',
                    readOnly: !isEditable,
                    className: 'htMiddle',
                    type: 'dropdown',
                    source: Object.values(dataForSelect.finalLocation),
                },
                {
                    width: 108,
                    data: 'start',
                    readOnly: !isEditable,
                    className: 'htCenter',
                    type: 'date',
                    dateFormat: 'DD.MM.YYYY',
                    correctFormat: true,
                    datePickerConfig: {
                        i18n: {
                            previousMonth: 'Предыдущий месяц',
                            nextMonth: 'Следующий месяц',
                            months: monthListRu,
                            weekdays: daysList,
                            weekdaysShort: daysList,
                        },
                        firstDay: 1,
                        showWeekNumber: true,
                        licenseKey: 'non-commercial-and-evaluation',
                    },
                },
                {
                    width: 108,
                    data: 'finish',
                    readOnly: !isEditable,
                    className: 'htCenter',
                    type: 'date',
                    dateFormat: 'DD.MM.YYYY',
                    correctFormat: true,
                    datePickerConfig: {
                        i18n: {
                            previousMonth: 'Предыдущий месяц',
                            nextMonth: 'Следующий месяц',
                            months: monthListRu,
                            weekdays: daysList,
                            weekdaysShort: daysList,
                        },
                        firstDay: 1,
                        showWeekNumber: true,
                        licenseKey: 'non-commercial-and-evaluation',
                    },
                },
                {
                    data: 'portDays',
                    readOnly: true,
                    validator: 'portDays',
                    className: 'htCenter',
                    width: 104,
                },
                {
                    width: 134,
                    data: 'port',
                    readOnly: !isEditable,
                    type: 'dropdown',
                    source: Object.values(dataForSelect.port),
                },
            ],
        }),
        [isEditable]
    )

    const ref = useMergedTableObserver((data) => {
        sendTableChanges(
            getPreparedDataForMergedTablesBeforeSending(data, settings, dictionaryByValue)
        )
    }, settings.columns)

    useShortcut(ref)

    return (
        <HotTable
            ref={ref}
            className={'location-table'}
            width='100%'
            height='auto'
            stretchH='all'
            language={'ru-RU'}
            licenseKey='non-commercial-and-evaluation'
            nestedHeaders={settings.nestedHeaders}
            columns={settings.columns}
            mergeCells={mergeCells}
            data={data}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {PortCallsTable}
