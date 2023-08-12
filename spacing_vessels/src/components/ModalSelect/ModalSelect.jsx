import React from 'react'
import * as s from './style.module.scss'
import {useOutsideClick} from '../../hooks/useOutsideClick'

function ModalSelect({valueList, changeValue, closeModal}) {
    const modalRef = useOutsideClick(closeModal, 'click')

    const onChangeValue = (e) => {
        closeModal()
        changeValue(Number(e.target.innerText))
    }

    const values = valueList.map((value) => (
        <p key={value} className={s.listValue} onClick={onChangeValue}>
            {value}
        </p>
    ))

    return (
        <div ref={modalRef} className={s.modalSelect}>
            <p className={s.title}>Выберите год</p>
            <div className={s.list}>{values}</div>
            {/*<div className={s.btn}>Выбрать</div>*/}
        </div>
    )
}

export {ModalSelect}
