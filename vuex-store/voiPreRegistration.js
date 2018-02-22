import router from '../../vz_routes';
import Errors from '../../classes/errors';

const   STATUS_PENDING = 1,
        SECTION_STATUS_PENDING = 1, SECTION_STATUS_INCOMPLETE = 2, SECTION_STATUS_SUBMITTED = 3, 
        SECTION_STATUS_APPROVED = 4, SECTION_STATUS_DENIED = 5;

// initial state
const state = {
    identityDetailsStatus: '',
    addressDetailsStatus: '',
    contactDetailsStatus: '',
    businessProfileStatus: '',
    vendorAuthSignaturesStatus: '',
    purposeOfBusinessStatus: '',
    billingProcessStatus: '',
    businessDescriptionStatus: '',
    accountsVAPRStatus: '',
    pepStatus: '',
    referencesStatus: '',
    otherCommentsStatus: '',
    rawVal: '',
    actualDate: '',
    applicationStep: 2,
    isApplicationApproved: false,
    disabled: false,
    agreementDisabled: true,
    proofSelect: '',
    agreeModal: false,
    uploadStatus: 'UPLOAD',
    documentTypes: [
        { text: 'License', id: '1' },
        { text: 'Passport', id: '2' },
    ],
    defaultState: {
        id: 52,
        state_name: 'Puerto Rico',
        abbreviation: 'PR'
    },
    businessRiskType: [
            {text: 'High Risk'},
            {text: 'Moderate Risk'}, 
            {text: 'Low Risk'}, 
        ],
    customerRiskType: [
            {text: 'High Risk'},
            {text: 'Moderate Risk'}, 
            {text: 'Low Risk'}, 
        ],
    BUSINESS_STRUCTURE_GROUPS_2: {
        corporations: [
            6,7,8
        ],
        partnerships: [
            2,3,4,5
        ],
        sole: [
            1,10
        ]
    },
    BUSINESS_STRUCTURE_GROUPS: [
        { 'group':'corporations', 'id':6 },
        { 'group':'corporations', 'id':7 },
        { 'group':'corporations', 'id':8 },

        { 'group':'partnerships', 'id':2 },
        { 'group':'partnerships', 'id':3 },
        { 'group':'partnerships', 'id':4 },
        { 'group':'partnerships', 'id':5 },

        { 'group':'sole', 'id':1 },
        { 'group':'sole', 'id':10 },
        { 'group':'sole', 'id':11 },
    ],
    businessStructureGroup: {
        corporations: false,
        partnerships: false,
        sole: false,
    },
    identityDetailsFormData: {
        radioBusinessType: null,
        taxpayerIdNumberType: '',
        taxpayerIdNumber: '',
        businessType: '',
        legalBusinessName: '',
        dateIncorporation: '',
        placeIncorporation: '',
        businessStructure:'',
        businessStructureOther: '',
        // allBusinessStructures: [
        //     {text: 'Corporate'}, 
        //     {text: 'Partnership'}, 
        //     {text: 'Self-Employed'},
        //     {text: 'DBA'}, 
        //     {text: 'LLC'},  
        //     {text: 'Other'},
        // ],
    },
    addressDetailsFormData: {
        physicalAddress1: '',
        physicalAddress2: '',
        physicalAddressState: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
        physicalAddressZipCode: '', // Test value
        physicalAddressCity: '',
        postalSameAsPhysicalCheckbox: '',
        postalAddress1: '',
        postalAddress2: '',
        postalAddressState: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
        postalAddressZipCode: '',
        postalAddressCity: '',
        addressProof: '',
        addressProofProvided: '',
        addressProofOptions: [
            {text: 'Latest Telephone bill (Only land line)'}, 
            {text: 'Latest Electricity bill'}, 
            {text: 'Latest Bank Account Statement'} 
        ],
    },
    contactDetailsFormData: {
        contactOfficePhone: '',
        contactMobilePhone: '',
        contactFax: '',
        contactEmail: '',
        contactWebsite: '',
    },
    businessProfileFormData: {
        ownerIdNumber: '',
        ownerIdCopy: null,
        presidentIdNumber: '',
        presidentIdCopy: null,
        vicePresidentIdNumber: '',
        vPresidentIdCopy: null,
        directorIdNumber: '',
        directorIdCopy: null,
        treasurerIdNumber: '',
        treasurerIdCopy: null,
        secretaryIdNumber: '',
        secretaryIdCopy: null,
        employedByVAPRCheck: '',
        businessAnnualIncome: '',
        businessYears: '',
        businessEmployees: '',
        businessLocalCheckbox: '',
        businessUSACheckbox: '',
        businessIntCheckbox: '',
        explainBusiness: '',
        memberBoardDirectors: '',
        ownerFirstName: '',
        ownerLastName: '',
        ownerBirthDate: '',
        ownerAddress1: '',
        ownerAddress2: '',
        ownerState: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
        ownerZipCode: '',
        ownerCity: '',
        ownerDocumentType: '1', // Default License type (1)
        
        presidentFirstName: '',
        presidentLastName: '',
        presidentBirthDate: '',
        presidentAddress1: '',
        presidentAddress2: '',
        presidentZipCode: '',
        presidentCity: '',
        presidentState: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
        presidentDocumentType: '1',

        vicePresidentFirstName: '',
        vicePresidentLastName: '',
        vicePresidentBirthDate: '',
        vicePresidentAddress1: '',
        vicePresidentAddress2: '',
        vicePresidentState: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
        vicePresidentZipCode: '',
        vicePresidentCity: '',
        vicePresidentDocumentType: '1',

        directorFirstName: '',
        directorLastName: '',
        directorBirthDate: '',
        directorAddress1: '',
        directorAddress2: '',
        directorState: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
        directorZipCode: '',
        directorCity: '',
        directorDocumentType: '1',

        treasurerFirstName: '',
        treasurerLastName: '',
        treasurerBirthDate: '',
        treasurerAddress1: '',
        treasurerAddress2: '',
        treasurerState: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
        treasurerZipCode: '',
        treasurerCity: '',
        treasurerDocumentType: '1',

        secretaryFirstName: '',
        secretaryLastName: '',
        secretaryBirthDate: '',
        secretaryAddress1: '',
        secretaryAddress2: '',
        secretaryState: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
        secretaryZipCode: '',
        secretaryCity: '',
        secretaryDocumentType: '1',
    },
    vendorAuthSignaturesFormData: {
        authSignature: [
            // firstName: '' ,
            // lastName: '' ,
            // birthDate: '' ,
            // address1: '' ,
            // address2: '' ,
            // state: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'} ,
            // zipCode: '' ,
            // city: '' ,
            // idNumber: '' ,
            // idCopy: '' ,
            // documentType: '1' , // Default License type (1)
        ],
    },
    purposeOfBusinessFormData: {
        businessRiskTypeCheckbox: '',
        customerRiskTypeCheckbox: '',
        purposeRelationship: '',
        funds: '',
    },
    billingProcessFormData: {
        billingProcessExplanation: '',
    },
    businessDescriptionFormData: {
        businessDescription: '',
        businessServices: [],
        productsSummary: '',
        relationshipPurpose: '',
        fundSource: '',
    },
    accountsVAPRFormData: {
        haveOpenAccounts: '',
        accounts: [
            // type: '',
            // label: '',
            // accountNumber: '',
            // creditTranAmount: '',
            // creditTranVolume: '',
            // debitTranAmount: '',
            // debitTranVolume: ''
        ]
    },
    politicallyExposedFormData: {
        isPoliticallyExposed: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        address1: '',
        address2: '',
        state: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
        zipCode: '',
        city: '',
        idCopy: '',
        idNumber: '',
        documentType: '1', // Default License type (1)
    },
    referencesFormData: {
        ref1FirstName: '',
        ref1LastName: '',
        ref1CompanyName: '',
        ref1Position: '',
        ref1Telephone: '',
        ref1Email: '',

        ref2FirstName: '',
        ref2LastName: '',
        ref2CompanyName: '',
        ref2Position: '',
        ref2Telephone: '',
        ref2Email: '',

        ref3FirstName: '',
        ref3LastName: '',
        ref3CompanyName: '',
        ref3Position: '',
        ref3Telephone: '',
        ref3Email: '',
    },
    otherCommentsFormData: {
        otherComments: '',
    },
    errors: {
        visible: false,
        error: new Errors(),
        frontEndError: [],
        // Section Denial Reasons
        identityDetails: {
            visible: false,
            denialReason: ''
        },
        addressDetails: {
            visible: false,
            denialReason: ''
        },
        contactDetails: {
            visible: false,
            denialReason: ''
        },
        businessProfile: {
            visible: false,
            denialReason: ''
        },
        authSignatures: {
            visible: false,
            denialReason: ''
        },
        billingProcess: {
            visible: false,
            denialReason: ''
        },
        businessDescription: {
            visible: false,
            denialReason: ''
        },
        accountsVAPR: {
            visible: false,
            denialReason: ''
        },
        pep: {
            visible: false,
            denialReason: ''
        },
        references: {
            visible: false,
            denialReason: ''
        },
        otherComments: {
            visible: false,
            denialReason: ''
        },
    },
}

// getters
const getters = {
}

