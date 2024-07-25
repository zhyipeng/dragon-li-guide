import { reactive } from "vue";
import { Context } from "./typed";

const context = reactive<Context>({
    key: null
})

const cache = localStorage.getItem('key')
if (cache) {
    context.key = cache
}

export default context