import React, {useEffect, useState} from 'react'
import cn from 'classnames'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router'

import * as s from './style.module.scss'

import {spacingDetailApi} from '../../api/spacingDetailApi'

const DepartmentsTabs = ({departments, setDepartments}) => {
    const [isDepartmentsFetching, setIsDepartmentsFetching] = useState(true)
    const navigate = useNavigate()
    const {id, departmentId} = useParams()

    useEffect(() => {
        const getPreconditionsTableList = async () => {
            try {
                const departmentList = await fetchDepartmentList(id)
                setDepartments(departmentList)

                if (!departmentId) {
                    const currentDepartment = departmentList.find((d) => d.isActive)
                    await navigate(
                        `/rrpk/spacing-vessels/spacing/${id}/preconditions/${currentDepartment.id}`
                    )
                }

                setIsDepartmentsFetching(false)
            } catch (e) {
                console.log(e)
            }
        }

        getPreconditionsTableList()
    }, [setIsDepartmentsFetching])

    const fetchDepartmentList = async (spacingId) => {
        const response = await spacingDetailApi.fetchDepartmentList(spacingId)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    const onChangeDepartment = async (curDepartmentId) => {
        if (curDepartmentId === departmentId) return
        await navigate(`/rrpk/spacing-vessels/spacing/${id}/preconditions/${curDepartmentId}`)
    }

    const departmentTabs = departments?.map((department) => {
        const statusStyle = cn(s.status, {
            [s.done]: department.status.code === 'done',
        })
        const departmentStyle = cn(s.department, {
            [s.active]: department.id === +departmentId,
        })

        return (
            <div
                key={department.id}
                className={departmentStyle}
                onClick={() => onChangeDepartment(department.id)}
            >
                <div className={s.title}>{department.title}</div>
                <div className={statusStyle}>{department.status.title}</div>
            </div>
        )
    })

    return !isDepartmentsFetching && <div className={s.wrapper}>{departmentTabs}</div>
}

export {DepartmentsTabs}
