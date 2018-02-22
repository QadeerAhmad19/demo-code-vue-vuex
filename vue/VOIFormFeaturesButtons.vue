<template>
    <div>
        <div class="menue-outer">
            <span>
                <button @click="editForm()" type="button" class="btn btn-primary btn-outline btn-sm"><i class="mdi mdi-update"></i> Edit</button>
                <button @click="acceptAlert" type="button" class="btn btn-primary btn-outline btn-sm"><i class="mdi mdi-thumb-up"></i> Approve</button>
                <button @click="denyAlert" type="button" class="btn btn-primary btn-outline btn-sm"><i class="mdi mdi-thumb-down"></i> Deny</button>
                <button @click="assignVendor" type="button" class="btn btn-primary btn-outline btn-sm"><i class="mdi mdi-thumb-down"></i> Assign Vendor</button>
                <button @click="deleteForm()" type="button" class="btn btn-primary btn-outline btn-sm"><i class="mdi mdi-delete"></i> Delete</button>
            </span>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import { mapState, mapActions, mapGetters } from 'vuex';
    import fieldbuttons from '../../../../components/vz/vzdemopr/legal/FieldButtons.vue';
    import formView from '../../../../components/vz/vzdemopr/legal/VOIFormsFields.vue';
    export default{
        data () {
            return {
            }
        },
        props: ['formstatus'],
        created() {

        },
        computed: {

        },
        methods: {
            ...mapActions([
                'approveForm',
                'denyQuestionForm',
                'getFormById',
                'setoriginRoute',
                'deleteFormRow',
                'unassignedForm'
            ]),
            deleteForm(){
                    let self = this;
                    if (this.formstatus == 1 ) {
                        swal({
                                title: "Are you sure you want to Delete this Form?",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#ec6c62",
                                confirmButtonText: "Yes, delete it!",
                                closeOnConfirm: true,
                                closeOnCancel: false
                            },
                            function (isConfirm) {
                                if (isConfirm) {
                                    swal({
                                        title: 'Accepted!',
                                        type: 'success',
                                        text: 'The form has been Deleted.',
                                        confirmButtonColor: '#7cb342'
                                    });
                                    // Post To Delete Form
                                    self.deleteFormRow({
                                        company: 'vzdemopr',
                                        application: 'legal',
                                        level: 1, // Unit,
                                        formId: self.$route.params.question_form_id
                                    });
                                    self.$router.push('/vzdemopr/legal/voi_additional_questions_mgm');
                                } else {
                                    swal("Cancelled", '', "error");
                                }
                            });
                    } else {
                        swal("Not Allowing The Deletion", '', "error");
                    }

            },
            denyAlert: function(){
                    if (this.formstatus == 4) {
                        let self = this;
                        swal({
                                title: "Deny",
                                text: "Do you want to deny the request of this Form?",
                                type: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#f4511e",
                                confirmButtonText: "Yes",
                                cancelButtonText: "No, cancel",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                            function (isConfirm) {
                                if (isConfirm) {
                                    let innerThis = self;
                                    swal({
                                            title: "Denied Reason!",
                                            text: "Leave Some Valid Reasons for Users",
                                            type: "input",
                                            showCancelButton: true,
                                            closeOnConfirm: false,
                                            animation: "slide-from-top",
                                            inputPlaceholder: "Write something"
                                        },
                                        function (inputValue) {
                                            if (inputValue === false) return false;

                                            if (inputValue === "") {
                                                swal.showInputError("You need to write something!");
                                                return false
                                            }
                                            // Post To Deny Form
                                            innerThis.denyQuestionForm({
                                                company: 'vzdemopr',
                                                application: 'legal',
                                                level: 1, // Unit,
                                                status: 3,
                                                denied_reason: inputValue,
                                                formId: innerThis.$route.params.question_form_id
                                            });
                                            swal("Nice!", "You wrote: " + inputValue, "success");
                                            innerThis.$router.push('/vzdemopr/legal/voi_additional_questions_mgm');
                                        });

                                } else {
                                    swal("Cancelled", 'The request was not denied.', "error");
                                }
                            });
                    } else if(this.formstatus == 1){
                        let self = this;
                        swal({
                                title: "Are you sure you want to Delete this Form?",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#ec6c62",
                                confirmButtonText: "Yes, delete it!",
                                closeOnConfirm: true,
                                closeOnCancel: false
                            },
                            function (isConfirm) {
                                if (isConfirm) {
                                    swal({
                                        title: 'Accepted!',
                                        type: 'success',
                                        text: 'The form has been Deleted.',
                                        confirmButtonColor: '#7cb342'
                                    });
                                    self.unassignedForm({
                                        company: 'vzdemopr',
                                        application: 'legal',
                                        level: 1, // Unit,
                                        formId: self.$route.params.question_form_id
                                    });
                                    self.$router.push('/vzdemopr/legal/voi_additional_questions_mgm');
                                } else {
                                    swal("Cancelled", '', "error");
                                }
                            });

                    }
            },
            editForm: function () {
                    if(this.formstatus != 4 && this.formstatus != 2) {
                        this.$router.push('/vzdemopr/legal/editform/' + this.$route.params.question_form_id);
                    } else {
                        swal("Cancelled", 'You Cannot Update this Form.', "error");
                    }
            },
            acceptAlert: function(){
                    if (this.formstatus == 4) {
                        let self = this;
                        swal({
                                title: "Accept",
                                text: "Do you want to accept this Form?",
                                type: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#7cb342",
                                confirmButtonText: "Yes",
                                cancelButtonText: "No, cancel",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                            function (isConfirm) {
                                if (isConfirm) {

                                    // Post To Accept Form
                                    self.approveForm({
                                        company: 'vzdemopr',
                                        application: 'legal',
                                        level: 1, // Unit,
                                        status: 2,
                                        formId: self.$route.params.question_form_id
                                    });
                                    swal("Accepted!", "The request has been Approved.", "success");
                                    self.$router.push('/vzdemopr/legal/voi_additional_questions_mgm');
                                } else {
                                    swal("Cancelled", '', "error");
                                }
                            });
                    } else {
                        swal("This Form is not yet answered!", 'Sorry', "error");
                    }
            },
            assignVendor: function () {
                this.$router.push('/vzdemopr/legal/vendorAssign/'+this.$route.params.question_form_id);
            }
        }
    }

</script>
<style scoped>
    .menue-outer {
        background: #fff;
        width: 100%;
        margin-top: 34px;
        padding: 16px;
    }
</style>
