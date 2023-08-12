import React from 'react'
import {useNavigate} from 'react-router'
import cn from 'classnames'

import * as s from './style.module.scss'

import {useContextMenu} from '../../../hooks/useContextMenu'
import {ContextMenu} from '../../ContextMenu/ContextMenu'

const SpacingTreeNode = ({node, setDataForCopySpacing}) => {
    const navigate = useNavigate()

    const openCopyModal = (e) => {
        e.stopPropagation()
        setDataForCopySpacing({
            date: node.date,
            year: node.year,
            planType: node.planType,
            id: node.id,
        })
    }

    const nodeStyle = cn(s.node, {
        [s.nodeApproved]: node?.status === 'approved',
        [s.nodeRejected]: node?.status === 'rejected',
    })

    const [contextMenu, openContextMenu, closeContextMenu] = useContextMenu([
        {id: 1, text: ['Копировать расстановку'], handler: openCopyModal},
    ])

    const navigateToSpacingDetail = () => {
        const currentDisplay = node.isCalculated ? 'result' : 'preconditions'
        navigate(`/rrpk/spacing-vessels/spacing/${node.id}/${currentDisplay}`)
    }

    return (
        <div className={s.spacing}>
            <div
                className={nodeStyle}
                onClick={navigateToSpacingDetail}
                onContextMenu={openContextMenu}
            >
                {node.version}
            </div>
            <ul className={s.nodeHoverList}>
                <li>
                    <span>Коментарий</span>
                    <span>{node.comment || '—'}</span>
                </li>
                <li>
                    <span>Общий улов</span>
                    <span>{node.data?.total?.catch.toLocaleString() || 0}</span>
                </li>
                <li>
                    <span>Общий фин.рез. модели</span>
                    <span>{node.data?.total?.financialResult.toLocaleString() || 0}</span>
                </li>
            </ul>

            {contextMenu.show && (
                <ContextMenu contextMenu={contextMenu} closeContextMenu={closeContextMenu} />
            )}
        </div>
    )
}

export {SpacingTreeNode}
