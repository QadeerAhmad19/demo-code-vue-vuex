<template>
    <div>
        <form @submit.prevent="validateForm">
            <span v-bind:style="{'display': 'none'}" >
                {{this.updateViewForce}}
            </span>
            <ul v-bind:style="{'list-style-type': 'none'}" >
                <li v-for="(element,index) in this.formSources" v-bind:key="element.id">
                    <div class="well well-sm">
                        <div class="form-group">
                                <label v-if="element.type !== 'full name'||element.type !== 'address'" v-bind:class="{'required':element.required}">{{element.label}}</label>
                            <span v-if="element.type === 'short answer'">
                                <input type="text" :disabled="showFieldsButtons?true:false" data-vv-delay="1000" :placeholder=element.type :data-vv-as=element.label :name="element.name"  v-validate="element.required?'required|alpha_spaces':''" :class="{'input form-control input-sm': true, 'form-control input-smis-danger': errors.has(element.name) }" :value="element.value" v-on:keyup="onDataChange(element,index,$event.target.value)">
                            </span>
                            <span v-if="element.type === 'email'">
                                <input type="email" data-vv-delay="1000" :disabled="showFieldsButtons?true:false" :placeholder=element.type :data-vv-as=element.label :name="element.name"  v-validate="element.required?'required|email':''" :class="{'form-control input-sm input': true, 'form-control input-sm is-danger': errors.has(element.name) }" :value="element.value" v-on:keyup="onDataChange(element,index,$event.target.value)">
                            </span>
                            <span v-if="element.type === 'paragraph'">
                                <textarea :name="element.name" data-vv-delay="1000" :disabled="showFieldsButtons?true:false" :data-vv-as=element.label v-validate="element.required?'required':''" :class="{'input': true, 'is-danger': errors.has(element.name) }" class="form-control" rows="5" :value="element.value" v-on:keyup="onDataChange(element,index,$event.target.value)"></textarea>
                            </span>
                            <span v-if="element.type === 'date'">
                                <input :name="element.name" data-vv-delay="1000" :disabled="showFieldsButtons?true:false" :data-vv-as=element.label v-validate="element.required?'required':''" :class="{'input': true, 'is-danger': errors.has(element.name) }" type="date" placeholder="Date" class="form-control input-sm" :value="element.value" @change="onDataChange(element,index,$event.target.value)">
                            </span>
                            <span v-if="element.type === 'from date to date'">
                                <input :name="element.fields.Sub_fields[0].name"  :data-vv-as=element.label :disabled="showFieldsButtons?true:false" v-validate="element.required?'required':''" :class="{'input': true, 'is-danger': errors.has(element.fields.Sub_fields[0].name) }" type="date" placeholder="Date" class="form-control input-sm" :value="element.fields.Sub_fields[0].value" @change="onDataChange(element.fields.Sub_fields[0],index,$event.target.value,0,element)">
                                <span v-show="errors.has(element.fields.Sub_fields[0].name)" class="help is-danger">{{ errors.first(element.fields.Sub_fields[0].name) }}</span>
                                <input :name="element.fields.Sub_fields[1].name"  :data-vv-as=element.label :disabled="showFieldsButtons?true:false" v-validate="element.required?'required':''" :class="{'input': true, 'is-danger': errors.has(element.fields.Sub_fields[1].name) }" type="date" placeholder="Date" class="form-control input-sm" :value="element.fields.Sub_fields[1].value" @change="onDataChange(element.fields.Sub_fields[1],index,$event.target.value,1,element)">
                                <span v-show="errors.has(element.fields.Sub_fields[1].name)" class="help is-danger">{{ errors.first(element.fields.Sub_fields[1].name) }}</span>
                            </span>
                            <span v-if="element.type === 'integer'||element.type === 'decimal'|| element.type === 'money' ">
                                <input data-vv-delay="1000" v-validate="element.required?element.type==='integer'?'required|numeric':'required|decimal':''" :data-vv-as=element.label :class="{'input': true, 'is-danger': errors.has(element.name) }" v-bind:name=element.name class="form-control input-sm" type="number" v-bind:placeholder=element.type  :step="element.type!='integer'?0.01:0" :value="element.value" v-on:keyup="onDataChange(element,index,$event.target.value)" :disabled="showFieldsButtons?true:false">
                            </span>
                            <span v-if="element.type === 'full name'||element.type === 'address'">
                                <span v-for="(name_type,indexInner) in element.fields.Sub_fields">
                                    <div v-if="name_type.type=='state'">
                                        <label :class="{'required':element.required}">{{name_type.label}}</label>
                                        <states :name_type="name_type" :index="index" :indexInner="indexInner" :fieldObj="element"></states>
                                    </div>
                                    <div v-else>
                                        <label :class="{'required':element.required}">{{name_type.label}}</label>
                                        <input data-vv-delay="1000" :type="name_type.type" v-validate="element.required && !name_type.value?element.type === 'address'?'required':'required|alpha_spaces':''" :data-vv-as=name_type.label :class="{'input': true, 'is-danger': errors.has(name_type.name) }" v-bind:name=name_type.name v-bind:placeholder=name_type.label class="form-control input-sm"  :value="name_type.value" v-on:keyup="onDataChange(name_type,index,$event.target.value,indexInner,element)" :disabled="showFieldsButtons?true:false">
                                    </div>
                                    <span v-show="errors.has(name_type.name)" class="help is-danger">{{ errors.first(name_type.name) }}</span>
                                </span>
                            </span>
                            <span v-if="element.type === 'choose one'">
                                 <select id="category_select" data-placeholder="Choose a Category" tabindex="1" :name="element.name" class="form-control input-sm" :data-vv-as=element.label v-validate="element.required?'required':''" @change="onDataChange(element,index,$event.target.value)">
                                     <option value="" disabled selected style="display:none;">Select Option:</option>
                                     <option v-for="(options,index1) in element.options" :value="options.id" :selected="options.id==element.value">{{options.value}}</option>
                                </select>
                            </span>
                            <span v-if="element.type === 'multiple options'">
                                <div v-for="(options,index1) in element.options" class="form-control input-sm">
                                    <input type="checkbox" :checked="checkObj(element.value,options)" :value="options" v-bind:name=element.name  v-bind:data-vv-as=element.label v-validate="element.required?'required':''" v-on:click="onDataChange(options,index,$event.target.value,index1,element)" :disabled="showFieldsButtons?true:false">
                                    <label>{{options.value}}</label>
                                </div>
                            </span>
                            <span v-show="errors.has(element.name)" class="help is-danger">{{ errors.first(element.name) }}</span>
                            <fieldbuttons  v-if="showFieldsButtons" v-bind:currentItem=index v-bind:moveUp="moveUp" v-bind:moveDown="moveDown" v-bind:obj="element" v-bind:removeField="removeField" v-bind:editFormField="editFormField"></fieldbuttons><div class="clearfix"></div>
                        </div>
                    </div>
                </li>
            </ul>
            <div  v-if="validate==true && (this.originRoute && this.originRoute.search('voi_additional_questions_forms')>0)" v-bind:style="{'padding-bottom':'15px'}">
                <div class="form-group">
                    <div class="pull-right">
                        <button class="btn btn-green card-6" type="submit"> Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import Vue from "vue";
    import { mapState, mapActions, mapGetters } from 'vuex';
    import fieldbuttons from '../../../../components/vz/vzdemopr/legal/FieldButtons.vue';
    import states from '../../../../components/vz/vzdemopr/legal/States.vue';
    import VeeValidate from 'vee-validate';
    Vue.use(VeeValidate);

    export default{
        data () {
            return {
                selectedForm: null,
                backButton: false,
                answers: [],
                checkedOptions: []
            }
        },
        props: ['formSources','showFieldsButtons','editFormField','validate','value','updateViewForce','originRoute'],
        created() {
        },
        components: {
            fieldbuttons,
            states
        },
        computed: {
            ...mapState({
                formName: state => state.voiQuestionForms.formName,
//                originRoute: state => state.voiQuestionForms.originRoute
            })
        },
        methods: {
            ...mapActions([
                'saveFormAction',
                'setFormSourceObject',
                'setFormField'
            ]),
            getForm() {
                if(this.showFieldsButtons==false) {
                    let self = this;
                    axios.post('getFormById', {
                        FormId: this.$route.params.question_form_id
                    })
                    // Successful Response
                        .then(response => {
                            console.log('Approve The Form');
                            self.selectedForm = response.data;
                            self.answers = JSON.parse(response.data.answers);
//                            console.log(self.answers);
                            self.backButton = true;
//                            console.log(self.selectedForm[0].label);
                            this.$forceUpdate();
                        })
                        // Error
                        .catch(error => {
                            console.error("Error Approving The Form");
                            console.dir(error.response);
                        });
                }
            },
            clearQuestions() {
                console.log("Clear Questions");
            },
            moveUp: function (el) {
                //moving Form field to Upward (swapping)
                var temp=null;
                this.formLenght = this.$store.getters.formSourceLenght;
                if(el>0) {
                    var form = this.$store.state.voiQuestionForms.formSources;
                    for (var i = 0; i < this.formLenght; i++) {
                        if (el == i) {
                            temp = form[i - 1];
                            form[i - 1] = form[i];
                            form[i] = temp;
                        }
                    }
                    //call to store for saving Form
                    this.setFormSourceObject({
                        value:form
                    });
                    //set Form Source object after swapping
                    this.$set(this.formSources,form,true);
                    //render view
                    this.$forceUpdate();
//                    console.log(this.formSources);
                }
//                form=null;
            },
            moveDown: function (el) {
                //moving Form field to downward (swapping)
                var temp=null;
                this.formLenght = this.$store.getters.formSourceLenght;
                if(el<(this.formLenght-1)) {
                    var form = this.$store.state.voiQuestionForms.formSources;
                    for (var i = 0; i < this.formLenght; i++) {
                        if (el == i) {
                            temp = form[i + 1];
                            form[i + 1] = form[i];
                            form[i] = temp;
                        }
                    }
                    //call to store for saving Form
                    this.setFormSourceObject({
                        value: form
                    });
                    //set Form Source object after swapping
                    this.$set(this.formSources, form, true);
                    //render view
                    this.$forceUpdate();
//                    console.log(this.formSources);
                }
            },
            removeField: function (obj) {
                //remove field from FormSource Object
                const found = this.formSources.filter((opt) => { return (opt.id !== obj.id)  });
                this.setFormSourceObject({
                    value:found
                });
            },
            validateForm() {
                //use for front-end validation
                var obj = this.formSources;
                this.$validator.validateAll().then(result => {
                    console.log(result);
                    if (result) {
                        this.submitForm(obj);
                    } else {
                        swal("Validation Fail", '', "error");
                    }
                });
            },
            onDataChange(obj,index,el,indexInner,pObj) {
                //this method will update the value if respective field
                if (pObj && (pObj.type == 'multiple options')) {
                            this.setFormField({
                                el: obj,
                                index: index,
                                value: obj,
                                parentObj: pObj,
                                indexInner: indexInner
                            });
                    } else {
                            this.setFormField({
                                el: obj,
                                index: index,
                                value: el,
                                parentObj: pObj,
                                indexInner: indexInner
                            });
                    }
            },
            checkObj: function(array,element) {
                let localIndex = _.findIndex(array,element);
                if(localIndex>-1) {
                    return true;
                } return false;
            },
            submitForm(obj) {
                //after validation pass send call to back-end code
                console.log(obj);
                let self = this;
                let status=0;
                axios.post('submitFormAnswers', {
                    Question: this.formSources,
                    Answer: obj,
                    FormId: this.$route.params.question_form_id,
                    company:'vzdemopr',
                    application:'legal'
                })
                // Successful Response
                    .then(response => {
                        console.log('Saving the Form');
                        if(response.status==200) {
                            self.status = response.data.status;
                            if (self.status == 201) {
                                swal("Form Submitted", '', "success");
                                self.$router.push('/vzdemopr/legal/voi_additional_questions_forms/');
                            } else if (self.status == 403) {
                                console.log(response.data.errorBag);
                                swal(
                                    'Error',
                                    response.data.errorBag,
                                    'error'
                                );
                            }
                        } else {
                            //back-end response if validation fail
                            swal(
                                'OOPS',
                                'Something went wrong!',
                                'error'
                            );
                        }
                    })
                    // Error
                    .catch(error => {
                        console.error("Error Approving The Form");
                        self.status = 404;
                        console.dir(error.response);
                    });
            }
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
    .is-danger {
        border-color: red;
    }
    input:disabled,textarea:disabled {
        background-color:#FFFFFF;
        cursor: text;
    }

</style>
