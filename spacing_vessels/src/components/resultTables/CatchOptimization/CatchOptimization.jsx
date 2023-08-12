import React from 'react'
import * as s from './style.module.scss'

const CatchOptimization = ({table}) => {
    return (
        <div className={s.catchOptimization}>
            <div className={s.row}>
                <div>Зона</div>
                <div>Квота,tn</div>
                <div>Вылов, tn</div>
                <div>Остатки, tn</div>
            </div>

            {table.zones.map((row) => (
                <div key={row.name} className={s.row}>
                    <div>{row.name}</div>
                    <div>{row.quota.toLocaleString('ru')}</div>
                    <div>{row.catchAmount.toLocaleString('ru')}</div>
                    <div>{row.leftovers.toLocaleString('ru')}</div>
                </div>
            ))}

            <div className={s.row}>
                <div>Итого</div>
                <div>{table.total.quota.toLocaleString('ru')}</div>
                <div>{table.total.catchAmount.toLocaleString('ru')}</div>
                <div>{table.total.leftovers.toLocaleString('ru')}</div>
            </div>
        </div>
    )
}

// return (
//     <div className={s.table}>
//         <div>Зона</div>
//         <div>Квота,tn</div>
//         <div>Вылов, tn</div>
//         <div>Остатки, tn</div>
//         {table.zones.map((row) => (
//             <>
//                 <div key={uuidv4()}>{row.name}</div>
//                 <div key={uuidv4()}>{row.quota}</div>
//                 <div key={uuidv4()}>{row.catchAmount}</div>
//                 <div key={uuidv4()}>{row.leftovers}</div>
//             </>
//         ))}
//         <div>Итого</div>
//         <div>{table.total.quota}</div>
//         <div>{table.total.catchAmount}</div>
//         <div>{table.total.leftovers}</div>
//     </div>
// )

export {CatchOptimization}
