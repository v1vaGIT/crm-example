import React from 'react'

import * as s from './style.module.scss'

import {ChangeableResultTable} from '../../../components/resultTables/ChangeableResultTable/ChangeableResultTable'

const ResultsOptimization = () => {
    const optimizationTable = {
        code: 'optimize-economic-results',
        title: 'СОК, $ за tn',
    }

    return (
        <>
            <div className={s.tablesWrapper}>
                <ChangeableResultTable table={optimizationTable} />
            </div>
        </>
    )
}

export {ResultsOptimization}
