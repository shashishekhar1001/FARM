const FormApp = {
    delimiters: ['[[', ']]'],
    data() {
        return {
            field_name: null,             
            field_sector: null,           
            field_area: null,             
            field_map: null,              
            field_7_12: null,             
            field_khate_utara: null,      
            field_owner_name: null,       
            field_owner_aadhar_no: null,  
            field_owner_aadhar_scan: null,
            field_owner_pan_no: null,     
            field_owner_pan_scan: null,   
            field_owner_pic: null,        
            field_owner_bank_scan: null, 
            field_owner_bank_acc_no: null,
            username: null,
            success_msg: "",
            err_msg: "",
            errors: [],
            fields: [],
        }
    },
    methods: {
        handleFieldMapUpload(event) {
            this.field_map = event.target.files[0]
        },
        handleField_7_12_Upload(event) {
            this.field_7_12 = event.target.files[0]
        },
        handleFieldKhateUtaraUpload(event) {
            this.field_khate_utara = event.target.files[0]
        },
        handleFieldOwnerPicUpload(event) {
            this.field_owner_pic = event.target.files[0]
        },
        handleFieldOwnerAadharScanUpload(event) {
            this.field_owner_aadhar_scan = event.target.files[0]
        },
        handleFieldOwnerPanScanUpload(event) {
            this.field_owner_pan_scan = event.target.files[0]
        },
        handleFieldOwnerBankScanUpload(event) {
            this.field_owner_bank_scan = event.target.files[0]
        },
        submitForm: function(){
            console.log(this.field_name);
            console.log(this.field_sector);
            console.log(this.field_area);
            console.log(this.field_map);
            console.log(this.field_7_12);
            console.log(this.field_khate_utara);
            console.log(this.field_owner_name);
            console.log(this.field_owner_pic);
            console.log(this.field_owner_aadhar_no);
            console.log(this.field_owner_aadhar_scan);
            console.log(this.field_owner_pan_no);
            console.log(this.field_owner_pan_scan);
            console.log(this.field_owner_bank_acc_no);
            console.log(this.field_owner_bank_scan);
            this.success_msg = ""
            this.err_msg = ""
            const formData = new FormData()
            // formData.append('avatar', this.FILE, this.FILE.name)
            formData.append('field_name', this.field_name)
            formData.append('field_sector', this.field_sector)
            formData.append('field_area', this.field_area)
            formData.append('field_map', this.field_map)
            formData.append('field_7_12', this.field_7_12)
            formData.append('field_khate_utara', this.field_khate_utara)
            formData.append('field_owner_name', this.field_owner_name)
            formData.append('field_owner_pic', this.field_owner_pic)
            formData.append('field_owner_aadhar_no', this.field_owner_aadhar_no)
            formData.append('field_owner_aadhar_scan', this.field_owner_aadhar_scan)
            formData.append('field_owner_pan_no', this.field_owner_pan_no)
            formData.append('field_owner_pan_scan', this.field_owner_pan_scan)
            formData.append('field_owner_bank_acc_no', this.field_owner_bank_acc_no)
            formData.append('field_owner_bank_scan', this.field_owner_bank_scan)
            if (!this.field_name) {
                this.errors.push("Field Name required.");
            }
            if (!this.field_sector) {
                this.errors.push('Field Sector required.');
            } 
            if (!this.field_area) {
                this.errors.push('Field Area required.');
            }
            if (!this.field_map) {
                this.errors.push('Field Map required.');
            }
            if (!this.field_7_12) {
                this.errors.push('Field 7 / 12 required.');
            } 
            if (!this.field_khate_utara) {
                this.errors.push('Field Khate Utara required.');
            }
            if (!this.field_owner_name) {
                this.errors.push('Field Owner Name required.');
            }
            if (!this.field_owner_pic) {
                this.errors.push('Field Owner Pic required.');
            }
            if (!this.field_owner_aadhar_no) {
                this.errors.push('Field Owner Aadhar No. required.');
            }
            if (!this.field_owner_aadhar_scan) {
                this.errors.push('Field Owner Aadhar Scan required.');
            }
            if (!this.field_owner_pan_no) {
                this.errors.push('Field Owner PAN No. required.');
            }
            if (!this.field_owner_pan_scan) {
                this.errors.push('Field Owner PAN Scan. required.');
            }
            if (!this.field_owner_bank_acc_no) {
                this.errors.push('Field Owner Bank Acc. No. required.');
            }
            if (!this.field_owner_bank_scan) {
                this.errors.push('Field Owner Bank Scan. required.');
            }
            if (!this.errors.length) {
                axios({
                    method : "POST",
                    // url:"{% url 'submitform' %}", //django path name
                    url:"/api/fields/", 
                    headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                    data : formData,
                }).then(response => {
                    console.log(response);
                    console.log(response.data);
                    this.field_name= null;             
                    this.field_sector= null;           
                    this.field_area= null;           
                    this.field_map= null;             
                    this.field_7_12= null;             
                    this.field_khate_utara= null;      
                    this.field_owner_name= null;      
                    this.field_owner_aadhar_no= null;  
                    this.field_owner_aadhar_scan= null;
                    this.field_owner_pan_no= null;     
                    this.field_owner_pan_scan= null;   
                    this.field_owner_pic= null;   
                    this.field_owner_bank_scan= null; 
                    this.field_owner_bank_acc_no= null;
                    this.username= null;
                    this.success_msg= "";
                    this.err_msg= "";
                    this.errors= [];
                    document.getElementById("addField").reset();
                    $('#exampleModal').modal('hide');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your field has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }).catch(err => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed ...',
                        text: err,
                    })
                });
            }    
        },
    },
};

Vue.createApp(FormApp).mount('#field_form')