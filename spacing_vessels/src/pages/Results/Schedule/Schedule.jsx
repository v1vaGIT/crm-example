import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import * as s from './style.module.scss'

import {Preloader} from '../../../components/Preloader/Preloader'
import {ResultTable} from '../../../components/ResultTable/ResultTable'
import {ScheduleTimeline} from '../../../components/Results/ScheduleTimeline/ScheduleTimeline'
import {resultsApi} from '../../../api/resultsApi'
import {joinScheduleTransitions} from '../../../utils/joinScheduleTransitions'

const Schedule = () => {
    const [shipsSchedule, setShipsSchedule] = useState(null)
    const [dataStatus, setDataStatus] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        getShipsSchedule()
    }, [])

    const getShipsSchedule = async () => {
        try {
            const shipsSchedule = await fetchShipsSchedule(id)
            shipsSchedule.transitions = joinScheduleTransitions(shipsSchedule.transitions)
            setShipsSchedule(shipsSchedule)
        } catch (e) {
            console.log(e)
        }

        setDataStatus(true)
    }

    const fetchShipsSchedule = async (spacingId) => {
        const response = await resultsApi.fetchShipsSchedule(spacingId)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    return (
        <>
            {!dataStatus ? (
                <Preloader />
            ) : !shipsSchedule ? (
                <h2>Модель не рассчитана. Загрузите модель с рассчетом.</h2>
            ) : (
                <>
                    <ScheduleTimeline shipsSchedule={shipsSchedule} />
                    <div className={s.tablesWrapper}>
                        <ResultTable
                            tableCodes={['catch-optimization']}
                            title={'Результат оптимизации по вылову'}
                        />
                        <ResultTable
                            tableCodes={['ebitda', 'ebitda-by-month']}
                            title={'EBITDA'}
                            withExpand={true}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export {Schedule}
