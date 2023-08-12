import {useEffect} from 'react'

const useShortcut = (ref) => {
    useEffect(() => {
        if (!ref.current) return

        const gridContext = ref.current.hotInstance.getShortcutManager().getContext('grid')

        const undoShortcut = gridContext.getShortcuts(['control/meta', 'z'])
        undoShortcut.map((shortcut) => (shortcut.keys = [['control/meta', 'я']]))
        gridContext.removeShortcutsByKeys(['shift', 'control/meta', 'z'])
        gridContext.removeShortcutsByKeys(['control/meta', 'y'])

        gridContext.addShortcuts(undoShortcut)
    }, [ref])
}

export {useShortcut}
