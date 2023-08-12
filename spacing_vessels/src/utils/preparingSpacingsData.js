const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const day = ('0' + date.getDate()).slice(-2)
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    return `${day}.${month}`
}

const preparingSpacingsData = (plan) => {
    const months = [
        {
            monthNumber: '1',
            dates: [],
        },
        {
            monthNumber: '2',
            dates: [],
        },
        {
            monthNumber: '3',
            dates: [],
        },
        {
            monthNumber: '4',
            dates: [],
        },
        {
            monthNumber: '5',
            dates: [],
        },
        {
            monthNumber: '6',
            dates: [],
        },
        {
            monthNumber: '7',
            dates: [],
        },
        {
            monthNumber: '8',
            dates: [],
        },
        {
            monthNumber: '9',
            dates: [],
        },
        {
            monthNumber: '10',
            dates: [],
        },
        {
            monthNumber: '11',
            dates: [],
        },
        {
            monthNumber: '12',
            dates: [],
        },
    ]
    let alienSpacings = []

    plan.dates.forEach((date) => {
        const monthNumber = new Date(date.date * 1000).getMonth()

        months[monthNumber].dates.push({
            date: formatDate(date.date * 1000),
            children: prepareSpacingsByDates(date.spacings, alienSpacings, date.date),
        })
    })

    setAlienSpacings(months, alienSpacings)

    months.forEach((month) => {
        if (month.dates.length) {
            month.dates.sort((a, b) => a.date.slice(0, 2) - b.date.slice(0, 2))
        }
    })

    return {
        isEmpty: plan.dates.length === 0,
        title: plan.title,
        code: plan.code,
        months: months,
    }
}

const prepareSpacingsByDates = (spacings, alienSpacings, date) => {
    if (!spacings.length) return spacings

    const ourSpacings = []

    spacings.forEach((spacing) => {
        if (spacing.date !== date) {
            alienSpacings.push(spacing)
            return
        }

        ourSpacings.push({
            ...spacing,
            children: prepareSpacingsByDates(spacing.children, alienSpacings, date),
        })
    })

    return ourSpacings
}

const setAlienSpacings = (months, alienSpacings) => {
    let needLoop = alienSpacings.length

    while (needLoop) {
        const newAlienSpacings = []

        alienSpacings.forEach((spacing) => {
            const monthNumber = new Date(spacing.date * 1000).getMonth()
            const children = prepareSpacingsByDates(
                spacing.children,
                newAlienSpacings,
                spacing.date
            )
            const formattedDate = formatDate(spacing.date * 1000)
            const curDateIndex = months[monthNumber].dates.findIndex(
                (date) => date.date === formattedDate
            )

            if (curDateIndex !== -1) {
                months[monthNumber].dates[curDateIndex].children.push({
                    ...spacing,
                    children,
                })
                return
            }

            months[monthNumber].dates.push({
                date: formattedDate,
                children: [{...spacing, children}],
            })
        })

        needLoop = newAlienSpacings.length
        alienSpacings = newAlienSpacings
    }
}

export {preparingSpacingsData}
