// initial state
const state = {
    rowData: [],
    formSources: [],
    formName: '',
    backButton: false,
    originRoute: null,
    selectedRows: '',
    assignToVendorback: false,
    vendors: [],
    formGridData: [],
    formGridDataForVendor: []
}

// getters
const getters = {
    formSourceLenght: (state) => {
        return state.formSources.length
    },
    getFormSourceObject: (state) => {
        return state.formSources
    },
    getForms: (state) => {
        return state.rowData
    },
    getSpecificForm: (state,getters) => (id) => {
        return state.rowData.find((Form) => Form.question_form_id === id)
    },
    getSelectedRows: (state, getters) =>{
        return state.selectedRows
    },
    getFormName: (state) => {
        return state.formName;
    }
}

// mutations
const mutations = {
    getQuestionFormSubmissions(state,payload){
        // Get total documents awaiting for approval (VOI vendor)
        axios.post('getQuestionFormSubmissions', {
                   company: payload.company,
                   application: payload.application
               }).then((response) => {
            state.rowData = response.data;
            state.formGridData = response.data;
        });
    },
    getQuestionFormForVendor(state,payload){
        // Get total documents awaiting for approval (VOI vendor)
        axios.post('getQuestionFormForVendor', {
            company: payload.company,
            application: payload.application
        }).then((response) => {
            // console.log("getQuestionFormForVendor");
            // console.log(JSON.stringify(response.data));
            state.rowData = response.data;
            state.formGridDataForVendor = response.data;
        });
    },
    deleteQuestionForm(state,payload){
        let self = this;
        axios.post('deleteQuestionForm',{
            company: payload.company,
            application: payload.application,
            level: 1, // Unit,
            formId: payload.formId,
            vendorUserEmail: payload.vendorUserEmail
        })
        // Successful Response
            .then(response => {
                state.rowData = response.data;
            })
            // Error
            .catch(error => {
                console.error( "Error deleting Company Question Forms ");
                console.dir( error.response );
            });
    },
    approveQuestionForm(state,payload) {
        let self = this;
            axios.post('approveQuestionForm', {
                company: payload.company,
                application: payload.application,
                level: payload.level, // Unit,
                status: payload.status,
                formId: payload.formId,
                vendorUserEmail: payload.vendorUserEmail
            })
            // Successful Response
                .then(response => {
                    state.rowData = response.data;
                    // console.log(response.data);
                })
                // Error
                .catch(error => {
                    console.error("Error Approving The Form");
                    console.dir(error.response);
                });
        },
    denyForm(state, payload) {
        let self = this;
        axios.post('denyQuestionForm', {
            company: payload.company,
            application: payload.application,
            level: payload.level, // Unit,
            status: payload.status,
            formId: payload.formId,
            denied_reason: payload.denied_reason,
            vendorUserEmail: payload.vendorUserEmail
        })
        // Successful Response
            .then(response => {
                state.rowData = response.data;
            })
            // Error
            .catch(error => {
                console.error("Error Dening The Form");
                console.dir(error.response);
            });
    },
    createQuestionForm(state, payload) {
            axios.post('createQuestionForm',
                {
                    form_name: state.formName,
                    questions: state.formSources,
                    selected_vendors: payload.selected_vendors,
                    company: payload.company,
                    application: payload.application, //legal
                    level: payload.level, // Unit
                }
            ).then(
                // response => state.formSources = []
            );
    },
    UPDATE_FORM_INPUT (state, payload) {
        state.formName = payload.value;
    },
    PUSH_TO_FORM_SOURCE ( state, payload ){
        // console.log("PUSH_TO_FORM_SOURCE");
        state.formSources.push ( payload.value );
    },
    setBackButton(state, tab) {
        state.backButton = tab.backButton;
    },
    setOriginRoute(state, tab) {
        state.originRoute = tab.originPath;
    },
    goBack(state) {
        // Go back to origin route
        // Example: state.originRoute = '/vzdemopr/legal/voi_preregistration_mgm'
        router.push(state.originRoute);
    },
    setSelectedRow(state,payload) {
        state.selectedRows = payload.selectedrows;
    },
    setAssignToVendorback(state,payload) {
        state.assignToVendorback = payload.value;
    },
    setFormSource(state,payload) {
        state.formSources = payload.value;
        // console.log(state.formSources);
    },
    updateFormSource(state, payload) {

       if( state.formSources.length>0 ) {
           // console.log("Before");
           // console.log(state.formSources);
           state.formSources[payload.index].options.push(payload.value);
           // console.log("After");
           // console.log(state.formSources);
       } else {
           state.formSources.options.push(payload.value);
       }

    },
    updateFormFields(state, payload){

        if( state.formSources.length>0 ) {
            state.formSources[payload.index].label = payload.label;
            state.formSources[payload.index].type = payload.type;
            state.formSources[payload.index].input_type = payload.input_type;
            state.formSources[payload.index].fields = payload.item;
            // console.log(state.formSources[payload.index]);
            // console.log(payload.value);
        } else {
            state.formSources = payload.value;
        }

    },
    removeFormSourceOption(state, payload){

        if(state.formSources.length>0) {
            state.formSources[payload.index].options = payload.value;
            // console.log(state.formSources[payload.index].options);
        }

    },
    getFormObject(state, payload){
        let self = this;
        axios.post('getFormById', {
            FormId: payload.formId
        })
        // Successful Response
            .then(response => {
                state.rowData = response.data;
                // console.log(state.rowData);
            })
            // Error
            .catch(error => {
                console.error("Error Approving The Form");
                console.dir(error.response);
            });
    },
    setFields(state, payload){
        console.log(payload.indexInner);
        state.formSources.forEach((element, index) => {
            if(payload.parentObj) {
                if (payload.parentObj.type === "full name" || payload.parentObj.type === "address"|| payload.parentObj.type === "from date to date") {
                    if (element.type == "full name" || element.type == "address" ||element.type == "from date to date") {
                        if (element.fields.Sub_fields[payload.indexInner] && (index==payload.index && element.id === payload.parentObj.id && element.fields.Sub_fields[payload.indexInner].id === payload.el.id && element.fields.Sub_fields[payload.indexInner].type === payload.el.type && payload.parentObj.type===element.type)) {
                            state.formSources[index].fields.Sub_fields[payload.indexInner].value = payload.value;
                        }
                    }
                } else if(payload.parentObj.type=="multiple options"){
                    if (element.type == "multiple options") {
                        if (element.id === payload.parentObj.id) {
                            if( state.formSources[index].value && state.formSources[index].value.length > 0 ) {
                                let localIndex = _.findIndex(state.formSources[index].value,payload.value);
                                localIndex>-1
                                    ?state.formSources[index].value.splice(localIndex,1)
                                    :state.formSources[index].value.push(payload.value);
                            } else {
                                state.formSources[index].value.push(payload.value);
                            }
                        }
                    }
                }
            } else {
                if (element.id === payload.el.id && index==payload.index) {
                    state.formSources[index].value = payload.value;
                }
            }

        });
        // console.log(payload.currentForm);
    },
    setoriginRoute(state, payload) {
        state.originRoute = payload.route;
    },
    getVendorList(state,payload) {

        let self = this;
        axios.post('getVOIVendorRegistration', {
            company: payload.company,
            application: payload.application,
            level: 3, // Unit
        })
        // Successful Response
            .then(response => {
                // console.log('Getting Company Pre Registration List table');
                state.vendors = response.data;
                // console.log( state.vendors );
                // Unshift put the element at the top of the array
                state.vendors.unshift({id: 0, vendor: 'All'});
            })
            // Error
            .catch(error => {
                console.error( "Error getting Company Pre Registration List table");
                console.dir( error.response );
            });

    },
    setFormGridByStatus(state,payload) {
        // console.log("In setFormGridByStatus (Store)");
        if( state.formGridDataForVendor.length > 0 ) {
            if (payload.value.id == 0) {
                state.rowData = state.formGridDataForVendor;
            } else {
                state.rowData = state.formGridDataForVendor.filter((obj) => {
                    return obj.submission_question_form_status_id == payload.value.id
                });
            }
        } else {
            if (payload.value.id == 0) {
                state.rowData = state.formGridData;
            } else {
                state.rowData = state.formGridData.filter((obj) => {
                    return obj.submission_question_form_status_id == payload.value.id
                });
            }
        }
    },
    setFormGridByVendor(state,payload) {
        // console.log(state.vendors);
        // console.log("In setFormGridByVendor (Store)");
        if( payload.value.id == 0 ) {
            state.rowData = state.formGridData;
        } else {
            state.rowData = state.formGridData.filter((obj) => {
                return obj.vendor_name == payload.value.full_name
            });
        }
    },
    setFormGridDataForVendor(state,payload) {
        state.formGridDataForVendor = payload.value;
    },
    unassignedForm(state,payload) {
        // Post To Unassigned Form
        axios.post('unassignedQuestionForm',{
            company: payload.company,
            application: payload.application,
            level: 1, // Unit,
            formId: payload.formId,
            vendorUserEmail: payload.vendorUserEmail
        })
        // Successful Response
            .then(response => {
                state.rowData = response.data;
            })
            // Error
            .catch(error => {
                console.error( "Error deleting Company Question Forms ");
                console.dir( error.response );
            });
    }
}

