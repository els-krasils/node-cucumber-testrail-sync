const TestrailApi = require("testrail-api");
const pageSize = 250
const maxPages = 40

class TestrailApiClient extends TestrailApi {
    async getAll(methodName, dataField, container_id, filters = {}) {
        let items = []
        filters.limit = pageSize
        for (let page = 0; page < maxPages; page++) {
            filters.offset = page * pageSize
            let res = await this[methodName](container_id, filters)
            Array.prototype.push.apply(items, res[dataField])
            if (res.size < pageSize) {
                break
            }
        }
        return items
    }

    async getAllCases(project_id, filters) {
        return await this.getAll('getCases', 'cases', project_id, filters)
    }

    async getAllSections(project_id, filters) {
        return await this.getAll('getSections', 'sections', project_id, filters)
    }

    async getAllTests(run_id, filters) {
        return await this.getAll('getTests', 'tests', run_id, filters)
    }
}

module.exports = TestrailApiClient