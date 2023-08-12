import React, {memo, useState} from 'react'
import * as s from './style.module.scss'
import {AddSubTableModal} from '../../PreconditionTable/modals/AddSubTableModal/AddSubTableModal'
import {EditFilterModal} from '../../PreconditionTable/modals/EditFilterModal/EditFilterModal'

const MultipleSubTableHeader = ({
    selectedCodes,
    dictionary,
    preparedTablesCodes,
    filterName,
    isEditable,
    setPreparedTablesCodes,
    toggleTable,
    addCodes,
    removeCodes,
    copySubTable,
    setSelectedByCodes,
}) => {
    const [isShowAddSubTableModal, setIsShowAddSubTableModal] = useState(false)
    const [isShowEditFilterModal, setIsShowEditFilterModal] = useState(false)
    const blockEditText = 'Изменения в утвержденной таблице запрещены.'
    const blockCopyText = 'Копирование утвержденной таблицы запрещено.'

    const editFilter = (curSelectedCodes) => {
        if (!isEditable) return

        const needAdd = []
        const needRemove = []

        curSelectedCodes.forEach((curCode) => {
            if (!selectedCodes.includes(curCode)) needAdd.push(curCode)
        })

        selectedCodes.forEach((code) => {
            if (!curSelectedCodes.includes(code)) needRemove.push(code)
        })

        addCodes(needAdd)
        removeCodes(needRemove)
    }

    const onRemoveCode = (e, code) => {
        e.stopPropagation()
        if (isEditable) {
            removeCodes([code])
        } else {
            alert(blockEditText)
        }
    }

    const onEditSubTable = (e) => {
        e.stopPropagation()
        if (isEditable) {
            setIsShowEditFilterModal(true)
        } else {
            alert(blockEditText)
        }
    }

    const onCopySubTable = (e) => {
        e.stopPropagation()
        if (isEditable) {
            setIsShowAddSubTableModal(true)
        } else {
            alert(blockCopyText)
        }
    }

    return (
        <>
            <div className={s.tableHeader} onClick={toggleTable}>
                <div className={s.filter} onClick={(e) => e.stopPropagation()}>
                    <p className={s.filterTitle}>{filterName === 'vessels' ? 'Судна' : 'Зоны'}:</p>
                    <div className={s.filterItemList}>
                        {selectedCodes.map((filterCode) => (
                            <div key={filterCode} className={s.filterItem}>
                                <p className={s.filterItemTitle}>
                                    {dictionary.find((item) => item.code === filterCode)?.value}
                                </p>
                                <div
                                    className={s.crossBtn}
                                    onClick={(e) => onRemoveCode(e, filterCode)}
                                >
                                    <svg
                                        width='12'
                                        height='12'
                                        viewBox='0 0 12 12'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M8.82925 2.46432C9.0245 2.26906 9.3411 2.26905 9.53635 2.46432C9.7316 2.65958 9.7316 2.97616 9.53635 3.17142L6.7079 5.99988L9.53635 8.82828C9.7316 9.02353 9.7316 9.34013 9.53635 9.53538C9.3411 9.73063 9.0245 9.73063 8.82925 9.53538L6.0008 6.70698L3.17241 9.53538C3.16935 9.53843 3.16627 9.54143 3.16316 9.54438C2.96728 9.73058 2.65751 9.72758 2.4653 9.53538C2.31885 9.38893 2.28224 9.17423 2.35546 8.99368C2.37987 8.93348 2.41648 8.87708 2.4653 8.82828L5.2937 5.99988L2.4653 3.17145C2.27003 2.97619 2.27003 2.6596 2.4653 2.46434C2.66056 2.26908 2.97714 2.26908 3.1724 2.46434L6.0008 5.29273L8.82925 2.46432Z'
                                            fill='white'
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.btnGroup}>
                    <div className={s.btn} onClick={onCopySubTable}>
                        <svg
                            width='17'
                            height='16'
                            viewBox='0 0 17 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M10.5 1.33325C11.2364 1.33325 11.8333 1.93021 11.8333 2.66659V10.6666C11.8333 11.403 11.2364 11.9999 10.5 11.9999H3.83333C3.09695 11.9999 2.5 11.403 2.5 10.6666V2.66659C2.5 1.93021 3.09695 1.33325 3.83333 1.33325H10.5ZM10.5 2.33325C10.6841 2.33325 10.8333 2.48249 10.8333 2.66659V10.6666C10.8333 10.8507 10.6841 10.9999 10.5 10.9999H3.83333C3.64924 10.9999 3.5 10.8507 3.5 10.6666V2.66659C3.5 2.48249 3.64924 2.33325 3.83333 2.33325H10.5Z'
                                fill='white'
                            />
                            <path
                                d='M5.1665 14C5.1665 13.7239 5.39036 13.5 5.6665 13.5H11.8332C12.6616 13.5 13.3332 12.8284 13.3332 12V4.5C13.3332 4.22386 13.557 4 13.8332 4C14.1093 4 14.3332 4.22386 14.3332 4.5V12C14.3332 13.3807 13.2139 14.5 11.8332 14.5H5.6665C5.39036 14.5 5.1665 14.2761 5.1665 14Z'
                                fill='white'
                            />
                        </svg>
                        <p className={s.btnText}>Скопировать</p>
                    </div>
                    <div className={s.btn} onClick={onEditSubTable}>
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M13.8905 5.44285L5.72386 13.6095C5.47381 13.8595 5.13467 14 4.78105 14H2.66667C2.29848 14 2 13.7015 2 13.3333V11.219C2 10.8653 2.14047 10.5262 2.39053 10.2762L10.5572 2.10952C11.0779 1.58882 11.9221 1.58882 12.4428 2.10952L13.8905 3.55723C14.4112 4.07793 14.4112 4.92215 13.8905 5.44285ZM9.5944 4.48653L11.5135 6.40565L5.01675 12.9024C4.95424 12.9649 4.86945 13 4.78105 13H3V11.219C3 11.1306 3.03512 11.0458 3.09763 10.9833L9.5944 4.48653ZM10.3015 3.77941L12.2206 5.69854L13.1834 4.73575C13.3136 4.60557 13.3136 4.39451 13.1834 4.26434L11.7357 2.81663C11.6055 2.68645 11.3945 2.68645 11.2643 2.81663L10.3015 3.77941Z'
                                fill='white'
                            />
                        </svg>
                        <p className={s.btnText}>Редактировать</p>
                    </div>
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
            {isShowEditFilterModal && (
                <EditFilterModal
                    filterName={filterName}
                    selectedCodes={selectedCodes}
                    preparedTablesCodes={preparedTablesCodes}
                    closeModal={() => setIsShowEditFilterModal(false)}
                    mainAction={editFilter}
                    setSelectedByCodes={setSelectedByCodes}
                    withDisabled={true}
                />
            )}
            {isShowAddSubTableModal && (
                <AddSubTableModal
                    filterName={filterName}
                    preparedTablesCodes={preparedTablesCodes}
                    setPreparedTablesCodes={setPreparedTablesCodes}
                    closeModal={() => setIsShowAddSubTableModal(false)}
                    mainAction={copySubTable}
                    setSelectedByCodes={setSelectedByCodes}
                    withDisabled={true}
                />
            )}
        </>
    )
}

const MemoizedMultipleSubTableHeader = memo(MultipleSubTableHeader)
export {MemoizedMultipleSubTableHeader as MultipleSubTableHeader}
