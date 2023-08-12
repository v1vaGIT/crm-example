const divideNumbersIntoDigits = (data) => {
    const dataFields = Object.keys(data[0])

    data.forEach((row) => {
        dataFields.forEach((fieldName, idx) => {
            if (idx !== 0) {
                row[fieldName] = String(row[fieldName]).replace(
                    /(\d)(?=(\d\d\d)+([^\d]|$))/g,
                    '$1 '
                )
            }
        })
    })

    return data
}

export {divideNumbersIntoDigits}
