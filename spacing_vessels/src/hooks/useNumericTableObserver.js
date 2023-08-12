import {useCallback, useEffect, useRef} from 'react'

const useNumericTableObserver = (changesHandler, rowsData) => {
    const ref = useRef()
    let tableData = rowsData

    const validateChanges = useCallback((changes, tableData) => {
        changes.forEach((change) => {
            const newValue = change[3]

            if (newValue === change[2]) return

            if (newValue === null) {
                change[3] = ''
                tableData[change[0]][change[1]] = ''
                return
            }

            if (newValue === '') {
                tableData[change[0]][change[1]] = ''
                return
            }

            const changeToNumber = parseFloat(String(newValue).replace(/ /g, ''))
            if (isNaN(changeToNumber)) return

            tableData[change[0]][change[1]] = changeToNumber
            change[3] = String(changeToNumber).replace(/(\d)(?=(\d\d\d)+(\D|$))/g, '$1 ')
        })
    }, [])

    useEffect(() => {
        if (!ref.current) return
        const hot = ref.current.hotInstance

        hot.addHook('beforeChange', (changes) => {
            if (changes === null) return
            validateChanges(changes, tableData)
        })

        hot.addHook('afterChange', (changes) => {
            if (changes === null) return

            hot.validateCells((valid) => {
                if (valid) changesHandler(tableData)
            })
        })
    }, [ref])

    return ref
}

export {useNumericTableObserver}
