export default {
    template: `
    <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLongTitle">新增產品</h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label for="image">圖片網址</label>
                                <input id="image" placeholder="輸入圖片來源網址" class="form-control"
                                    v-model="editProducts.imageUrl[0]">
                                <img :src="editProducts.imageUrl[0]" alt="" class="img-fluid mt-3">
                            </div>
                            <div class="form-group">
                                <lable for="customFile" v-if="status.fileUploading">
                                </lable>
                                <input type="file" id="customFile" class="form-group text-fluid" @change="uploadFile">
                                <img :src="filePath" class="img-fluid" alt="">
                                {{ filePath }}
                            </div>
                        </div>
                        <div class="col-sm-7">
                            <form>
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title" v-model="editProducts.title"
                                        placeholder="請輸入標題">
                                </div>
                            </form>
                            <div class="row">
                                <div class="col-sm-6">
                                    <form>
                                        <div class="form-group">
                                            <label for="category">分類</label>
                                            <input type="text" class="form-control" id="category"
                                                v-model="editProducts.category" placeholder="請輸入分類">
                                        </div>
                                        <div class="form-group">
                                            <label for="origin_price">原價</label>
                                            <input type="text" class="form-control" id="origin_price"
                                                v-model="editProducts.origin_price" placeholder="請輸入原價">
                                        </div>
                                    </form>
                                </div>
                                <div class="col-sm-6">
                                    <form>
                                        <div class="form-group">
                                            <label for="unit">單位</label>
                                            <input type="text" class="form-control" id="unit"
                                                v-model="editProducts.unit" placeholder="請輸入單位">
                                        </div>
                                        <div class="form-group">
                                            <label for="price">售價</label>
                                            <input type="text" class="form-control" id="price"
                                                v-model="editProducts.price" placeholder="請輸入售價">
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label for="description">產品描述</label>
                                <textarea class="form-control" id="description"
                                    v-model="editProducts.description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="content">說明內容</label>
                                <textarea class="form-control" id="content" v-model="editProducts.content"></textarea>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="enabled"
                                    v-model="editProducts.enabled" required>
                                <label class="form-check-label" for="enabled">
                                    是否啟用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-outline-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            filePath: '',
        };
    },
    methods: {
        updateProduct(){
            const editUrl = `${this.api.path}api/${this.api.uuid}/admin/ec/product/${this.editProducts.id}`;
            const createUrl = `${this.api.path}api/${this.api.uuid}/admin/ec/product`;
            console.log(this)
            if(!this.create){
                axios.patch(editUrl, this.editProducts)
                    .then((res)=>{
                        this.$emit('edited');
                    }).catch((err)=>{
                        console.log(err);
                    })
            }else{
                axios.post(createUrl, this.editProducts)
                    .then(()=>{
                        this.$emit('edited');
                        $('#createdItem').modal('hide');
                    }).catch((err)=>{
                        console.log(err);
                    })
            };
        },
        uploadFile(){
            // POST api/{uuid}/admin/storage
            const uploadedFile = document.querySelector('#customFile').files[0];
            console.dir(uploadedFile);
            const formData = new FormData();
            formData.append('file', uploadedFile)
            this.status.fileUploading = true;
            const url = `${this.api.path}api/${this.api.uuid}/admin/storage`;
            axios.post(url, formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data',
                }
            }).then((res)=>{
                console.log(res);
                this.status.fileUploading = false;
                this.filePath = res.data.data.path;
                if (res.status === 200) {
                    this.editProducts.imageUrl.push(this.filePath);
                }
            }).catch((err)=>{
                console.log(err);
            });
        },
    },
    props: ['editProducts', 'api', 'create', 'status'],
};