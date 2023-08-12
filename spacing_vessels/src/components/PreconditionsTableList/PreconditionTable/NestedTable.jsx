import React, {useEffect, useMemo, useState} from 'react'

import * as s from '../style.module.scss'

import {Preloader} from '../../Preloader/Preloader'
import {TableHeader} from './TableHeader/TableHeader'
import {NestedSubTable} from '../PreconditionSubTable/NestedSubTable'
import {ModalWrapper} from '../../ModalWrapper/ModalWrapper'

const NestedTable = ({
    table,
    isModelEditable,
    sendTableChanges,
    fetchTableFilling,
    sendSubTableApprove,
    sendApproveTable,
    sendCancelApproveTable,
}) => {
    const [isOpenedTable, setIsOpenedTable] = useState(false)
    const [tableFilling, setTableFilling] = useState(null)
    const [isApproved, setIsApproved] = useState(table.isApproved)
    const [isShowCancelApproveModal, setIsShowCancelApproveModal] = useState(false)

    useEffect(() => {
        if (!tableFilling) return
        const tables = Object.values(tableFilling.tablesData)

        let counter = 0
        tables.forEach((table) => table.isApproved && counter++)

        if (counter === tables.length && !isApproved) {
            setIsApproved(true)
            sendApproveTable()
        }
    }, [tableFilling])

    const toggleTable = async () => {
        setIsOpenedTable((prevState) => !prevState)

        if (!tableFilling) {
            const tableFilling = await fetchTableFilling()
            setTableFilling(tableFilling)
        }
    }

    const changeTableFilling = async (postData, subTableCode) => {
        const collectedData = {
            ...tableFilling,
            tables: {
                ...tableFilling.tables,
                [subTableCode]: postData,
            },
        }
        await sendTableChanges(collectedData)
    }

    const approveSubTable = async (code) => {
        const collectedData = {
            ...tableFilling,
            tablesData: {
                ...tableFilling.tablesData,
                [code]: {
                    ...tableFilling.tablesData[code],
                    isApproved: true,
                },
            },
        }

        setTableFilling(collectedData)
        await sendSubTableApprove(collectedData)
    }

    const cancelApproveTable = async () => {
        if (!tableFilling) return

        const tableCodes = Object.keys(tableFilling.tablesData)
        tableCodes.forEach((code) => (tableFilling.tablesData[code].isApproved = false))

        setIsApproved(false)
        setTableFilling(tableFilling)

        sendTableChanges(tableFilling)
        await sendCancelApproveTable()
    }

    const onSendCancelApproveTable = (e) => {
        e.stopPropagation()
        cancelApproveTable()
    }

    const nestedSubTableList = useMemo(
        () =>
            tableFilling?.structure?.map((parentTable) => (
                <NestedSubTable
                    key={parentTable.code}
                    isEditable={table.isEditable && isModelEditable}
                    isApproved={isApproved}
                    tableCode={parentTable.code}
                    subTable={parentTable}
                    tablesFilling={tableFilling.tablesData}
                    approveSubTable={approveSubTable}
                    sendTableChanges={changeTableFilling}
                />
            )),
        [tableFilling, isModelEditable, isApproved]
    )

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
                    showCancelApproveModal={() => setIsShowCancelApproveModal(true)}
                />

                {isOpenedTable &&
                    (tableFilling ? (
                        nestedSubTableList
                    ) : (
                        <div className={s.preloaderWrap}>
                            <Preloader />
                        </div>
                    ))}
            </div>

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

export {NestedTable}
