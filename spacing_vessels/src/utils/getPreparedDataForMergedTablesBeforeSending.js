const getPreparedDataForMergedTablesBeforeSending = (data, settings, dictionary) => {
    const preparedData = []
    let currentRowIndex = -1

    for (let i = 0; i < data.length; i++) {
        const firstValue = data[i][0]
        const nextRow = data?.[i + 1]

        if (firstValue !== null) {
            preparedData.push({})
            currentRowIndex += 1
        }

        for (let j = 0; j < settings.columns.length; j++) {
            let curValue = data[i][j]

            if (j < 4 && i % 4 !== 0) continue

            if (curValue === null) curValue = ''

            if ((j === 2 || j === 3) && curValue !== '') {
                curValue = dictionary.location[curValue]
            }

            if (j === 7 && curValue !== '') {
                curValue = dictionary.port[curValue]
            }

            const currentRow = preparedData[currentRowIndex]
            const columnName = settings.columns[j].data

            if (firstValue === null) {
                currentRow[columnName].push(curValue)
                continue
            }

            if (nextRow?.[0] === null && j > 3) {
                currentRow[columnName] = [curValue]
                continue
            }

            currentRow[columnName] = curValue
        }
    }

    return preparedData
}

export {getPreparedDataForMergedTablesBeforeSending}
