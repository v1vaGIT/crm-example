import React, {useState} from 'react'
import * as s from './style.module.scss'
import {EditFilterModal} from './EditFilterModal/EditFilterModal'

const ResultsFilter = ({filter, filterName, selectedItems, setSelectedItems}) => {
    const [isShowFilterModal, setIsShowFilterModal] = useState(false)

    const openModal = (e) => {
        e.stopPropagation()
        setIsShowFilterModal(true)
    }

    const editFilter = (curSelectedCodes) => {
        const needAdd = []
        const needRemove = []

        curSelectedCodes.forEach(
            (curCode) => !selectedItems.includes(curCode) && needAdd.push(curCode)
        )

        selectedItems.forEach((code) => !curSelectedCodes.includes(code) && needRemove.push(code))

        addCodes(needAdd)
        removeCodes(needRemove)
    }

    const removeFilterItem = (e, itemId) => {
        setSelectedItems(selectedItems.filter((item) => item.id !== itemId))
        e.stopPropagation()
        removeCodes([itemId])
    }

    const addCodes = (codesAr) => {
        setSelectedItems((prevState) => {
            const temp = [...prevState]
            codesAr.forEach((curCode) => !temp.includes(curCode) && temp.push(curCode))
            return temp
        })
    }

    const removeCodes = (removeCodesAr) => {
        setSelectedItems((prevFilterList) =>
            prevFilterList.filter((code) => !removeCodesAr.includes(code))
        )
    }

    const filterList = selectedItems?.map((item) => (
        <div key={item.id} className={s.filterItem}>
            <div className={s.itemName}>{item.name}</div>
            <div className={s.crossIcon} onClick={(e) => removeFilterItem(e, item.id)}>
                <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M11.7723 3.28592C12.0327 3.02558 12.4548 3.02557 12.7151 3.28592C12.9755 3.54627 12.9755 3.96838 12.7151 4.22873L8.94387 8L12.7151 11.7712C12.9755 12.0315 12.9755 12.4537 12.7151 12.714C12.4548 12.9743 12.0327 12.9743 11.7723 12.714L8.00107 8.9428L4.22988 12.714C4.2258 12.7181 4.2217 12.7221 4.21755 12.726C3.95637 12.9743 3.54334 12.9703 3.28706 12.714C3.0918 12.5187 3.04298 12.2325 3.14062 11.9917C3.17316 11.9115 3.22198 11.8363 3.28706 11.7712L7.05827 8L3.28706 4.22876C3.02671 3.96842 3.02671 3.5463 3.28706 3.28596C3.54741 3.0256 3.96952 3.0256 4.22987 3.28596L8.00107 7.05714L11.7723 3.28592Z'
                        fill='#FFFFFF'
                    />
                </svg>
            </div>
        </div>
    ))

    return (
        <>
            <div className={s.filter}>
                <div className={s.filterItemsWrap}>
                    <div className={s.filterName}>{filterName}:</div>
                    {selectedItems.length ? (
                        <div className={s.filterItems}>{filterList}</div>
                    ) : (
                        <div className={s.allFilter}>Все</div>
                    )}
                </div>
                <div className={s.plusIcon} onClick={openModal}>
                    <svg
                        width='14'
                        height='14'
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
                </div>
            </div>

            {isShowFilterModal && (
                <EditFilterModal
                    filter={filter}
                    filterName={filterName}
                    selectedItems={selectedItems}
                    closeModal={() => setIsShowFilterModal(false)}
                    mainAction={editFilter}
                />
            )}
        </>
    )
}

export {ResultsFilter}
