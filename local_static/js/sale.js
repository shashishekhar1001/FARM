const SaleApp = {
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
            purchased_by: null,
            purchaser_contact: null,
            sale_order: null,
            paid_amt: null,
            pending_amt: null,
            status: null,
            success_msg: "",
            err_msg: "",
            errors: [],
            sales: [],
            edit_url: "",
            index: null,
            req_url: "/api/sales/", 
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
                this.sales=response.data.results;
                this.next_page=response.data.next;
                this.prev_page=response.data.previous;
                console.log(this.next_page);
                console.log(this.prev_page);
                console.log(this.sales);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Sales have been loaded',
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
    },
}
  
Vue.createApp(SaleApp).mount('#SaleMgmt')