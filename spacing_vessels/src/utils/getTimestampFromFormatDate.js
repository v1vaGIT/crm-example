const getTimestampFromFormatDate = (date) => {
    const [day, month, year] = [date.slice(0, 2), date.slice(3, 5), date.slice(6)]
    return new Date(year, month - 1, day, 0, 0, 0, 0).getTime()
}

export {getTimestampFromFormatDate}
