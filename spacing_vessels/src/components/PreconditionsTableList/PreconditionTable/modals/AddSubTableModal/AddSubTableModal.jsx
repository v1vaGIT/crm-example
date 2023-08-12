import React, {useState} from 'react'

import * as s from '../style.module.scss'
import {useOutsideClick} from '../../../../../hooks/useOutsideClick'
import {CheckboxGroup} from '../CheckboxGroup'
import {CheckboxRow} from '../CheckboxRow'
import cn from 'classnames'

const AddSubTableModal = ({
    filterName,
    mainAction,
    preparedTablesCodes,
    disabledItems = null,
    setPreparedTablesCodes,
    closeModal,
    setSelectedByCodes,
    isOneFilter = true,
    withDisabled = false,
}) => {
    const modalRef = useOutsideClick(closeModal, 'click')
    const [preparedGroup, setPreparedGroup] = useState(structuredClone(preparedTablesCodes))
    const [curSelectedCodes, setCurSelectedCodes] = useState([])

    const nextStep = (e) => {
        e.stopPropagation()

        if (!curSelectedCodes.length) return

        mainAction(curSelectedCodes)
        if (isOneFilter) {
            setPreparedTablesCodes((prevState) =>
                setSelectedByCodes(curSelectedCodes, structuredClone(prevState), true)
            )
        }
        closeModal(preparedTablesCodes)
    }

    const addCodes = (codesAr) => {
        setPreparedGroup((prevState) =>
            setSelectedByCodes(codesAr, structuredClone(prevState), true)
        )
        setCurSelectedCodes((prevState) => Array.from(new Set([...prevState, ...codesAr])))
    }

    const removeCodes = (codesAr) => {
        setPreparedGroup((prevState) =>
            setSelectedByCodes(codesAr, structuredClone(prevState), false)
        )
        setCurSelectedCodes((prevState) => prevState.filter((code) => !codesAr.includes(code)))
    }

    const onClickInput = (checked, code) => {
        if (checked) {
            addCodes([code])
            return
        }

        removeCodes([code])
    }

    const addBtnStyle = cn(s.btn, {
        [s.btnDisable]: curSelectedCodes.length === 0,
    })

    return (
        <div className={s.modalWrapper}>
            <div ref={modalRef} className={s.modal}>
                <div className={s.header}>
                    <p className={s.title}>Выберите {filterName === 'vessels' ? 'суда' : 'зоны'}</p>
                    <div className={s.closeImg} onClick={closeModal}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.7723 3.28592C12.0327 3.02558 12.4548 3.02557 12.7151 3.28592C12.9755 3.54627 12.9755 3.96838 12.7151 4.22873L8.94387 8L12.7151 11.7712C12.9755 12.0315 12.9755 12.4537 12.7151 12.714C12.4548 12.9743 12.0327 12.9743 11.7723 12.714L8.00107 8.9428L4.22988 12.714C4.2258 12.7181 4.2217 12.7221 4.21755 12.726C3.95637 12.9743 3.54334 12.9703 3.28706 12.714C3.0918 12.5187 3.04298 12.2325 3.14062 11.9917C3.17316 11.9115 3.22198 11.8363 3.28706 11.7712L7.05827 8L3.28706 4.22876C3.02671 3.96842 3.02671 3.5463 3.28706 3.28596C3.54741 3.0256 3.96952 3.0256 4.22987 3.28596L8.00107 7.05714L11.7723 3.28592Z"
                                fill="#333340"
                            />
                        </svg>
                    </div>
                </div>
                <div className={s.container}>
                    {preparedGroup.map((item) =>
                        filterName === 'vessels' ? (
                            <CheckboxGroup
                                key={item.title}
                                group={item}
                                selectedCodes={curSelectedCodes}
                                addCodes={addCodes}
                                removeCodes={removeCodes}
                                withDisabled={withDisabled}
                                disabledItems={disabledItems}
                            />
                        ) : (
                            <CheckboxRow
                                key={item.code}
                                title={item.value}
                                selected={item.selected}
                                disabled={
                                    (item.selected && !curSelectedCodes.includes(item.code))
                                    || disabledItems.has(item.code)
                                }
                                changeInput={(checked) => onClickInput(checked, item.code)}
                            />
                        )
                    )}
                </div>
                <div className={addBtnStyle} onClick={nextStep}>
                    Далее
                </div>
            </div>
        </div>
    )
}

export {AddSubTableModal}
