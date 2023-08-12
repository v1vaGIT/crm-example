import {useEffect, useRef} from 'react'

const useTableObserver = (changesHandler, rowsData) => {
    const ref = useRef(null)

    useEffect(() => {
        if (!ref.current) return
        const hot = ref.current.hotInstance

        hot.addHook('afterChange', (changes) => {
            if (changes === null) return

            hot.validateCells((valid) => {
                if (!valid) return

                changes.forEach((change) => {
                    if (!isNaN(change[3])) rowsData[change[0]][change[1]] = Number(change[3])

                    if (change[3] === null) {
                        change[3] = ''
                        rowsData[change[0]][change[1]] = ''
                    }
                })

                changesHandler(rowsData)
            })
        })
    }, [])

    return ref
}

export {useTableObserver}
