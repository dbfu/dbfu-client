
import myForm from "./components/common/my-form"
import myFormItem from "./components/common/form-item"
import searchForm from "./components/common/search-form"
import grid from "./components/common/grid"
import tip from "./components/common/tip"
import rowAttr from "./components/common/row-attr"
import colAttr from "./components/common/col-attr"
import buttonAttr from "./components/common/button-attr"
import slide from "./components/common/slide"
import formAttr from "./components/common/form-attr"
import formItemAttr from "./components/common/form-item-attr"

import dMyForm from "./components/template/my-form"

let Index = {}

Index.install = function (Vue, options) {
    Vue.component("my-form", myForm);
    Vue.component("my-form-item", myFormItem);
    Vue.component("search-form", searchForm);
    Vue.component("grid", grid);
    Vue.component("tip", tip);
    Vue.component("el-row-attr", rowAttr);
    Vue.component("el-col-attr", colAttr);
    Vue.component("el-button-attr", buttonAttr);
    Vue.component("slide", slide);
    Vue.component("my-form-attr", formAttr);
    Vue.component("my-form-item-attr", formItemAttr);
    
    Vue.component("d-my-form", dMyForm);

    
    Vue.directive("draggable", {
        bind: function (el, binding, vnode) {
            let option = {
                helper: "clone",
                cancel: false,
                zIndex: 9999,
                appendTo: "body"
            }
            if (binding.value && typeof (binding.value) === "object") {
                option = {
                    ...option,
                    ...binding.value
                }
            }
            $(el).draggable(
                option
            );
        },
        unbind: function (el) {
            $(el).draggable("destroy");
        }
    });


    Vue.directive("droppable", {
        bind: function (el, binding, vnode) {
            $(el).droppable({
                greedy: true,
                drop: (e, ui) => {
                    let drop = binding.value;
                    drop && drop(e, ui, el);
                }
            });
        },
        unbind: function (el) {
            $(el).droppable("destroy");
        }
    });

}

export default Index