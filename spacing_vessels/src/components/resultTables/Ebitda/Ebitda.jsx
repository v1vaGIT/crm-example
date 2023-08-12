import React from 'react'
import * as s from './style.module.scss'

const Ebitda = ({table}) => {
    return (
        <div className={s.catchOptimization}>
            <div className={s.row}>
                <div>Зона</div>
                <div>EBITDA, $</div>
                <div>СОК, $</div>
                <div>Итого</div>
                <div>СОК/за tn</div>
            </div>

            {table.zones.map((row) => (
                <div key={row.name} className={s.row}>
                    <div>{row.name}</div>
                    <div>{row.ebitda.toLocaleString('ru')}</div>
                    <div>{row.sokDollars.toLocaleString('ru')}</div>
                    <div>{row.total.toLocaleString('ru')}</div>
                    <div>{row.sokTonnes.toLocaleString('ru')}</div>
                </div>
            ))}

            <div className={s.row}>
                <div>PORT</div>
                <div>{table.seaports.ebitda.toLocaleString('ru')}</div>
                <div>{table.seaports.sokDollars.toLocaleString('ru')}</div>
                <div>{table.seaports.total.toLocaleString('ru')}</div>
                <div>{table.seaports.sokTonnes.toLocaleString('ru')}</div>
            </div>

            <div className={s.row}>
                <div>TRANS</div>
                <div>{table.transitions.ebitda.toLocaleString('ru')}</div>
                <div>{table.transitions.sokDollars.toLocaleString('ru')}</div>
                <div>{table.transitions.total.toLocaleString('ru')}</div>
                <div>{table.transitions.sokTonnes.toLocaleString('ru')}</div>
            </div>

            <div className={s.row}>
                <div>Итого</div>
                <div>{table.total.ebitda.toLocaleString('ru')}</div>
                <div>{table.total.sokDollars.toLocaleString('ru')}</div>
                <div>{table.total.total.toLocaleString('ru')}</div>
                <div>{table.total.sokTonnes.toLocaleString('ru')}</div>
            </div>
        </div>
    )
}

export {Ebitda}
