import React from 'react'
import * as s from './style.module.scss'

const FinancesByMonths = ({table}) => {
    return (
        <div className={s.tableWrap}>
            <table className={s.finances}>
                <thead>
                    <tr>
                        <td>Месяц</td>
                        <td>Выручка</td>
                        <td>Фрахт</td>
                        <td>Коммерческие, за тн</td>
                        <td>Топливо, за тн</td>
                        <td>Зарплата</td>
                        <td>Тара,за тн</td>
                        <td>Питание за тн</td>
                        <td>Промвооружение, за тн</td>
                        <td>Снабжение</td>
                        <td>ВБР</td>
                        <td>TRANS</td>
                        <td>PORT</td>
                        <td>Всего</td>
                    </tr>
                </thead>

                <tbody>
                    {table?.month?.map((row) => (
                        <tr key={row.month}>
                            <td>{row.month}</td>
                            <td>{row.revenue.toLocaleString('ru')}</td>
                            <td>{row.freightCosts.toLocaleString('ru')}</td>
                            <td>{row.commercialExpenses.toLocaleString('ru')}</td>
                            <td>{row.fuelConsumption.toLocaleString('ru')}</td>
                            <td>{row.salary.toLocaleString('ru')}</td>
                            <td>{row.packaging.toLocaleString('ru')}</td>
                            <td>{row.foodAndProvision.toLocaleString('ru')}</td>
                            <td>{row.fishingEquipment.toLocaleString('ru')}</td>
                            <td>{row.rawMaterialAndSupplies.toLocaleString('ru')}</td>
                            <td>{row.waterResourceTax.toLocaleString('ru')}</td>
                            <td>{row.transitions.toLocaleString('ru')}</td>
                            <td>{row.ports.toLocaleString('ru')}</td>
                            <td>{row.total.toLocaleString('ru')}</td>
                        </tr>
                    ))}

                    <tr>
                        <td>Итого</td>
                        <td>{table?.total?.revenue.toLocaleString('ru')}</td>
                        <td>{table?.total?.freightCosts.toLocaleString('ru')}</td>
                        <td>{table?.total?.commercialExpenses.toLocaleString('ru')}</td>
                        <td>{table?.total?.fuelConsumption.toLocaleString('ru')}</td>
                        <td>{table?.total?.salary.toLocaleString('ru')}</td>
                        <td>{table?.total?.packaging.toLocaleString('ru')}</td>
                        <td>{table?.total?.foodAndProvision.toLocaleString('ru')}</td>
                        <td>{table?.total?.fishingEquipment.toLocaleString('ru')}</td>
                        <td>{table?.total?.rawMaterialAndSupplies.toLocaleString('ru')}</td>
                        <td>{table?.total?.waterResourceTax.toLocaleString('ru')}</td>
                        <td>{table?.total?.transitions.toLocaleString('ru')}</td>
                        <td>{table?.total?.ports.toLocaleString('ru')}</td>
                        <td>{table?.total?.total.toLocaleString('ru')}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export {FinancesByMonths}
