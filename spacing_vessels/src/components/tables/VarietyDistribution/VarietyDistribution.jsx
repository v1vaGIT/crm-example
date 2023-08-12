import React, {useEffect, useMemo, useRef} from 'react'
import {HotTable} from '@handsontable/react'
import cn from 'classnames'

import './style.scss'
import 'handsontable/dist/handsontable.full.min.css'

import {getPreparedDataBeforeSending} from '../../../utils/getPreparedDataBeforeSending'
import {monthListEng, monthListRu} from '../../../assets/helperArrays/helperArrays'

const VarietyDistribution = ({tableFilling, sendTableChanges, withHeader, isEditable}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Продукция', ...monthListRu],
            columns: [
                {
                    data: 'product',
                    readOnly: true,
                    className: 'htLeft htMiddle',
                    width: 210,
                },
                ...monthListEng.map((months) => ({
                    data: months,
                    readOnly: !isEditable,
                    placeholder: '—',
                    className: 'htCenter htMiddle',
                    width: 70,
                })),
            ],
            data: tableFilling,
        }),
        [isEditable]
    )

    const useTableObserver = (changesHandler, columns) => {
        const ref = useRef()
        let invalidColumns = []

        useEffect(() => {
            const hot = ref.current.hotInstance

            hot.addHook('beforeChange', (changes) => {
                if (changes === null) return

                const [newValidColumns, newInvalidColumns] = getColumns(
                    changes,
                    hot,
                    settings.columns
                )

                if (newValidColumns.length) {
                    setValidColumn(newValidColumns, hot)
                    invalidColumns = invalidColumns.filter(
                        (col) =>
                            !newValidColumns.find((newCol) => newCol[0].column === col[0].column)
                    )
                }

                if (newInvalidColumns.length) {
                    setInvalidColumn(newInvalidColumns, hot)
                    newInvalidColumns.forEach((newCol) => {
                        if (!invalidColumns.find((col) => col[0].column === newCol[0].column))
                            invalidColumns.push(newCol)
                    })
                }

                if (invalidColumns.length) return

                hot.validateCells((valid) => {
                    if (!valid) return
                    const data = hot.getSourceDataArray()

                    changes.forEach((change) => {
                        if (change[3] === null) {
                            const columnIndex = columns.findIndex(
                                (column) => column.data === change[1]
                            )
                            data[change[0]][columnIndex] = ''
                        }
                    })

                    changesHandler(data)
                })
            })
        }, [])

        const getColumns = (changes, hot, columns) => {
            const invalidColumns = []
            const validColumns = []

            changes.forEach((change) => {
                if (!change[3]) change[3] = ''

                const columnCells = []
                const columnIndex = columns.findIndex((column) => column.data === change[1])
                let cell = true

                for (let i = 0; cell; i++) {
                    cell = hot.getCell(i, columnIndex)

                    if (cell) {
                        let cellValue = change[0] === i ? change[3] : cell.innerText
                        const cellValueFromChanges = changes.find(
                            (c) => c[0] === i && c[1] === change[1]
                        )?.[3]
                        if (cellValueFromChanges) cellValue = cellValueFromChanges

                        columnCells.push({
                            row: i,
                            column: columnIndex,
                            value: cellValue,
                        })
                    }
                }

                const columnSum = columnCells.reduce((sum, cell) => {
                    const cellValueFromChanges = changes.find(
                        (c) => c[0] === cell.row && c[1] === change[1]
                    )?.[3]
                    if (typeof cellValueFromChanges === 'string') cell.value = cellValueFromChanges
                    if (cellValueFromChanges === null) cell.value = ''

                    let numberCell = Number(cell.value)

                    if (typeof sum === 'number' || (numberCell !== 0 && !isNaN(numberCell))) {
                        return Number(sum) + numberCell
                    }

                    if (cell.value === '—') cell.value = ''

                    return sum + cell.value
                }, '')

                if (columnSum === 100 || columnSum === '') {
                    if (!validColumns.find((col) => col[0].column === columnCells[0].column))
                        validColumns.push(columnCells)
                } else {
                    if (!invalidColumns.find((col) => col[0].column === columnCells[0].column))
                        invalidColumns.push(columnCells)
                }
            })

            return [validColumns, invalidColumns]
        }

        const setInvalidColumn = (columns, hot) => {
            columns.forEach((column) =>
                column.forEach((cell) => {
                    hot.setCellMeta(cell.row, cell.column, 'valid', false)
                })
            )
        }

        const setValidColumn = (columns, hot) => {
            columns.forEach((column) =>
                column.forEach((cell) => {
                    hot.setCellMeta(cell.row, cell.column, 'valid', true)
                })
            )
        }

        return ref
    }

    const ref = useTableObserver((data) => {
        sendTableChanges(getPreparedDataBeforeSending(data, settings))
    }, settings.columns)

    const tableStyle = cn('variety-distribution', {
        ['with-header']: withHeader,
        ['one-row']: !withHeader && tableFilling.length === 1,
    })

    return (
        <HotTable
            ref={ref}
            className={tableStyle}
            width={'100%'}
            height={'auto'}
            stretchH={'all'}
            language={'ru-RU'}
            licenseKey={'non-commercial-and-evaluation'}
            colHeaders={withHeader && settings.columnHeaders}
            columns={settings.columns}
            data={settings.data}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {VarietyDistribution}
