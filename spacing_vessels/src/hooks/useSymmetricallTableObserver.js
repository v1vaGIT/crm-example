import {useCallback, useEffect, useRef} from 'react'

const useSymmetricalTableObserver = (changesHandler, rowsData) => {
    const ref = useRef()
    const columns = Object.keys(rowsData[0])
    let tableData = rowsData

    const validateCellData = useCallback((changes, tableData) => {
        const newChanges = []

        changes.forEach((change) => {
            const columnIndex = columns.findIndex((column) => column === change[1])
            const symColumnName = columns[change[0]]

            if (change[0] <= columnIndex || change[3] === change[2] || isNaN(+change[3])) return
            if (change[3] === null) change[3] = ''

            tableData[change[0]][change[1]] = change[3]
            tableData[columnIndex][symColumnName] = change[3]
            newChanges.push([columnIndex, symColumnName, '', change[3]])
        })

        for (let newChange of newChanges) {
            changes.push(newChange)
        }
    }, [])

    useEffect(() => {
        if (!ref.current) return
        const hot = ref.current.hotInstance

        hot.addHook('beforeChange', (changes) => {
            if (changes === null) return
            validateCellData(changes, tableData)
        })

        hot.addHook('afterChange', (changes) => {
            if (changes === null) return
            hot.validateCells((valid) => {
                if (valid) changesHandler(tableData)
            })
        })
    }, [])

    return ref
}

export {useSymmetricalTableObserver}
