import React, {useState} from 'react'

import * as s from './style.module.scss'

import {PlanNameButton} from '../../PlanNameButton/PlanNameButton'
import {TableCell} from '../TableCell/TableCell'
import {preparingSpacingsData} from '../../../utils/preparingSpacingsData'

const TableRow = ({
    plan,
    selectedPlanId,
    changePlan,
    setCodeForNewSpacing,
    setDataForCopySpacing,
}) => {
    const currentPlan = preparingSpacingsData(plan, selectedPlanId)
    const [isOpenedAllTrees, setIsOpenedAllTrees] = useState(true)

    const togglePlanTrees = () => {
        setIsOpenedAllTrees(!isOpenedAllTrees)
    }

    return (
        <tr>
            <td className={s.planNameWrap}>
                <PlanNameButton
                    planId={currentPlan.code}
                    planTitle={currentPlan.title}
                    isSelectedPlan={selectedPlanId === currentPlan.code}
                    changePlan={changePlan}
                    togglePlanTrees={togglePlanTrees}
                    setCodeForNewSpacing={setCodeForNewSpacing}
                />
                {currentPlan.isEmpty && (
                    <div
                        className={s.addBtn}
                        onClick={() => setCodeForNewSpacing(currentPlan.code)}
                    />
                )}
            </td>

            {currentPlan.months.map((month) => (
                <TableCell
                    key={month.monthNumber}
                    month={month}
                    isSelectedPlan={selectedPlanId === currentPlan.code && isOpenedAllTrees}
                    setDataForCopySpacing={setDataForCopySpacing}
                />
            ))}
        </tr>
    )
}

export {TableRow}
