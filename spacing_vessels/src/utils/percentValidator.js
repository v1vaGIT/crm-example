const percentValidator = (query, callback) => {
    let isValid = true

    if (query !== null && query !== '') {
        const valueAr = query.split('/')
        let sumPercentage = 0

        valueAr.forEach((value) => {
            if (value < 0) {
                isValid = false
                return
            }

            sumPercentage += Number(value)
        })

        if (![0, 3].includes(valueAr.length) || sumPercentage !== 100) {
            isValid = false
        }
    }

    callback(isValid)
}

export {percentValidator}
