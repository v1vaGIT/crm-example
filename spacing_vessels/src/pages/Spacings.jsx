import React, {useEffect, useState} from 'react'

import {Preloader} from '../components/Preloader/Preloader'
import {SpacingTable} from '../components/SpacingTable/SpacingTable'
import {spacingsApi} from '../api/spacingsApi'

const Spacings = () => {
    const [yearNameList, setYearNameList] = useState(null)
    const [currentYearName, setCurrentYearName] = useState(null)
    const [currentYearSpacings, setCurrentYearSpacings] = useState(null)

    useEffect(() => {
        const setSpacingsData = async () => {
            try {
                let years = await getYearNameList()

                const currentYear = new Date().getFullYear()
                if (years.length === 0 || !years.includes(currentYear)) {
                    years.push(currentYear)
                    years.sort()
                }

                setYearNameList(years)
                setCurrentYearName(currentYear)

                const yearSpacings = await getYearSpacings(currentYear)
                setCurrentYearSpacings(yearSpacings)
            } catch (e) {
                console.log(e)
            }
        }

        setSpacingsData()
    }, [setYearNameList])

    const getYearNameList = async () => {
        const response = await spacingsApi.getYearNameList()

        if (response.status === 200) {
            return response.data.years
        }

        throw response
    }

    const getYearSpacings = async (yearName) => {
        const response = await spacingsApi.getYearSpacings(yearName)

        if (response.status === 200) {
            return response.data
        }

        throw response
    }

    const changeYear = async (yearName) => {
        if (yearName === currentYearName) return

        const yearSpacings = await getYearSpacings(yearName)
        setCurrentYearSpacings(yearSpacings)
        setCurrentYearName(yearName)
    }

    return currentYearSpacings ? (
        <SpacingTable
            year={currentYearSpacings}
            yearNameList={yearNameList}
            currentYearName={currentYearName}
            onSetCurrentYear={changeYear}
        />
    ) : (
        <Preloader />
    )
}

export {Spacings}
