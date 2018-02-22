<template>
    <div>
    <div v-if="showGrid">
       <v-btn small outline class="blue darken-1 elevation-1 mr-4 section-backbutton" @click.native="goBack()"><v-icon class="white--text">arrow_back</v-icon></v-btn>		
        <v-layout row wrap class="buttons-bar">
            <v-flex xs12 sm8>
                <v-btn small outline class="grey  elevation-1" @click.native="assignSelectedVendors()"><v-icon class="grey--darken-1--text mr-1">person_add</v-icon> Assign Vendor</v-btn>
                <v-btn small outline class="grey  elevation-1" @click.native="refresh()"><v-icon class="grey--darken-1--text mr-1">clear_all</v-icon> Clear</v-btn>
            </v-flex>
            <v-flex xs8 sm3>
                <div class="input-group mt-2">
                    <input @keyup="onQuickFilterChanged" type="text" id="" name="" placeholder="Type text to search..." class="form-control btn-gray btn-outline btn-sm input-custom"> 
                    <span class="input-group-addon btn-gray btn-outline btn-sm"><v-icon class="search-icon">search</v-icon></span>
                </div>
            </v-flex>
            <v-flex xs4 sm1 class="text-xs-right">
                <v-btn outline icon class="grey--text">
                    <v-icon  @click.native="refresh()">refresh</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <div>
            <ag-grid-vue style="width: 100%; height: 510px;" class="ag-validzone"
                :gridOptions="gridOptions"
                :columnDefs="columnDefs"
                :rowData="rowData"
                :pagination="true"
                :paginationPageSize="50"
                :paginationAutoPageSize="true"
                :enableSorting="true"
                :enableColResize="true"
                :suppressRowClickSelection="false"
                rowSelection="multiple"
                :rowHeight="40"
                :icons="icons">
            </ag-grid-vue>
        </div>
    </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {AgGridVue} from "ag-grid-vue";
    import Modal from '../../../../components/vz/vzdemopr/legal/Modal.vue';
    import { mapState, mapActions, mapGetters } from 'vuex';
    let SquareComponent = Vue.extend({
        template: '<span>{{ valueSquared() }}</span>',
        methods: {
            valueSquared() {
                return this.params.value * this.params.value;
            }
        }
    });

    let valueCenterCellStyle = {
        'text-align': 'center'
    };


    export default {
        data () {
            return {
                messageVendor: false,
                selectedName: '',
                messageData: {
                    messageSubject: '',
                    messageBody: '',
                    contactId: null
                },
                errorAlert: false,
                gridOptions: null,
                columnDefs: null,
                rowData: null,
                selectAll: null,
                showGrid: true,
                icons: {
                    checkboxChecked: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMTQzMkY1NDIyMjhFNjExQkVGOEFCQUI5MzdBNjFEMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMzBBQkU2ODI4MjQxMUU2QjlDRUZCNUFDREJGRTVDMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMzBBQkU2NzI4MjQxMUU2QjlDRUZCNUFDREJGRTVDMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0NDMyRjU0MjIyOEU2MTFCRUY4QUJBQjkzN0E2MUQxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjExNDMyRjU0MjIyOEU2MTFCRUY4QUJBQjkzN0E2MUQxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+O+zv0gAAAQ1JREFUeNpilJvw35OBgWEuEEsyEAeeA3EyI1DjMxI0wTUzkaEJBCSZiFVpJcvAsDqEgUFVCMInSqOeOAPDLG8GBjNpBoZCCyI1KggwMCzwZ2DgZWdgOPWUgaF4F5pGDxWgqT4MDPzsSB7hYWBYHMDAIMzJwHDjDQND0mYGhu9/0DT6qTEwuCszMOyIZmAwkoTYALJJjp+B4cEHBoaEjQwMn38iDAVFx38wA4gzTBgYSiwhEi++MDDI8DEwvP3OwBC0CqIZGcBtBOmefoaBIXQNA8PvfxBNf4B03AZMTVgD5xwwXcQDFX/8wcAw+RQDw5VX2AMN7lRSARM07ZEKXoA0poAYJGh6CkrkAAEGAKNeQxaS7i+xAAAAAElFTkSuQmCC"/>'
                },
            }
        },
        components: {
            'ag-grid-vue': AgGridVue,
            Modal,
            ParamsComponent: {
                template: '<span>Field: {{params.colDef.field}}, Value: {{params.data.voi_registration_status}} {{ valueCubed() }}</span>',
                methods: {
                    valueCubed() {
                        console.warn('Parameter',this.params.data);
                        return this.params.data.voi_registration_status;
                    }
                }
            },
            VOIRegistrationStatusComponent: {
                template: '<span :class="classStatusType">{{status()}}</span>',
                computed: {
                    classStatusType: function () {
                        return {
                            'label label-rounded': true,
                            'label-gray': this.params.data.voi_registration_status == 1,
                            'label-green': this.params.data.voi_registration_status == 2,
                            'label-red': this.params.data.voi_registration_status == 3,
                        }
                    }
                },
                methods: {
                    status() {
                        return this.params.data.voi_registration;
                    }
                }
            },
            VOIVendor: {
                template: '<a :href="vendorUrl">{{params.data.full_name}}</a>',
                computed: {
                    vendorUrl(){
                        return "#vzdemopr/legal/voi/"+this.params.data.company_id+"/1/1#/application";
                    },
                    classStatusType: function () {
                        return {
                            'label label-rounded': true,
                            'label-gray': this.params.data.voi_registration_status == 1,
                            'label-green': this.params.data.voi_registration_status == 2,
                            'label-red': this.params.data.voi_registration_status == 3,
                        }
                    }
                },
                methods: {
                    classType(){
                        switch(this.params.data.voi_registration_status){
                            case 1:
                                return 'gray';
                                break;
                            case 2:
                                return 'green';
                            case 3:
                                return 'red';
                                break;
                        }
                    },
                    status() {

                        return this.params.data.voi_registration;

                    }
                }
            },
            ChildMessageComponent: {
                template: '<span><button style="height: 20px" @click="invokeParentMethod">Invoke Parent</button></span>',
                methods: {
                    invokeParentMethod() {
                        this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
                    }
                }
            }
        },
        watch: {

            messageVendor: function () {
                if(this.messageVendor == false){
                    this.messageData.messageSubject = '';
                    this.messageData.messageBody = '';
                }
            },

        },
        props: ['parentVue','formId'],
        methods: {
            ...mapActions([
                'setSelectedRowAction',
                'setFormSourceObject'
                ]),
            createRowData() {
                let self = this;
                // Post and Validate all Fields
                axios.post('getVOIVendorRegistration', {
                    company: this.$route.path.split('/')[1],
					application: this.$route.path.split('/')[2],
                    level: 3, // Unit
                })
                // Successful Response
                    .then(response => {
                        console.log('Getting Company Pre Registration List table');
                        self.rowData = response.data;
                        console.log(self.rowData);
                    })
                    // Error
                    .catch(error => {
                        console.error( "Error getting Company Pre Registration List table");
                        console.dir( error.response );
                    });
            },
            createColumnDefs() {
                this.columnDefs = [
                    {
                        headerName: '',
                        width: 28,
                        minWidth: 25,
                        maxWidth: 30,
                        suppressSizeToFit: true,
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        suppressSorting: true,
                        suppressMenu: true,
                        pinned: true
                    },
                    {   headerName: "Vendor",
                        field: "full_name",
                        colId: "params",
                        cellRendererFramework: 'VOIVendor',
                        width: 350,
                        pinned: true,
                    },
                    {
                        headerName: "Application Status",
                        field: "row",
                        cellRendererFramework: 'VOIRegistrationStatusComponent',
                        colId: "params",
                        width: 300,
                        cellStyle: valueCenterCellStyle,
                    },
                    {
                        headerName: "Status",
                        field: "row",
                        cellRendererFramework: 'VOIRegistrationStatusComponent',
                        colId: "params",
                        width: 200,
                        cellStyle: valueCenterCellStyle,
                    },

                    {
                        headerName: "Registration Date",
                        field: "creation_date",
                        cellStyle: valueCenterCellStyle,
                        // colId: "business_service_name",
                        width: 200
                    },
                ];
            },
            methodFromParent(cell) {
                alert(`"Parent Component Method from ${cell}!`);
            },
            onQuickFilterChanged(event) {
                this.gridOptions.api.setQuickFilter(event.target.value);
            },
            selectAllValues(){
                if(this.selectAll){

                }
                this.gridOptions.api.selectAll();
                console.log('Test', this.selectAll);
            },
            autoSizeAll(){
                let allColumnIds = [];
                this.columnDefs.forEach( function(columnDef) {
                    allColumnIds.push(columnDef.colId);
                });
                console.log('columns',allColumnIds);
                // let columnDef = ['business_service_name'];
                this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
            },
            refresh(){
                // Refresh table data
                this.createRowData();
                this.gridOptions.api.refreshView();
            },
            getRowData(){
                // Get Row Data
                let rowData = [];
                let selectedRows = this.gridOptions.api.getSelectedRows();
                // let selectedRows = this.gridOptions.api.getSelectedNodes();
                let selectedRowsString = '';
                selectedRows.forEach( function(selectedRow, index) {
                    if (index!=0) {
                        selectedRowsString += ', ';
                    }
                    console.log(selectedRow);
                    selectedRowsString += selectedRow.full_name;
                });
                console.log('Selected Row Data:',selectedRowsString);
            },
            setRowSelection(){
                this.gridOptions.api.forEachNode( function (node) {
                    if (node.data.company_id === 1) {
                        node.setSelected(true,true);
                    }
                });
            },
            goToProfile(){
                let selectedRows = this.gridOptions.api.getSelectedRows();
                console.warn('Selected Row:',selectedRows);
                // Get Selected Row if 1 is selected
                if(selectedRows.length == 1){
                    this.$router.push('voi/'+selectedRows[0].company_id+'/1/1#/application');
                }
                else{
                    console.error('No rows selected');
                }
            },
            assignSelectedVendors(){

                    let selectedRows = this.gridOptions.api.getSelectedRows();
                    if (selectedRows.length > 0) {
                        if( this.formId==null && this.$route.fullPath.toString().search('vendorAssign')<0 ) {
                            this.setSelectedRowAction({
                                selectedrows: selectedRows
                            });
                            this.$store.commit('setAssignToVendorback', {'value': true});
                            this.setFormSourceObject({'value': []});
                            this.$router.push('/vzdemopr/legal/voi_additional_questions_mgm/createform');
                        } else {
                            let self = this;
                            let formObj = null;
                            let formObjName = null;
                            let vendorEmail = null;
                            axios.post('getFormById', {
                                FormId: self.formId?self.formId.question_form_id:self.$route.params.question_form_id
                            }) // Successful Response
                                .then(response => {
                                    self.formObj = JSON.parse(response.data.questions);
                                    self.formObjName = response.data.form_name;
                                    self.vendorEmail = response.data.vendor_user_email;
                                    let tempForm = self.formObj.map(function(item){
                                        if(item.fields){
                                            item.fields.Sub_fields.map(function (subItem) {
                                                subItem.value=null;
                                                return subItem;
                                            });
                                        }
                                        if(item.type=='multiple options') {
                                            item.value = [];
                                        } else {
                                            item.value = null;
                                        }
                                        return item;
                                    });
                                    axios.post('createQuestionForm',
                                        {
                                            form_name: self.formObjName,
                                            questions: self.formObj,
                                            selected_vendors: selectedRows,
                                            company: 'vzdemopr',
                                            application: 'legal', //legal
                                            level: 3, // Unit,
                                            vendorUserEmail: self.vendorEmail
                                        }
                                    ).then( response => {
                                        if(response.data.header=='Question Form Created') {
                                            swal("Form Assigned to Vendor", '', "success");
                                            self.$router.push('/vzdemopr/legal/voi_additional_questions_mgm');
                                        }
                                    });
                                })
                                // Error
                                .catch(error => {
                                    console.error("Error Approving The Form");
                                    console.dir(error.response);
                                });
                        }
                    } else {
                        swal("Please Select Vendor First", '', "error");
                    }

            },
            sendMessage(){
                let selectedRows = this.gridOptions.api.getSelectedRows();
                console.warn('Selected Row:',selectedRows);
                // Get Selected Row if 1 is selected
                if(selectedRows.length == 1){

                    //Open Modal
                    this.messageVendor = true;

                    //Show User Name in modal header
                    this.selectedName = selectedRows[0].full_name;

                    //Save contact ID in array
                    this.messageData.contactId = selectedRows[0].company_id;

                }
                else{
                    console.error('No rows selected');
                }
            },
            acceptAlert: function(){
                swal({
                        title: "Accept",
                        text: "Do you want to accept this vendor?",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#7cb342",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No, cancel",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            swal("Accepted!", "The form has been accepted.", "success");
                        } else {
                            swal("Cancelled",'', "error");
                        }
                    });
            },
            acceptErrorAlert: function(){
                swal("This vendor can not be accepted right now", "To be accepted all application and documentation must be approved first.", "error")
            },
            denyAlert: function(){
                swal({
                        title: "Deny",
                        text: "Do you want to deny the request of this vendor?",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#f4511e",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No, cancel",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            swal("Denied!", "The request has been denied.", "success");
                        } else {
                            swal("Cancelled",'The request was not denied.', "error");
                        }
                    });
            },
            goBack() {
                this.parentVue();
            }
        },
        beforeMount() {
            this.gridOptions = {
                context: {
                    componentParent: this
                }
            };
            this.createRowData();
            this.createColumnDefs();
        },
        mounted() {
            this.gridOptions.api.sizeColumnsToFit();
        }
    }

</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }
    .assign-vendors {
        font-weight: 500;
        margin-bottom: 15px;
        font-size: 26px;
    }
    .search-grid {
        width: 256px;
        margin-left: 837px;
        padding: 12px;
    }

</style>
