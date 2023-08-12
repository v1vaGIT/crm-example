import React, {memo, useState} from 'react'

import * as s from '../style.module.scss'

import {TableFilling} from '../TableFilling/TableFilling'
import {TableHeader} from './TableHeader/TableHeader'
import {Preloader} from '../../Preloader/Preloader'
import {ModalWrapper} from '../../ModalWrapper/ModalWrapper'
import {getPreparedDataBeforeRender} from '../../../utils/getPreparedDataBeforeRender'

const PreconditionTable = ({
    table,
    isModelEditable,
    sendTableChanges,
    fetchTableFilling,
    sendApproveTable,
    sendCancelApproveTable,
}) => {
    const [isOpenedTable, setIsOpenedTable] = useState(false)
    const [tableFilling, setTableFilling] = useState(null)
    const [isApproved, setIsApproved] = useState(table.isApproved)
    const [isShowCancelApproveModal, setIsShowCancelApproveModal] = useState(false)

    const toggleTable = async () => {
        setIsOpenedTable((prevState) => !prevState)

        if (!tableFilling) {
            let tableFillingResponse = await fetchTableFilling()

            if (table.code === 'port-calls') {
                const dictionaryByKey = {
                    location: tableFillingResponse.dataForSelect.currentLocation,
                    port: tableFillingResponse.dataForSelect.port,
                }

                tableFillingResponse = {
                    ...tableFillingResponse,
                    ...getPreparedDataBeforeRender(tableFillingResponse.rowsData, dictionaryByKey),
                }
            }

            setTableFilling(tableFillingResponse)
        }
    }

    const approveTable = () => {
        setIsApproved(true)
        sendApproveTable()
    }

    const onSendCancelApproveTable = (e) => {
        e.stopPropagation()
        setIsApproved(false)
        sendCancelApproveTable()
    }

    return (
        <>
            <div className={s.tableWrap}>
                <TableHeader
                    title={table.title}
                    fillingPercentage={table.fillingPercentage}
                    isApproved={isApproved}
                    isEditable={isModelEditable && table.isEditable}
                    isOpenedTable={isOpenedTable}
                    toggleTable={toggleTable}
                    showCancelApproveModal={() => setIsShowCancelApproveModal(true)}
                />

                {isOpenedTable &&
                    (tableFilling ? (
                        <TableFilling
                            tableFilling={tableFilling}
                            tableCode={table.code}
                            isEditable={isModelEditable && table.isEditable && !isApproved}
                            approveTable={approveTable}
                            sendTableChanges={(postData) => sendTableChanges({rowsData: postData})}
                        />
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

const MemoizedPreconditionTable = memo(PreconditionTable)
export {MemoizedPreconditionTable as PreconditionTable}
