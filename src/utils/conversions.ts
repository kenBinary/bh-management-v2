export function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(',');
    let mime = "";
    const matches = arr[0].match(/:(.*?);/);
    if (matches && matches.length > 0) {
        mime = matches[1];
    }
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}