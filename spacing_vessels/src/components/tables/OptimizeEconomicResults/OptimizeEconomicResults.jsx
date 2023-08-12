import React, {useCallback, useEffect, useMemo, useRef} from 'react'
import {HotTable} from '@handsontable/react'
import 'handsontable/dist/handsontable.full.min.css'
import {useShortcut} from '../../../hooks/useShortcut'

const OptimizeEconomicResults = ({tableFilling, sendTableChanges}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['id', 'Зоны', 'СОК, $'],
            columns: [
                {data: 'fishingZone.id', readOnly: true, width: 0},
                {
                    data: 'fishingZone.name',
                    readOnly: true,
                    className: 'htLeft',
                    width: 300,
                },
                {
                    data: 'sokDollars',
                    className: 'htCenter',
                    width: 300,
                    type: 'numeric',
                },
            ],
        }),
        []
    )

    const useTableObserver = useCallback((changesHandler) => {
        const ref = useRef()

        useEffect(() => {
            if (!ref.current) return
            const hot = ref.current.hotInstance

            hot.addHook('afterChange', (changes) => {
                if (changes === null) return

                hot.validateCells((valid) => {
                    if (!valid) return

                    const rowsData = []

                    changes.forEach((change) => {
                        const rowData = hot.getSourceDataAtRow(change[0])
                        rowsData.push(rowData)
                    })

                    changesHandler(rowsData)
                })
            })
        }, [])

        return ref
    }, [])

    const ref = useTableObserver(sendTableChanges)

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
            colHeaders={settings.columnHeaders}
            columns={settings.columns}
            hiddenColumns={{
                columns: [0],
                copyPasteEnabled: true,
            }}
            data={tableFilling.rowsData}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {OptimizeEconomicResults}
