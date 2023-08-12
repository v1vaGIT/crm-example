import React from 'react'
import {useOutletContext} from 'react-router-dom'

import * as s from './style.module.scss'

import {ResultTable} from '../../../components/ResultTable/ResultTable'

const FinancialIndicatorsEbitda = () => {
    const [zonesSelectedItems, vesselsSelectedItems, monthsSelectedItems] = useOutletContext()

    return (
        <div className={s.tableListWrap}>
            <ResultTable
                tableCodes={['ebitda-by-month']}
                title={'EBITDA, тыс. $'}
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

export {FinancialIndicatorsEbitda}
