import {instance} from './index'

const spacingDetailApi = {
    async fetchSpacingInfo(spacingId) {
        return await instance.get(`/spacing/${spacingId}/description`)
    },

    async fetchDepartmentList(spacingId) {
        return await instance.get(`/spacing/${spacingId}/departments`)
    },

    async fetchDepartmentTableList(departmentId) {
        return await instance.get(`/department/${departmentId}/tables`)
    },

    async fetchCurrentModelStepCount(spacingId) {
        return await instance.get(`/calculate-preconditions/${spacingId}/steps`)
    },

    async fetchCurrentModelByStep(endpoint, step, part, version = null, spacingId = null) {
        return await instance.get(endpoint, {
            params: {
                step,
                part,
                version,
                spacingId,
            },
        })
    },

    async postCurrentModel(spacingId, modelFile) {
        const formData = new FormData()
        formData.append('doc', modelFile)

        return await instance.post(`/excel/parsing-gurobi-result/${spacingId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    async rejectSpacing(spacingId) {
        return await instance.post(`/spacing/${spacingId}/reject`)
    },
}

export {spacingDetailApi}
