export default {
    template: `<nav aria-label="Page navigation ">
    <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: pages.current_page === 1}">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="renderPage(pages.current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page" :class="{active: pages.current_page === page}">
        <a class="page-link" href="#" @click.prevent="renderPage(page)">{{  page  }}</a>
        </li>
        <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages}">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="renderPage(pages.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>`,
    props: ['pages'],
    methods: {
        renderPage(num){
            this.$emit('render', num)
        },
    },
};

// 1. 分頁
//      1-1 分頁箭頭 上一頁 下一頁 連結
//      1-2 第一頁 : 左箭頭默認
//      1-3 最後一頁 : 右箭頭默認
// 2. 編輯產品
// 3. 刪除產品
// 4. 新增產品