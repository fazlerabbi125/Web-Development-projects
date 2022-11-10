import { ref, watchEffect } from "vue";
function useFetch(url) {
    let data = ref(null);
    const error = ref(null);
    const isPending = ref(true);
    const load = async () => {
        try {
            let res = await fetch(url);
            if (!res.ok) throw Error(`Data can't be fetched for that resource`);
            data.value = await res.json();
            isPending.value = false;
        } catch (err) {
            error.value = err.message;
            isPending.value = false;
            console.log(error.value);
        }
    };
    watchEffect(() => load());
    return { data, error, isPending };
}

export default useFetch;
