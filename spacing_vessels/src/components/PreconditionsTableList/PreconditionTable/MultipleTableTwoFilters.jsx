import React, {useEffect, useMemo, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import * as s from '../style.module.scss'

import {Preloader} from '../../Preloader/Preloader'
import {AddSubTableModal} from './modals/AddSubTableModal/AddSubTableModal'
import {TableHeader} from './TableHeader/TableHeader'
import {MultipleSubTableTwoFilters} from '../PreconditionSubTable/MultipleSubTableTwoFilters'
import {ModalWrapper} from '../../ModalWrapper/ModalWrapper'

const MultipleTableTwoFilters = ({
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

    const [dictionary, setDictionary] = useState({vessels: [], zones: []})
    const [preparedTablesCodes, setPreparedTablesCodes] = useState({
        vessels: {},
        zones: {},
    })
    const [dataForDisabling, setDataForDisabling] = useState(null)
    const [selectedCodesVessels, setSelectedCodesVessels] = useState([])
    const [isShowModalVessels, setIsShowModalVessels] = useState(false)
    const [isShowModalZones, setIsShowModalZones] = useState(false)
    const [isShowCancelApproveModal, setIsShowCancelApproveModal] = useState(false)

    useEffect(() => {
        if (!tableFilling?.groupData.length) return
        const tables = Object.values(tableFilling.groupData)

        let counter = 0
        tables.forEach((table) => {
            if (table.isApproved) counter++
        })

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

        setDictionary({
            vessels: multipleTable.groupSelect.vessels.dictionary,
            zones: multipleTable.groupSelect.zones.dictionary,
        })

        const dataForDisabling = prepareDataForDisabling(multipleTable.groupData)
        setDataForDisabling(dataForDisabling)

        const allSelectedVesselsCodes = multipleTable.groupData.map((group) => group.vessels).flat()
        const allSelectedZonesCodes = multipleTable.groupData.map((group) => group.zones).flat()
        const preparedVesselsCodes = prepareGroupSelectData(
            multipleTable.groupSelect.vessels.data,
            allSelectedVesselsCodes
        )
        const preparedZonesCodes = prepareSelectData(
            multipleTable.groupSelect.zones.data,
            allSelectedZonesCodes
        )

        setPreparedTablesCodes({
            vessels: preparedVesselsCodes,
            zones: preparedZonesCodes,
        })
    }

    const prepareDataForDisabling = (data) => {
        const preparedData = {
            vessels: new Map(),
            zones: new Map(),
        }

        data.forEach(subTable => {
            subTable.vessels.forEach(vessel => {
                const curVessel = preparedData.vessels.get(vessel)
                if (curVessel?.size) {
                    subTable.zones.forEach(curVessel.add, curVessel)
                } else {
                    preparedData.vessels.set(vessel, new Set(subTable.zones))
                }
            })

            subTable.zones.forEach(zone => {
                const curZone = preparedData.zones.get(zone)
                if (curZone?.size) {
                    subTable.vessels.forEach(curZone.add, curZone)
                } else {
                    preparedData.zones.set(zone, new Set(subTable.vessels))
                }
            })
        })

        return preparedData
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
        const collectedData = {
            groupData: tableFilling.groupData.map((subTable) =>
                subTableId === subTable.id
                    ? {
                        ...subTable,
                        rowsData: postData,
                    }
                    : subTable
            ),
        }

        sendTableChanges(collectedData)
    }

    const changesTableFilter = async (filterList, subTableId, filterNames) => {
        let groupData = tableFilling.groupData

        filterNames.forEach((filterName) => {
            if (filterList[filterName].length) {
                groupData = groupData.map((subTable) => {
                    let newRowsData = subTable.rowsData

                    if (filterName === 'zones') {
                        newRowsData =
                            table.code === 'variety-distribution'
                                ? chooseUniqProductsGroups(
                                    filterList[filterName],
                                    tableFilling.templateRowsData,
                                    structuredClone(subTable.rowsData)
                                )
                                : chooseUniqProducts(
                                    filterList[filterName],
                                    tableFilling.templateRowsData,
                                    structuredClone(subTable.rowsData)
                                )
                    }

                    return subTableId !== subTable.id
                        ? subTable
                        : {
                            ...subTable,
                            [filterName]: filterList[filterName],
                            rowsData: newRowsData,
                        }
                })
            } else {
                const subTableForEmpty = groupData.find((subTable) => subTableId === subTable.id)
                let prepareFunction = setSelectedGroupByCodes
                let filterNameForEmpty = 'vessels'

                if (filterName === 'vessels') {
                    prepareFunction = setSelectedByCodes
                    filterNameForEmpty = 'zones'
                }

                const newPreparedFilter = prepareFunction(
                    subTableForEmpty[filterNameForEmpty],
                    structuredClone(preparedTablesCodes[filterNameForEmpty]),
                    false
                )

                setPreparedTablesCodes((prevState) => ({
                    ...prevState,
                    [filterNameForEmpty]: newPreparedFilter,
                }))

                groupData = groupData.filter((subTable) => subTableId !== subTable.id)
            }
        })

        await sendTableFilter({groupData})
        setTableFilling({...tableFilling, groupData})
    }

    const chooseUniqProductsGroups = (codes, template, oldRowsData) => {
        const oldGroups = oldRowsData.map((row) => row[0].product)
        const newGroups = []
        let rowsData = oldRowsData

        codes.forEach((code) => {
            const zoneProducts = Object.entries(template[code])

            zoneProducts.forEach((product) => {
                const groupCode = product[1][0].product

                if (!newGroups.includes(groupCode)) {
                    newGroups.push(groupCode)
                }

                if (!oldGroups.includes(groupCode)) {
                    oldGroups.push(groupCode)
                    rowsData.push(product[1])
                }
            })
        })

        oldGroups.forEach((name) => {
            if (!newGroups.includes(name)) {
                rowsData = rowsData.filter((row) => row[0].product !== name)
            }
        })

        return structuredClone(rowsData)
    }

    const chooseUniqProducts = (codes, template, oldRowsData) => {
        const oldGroups = oldRowsData.map((row) => row.product)
        const newGroups = []
        let rowsData = oldRowsData

        codes.forEach((code) => {
            const zoneProducts = Object.entries(template[code])

            zoneProducts.forEach((product) => {
                if (!newGroups.includes(product[0])) {
                    newGroups.push(product[0])
                }

                if (!oldGroups.includes(product[0])) {
                    oldGroups.push(product[0])
                    rowsData.push(product[1])
                }
            })
        })

        oldGroups.forEach((name) => {
            if (!newGroups.includes(name)) {
                rowsData = rowsData.filter((row) => row.product !== name)
            }
        })
        return structuredClone(rowsData)
    }

    const onAddSubTable = async (selectedCodesZones) => {
        const newRowsData = chooseUniqProducts(
            selectedCodesZones,
            tableFilling.templateRowsData,
            []
        )

        const groupData = [
            ...tableFilling.groupData,
            {
                id: uuidv4(),
                vessels: selectedCodesVessels,
                zones: selectedCodesZones,
                rowsData: newRowsData,
                isApproved: false,
            },
        ]

        setPreparedTablesCodes((prevState) => ({
            vessels: setSelectedGroupByCodes(
                selectedCodesVessels,
                structuredClone(prevState.vessels),
                true
            ),
            zones: setSelectedByCodes(selectedCodesZones, structuredClone(prevState.zones), true),
        }))

        setSelectedCodesVessels([])
        await addSubTable({groupData})
        setTableFilling({...tableFilling, groupData})
        addDisabledCodes(structuredClone(dataForDisabling), selectedCodesVessels, selectedCodesZones)
    }

    const copySubTable = async (selectedCodes, subTableId) => {
        const rowsData = tableFilling.groupData.find(
            (groupItem) => groupItem.id === subTableId
        ).rowsData

        const groupData = [
            ...tableFilling.groupData,
            {
                id: uuidv4(),
                vessels: selectedCodes.vessels,
                zones: selectedCodes.zones,
                rowsData: structuredClone(rowsData),
                isApproved: false,
            },
        ]

        setPreparedTablesCodes((prevState) => ({
            vessels: setSelectedGroupByCodes(
                selectedCodes.vessels,
                structuredClone(prevState.vessels),
                true
            ),
            zones: setSelectedByCodes(selectedCodes.zones, structuredClone(prevState.zones), true),
        }))

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

    const setSelectedByCodes = (zoneCodeAr, prepCodes, setValue) => {
        prepCodes.forEach((item) => {
            if (zoneCodeAr.includes(item.code)) {
                item.selected = setValue
            }
        })

        return prepCodes
    }

    const openSecondModal = (firstCodes) => {
        setSelectedCodesVessels(firstCodes)
        setIsShowModalZones(true)
    }

    const onSendCancelApproveTable = (e) => {
        e.stopPropagation()
        cancelApproveTable()
    }

    const multipleSubTableList = useMemo(
        () =>
            tableFilling?.groupData?.map((subTable) => (
                <MultipleSubTableTwoFilters
                    key={subTable.id}
                    isEditable={table.isEditable && isModelEditable}
                    tableCode={table.code}
                    subTable={subTable}
                    dictionary={dictionary}

                    dataForDisabling={dataForDisabling}
                    setDataForDisabling={setDataForDisabling}

                    preparedTablesCodes={preparedTablesCodes}
                    setPreparedTablesCodes={setPreparedTablesCodes}
                    sendTableChanges={(rowsData) => changeTableFilling(rowsData, subTable.id)}
                    changesTableFilter={(filterList, filterName) =>
                        changesTableFilter(filterList, subTable.id, filterName)
                    }
                    copySubTable={(selectedCodes) => copySubTable(selectedCodes, subTable.id)}
                    approveSubTable={() => approveSubTable(subTable.id)}
                    setSelectedGroupByCodes={setSelectedGroupByCodes}
                    setSelectedByCodes={setSelectedByCodes}
                />
            )),
        [tableFilling?.groupData, isModelEditable, dataForDisabling]
    )

    const getDisabledZones = (data) => {
        const disablesCodes = new Set()

        selectedCodesVessels.forEach(vessel => {
            data.vessels.get(vessel)?.forEach(zone => {
                if (!disablesCodes.has(zone)) disablesCodes.add(zone)
            })
        })

        return disablesCodes
    }

    const addDisabledCodes = (data, addedVessels, addedZones) => {
        addedVessels.forEach(vessel => {
            const zonesOfVessel = data.vessels.get(vessel)
            if (zonesOfVessel?.size) {
                addedZones.forEach(zone => zonesOfVessel.add(zone))
            } else {
                data.vessels.set(vessel, new Set(addedZones))
            }
        })

        addedZones.forEach(zone => {
            const vesselsOfZones = data.zones.get(zone)
            if (vesselsOfZones?.size) {
                addedVessels.forEach(vessel => vesselsOfZones.add(vessel))
            } else {
                data.zones.set(zone, new Set(addedVessels))
            }
        })

        setDataForDisabling(data)
    }

    return (
        <>
            <div className={s.tableWrap}>
                <TableHeader
                    title={table.title}
                    fillingPercentage={table.fillingPercentage}
                    isApproved={isApproved}
                    isEditable={table.isEditable && isModelEditable}
                    isOpenedTable={isOpenedTable}
                    toggleTable={toggleTable}
                    isMultiple={tableFilling}
                    showVesselModal={() => setIsShowModalVessels(true)}
                    showCancelApproveModal={() => setIsShowCancelApproveModal(true)}
                />
                {isOpenedTable &&
                    (tableFilling ? (
                        multipleSubTableList
                    ) : (
                        <div className={s.preloaderWrap}>
                            <Preloader/>
                        </div>
                    ))}
            </div>

            {isShowModalVessels && (
                <AddSubTableModal
                    filterName={'vessels'}
                    preparedTablesCodes={preparedTablesCodes.vessels}
                    setPreparedTablesCodes={setPreparedTablesCodes}
                    closeModal={() => setIsShowModalVessels(false)}
                    mainAction={openSecondModal}
                    setSelectedByCodes={setSelectedGroupByCodes}
                    isOneFilter={false}
                />
            )}
            {isShowModalZones && (
                <AddSubTableModal
                    filterName={'zones'}
                    preparedTablesCodes={prepareSelectData(preparedTablesCodes.zones, [])}
                    disabledItems={getDisabledZones(structuredClone(dataForDisabling))}
                    setPreparedTablesCodes={setPreparedTablesCodes}
                    closeModal={() => setIsShowModalZones(false)}
                    mainAction={onAddSubTable}
                    setSelectedByCodes={setSelectedByCodes}
                    isOneFilter={false}
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

export {MultipleTableTwoFilters}
