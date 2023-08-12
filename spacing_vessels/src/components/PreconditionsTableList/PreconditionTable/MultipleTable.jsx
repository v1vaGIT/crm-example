import React, {memo, useEffect, useMemo, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import * as s from '../style.module.scss'

import {Preloader} from '../../Preloader/Preloader'
import {AddSubTableModal} from './modals/AddSubTableModal/AddSubTableModal'
import {MultipleSubTable} from '../PreconditionSubTable/MultipleSubTable'
import {TableHeader} from './TableHeader/TableHeader'
import {ModalWrapper} from '../../ModalWrapper/ModalWrapper'

const MultipleTable = ({
    table,
    isModelEditable,
    sendTableChanges,
    sendTableFilter,
    addSubTable,
    fetchTableFilling,
    sendSubTableApprove,
    sendApproveTable,
    sendCancelApproveTable,
}) => {
    const [isOpenedTable, setIsOpenedTable] = useState(false)
    const [tableFilling, setTableFilling] = useState(null)
    const [isApproved, setIsApproved] = useState(table.isApproved)
    const [isShowCancelApproveModal, setIsShowCancelApproveModal] = useState(false)

    const [dictionary, setDictionary] = useState(null)
    const [preparedTablesCodes, setPreparedTablesCodes] = useState(null)
    const [isShowAddSubTableModal, setIsShowAddSubTableModal] = useState(false)
    const [filterName, setFilterName] = useState('vessels')

    useEffect(() => {
        if (!tableFilling?.groupData.length) return
        const tables = Object.values(tableFilling.groupData)

        let counter = 0
        tables.forEach((table) => table.isApproved && counter++)

        if (counter === tables.length && !isApproved) {
            setIsApproved(true)
            sendApproveTable()
        }
    }, [tableFilling])

    const toggleTable = async () => {
        setIsOpenedTable((prevState) => !prevState)

        if (tableFilling) return
        const multipleTable = await fetchTableFilling()
        setTableFilling(multipleTable)

        let curFilterName = 'vessels'
        let prepareFunction = prepareGroupSelectData

        if (multipleTable.groupSelect?.zones) {
            curFilterName = 'zones'
            setFilterName('zones')
            prepareFunction = prepareSelectData
        }

        const allSelectedCodes = multipleTable.groupData.map((group) => group[curFilterName]).flat()
        const preparedCodes = prepareFunction(
            multipleTable.groupSelect[curFilterName].data,
            allSelectedCodes
        )
        setPreparedTablesCodes(preparedCodes)
        setDictionary(multipleTable.groupSelect[curFilterName].dictionary)
    }

    const prepareGroupSelectData = (data, selectedCodes) => {
        const preparedData = []
        const selectedVessels = new Set(selectedCodes)

        data.forEach((group) => {
            let isGroupSelected = true

            preparedData.push({
                title: group.title,
                items: group.items.map((item) => {
                    const isSelectedItem = selectedVessels.has(item.code)
                    if (!isSelectedItem) isGroupSelected = false

                    return {
                        code: item.code,
                        value: item.value,
                        selected: isSelectedItem,
                    }
                }),
                selected: isGroupSelected,
            })
        })

        return preparedData
    }

    const prepareSelectData = (data, selectedCodes) => {
        const preparedData = []
        const selectedZones = new Set(selectedCodes)

        data.forEach((group) => {
            preparedData.push({
                code: group.code,
                value: group.value,
                selected: selectedZones.has(group.code),
            })
        })

        return preparedData
    }

    const changeTableFilling = async (postData, subTableId) => {
        const groupData = tableFilling.groupData.map((subTable) =>
            subTableId === subTable.id ? {...subTable, rowsData: postData} : subTable
        )

        sendTableChanges({groupData})
    }

    const changeTableFilter = async (filterList, subTableId) => {
        let groupData

        if (filterList.length === 0) {
            groupData = tableFilling.groupData.filter((subTable) => subTableId !== subTable.id)
        } else {
            groupData = tableFilling.groupData.map((subTable) =>
                subTableId === subTable.id ? {...subTable, vessels: filterList} : subTable
            )
        }

        await sendTableFilter({groupData})
        setTableFilling({...tableFilling, groupData})
    }

    const onAddSubTable = async (selectedCodes) => {
        const groupData = [
            ...tableFilling.groupData,
            {
                id: uuidv4(),
                [filterName]: selectedCodes,
                rowsData: structuredClone(tableFilling.templateRowsData),
                isApproved: false,
            },
        ]

        await addSubTable({groupData})
        setTableFilling({...tableFilling, groupData})
    }

    const copySubTable = async (selectedCodes, subTableId) => {
        const rowsData = tableFilling.groupData.find(
            (groupItem) => groupItem.id === subTableId
        ).rowsData

        const groupData = [
            ...tableFilling.groupData,
            {
                id: uuidv4(),
                vessels: selectedCodes,
                rowsData: structuredClone(rowsData),
                isApproved: false,
            },
        ]

        await addSubTable({groupData})
        setTableFilling({...tableFilling, groupData})
    }

    const approveSubTable = async (id) => {
        const groupData = tableFilling.groupData.map((subTable) =>
            id === subTable.id ? {...subTable, isApproved: true} : subTable
        )

        await sendSubTableApprove({groupData})
        setTableFilling({...tableFilling, groupData})
    }

    const cancelApproveTable = async () => {
        if (!tableFilling) return

        const groupData = tableFilling.groupData.map((subTable) => ({
            ...subTable,
            isApproved: false,
        }))

        setIsApproved(false)
        setTableFilling({...tableFilling, groupData})

        await sendCancelApproveTable()
        sendTableChanges({groupData})
    }

    const setSelectedGroupByCodes = (codesAr, state, value) => {
        codesAr.forEach((code) => {
            state.forEach((group) => {
                group.selected = true

                group.items.forEach((item) => {
                    if (item.code === code) {
                        item.selected = value
                    }

                    if (item.selected === false) {
                        group.selected = false
                    }
                })
            })
        })

        return state
    }

    const setSelectedByCodes = (zoneCode, state, value) => {
        state.forEach((item) => {
            if (zoneCode.includes(item.code)) {
                item.selected = value
            }
        })

        return state
    }

    const onSendCancelApproveTable = (e) => {
        e.stopPropagation()
        cancelApproveTable()
    }

    const multipleSubTableList = useMemo(
        () =>
            tableFilling?.groupData?.map((subTable) => (
                <MultipleSubTable
                    key={subTable.id}
                    isEditable={table.isEditable && isModelEditable}
                    tableCode={table.code}
                    filterName={filterName}
                    subTable={subTable}
                    dictionary={dictionary}
                    preparedTablesCodes={preparedTablesCodes}
                    setPreparedTablesCodes={setPreparedTablesCodes}
                    sendTableChanges={(rowsData) => changeTableFilling(rowsData, subTable.id)}
                    changesTableFilter={(filterList) => changeTableFilter(filterList, subTable.id)}
                    copySubTable={(selectedCodes) => copySubTable(selectedCodes, subTable.id)}
                    approveSubTable={() => approveSubTable(subTable.id)}
                    setSelectedByCodes={
                        filterName === 'vessels' ? setSelectedGroupByCodes : setSelectedByCodes
                    }
                />
            )),
        [tableFilling?.groupData, isModelEditable]
    )

    return (
        <>
            <div className={s.tableWrap}>
                <TableHeader
                    title={table.title}
                    fillingPercentage={table.fillingPercentage}
                    isApproved={isApproved}
                    isEditable={table.isEditable && isModelEditable}
                    isMultiple={tableFilling}
                    isOpenedTable={isOpenedTable}
                    toggleTable={toggleTable}
                    showVesselModal={() => setIsShowAddSubTableModal(true)}
                    showCancelApproveModal={() => setIsShowCancelApproveModal(true)}
                />
                {isOpenedTable &&
                    (tableFilling ? (
                        multipleSubTableList
                    ) : (
                        <div className={s.preloaderWrap}>
                            <Preloader />
                        </div>
                    ))}
            </div>
            {isShowAddSubTableModal && (
                <AddSubTableModal
                    filterName={filterName}
                    preparedTablesCodes={preparedTablesCodes}
                    setPreparedTablesCodes={setPreparedTablesCodes}
                    closeModal={() => setIsShowAddSubTableModal(false)}
                    mainAction={onAddSubTable}
                    setSelectedByCodes={
                        filterName === 'vessels' ? setSelectedGroupByCodes : setSelectedByCodes
                    }
                    withDisabled={true}
                />
            )}

            {isShowCancelApproveModal && (
                <ModalWrapper
                    title={'Отмена утверждения'}
                    closeModal={() => setIsShowCancelApproveModal(false)}
                    mainAction={onSendCancelApproveTable}
                    btnTitle={'Снять утверждение'}
                >
                    <h4>Вы уверены, что хотите снять отметку &apos;Таблица утверждена&apos;?</h4>
                </ModalWrapper>
            )}
        </>
    )
}

const MemoizedMultipleTable = memo(MultipleTable)
export {MemoizedMultipleTable as MultipleTable}
