import { useState, useEffect, PropsWithChildren } from "react";

export default function RenderGate({ children }: PropsWithChildren) {
    const [showPages, setShowPages] = useState<boolean>(false);

    useEffect(() => {
        /*  Next.js performs a server render before the client render and so sessionStorage, localStorage and other properties
                of the window object are not defined.Therefore, you'll not be able to access these properties
                until the page has loaded on the client and the window object has been defined.
                To fix this issue, you'll need to wait until the page has been mounted on the client prior to 
                accessing these properties which is done by passing an empty dependency array to wait for only initial render. 
                
                Here's another way of doing this:
        
                    if (typeof window !== 'undefined') {
                    // Perform localStorage action
                    const item = localStorage.getItem('key')
                    }
            */
        setShowPages(true);
    }, []);
    /*The useEffect will only run on the client side, so you can safely access window object properties now.
    Page will not not load until initial render occurs and sets showPages to true
      */
    if (!showPages) return null;

    return <>{children}</>;
}
