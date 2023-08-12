import React from 'react'
import * as s from './style.module.scss'

const CheckboxRow = ({selected, disabled, title, changeInput}) => {
    return (
        <div className={s.inputWrap}>
            <label>
                <input
                    checked={selected}
                    disabled={disabled}
                    type='checkbox'
                    onChange={(e) => changeInput(e.target.checked)}
                />
                <p className={s.inputLabel}>{title}</p>
            </label>
        </div>
    )
}

export {CheckboxRow}
