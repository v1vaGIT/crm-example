const numericValidator = (query, callback) => {
    let isValidCell = false

    if (!isNaN(+query) || !isNaN(+query?.replace(/ /g, '')) || query === '') isValidCell = true

    callback(isValidCell)
}

export {numericValidator}
