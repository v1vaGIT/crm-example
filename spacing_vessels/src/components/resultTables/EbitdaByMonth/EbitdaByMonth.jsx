import React from 'react'
import * as s from './style.module.scss'
import {monthListEng, monthListRu} from '../../../assets/helperArrays/helperArrays'

const EbitdaByMonth = ({table}) => {
    return (
        <div className={s.ebitdaByMonth}>
            <div className={s.row}>
                <div>Зона</div>
                {monthListRu.map((month) => (
                    <div key={month}>{month}</div>
                ))}
                <div>Всего</div>
            </div>

            {table.zones.map((row) => (
                <div key={row.code} className={s.row}>
                    <div>{row.code}</div>
                    {monthListEng.map((month) => (
                        <div key={month}>{row[month].toLocaleString('ru')}</div>
                    ))}
                    <div>{row.total.toLocaleString('ru')}</div>
                </div>
            ))}

            <div className={s.row}>
                <div>PORT</div>
                {monthListEng.map((month) => (
                    <div key={month}>{table.seaports[month].toLocaleString('ru')}</div>
                ))}
                <div>{table.seaports.total.toLocaleString('ru')}</div>
            </div>

            <div className={s.row}>
                <div>TRANS</div>
                {monthListEng.map((month) => (
                    <div key={month}>{table.transitions[month].toLocaleString('ru')}</div>
                ))}
                <div>{table.transitions.total.toLocaleString('ru')}</div>
            </div>

            <div className={s.row}>
                <div>Итого</div>
                {monthListEng.map((month) => (
                    <div key={month}>{table.total[month].toLocaleString('ru')}</div>
                ))}
                <div>{table.total.total.toLocaleString('ru')}</div>
            </div>
        </div>
    )
}

export {EbitdaByMonth}
