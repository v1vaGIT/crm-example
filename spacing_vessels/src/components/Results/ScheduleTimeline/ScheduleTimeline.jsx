import React, {useCallback, useEffect, useMemo, useState} from 'react'
import moment from 'moment' //библиотека для работы с временными промежутками
import Timeline, {TimelineHeaders, DateHeader, SidebarHeader} from 'react-calendar-timeline' //библиотека календаря
import 'moment/locale/ru' //локализация времени
import 'react-calendar-timeline/lib/Timeline.css' //библиотека календаря
import './scheduleTimeline.css'
import {TimelineItem} from './TimelineItem' //стили для план-графика

const ScheduleTimeline = ({shipsSchedule}) => {
    moment.locale('ru') //переводим даты на русский язык

    const [minZoom, maxZoom, defaultStartTime, defaultEndTime, keys] = useMemo(() => {
        const minZoom = 60 * 60 * 1000 * 24 * 27 //максимально приближение = 1 месяц
        const maxZoom = 365.24 * 86400 * 1000 //максимальное отдаление = 1 год
        const defaultStartTime = +new Date(moment().startOf('month').toDate()) //стартовый экран план-графика 1 день текущего месяца
        const defaultEndTime = +new Date(moment().startOf('month').add(1, 'month').toDate()) //стартовый экран последний день текущего месяца
        const keys = {
            groupIdKey: 'id',
            groupTitleKey: 'title',
            itemIdKey: 'id',
            itemGroupKey: 'group',
            itemTimeStartKey: 'start_time',
            itemTimeEndKey: 'end_time',
        } //параметры для корректной работы Item'ов

        return [minZoom, maxZoom, defaultStartTime, defaultEndTime, keys]
    }, [])

    //смена временного интервала
    const [startTime, setStartTime] = useState(defaultStartTime)
    const [endTime, setEndTime] = useState(defaultEndTime)
    const [timeInterval, setTimeInterval] = useState('По дням') //текст формата даты на кастомной кнопке

    //отображение формата даты на кастомной кнопке
    useEffect(() => {
        const checkTimeInterval = (endTime, startTime) => {
            const zoom = endTime - startTime
            const monthInterval = 2678400000 //31 день

            if (zoom > monthInterval) {
                setTimeInterval('По месяцам')
            } else {
                setTimeInterval('По дням')
            }
        }

        checkTimeInterval(endTime, startTime)
    }, [endTime, startTime])

    //формируем маршруты кораблей для план-графика
    const preparedTransition = useMemo(() => {
        const prepareItemData = (item) => {
            const lastColumn = +shipsSchedule.vessels.at(-1).id //Находим последний корабль в списке для смены стилей всплывающего окна

            item['start_time'] = item.startTime * 1000
            item['end_time'] = item.endTime * 1000

            if (item.locationCode) item['className'] = item.locationCode
            if (item.isTransition) item['className'] = 'WAY'
            if (item.group === lastColumn) item['fromLastColumn'] = 'item__from-last-col'

            return item
        }

        return shipsSchedule.transitions.map((item) => prepareItemData(item))
    }, [shipsSchedule.transitions])

    const itemRenderer = useCallback(({item, getItemProps}) => {
        let titleStyle = 'ship-route__title'
        let descriptionStyle = 'ship-route__description'
        let isOnMyWay = false

        const startDate = new Date(item.start_time).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
        })
        const endDate = new Date(item.end_time).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
        })

        if (item.isPort) {
            titleStyle = 'ship-route__title-port'
            descriptionStyle = 'ship-route__description-hide'
        }

        if (item.isTransition) {
            titleStyle = 'ship-route__title-on-my-way'
            descriptionStyle = 'ship-route__description-hide'
            isOnMyWay = true
        }

        return (
            <TimelineItem
                getItemProps={getItemProps}
                item={item}
                startDate={startDate}
                endDate={endDate}
                titleStyle={titleStyle}
                descriptionStyle={descriptionStyle}
                isOnMyWay={isOnMyWay}
            />
        )
    }, [])

    const customTimeChange = useCallback((timeInterval) => {
        let startInterval
        let endInterval

        switch (timeInterval) {
            case 'По дням':
                startInterval = +new Date(moment().startOf('year').toDate())
                endInterval = +new Date(moment().startOf('year').add(1, 'year').toDate())
                handleTimeChange(startInterval, endInterval)
                setTimeInterval('По месяцам')
                break
            case 'По месяцам':
                startInterval = +new Date(moment().startOf('month').toDate())
                endInterval = +new Date(moment().startOf('month').add(1, 'month').toDate())
                handleTimeChange(startInterval, endInterval)
                setTimeInterval('По дням')
                break
            default:
                console.log('что-то пошло не так!')
                break
        }
    }, [])

    const handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
        setStartTime(visibleTimeStart)
        setEndTime(visibleTimeEnd)
    }

    //Формирование план-графика
    return (
        <div className={'schedule-timeline__graph-container'}>
            <Timeline
                groups={shipsSchedule.vessels}
                items={preparedTransition}
                keys={keys}
                visibleTimeStart={startTime}
                visibleTimeEnd={endTime}
                minZoom={minZoom}
                maxZoom={maxZoom}
                lineHeight={60}
                itemHeightRatio={0.87}
                itemRenderer={itemRenderer}
                canMove={false}
                canResize={false}
                canChangeGroup={false}
                onTimeChange={handleTimeChange}
            >
                <TimelineHeaders>
                    <SidebarHeader>
                        {() => (
                            <div onClick={() => customTimeChange(timeInterval)} className={`leftSidebar__date-info`}>
                                <div className={'leftSidebar__timeline-info'}>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 2.66667V1.33334M10 2.66667V4M10 2.66667H7M2 6.66667V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V6.66667M2 6.66667H14M2 6.66667V4C2 3.64638 2.14048 3.30724 2.39052 3.05719C2.64057 2.80714 2.97971 2.66667 3.33333 2.66667H4.66667M14 6.66667V4C14 3.64638 13.8595 3.30724 13.6095 3.05719C13.3594 2.80714 13.0203 2.66667 12.6667 2.66667H12.3333M4.66667 1.33334V4"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    &nbsp;
                                    {timeInterval}
                                </div>
                            </div>
                        )}
                    </SidebarHeader>
                    <DateHeader
                        height={52}
                        headerData={{someData: 'data'}}
                        unit={'primaryHeader'}
                    />
                    <DateHeader/>
                </TimelineHeaders>
            </Timeline>
        </div>
    )
}

export {ScheduleTimeline}
