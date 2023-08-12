import React, {useState} from 'react'

import * as s from './style.module.scss'

import {SpacingTreeNode} from '../SpacingTreeNode/SpacingTreeNode'

const SpacingTree = ({currentTree, showTree, setDataForCopySpacing}) => {
    const [isShowTree, setIsShowTree] = useState(showTree)

    const toggleTree = () => {
        setIsShowTree(!isShowTree)
    }

    const drawSpacing = (spacing) => (
        <div key={spacing.id} className={s.spacings}>
            <SpacingTreeNode node={spacing} setDataForCopySpacing={setDataForCopySpacing} />

            {spacing.children.length !== 0 && (
                <div className={s.children}>
                    {spacing.children.map((child) => drawSpacing(child))}
                </div>
            )}
        </div>
    )

    return (
        <div key={currentTree.date} className={s.date}>
            <div className={s.nodeDate} onClick={toggleTree}>
                <div className={s.nodeDateValue}>{currentTree.date}</div>
            </div>

            {isShowTree && (
                <div className={s.spacingsWrap}>
                    {currentTree.children.map((spacing) => drawSpacing(spacing))}
                </div>
            )}
        </div>
    )
}

export {SpacingTree}
