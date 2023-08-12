import React from 'react'
import * as s from './style.module.scss'
import {monthListRu} from '../../../assets/helperArrays/helperArrays'
import {DoubleExpandedRow} from './DoubleExpandedRow'

const OutputWithFilter = ({table}) => {
    return (
        <div className={s.tableWrap}>
            <table className={s.outputWithFilter}>
                <thead>
                    <tr>
                        <td rowSpan={2}>Суда</td>
                        <td colSpan={12}>Месяца</td>
                        <td rowSpan={2}>Итого</td>
                    </tr>
                    <tr>
                        {monthListRu.map((month) => (
                            <td key={month}>{month}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.map((row) => (
                        <DoubleExpandedRow key={row.vessel.id} row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export {OutputWithFilter}
