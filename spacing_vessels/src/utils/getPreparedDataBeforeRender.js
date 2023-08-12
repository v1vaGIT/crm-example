const getPreparedDataBeforeRender = (data, dictionary) => {
    const resultData = {
        data: [],
        mergeCells: [],
    }
    let commonIndex = 0

    data.forEach((rowData) => {
        for (let i = 0; i < rowData.start.length; i++) {
            resultData.data.push({
                ...rowData,
                currentLocation:
                    dictionary.location[rowData.currentLocation] || rowData.currentLocation,
                finalLocation: dictionary.location[rowData.finalLocation] || rowData.finalLocation,
                start: rowData.start[i],
                finish: rowData.finish[i],
                portDays: rowData.portDays[i],
                port: dictionary.port[rowData.port[i]] || rowData.port[i],
            })

            resultData.mergeCells.push({
                row: commonIndex,
                col: i,
                rowspan: 4,
                colspan: 1,
            })
        }

        commonIndex += rowData.start.length
    })

    return resultData
}

export {getPreparedDataBeforeRender}
