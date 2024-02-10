export function capitalizeWords(text: string): string {
    if (!text) {
        return "";
    }
    const words = text.split(" ");
    const modifiedWords = words.map((e) => {
        const firstLetter = e.charAt(0).toUpperCase();
        const newWord = e.replace(e.charAt(0), firstLetter);
        return newWord;
    });
    return modifiedWords.join(" ");
}