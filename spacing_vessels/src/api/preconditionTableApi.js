import {instance} from './index'

const preconditionTableApi = {
    async fetchTableFilling(spacingId, tableCode, tableId) {
        return await instance.get(`/spacing/${spacingId}/table/${tableCode}/${tableId}/body`)
    },

    async sendTableChanges(spacingId, postData, tableCode, tableId) {
        return await instance.post(
            `/spacing/${spacingId}/table/${tableCode}/${tableId}/save`,
            postData
        )
    },

    async sendSubTableApprove(spacingId, postData, tableCode, tableId) {
        return await instance.post(
            `/spacing/${spacingId}/table/${tableCode}/${tableId}/save`,
            postData
        )
    },

    async sendApproveTable(id) {
        return await instance.post(`/table/${id}/approve`)
    },

    async sendCancelApproveTable(id) {
        return await instance.post(`/table/${id}/cancel-approve`)
    },
}

export {preconditionTableApi}
