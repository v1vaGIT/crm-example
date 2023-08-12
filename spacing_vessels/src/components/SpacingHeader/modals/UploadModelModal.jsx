import React, {useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import cn from 'classnames'

import * as s from './style.module.scss'

import {Preloader} from '../../Preloader/Preloader'
import {useOutsideClick} from '../../../hooks/useOutsideClick'
import {spacingDetailApi} from '../../../api/spacingDetailApi'

const UploadModelModal = ({closeModal, setIsCalculated}) => {
    const [isFetching, setIsFetching] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isModelUploaded, setIsModelUploaded] = useState(false)

    const [dragActive, setDragActive] = useState(false)
    const [fileUploaded, setFileUploaded] = useState(false)
    const [currentFile, setCurrentFile] = useState(null)

    const inputRef = useRef(null)
    const {id} = useParams()

    const onCloseModal = () => {
        setIsFetching((currentIsFetching) => {
            if (!currentIsFetching) closeModal()
            return currentIsFetching
        })
    }

    const modalRef = useOutsideClick(onCloseModal, 'click')

    const uploadCurrentModel = async (e) => {
        e.stopPropagation()
        if (currentFile === null) return

        setIsFetching(true)
        setIsError(false)
        try {
            const uploadSuccess = await postCurrentModel(id, currentFile)
            setIsCalculated(uploadSuccess)
            setIsModelUploaded(true)
        } catch (e) {
            setIsError(true)
            setErrorMessage(e.response.data.message)
        }

        setIsFetching(false)
    }

    const postCurrentModel = async (id, modelFile) => {
        const response = await spacingDetailApi.postCurrentModel(id, modelFile)

        if (response.status === 200) {
            return true
        }

        throw response
    }

    //тригер стилей во время переносов файла
    const handleDrag = function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    //тригер дропнутого файла
    const handleDrop = function (e) {
        e.preventDefault()
        e.stopPropagation()
        setFileUploaded(true)
        setCurrentFile(e.dataTransfer.files[0])
        setDragActive(false)
    }

    //тригер закинутого файла через кнопку
    const handleChange = function (e) {
        setCurrentFile(inputRef.current.files[0])
        e.preventDefault()
        setFileUploaded(true)
    }

    const uploadBtnStyle = cn(s.btn, {[s.btnDisabled]: !currentFile})

    const labelFileUploadStyle = cn(s.labelFileUpload, {
        [s.dragActive]: dragActive,
    })

    return (
        <div className={s.modalWrapper}>
            <div ref={modalRef} className={s.modal}>
                {isFetching ? (
                    <div className={s.preloaderWrap}>
                        <Preloader />
                    </div>
                ) : (
                    <>
                        <div className={s.header}>
                            <p className={s.title}>
                                {isError
                                    ? 'Файл не сформирован'
                                    : isModelUploaded
                                    ? 'Готово'
                                    : 'Загрузить файл'}
                            </p>
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

                        <div className={s.children}>
                            {isModelUploaded ? (
                                <div>Модель загружена и обработана, перейдите в план график</div>
                            ) : (
                                <form
                                    className={s.formFileUpload}
                                    onDragEnter={handleDrag}
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <input
                                        className={s.inputFileUpload}
                                        ref={inputRef}
                                        id='input-file-upload'
                                        type='file'
                                        multiple={false}
                                        onChange={handleChange}
                                    />
                                    <label
                                        className={labelFileUploadStyle}
                                        htmlFor='input-file-upload'
                                    >
                                        <div className={s.fileUploadContent}>
                                            <div>
                                                <svg
                                                    width='25'
                                                    height='24'
                                                    viewBox='0 0 25 24'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        d='M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z'
                                                        stroke='#57595A'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                    <path
                                                        d='M12.5 8V16'
                                                        stroke='#57595A'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                    <path
                                                        d='M8.5 12H16.5'
                                                        stroke='#57595A'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                            </div>
                                            <div className={s.fileUploadContentText}>
                                                Перетащите файл
                                            </div>
                                        </div>
                                        {fileUploaded ? (
                                            'Файл загружен'
                                        ) : (
                                            <p>или выберите на компьютере</p>
                                        )}
                                    </label>
                                    {dragActive && (
                                        <div
                                            className={s.dragFileElement}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                        />
                                    )}
                                </form>
                            )}
                        </div>

                        {isError && <p className={s.body}>{errorMessage}</p>}

                        {!isModelUploaded && (
                            <div className={uploadBtnStyle} onClick={uploadCurrentModel}>
                                {isError ? 'Повторите попытку' : 'Загрузить'}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export {UploadModelModal}