// mutations
const mutations = {
    vendorSetTestingData(state) {
        state.identityDetailsFormData.legalBusinessName = 'Name';
        state.identityDetailsFormData.dateIncorporation = '2017-07-12';
        state.identityDetailsFormData.placeIncorporation = 'Place';
        state.identityDetailsFormData.businessType = 'corporate';
        state.identityDetailsFormData.taxpayerIdNumberType = 'corporate';
        state.identityDetailsFormData.taxpayerIdNumber = '12-1234567';
        state.identityDetailsFormData.businessStructure = {
            id: 11,
            type_name: 'Other'
        };
        // state.identityDetailsFormData.businessStructureOther = {
        //     id: 11,
        //     type_name: 'D.B.A'
        // };
        state.addressDetailsFormData.physicalAddress1 = 'Line 1';
        state.addressDetailsFormData.physicalAddress2 = '';
        state.addressDetailsFormData.physicalAddressCity = 'San Juan';
        state.addressDetailsFormData.physicalAddressZipCode = '00918';
        // state.addressDetailsFormData.physicalAddressState = '';

        state.addressDetailsFormData.postalSameAsPhysicalCheckbox = true;
        
        // state.addressDetailsFormData.postalAddress1 = 'Postal Line 1';
        // state.addressDetailsFormData.postalAddress2 = '';
        // state.addressDetailsFormData.postalAddressCity = 'San Juan';
        // state.addressDetailsFormData.postalAddressZipCode = '00915',
        // state.addressDetailsFormData.postalAddressState,
        
        state.contactDetailsFormData.contactOfficePhone = '123-456-7890';
        state.contactDetailsFormData.contactMobilePhone = '234-256-7829';
        state.contactDetailsFormData.contactFax = '';
        state.contactDetailsFormData.contactWebsite = 'http://jofco.net';
        
        // state.businessProfileFormData.employedByVAPRCheck
        state.businessProfileFormData.employedByVAPRCheck = '1';
        state.businessProfileFormData.memberBoardDirectors = '0';
        state.businessProfileFormData.businessAnnualIncome = accounting.formatMoney(15000); // Assign Annual Income and format it as financial number
        state.businessProfileFormData.businessYears = accounting.formatNumber(5, { precision : 0 }); // Assign as number
        state.businessProfileFormData.businessEmployees = accounting.formatNumber(150, { precision : 0 }); // Assign as number
        state.businessProfileFormData.businessLocalCheckbox = true;
        // state.businessProfileFormData.businessUSACheckbox = '';
        // state.businessProfileFormData.businessIntCheckbox = '';
        // state.businessProfileFormData.explainBusiness = '';
        
        state.businessProfileFormData.ownerFirstName = 'Owner';
        state.businessProfileFormData.ownerLastName = 'Owner Last';
        state.businessProfileFormData.ownerBirthDate = '2000-05-01';
        state.businessProfileFormData.ownerDocumentType = '1';
        state.businessProfileFormData.ownerIdNumber = '123456789';
        state.businessProfileFormData.ownerAddress1 = 'Owner Address 1';
        state.businessProfileFormData.ownerAddress2 = '';
        state.businessProfileFormData.ownerCity = 'Carolina';
        // state.businessProfileFormData.ownerState = '';
        state.businessProfileFormData.ownerZipCode = '00912';
        
        // Vendor Authorized Officer Signatures
        state.vendorAuthSignaturesFormData.authSignature.push({
            firstName: 'Joe',
            lastName: 'Martinez',
            birthDate: '2000-07-01',
            address1: 'Auth Address 1',
            zipCode: '00928',
            city: 'Bayamon',
            idNumber: '23923093',
            state: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
            idCopy: '',
            documentType: '1', // Default License type (1)
        });

        state.vendorAuthSignaturesFormData.authSignature.push({
            firstName: 'Fisher',
            lastName: 'Ioming',
            birthDate: '1985-09-14',
            address1: 'Auth Address 1, 393',
            zipCode: '00728',
            city: 'Caguas',
            idNumber: 'CD5236F21',
            state: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
            idCopy: '',
            documentType: '2', // Default License type (1)
        });

        state.businessDescriptionFormData.businessDescription = 'Business Description';
        state.businessDescriptionFormData.businessServices = {value: 2, service_name: 'Advertising Services'};
        state.businessDescriptionFormData.productsSummary = 'Services summary';
        state.businessDescriptionFormData.relationshipPurpose = 'Relationship Purpose';
        state.businessDescriptionFormData.fundSource = 'The funds will come from this place';
        
        state.accountsVAPRFormData.haveOpenAccounts = '1';

        state.accountsVAPRFormData.accounts.push({
            type: 1,
            label: 'Permanent Shares-00',
            accountNumber: '39203CD3',
            creditTranAmount: accounting.formatMoney('12000'),
            creditTranVolume: accounting.formatNumber('83900', { precision : 0 }),
            debitTranAmount: accounting.formatMoney('30000'),
            debitTranVolume: accounting.formatNumber('20', { precision : 0 }),
        });

        state.accountsVAPRFormData.accounts.push({
            type: 2,
            label: 'Draft Shares-00',
            accountNumber: '16DC56',
            creditTranAmount: '',
            creditTranVolume: '',
            debitTranAmount: accounting.formatMoney('52000'),
            debitTranVolume: accounting.formatNumber('2011', { precision : 0 }),
        });

        // state.accountsVAPRFormData.accounts[0].type = '1';
        // state.accountsVAPRFormData.accounts[0].label = 'Permanent Shares-00';
        // state.accountsVAPRFormData.accounts[0].accountNumber = '39203CD3';
        // state.accountsVAPRFormData.accounts[0].creditTranAmount = '12000';
        // state.accountsVAPRFormData.accounts[0].creditTranVolume = '839';
        // state.accountsVAPRFormData.accounts[0].debitTranAmount = '30000';
        // state.accountsVAPRFormData.accounts[0].debitTranVolume = '20';

        state.politicallyExposedFormData.isPoliticallyExposed = '1';
        state.politicallyExposedFormData.firstName = 'Nilda';
        state.politicallyExposedFormData.lastName = 'Negron';
        state.politicallyExposedFormData.birthDate = '1950-11-02';
        state.politicallyExposedFormData.address1 = 'Exposed Line 1';
        state.politicallyExposedFormData.address2 = 'Exposed Line 2';
        // state.politicallyExposedFormData.state = '',
        state.politicallyExposedFormData.zipCode = '00672';
        state.politicallyExposedFormData.city = 'Hormiguero';
        state.politicallyExposedFormData.idNumber = 'CSD033933';
        state.politicallyExposedFormData.documentType = '2';
        
        state.referencesFormData.ref1FirstName = 'Joe';
        state.referencesFormData.ref1LastName = 'Pierce';
        state.referencesFormData.ref1CompanyName = 'Nike';
        state.referencesFormData.ref1Position = 'President';
        state.referencesFormData.ref1Telephone = '939-292-1222';
        state.referencesFormData.ref1Email = 'joe@example.com';

        state.referencesFormData.ref2FirstName = 'Earving';
        state.referencesFormData.ref2LastName = 'Johnson';
        state.referencesFormData.ref2CompanyName = 'Lakers';
        state.referencesFormData.ref2Position = 'General Manager';
        state.referencesFormData.ref2Telephone = '787-292-2222';
        state.referencesFormData.ref2Email = 'magic@example.com';

        state.referencesFormData.ref3FirstName = 'Ivar';
        state.referencesFormData.ref3LastName = 'Black';
        state.referencesFormData.ref3CompanyName = 'CISCO';
        state.referencesFormData.ref3Position = 'Vice President';
        state.referencesFormData.ref3Telephone = '932-292-0032';
        state.referencesFormData.ref3Email = 'ivar@example.com';
                
    },
    // Errors
    setErrorsVisibility(state, value) {
        state.errors.visible = value;
    },
    recordError(state, value) {
        console.log(value,'Error value to be recorded');
        // state.errors.visible = value;
        state.errors.error.record(value);
    },
    recordFrontEndError(state, value) {
        console.group('recordFrondEdError');
        console.log(value,'Front End Error value to be recorded',value);
        for (let key of Object.keys(value)) {
            console.log(key,'key');
            console.log(value[key], 'Error Value');
            // console.log(value[key].msg, 'Error Value message');
            state.errors.frontEndError.push(value[key].msg);
        }
        console.groupEnd();
    },
    clearFrontEndErrors(state) {
        state.errors.frontEndError = [];
    },
    // Denial Reason
    setIdentityDetailsSectionDenialReason(state, value) {
        state.errors.identityDetails.denialReason = value;
    },
    setBusinessStructureGroup(state, value) {
        if(value === 'corporations' ){
            state.businessStructureGroup.corporations = true;
            state.businessStructureGroup.partnerships = false;
            state.businessStructureGroup.sole = false;
        } else if(value === 'partnerships' ){
            state.businessStructureGroup.corporations = false;
            state.businessStructureGroup.partnerships = true;
            state.businessStructureGroup.sole = false;
        } else if(value === 'sole' ){
            state.businessStructureGroup.corporations = false;
            state.businessStructureGroup.partnerships = false;
            state.businessStructureGroup.sole = true;
        } else {
            state.businessStructureGroup.corporations = false;
            state.businessStructureGroup.partnerships = false;
            state.businessStructureGroup.sole = false;
        }
    },
    setAddressDetailsSectionDenialReason(state, value) {
        state.errors.addressDetails.denialReason = value;
    },
    setContactDetailsSectionDenialReason(state, value) {
        state.errors.contactDetails.denialReason = value;
    },
    setBusinessProfileSectionDenialReason(state, value) {
        state.errors.businessProfile.denialReason = value;
    },
    setAuthSignaturesSectionDenialReason(state, value) {
        state.errors.authSignatures.denialReason = value;
    },
    setBillingProcessSectionDenialReason(state, value) {
        state.errors.billingProcess.denialReason = value;
    },
    setBusinessDescriptionSectionDenialReason(state, value) {
        state.errors.businessDescription.denialReason = value;
    },
    setAccountsVAPRSectionDenialReason(state, value) {
        state.errors.accountsVAPR.denialReason = value;
    },
    setPepSectionDenialReason(state, value) {
        state.errors.pep.denialReason = value;
    },
    setReferencesSectionDenialReason(state, value) {
        state.errors.references.denialReason = value;
    },
    setOtherCommentsSectionDenialReason(state, value) {
        state.errors.otherComments.denialReason = value;
    },
    
    showIdentityDetailsSectionErrors(state) {
        state.errors.identityDetails.visible = true;
    },
    showAddressDetailsSectionErrors(state) {
        state.errors.addressDetails.visible = true;
    },
    showContactDetailsSectionErrors(state) {
        state.errors.contactDetails.visible = true;
    },
    showBusinessProfileSectionErrors(state) {
        state.errors.businessProfile.visible = true;
    },
    showAuthSignaturesSectionErrors(state) {
        state.errors.authSignatures.visible = true;
    },
    showBillingProcessSectionErrors(state) {
        state.errors.billingProcess.visible = true;
    },
    showBusinessDescriptionSectionErrors(state) {
        state.errors.businessDescription.visible = true;
    },
    showAccountsVAPRSectionErrors(state) {
        state.errors.accountsVAPR.visible = true;
    },
    showPepSectionErrors(state) {
        state.errors.pep.visible = true;
    },
    showReferencesSectionErrors(state) {
        state.errors.references.visible = true;
    },
    showOtherCommentsSectionErrors(state) {
        state.errors.otherComments.visible = true;
    },

    hideIdentityDetailsSectionErrors(state) {
        state.errors.identityDetails.visible = false;
    },
    hideAddressDetailsSectionErrors(state) {
        state.errors.addressDetails.visible = false;
    },
    hideContactDetailsSectionErrors(state) {
        state.errors.contactDetails.visible = false;
    },
    hideBusinessProfileSectionErrors(state) {
        state.errors.businessProfile.visible = false;
    },
    hideAuthSignaturesSectionErrors(state) {
        state.errors.authSignatures.visible = false;
    },
    hideBillingProcessSectionErrors(state) {
        state.errors.billingProcess.visible = false;
    },
    hideBusinessDescriptionSectionErrors(state) {
        state.errors.businessDescription.visible = false;
    },
    hideAccountsVAPRSectionErrors(state) {
        state.errors.accountsVAPR.visible = false;
    },
    hidePepSectionErrors(state) {
        state.errors.pep.visible = false;
    },
    hideReferencesSectionErrors(state) {
        state.errors.references.visible = false;
    },
    hideOtherCommentsSectionErrors(state) {
        state.errors.otherComments.visible = false;
    },
    
    // Unformat Money Values
    unformatAccountsValues(state) {
        state.accountsVAPRFormData.accounts;
        for (let key of Object.keys(state.accountsVAPRFormData.accounts)) {
            console.log(key);
            console.log(accounting.unformat(state.accountsVAPRFormData.accounts[key].creditTranAmount),'Credit Transaction');
            
            state.accountsVAPRFormData.accounts[key].creditTranAmount = accounting.unformat(state.accountsVAPRFormData.accounts[key].creditTranAmount);

        }
    },
    setPostalAddressLine1(state, val) {
        state.addressDetailsFormData.postalAddress1 = val;
    },
    // Identity details
    updateVOIRegistrationVendorAgreeModal(state, value) {
        state.agreeModal = value;      
    },
    // Identity details
    updateVOIRegistrationVendorLegalBusinessName(state, value) {
        state.identityDetailsFormData.legalBusinessName = value;      
    },
    updateVOIRegistrationVendorDateIncorporation(state, value) {
        state.identityDetailsFormData.dateIncorporation = value;      
    },
    updateVOIRegistrationVendorPlaceIncorporation(state, value) {
        state.identityDetailsFormData.placeIncorporation = value;      
    },
    updateVOIRegistrationVendorBusinessType(state, value) {
        state.identityDetailsFormData.businessType = value;      
    },
    updateVOIRegistrationVendorTaxpayerIdNumberType(state, value) {
        state.identityDetailsFormData.taxpayerIdNumberType = value;      
    },
    updateVOIRegistrationVendorTaxpayerIdNumber(state, value) {
        state.identityDetailsFormData.taxpayerIdNumber = value;      
    },
    updateVOIRegistrationVendorBusinessStructure(state, value) {
        state.identityDetailsFormData.businessStructure = value;      
    },
    updateVOIRegistrationVendorBusinessStructureOther(state, value) {
        state.identityDetailsFormData.businessStructureOther = value;      
    },
    
    // Address Details Form Data
    updateVOIRegistrationVendorAddressPhysicalLine1(state, value) {
        state.addressDetailsFormData.physicalAddress1 = value;      
    },
    updateVOIRegistrationVendorAddressPhysicalLine2(state, value) {
        state.addressDetailsFormData.physicalAddress2 = value;      
    },
    updateVOIRegistrationVendorAddressPhysicalCity(state, value) {
        state.addressDetailsFormData.physicalAddressCity = value;      
    },
    updateVOIRegistrationVendorAddressPhysicalZipCode(state, value) {
        state.addressDetailsFormData.physicalAddressZipCode = value;
    },
    updateVOIRegistrationVendorAddressPhysicalState(state, value) {
        state.addressDetailsFormData.physicalAddressState = value;
    },    
    updateVOIRegistrationVendorAddressSetPostalSameAsPhysical(state, value) {
        state.addressDetailsFormData.postalSameAsPhysicalCheckbox = value;      
    },
    updateVOIRegistrationVendorAddressPostalAddressLine1(state, value) {
        state.addressDetailsFormData.postalAddress1 = value;      
    },
    updateVOIRegistrationVendorAddressPostalAddressLine2(state, value) {
        state.addressDetailsFormData.postalAddress2 = value;      
    },
    updateVOIRegistrationVendorAddressPostalCity(state, value) {
        state.addressDetailsFormData.postalAddressCity = value;      
    },
    updateVOIRegistrationVendorAddressPostalState(state, value) {
        state.addressDetailsFormData.postalAddressState = value;
    },
    updateVOIRegistrationVendorAddressPostalZipCode(state, value) {
        state.addressDetailsFormData.postalAddressZipCode = value;
    },
    
    // Contact Details Form Data
    updateVOIRegistrationVendorContactOfficePhone(state, value) {
        state.contactDetailsFormData.contactOfficePhone = value;      
    },
    updateVOIRegistrationVendorContactMobilePhone(state, value) {
        state.contactDetailsFormData.contactMobilePhone = value;      
    },
    updateVOIRegistrationVendorContactFax(state, value) {
        state.contactDetailsFormData.contactFax = value;      
    },
    updateVOIRegistrationVendorContactEmail(state, value) {
        state.contactDetailsFormData.contactEmail = value;      
    },
    updateVOIRegistrationVendorContactWebsite(state, value) {
        state.contactDetailsFormData.contactWebsite = value;      
    },
    
    // Business Profile Form Data
    updateVOIRegistrationVendorBusinessProfileEmploymentCheck(state, value) {
        state.businessProfileFormData.employedByVAPRCheck = value;      
    },
    updateVOIRegistrationVendorBusinessProfileVAPRMemberCheck(state, value) {
        state.businessProfileFormData.memberBoardDirectors = value;      
    },
    updateVOIRegistrationVendorBusinessProfileAnnualIncome(state, value) {
        state.businessProfileFormData.businessAnnualIncome = value;      
    },
    updateVOIRegistrationVendorBusinessProfileBusinessYears(state, value) {
        state.businessProfileFormData.businessYears = value;      
    },
    updateVOIRegistrationVendorBusinessProfileBusinessEmployees(state, value) {
        state.businessProfileFormData.businessEmployees = value;      
    },
    updateVOIRegistrationVendorBusinessProfileExplainBusiness(state, value) {
        state.businessProfileFormData.explainBusiness = value;      
    },
    updateVOIRegistrationVendorBusinessProfileBusinessLocalCheck(state, value) {
        state.businessProfileFormData.businessLocalCheckbox = value;      
    },
    updateVOIRegistrationVendorBusinessProfileBusinessUSACheck(state, value) {
        state.businessProfileFormData.businessUSACheckbox = value;      
    },
    updateVOIRegistrationVendorBusinessProfileBusinessIntCheck(state, value) {
        state.businessProfileFormData.businessIntCheckbox = value;      
    }, 
        
    updateVOIRegistrationVendorOwnerAddressPhysicalLine1(state, value) {
        state.businessProfileFormData.ownerAddress1 = value;
    },
    updateVOIRegistrationVendorPresidentAddressPhysicalLine1(state, value) {
        state.businessProfileFormData.presidentAddress1 = value;
    },
    updateVOIRegistrationVendorVicePresidentAddressPhysicalLine1(state, value) {
        state.businessProfileFormData.vicePresidentAddress1 = value;
    },
    updateVOIRegistrationVendorDirectorAddressPhysicalLine1(state, value) {
        state.businessProfileFormData.directorAddress1 = value;
    },
    updateVOIRegistrationVendorTreasurerAddressPhysicalLine1(state, value) {
        state.businessProfileFormData.treasurerAddress1 = value;
    },
    updateVOIRegistrationVendorSecretaryAddressPhysicalLine1(state, value) {
        state.businessProfileFormData.secretaryAddress1 = value;
    },
    updateVOIRegistrationVendorOwnerAddressPhysicalLine2(state, value) {
        state.businessProfileFormData.ownerAddress2 = value;
    },
    updateVOIRegistrationVendorPresidentAddressPhysicalLine2(state, value) {
        state.businessProfileFormData.presidentAddress2 = value;
    },
    updateVOIRegistrationVendorVicePresidentAddressPhysicalLine2(state, value) {
        state.businessProfileFormData.vicePresidentAddress2 = value;
    },
    updateVOIRegistrationVendorDirectorAddressPhysicalLine2(state, value) {
        state.businessProfileFormData.directorAddress2 = value;
    },
    updateVOIRegistrationVendorTreasurerAddressPhysicalLine2(state, value) {
        state.businessProfileFormData.treasurerAddress2 = value;
    },
    updateVOIRegistrationVendorSecretaryAddressPhysicalLine2(state, value) {
        state.businessProfileFormData.secretaryAddress2 = value;
    },
    updateVOIRegistrationVendorOwnerAddressPhysicalCity(state, value) {
        state.businessProfileFormData.ownerCity = value;
    },
    updateVOIRegistrationVendorOwnerAddressPhysicalZipCode(state, value) {
        state.businessProfileFormData.ownerZipCode = value;
    },
    updateVOIRegistrationVendorOwnerAddressPhysicalState(state, value) {
        state.businessProfileFormData.ownerState = value;
    },
    updateVOIRegistrationVendorOwnerFirstName(state, value) {
        state.businessProfileFormData.ownerFirstName = value;
    },
    updateVOIRegistrationVendorOwnerLastName(state, value) {
        state.businessProfileFormData.ownerLastName = value;
    },
    updateVOIRegistrationVendorOwnerBirthDate(state, value) {
        state.businessProfileFormData.ownerBirthDate = value;
    },
    updateVOIRegistrationVendorPresidentFirstName(state, value) {
        state.businessProfileFormData.presidentFirstName = value;
    },
    updateVOIRegistrationVendorPresidentLastName(state, value) {
        state.businessProfileFormData.presidentLastName = value;
    },
    updateVOIRegistrationVendorPresidentBirthDate(state, value) {
        state.businessProfileFormData.presidentBirthDate = value;
    },
    updateVOIRegistrationVendorVicePresidentFirstName(state, value) {
        state.businessProfileFormData.vicePresidentFirstName = value;
    },
    updateVOIRegistrationVendorVicePresidentLastName(state, value) {
        state.businessProfileFormData.vicePresidentLastName = value;
    },
    updateVOIRegistrationVendorVicePresidentBirthDate(state, value) {
        state.businessProfileFormData.vicePresidentBirthDate = value;
    },
    updateVOIRegistrationVendorDirectorFirstName(state, value) {
        state.businessProfileFormData.directorFirstName = value;
    },
    updateVOIRegistrationVendorDirectorLastName(state, value) {
        state.businessProfileFormData.directorLastName = value;
    },
    updateVOIRegistrationVendorDirectorBirthDate(state, value) {
        state.businessProfileFormData.directorBirthDate = value;
    },
    updateVOIRegistrationVendorTreasurerFirstName(state, value) {
        state.businessProfileFormData.treasurerFirstName = value;
    },
    updateVOIRegistrationVendorTreasurerLastName(state, value) {
        state.businessProfileFormData.treasurerLastName = value;
    },
    updateVOIRegistrationVendorTreasurerBirthDate(state, value) {
        state.businessProfileFormData.treasurerBirthDate = value;
    },
    updateVOIRegistrationVendorSecretaryFirstName(state, value) {
        state.businessProfileFormData.secretaryFirstName = value;
    },
    updateVOIRegistrationVendorSecretaryLastName(state, value) {
        state.businessProfileFormData.secretaryLastName = value;
    },
    updateVOIRegistrationVendorSecretaryBirthDate(state, value) {
        state.businessProfileFormData.secretaryBirthDate = value;
    },
    updateVOIRegistrationVendorOwnerDocumentType(state, value) {
        state.businessProfileFormData.ownerDocumentType = value;
    },
    updateVOIRegistrationVendorPresidentDocumentType(state, value) {
        state.businessProfileFormData.presidentDocumentType = value;
    },
    updateVOIRegistrationVendorVicePresidentDocumentType(state, value) {
        state.businessProfileFormData.vicePresidentDocumentType = value;
    },
    updateVOIRegistrationVendorDirectorDocumentType(state, value) {
        state.businessProfileFormData.directorDocumentType = value;
    },
    updateVOIRegistrationVendorTreasurerDocumentType(state, value) {
        state.businessProfileFormData.treasurerDocumentType = value;
    },
    updateVOIRegistrationVendorSecretaryDocumentType(state, value) {
        state.businessProfileFormData.secretaryDocumentType = value;
    },
    updateVOIRegistrationVendorOwnerIdNumber(state, value) {
        state.businessProfileFormData.ownerIdNumber = value;
    },
    updateVOIRegistrationVendorPresidentIdNumber(state, value) {
        state.businessProfileFormData.presidentIdNumber = value;
    },
    updateVOIRegistrationVendorVicePresidentIdNumber(state, value) {
        state.businessProfileFormData.vicePresidentIdNumber = value;
    },
    updateVOIRegistrationVendorDirectorIdNumber(state, value) {
        state.businessProfileFormData.directorIdNumber = value;
    },
    updateVOIRegistrationVendorTreasurerIdNumber(state, value) {
        state.businessProfileFormData.treasurerIdNumber = value;
    },
    updateVOIRegistrationVendorSecretaryIdNumber(state, value) {
        state.businessProfileFormData.secretaryIdNumber = value;
    },
    updateVOIRegistrationVendorPresidentAddressPhysicalState(state, value) {
        state.businessProfileFormData.presidentState = value;
    },
    updateVOIRegistrationVendorVicePresidentAddressPhysicalState(state, value) {
        state.businessProfileFormData.vicePresidentState = value;
    },
    updateVOIRegistrationVendorDirectorAddressPhysicalState(state, value) {
        state.businessProfileFormData.directorState = value;
    },
    updateVOIRegistrationVendorTreasurertAddressPhysicalState(state, value) {
        state.businessProfileFormData.treasurertState = value;
    },
    updateVOIRegistrationVendorSecretaryAddressPhysicalState(state, value) {
        state.businessProfileFormData.secretaryState = value;
    },
    updateVOIRegistrationVendorPresidentAddressPhysicalZipCode(state, value) {
        state.businessProfileFormData.presidentZipCode = value;
    },
    updateVOIRegistrationVendorVicePresidentAddressPhysicalZipCode(state, value) {
        state.businessProfileFormData.vicePresidentZipCode = value;
    },
    updateVOIRegistrationVendorDirectorAddressPhysicalZipCode(state, value) {
        state.businessProfileFormData.directorZipCode = value;
    },
    updateVOIRegistrationVendorTreasurerAddressPhysicalZipCode(state, value) {
        state.businessProfileFormData.treasurerZipCode = value;
    },
    updateVOIRegistrationVendorSecretaryAddressPhysicalZipCode(state, value) {
        state.businessProfileFormData.secretaryZipCode = value;
    },
    updateVOIRegistrationVendorPresidentAddressPhysicalCity(state, value) {
        state.businessProfileFormData.presidentCity = value;
    },
    updateVOIRegistrationVendorVicePresidentAddressPhysicalCity(state, value) {
        state.businessProfileFormData.vicePresidentCity = value;
    },
    updateVOIRegistrationVendorDirectorAddressPhysicalCity(state, value) {
        state.businessProfileFormData.directorCity = value;
    },
    updateVOIRegistrationVendorTreasurerAddressPhysicalCity(state, value) {
        state.businessProfileFormData.treasurerCity = value;
    },
    updateVOIRegistrationVendorSecretaryAddressPhysicalCity(state, value) {
        state.businessProfileFormData.secretaryCity = value;
    },
    updateVOIRegistrationVendorBillingProcessExplanation(state, value) {
        state.billingProcessFormData.billingProcessExplanation = value;
    },
    updateVOIRegistrationVendorBusinessDescriptionExplanation(state, value) {
        state.businessDescriptionFormData.businessDescription = value;
    },
    updateVOIRegistrationVendorBusinessDescriptionServices(state, value) {
        state.businessDescriptionFormData.businessServices = value;
    },
    updateVOIRegistrationVendorBusinessDescriptionProductsSummary(state, value) {
        state.businessDescriptionFormData.productsSummary = value;
    },
    updateVOIRegistrationVendorBusinessDescriptionRelationshipPurpose(state, value) {
        state.businessDescriptionFormData.relationshipPurpose = value;
    },
    updateVOIRegistrationVendorBusinessDescriptionFundSource(state, value) {
        state.businessDescriptionFormData.fundSource = value;
    },
    
    updateVOIRegistrationVendorOpenAccountsCheck(state, value) {
        state.accountsVAPRFormData.haveOpenAccounts = value;
    },
    
    updateVOIRegistrationVendorPoliticallyExposedCheck(state, value) {
        state.politicallyExposedFormData.isPoliticallyExposed = value;
    },
    updateVOIRegistrationVendorPoliticalPersonFirstName(state, value) {
        state.politicallyExposedFormData.firstName = value;
    },
    updateVOIRegistrationVendorPoliticalPersonLastName(state, value) {
        state.politicallyExposedFormData.lastName = value;
    },
    updateVOIRegistrationVendorPoliticalPersonBirthDate(state, value) {
        state.politicallyExposedFormData.birthDate = value;
    },
    updateVOIRegistrationVendorPoliticalPersonAddress1(state, value) {
        state.politicallyExposedFormData.address1 = value;
    },
    updateVOIRegistrationVendorPoliticalPersonAddress2(state, value) {
        state.politicallyExposedFormData.address2 = value;
    },
    updateVOIRegistrationVendorPoliticalPersonCity(state, value) {
        state.politicallyExposedFormData.city = value;
    },
    updateVOIRegistrationVendorPoliticalPersonState(state, value) {
        state.politicallyExposedFormData.state = value;
    },
    updateVOIRegistrationVendorPoliticalPersonZipCode(state, value) {
        state.politicallyExposedFormData.zipCode = value;
    },
    updateVOIRegistrationVendorPoliticalPersonIdNumber(state, value) {
        state.politicallyExposedFormData.idNumber = value;
    },
    updateVOIRegistrationVendorPoliticalPersonIdCopy(state, value) {
        state.politicallyExposedFormData.idCopy = value;
    },
    updateVOIRegistrationVendorPoliticalPersonDocumentType(state, value) {
        state.politicallyExposedFormData.documentType = value;
    },
    updateVOIRegistrationVendorOtherCommentsExplanation(state, value) {
        state.otherCommentsFormData.otherComments = value;
    },

    updateVOIRegistrationVendorReferencesFirstName1(state, value) {
        state.referencesFormData.ref1FirstName = value;
    },
    updateVOIRegistrationVendorReferencesLastName1(state, value) {
        state.referencesFormData.ref1LastName = value;
    },
    updateVOIRegistrationVendorReferencesCompanyName1(state, value) {
        state.referencesFormData.ref1CompanyName = value;
    },
    updateVOIRegistrationVendorReferencesPosition1(state, value) {
        state.referencesFormData.ref1Position = value;
    },
    updateVOIRegistrationVendorReferencesTelephone1(state, value) {
        state.referencesFormData.ref1Telephone = value;
    },
    updateVOIRegistrationVendorReferencesEmail1(state, value) {
        state.referencesFormData.ref1Email = value;
    },
    updateVOIRegistrationVendorReferencesFirstName2(state, value) {
        state.referencesFormData.ref2FirstName = value;
    },
    updateVOIRegistrationVendorReferencesLastName2(state, value) {
        state.referencesFormData.ref2LastName = value;
    },
    updateVOIRegistrationVendorReferencesCompanyName2(state, value) {
        state.referencesFormData.ref2CompanyName = value;
    },
    updateVOIRegistrationVendorReferencesPosition2(state, value) {
        state.referencesFormData.ref2Position = value;
    },
    updateVOIRegistrationVendorReferencesTelephone2(state, value) {
        state.referencesFormData.ref2Telephone = value;
    },
    updateVOIRegistrationVendorReferencesEmail2(state, value) {
        state.referencesFormData.ref2Email = value;
    },
    updateVOIRegistrationVendorReferencesFirstName3(state, value) {
        state.referencesFormData.ref3FirstName = value;
    },
    updateVOIRegistrationVendorReferencesLastName3(state, value) {
        state.referencesFormData.ref3LastName = value;
    },
    updateVOIRegistrationVendorReferencesCompanyName3(state, value) {
        state.referencesFormData.ref3CompanyName = value;
    },
    updateVOIRegistrationVendorReferencesPosition3(state, value) {
        state.referencesFormData.ref3Position = value;
    },
    updateVOIRegistrationVendorReferencesTelephone3(state, value) {
        state.referencesFormData.ref3Telephone = value;
    },
    updateVOIRegistrationVendorReferencesEmail3(state, value) {
        state.referencesFormData.ref3Email = value;
    },

    vendorSetPostalSameAsPhysical(state) {
        // Toggle Disable field
        state.disabled = !state.disabled;
    },
    //Disable I Agree submit button until i agree checkmark is checked
    vendorToggleDisable(state) {
        // Toggle Disable field
        state.agreementDisabled = !state.agreementDisabled;
    },
    //Check Id copy checkmark when user upload Id Copy
    vendorCopyIncluded(state, val) {
        document.getElementById(val).setAttribute('checked', 'true');
    },
    //BTN Add Vendor Authorized Officers Signature
    vendorAddSigner: function(state) {
        console.warn('Vendor Add signer');
        state.vendorAuthSignaturesFormData.authSignature.push({
            firstName: '',
            lastName: '',
            birthDate: '',
            address1: '',
            address2: '',
            state: {id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'},
            zipCode: '',
            city: '',
            idNumber: '',
            idCopy: '',
            documentType: '1', // Default License type (1)
        });
    },
    addVAPRAccount(state, payload) {
        state.accountsVAPRFormData.accounts.push({
            type: payload.type,
            label: payload.label,
            accountNumber: '',
            creditTranAmount: '',
            creditTranVolume: '',
            debitTranAmount: '',
            debitTranVolume: '',
        });
    },
    // Delete Vendor Authorized Officers Signature
    vendorDeleteSignature: function(state, val) {
        state.vendorAuthSignaturesFormData.authSignature.splice(val, 1)
    },
    // Delete Account with VAPR
    vendorDeleteAccount: function(state, val) {
        state.accountsVAPRFormData.accounts.splice(val, 1)
    },
    // Add Account with VAPR
    vendorAddAccount: function(state, val) {
        state.accountsVAPRFormData.accounts.push({
            type: val.type,
            label: val.label,
            accountNumber: '',
            creditTranAmount: '',
            creditTranVolume: '',
            debitTranAmount: '',
            debitTranVolume: ''
        });
    },
    // Activate the submit button after the user uploads a document
    vendorAllowSubmit(state, val) {
        document.getElementById(val).removeAttribute('disabled');
    },
    
}

// Section Status ICons
function regSectionStatusIcons(val) {
    // console.warn('Status',val.status);
    switch (parseInt(val.status)) {
        // Incomplete Status
        case 2:
            return {
                "mdi mdi-alert-circle-outline mdi-18px text-orange" : true
            };
        // Submitted Status
        case 3:
            return {
                "mdi mdi-arrow-right-bold-circle-outline mdi-18px text-blue" : true
            };
        // Approved Status
        case 4:
            return {
                "mdi mdi-check-circle-outline mdi-18px text-green" : true
            };
        // Denied Status
        case 5:
            return {
                "mdi mdi-close-circle-outline mdi-18px text-red" : true
            };
        // Default Status (Pending)
        default:
        case 1:
            return {
                "mdi mdi-checkbox-blank-circle-outline mdi-18px text-gray" : true
            };
    }
}

// actions
const actions = {
    
    /**
     * Get Vendor Registration Application Section Statuses and Set Icons and Notifications by each Section
     */
    setVOIVendorRegistrationApplicationSectionStatuses({ commit, state }, payload) {
        
        axios.post('getVOIVendorRegistrationApplicationFormSectionStatuses', {
            company: payload.company,
            application: payload.application,
        })
        // Successful Response
        .then(response => {
            console.group('VendorApplicationStatusesBySection');
            console.log('Results from DB',response.data);
            state.identityDetailsStatus = regSectionStatusIcons({
                status: response.data.vrai_voi_vendor_registration_application_status,
            });
            state.addressDetailsStatus = regSectionStatusIcons({
                status: response.data.vraa_voi_vendor_registration_application_status,
            });
            state.contactDetailsStatus = regSectionStatusIcons({
                status: response.data.vracd_voi_vendor_registration_application_status,
            });
            state.businessProfileStatus = regSectionStatusIcons({
                status: response.data.vrab_voi_vendor_registration_application_status,
            });
            state.vendorAuthSignaturesStatus = regSectionStatusIcons({
                status: response.data.vraav_voi_vendor_registration_application_status,
            });
            state.billingProcessStatus = regSectionStatusIcons({
                status: response.data.vrabp_voi_vendor_registration_application_status,
            });
            state.businessDescriptionStatus = regSectionStatusIcons({
                status: response.data.vrabd_voi_vendor_registration_application_status,
            });
            state.accountsVAPRStatus = regSectionStatusIcons({
                status: response.data.vraact_voi_vendor_registration_application_status,
            });
            state.pepStatus = regSectionStatusIcons({
                status: response.data.vrape_voi_vendor_registration_application_status,
            });
            state.referencesStatus = regSectionStatusIcons({
                status: response.data.vrar_voi_vendor_registration_application_status,
            });
            state.otherCommentsStatus = regSectionStatusIcons({
                status: response.data.vrac_voi_vendor_registration_application_status,
            });
            
            // Show Notification Errors on Each Section Depending on Status of the Section
            if(response.data.vrai_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setIdentityDetailsSectionDenialReason',response.data.vrai_denial_reason);
                commit('showIdentityDetailsSectionErrors');
            }
            if(response.data.vraa_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setAddressDetailsSectionDenialReason',response.data.vraa_denial_reason);
                commit('showAddressDetailsSectionErrors');
            }
            if(response.data.vracd_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setContactDetailsSectionDenialReason',response.data.vracd_denial_reason);
                commit('showContactDetailsSectionErrors');
            }
            if(response.data.vrab_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setBusinessProfileSectionDenialReason',response.data.vrab_denial_reason);
                commit('showBusinessProfileSectionErrors');
            }
            if(response.data.vraav_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setAuthSignaturesSectionDenialReason',response.data.vraav_denial_reason);
                commit('showAuthSignaturesSectionErrors');
            }
            if(response.data.vrabp_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setBillingProcessSectionDenialReason',response.data.vrabp_denial_reason);
                commit('showBillingProcessSectionErrors');
            }
            if(response.data.vrabd_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setBusinessDescriptionSectionDenialReason',response.data.vrabd_denial_reason);
                commit('showBusinessDescriptionSectionErrors');
            }
            if(response.data.vraact_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setAccountsVAPRSectionDenialReason',response.data.vraact_denial_reason);
                commit('showAccountsVAPRSectionErrors');
            }
            if(response.data.vrape_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setPepSectionDenialReason',response.data.vrape_denial_reason);
                commit('showPepSectionErrors');
            }
            if(response.data.vrar_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setReferencesSectionDenialReason',response.data.vrar_denial_reason);
                commit('showReferencesSectionErrors');
            }
            if(response.data.vrac_voi_vendor_registration_application_status === SECTION_STATUS_DENIED){
                commit('setOtherCommentsSectionDenialReason',response.data.vrac_denial_reason);
                commit('showOtherCommentsSectionErrors');
            }
            
            console.groupEnd();
         })
        // Error
        .catch(error => {
            console.error( "Error getting Profile Contact Info");
            console.dir( error.response );
        }); 
    },
    /**
     * Get Information Detail from VOI Vendor Registration Application
     */
    getVOIVendorRegistrationApplicationForm({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            // Send request for validation
            axios.post('getVOIVendorRegistrationApplicationForm', {
                company: payload.company,
                application: payload.application,
                // company_application_vendor_id: payload.company_application_vendor_id, // Vendor Application User ID
            })
            // Successful Response
            .then(response => {
                // Assign variables
                console.log('Registration Application Form Basic Information Result',response.data);
                /**
                 * Identity Details
                 */

                state.identityDetailsFormData.legalBusinessName = response.data.company_business_legal_name;
                state.identityDetailsFormData.dateIncorporation = (response.data.company_incorporation_date)?response.data.company_incorporation_date:'';
                state.identityDetailsFormData.placeIncorporation = (response.data.company_incorporation_place)?response.data.company_incorporation_place:'';
                
                state.identityDetailsFormData.businessType = (response.data.company_is_corporation==1)?'corporate':'individual';
                
                // if(response.data.company_is_corporation===1){
                //     state.identityDetailsFormData.businessType = 'corporate';
                // }
                // if(response.data.company_is_corporation===0){
                //     state.identityDetailsFormData.businessType = 'individual';
                // }
                
                // Verify if Business Structure has been assigned then properly assign it where it must go
                if(response.data.company_business_structure_id) {
                    console.group('BusinessStructureID');
                    console.log('BusinessStructureID: Start',response.data.company_business_structure_id);
                    console.log('BusinessStructureGroup',state.BUSINESS_STRUCTURE_GROUPS);
                    // console.log('BusinessStructureGroup Find Result',state.BUSINESS_STRUCTURE_GROUPS.find( item => item.id == response.data.company_business_structure_id) );
                    // console.log('BusinessStructureGroup Find Result Lodash',_.find(state.BUSINESS_STRUCTURE_GROUPS,{'id':response.data.company_business_structure_id}) );
                    
                    let findBusinessStructureGroup = _.find(state.BUSINESS_STRUCTURE_GROUPS,{'id':response.data.company_business_structure_id});

                    // console.log('BusinessStructureGroup Find Result',findBusinessStructureGroup);
                    // Set Business Structure Group
                    commit('setBusinessStructureGroup',(findBusinessStructureGroup)?findBusinessStructureGroup.group:false);
                   
                    // Check if is Other
                    if ( response.data.company_business_structure_id == 11 ) {
                        // Classify as Other
                        state.identityDetailsFormData.businessStructure = {
                            id: 11,
                            type_name: 'Other'
                        };
                        console.log('BusinessStructureID: Other Specification',response.company_business_structure_other);
                        
                        // Push another entry for ID:11

                        // Other
                        state.identityDetailsFormData.businessStructureOther = {
                            id: 11,
                            type_name: response.data.company_business_structure_other
                        };
                        // Otherwise verify if it outside Active Company Structures
                    } else {
                        console.log('BusinessStructureID: Not Other',response.data.company_business_structure_id);

                        // Get Active Company Structures
                        axios.post('getActiveCompanyStructures', {
                            company: payload.company,
                            application: payload.application,
                        })
                        // Successful Response
                        .then(structure => {
                            console.log('Getting active Company Structures for comparison');
                            console.log('Starting Comparison',response.data.company_business_structure_id);
                            console.warn('Active Structures',structure.data);
                            console.warn('Comparison Result',structure.data.findIndex( item => item.id == response.data.company_business_structure_id)); 
                            console.warn('Comparison Result',structure.data.indexOf(response.data.company_business_structure_id) )
                            
                            // Compare with Provided business structure or is Other (11)
                            if(structure.data.findIndex( item => item.id == response.data.company_business_structure_id) === -1 ) {
                                console.log('NOT Found, add Other', response.data);
                                // NOT FOUND: Classify as Other
                                state.identityDetailsFormData.businessStructure = {
                                    id: 11,
                                    type_name: 'Other'
                                };
                                // Other
                                state.identityDetailsFormData.businessStructureOther = {
                                    id: response.data.company_business_structure_id,
                                    type_name: response.data.company_business_structure_type_name,
                                };
                            } else {
                                // FOUND: Assign it normally
                                console.log('Found it', response.data);
                                state.identityDetailsFormData.businessStructure = {
                                    id: response.data.company_business_structure_id,
                                    type_name: response.data.company_business_structure_type_name
                                };
                            }
                        })
                        // Error
                        .catch(error => {
                            console.error( "Error getting active Company Structures for comparison?");
                            console.dir( error.response );
                        });
                        console.groupEnd();
                    }
                } 

                // Check Business Type (Corporate, Individual)
                // if ( response.data.company_has_individual_taxpayer_identification ) {
                if (state.identityDetailsFormData.businessType == 'individual') {
                    // SSN
                    if ( response.data.company_has_social_security ) {
                        state.identityDetailsFormData.taxpayerIdNumberType = 'SSN';
                        state.identityDetailsFormData.taxpayerIdNumber = (response.data.company_social_security)?response.data.company_social_security:'';
                    }
                    // ITIN
                    if ( response.data.company_has_individual_taxpayer_identification ) {
                        state.identityDetailsFormData.taxpayerIdNumberType = 'ITIN';
                        state.identityDetailsFormData.taxpayerIdNumber = (response.data.company_individual_taxpayer_identification)?response.data.company_individual_taxpayer_identification:'';
                    }
                }

                // Employer ID
                if (state.identityDetailsFormData.businessType == 'corporate') {
                    // Corporate ITIN
                    if ( response.data.company_has_employer_identification ) {
                        state.identityDetailsFormData.taxpayerIdNumberType = 'corporate';
                        state.identityDetailsFormData.taxpayerIdNumber = (response.data.company_employer_identification)?response.data.company_employer_identification:'';
                    }
                }

                // if ( response.data.company_has_individual_taxpayer_identification ) {
                //     state.identityDetailsFormData.taxpayerIdNumberType = 'individual';
                // }
                // state.identityDetailsFormData.taxpayerIdNumber = response.data.company_has_individual_taxpayer_identification;
                // state.identityDetailsFormData.taxpayerIdNumberType = response.data.company_employer_identification;
                // state.identityDetailsFormData.taxpayerIdNumber = response.data.company_individual_taxpayer_identification;
                // state.identityDetailsFormData.businessStructureOther = response.data.company_has_employer_identification;
                // company_has_social_security
                // company_social_security
                
                /**
                 * Address Details
                 */
                state.addressDetailsFormData.physicalAddress1 = (response.data.company_address1)?response.data.company_address1:'';
                state.addressDetailsFormData.physicalAddress2 = (response.data.company_address2)?response.data.company_address2:'';
                state.addressDetailsFormData.physicalAddressCity = (response.data.company_city)?response.data.company_city:'';
                state.addressDetailsFormData.physicalAddressZipCode = (response.data.company_zip_code)?response.data.company_zip_code:'';
                state.addressDetailsFormData.physicalAddressState = {
                    id: response.data.company_state_id, 
                    state_name: response.data.company_state_name, 
                    abbreviation: response.data.company_state_abbreviation
                };
                
                // If postal address is different than physical
                if( response.data.company_postal_same_physical === 0) {
                    state.addressDetailsFormData.postalSameAsPhysicalCheckbox = false;
                    state.addressDetailsFormData.postalAddress1 = response.data.company_postal_address1;
                    state.addressDetailsFormData.postalAddress2 = response.data.company_postal_address2;
                    state.addressDetailsFormData.postalAddressCity = response.data.company_postal_city;
                    state.addressDetailsFormData.postalAddressZipCode = response.data.company_postal_zip_code,
                    state.addressDetailsFormData.postalAddressState = {
                        id: response.data.company_postal_state_id, state_name: response.data.company_postal_state_name, abbreviation: response.data.company_postal_state_abbreviation
                    };
                } else {
                    state.addressDetailsFormData.postalSameAsPhysicalCheckbox = true;
                }
                
                /**
                 * Contact Details
                 */
                state.contactDetailsFormData.contactOfficePhone = (response.data.work_phone)?response.data.work_phone:'';
                state.contactDetailsFormData.contactMobilePhone = (response.data.cell_phone)?response.data.cell_phone:'';
                state.contactDetailsFormData.contactFax = (response.data.fax)?response.data.fax:'';
                state.contactDetailsFormData.contactEmail = (response.data.email)?response.data.email:'';
                state.contactDetailsFormData.contactWebsite = (response.data.website)?response.data.website:'';
                
                /**
                 * Business Profile
                 */
                state.businessProfileFormData.employedByVAPRCheck = (response.data.had_employment === 0)?response.data.had_employment.toString():(response.data.had_employment)?response.data.had_employment.toString():'';
                state.businessProfileFormData.memberBoardDirectors = (response.data.had_board_member === 0)?response.data.had_board_member.toString():(response.data.had_board_member)?response.data.had_board_member.toString():'';
                // Assign Annual Income and format it as financial number
                state.businessProfileFormData.businessAnnualIncome = (response.data.company_annual_income)?accounting.formatMoney(response.data.company_annual_income):'';
                state.businessProfileFormData.businessYears = (response.data.company_years_in_business)?accounting.formatNumber(response.data.company_years_in_business, { precision : 0 }):'';
                state.businessProfileFormData.businessEmployees = (response.data.company_employees_number)?accounting.formatNumber(response.data.company_employees_number, { precision : 0 }):'';
                state.businessProfileFormData.businessLocalCheckbox = (response.data.company_is_business_operation_local)?response.data.company_is_business_operation_local:'';
                state.businessProfileFormData.businessUSACheckbox = (response.data.company_is_business_operation_usa)?response.data.company_is_business_operation_usa:'';
                state.businessProfileFormData.businessIntCheckbox = (response.data.company_is_business_operation_international)?response.data.company_is_business_operation_international:'';
                state.businessProfileFormData.explainBusiness = (response.data.company_business_location_explanation)?response.data.company_business_location_explanation:'';
                
                /** 
                 * Billing Process
                 */                
                state.billingProcessFormData.billingProcessExplanation = (response.data.billing_process_description)?response.data.billing_process_description:'';
                
                /**
                 * Business Description
                 */
                state.businessDescriptionFormData.businessDescription = (response.data.company_business_description)?response.data.company_business_description:'';
                state.businessDescriptionFormData.productsSummary = (response.data.company_business_services_summary)?response.data.company_business_services_summary:'';
                state.businessDescriptionFormData.relationshipPurpose = (response.data.relationship_purpose)?response.data.relationship_purpose:'';
                state.businessDescriptionFormData.fundSource = (response.data.funding_source)?response.data.funding_source:'';
                
                /**
                 * Accounts with VAPR
                 */
                state.accountsVAPRFormData.haveOpenAccounts = (response.data.have_open_accounts === 0)?response.data.have_open_accounts.toString():(response.data.have_open_accounts)?response.data.have_open_accounts.toString():'';

                /**
                 * Politically Exposed Person - PEP
                 */
                state.politicallyExposedFormData.isPoliticallyExposed = (response.data.is_politically_exposed === 0)?response.data.is_politically_exposed.toString():(response.data.is_politically_exposed)?response.data.is_politically_exposed.toString():'';

                /**
                 * Other Comments
                 */
                state.otherCommentsFormData.otherComments = (response.data.other_comments)?response.data.other_comments:'';
                
                // swal("Draft Saved", "", "success");
                resolve();
            })
            // Error
            .catch(error => {
                console.error( "Error Getting Information");
                console.dir( error.response );
                // If the error is not processable then show error
                if(error.response.status == 500){
                    swal('Error Getting Information', 'An error occurred, please refresh the page and try again. If error persists contact ValidZone', "error");
                    resolve();
                    return ;
                }
                // Display Error message
                // swal('Error Getting Information', error.response.data.msg, "error");
                // state.errors.error = error.response.data;
                state.errors.error.record(error.response.data);
                state.errors.visible = true;
                resolve();
            });
        });
    },
    /**
     * Get VOI Business Accounts by Positions associated with Vendor Registration Application Form
     */
    getVOIVendorRegistrationApplicationFormBusinessPositions({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            // Send request for validation
            axios.post('getVOIVendorRegistrationApplicationFormBusinessPositions', {
                company: payload.company,
                application: payload.application,
            })
            // Successful Response
            .then(response => {
                
                // Reset Auth Signature
                // state.vendorAuthSignaturesFormData.authSignature = [];

                // console.warn(state.vendorAuthSignaturesFormData.authSignature,'Auth Signature Initialize');
                console.warn('Registration Application Form Business Positions Result',response.data);

                // Assign variables
                // dump an object's own enumerable properties to the console
                for (let key of Object.keys(response.data)) {
                    console.log(key + ": " + response.data[key]);
                    // Business Type - Owner (46)
                    switch(response.data[key].business_type_id) {
                        // Owner
                        case 46:
                            // Assign information to Owner
                            state.businessProfileFormData.ownerFirstName = (response.data[key].first_name)?response.data[key].first_name:'';
                            state.businessProfileFormData.ownerLastName = (response.data[key].last_name)?response.data[key].last_name:'';
                            state.businessProfileFormData.ownerBirthDate = (response.data[key].birth_date)?response.data[key].birth_date:'';
                            
                            // Verify Document Type
                            if( response.data[key].car_license ) {
                                state.businessProfileFormData.ownerDocumentType = '1';
                                state.businessProfileFormData.ownerIdNumber = (response.data[key].car_license)?response.data[key].car_license:'';
                            }

                            if( response.data[key].passport ) {
                                state.businessProfileFormData.ownerDocumentType = '2';
                                state.businessProfileFormData.ownerIdNumber = (response.data[key].passport)?response.data[key].passport:'';
                            }
                            
                            state.businessProfileFormData.ownerAddress1 = (response.data[key].address1)?response.data[key].address1:'';
                            state.businessProfileFormData.ownerAddress2 = (response.data[key].address2)?response.data[key].address2:'';
                            state.businessProfileFormData.ownerCity = (response.data[key].city)?response.data[key].city:'';
                            state.businessProfileFormData.ownerZipCode =  (response.data[key].zip_code)?response.data[key].zip_code:'';
                            
                            // Verify if State is set
                            if(response.data[key].state_id){
                                state.businessProfileFormData.ownerState = { 
                                    id: response.data[key].state_id, 
                                    state_name: response.data[key].state_name, 
                                    abbreviation: response.data[key].state_abbreviation
                                };
                            }
                        break;
                        // President
                        case 32:
                            // Assign information to president
                            state.businessProfileFormData.presidentFirstName = (response.data[key].first_name)?response.data[key].first_name:'';
                            state.businessProfileFormData.presidentLastName = (response.data[key].last_name)?response.data[key].last_name:'';
                            state.businessProfileFormData.presidentBirthDate = (response.data[key].birth_date)?response.data[key].birth_date:'';
                            
                            // Verify Document Type
                            if( response.data[key].car_license ) {
                                state.businessProfileFormData.presidentDocumentType = '1';
                                state.businessProfileFormData.presidentIdNumber = (response.data[key].car_license)?response.data[key].car_license:'';
                            }

                            if( response.data[key].passport ) {
                                state.businessProfileFormData.presidentDocumentType = '2';
                                state.businessProfileFormData.presidentIdNumber = (response.data[key].passport)?response.data[key].passport:'';
                            }
                            
                            state.businessProfileFormData.presidentAddress1 = (response.data[key].address1)?response.data[key].address1:'';
                            state.businessProfileFormData.presidentAddress2 = (response.data[key].address2)?response.data[key].address2:'';
                            state.businessProfileFormData.presidentCity = (response.data[key].city)?response.data[key].city:'';
                            state.businessProfileFormData.presidentZipCode =  (response.data[key].zip_code)?response.data[key].zip_code:'';
                            
                            // Verify if State is set
                            if(response.data[key].state_id){
                                state.businessProfileFormData.presidentState = { 
                                    id: response.data[key].state_id, 
                                    state_name: response.data[key].state_name, 
                                    abbreviation: response.data[key].state_abbreviation
                                };
                            }
                        break;
                        // Vice President
                        case 47:
                            // Assign information to vicePresident
                            state.businessProfileFormData.vicePresidentFirstName = (response.data[key].first_name)?response.data[key].first_name:'';
                            state.businessProfileFormData.vicePresidentLastName = (response.data[key].last_name)?response.data[key].last_name:'';
                            state.businessProfileFormData.vicePresidentBirthDate = (response.data[key].birth_date)?response.data[key].birth_date:'';
                            
                            // Verify Document Type
                            if( response.data[key].car_license ) {
                                state.businessProfileFormData.vicePresidentDocumentType = '1';
                                state.businessProfileFormData.vicePresidentIdNumber = (response.data[key].car_license)?response.data[key].car_license:'';
                            }

                            if( response.data[key].passport ) {
                                state.businessProfileFormData.vicePresidentDocumentType = '2';
                                state.businessProfileFormData.vicePresidentIdNumber = (response.data[key].passport)?response.data[key].passport:'';
                            }
                            
                            state.businessProfileFormData.vicePresidentAddress1 = (response.data[key].address1)?response.data[key].address1:'';
                            state.businessProfileFormData.vicePresidentAddress2 = (response.data[key].address2)?response.data[key].address2:'';
                            state.businessProfileFormData.vicePresidentCity = (response.data[key].city)?response.data[key].city:'';
                            state.businessProfileFormData.vicePresidentZipCode =  (response.data[key].zip_code)?response.data[key].zip_code:'';
                            
                            // Verify if State is set
                            if(response.data[key].state_id){
                                state.businessProfileFormData.vicePresidentState = { 
                                    id: response.data[key].state_id, 
                                    state_name: response.data[key].state_name, 
                                    abbreviation: response.data[key].state_abbreviation
                                };
                            }
                        break;
                        // Director
                        case 48:
                            // Assign information to director
                            state.businessProfileFormData.directorFirstName = (response.data[key].first_name)?response.data[key].first_name:'';
                            state.businessProfileFormData.directorLastName = (response.data[key].last_name)?response.data[key].last_name:'';
                            state.businessProfileFormData.directorBirthDate = (response.data[key].birth_date)?response.data[key].birth_date:'';
                            
                            // Verify Document Type
                            if( response.data[key].car_license ) {
                                state.businessProfileFormData.directorDocumentType = '1';
                                state.businessProfileFormData.directorIdNumber = (response.data[key].car_license)?response.data[key].car_license:'';
                            }

                            if( response.data[key].passport ) {
                                state.businessProfileFormData.directorDocumentType = '2';
                                state.businessProfileFormData.directorIdNumber = (response.data[key].passport)?response.data[key].passport:'';
                            }
                            
                            state.businessProfileFormData.directorAddress1 = (response.data[key].address1)?response.data[key].address1:'';
                            state.businessProfileFormData.directorAddress2 = (response.data[key].address2)?response.data[key].address2:'';
                            state.businessProfileFormData.directorCity = (response.data[key].city)?response.data[key].city:'';
                            state.businessProfileFormData.directorZipCode =  (response.data[key].zip_code)?response.data[key].zip_code:'';
                            
                            // Verify if State is set
                            if(response.data[key].state_id){
                                state.businessProfileFormData.directorState = { 
                                    id: response.data[key].state_id, 
                                    state_name: response.data[key].state_name, 
                                    abbreviation: response.data[key].state_abbreviation
                                };
                            }
                        break;
                        // Treasurer
                        case 49:
                            // Assign information to treasurer
                            state.businessProfileFormData.treasurerFirstName = (response.data[key].first_name)?response.data[key].first_name:'';
                            state.businessProfileFormData.treasurerLastName = (response.data[key].last_name)?response.data[key].last_name:'';
                            state.businessProfileFormData.treasurerBirthDate = (response.data[key].birth_date)?response.data[key].birth_date:'';
                            
                            // Verify Document Type
                            if( response.data[key].car_license ) {
                                state.businessProfileFormData.treasurerDocumentType = '1';
                                state.businessProfileFormData.treasurerIdNumber = (response.data[key].car_license)?response.data[key].car_license:'';
                            }

                            if( response.data[key].passport ) {
                                state.businessProfileFormData.treasurerDocumentType = '2';
                                state.businessProfileFormData.treasurerIdNumber = (response.data[key].passport)?response.data[key].passport:'';
                            }
                            
                            state.businessProfileFormData.treasurerAddress1 = (response.data[key].address1)?response.data[key].address1:'';
                            state.businessProfileFormData.treasurerAddress2 = (response.data[key].address2)?response.data[key].address2:'';
                            state.businessProfileFormData.treasurerCity = (response.data[key].city)?response.data[key].city:'';
                            state.businessProfileFormData.treasurerZipCode =  (response.data[key].zip_code)?response.data[key].zip_code:'';
                            
                            // Verify if State is set
                            if(response.data[key].state_id){
                                state.businessProfileFormData.treasurerState = { 
                                    id: response.data[key].state_id, 
                                    state_name: response.data[key].state_name, 
                                    abbreviation: response.data[key].state_abbreviation
                                };
                            }
                        break;
                        // Secretary
                        case 50:
                            // Assign information to secretary
                            state.businessProfileFormData.secretaryFirstName = (response.data[key].first_name)?response.data[key].first_name:'';
                            state.businessProfileFormData.secretaryLastName = (response.data[key].last_name)?response.data[key].last_name:'';
                            state.businessProfileFormData.secretaryBirthDate = (response.data[key].birth_date)?response.data[key].birth_date:'';
                            
                            // Verify Document Type
                            if( response.data[key].car_license ) {
                                state.businessProfileFormData.secretaryDocumentType = '1';
                                state.businessProfileFormData.secretaryIdNumber = (response.data[key].car_license)?response.data[key].car_license:'';
                            }

                            if( response.data[key].passport ) {
                                state.businessProfileFormData.secretaryDocumentType = '2';
                                state.businessProfileFormData.secretaryIdNumber = (response.data[key].passport)?response.data[key].passport:'';
                            }
                            
                            state.businessProfileFormData.secretaryAddress1 = (response.data[key].address1)?response.data[key].address1:'';
                            state.businessProfileFormData.secretaryAddress2 = (response.data[key].address2)?response.data[key].address2:'';
                            state.businessProfileFormData.secretaryCity = (response.data[key].city)?response.data[key].city:'';
                            state.businessProfileFormData.secretaryZipCode =  (response.data[key].zip_code)?response.data[key].zip_code:'';
                            
                            // Verify if State is set
                            if(response.data[key].state_id){
                                state.businessProfileFormData.secretaryState = { 
                                    id: response.data[key].state_id, 
                                    state_name: response.data[key].state_name, 
                                    abbreviation: response.data[key].state_abbreviation
                                };
                            }
                        break;
                        // Authorized Vendor Official
                        case 51:
                            // console.warn(state.vendorAuthSignaturesFormData.authSignature,'Auth Signature Verification');

                            let authDocumentType = '1'; // Default License type (1)
                            let authIdNumber = '';      // License or Passport
                            let authState = {           // Default state
                                id: 52, state_name: 'Puerto Rico', abbreviation: 'PR'
                            }
                            // Verify Document Type
                            if( response.data[key].car_license ) {
                                authDocumentType = '1';
                                authIdNumber = (response.data[key].car_license)?response.data[key].car_license:'';
                            }

                            if( response.data[key].passport ) {
                                authDocumentType = '2';
                                authIdNumber = (response.data[key].passport)?response.data[key].passport:'';
                            }

                            // Verify if State is set
                            if(response.data[key].state_id){
                                authState = { 
                                    id: response.data[key].state_id, 
                                    state_name: response.data[key].state_name, 
                                    abbreviation: response.data[key].state_abbreviation
                                };
                            }
                            // Verify if Auth Vendor Has data
                            // if( state.vendorAuthSignaturesFormData.authSignature )

                            // Add Authorized Vendor Official
                            state.vendorAuthSignaturesFormData.authSignature.push({
                                firstName: (response.data[key].first_name)?response.data[key].first_name:'',
                                lastName: (response.data[key].last_name)?response.data[key].last_name:'',
                                birthDate: (response.data[key].birth_date)?response.data[key].birth_date:'',
                                address1: (response.data[key].address1)?response.data[key].address1:'',
                                address2: (response.data[key].address2)?response.data[key].address2:'',
                                city: (response.data[key].city)?response.data[key].city:'',
                                state: authState,
                                zipCode: (response.data[key].zip_code)?response.data[key].zip_code:'',
                                documentType: authDocumentType, 
                                idNumber: authIdNumber,                                
                                idCopy: '',
                            });                            
                            
                        break;
                        // Politically Exposed Person
                        case 52:
                            // Set Political Exposed flag as true
                            state.politicallyExposedFormData.isPoliticallyExposed = '1';

                            // Assign information to politically exposed person
                            state.politicallyExposedFormData.firstName = (response.data[key].first_name)?response.data[key].first_name:'';
                            state.politicallyExposedFormData.lastName = (response.data[key].last_name)?response.data[key].last_name:'';
                            state.politicallyExposedFormData.birthDate = (response.data[key].birth_date)?response.data[key].birth_date:'';
                            
                            // Verify Document Type
                            if( response.data[key].car_license ) {
                                state.politicallyExposedFormData.documentType = '1';
                                state.politicallyExposedFormData.idNumber = (response.data[key].car_license)?response.data[key].car_license:'';
                            }

                            if( response.data[key].passport ) {
                                state.politicallyExposedFormData.documentType = '2';
                                state.politicallyExposedFormData.idNumber = (response.data[key].passport)?response.data[key].passport:'';
                            }
                            
                            state.politicallyExposedFormData.address1 = (response.data[key].address1)?response.data[key].address1:'';
                            state.politicallyExposedFormData.address2 = (response.data[key].address2)?response.data[key].address2:'';
                            state.politicallyExposedFormData.city = (response.data[key].city)?response.data[key].city:'';
                            state.politicallyExposedFormData.zipCode =  (response.data[key].zip_code)?response.data[key].zip_code:'';
                            
                            // Verify if State is set
                            if(response.data[key].state_id){
                                state.politicallyExposedFormData.state = { 
                                    id: response.data[key].state_id, 
                                    state_name: response.data[key].state_name, 
                                    abbreviation: response.data[key].state_abbreviation
                                };
                            }
                        break;
                    }
                    console.log(response.data[key].business_type_id);
                    console.log(response.data[key].business_type_name);
                    console.log(state.vendorAuthSignaturesFormData.authSignature,'Auth Signature');
                }
                
                resolve();
            })
            // Error
            .catch(error => {
                console.error( "Error Getting Registration Application Business Positions Information");
                console.dir( error.response );
                // If the error is not processable then show error
                if(error.response.status == 500){
                    swal('Error Getting Information', 'An error occurred, please refresh the page and try again. If error persists contact ValidZone', "error");
                    resolve();
                    return ;
                }
                // Display Error message
                // swal('Error Getting Information', error.response.data.msg, "error");
                // state.errors.error = error.response.data;
                // state.errors.error.record(error.response.data);
                // state.errors.visible = true;
                resolve();
            });
        });
    },
    /**
     * Get VOI Accounts associated with Vendor Registration Application Form
     */
    getVOIVendorRegistrationApplicationFormAccounts({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            // Send request for validation
            axios.post('getVOIVendorRegistrationApplicationFormAccounts', {
                company: payload.company,
                application: payload.application,
            })
            // Successful Response
            .then(response => {
                
                // Reset Accounts
                // state.accountsVAPRFormData.accounts = [];
                console.warn('Registration Application Form Business Accounts Result',response.data);
                if(response.data){
                    // Active Open Accounts
                    state.accountsVAPRFormData.haveOpenAccounts = '1';
                    // Assign variables of Accounts
                    for (let key of Object.keys(response.data)) {
                        // dump an object's own enumerable properties to the console
                        console.log(key + ": " + response.data[key]);
                        // Add Accounts
                        state.accountsVAPRFormData.accounts.push({
                            type: response.data[key].account_type_id,
                            label: response.data[key].account_type_name,
                            accountNumber: (response.data[key].account_number)?response.data[key].account_number:'',
                            creditTranAmount: (response.data[key].credit_transaction_amount)?accounting.formatMoney(response.data[key].credit_transaction_amount):'',
                            creditTranVolume: (response.data[key].credit_transaction_volume)?accounting.formatNumber(response.data[key].credit_transaction_volume, { precision : 0 }):'',
                            debitTranAmount: (response.data[key].debit_transaction_amount)?accounting.formatMoney(response.data[key].debit_transaction_amount):'',
                            debitTranVolume: (response.data[key].debit_transaction_volume)?accounting.formatNumber(response.data[key].debit_transaction_volume, { precision : 0 }):'',
                        });
                    }
                } else {
                    // Deactive Open Accounts
                    state.accountsVAPRFormData.haveOpenAccounts = '';
                }

                console.log(state.accountsVAPRFormData.accounts,'Accounts');
                
                resolve();
            })
            // Error
            .catch(error => {
                console.error( "Error Getting Registration Application Accounts Information");
                console.dir( error.response );
                // If the error is not processable then show error
                if(error.response.status == 500){
                    swal('Error Getting Information', 'An error occurred, please refresh the page and try again. If error persists contact ValidZone', "error");
                    resolve();
                    return ;
                }
                // Display Error message
                // swal('Error Getting Information', error.response.data.msg, "error");
                // state.errors.error = error.response.data;
                // state.errors.error.record(error.response.data);
                // state.errors.visible = true;
                resolve();
            });
        });
    },
    /**
     * Get VOI References associated with Vendor Registration Application Form
     */
    getVOIVendorRegistrationApplicationFormReferences({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            // Send request for validation
            axios.post('getVOIVendorRegistrationApplicationFormReferences', {
                company: payload.company,
                application: payload.application,
            })
            // Successful Response
            .then(response => {
                // Reset References
                // state.referencesFormData.references = [];
                console.warn('Registration Application Form Business References Result',response.data);
                if(response.data){
                    // Navigate through References
                    for (let key of Object.keys(response.data)) {
                        // dump an object's own enumerable properties to the console
                        console.log(key + ": " + response.data[key]);
                        // Assign the correct reference in order
                        switch (parseInt(key)) {
                            // Reference 1
                            case 0:
                                state.referencesFormData.ref1FirstName = (response.data[key].first_name)?response.data[key].first_name:'';
                                state.referencesFormData.ref1LastName = (response.data[key].last_name)?response.data[key].last_name:'';
                                state.referencesFormData.ref1CompanyName = (response.data[key].company_name)?response.data[key].company_name:'';
                                state.referencesFormData.ref1Position = (response.data[key].position)?response.data[key].position:'';
                                state.referencesFormData.ref1Telephone = (response.data[key].phone)?response.data[key].phone:'';
                                state.referencesFormData.ref1Email = (response.data[key].email)?response.data[key].email:'';
                            break;
                            // Reference 2
                            case 1:
                                state.referencesFormData.ref2FirstName = (response.data[key].first_name)?response.data[key].first_name:'';
                                state.referencesFormData.ref2LastName = (response.data[key].last_name)?response.data[key].last_name:'';
                                state.referencesFormData.ref2CompanyName = (response.data[key].company_name)?response.data[key].company_name:'';
                                state.referencesFormData.ref2Position = (response.data[key].position)?response.data[key].position:'';
                                state.referencesFormData.ref2Telephone = (response.data[key].phone)?response.data[key].phone:'';
                                state.referencesFormData.ref2Email = (response.data[key].email)?response.data[key].email:'';
                            break;
                            // Reference 3
                            case 2:
                                state.referencesFormData.ref3FirstName = (response.data[key].first_name)?response.data[key].first_name:'';
                                state.referencesFormData.ref3LastName = (response.data[key].last_name)?response.data[key].last_name:'';
                                state.referencesFormData.ref3CompanyName = (response.data[key].company_name)?response.data[key].company_name:'';
                                state.referencesFormData.ref3Position = (response.data[key].position)?response.data[key].position:'';
                                state.referencesFormData.ref3Telephone = (response.data[key].phone)?response.data[key].phone:'';
                                state.referencesFormData.ref3Email = (response.data[key].email)?response.data[key].email:'';
                            break;
                        }
                    }
                } 

                console.log(state.referencesFormData,'References');
                
                resolve();
            })
            // Error
            .catch(error => {
                console.error( "Error Getting Registration Application References Information");
                console.dir( error.response );
                // If the error is not processable then show error
                if(error.response.status == 500){
                    swal('Error Getting Information', 'An error occurred, please refresh the page and try again. If error persists contact ValidZone', "error");
                    resolve();
                    return ;
                }
                // Display Error message
                // swal('Error Getting Information', error.response.data.msg, "error");
                // state.errors.error = error.response.data;
                // state.errors.error.record(error.response.data);
                // state.errors.visible = true;
                resolve();
            });
        });
    },
    /**
     * Get VOI Business Services associated with Vendor Registration Application Form
     */
    getVOIVendorBusinessServices({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            // Send request for validation
            axios.post('getOwnCompanyBusinessServices', {
                company: payload.company,
                application: payload.application,
            })
            // Successful Response
            .then(response => {
                // Reset Accounts
                // state.accountsVAPRFormData.accounts = [];
                console.warn('Registration Application Form Business Services Result',response.data);
                if(response.data){
                    // Reset Key
                    // Assign variables of Services
                    for (let key of Object.keys(response.data)) {
                        // dump an object's own enumerable properties to the console
                        console.log(response.data[key], key);
                        // Add Services
                        state.businessDescriptionFormData.businessServices.push({
                            value: response.data[key].business_service_id,
                            service_name: response.data[key].business_service_name,
                        });
                    }
                }
                console.log(state.businessDescriptionFormData.businessServices,'Services Selected');
                resolve();
            })
            // Error
            .catch(error => {
                console.error( "Error Getting Registration Application Company Services Information");
                console.dir( error.response );
                // If the error is not processable then show error
                if(error.response.status == 500){
                    swal('Error Getting Information', 'An error occurred, please refresh the page and try again. If error persists contact ValidZone', "error");
                    resolve();
                    return ;
                }
                // Display Error message
                // swal('Error Getting Information', error.response.data.msg, "error");
                // state.errors.error = error.response.data;
                // state.errors.error.record(error.response.data);
                // state.errors.visible = true;
                resolve();
            });
        });
    },
    /**
     * Save Draft versopm of VOI Vendor Registration Application
     */
    draftVOIVendorRegistrationApplication({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            // Send request for validation
            axios.post('draftVOIVendorRegistrationApplication', {
                company: payload.company,
                application: payload.application,
                // company_application_vendor_id: payload.company_application_vendor_id, // Vendor Application User ID

                action: 'DRAFT',

                // Identity details
                legal_business_name: state.identityDetailsFormData.legalBusinessName,
                date_of_incorporation: state.identityDetailsFormData.dateIncorporation,
                place_of_incorporation: state.identityDetailsFormData.placeIncorporation,
                business_type: state.identityDetailsFormData.businessType,
                business_structure: state.identityDetailsFormData.businessStructure,
                business_structure_other: state.identityDetailsFormData.businessStructureOther,
                individual_taxpayer_type: state.identityDetailsFormData.taxpayerIdNumberType,
                individual_taxpayer_id_number: state.identityDetailsFormData.taxpayerIdNumber,
                corporate_taxpayer_id_number: state.identityDetailsFormData.taxpayerIdNumber,
                other_type_of_business_structure: state.identityDetailsFormData.businessStructureOther,
                // other_type_of_business_structure: state.identityDetailsFormData.businessStructureOtherValue,

                // Address details
                company_physical_address_line1: state.addressDetailsFormData.physicalAddress1,
                company_physical_address_line2: state.addressDetailsFormData.physicalAddress2,
                company_physical_address_city: state.addressDetailsFormData.physicalAddressCity,
                company_physical_address_state: state.addressDetailsFormData.physicalAddressState,
                company_physical_address_zip_code: state.addressDetailsFormData.physicalAddressZipCode,

                company_postal_same_physical: state.addressDetailsFormData.postalSameAsPhysicalCheckbox,
                
                company_postal_address_line1: state.addressDetailsFormData.postalAddress1,
                company_postal_address_line2: state.addressDetailsFormData.postalAddress2,
                company_postal_address_city: state.addressDetailsFormData.postalAddressCity,
                company_postal_address_state: state.addressDetailsFormData.postalAddressState,
                company_postal_address_zip_code: state.addressDetailsFormData.postalAddressZipCode,
                
                contact_office_phone: state.contactDetailsFormData.contactOfficePhone,
                contact_mobile_phone: state.contactDetailsFormData.contactMobilePhone,                
                contact_fax: state.contactDetailsFormData.contactFax,
                contact_website: state.contactDetailsFormData.contactWebsite,
                // contact_email: state.contactDetailsFormData.contactEmail,

                // Business Profile
                employed_by_vapr_check: state.businessProfileFormData.employedByVAPRCheck,
                member_of_board_check: state.businessProfileFormData.memberBoardDirectors,
                annual_income: state.businessProfileFormData.businessAnnualIncome,
                business_years: state.businessProfileFormData.businessYears,
                business_employees: state.businessProfileFormData.businessEmployees,
                business_local_check: state.businessProfileFormData.businessLocalCheckbox,
                business_usa_check: state.businessProfileFormData.businessUSACheckbox,
                business_int_check: state.businessProfileFormData.businessIntCheckbox,
                business_explanation: state.businessProfileFormData.explainBusiness,
                // Business Profile - Owner
                owner_first_name: state.businessProfileFormData.ownerFirstName,
                owner_last_name: state.businessProfileFormData.ownerLastName,
                owner_birth_date: state.businessProfileFormData.ownerBirthDate,
                owner_document_type: state.businessProfileFormData.ownerDocumentType,
                owner_identification_number: state.businessProfileFormData.ownerIdNumber,
                owner_address_line_1: state.businessProfileFormData.ownerAddress1,
                owner_address_line_2: state.businessProfileFormData.ownerAddress2,
                owner_address_city: state.businessProfileFormData.ownerCity,
                owner_address_state: state.businessProfileFormData.ownerState,
                owner_address_zip_code: state.businessProfileFormData.ownerZipCode,
                // Business Profile - President
                president_first_name: state.businessProfileFormData.presidentFirstName,
                president_last_name: state.businessProfileFormData.presidentLastName,
                president_birth_date: state.businessProfileFormData.presidentBirthDate,
                president_document_type: state.businessProfileFormData.presidentDocumentType,
                president_identification_number: state.businessProfileFormData.presidentIdNumber,
                president_address_line_1: state.businessProfileFormData.presidentAddress1,
                president_address_line_2: state.businessProfileFormData.presidentAddress2,
                president_address_city: state.businessProfileFormData.presidentCity,
                president_address_state: state.businessProfileFormData.presidentState,
                president_address_zip_code: state.businessProfileFormData.presidentZipCode,
                // Business Profile - Vice President
                vice_president_first_name: state.businessProfileFormData.vicePresidentFirstName,
                vice_president_last_name: state.businessProfileFormData.vicePresidentLastName,
                vice_president_birth_date: state.businessProfileFormData.vicePresidentBirthDate,
                vice_president_document_type: state.businessProfileFormData.vicePresidentDocumentType,
                vice_president_identification_number: state.businessProfileFormData.vicePresidentIdNumber,
                vice_president_address_line_1: state.businessProfileFormData.vicePresidentAddress1,
                vice_president_address_line_2: state.businessProfileFormData.vicePresidentAddress2,
                vice_president_address_city: state.businessProfileFormData.vicePresidentCity,
                vice_president_address_state: state.businessProfileFormData.vicePresidentState,
                vice_president_address_zip_code: state.businessProfileFormData.vicePresidentZipCode,
                // Business Profile - Director
                director_first_name: state.businessProfileFormData.directorFirstName,
                director_last_name: state.businessProfileFormData.directorLastName,
                director_birth_date: state.businessProfileFormData.directorBirthDate,
                director_document_type: state.businessProfileFormData.directorDocumentType,
                director_identification_number: state.businessProfileFormData.directorIdNumber,
                director_address_line_1: state.businessProfileFormData.directorAddress1,
                director_address_line_2: state.businessProfileFormData.directorAddress2,
                director_address_city: state.businessProfileFormData.directorCity,
                director_address_state: state.businessProfileFormData.directorState,
                director_address_zip_code: state.businessProfileFormData.directorZipCode,
                // Business Profile - Treasurer
                treasurer_first_name: state.businessProfileFormData.treasurerFirstName,
                treasurer_last_name: state.businessProfileFormData.treasurerLastName,
                treasurer_birth_date: state.businessProfileFormData.treasurerBirthDate,
                treasurer_document_type: state.businessProfileFormData.treasurerDocumentType,
                treasurer_identification_number: state.businessProfileFormData.treasurerIdNumber,
                treasurer_address_line_1: state.businessProfileFormData.treasurerAddress1,
                treasurer_address_line_2: state.businessProfileFormData.treasurerAddress2,
                treasurer_address_city: state.businessProfileFormData.treasurerCity,
                treasurer_address_state: state.businessProfileFormData.treasurerState,
                treasurer_address_zip_code: state.businessProfileFormData.treasurerZipCode,
                // Business Profile - Secretary
                secretary_first_name: state.businessProfileFormData.secretaryFirstName,
                secretary_last_name: state.businessProfileFormData.secretaryLastName,
                secretary_birth_date: state.businessProfileFormData.secretaryBirthDate,
                secretary_document_type: state.businessProfileFormData.secretaryDocumentType,
                secretary_identification_number: state.businessProfileFormData.secretaryIdNumber,
                secretary_address_line_1: state.businessProfileFormData.secretaryAddress1,
                secretary_address_line_2: state.businessProfileFormData.secretaryAddress2,
                secretary_address_city: state.businessProfileFormData.secretaryCity,
                secretary_address_state: state.businessProfileFormData.secretaryState,
                secretary_address_zip_code: state.businessProfileFormData.secretaryZipCode,
                
                // Authorized Signers Array
                authorized_vendor: state.vendorAuthSignaturesFormData.authSignature,

                // Billing Process
                billing_process_description: state.billingProcessFormData.billingProcessExplanation,

                // Business Description
                business_description: state.businessDescriptionFormData.businessDescription,
                business_services: state.businessDescriptionFormData.businessServices,
                business_description_summary: state.businessDescriptionFormData.productsSummary,
                purpose_of_relationship: state.businessDescriptionFormData.relationshipPurpose,
                fund_source: state.businessDescriptionFormData.fundSource,

                // Accounts with VAPR
                have_open_accounts: state.accountsVAPRFormData.haveOpenAccounts,
                open_accounts: state.accountsVAPRFormData.accounts,

                // Politically Exposed Person
                are_you_politically_exposed: state.politicallyExposedFormData.isPoliticallyExposed,
                politically_exposed_person_first_name: state.politicallyExposedFormData.firstName,
                politically_exposed_person_last_name: state.politicallyExposedFormData.lastName,
                politically_exposed_person_birth_date: state.politicallyExposedFormData.birthDate,
                politically_exposed_person_address_line_1: state.politicallyExposedFormData.address1,
                politically_exposed_person_address_line_2: state.politicallyExposedFormData.address2,
                politically_exposed_person_city: state.politicallyExposedFormData.city,
                politically_exposed_person_state: state.politicallyExposedFormData.state,
                politically_exposed_person_zip_code: state.politicallyExposedFormData.zipCode,
                politically_exposed_person_id_copy: state.politicallyExposedFormData.idCopy,
                politically_exposed_person_identification_number: state.politicallyExposedFormData.idNumber,
                politically_exposed_person_document_type: state.politicallyExposedFormData.documentType,
                
                // References
                reference_one_first_name: state.referencesFormData.ref1FirstName,
                reference_one_last_name: state.referencesFormData.ref1LastName,
                reference_one_company_name: state.referencesFormData.ref1CompanyName,
                reference_one_position: state.referencesFormData.ref1Position,
                reference_one_phone: state.referencesFormData.ref1Telephone,
                reference_one_email: state.referencesFormData.ref1Email,

                reference_two_first_name: state.referencesFormData.ref2FirstName,
                reference_two_last_name: state.referencesFormData.ref2LastName,
                reference_two_company_name: state.referencesFormData.ref2CompanyName,
                reference_two_position: state.referencesFormData.ref2Position,
                reference_two_phone: state.referencesFormData.ref2Telephone,
                reference_two_email: state.referencesFormData.ref2Email,

                reference_three_first_name: state.referencesFormData.ref3FirstName,
                reference_three_last_name: state.referencesFormData.ref3LastName,
                reference_three_company_name: state.referencesFormData.ref3CompanyName,
                reference_three_position: state.referencesFormData.ref3Position,
                reference_three_phone: state.referencesFormData.ref3Telephone,
                reference_three_email: state.referencesFormData.ref3Email,

                // Other Comments
                other_comments: state.otherCommentsFormData.otherComments,

            })
            // Successful Response
            .then(response => {
                console.log('Approval Result',response.data);
                // Clear error
                commit('setErrorsVisibility',false);
                // Display successful response
                swal(response.data.header,response.data.message,"success");
                resolve();
            })
            // Error
            .catch(error => {
                console.error( "Error Saving Draft");
                console.dir( error.response );
                // If the error is not processable then show error
                if(error.response.status == 500){
                    swal('Error Saving Draft', 'An error occurred, please refresh the page and try again. If error persists contact ValidZone', "error");
                    resolve();
                    return ;
                }
                // Display Error message
                swal('Error Saving Draft', error.response.data.msg, "error");
                // state.errors.error = error.response.data;
                state.errors.error.record(error.response.data);
                state.errors.visible = true;
                resolve();
            });
        });
    },
    /**
     * Submit VOI Vendor Registration Application
     */
    submitVOIVendorRegistrationApplication({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            // Send request for validation
            axios.post('submitVOIVendorRegistrationApplication', {
                company: payload.company,
                application: payload.application,

                action: 'SUBMIT',

                // Identity details
                legal_business_name: state.identityDetailsFormData.legalBusinessName,
                date_of_incorporation: state.identityDetailsFormData.dateIncorporation,
                place_of_incorporation: state.identityDetailsFormData.placeIncorporation,
                business_type: state.identityDetailsFormData.businessType,
                business_structure: state.identityDetailsFormData.businessStructure,
                business_structure_other: state.identityDetailsFormData.businessStructureOther,
                individual_taxpayer_type: state.identityDetailsFormData.taxpayerIdNumberType,
                individual_taxpayer_id_number: state.identityDetailsFormData.taxpayerIdNumber,
                corporate_taxpayer_id_number: state.identityDetailsFormData.taxpayerIdNumber,
                other_type_of_business_structure: state.identityDetailsFormData.businessStructureOther,
                // other_type_of_business_structure: state.identityDetailsFormData.businessStructureOtherValue,

                // Address details
                company_physical_address_line1: state.addressDetailsFormData.physicalAddress1,
                company_physical_address_line2: state.addressDetailsFormData.physicalAddress2,
                company_physical_address_city: state.addressDetailsFormData.physicalAddressCity,
                company_physical_address_state: state.addressDetailsFormData.physicalAddressState,
                company_physical_address_zip_code: state.addressDetailsFormData.physicalAddressZipCode,

                company_postal_same_physical: state.addressDetailsFormData.postalSameAsPhysicalCheckbox,
                
                company_postal_address_line1: state.addressDetailsFormData.postalAddress1,
                company_postal_address_line2: state.addressDetailsFormData.postalAddress2,
                company_postal_address_city: state.addressDetailsFormData.postalAddressCity,
                company_postal_address_state: state.addressDetailsFormData.postalAddressState,
                company_postal_address_zip_code: state.addressDetailsFormData.postalAddressZipCode,
                
                contact_office_phone: state.contactDetailsFormData.contactOfficePhone,
                contact_mobile_phone: state.contactDetailsFormData.contactMobilePhone,                
                contact_fax: state.contactDetailsFormData.contactFax,
                contact_website: state.contactDetailsFormData.contactWebsite,
                // contact_email: state.contactDetailsFormData.contactEmail,

                // Business Profile
                employed_by_vapr_check: state.businessProfileFormData.employedByVAPRCheck,
                member_of_board_check: state.businessProfileFormData.memberBoardDirectors,
                annual_income: state.businessProfileFormData.businessAnnualIncome,
                business_years: state.businessProfileFormData.businessYears,
                business_employees: state.businessProfileFormData.businessEmployees,
                business_local_check: state.businessProfileFormData.businessLocalCheckbox,
                business_usa_check: state.businessProfileFormData.businessUSACheckbox,
                business_int_check: state.businessProfileFormData.businessIntCheckbox,
                business_explanation: state.businessProfileFormData.explainBusiness,
                // Business Profile - Owner
                owner_first_name: state.businessProfileFormData.ownerFirstName,
                owner_last_name: state.businessProfileFormData.ownerLastName,
                owner_birth_date: state.businessProfileFormData.ownerBirthDate,
                owner_document_type: state.businessProfileFormData.ownerDocumentType,
                owner_identification_number: state.businessProfileFormData.ownerIdNumber,
                owner_address_line_1: state.businessProfileFormData.ownerAddress1,
                owner_address_line_2: state.businessProfileFormData.ownerAddress2,
                owner_address_city: state.businessProfileFormData.ownerCity,
                owner_address_state: state.businessProfileFormData.ownerState,
                owner_address_zip_code: state.businessProfileFormData.ownerZipCode,
                // Business Profile - President
                president_first_name: state.businessProfileFormData.presidentFirstName,
                president_last_name: state.businessProfileFormData.presidentLastName,
                president_birth_date: state.businessProfileFormData.presidentBirthDate,
                president_document_type: state.businessProfileFormData.presidentDocumentType,
                president_identification_number: state.businessProfileFormData.presidentIdNumber,
                president_address_line_1: state.businessProfileFormData.presidentAddress1,
                president_address_line_2: state.businessProfileFormData.presidentAddress2,
                president_address_city: state.businessProfileFormData.presidentCity,
                president_address_state: state.businessProfileFormData.presidentState,
                president_address_zip_code: state.businessProfileFormData.presidentZipCode,
                // Business Profile - Vice President
                vice_president_first_name: state.businessProfileFormData.vicePresidentFirstName,
                vice_president_last_name: state.businessProfileFormData.vicePresidentLastName,
                vice_president_birth_date: state.businessProfileFormData.vicePresidentBirthDate,
                vice_president_document_type: state.businessProfileFormData.vicePresidentDocumentType,
                vice_president_identification_number: state.businessProfileFormData.vicePresidentIdNumber,
                vice_president_address_line_1: state.businessProfileFormData.vicePresidentAddress1,
                vice_president_address_line_2: state.businessProfileFormData.vicePresidentAddress2,
                vice_president_address_city: state.businessProfileFormData.vicePresidentCity,
                vice_president_address_state: state.businessProfileFormData.vicePresidentState,
                vice_president_address_zip_code: state.businessProfileFormData.vicePresidentZipCode,
                // Business Profile - Director
                director_first_name: state.businessProfileFormData.directorFirstName,
                director_last_name: state.businessProfileFormData.directorLastName,
                director_birth_date: state.businessProfileFormData.directorBirthDate,
                director_document_type: state.businessProfileFormData.directorDocumentType,
                director_identification_number: state.businessProfileFormData.directorIdNumber,
                director_address_line_1: state.businessProfileFormData.directorAddress1,
                director_address_line_2: state.businessProfileFormData.directorAddress2,
                director_address_city: state.businessProfileFormData.directorCity,
                director_address_state: state.businessProfileFormData.directorState,
                director_address_zip_code: state.businessProfileFormData.directorZipCode,
                // Business Profile - Treasurer
                treasurer_first_name: state.businessProfileFormData.treasurerFirstName,
                treasurer_last_name: state.businessProfileFormData.treasurerLastName,
                treasurer_birth_date: state.businessProfileFormData.treasurerBirthDate,
                treasurer_document_type: state.businessProfileFormData.treasurerDocumentType,
                treasurer_identification_number: state.businessProfileFormData.treasurerIdNumber,
                treasurer_address_line_1: state.businessProfileFormData.treasurerAddress1,
                treasurer_address_line_2: state.businessProfileFormData.treasurerAddress2,
                treasurer_address_city: state.businessProfileFormData.treasurerCity,
                treasurer_address_state: state.businessProfileFormData.treasurerState,
                treasurer_address_zip_code: state.businessProfileFormData.treasurerZipCode,
                // Business Profile - Secretary
                secretary_first_name: state.businessProfileFormData.secretaryFirstName,
                secretary_last_name: state.businessProfileFormData.secretaryLastName,
                secretary_birth_date: state.businessProfileFormData.secretaryBirthDate,
                secretary_document_type: state.businessProfileFormData.secretaryDocumentType,
                secretary_identification_number: state.businessProfileFormData.secretaryIdNumber,
                secretary_address_line_1: state.businessProfileFormData.secretaryAddress1,
                secretary_address_line_2: state.businessProfileFormData.secretaryAddress2,
                secretary_address_city: state.businessProfileFormData.secretaryCity,
                secretary_address_state: state.businessProfileFormData.secretaryState,
                secretary_address_zip_code: state.businessProfileFormData.secretaryZipCode,
                
                // Authorized Signers Array
                authorized_vendor: state.vendorAuthSignaturesFormData.authSignature,

                // Billing Process
                billing_process_description: state.billingProcessFormData.billingProcessExplanation,

                // Business Description
                business_description: state.businessDescriptionFormData.businessDescription,
                business_services: state.businessDescriptionFormData.businessServices,
                business_description_summary: state.businessDescriptionFormData.productsSummary,
                purpose_of_relationship: state.businessDescriptionFormData.relationshipPurpose,
                fund_source: state.businessDescriptionFormData.fundSource,

                // Accounts with VAPR
                have_open_accounts: state.accountsVAPRFormData.haveOpenAccounts,
                open_accounts: state.accountsVAPRFormData.accounts,

                // Politically Exposed Person
                are_you_politically_exposed: state.politicallyExposedFormData.isPoliticallyExposed,
                politically_exposed_person_first_name: state.politicallyExposedFormData.firstName,
                politically_exposed_person_last_name: state.politicallyExposedFormData.lastName,
                politically_exposed_person_birth_date: state.politicallyExposedFormData.birthDate,
                politically_exposed_person_address_line_1: state.politicallyExposedFormData.address1,
                politically_exposed_person_address_line_2: state.politicallyExposedFormData.address2,
                politically_exposed_person_city: state.politicallyExposedFormData.city,
                politically_exposed_person_state: state.politicallyExposedFormData.state,
                politically_exposed_person_zip_code: state.politicallyExposedFormData.zipCode,
                politically_exposed_person_id_copy: state.politicallyExposedFormData.idCopy,
                politically_exposed_person_identification_number: state.politicallyExposedFormData.idNumber,
                politically_exposed_person_document_type: state.politicallyExposedFormData.documentType,
                
                // References
                reference_one_first_name: state.referencesFormData.ref1FirstName,
                reference_one_last_name: state.referencesFormData.ref1LastName,
                reference_one_company_name: state.referencesFormData.ref1CompanyName,
                reference_one_position: state.referencesFormData.ref1Position,
                reference_one_phone: state.referencesFormData.ref1Telephone,
                reference_one_email: state.referencesFormData.ref1Email,

                reference_two_first_name: state.referencesFormData.ref2FirstName,
                reference_two_last_name: state.referencesFormData.ref2LastName,
                reference_two_company_name: state.referencesFormData.ref2CompanyName,
                reference_two_position: state.referencesFormData.ref2Position,
                reference_two_phone: state.referencesFormData.ref2Telephone,
                reference_two_email: state.referencesFormData.ref2Email,

                reference_three_first_name: state.referencesFormData.ref3FirstName,
                reference_three_last_name: state.referencesFormData.ref3LastName,
                reference_three_company_name: state.referencesFormData.ref3CompanyName,
                reference_three_position: state.referencesFormData.ref3Position,
                reference_three_phone: state.referencesFormData.ref3Telephone,
                reference_three_email: state.referencesFormData.ref3Email,

                // Other Comments
                other_comments: state.otherCommentsFormData.otherComments,

            })
            // Successful Response
            .then(response => {
                console.log('Approval Result',response.data);
                // Clear error
                commit('setErrorsVisibility',false);
                // Display successful response
                swal(response.data.header,response.data.message,"success");
                resolve();
            })
            // Error
            .catch(error => {
                console.error( "Error Submitting Registration Application Form");
                console.dir( error.response );
                // If the error is not processable then show error
                if(error.response.status == 500){
                    swal('Error Submitting Registration Application Form', 'An error occurred, please refresh the page and try again. If error persists contact ValidZone', "error");
                    resolve();
                    return ;
                }
                // Display Error message
                swal('Error Submitting Registration Application Form', error.response.data.msg, "error");
                // state.errors.error = error.response.data;
                state.errors.error.record(error.response.data);
                state.errors.visible = true;
                resolve();
            });
        });
    },
}

export default {
  state,
  getters,
  mutations,
  actions,
}