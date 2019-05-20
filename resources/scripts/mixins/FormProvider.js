import { debounce } from 'debounce';

export const FormProvider = {
    data:() => ({
        breadcrumbs: [],
        headers: [],
        records: [],
        record: {},
        selected: [],

        page: {
            icon: null,
            title: null,
            subtitle: null
        },

        table: {
            emptyMessage: 'There is no data to display',
            firstLoad: true,
            loader: false,
            page: [10, 25, 50],
            totalItems: 0,
        },

        tablePaging: {},

        ctrlState: 'default',

        disabled: {
            add: false,
            delete: true,
            edit: true,
            find: false,
            link: true,
            refresh: false
        },

        form: {
            onShow: false,
            onFind: false,
            onEdit: false,
            onDelete: false,
            onImport: false
        },

        searchText: null,
        searchState: false,

        dataUrl: null,
        dataId: null,
        primaryId: 'id'
    }),

    created() {
        this.newRecord();

        if (this.record.hasOwnProperty(this.primaryId)) {
            this.dataId = this.record.id;
        }
    },

    mounted() {
        this.fetch(this.dataUrl, this.tablePaging);
    },

    methods: {
        newRecord: function() {},

        fetchCombo: async function(url, callback, params) {
            try {
                let {data} = await this.$http.get(url, { params });

                if (callback) { callback(data); }
            } catch (error) {
                this.$error = error;
            }
        },

        primaryKey: function() {
            return this.record.hasOwnProperty(this.primaryId) ? this.record.id : null;
        },

        closeLoader: function() {
            window.setTimeout(() => {
                this.table.loader = false;

                if (this.form.onFind) {
                    this.$refs.elmInput.focus();
                }
            }, 500);
        },

        closeFinder: function() {
            this.searchText = this.tablePaging.filter = null;
            this.form.onFind = false;
        },

        bouncing: debounce(function(e) {
            this.searchText = e.target.value;
        }, 500),

        fetch: async function(url, params) {
            this.table.loader = true;

            try {
                let {data: {data, meta}} = await this.$http.get(url, {params: params});
                this.records = data;
                this.table.totalItems = meta.total;
                this.selected = [];
                this.table.firstLoad = false;
            } catch (error) {
                this.$error = error;
            } finally {
                this.closeLoader();
            }
        },

        refresh: function() {
            this.fetch(this.dataUrl, this.tablePaging);
        },

        openFind: function() {
            this.form.onFind = true;

            this.$nextTick(() => {
                this.$refs.elmInput.focus();
            });
        },

        submitForm: function() {
            this.form.onEdit ? this.postUpdate() : this.postAddnew();
        },

        closeForm: function() {
            this.form.onEdit ? this.closeUpdate() : this.closeAddnew();
        },

        closeAddnew: function() {
            this.form.onEdit = false;
            this.form.onShow = false;
            this.form.onImport = false;
        },

        openImport: function() {
            this.form.onEdit = false;
            this.form.onShow = false;
            this.form.onImport = true;
        },

        openNewForm: function() {
            this.newRecord();
            this.form.onEdit = false;
            this.form.onShow = true;
        },

        beforeAddnew: function() {},

        postAddnew: async function() {
            try {
                this.beforeAddnew();

                let {data: {data}} = await this.$http.post(
                    this.dataUrl, this.record
                );

                this.records.push(data);
                this.form.onShow = false;
                this.$message = process.env.MIX_MESSAGE_NEW;
            } catch (error) {
                this.$error = error;
            }
        },

        closeUpdate: function() {
            this.form.onEdit = false;
            this.form.onShow = false;
            this.form.onImport = false;
            this.selected = [];
        },

        openUpdate: function() {
            this.form.onEdit = true;
            this.form.onShow = true;
        },

        beforeUpdate: function() {},

        postUpdate: async function() {
            try {
                this.beforeUpdate();

                let {data: {data}} = await this.$http.put(
                    this.dataUrl + '/' + this.primaryKey(), this.record
                );

                this.record = data;
                this.form.onShow = false;
                this.$message = process.env.MIX_MESSAGE_UPDATE;
            } catch (error) {
                this.$error = error;
            }
        },

        closeDelete: function() {
            this.form.onDelete = false;
        },

        openDelete: function() {
            this.form.onDelete = true;
        },

        beforeDelete: function() {},

        postDelete: async function() {
            try {
                this.beforeDelete();

                let response;

                if (this.selected.length <= 1) {
                    let index = this.records.indexOf(this.record);

                    response = await this.$http.delete(
                        this.dataUrl + '/' + this.primaryKey()
                    );

                    if (response) {
                        this.records.splice(index, 1);
                    }
                } else {
                    response = await this.$http.post(
                        this.dataUrl + '/bulks', this.selected
                    );

                    if (response) {
                        this.selected.forEach((record) => {
                            let index = this.records.indexOf(record);
                            this.records.splice(index, 1);
                        });
                    }
                }
            } catch (error) {
                this.$error = error;
            } finally {
                this.form.onDelete = false;
                this.$message = process.env.MIX_MESSAGE_DELETE;
                this.ctrlState = 'default';
            }
        },

        overideState: function() {},
        
        openLink: function() {}
    },

    watch: {
        tablePaging: {
            handler: function() {
                if (this.table.firstLoad) { return; }

                this.fetch(this.dataUrl, this.tablePaging);
            },

            deep: true
        },

        searchText: function(newval, oldval) {
            if (newval && (newval.length > 0)) {
                if (!this.tablePaging.hasOwnProperty('filter')) {
                    this.tablePaging = Object.assign({
                        filter: this.searchText
                    }, this.tablePaging);
                } else {
                    this.tablePaging.filter = this.searchText;
                }

                this.searchState = true;
            } else {
                if (oldval && (oldval.length > 0)) {
                    this.tablePaging.filter = null;
                }

                this.searchState = false;
            }
        },

        selected: function(newval) {
            switch (newval.length) {
                case 0:
                    if (this.searchState) {
                        this.form.onFind = true;
                    }

                    this.record = {};
                    this.ctrlState = 'default';
                    break;
                
                case 1:
                    this.form.onFind = false;
                    this.record = this.selected[0];
                    this.ctrlState = 'select';
                    break;
            
                default:
                    this.form.onFind = false;
                    this.ctrlState = 'delete';
                    break;
            }
        },

        ctrlState: function(newval) {
            switch (newval) {
                case 'delete':
                    this.disabled = { add: true, delete: false, edit: true, find: true, link: true };
                    break;
                
                case 'select':
                    this.disabled = { add: true, delete: false, edit: false, find: true, link: false };
                    this.overideState();
                    break;
            
                default:
                    this.disabled = { add: false, delete: true, edit: true, find: false, link: true };
                    break;
            }
        }
    }
}