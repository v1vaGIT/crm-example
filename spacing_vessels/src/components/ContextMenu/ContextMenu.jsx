import React from 'react'
import {useOutsideClick} from '../../hooks/useOutsideClick'

import * as s from './style.module.scss'

const ContextMenu = ({contextMenu, closeContextMenu}) => {
    const ref = useOutsideClick(closeContextMenu)

    const onHandleMenuItem = (e, handler) => {
        closeContextMenu()
        handler(e)
    }

    return (
        <ul
            ref={ref}
            className={s.list}
            style={{
                top: contextMenu.coords.y + 'px',
                left: contextMenu.coords.x + 'px',
            }}
        >
            {contextMenu.list.map((item) => (
                <li
                    key={item.id}
                    className={s.item}
                    onClick={(e) => onHandleMenuItem(e, item.handler)}
                >
                    {item.text}
                </li>
            ))}
        </ul>
    )
}

export {ContextMenu}
