import React from 'react'

import * as s from './style.module.scss'

function Preloader() {
    return (
        <div className={s.preloaderWrapper}>
            <div className={s.preloader}></div>
        </div>
    )
}

export {Preloader}
