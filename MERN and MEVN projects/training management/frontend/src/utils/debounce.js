function debounce (cb,delay=1000){
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => { 
            cb(...args)
        }, delay);
    };
}

export default debounce;
