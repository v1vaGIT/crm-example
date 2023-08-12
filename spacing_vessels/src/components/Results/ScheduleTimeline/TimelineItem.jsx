import React from 'react'
import {useHoverTooltip} from '../../../hooks/useHoverTooltip'

const TimelineItem = ({item, getItemProps, startDate, endDate, titleStyle, descriptionStyle, isOnMyWay}) => {
    const [tooltip, openTooltip, closeTooltip] = useHoverTooltip()

    return (
        <div {...getItemProps()} onMouseEnter={openTooltip} onMouseLeave={closeTooltip}>
            {tooltip?.show &&
                <div
                    className={`rct-item__item-popup-info ${item.fromLastColumn || ''}`}
                    style={{top: tooltip.coords.y + 'px', left: tooltip.coords.x + 'px'}}
                >
                    <div className={'item-popup-info__title'} data-id={item.id}>
                        {isOnMyWay ? 'В пути' : item.title}
                    </div>
                    {!item.isTransition && !item.isPort && (
                        <div className={'item-popup-info__additional-info'}>
                            <div>Суточная норма: {item.dayNorm + ' тн'}</div>
                            <div>Итого за период: {item.totalNorm.toLocaleString() + ' тн'}</div>
                        </div>
                    )}
                    <div className={'item-popup-info__date-info'}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.55556 15.5C2.12778 15.5 1.76145 15.353 1.45656 15.059C1.15167 14.765 0.999483 14.412 1 14V3.5C1 3.0875 1.15245 2.73425 1.45733 2.44025C1.76222 2.14625 2.1283 1.9995 2.55556 2H3.33333V1.23125C3.33333 1.01875 3.408 0.84375 3.55733 0.70625C3.70667 0.56875 3.89126 0.5 4.11111 0.5C4.33148 0.5 4.51633 0.572 4.66567 0.716C4.815 0.86 4.88941 1.038 4.88889 1.25V2H11.1111V1.23125C11.1111 1.01875 11.1858 0.84375 11.3351 0.70625C11.4844 0.56875 11.669 0.5 11.8889 0.5C12.1093 0.5 12.2941 0.572 12.4434 0.716C12.5928 0.86 12.6672 1.038 12.6667 1.25V2H13.4444C13.8722 2 14.2386 2.147 14.5434 2.441C14.8483 2.735 15.0005 3.088 15 3.5V14C15 14.4125 14.8476 14.7657 14.5427 15.0597C14.2378 15.3537 13.8717 15.5005 13.4444 15.5H2.55556ZM2.55556 14H13.4444V6.5H2.55556V14ZM2.55556 5H13.4444V3.5H2.55556V5Z"
                                fill="#9E9E9E"
                            />
                        </svg>
                        &nbsp;{startDate}&nbsp;—&nbsp;{endDate}
                    </div>
                </div>
            }
            <div className={'rct-item-content'}>
                <div className={titleStyle}>
                    {item.isPort || item.isTransition
                        ? item.title
                        : item.title + ' ' + item.dayNorm + ' тн/c'}
                </div>
                <div className={descriptionStyle}>
                    {item.totalNorm.toLocaleString() + ' тн'}
                </div>
            </div>
        </div>
    )
}

export {TimelineItem}
