const joinScheduleTransitions = (transitions) => {
    const joinedTransitions = []

    transitions.forEach((curTransition) => {
        if (!curTransition.isTransition) return joinedTransitions.push(curTransition)
        if (!joinedTransitions.length) return joinedTransitions.push(curTransition)

        const lastTransition = joinedTransitions.at(-1)

        if (!lastTransition.isTransition) return joinedTransitions.push(curTransition)
        if (lastTransition.group !== curTransition.group)
            return joinedTransitions.push(curTransition)

        lastTransition.endTime = curTransition.endTime
        lastTransition['end_time'] = curTransition['end_time']
    })

    return joinedTransitions
}

export {joinScheduleTransitions}
