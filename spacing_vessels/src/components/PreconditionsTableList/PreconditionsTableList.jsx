import React, {useEffect, useMemo, useState} from 'react'
import {useOutletContext, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import Handsontable from 'handsontable'
import {registerAllModules} from 'handsontable/registry'
import {registerLanguageDictionary, ruRU} from 'handsontable/i18n'

import * as s from './style.module.scss'

import {Preloader} from '../Preloader/Preloader'
import {NestedTable} from './PreconditionTable/NestedTable'
import {MultipleTable} from './PreconditionTable/MultipleTable'
import {PreconditionTable} from './PreconditionTable/PreconditionTable'
import {MultipleTableTwoFilters} from './PreconditionTable/MultipleTableTwoFilters'
import {spacingDetailApi} from '../../api/spacingDetailApi'
import {preconditionTableApi} from '../../api/preconditionTableApi'

import {numericValidator} from '../../utils/numericValidator'
import {percentValidator} from '../../utils/percentValidator'
import {portDaysValidator} from '../../utils/portDaysValidator'

registerAllModules()
registerLanguageDictionary(ruRU)

Handsontable.validators.registerValidator('customNumeric', numericValidator)
Handsontable.validators.registerValidator('percents', percentValidator)
Handsontable.validators.registerValidator('portDays', portDaysValidator)

const PreconditionsTableList = ({setDepartments}) => {
    const [preconditionsTableList, setPreconditionsTableList] = useState(null)
    const [isTablesFetching, setIsTablesFetching] = useState(true)
    const {id, departmentId} = useParams()

    const [modelStatus, setModelStatus] = useOutletContext()

    useEffect(() => {
        const getPreconditionsTableList = async () => {
            try {
                setIsTablesFetching(true)
                const responseTableList = await fetchDepartmentTableList(departmentId)
                setPreconditionsTableList(responseTableList)
                setIsTablesFetching(false)
            } catch (e) {
                console.log(e)
            }
        }

        departmentId && getPreconditionsTableList()
    }, [departmentId])

    const fetchDepartmentTableList = async (departmentId) => {
        const response = await spacingDetailApi.fetchDepartmentTableList(departmentId)

        if (response.status === 200) {
            return response.data.tableList
        }

        throw response
    }

    const fetchTableFilling = async (tableId, tableCode) => {
        const response = await preconditionTableApi.fetchTableFilling(id, tableCode, tableId)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    const sendTableChanges = async (tableId, tableCode, postData) => {
        await toast.promise(
            preconditionTableApi.sendTableChanges(id, postData, tableCode, tableId),
            {
                pending: 'Изменение данных',
                error: 'Ошибка при изменении данных',
                success: 'Данные успешно изменены',
            }
        )
    }

    const sendTableFilter = async (tableId, tableCode, postData) => {
        await toast.promise(
            preconditionTableApi.sendTableChanges(id, postData, tableCode, tableId),
            {
                pending: 'Изменение фильтра',
                error: 'Ошибка при изменении фильтра',
                success: 'Фильтр успешно изменен',
            }
        )
    }

    const addSubTable = async (tableId, tableCode, postData) => {
        await toast.promise(
            preconditionTableApi.sendTableChanges(id, postData, tableCode, tableId),
            {
                pending: 'Добавление вложенной таблицы',
                error: 'Ошибка при добавлении вложенной таблицы',
                success: 'Вложенная таблица успешно добавлена',
            }
        )
    }

    const sendSubTableApprove = async (tableId, tableCode, postData) => {
        await toast.promise(
            preconditionTableApi.sendSubTableApprove(id, postData, tableCode, tableId),
            {
                pending: 'Утверждение вложенной таблицы',
                error: 'Ошибка при утверждении вложенной таблицы',
                success: 'Вложенная таблица утверждена',
            }
        )
    }

    const sendApproveTable = async (tableId) => {
        const response = await toast.promise(preconditionTableApi.sendApproveTable(tableId), {
            pending: 'Утверждение таблицы',
            error: 'Ошибка при утверждении таблицы',
            success: 'Таблица утверждена',
        })

        if (response.status === 200) setDepartments(response.data)
    }

    const sendCancelApproveTable = async (tableId) => {
        const response = await toast.promise(preconditionTableApi.sendCancelApproveTable(tableId), {
            pending: 'Отмена утверждения таблицы',
            error: 'Ошибка при отмене утверждения таблицы',
            success: 'Утверждение таблицы отменено',
        })

        if (response.status === 200) {
            setDepartments(response.data)
            setModelStatus('calculating')
        }
    }

    const preconditionTables = useMemo(() => preconditionsTableList?.map((table) =>
        ['daily-catch', 'product-mix', 'price-discount-per-vessel'].includes(table.code) ? (
            <MultipleTable
                key={table.id}
                // isModelEditable={modelStatus === 'calculating'}
                isModelEditable={true}
                table={table}
                fetchTableFilling={() => fetchTableFilling(table.id, table.code)}
                sendTableChanges={(postData) =>
                    sendTableChanges(table.id, table.code, postData)
                }
                sendTableFilter={(postData) =>
                    sendTableFilter(table.id, table.code, postData)
                }
                addSubTable={(postData) => addSubTable(table.id, table.code, postData)}
                sendSubTableApprove={(postData) =>
                    sendSubTableApprove(table.id, table.code, postData)
                }
                sendApproveTable={() => sendApproveTable(table.id)}
                sendCancelApproveTable={() => sendCancelApproveTable(table.id)}
            />
        ) : [
            'variety-distribution',
            'fillet-raw-distribution',
            'additional-product-limitations',
        ].includes(table.code) ? (
            <MultipleTableTwoFilters
                key={table.id}
                // isModelEditable={modelStatus === 'calculating'}
                isModelEditable={true}
                table={table}
                fetchTableFilling={() => fetchTableFilling(table.id, table.code)}
                sendTableChanges={(postData) =>
                    sendTableChanges(table.id, table.code, postData)
                }
                sendTableFilter={(postData) =>
                    sendTableFilter(table.id, table.code, postData)
                }
                addSubTable={(postData) => addSubTable(table.id, table.code, postData)}
                sendSubTableApprove={(postData) =>
                    sendSubTableApprove(table.id, table.code, postData)
                }
                sendApproveTable={() => sendApproveTable(table.id)}
                sendCancelApproveTable={() => sendCancelApproveTable(table.id)}
            />
        ) : ['production-coefficients'].includes(table.code) ? (
            <NestedTable
                key={table.id}
                // isModelEditable={modelStatus === 'calculating'}
                isModelEditable={true}
                table={table}
                fetchTableFilling={() => fetchTableFilling(table.id, table.code)}
                sendTableChanges={(postData) =>
                    sendTableChanges(table.id, table.code, postData)
                }
                sendSubTableApprove={(postData) =>
                    sendSubTableApprove(table.id, table.code, postData)
                }
                sendApproveTable={() => sendApproveTable(table.id)}
                sendCancelApproveTable={() => sendCancelApproveTable(table.id)}
            />
        ) : (
            <PreconditionTable
                key={table.id}
                // isModelEditable={modelStatus === 'calculating'}
                isModelEditable={true}
                table={table}
                fetchTableFilling={() => fetchTableFilling(table.id, table.code)}
                sendTableChanges={(postData) => sendTableChanges(table.id, table.code, postData)}
                sendApproveTable={() => sendApproveTable(table.id)}
                sendCancelApproveTable={() => sendCancelApproveTable(table.id)}
            />
        )
    ), [preconditionsTableList, modelStatus])

    return isTablesFetching ? (
        <Preloader />
    ) : (
        <div className={s.tableListWrap}>
            {preconditionTables}
        </div>
    )
}

export {PreconditionsTableList}
