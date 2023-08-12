import React, {useState} from 'react'

import {Outlet} from 'react-router'
import {SpacingHeader} from '../../SpacingHeader/SpacingHeader'

function SpacingLayout() {
    const [isShowPageData, setIsShowPageData] = useState(false)
    const [modelStatus, setModelStatus] = useState(null)

    return (
        <>
            <SpacingHeader
                showPageData={() => setIsShowPageData(true)}
                modelStatus={modelStatus}
                setModelStatus={setModelStatus}
            />
            {isShowPageData && <Outlet context={[modelStatus, setModelStatus]} />}
        </>
    )
}

export {SpacingLayout}
