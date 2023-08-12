const getPreparedDataBeforeSending = (data, settings) => {
    const preparedData = []
    let currentRowIndex = -1

    for (let i = 0; i < data.length; i++) {
        preparedData.push({})
        currentRowIndex += 1

        for (let j = 0; j < settings.columns.length; j++) {
            const currentRow = preparedData[currentRowIndex]
            const columnName = settings.columns[j].data

            currentRow[columnName] = data[i][j]
        }
    }

    return preparedData
}

export {getPreparedDataBeforeSending}
