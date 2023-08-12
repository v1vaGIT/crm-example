import React from 'react'
import cn from 'classnames'
import s from './style.module.scss'

const DownloadModalStep = ({step, currentStepName}) => {
    const stepWrapStyle = cn(s.stepWrap, {
        [s.success]: step.status === 'success',
        [s.error]: step.status === 'error',
        [s.current]: step.name === currentStepName,
    })

    const renderIcons = (status) => {
        switch (status) {
            case 'success':
                return (
                    <svg
                        width='16'
                        height='17'
                        viewBox='0 0 16 17'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <rect y='0.5' width='16' height='16' rx='8' fill='#3CBB41' />
                        <path
                            d='M11.9111 6.35827C12.0486 6.14416 12.0267 5.85253 11.8447 5.66308C11.6368 5.44657 11.2987 5.44551 11.0896 5.66071L6.70853 10.1681L4.91035 8.31894C4.70113 8.10377 4.36302 8.10492 4.15517 8.32151C4.05508 8.42578 4.00345 8.561 4.00017 8.69719C3.99994 8.70683 3.99994 8.71647 4.0002 8.72611C4.00379 8.86315 4.0563 8.99899 4.15764 9.10317L6.33227 11.3394C6.54056 11.5536 6.87684 11.5535 7.08507 11.3393L11.8424 6.44477C11.8686 6.41787 11.8915 6.38886 11.9111 6.35827Z'
                            fill='white'
                        />
                    </svg>
                )
            case 'error':
                return (
                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <rect width='16' height='16' rx='8' fill='#EA5656' />
                        <path
                            d='M10.1392 5.14768C10.3362 4.95077 10.6554 4.95077 10.8523 5.14768C11.0492 5.34459 11.0492 5.66385 10.8523 5.86076L8.71309 7.99998L10.8523 10.1392C11.0492 10.3361 11.0492 10.6554 10.8523 10.8523C10.6554 11.0492 10.3362 11.0492 10.1392 10.8523L7.99999 8.71307L5.86077 10.8523C5.66385 11.0492 5.3446 11.0492 5.14769 10.8523C4.95077 10.6554 4.95077 10.3361 5.14769 10.1392L7.2869 7.99998L5.14769 5.86078C4.95078 5.66386 4.95078 5.34461 5.14769 5.1477C5.3446 4.95079 5.66385 4.95079 5.86077 5.1477L7.99999 7.28693L10.1392 5.14768Z'
                            fill='white'
                        />
                    </svg>
                )
            default:
                return (
                    <svg
                        width='16'
                        height='17'
                        viewBox='0 0 16 17'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <rect y='0.5' width='16' height='16' rx='8' fill='#888888' />
                        <path
                            d='M8.00195 6.7C7.72579 6.7 7.50195 6.92386 7.50195 7.2V8.5C7.50195 8.67864 7.59723 8.84368 7.75195 8.933L9.05099 9.683C9.29015 9.82108 9.59595 9.73916 9.73399 9.5C9.87207 9.26084 9.79015 8.95504 9.55099 8.817L8.50195 8.21132V7.2C8.50195 6.92386 8.27811 6.7 8.00195 6.7Z'
                            fill='white'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M8 12.5C10.2091 12.5 12 10.7091 12 8.5C12 6.29086 10.2091 4.5 8 4.5C5.79086 4.5 4 6.29086 4 8.5C4 10.7091 5.79086 12.5 8 12.5ZM8 11.5C9.65684 11.5 11 10.1568 11 8.5C11 6.84315 9.65684 5.5 8 5.5C6.34315 5.5 5 6.84315 5 8.5C5 10.1568 6.34315 11.5 8 11.5Z'
                            fill='white'
                        />
                    </svg>
                )
        }
    }

    return (
        <div className={stepWrapStyle}>
            {renderIcons(step.status)}
            <div>
                <p className={s.stepName}>{step.name}</p>
                {step.error && <p className={s.errorMessage}>{step.error}</p>}
            </div>
        </div>
    )
}

export {DownloadModalStep}
