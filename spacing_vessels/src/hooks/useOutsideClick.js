import {useEffect, useRef} from 'react'

const useOutsideClick = (callback, eventType = 'mousedown') => {
    const ref = useRef()

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }

        document.addEventListener(eventType, handleClick)

        return () => {
            document.removeEventListener(eventType, handleClick)
        }
    }, [ref])

    return ref
}

export {useOutsideClick}
