const WaterApp = {
    delimiters: ['[[', ']]'],
    data() {
        return {
            fields: null,
            waters: null,
            field_url: null,
            start: null,
            end: null,
            mode: null,
            source: null,
            errors: [],
            next_page: null,
            prev_page: null,
            req_url: "/api/waters/", 
        }
    },
    mounted() {
        this.getAllData(this.req_url);
    },
    methods: {
        onEditWater: function(){
            console.log(this.field_url);
            console.log(this.start);
            console.log(this.end);
            console.log(this.mode);
            console.log(this.source);
            if (!this.field_url) {
                this.errors.push("Field is required.");
            }
            if (!this.start) {
                this.errors.push("Start time is required.");
            }
            if (!this.end) {
                this.errors.push("End time is required.");
            }
            if (!this.mode) {
                this.errors.push("Mode is required.");
            }
            if (!this.source) {
                this.errors.push("Source is required.");
            }
            if(this.start > this.end) {
                this.errors.push("Check Start and End Time");
            }
            if (!this.errors.length) {
                this.success_msg = "";
                this.err_msg = "";
                const formData = new FormData();
                formData.append('field', this.field_url);
                formData.append('start', this.start);
                formData.append('end', this.end);
                formData.append('mode', this.mode);
                formData.append('source', this.source);
                axios({
                    method : "PUT",
                    url: this.url, 
                    headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                    data : formData,
                }).then(response => {
                    water_obj = response.data;
                    var j;
                    for (j = 0; j < this.fields.length; j++) {
                        if (water_obj.field === this.fields[j].url){
                            water_obj.field_name = this.fields[j].field_name;
                        }
                    }
                    this.waters.splice(this.index, 1);
                    this.waters.unshift(water_obj);
                    console.log(this.waters);
                    this.field_url = "";
                    this.start = "";
                    this.end = "";
                    this.mode = "";
                    this.source = "";
                    document.getElementById("editWater").reset();
                    $('#editWaterModal').modal('hide');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your waters have been loaded',
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
        editWater: function(object, index){
            this.end = object.end;
            this.field_url = object.field;
            this.field_name = object.field_name;
            this.id = object.id;
            this.mode = object.mode; 
            this.source =object.source;  
            this.start = object.start;
            this.url = object.url;
            this.index = index;
            console.log(this.end);
            console.log(this.field);
            console.log(this.field_name);
            console.log(this.id);
            console.log(this.mode);
            console.log(this.source);
            console.log(this.start);
            console.log(this.url);
            console.log(this.index);
        },
        deleteWater: function(object, index){
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
                        this.waters.splice(index, 1);
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
        show_prev: function (){
            console.log("Show Previous");
            this.getAllData(this.prev_page);
        },

        show_next: function (){
            console.log("Show Next");
            this.getAllData(this.next_page);
        },

        getAllData: function (url) {
            axios({
                method : "GET",
                url: url, 
                headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
            }).then(response => {
                this.waters=response.data.results;
                this.next_page=response.data.next;
                this.prev_page=response.data.previous;
                console.log(this.next_page);
                console.log(this.prev_page);
                axios({
                    method : "GET",
                    url:"/api/fields/", 
                    headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                }).then(response => {
                    this.fields=response.data;
                    var i;
                    for (i = 0; i < this.waters.length; i++) {
                        var j;
                        for (j = 0; j < this.fields.length; j++) {
                            if (this.waters[i].field === this.fields[j].url){
                                this.waters[i].field_name = this.fields[j].field_name;
                            }
                        }
                    }
                    console.log(this.waters);
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
            }).catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed Loading Data...',
                    text: err,
                })
            });
        },

        onAddWater: function(){
            console.log(this.field_url);
            console.log(this.start);
            console.log(this.end);
            console.log(this.mode);
            console.log(this.source);
            if (!this.field_url) {
                this.errors.push("Field is required.");
            }
            if (!this.start) {
                this.errors.push("Start time is required.");
            }
            if (!this.end) {
                this.errors.push("End time is required.");
            }
            if (!this.mode) {
                this.errors.push("Mode is required.");
            }
            if (!this.source) {
                this.errors.push("Source is required.");
            }
            if(this.start > this.end) {
                this.errors.push("Check Start and End Time");
            }
            if (!this.errors.length) {
                this.success_msg = "";
                this.err_msg = "";
                const formData = new FormData();
                formData.append('field', this.field_url);
                formData.append('start', this.start);
                formData.append('end', this.end);
                formData.append('mode', this.mode);
                formData.append('source', this.source);
                axios({
                    method : "POST",
                    url:"/api/waters/", 
                    headers: {'X-CSRFTOKEN': '{{ csrf_token }}', 'Content-Type': 'application/json'},
                    data : formData,
                }).then(response => {
                    water_obj = response.data;
                    var j;
                    for (j = 0; j < this.fields.length; j++) {
                        if (water_obj.field === this.fields[j].url){
                            water_obj.field_name = this.fields[j].field_name;
                        }
                    }
                    this.waters.unshift(water_obj);
                    console.log(this.waters);
                    this.field_url = "";
                    this.start = "";
                    this.end = "";
                    this.mode = "";
                    this.source = "";
                    document.getElementById("addWater").reset();
                    $('#addWaterModal').modal('hide');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your waters have been loaded',
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

Vue.createApp(WaterApp).mount('#waterMgmt')