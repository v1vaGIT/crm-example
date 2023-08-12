import React from 'react'
import {Outlet} from 'react-router'

import {ResultsHeader} from '../../Results/ResultsHeader/ResultsHeader'
import {useOutletContext} from 'react-router-dom'

function ResultsLayout() {
    const tabs = [
        {
            id: 0,
            title: 'План график',
            path: 'schedule',
        },
        {
            id: 1,
            title: 'Вылов',
            path: 'catch',
        },
        {
            id: 2,
            title: 'Выпуск',
            path: 'output',
        },
        {
            id: 3,
            title: 'Финансовые показатели',
            path: 'financial-indicators',
        },
        {
            id: 4,
            title: 'Оптимизация Экономических результатов',
            path: 'results-optimization',
        },
    ]
    const [modelStatus] = useOutletContext()

    return (
        <>
            <ResultsHeader tabs={tabs} />
            <Outlet context={[modelStatus]} />
        </>
    )
}

export {ResultsLayout}
