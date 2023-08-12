import {useState} from 'react'

const useHoverTooltip = () => {
    const [tooltip, setTooltip] = useState({
        show: false,
        coords: {x: 0, y: 0}
    })

    const openTooltip = (e) => {
        const absoluteX = e.clientX - e.target.getBoundingClientRect().left
        // const absoluteY = e.clientY - e.target.getBoundingClientRect().top
        const absoluteY = 5

        e.preventDefault()

        setTooltip((prevState) => ({
            ...prevState,
            show: true,
            coords: {
                x: absoluteX,
                y: absoluteY
            },
        }))
    }

    const closeTooltip = () => {
        setTooltip((prevState) => ({
            ...prevState,
            show: false,
            coords: {x: 0, y: 0},
        }))
    }

    return [tooltip, openTooltip, closeTooltip]
}

export {useHoverTooltip}