// actions
const actions = {
    createFormRow ({ commit, state },payload) {
        // Get total Questions Forms
        commit('getQuestionFormSubmissions', payload);
    },
    createFormRowForVendor ({ commit, state },payload) {
        // Get total Questions Forms
        commit('getQuestionFormForVendor', payload);
    },
    deleteFormRow ({ commit, state },payload) {
        // Delete Form
        commit('deleteQuestionForm',payload);
    },
    approveForm({ commit, state },payload) {
        // Approved Form
        commit('approveQuestionForm',payload);
    },
    denyQuestionForm({ commit, state },payload) {
        // Deny Form
        commit('denyForm',payload);
    },
    saveFormAction({ commit, state }, payload) {
        //Save FormSource
        commit('createQuestionForm',payload);
    },
    setSelectedRowAction({ commit, state }, payload) {
        //Save FormSource
        commit('setSelectedRow',payload);
    },
    setFormSourceObject({ commit, state }, payload) {
        commit('setFormSource',payload);
    },
    getFormById({ commit, state }, payload) {
        commit('getFormObject',payload);
    },
    setFormField({ commit, state },payload) {
        commit('setFields',payload);
    },
    setoriginRoute({ commit, state },payload) {
        commit('setoriginRoute',payload);
    },
    getVendorList({ commit, state },payload ){
        commit('getVendorList',payload);
    },
    setFormGridByStatus({ commit,state },payload) {
        commit('setFormGridByStatus',payload);
    },
    setFormGridByVendor({ commit,state },payload) {
        commit('setFormGridByVendor',payload);
    },
    setFormGridDataForVendor({ commit,state },payload) {
        commit('setFormGridDataForVendor',payload);
    },
    unassignedForm({ commit, state },payload) {
        commit('unassignedForm',payload);
    }

}

export default {
    state,
    getters,
    mutations,
    actions,
}