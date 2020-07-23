export default {
    template: `
    <div class="modal-dialog" role="document">
    <div class="modal-content ">
        <div class="modal-header  bg-danger ">
            <h5 class="modal-title text-white">刪除產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            是否刪除 <em class="h5 text-primary">{{  editProducts.title  }}</em> 商品(刪除後將無法恢復)。
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary text-primary"
                data-dismiss="modal">先不要</button>
            <button type="button" class="btn btn-danger text-white" @click="confirmDelete">確認刪除</button>
        </div>
    </div>
    </div>`,
    data(){
        return{
            
        };
    },
    props:['editProducts', 'api'],
    methods: { 
        confirmDelete(){
            const url = `${this.api.path}api/${this.api.uuid}/admin/ec/product/${this.editProducts.id}`;
            axios.delete(url)
                .then((res)=>{
                    $('#removeItem').modal('hide');
                    this.$emit('edited')
                })
        },
    }
};