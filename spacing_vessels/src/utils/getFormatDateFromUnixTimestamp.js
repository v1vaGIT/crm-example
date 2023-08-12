const getFormatDateFromUnixTimestamp = (
    timestamp,
    isUnixTimestamp = false,
    full = false,
    options = {day: 'numeric', month: 'long', year: 'numeric'}
) => {
    const date = new Date(isUnixTimestamp ? timestamp * 1000 : timestamp).toLocaleString(
        'ru',
        options
    )

    return full ? date : date.slice(0, -3)
}

export {getFormatDateFromUnixTimestamp}
