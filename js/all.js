import pagination from './pagination.js';
import modal from './modal.js';
import delmodal from './delmodal.js';

Vue.component('pagination', pagination);
Vue.component('modal', modal);
Vue.component('delmodal', delmodal);

new Vue({
    el: '#app',
    data: {
        products: [],
        editProducts: {
            imageUrl: []
        },
        pagination: {},
        api: {
            uuid: 'daa979c0-17ef-4c8f-8a22-f4834d3fce7a',
            path: 'https://course-ec-api.hexschool.io/'
        },
        status:{
            fileUploading: false,
        },   
        token: 'aXCJibK9z3s8tZrAVZR4jexDZrrMqFBnag46qZnzY6BHCcvVPIDELVJKxcux',
    },
    methods: {
        createdProduct(create) {
            // api/{uuid}/admin/ec/product
            const url = `${this.api.path}api/${this.api.uuid}/admin/ec/product`;
            this.editProducts = { 
                imageUrl: [] 
            };
            this.create = true;
            $('#createdItem').modal('show');
        },
        editProduct(item) {
            // api/{uuid}/admin/ec/product/{id}
            const url = `${this.api.path}api/${this.api.uuid}/admin/ec/product/${item.id}`;
            axios.get(url)
                .then((res) => {
                    this.editProducts = res.data.data;
                    $('#createdItem').modal('show');
                })
        },
        removeProduct(item) {
            this.editProducts = Object.assign({}, item)
            $('#removeItem').modal('show');
        },
        getProducts(pageNum = 1) {
            const url = `${this.api.path}api/${this.api.uuid}/admin/ec/products?page=${pageNum}`;
            axios.get(url)
                .then((res) => {
                    this.products = res.data.data;
                    this.pagination = res.data.meta.pagination;
                    if(this.editProducts.id) {
                        this.editProducts = {  
                            imageUrl: [] 
                        };
                        $('#createdItem').modal('hide');
                    };
                }).catch((err) => {
                    console.log(err);
                });
        },

    },
    created() {
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.getProducts();

    },

});