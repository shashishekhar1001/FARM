const FormApp = {
    delimiters: ['[[', ']]'],
    data() {
        return {
            fields: null,
            waters: null,
        }
    },
    mounted() {
        axios({
            method : "GET",
            url:"/api/waters/", 
            headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
        }).then(response => {
            this.waters=response.data;
            console.log(this.waters);
        }).catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Failed Loading Data...',
                text: err,
            })
        });

        axios({
            method : "GET",
            url:"/api/fields/", 
            headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
        }).then(response => {
            this.fields=response.data;
            console.log(this.fields);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your fields & waters have been loaded',
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
    methods: {
    }
        
};

Vue.createApp(FormApp).mount('#waterMgmt')