import { useEffect, useState } from "react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useEffectAfterMount(cb: () => void, dependencies: Array<any>) {
    useEffect(() => {


    }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}