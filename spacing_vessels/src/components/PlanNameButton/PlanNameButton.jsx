import React from 'react'
import cn from 'classnames'

import * as s from './style.module.scss'

import {useContextMenu} from '../../hooks/useContextMenu'
import {ContextMenu} from '../ContextMenu/ContextMenu'

const PlanNameButton = ({
    isSelectedPlan,
    planTitle,
    planId,
    changePlan,
    togglePlanTrees,
    setCodeForNewSpacing,
}) => {
    const openNewModal = (e) => {
        e.stopPropagation()
        setCodeForNewSpacing(planId)
    }

    const onChangePlan = () => {
        if (isSelectedPlan) return
        changePlan(planId)
    }

    const planNameStyle = cn(s.planName, {[s.planNameActive]: isSelectedPlan})

    const [contextMenu, openContextMenu, closeContextMenu] = useContextMenu([
        {id: 1, text: ['Создать расстановку'], handler: openNewModal},
    ])

    return (
        <div className={s.planNameWrap}>
            <div
                className={planNameStyle}
                onClick={isSelectedPlan ? togglePlanTrees : onChangePlan}
                onContextMenu={openContextMenu}
            >
                <div className={s.planNameValue}>{planTitle}</div>
            </div>

            {contextMenu.show && (
                <ContextMenu contextMenu={contextMenu} closeContextMenu={closeContextMenu} />
            )}
        </div>
    )
}

export {PlanNameButton}
