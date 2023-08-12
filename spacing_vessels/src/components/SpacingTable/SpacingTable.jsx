import React, {useState} from 'react'
import {useNavigate} from 'react-router'
import {toast} from 'react-toastify'

import * as s from './style.module.scss'
import 'react-toastify/dist/ReactToastify.css'

import {TableRow} from './TableRow/TableRow'
import {YearSelect} from '../YearSelect/YearSelect'
import {ModalNewSpacing} from '../ModalNewSpacing/ModalNewSpacing'
import {monthListRu} from '../../assets/helperArrays/helperArrays'
import {spacingsApi} from '../../api/spacingsApi'

const SpacingTable = ({year, yearNameList, currentYearName, onSetCurrentYear}) => {
    const [selectedPlanId, setSelectedPlanId] = useState(year.plans?.[0]?.code || 'business')
    const [codeForNewSpacing, setCodeForNewSpacing] = useState(null)
    const [dataForCopySpacing, setDataForCopySpacing] = useState(null)
    const navigate = useNavigate()

    const onNewSpacing = (formFields) =>
        newSpacing({...formFields, planTypeCode: codeForNewSpacing})

    const newSpacing = async (node) => {
        const response = await toast.promise(creatNewSpacing(node), {
            pending: 'Создание новой расстановки',
            error: 'Ошибка при создании расстановки',
            success: 'Новая расстановка успешно создана',
        })

        navigate(`/rrpk/spacing-vessels/spacing/${response.id}/preconditions`)
    }

    const creatNewSpacing = async (node) => {
        const response = await spacingsApi.creatNewSpacing(node)

        if (response.status === 201) {
            return response.data
        }

        throw response
    }

    const onCopySpacing = (formFields) => copySpacing({...formFields, id: dataForCopySpacing.id})

    const copySpacing = async (data) => {
        const copyNodeId = await toast.promise(copyExistingSpacing(data), {
            pending: 'Копирование расстановки',
            error: 'Ошибка при копировании расстановки',
            success: 'Расстановка успешно скопирована',
        })

        navigate(`/rrpk/spacing-vessels/spacing/${copyNodeId}/preconditions`)
    }

    const copyExistingSpacing = async (data) => {
        const response = await spacingsApi.copyExistingSpacing(data)

        if (response.status === 201) {
            return response.data.id
        }

        throw response
    }

    return (
        <>
            <table className={s.table}>
                <thead>
                    <tr className={s.plan}>
                        <th>
                            <YearSelect
                                yearNameList={yearNameList}
                                currentYearName={currentYearName}
                                onSetCurrentYear={onSetCurrentYear}
                            />
                        </th>
                        {monthListRu.map((month) => (
                            <th key={month}>{month}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {year.plans.map((plan) => (
                        <TableRow
                            key={plan.code}
                            plan={plan}
                            changePlan={setSelectedPlanId}
                            selectedPlanId={selectedPlanId}
                            setCodeForNewSpacing={setCodeForNewSpacing}
                            setDataForCopySpacing={setDataForCopySpacing}
                        />
                    ))}
                </tbody>
            </table>

            {codeForNewSpacing && (
                <ModalNewSpacing
                    title={'Новая расстановка'}
                    newSpacing={onNewSpacing}
                    closeModal={() => setCodeForNewSpacing(null)}
                />
            )}

            {dataForCopySpacing && (
                <ModalNewSpacing
                    title={'Копировать расстановку'}
                    initialDate={dataForCopySpacing.date}
                    planCodes={year.plans.map((plan) => ({
                        value: plan.code,
                        label: plan.title,
                    }))}
                    nodeDescription={{
                        year: dataForCopySpacing.year,
                        planType: dataForCopySpacing.planType,
                    }}
                    newSpacing={onCopySpacing}
                    closeModal={() => setDataForCopySpacing(null)}
                />
            )}
        </>
    )
}

export {SpacingTable}
