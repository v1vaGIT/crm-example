import React, {useEffect, useState} from 'react'
import {IMaskInput} from 'react-imask'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

import * as s from './style.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

import {useOutsideClick} from '../../hooks/useOutsideClick'
import {getFormatDateFromUnixTimestamp} from '../../utils/getFormatDateFromUnixTimestamp'
import {getTimestampFromFormatDate} from '../../utils/getTimestampFromFormatDate'
import {daysList, monthListRu} from '../../assets/helperArrays/helperArrays'

const ModalNewSpacing = ({
    title,
    initialDate = null,
    planCodes = null,
    nodeDescription = null,
    newSpacing,
    closeModal,
}) => {
    const [textareaValue, setTextareaValue] = useState('')
    const [version, setVersion] = useState('')

    const [dateInput, setDateInput] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(
        planCodes?.find((type) => type.value === nodeDescription.planType)
    )

    const modalRef = useOutsideClick(closeModal)

    useEffect(() => {
        if (!initialDate) return

        const inputDate = getFormatDateFromUnixTimestamp(initialDate, true, true, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })

        setDateInput(inputDate)
    }, [])

    const onNewSpacing = () => {
        const testDate = getTimestampFromFormatDate(dateInput) / 1000

        const newSpacingData = {
            dateCalculation: testDate,
            version: version,
            comment: textareaValue,
            planTypeCode: selectedOption?.value || null,
        }

        newSpacing(newSpacingData)
    }

    const handleChange = (date) => {
        setIsOpen(!isOpen)
        setStartDate(date)

        const stringDate = getFormatDateFromUnixTimestamp(date.getTime(), false, true, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })

        setDateInput(stringDate)
    }

    return (
        <div className={s.modalWrapper}>
            <div ref={modalRef} className={s.modalSpacing}>
                <div className={s.header}>
                    <p className={s.title}>{title}</p>
                    <div className={s.closeImg} onClick={closeModal}>
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M11.7723 3.28592C12.0327 3.02558 12.4548 3.02557 12.7151 3.28592C12.9755 3.54627 12.9755 3.96838 12.7151 4.22873L8.94387 8L12.7151 11.7712C12.9755 12.0315 12.9755 12.4537 12.7151 12.714C12.4548 12.9743 12.0327 12.9743 11.7723 12.714L8.00107 8.9428L4.22988 12.714C4.2258 12.7181 4.2217 12.7221 4.21755 12.726C3.95637 12.9743 3.54334 12.9703 3.28706 12.714C3.0918 12.5187 3.04298 12.2325 3.14062 11.9917C3.17316 11.9115 3.22198 11.8363 3.28706 11.7712L7.05827 8L3.28706 4.22876C3.02671 3.96842 3.02671 3.5463 3.28706 3.28596C3.54741 3.0256 3.96952 3.0256 4.22987 3.28596L8.00107 7.05714L11.7723 3.28592Z'
                                fill='#333340'
                            />
                        </svg>
                    </div>
                </div>

                {nodeDescription && (
                    <div className={s.descriptionList}>
                        <span>Год: {nodeDescription.year}</span>
                    </div>
                )}

                <div className={s.fieldWrap}>
                    <p className={s.fieldTitle}>Начало расчета</p>
                    <div className={s.inputWrap}>
                        <IMaskInput
                            className={s.input}
                            placeholder={'__.__.____'}
                            mask={Date}
                            unmask={true}
                            value={dateInput}
                            onChange={(date) => setDateInput(date.target.value)}
                        />

                        <svg
                            className={s.inputImg}
                            onClick={() => setIsOpen(!isOpen)}
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M4 4.99997H6V3.74997C6 3.19768 6.44772 2.74997 7 2.74997C7.55229 2.74997 8 3.19768 8 3.74997V4.99997H16V3.74997C16 3.19768 16.4477 2.74997 17 2.74997C17.5523 2.74997 18 3.19768 18 3.74997V4.99997H20C21.1046 4.99997 22 5.8954 22 6.99997V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V6.99997C2 5.8954 2.89543 4.99997 4 4.99997ZM4 19V11H20V19H4ZM20 6.99997V8.99997H4V6.99997H20Z'
                                fill='#333340'
                            />
                        </svg>

                        {isOpen && (
                            <DatePicker
                                dateFormat={'dd.MM.yyyy'}
                                selected={startDate}
                                onChange={handleChange}
                                inline
                                locale={{
                                    localize: {
                                        day: (n) => daysList[n],
                                        month: (n) => monthListRu[n],
                                    },
                                    formatLong: {date: () => 'dd.MM.yyyy'},
                                }}
                            />
                        )}
                    </div>
                </div>

                {planCodes && (
                    <div className={s.fieldWrap}>
                        <p className={s.fieldTitle}>Тип расстановки</p>
                        <Select
                            className={'select'}
                            options={planCodes}
                            value={selectedOption}
                            onChange={setSelectedOption}
                        />
                    </div>
                )}

                <div className={s.fieldWrap}>
                    <p className={s.fieldTitle}>Нумерация модели</p>
                    <div className={s.inputWrap}>
                        <input
                            className={s.input}
                            placeholder={'__ __'}
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                        />
                    </div>
                </div>

                <div className={s.fieldWrap}>
                    <p className={s.fieldTitle}>Комментарий</p>
                    <textarea
                        className={s.textarea}
                        placeholder={'Напишите комментарий'}
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                    />
                </div>

                <div className={s.btnList}>
                    <div className={s.btn} onClick={onNewSpacing}>
                        Начать заполнение
                    </div>
                    <div className={s.btn + ' ' + s.btnWhite} onClick={closeModal}>
                        Отмена
                    </div>
                </div>
            </div>
        </div>
    )
}

export {ModalNewSpacing}
