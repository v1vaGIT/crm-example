import React from 'react'
import {useOutletContext} from 'react-router-dom'

import * as s from './style.module.scss'

import {ResultTable} from '../../../components/ResultTable/ResultTable'

const FinancialIndicatorsAll = () => {
    const [zonesSelectedItems, vesselsSelectedItems, monthsSelectedItems] = useOutletContext()

    return (
        <div className={s.tableListWrap}>
            <ResultTable
                tableCodes={['finances-by-months']}
                title={'Месяцы'}
                filterItems={{
                    months: monthsSelectedItems,
                    vessels: vesselsSelectedItems,
                    fishingZones: zonesSelectedItems,
                }}
            />
            <ResultTable
                tableCodes={['finances-by-vessels']}
                title={'Суда'}
                filterItems={{
                    months: monthsSelectedItems,
                    vessels: vesselsSelectedItems,
                    fishingZones: zonesSelectedItems,
                }}
            />
            <ResultTable
                tableCodes={['finances-by-fishing-zones']}
                title={'Зоны'}
                filterItems={{
                    months: monthsSelectedItems,
                    vessels: vesselsSelectedItems,
                    fishingZones: zonesSelectedItems,
                }}
            />
            <ResultTable
                tableCodes={['ebitda-by-month']}
                title={'EBITDA, тыс. $'}
                filterItems={{
                    months: monthsSelectedItems,
                    vessels: vesselsSelectedItems,
                    fishingZones: zonesSelectedItems,
                }}
            />
        </div>
    )
}

export {FinancialIndicatorsAll}
