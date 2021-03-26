const ExpenseApp = {
    delimiters: ['[[', ']]'],
    data() {
        return {
            fields: null,
            field_url: null,
            expenses: null,
            errors: [],
            next_page: null,
            prev_page: null,
            date: null,
            description: null,
            amount: null,
            req_url: "/api/expenses/", 
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
        getAllData: function (url) {
            axios({
                method : "GET",
                url: url, 
                headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
            }).then(response => {
                this.expenses=response.data.results;
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
                axios({
                    method : "GET",
                    url:"/api/fields/", 
                    headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                }).then(response => {
                    this.fields=response.data;
                    var i;
                    for (i = 0; i < this.expenses.length; i++) {
                        var j;
                        for (j = 0; j < this.fields.length; j++) {
                            if (this.expenses[i].field === this.fields[j].url){
                                this.expenses[i].field_name = this.fields[j].field_name;
                            }
                        }
                    }
                    console.log(this.expenses);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your fields & expenses have been loaded',
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

        deleteExpense: function(object, index){
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
                        this.expenses.splice(index, 1);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your field has been deleted!',
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

        onAddExpense: function(){
            console.log(this.date);
            console.log(this.description);
            console.log(this.amount);
            console.log(this.field_url);
            if (!this.field_url) {
                this.errors.push("Field is required.");
            }
            if (!this.amount) {
                this.errors.push("Amount is required.");
            }
            if (!this.date) {
                this.errors.push("Date is required.");
            }
            if (!this.description) {
                this.errors.push("Description is required.");
            }
            if (!this.errors.length) {
                this.success_msg = "";
                this.err_msg = "";
                const formData = new FormData();
                formData.append('field', this.field_url);
                formData.append('date', this.date);
                formData.append('description', this.description);
                formData.append('amount', this.amount);
                axios({
                    method : "POST",
                    url:"/api/expenses/", 
                    headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                    data : formData,
                }).then(response => {
                    expense_obj = response.data;
                    var j;
                    for (j = 0; j < this.fields.length; j++) {
                        if (expense_obj.field === this.fields[j].url){
                            expense_obj.field_name = this.fields[j].field_name;
                        }
                    }
                    this.expenses.unshift(expense_obj);
                    console.log(this.expenses);
                    this.field_url = "";
                    this.date = "";
                    this.description = "";
                    this.amount = "";
                    document.getElementById("addExpense").reset();
                    $('#addExpenseModal').modal('hide');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your expenses have been loaded',
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
            }
        },

        show_page(number) {
            this.page_url = this.req_url.concat("?page=").concat(number);
            this.getAllData(this.page_url);
            this.current_page = number;
        },

        editExpense: function(object, index){
            this.date = object.date;
            this.field_url = object.field;
            this.field_name = object.field_name;
            this.id = object.id;
            this.description = object.description; 
            this.amount =object.amount;  
            this.url = object.url;
            this.index = index;
            console.log(this.date);
            console.log(this.field_url);
            console.log(this.field_name);
            console.log(this.id);
            console.log(this.description);
            console.log(this.amount);
            console.log(this.url);
            console.log(this.index);
        },

        onEditExpense: function(){
            console.log(this.date);
            console.log(this.description);
            console.log(this.amount);
            console.log(this.field_url);
            if (!this.field_url) {
                this.errors.push("Field is required.");
            }
            if (!this.amount) {
                this.errors.push("Amount is required.");
            }
            if (!this.date) {
                this.errors.push("Date is required.");
            }
            if (!this.description) {
                this.errors.push("Description is required.");
            }
            if (!this.errors.length) {
                this.success_msg = "";
                this.err_msg = "";
                const formData = new FormData();
                formData.append('field', this.field_url);
                formData.append('date', this.date);
                formData.append('description', this.description);
                formData.append('amount', this.amount);
                axios({
                    method : "PUT",
                    url: this.url, 
                    headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                    data : formData,
                }).then(response => {
                    expense_obj = response.data;
                    var j;
                    for (j = 0; j < this.fields.length; j++) {
                        if (expense_obj.field === this.fields[j].url){
                            expense_obj.field_name = this.fields[j].field_name;
                        }
                    }
                    this.expenses.splice(this.index, 1);
                    this.expenses.unshift(expense_obj);
                    console.log(this.expenses);
                    this.field_url = "";
                    this.date = "";
                    this.description = "";
                    this.amount = "";
                    document.getElementById("editExpense").reset();
                    $('#editExpenseModal').modal('hide');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your expenses have been loaded',
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
            }
        },
    },  
};

Vue.createApp(ExpenseApp).mount('#ExpenseMgmt')