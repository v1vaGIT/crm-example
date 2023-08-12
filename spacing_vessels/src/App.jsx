import React, {useEffect, useState} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

import {SpacingLayout} from './components/layouts/SpacingLayout/SpacingLayout'
import {ResultsLayout} from './components/layouts/ResultsLayout/ResultsLayout'
import {FinancialIndicatorsLayout} from './components/layouts/FinancialIndicatorsLayout/FinancialIndicatorsLayout'

import {Spacings} from './pages/Spacings'
import {Preloader} from './components/Preloader/Preloader'
import {Preconditions} from './pages/Preconditions'
import {Schedule} from './pages/Results/Schedule/Schedule'
import {Catch} from './pages/Results/Catch/Catch'
import {Output} from './pages/Results/Output/Output'
import {ResultsOptimization} from './pages/Results/ResultsOptimization/ResultsOptimization'
import {FinancialIndicatorsAll} from './pages/Results/FinancialIndicators/FinancialIndicatorsAll'
import {FinancialIndicatorsMonths} from './pages/Results/FinancialIndicators/FinancialIndicatorsMonths'
import {FinancialIndicatorsZones} from './pages/Results/FinancialIndicators/FinancialIndicatorsZones'
import {FinancialIndicatorsVessels} from './pages/Results/FinancialIndicators/FinancialIndicatorsVessels'
import {FinancialIndicatorsEbitda} from './pages/Results/FinancialIndicators/FinancialIndicatorsEbitda'
import {appApi} from './api/appApi'

const App = () => {
    const [appParams, setAppParams] = useState(null)

    const getAppParams = async () => {
        const response = await appApi.getAppParams()

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    const authorize = async () => {
        try {
            const appParams = await getAppParams()
            await setAppParams(appParams)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        authorize()
    }, [setAppParams])

    return (
        <>
            <ToastContainer position={'bottom-left'} autoClose={3000} pauseOnFocusLoss={false} />
            <div className={'app-wrapper'}>
                {!appParams ? (
                    <Preloader />
                ) : (
                    <Routes>
                        <Route path={'/rrpk/spacing-vessels/'} element={<Spacings />} />
                        <Route path={'/rrpk/spacing-vessels/spacing/:id/'} element={<SpacingLayout />}>
                            <Route path={'preconditions/:departmentId'} element={<Preconditions />}/>
                            <Route path={'preconditions/'} element={<Preconditions />} />
                            <Route path={'result/'} element={<ResultsLayout />}>
                                <Route path={'schedule/'} element={<Schedule />} />
                                <Route path={'catch/'} element={<Catch />} />
                                <Route path={'output/'} element={<Output />} />
                                <Route path={'financial-indicators/'} element={<FinancialIndicatorsLayout />}>
                                    <Route path={'all/'} element={<FinancialIndicatorsAll />} />
                                    <Route path={'months/'} element={<FinancialIndicatorsMonths />}/>
                                    <Route path={'vessels/'} element={<FinancialIndicatorsVessels />}/>
                                    <Route path={'ebitda/'} element={<FinancialIndicatorsEbitda />}/>
                                    <Route path={'zones/'} element={<FinancialIndicatorsZones />} />
                                    <Route path={''} element={<Navigate to={'all'} replace />} />
                                </Route>
                                <Route path={'results-optimization/'} element={<ResultsOptimization />}/>
                                <Route path={''} element={<Navigate to={'schedule'} replace />} />
                            </Route>
                        </Route>
                    </Routes>
                )}
            </div>
        </>
    )
}

export {App}
