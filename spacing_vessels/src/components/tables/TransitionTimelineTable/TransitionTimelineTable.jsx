import React, {useCallback, useMemo} from 'react'
import {HotTable} from '@handsontable/react'

import './style.scss'
import 'handsontable/dist/handsontable.full.min.css'

import {useShortcut} from '../../../hooks/useShortcut'
import {useSymmetricalTableObserver} from '../../../hooks/useSymmetricallTableObserver'

const TransitionTimelineTable = ({tableFilling, sendTableChanges, isEditable}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: Object.keys(tableFilling.rowsData[0]),
            rowHeaders: Object.keys(tableFilling.rowsData[0]),
            columns: Object.keys(tableFilling.rowsData[0]).map((col) => ({
                data: col,
                readOnly: !isEditable,
                className: 'htCenter',
            })),
            data: tableFilling.rowsData,
        }),
        [isEditable]
    )

    const getCellsTooltip = useCallback(() => {
        const cells = []
        const dict = tableFilling.locationDictionary

        for (let i = 0; i < dict.length; i++) {
            for (let j = 0; j < dict.length; j++) {
                if (i === j) {
                    cells.push({
                        row: i,
                        col: j,
                        readOnly: true,
                        className: 'empty',
                    })
                    continue
                }

                if (i < j) {
                    cells.push({
                        row: i,
                        col: j,
                        readOnly: true,
                        className: 'light-grey',
                        comment: {
                            value: `${dict[i].name}(${dict[i].code}) -- ${dict[j].name}(${dict[j].code})`,
                            readOnly: true,
                        },
                    })
                    continue
                }

                cells.push({
                    row: i,
                    col: j,
                    validator: 'customNumeric',
                    width: 55,
                    comment: {
                        value: `${dict[i].name}(${dict[i].code}) -- ${dict[j].name}(${dict[j].code})`,
                        readOnly: true,
                    },
                })
            }
        }

        return cells
    }, [])

    const ref = useSymmetricalTableObserver(sendTableChanges, tableFilling.rowsData)

    useShortcut(ref)

    return (
        <HotTable
            ref={ref}
            className={'transition-timing-table'}
            width='100%'
            height='auto'
            stretchH='all'
            comments={true}
            language={'ru-RU'}
            licenseKey='non-commercial-and-evaluation'
            rowHeaderWidth={70}
            cell={getCellsTooltip()}
            colHeaders={settings.columnHeaders}
            rowHeaders={settings.rowHeaders}
            columns={settings.columns}
            data={settings.data}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {TransitionTimelineTable}
