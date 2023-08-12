import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import cn from 'classnames'

import * as s from './style.module.scss'

import {useOutsideClick} from '../../../hooks/useOutsideClick'
import {spacingDetailApi} from '../../../api/spacingDetailApi'
import {DownloadModalStep} from './DownloadModalStep'

const DownloadModelModal = ({closeModal}) => {
    const [downloadModelLink, setDownloadModelLink] = useState(null)
    const [isFetching, setIsFetching] = useState(true)
    const [stepsInfo, setStepsInfo] = useState(null)
    const [currentStepInfo, setCurrentStepInfo] = useState(null)
    const [currentStepName, setCurrentStepName] = useState(null)
    const {id} = useParams()

    const modalRef = useOutsideClick(closeModal, 'click')

    useEffect(() => {
        getCurrentModel()
    }, [])

    const getCurrentModel = async () => {
        setIsFetching(true)

        let settings

        try {
            settings = await fetchCurrentModelStepCount(id)
            const preparedStepsInfo = Object.values(settings.steps).map((step) => ({
                name: step.name,
                status: 'waiting',
                error: null,
            }))

            setStepsInfo(preparedStepsInfo)

            const success = await getDataBySteps(settings.stepsCount, settings.steps)

            if (!success) {
                setIsFetching(false)
                return
            }
        } catch (e) {
            console.log(e)
        }

        const lastStep = settings.stepsCount
        const lastEndpoint = settings.steps[lastStep].endpoint

        try {
            setCurrentStepName(settings.steps[lastStep].name)
            setCurrentStepInfo(`${1} / ${settings.steps[lastStep].parts}`)
            const params = await fetchCurrentModelByStep(lastEndpoint, lastStep, 1)

            setCurrentStepInfo(`${2} / ${settings.steps[lastStep].parts}`)
            const response = await fetchCurrentModelByStep(lastEndpoint, lastStep, 2, params.version, params.spacingId)

            setStepsInfo((prevStepsInfo) => {
                const newStepInfo = structuredClone(prevStepsInfo)

                newStepInfo[lastStep - 1].status = 'success'
                return newStepInfo
            })

            setCurrentStepName(null)
            setDownloadModelLink(response.link)
        } catch (e) {
            setStepsInfo((prevStepsInfo) => {
                const newStepInfo = structuredClone(prevStepsInfo)

                newStepInfo[lastStep - 1].status = 'error'
                newStepInfo[lastStep - 1].error = e.response.data.message
                return newStepInfo
            })
        }

        setIsFetching(false)
    }

    const getDataBySteps = async (stepsCount, steps) => {
        let success = true

        stepsLoop: for (let step = 1; step < stepsCount; step++) {
            setCurrentStepName(steps[step].name)

            for (let part = 1; part <= steps[step].parts; part++) {
                if (!modalRef.current) {
                    success = false
                    break stepsLoop
                }

                try {
                    setCurrentStepInfo(`${part} / ${steps[step].parts}`)
                    await fetchCurrentModelByStep(steps[step].endpoint, step, part)
                } catch (e) {
                    setStepsInfo((prevStepsInfo) => {
                        const newStepInfo = structuredClone(prevStepsInfo)

                        newStepInfo[step - 1].status = 'error'
                        newStepInfo[step - 1].error = e.response.data.message
                        return newStepInfo
                    })

                    success = false
                    break stepsLoop
                }
            }

            setStepsInfo((prevStepsInfo) => {
                const newStepInfo = structuredClone(prevStepsInfo)

                newStepInfo[step - 1].status = 'success'
                return newStepInfo
            })
        }

        return success
    }

    const fetchCurrentModelStepCount = async (id) => {
        const response = await spacingDetailApi.fetchCurrentModelStepCount(id)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    const fetchCurrentModelByStep = async (endpoint, step, part, version, spacingId) => {
        const response = await spacingDetailApi.fetchCurrentModelByStep(endpoint, step, part, version, spacingId)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    return (
        <div className={s.modalWrapper}>
            <div
                ref={modalRef}
                className={cn(s.modal, s.downloadModal)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={s.header}>
                    <p className={s.title}>Подготовка данных</p>
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

                {isFetching && (
                    <div className={s.preloaderWrap}>
                        <div className={s.preloader}/>
                        <p>
                            Расчет параметров модели.
                            {currentStepInfo && (' Шаг ' + currentStepInfo)}
                        </p>
                    </div>
                )}

                {stepsInfo && (
                    <div className={s.stepsWrap}>
                        {stepsInfo.map((step, idx) => (
                            <DownloadModalStep key={idx} step={step} currentStepName={currentStepName}/>
                        ))}
                    </div>
                )}

                {downloadModelLink && (
                    <a href={downloadModelLink} className={s.btn} download onClick={closeModal}>
                        Скачать файл
                    </a>
                )}
            </div>
        </div>
    )
}

export {DownloadModelModal}
