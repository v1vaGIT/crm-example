import {useState} from 'react'

const useContextMenu = (list) => {
    const [contextMenu, setContextMenu] = useState({
        show: false,
        coords: {x: 0, y: 0},
        list: list,
    })

    const openContextMenu = (e) => {
        const absoluteX = e.clientX - e.target.getBoundingClientRect().left
        const absoluteY = e.clientY - e.target.getBoundingClientRect().top

        e.preventDefault()

        setContextMenu((prevState) => ({
            ...prevState,
            show: true,
            coords: {x: absoluteX, y: absoluteY},
        }))
    }

    const closeContextMenu = () => {
        setContextMenu((prevState) => ({
            ...prevState,
            show: false,
            coords: {x: 0, y: 0},
        }))
    }

    return [contextMenu, openContextMenu, closeContextMenu]
}

export {useContextMenu}
