const getReverseDictionary = (dict) => {
    const entriesReverseDict = Object.entries(dict).map((dictRow) => dictRow.reverse())
    return Object.fromEntries(entriesReverseDict)
}

export {getReverseDictionary}
