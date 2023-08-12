const getLastChangeTimeFromUnixTimestamp = (timestamp) => {
    const diffTimestamp = timestamp ? Date.now() / 1000 - timestamp : 0
    const days = Math.floor(diffTimestamp / (60 * 60 * 24))
    const hours = Math.floor(diffTimestamp / (60 * 60)) - days * 24
    const minutes = Math.floor(diffTimestamp / 60) - days * 24 * 60 - hours * 60
    const timeString =
        (days ? days + ' д ' : '') +
        (hours ? hours + ' ч ' : '') +
        (minutes ? minutes + ' мин' : '')
    return timeString.trim() ? timeString.trim() + ' назад' : 'только что'
}

export {getLastChangeTimeFromUnixTimestamp}
