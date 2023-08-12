import {instance} from './index'

const resultsApi = {
    async fetchShipsSchedule(spacingId) {
        return await instance.get(`/plan-schedule/${spacingId}`)
    },

    async fetchOptimizationResultsTable(spacingId) {
        return await instance.get(`/optimize-economic-results/${spacingId}/sok-dollars/body`)
    },

    async sendOptimizationResultsTableChanges(spacingId, postData) {
        return await instance.post(
            `/optimize-economic-results/${spacingId}/sok-dollars/save`,
            postData
        )
    },

    async fetchFilterList(spacingId) {
        return await instance.get(`/total-calculation/${spacingId}/filter-settings`)
    },

    async fetchResultTable(spacingId, tableCode, filterItems = null) {
        const currentParams = filterItems ?? {}

        return await instance.get(`/total-calculation/${spacingId}/${tableCode}`, {
            params: currentParams,
        })
    },
}

export {resultsApi}
