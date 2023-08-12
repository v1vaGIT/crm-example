import {useCallback, useEffect, useRef} from 'react'
import {getTimestampFromFormatDate} from '../utils/getTimestampFromFormatDate'

const useMergedTableObserver = (changesHandler, columns) => {
    const ref = useRef()
    let isCellsMerged = false
    let tableData = null
    let invalidPortDaysData = []
    const portDaysColumnIndex = columns.findIndex((column) => column.data === 'portDays')

    const setFormatChangesToData = useCallback((changes, data) => {
        changes.forEach((change) => {
            const columnIndex = columns.findIndex((column) => column.data === change[1])

            if (change[3] === null && (columnIndex > 3 || change[0] % 4 === 0)) {
                data[change[0]][columnIndex] = ''
                return
            }

            if (change[3] !== null && columnIndex < 4 && change[0] % 4 !== 0) {
                data[change[0]][columnIndex] = null
                return
            }

            data[change[0]][columnIndex] = change[3]
        })
    }, [])

    const setCurPortDays = useCallback(
        (changes, change, portDaysColumnIndex, masterDateCode, portDaysData, hot) => {
            const slaveDateCode = masterDateCode === 'start' ? 'finish' : 'start'
            let slaveDate =
                changes.find((c) => c[0] === change[0] && c[1] === slaveDateCode)?.[3] ||
                hot.getDataAtRowProp(change[0], slaveDateCode)

            let portDays = ''

            if (slaveDate && change[3]) {
                slaveDate = getTimestampFromFormatDate(slaveDate)
                const masterDate = getTimestampFromFormatDate(change[3])

                if (masterDateCode === 'start') {
                    portDays = (slaveDate - masterDate) / 86400000
                } else {
                    portDays = (masterDate - slaveDate) / 86400000
                }

                if (portDays < 0) {
                    invalidPortDaysData.push([change[0], portDaysColumnIndex, 'valid', false])
                } else {
                    invalidPortDaysData = invalidPortDaysData.filter(
                        (cell) => cell[0] !== change[0]
                    )
                }
            } else {
                invalidPortDaysData = invalidPortDaysData.filter((cell) => cell[0] !== change[0])
            }

            portDaysData.push([change[0], 'portDays', portDays])
            tableData[change[0]][portDaysColumnIndex] = portDays
        },
        []
    )

    const setPortDays = useCallback((changes, tableData, hot) => {
        const portDaysData = []

        changes.forEach((change) => {
            if (change[1] !== 'start' && change[1] !== 'finish') return
            setCurPortDays(changes, change, portDaysColumnIndex, change[1], portDaysData, hot)
        })

        hot.setDataAtRowProp(portDaysData, 'portDaysChange')

        return !invalidPortDaysData.length
    }, [])

    const correctDataAfterPaste = useCallback((changes, hot) => {
        const correctingAr = []

        changes.forEach((change) => {
            const columnIndex = columns.findIndex((column) => column.data === change[1])

            if (change[3] !== null && columnIndex < 4 && change[0] % 4 !== 0) {
                correctingAr.push([change[0], change[1], null])
            }

            tableData[change[0]][columnIndex] = change[3]
        })

        hot.setDataAtRowProp(correctingAr, 'correcting')
    }, [])

    const checkCases = (changes, source, hot) => {
        if (changes === null) return false
        if (!isCellsMerged || changes.length === 168) {
            isCellsMerged = true
            return false
        }
        if (source === 'correcting') return false
        if (source === 'portDaysChange') return false
        if (!tableData) tableData = hot.getSourceDataArray()
        if (source === 'CopyPaste.paste') correctDataAfterPaste(changes, hot)

        return true
    }

    useEffect(() => {
        const hot = ref.current.hotInstance

        hot.addHook('afterChange', (changes, source) => {
            if (!checkCases(changes, source, hot)) return

            setFormatChangesToData(changes, tableData)

            hot.validateColumns([0, 1, 2, 3, 4, 5, 7], (valid) => {
                if (!setPortDays(changes, tableData, hot) || !valid) return
                changesHandler(tableData)
            })
        })
    }, [])

    return ref
}

export {useMergedTableObserver}
