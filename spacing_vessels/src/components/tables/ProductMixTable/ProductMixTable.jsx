import React, {useCallback, useMemo} from 'react'
import {HotTable} from '@handsontable/react'
import Handsontable from 'handsontable'
import Inputmask from 'inputmask'

import 'handsontable/dist/handsontable.full.min.css'

import {monthListEng, monthListRu} from '../../../assets/helperArrays/helperArrays'
import {useTableObserver} from '../../../hooks/useTableObserver'
import {useShortcut} from '../../../hooks/useShortcut'

const ProductMixTable = ({tableFilling, isEditable, sendTableChanges}) => {
    const settings = useMemo(
        () => ({
            columnHeaders: ['Зоны', ...monthListRu],
            columns: [
                {data: 'area', readOnly: true, className: 'htLeft', width: 200},
                ...monthListEng.map((month) => ({
                    data: month,
                    readOnly: !isEditable,
                    validator: 'percents',
                    placeholder: 'WR/HG/FLT',
                    className: 'htCenter htMiddle',
                    width: 72,
                })),
            ],
        }),
        [isEditable]
    )

    const getCustomEditorWithMask = useCallback((Handsontable, Inputmask, maskRegEx) => {
        const customEditor = Handsontable.editors.TextEditor.prototype.extend()

        customEditor.prototype.createElements = function () {
            Handsontable.editors.TextEditor.prototype.createElements.apply(this, arguments)

            const mask = new Inputmask(maskRegEx)

            this.TEXTAREA = document.createElement('input')
            this.TEXTAREA.setAttribute('data-hot-input', true)
            this.TEXTAREA.className = 'handsontableInput'

            mask.mask(this.TEXTAREA)

            this.textareaStyle = this.TEXTAREA.style
            this.TEXTAREA_PARENT.innerText = ''
            this.TEXTAREA_PARENT.appendChild(this.TEXTAREA)
        }

        return customEditor
    }, [])

    const percentEditor = getCustomEditorWithMask(Handsontable, Inputmask, '9{1,3}/9{1,3}/9{1,3}')

    const ref = useTableObserver(sendTableChanges, tableFilling.rowsData)

    useShortcut(ref)

    return (
        <HotTable
            ref={ref}
            className={'simple-table'}
            width={'100%'}
            height={'auto'}
            stretchH={'all'}
            language={'ru-RU'}
            editor={percentEditor}
            licenseKey={'non-commercial-and-evaluation'}
            colHeaders={settings.columnHeaders}
            columns={settings.columns}
            data={tableFilling.rowsData}
            allowInsertRow={false}
            allowInsertColumn={false}
        />
    )
}

export {ProductMixTable}
