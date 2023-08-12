import React, {useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import './style.scss'
import 'handsontable/dist/handsontable.full.min.css'

import {daysList, monthListRu} from '../../../assets/helperArrays/helperArrays'
import {useTableObserver} from '../../../hooks/useTableObserver'
import {useShortcut} from '../../../hooks/useShortcut'

const AllowedFishingTimeTable = ({tableFilling, isEditable, sendTableChanges}) => {
    const settings = useMemo(
        () => ({
            nestedHeaders: [
                ['Зоны', {label: 'Сезон 1', colspan: 2}, {label: 'Сезон 2', colspan: 2}],
                ['', 'Начало', 'Конец', 'Начало', 'Конец'],
            ],
            columns: [
                {data: 'area', readOnly: true, className: 'htLeft'},
                {
                    data: 'firstStart',
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
                    width: 108,
                },
                {
                    data: 'firstFinish',
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
                    width: 108,
                },
                {
                    data: 'secondStart',
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
                    width: 108,
                },
                {
                    data: 'secondFinish',
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
                    width: 108,
                },
            ],
            data: tableFilling.rowsData,
        }),
        [isEditable]
    )

    const ref = useTableObserver(sendTableChanges, tableFilling.rowsData)

    useShortcut(ref)

    return (
        <HotTable
            ref={ref}
            className={'fishing-periods-table'}
            width={'100%'}
            height={'auto'}
            stretchH={'all'}
            manualColumnResize={true}
            language={'ru-RU'}
            licenseKey={'non-commercial-and-evaluation'}
            nestedHeaders={settings.nestedHeaders}
            columns={settings.columns}
            data={settings.data}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {AllowedFishingTimeTable}
