import React from 'react'
import cn from 'classnames'
import * as s from './style.module.scss'

const RejectButton = ({openRejectModal, status}) => {
    const statusText = {
        rejected: 'Модель забракована',
        approved: 'Модель утверждена',
        calculating: 'Забраковать модель',
    }

    const btnStyle = cn(s.btnReject, {
        [s.headerBtnRejectDisabled]: status === 'rejected',
        [s.headerBtnApprovedDisabled]: status === 'approved',
        [s.headerBtnReject]: status === 'calculating',
    })

    const onOpenRejectModel = (e) => {
        if (status === 'calculating') openRejectModal(e)
    }

    return (
        <button
            className={btnStyle}
            onClick={onOpenRejectModel}
            disabled={status !== 'calculating'}
        >
            {statusText[status]}
        </button>
    )
}

export {RejectButton}
