import {instance} from './index'

const appApi = {
    async getAppParams() {
        const response = await instance.get('/app-params')
        instance.defaults.headers['Session-Id'] = response.data.sessionId
        return response
    },
}

export {appApi}
