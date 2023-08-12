import React from 'react'
import {CheckboxRow} from './CheckboxRow'
import * as s from './style.module.scss'

const CheckboxGroup = ({group, selectedCodes, addCodes, removeCodes, withDisabled, disabledItems = null}) => {
    const onClickGroup = (checked) => {
        const groupCodes = group.items.map((item) => item.code)

        if (checked) {
            addCodes(groupCodes)
            return
        }

        removeCodes(groupCodes)
    }

    const onClickInput = (checked, code) => {
        if (checked) {
            addCodes([code])
            return
        }

        removeCodes([code])
    }

    return (
        <div>
            <CheckboxRow
                title={group.title}
                selected={
                    group.selected &&
                    !group.items.find((item) => !selectedCodes.includes(item.code))
                }
                disabled={
                    withDisabled &&
                    group.items.find((item) => (
                        (item.selected && !selectedCodes.includes(item.code))
                        && (disabledItems ? disabledItems?.has(item.code) : true)
                    ))
                }
                changeInput={onClickGroup}
            />
            <div className={s.groupItems}>
                {group.items.map((item) => (
                    <CheckboxRow
                        key={item.code}
                        title={item.value}
                        selected={selectedCodes.includes(item.code)}
                        disabled={
                            disabledItems
                                ? withDisabled && disabledItems?.has(item.code)
                                : withDisabled && item.selected && !selectedCodes.includes(item.code)
                        }
                        changeInput={(checked) => onClickInput(checked, item.code)}
                    />
                ))}
            </div>
        </div>
    )
}

export {CheckboxGroup}
