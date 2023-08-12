import React, {useState} from 'react'
import * as s from './style.module.scss'
import {monthListEng} from '../../../assets/helperArrays/helperArrays'
import {ExpandedRow} from './ExpandedRow'

const DoubleExpandedRow = ({row}) => {
    const [isShowChildren, setIsShowChildren] = useState(false)

    return (
        <>
            <tr>
                <td className={s.firstItem} onClick={() => setIsShowChildren(!isShowChildren)}>
                    {row.vessel.name}
                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M3.64197 5.69672L8.00248 10.0572L12.3629 5.69672C12.6233 5.43638 13.0454 5.43638 13.3057 5.69672C13.5661 5.95708 13.5661 6.37919 13.3057 6.63953L8.47388 11.4714C8.34881 11.5965 8.17928 11.6667 8.00248 11.6667C7.82568 11.6667 7.65608 11.5965 7.53108 11.4714L2.69917 6.63953C2.66662 6.60699 2.63815 6.57192 2.61374 6.53495C2.44289 6.27619 2.47136 5.92453 2.69917 5.69672C2.95951 5.43638 3.38163 5.43638 3.64197 5.69672Z'
                            fill='#333340'
                        />
                    </svg>
                </td>
                {monthListEng.map((month) => (
                    <td key={month}>{row.months[month].toLocaleString('ru')}</td>
                ))}
                <td>{row.total.toLocaleString('ru')}</td>
            </tr>

            {isShowChildren &&
                row.productGroups.map((item) => (
                    <ExpandedRow key={item.productGroup.id} row={item} />
                ))}
        </>
    )
}

export {DoubleExpandedRow}
