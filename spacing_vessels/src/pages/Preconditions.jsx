import React, {useState} from 'react'

import {PreconditionsTableList} from '../components/PreconditionsTableList/PreconditionsTableList'
import {DepartmentsTabs} from '../components/DepartmentsTabs/DepartmentsTabs'

const Preconditions = () => {
    const [departments, setDepartments] = useState(null)

    return (
        <>
            <DepartmentsTabs departments={departments} setDepartments={setDepartments} />
            <PreconditionsTableList setDepartments={setDepartments} />
        </>
    )
}

export {Preconditions}
