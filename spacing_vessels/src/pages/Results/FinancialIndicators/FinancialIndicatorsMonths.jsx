import React from 'react'
import {useOutletContext} from 'react-router-dom'

import * as s from './style.module.scss'

import {ResultTable} from '../../../components/ResultTable/ResultTable'

const FinancialIndicatorsMonths = () => {
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
                firstOpened={true}
            />
        </div>
    )
}

export {FinancialIndicatorsMonths}
