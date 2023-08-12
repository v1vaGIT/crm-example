import React from 'react'
import {v4 as uuidv4} from 'uuid'
import * as s from './style.module.scss'
import {SpacingTree} from '../SpacingTree/SpacingTree'

const TableCell = ({month, isSelectedPlan, setDataForCopySpacing}) => {
    return (
        <td>
            <div className={s.datesWrap}>
                {month.dates.map((date) => (
                    <SpacingTree
                        key={uuidv4()}
                        currentTree={date}
                        showTree={isSelectedPlan}
                        setDataForCopySpacing={setDataForCopySpacing}
                    />
                ))}
            </div>
        </td>
    )
}

export {TableCell}
