import React from 'react'
import cn from 'classnames'
import * as s from './style.module.scss'

const TableHeader = ({
    toggleTable,
    fillingPercentage,
    isApproved,
    isEditable,
    title,
    isMultiple,
    isOpenedTable,
    showVesselModal,
    showCancelApproveModal,
}) => {
    const approvalStyle = cn(s.tableApproval, {
        [s.tableApproved]: isApproved,
        [s.tableEmpty]: fillingPercentage === 0 && !isApproved,
    })

    const onShowVesselModal = (e) => {
        e.stopPropagation()

        if (!isApproved) {
            showVesselModal()
        } else {
            alert('Изменения в утвержденной таблице запрещены')
        }
    }

    const openCancelApproveModal = (e) => {
        e.stopPropagation()
        if (isOpenedTable && isApproved && isEditable) showCancelApproveModal()
    }

    return (
        <div className={s.tableHeader} onClick={toggleTable}>
            <p className={s.tableTitle}>{title}</p>
            <div className={s.tableApprovalWrap}>
                <div className={approvalStyle} onClick={openCancelApproveModal}>
                    {isApproved ? (
                        <span>{'Таблица утверждена'}</span>
                    ) : (
                        <span>{'Таблица не утверждена'}</span>
                    )}
                </div>
                {isMultiple && isEditable && (
                    <div className={s.btn} onClick={onShowVesselModal}>
                        <svg
                            width='13'
                            height='13'
                            viewBox='0 0 13 13'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M6.46761 1L6.5 6.5M6.5 6.5L6.53239 12M6.5 6.5L12 6.46761M6.5 6.5L1 6.53239'
                                stroke='white'
                                strokeWidth='1.5'
                            />
                        </svg>
                        <p className={s.btnText}>Добавить</p>
                    </div>
                )}
                <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M5.46394 8.54509L12.0047 15.0858L18.5454 8.54509C18.9359 8.15457 19.5691 8.15457 19.9596 8.54509C20.3501 8.93562 20.3501 9.56878 19.9596 9.9593L12.7118 17.2071C12.5242 17.3947 12.2699 17.5 12.0047 17.5C11.7395 17.5 11.4851 17.3947 11.2976 17.2071L4.04973 9.9593C4.00091 9.91049 3.9582 9.85788 3.92159 9.80243C3.66531 9.41428 3.70802 8.8868 4.04973 8.54509C4.44025 8.15457 5.07342 8.15457 5.46394 8.54509Z'
                        fill='black'
                    />
                </svg>
            </div>
        </div>
    )
}

export {TableHeader}
