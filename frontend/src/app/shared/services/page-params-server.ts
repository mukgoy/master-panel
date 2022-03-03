export class PageParamsServer {
    isInit : boolean= false;
    data : any[]    = [];
    searchValue     = '';
    limit           = 10;
    page            = 1;
    orderKey        = 'createdAt';
    orderType       = 'desc';
    filters : any   = {};
    totalPages : number   = 0;
    emitChange = ()=>{}

    hasPreviousPage() {
        return this.page > 1;
    };
    hasNextPage() {
        if(this.totalPages > 1){
            return this.page < this.totalPages;
        }
        return this.data.length == this.limit;
    };

    nextPage () {
        if (!this.hasNextPage()) {
            return;
        }
        this.page++;
        this.emitChange();
    };
    previousPage() {
        if (!this.hasPreviousPage()) {
            return;
        }
        this.page--;
        this.emitChange();
    };
    changePageSize(limit:number) {
        this.page = 1;
        this.limit = limit;
        this.emitChange();
    }

    customFilter(res:any){
        return res;
    }
    getObject(){
        return {
            searchValue : this.searchValue,
            limit       : this.limit,
            page        : this.page,
            orderKey    : this.orderKey,
            orderType   : this.orderType,
            // filters     : this.filters,
            ...this.filters,
        };
    }

    setPagesCountByItemCount(totalCount:number) {
        this.totalPages = totalCount < this.limit ? 1 : Math.ceil(totalCount / this.limit);
    }

}
