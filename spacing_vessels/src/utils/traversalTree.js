const traversalTree = (tree, data) => {
    if (tree.id === data.node.id) {
        const newNode = {
            ...data.node,
            id: data.node.id + Math.round(Math.random() * 100),
            date: Date.now().toString() / 1000,
            version: `${data.node.version}.${tree.children.length + 1}`,
            status: 'calculating',
            comment: data.comment,
            data: {
                total: {
                    catch: data.node.data?.total?.catch || 0,
                    financialResult: data.node.data?.total?.financialResult || 0,
                },
            },
            children: [],
        }

        tree.children.push(newNode)
    }

    if (!tree.children.length) return

    for (let i = tree.children.length - 1; i >= 0; i--) {
        traversalTree(tree.children[i], data)
    }

    return tree
}

export {traversalTree}
