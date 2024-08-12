
export function speak(msg: string) {
    let utterance = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(utterance);
}