const PurchaseApp = {
    delimiters: ['[[', ']]'],
    data() {
        return {
            date: null,
            description: null,
            crop: null,
            rate: null,
            total_bill: null,
            quantity_uom: null,
            quantity: null,
            reciept: null,
            sold_by: null,
            seller_contact: null,
            purchase_order: "PO",
            paid_amt: null,
            pending_amt: null,
            status: null,
            success_msg: "",
            err_msg: "",
            errors: [],
            purchases: [],
            edit_url: "",
            index: null,
            req_url: "/api/purchases/", 
            count: null,
            no_of_pages: null,
            page_size: 3,
            page_url: null,
            current_page: 1,
        }
    },
    mounted() {
        this.getAllData(this.req_url);
    },
    methods: {
        onAddPurchase: function(){
            console.log("this.date");
            console.log(this.date);
            console.log("this.description");
            console.log(this.description);
            console.log("this.crop");
            console.log(this.crop);
            console.log("this.rate");
            console.log(this.rate);
            console.log("this.total_bill");
            console.log(this.total_bill);
            console.log("this.quantity_uom");
            console.log(this.quantity_uom);
            console.log("this.quantity");
            console.log(this.quantity);
            console.log("this.reciept");
            console.log(this.reciept);
            console.log("this.sold_by");
            console.log(this.sold_by);
            console.log("this.seller_contact");
            console.log(this.seller_contact);
            console.log("this.purchase_order");
            console.log(this.purchase_order);
            console.log("this.paid_amt");
            console.log(this.paid_amt);
            console.log("this.pending_amt");
            console.log(this.pending_amt);
            console.log("this.status");
            console.log(this.status);
            this.success_msg = ""
            this.err_msg = ""
            const formData = new FormData()
            formData.append('date', this.date)
            formData.append('description', this.description)
            formData.append('crop', this.crop)
            formData.append('rate', this.rate)
            formData.append('total_bill', this.total_bill)
            formData.append('quantity_uom', this.quantity_uom)
            formData.append('quantity', this.quantity)
            formData.append('reciept', this.reciept)
            formData.append('sold_by', this.sold_by)
            formData.append('seller_contact', this.seller_contact)
            formData.append('purchase_order', this.purchase_order)
            formData.append('paid_amt', this.paid_amt)
            formData.append('pending_amt', this.pending_amt)
            formData.append('status', this.status)
            if (!this.date) {
                this.errors.push("Date required.");
            }
            if (!this.description) {
                this.errors.push("Description required.");
            }
            if (!this.crop) {
                this.errors.push("Crop Selection required.");
            }
            if (!this.rate) {
                this.errors.push("Rate per Qty UOM required.");
            }
            if (!this.total_bill) {
                this.errors.push("Total Bill required.");
            }
            if (!this.quantity_uom) {
                this.errors.push("Quantity UOM required.");
            }
            if (!this.quantity) {
                this.errors.push("Quantity required.");
            }
            if (!this.seller_contact) {
                this.errors.push("Purchaser Contact required.");
            }
            if (!this.sold_by) {
                this.errors.push("Purchased By required.");
            }
            if (!this.reciept) {
                this.errors.push("Receipt required.");
            }
            if (!this.paid_amt) {
                this.errors.push("Paid Amt. required.");
            }
            // if (!this.pending_amt) {
            //     this.errors.push("Pending Amt. required.");
            // }
            if (!this.status) {
                this.errors.push("Status required.");
            }
            if (!this.errors.length) {
                axios({
                    method : "POST",
                    url: this.req_url, 
                    headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                    data : formData,
                }).then(response => {
                    console.log(response);
                    console.log(response.data);
                    this.status = null;
                    this.pending_amt = null;
                    this.paid_amt = null;
                    this.reciept = null;
                    this.sold_by = null;
                    this.seller_contact = null;
                    this.quantity = null;
                    this.quantity_uom = null;
                    this.total_bill = null;
                    this.rate = null;
                    this.crop = null;
                    this.date = null;
                    this.description = null;
                    this.success_msg= "";
                    this.err_msg= "";
                    this.errors= [];
                    this.purchases.unshift(response.data);
                    document.getElementById("addPurchase").reset();
                    $('#addPurchaseModal').modal('hide');
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

        onEditPurchase: function(){
            console.log("this.date");
            console.log(this.date);
            console.log("this.description");
            console.log(this.description);
            console.log("this.crop");
            console.log(this.crop);
            console.log("this.rate");
            console.log(this.rate);
            console.log("this.total_bill");
            console.log(this.total_bill);
            console.log("this.quantity_uom");
            console.log(this.quantity_uom);
            console.log("this.quantity");
            console.log(this.quantity);
            console.log("this.reciept");
            console.log(this.reciept);
            console.log("this.sold_by");
            console.log(this.sold_by);
            console.log("this.seller_contact");
            console.log(this.seller_contact);
            console.log("this.purchase_order");
            console.log(this.purchase_order);
            console.log("this.paid_amt");
            console.log(this.paid_amt);
            console.log("this.pending_amt");
            console.log(this.pending_amt);
            console.log("this.status");
            console.log(this.status);
            this.success_msg = ""
            this.err_msg = ""
            const formData = new FormData()
            formData.append('date', this.date)
            formData.append('description', this.description)
            formData.append('crop', this.crop)
            formData.append('rate', this.rate)
            formData.append('total_bill', this.total_bill)
            formData.append('quantity_uom', this.quantity_uom)
            formData.append('quantity', this.quantity)
            formData.append('reciept', this.reciept)
            formData.append('sold_by', this.sold_by)
            formData.append('seller_contact', this.seller_contact)
            formData.append('purchase_order', this.purchase_order)
            formData.append('paid_amt', this.paid_amt)
            formData.append('pending_amt', this.pending_amt)
            formData.append('status', this.status)
            if (!this.date) {
                this.errors.push("Date required.");
            }
            if (!this.description) {
                this.errors.push("Description required.");
            }
            if (!this.crop) {
                this.errors.push("Crop Selection required.");
            }
            if (!this.rate) {
                this.errors.push("Rate per Qty UOM required.");
            }
            if (!this.total_bill) {
                this.errors.push("Total Bill required.");
            }
            if (!this.quantity_uom) {
                this.errors.push("Quantity UOM required.");
            }
            if (!this.quantity) {
                this.errors.push("Quantity required.");
            }
            if (!this.seller_contact) {
                this.errors.push("Purchaser Contact required.");
            }
            if (!this.sold_by) {
                this.errors.push("Purchased By required.");
            }
            if (!this.reciept) {
                this.errors.push("Receipt required.");
            }
            if (!this.paid_amt) {
                this.errors.push("Paid Amt. required.");
            }
            // if (!this.pending_amt) {
            //     this.errors.push("Pending Amt. required.");
            // }
            if (!this.status) {
                this.errors.push("Status required.");
            }
            if (!this.errors.length) {
                axios({
                    method : "PUT",
                    url: this.url, 
                    headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                    data : formData,
                }).then(response => {
                    console.log(response);
                    console.log(response.data);
                    this.status = null;
                    this.pending_amt = null;
                    this.paid_amt = null;
                    this.reciept = null;
                    this.sold_by = null;
                    this.seller_contact = null;
                    this.quantity = null;
                    this.quantity_uom = null;
                    this.total_bill = null;
                    this.rate = null;
                    this.crop = null;
                    this.date = null;
                    this.description = null;
                    this.success_msg= "";
                    this.err_msg= "";
                    this.errors= [];
                    this.purchases.splice(this.index, 1);
                    this.purchases.unshift(response.data);
                    document.getElementById("editPurchase").reset();
                    $('#editpurchaseModal').modal('hide');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your Purchase Edit has been saved',
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


        getAllData: function (url) {
            axios({
                method : "GET",
                url: url, 
                headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
            }).then(response => {
                console.log(response.data);
                this.purchases=response.data.results;
                this.next_page=response.data.next;
                this.prev_page=response.data.previous;
                this.count=response.data.count;
                if (this.count > this.page_size) {
                    console.log("Show Page No's.");
                    this.no_of_pages=Math.ceil(this.count / this.page_size);
                    console.log(this.no_of_pages);
                }
                console.log(this.next_page);
                console.log(this.prev_page);
                console.log(this.purchases);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your purchases have been loaded',
                    showConfirmButton: false,
                    timer: 1000
                });
            }).catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed Loading Data...',
                    text: err,
                })
            });
        },

        show_prev: function (){
            console.log("Show Previous");
            this.getAllData(this.prev_page);
        },

        show_next: function (){
            console.log("Show Next");
            this.getAllData(this.next_page);
        },

        deletepurchase: function(object, index){
            console.log(object.url);
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        method : "DELETE",
                        url: object.url, 
                        headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                    }).then(response => {
                        console.log(response.data);
                        this.purchases.splice(index, 1);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your PO has been deleted!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }).catch(err => {
                        console.log(err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to delete ...',
                            text: err,
                        })
                    });
                }
            });
        },
        
        handleRecieptUpload(event) {
            this.reciept = event.target.files[0]
        },

        show_page(number) {
            this.page_url = this.req_url.concat("?page=").concat(number);
            this.getAllData(this.page_url);
            this.current_page = number;
        },

        editPurchase: function(object, index){
            this.status = object.status;
            this.pending_amt = object.pending_amt;
            this.paid_amt = object.paid_amt;
            this.reciept = object.reciept;
            this.sold_by = object.sold_by;
            this.seller_contact = object.seller_contact;
            this.quantity = object.quantity;
            this.quantity_uom = object.quantity_uom;
            this.total_bill = object.total_bill;
            this.rate = object.rate;
            this.crop = object.crop;
            this.date = object.date;
            this.description = object.description;
            this.url=object.url;
            this.index = index;
        },
    },

    
}
  
Vue.createApp(PurchaseApp).mount('#PurchaseMgmt')