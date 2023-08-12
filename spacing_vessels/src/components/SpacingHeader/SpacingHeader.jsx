import React, {useEffect, useState} from 'react'
import cn from 'classnames'
import {useLocation, useParams} from 'react-router-dom'
import {useNavigate} from 'react-router'

import * as s from './style.module.scss'

import {Preloader} from '../Preloader/Preloader'
import {DownloadModelModal} from './modals/DownloadModelModal'
import {UploadModelModal} from './modals/UploadModelModal'
import RejectModelModal from './modals/RejectModelModal'
import {RejectButton} from '../../UI/ModelStatusButton/RejectButton'
import {getFormatDateFromUnixTimestamp} from '../../utils/getFormatDateFromUnixTimestamp'
import {getLastChangeTimeFromUnixTimestamp} from '../../utils/getLastChangeTimeFromUnixTimestamp'
import {spacingDetailApi} from '../../api/spacingDetailApi'

const SpacingHeader = ({showPageData, modelStatus, setModelStatus}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const {id} = useParams()

    const [spacingInfo, setSpacingInfo] = useState(null)
    const [isHeaderFetching, setIsHeaderFetching] = useState(true)
    const [isShowUploadModal, setIsShowUploadModal] = useState(false)
    const [isShowDownloadModal, setIsShowDownloadModal] = useState(false)
    const [isShowRejectModal, setIsShowRejectModal] = useState(false)
    const [currentDisplay, setCurrentDisplay] = useState(null)

    useEffect(() => {
        const display = location.pathname.split('/').includes('result') ? 'result' : 'preconditions'

        if (display !== currentDisplay) setCurrentDisplay(display)
    }, [location.pathname])

    useEffect(() => {
        const getSpacingInfo = async () => {
            try {
                const spacingInfo = await fetchSpacingInfo(id)
                setSpacingInfo(spacingInfo)
                setIsHeaderFetching(false)
                setModelStatus(spacingInfo.status)
                showPageData()

                const display = location.pathname.split('/').includes('result') ? 'result' : 'preconditions'
                if (display === 'result' && !spacingInfo.isCalculated) navigateToPreconditions()
            } catch (e) {
                console.log(e)
            }
        }

        getSpacingInfo()
    }, [setSpacingInfo])

    const fetchSpacingInfo = async (id) => {
        const response = await spacingDetailApi.fetchSpacingInfo(id)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    const openUploadModal = (e) => {
        e.stopPropagation()
        setIsShowUploadModal(true)
    }

    const openDownloadModal = (e) => {
        e.stopPropagation()
        setIsShowDownloadModal(true)
    }

    const openRejectModal = (e) => {
        e.stopPropagation()
        setIsShowRejectModal(true)
    }

    const navigateToSchedule = () => {
        if (!spacingInfo.isCalculated) return
        navigate(`/rrpk/spacing-vessels/spacing/${id}/result/schedule`)
    }

    const navigateToPreconditions = () => {
        navigate(`/rrpk/spacing-vessels/spacing/${id}/preconditions`)
    }

    const setIsCalculated = (isCalculated) => {
        setSpacingInfo((prevInfo) => ({...prevInfo, isCalculated}))
    }

    const navigateBtnClass = cn(s.headerBtn, {
        [s.headerBtnDisabled]: !spacingInfo?.isCalculated,
    })

    const rejectModel = () => {
        setModelStatus('rejected')
    }

    return isHeaderFetching ? (
        <Preloader/>
    ) : (
        <>
            <div className={s.wrapper}>
                <div className={s.descriptionWrap}>
                    <div className={s.description}>
                        <div className={s.spacingInfo}>
                            <p className={s.spacingName}>
                                {spacingInfo.planType.title} {spacingInfo.version}
                            </p>
                            <div className={s.spacingCalculation}>
                                <p className={s.spacingCalculationDate}>Период расчета&nbsp;</p>
                                <p className={s.spacingCalculationDate}>
                                    {getFormatDateFromUnixTimestamp(spacingInfo.dateStart, true) +
                                        ' - ' +
                                        getFormatDateFromUnixTimestamp(spacingInfo.dateEnd, true)}
                                </p>
                            </div>
                        </div>

                        <div className={s.dates}>
                            <p className={s.date}>
                                Дата создания&nbsp;
                                {getFormatDateFromUnixTimestamp(spacingInfo.dateCreate, true)}
                            </p>
                            {spacingInfo.dateChange !== 0 && (
                                <p className={s.date}>
                                    Последнее изменение&nbsp;
                                    {getLastChangeTimeFromUnixTimestamp(spacingInfo.dateChange)}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className={s.headerButtons}>
                            {currentDisplay &&
                                (currentDisplay === 'result' ? (
                                    <div className={s.headerBtn} onClick={navigateToPreconditions}>
                                        Предпосылки
                                    </div>
                                ) : (
                                    <>
                                        <div className={navigateBtnClass} onClick={navigateToSchedule}>
                                            План-График
                                        </div>
                                        <div className={s.headerBtnNotice}>
                                            План-График доступны только при загруженном файле
                                            расчета
                                        </div>
                                    </>
                                ))}
                            <div className={s.headerBtn} onClick={openDownloadModal}>
                                Скачать текущую модель
                            </div>
                            <div className={s.headerBtn} onClick={openUploadModal}>
                                Загрузить модель с расчетом
                            </div>
                        </div>
                        <RejectButton status={modelStatus} openRejectModal={openRejectModal}/>
                    </div>
                </div>
            </div>

            {isShowUploadModal && (
                <UploadModelModal
                    closeModal={() => setIsShowUploadModal(false)}
                    setIsCalculated={setIsCalculated}
                />
            )}

            {isShowDownloadModal && (
                <DownloadModelModal closeModal={() => setIsShowDownloadModal(false)}/>
            )}

            {isShowRejectModal && (
                <RejectModelModal
                    closeModal={() => setIsShowRejectModal(false)}
                    rejectModal={rejectModel}
                />
            )}
        </>
    )
}

export {SpacingHeader}
