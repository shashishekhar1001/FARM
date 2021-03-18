const FormApp = {
    delimiters: ['[[', ']]'],
    data() {
        return {
            field_name: "HI",    
        }
    },
    mounted() {
        axios({
            method : "GET",
            url:"/api/waters/", 
            headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
        }).then(response => {
            console.log(response.data);
            this.fields=response.data;
            console.log(this.fields);
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
            console.log(response.data);
            this.fields=response.data;
            console.log(this.fields);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your fields & waters have been loaded',
                showConfirmButton: false,
                timer: 1500
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

Vue.createApp(FormApp).mount('#water')