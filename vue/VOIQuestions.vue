<template>
<<<<<<< .merge_file_ep1uSM
    <div v-bind:style="{'margin-top':'20px'}">
        <span class="back-btn-box" v-show="backButton">
            <button type="button" class="btn btn-info btn-sm back-btn" @click="goBack()"><i class="mdi mdi-arrow-left"></i> </button>
        </span>
        <span v-if="this.originRoute && this.originRoute.search('voi_additional_questions_mgm')>0">
            <features-buttons :formstatus="formstatus"></features-buttons>
        </span>
    <div class="form-parent">
        <div class="form-div">
            <h3 class="form-h3">{{ formName }}</h3>
        </div>
        <div class="form-status">
            <span :class="classStatusType()">{{this.statusName()}}</span>
        </div>
        <div v-show="this.denied_reason!=''" class="denied-message">
            <span>{{this.denied_reason}}</span>
        </div>
        <formView :validate="validate" :formSources=formSources v-bind:showFieldsButtons="showFieldsButtons" :originRoute="originRoute"/>
    </div>
=======
    <div>
        <v-flex xs12 sm12 class="ml-1">
            <v-btn small outline class="grey  elevation-1" @click="goBack()"><v-icon class="grey--darken-1--text">arrow_back</v-icon></v-btn>
        </v-flex>
        <h3>{{ formName }}</h3>
        <formView v-bind:validate="validate" v-bind:formSources="selectedForm" v-bind:showFieldsButtons="showFieldsButtons"/>
>>>>>>> .merge_file_J1ivyM
    </div>
</template>
 <script>
     import Vue from "vue";
     import { mapState, mapActions, mapGetters } from 'vuex';
     import fieldbuttons from '../../../../components/vz/vzdemopr/legal/FieldButtons.vue';
     import formView from '../../../../components/vz/vzdemopr/legal/VOIFormsFields.vue';
     import featuresButtons from '../../../../components/vz/vzdemopr/legal/VOIFormFeaturesButtons.vue';

     export default{
         data () {
             return {
                 selectedForm: null,
                 formName: 'Form Name',
                 backButton: false,
                 showFieldsButtons: false,
                 validate: true,
                 status:'',
                 denied_reason: '',
                 formstatus: null,

             }
         },
        created() {
            if(this.$route.fullPath.search('voiform')>0) {
                this.setoriginRoute({
                    route: '/vzdemopr/legal/voi_additional_questions_mgm',
                });
            } else if(this.$route.fullPath.search('voivendorform')>0) {
                this.setoriginRoute({
                    route: '/vzdemopr/legal/voi_additional_questions_forms',
                });
            }
        },
         components: {
             fieldbuttons,
             formView,
             featuresButtons
         },
         computed: {
             ...mapState({
                 formSources: state => state.voiQuestionForms.formSources,
                 originRoute: state => state.voiQuestionForms.originRoute
             })
        },
         methods: {
             ...mapActions([
                 'setoriginRoute'
             ]),
             getForm() {
                let self = this;
                let getFormRoute = null;
                 if(this.originRoute.search('voi_additional_questions_mgm')>0){
                    getFormRoute = 'getFormById';
                 } else if(this.originRoute.search('voi_additional_questions_forms')>0){
                     getFormRoute = 'getFormByIdForVendor';
                 }
                axios.post(getFormRoute, {
                    FormId: this.$route.params.question_form_id
                })
                // Successful Response
                    .then(response => {
                        self.backButton = true;
                        if(!response.data.invalidUser) {
                            self.$store.commit('setFormSource', {'value': JSON.parse(response.data.questions)});
                            self.formName = response.data.form_name;
                            self.status = response.data.status_id;
                            if (self.status == 2 || self.status == 4) {
                                self.validate = false;
                            } else if (self.status == 3) {
                                self.denied_reason = response.data.denied_reason;
                            }
                            self.formstatus = self.status;
                        } else {
                            swal(response.data.invalidUser, '', "error");
                            self.$router.push(self.originRoute);
                        }
                    })
                    // Error
                    .catch(error => {
                        console.error("Error Approving The Form");
                        console.dir(error.response);
                    });

            },
             goBack() {
                 if(this.originRoute) {
                     this.$router.push(this.originRoute);
                 }
             },
             clearQuestions() {
                console.log("Clear Questions");
             },
             classStatusType: function () {
                 return {
                     'label label-rounded': true,
                     'label-gray': this.status == 1,
                     'label-blue': this.status == 2,
                     'label-green': this.status == 4,
                     'label-red': this.status == 3,
                 }
             },
             statusName: function () {
                 switch (this.status){
                     case 1:
                         return 'Pending';
                     case 2:
                         return 'Accepted';
                     case 3:
                         return 'Rejected';
                     case 4:
                         return 'Answered';
                 }
             }
         },
         beforeMount() {
             this.getForm();

         }

     }

 </script>
<style scoped>
    .btn-danger, .btn-danger.disabled {
        background: #f4511e;
        border: 1px solid #f4511e;
    }
    .input-group-btn .btn {
        padding: 5px 12px;
    }
    .mail-list .list-group-item:hover {
        background: #E0E0E0;
        border-left: 3px solid #f7fafc;
    }
    .form-status {
        display: inline;
        float: right;

    }
    .form-h3 {
        display: inline;
    }
    .form-div {
        display: inline-block;
        margin-left: 38px;
    }
    .form-parent {
        margin-top: 34px;
        background: white;
        padding: 33px;
    }
    .denied-message {
        background: red;
        color: white;
        font-size: 22px;
        padding: 12px;
        margin-left: 40px;
    }
</style>