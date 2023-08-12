import {instance} from './index'

const spacingsApi = {
    async getYearNameList() {
        return await instance.get('/spacing-tree')
    },

    async getYearSpacings(yearName) {
        return await instance.get(`/spacing-tree/${yearName}`)
    },

    async creatNewSpacing(node) {
        return await instance.post('/spacing', {
            dateCalculation: node.dateCalculation,
            version: node.version,
            comment: node.comment,
            planType: node.planTypeCode,
        })
    },

    async copyExistingSpacing(node) {
        return await instance.post(`/spacing/${node.id}/copy`, {
            dateCalculation: node.dateCalculation,
            version: node.version,
            comment: node.comment,
            planType: node.planTypeCode,
        })
    },
}

export {spacingsApi}
