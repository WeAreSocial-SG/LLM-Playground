import {pipeline} from 'node:stream/promises';
import {createWriteStream} from 'node:fs';
import { Readable } from 'stream';
import got from 'got';
import constants from './constants.js';

const apiKey = constants.narakeetApiKey
const voice = 'anong'
// const text = `คุณเคยได้ยินเรื่องตลกนี้หรือไม่? มีคนถามพระว่า "พระคุณทำไมถึงไม่เดินไปทางอื่น?" พระตอบว่า "ฉันไม่สามารถเดินผ่านช่องแคบ ๆ ได้" คนที่ถามจึงถามต่อ "แล้วทำไมคุณไม่เดินไปทางอื่น?" พระตอบว่า "ฉันก็ไม่สามารถเดินผ่านช่องแคบ ๆ ได้!"`;

export default async function createNarakeetAudio(text){
    console.log('start stream')
    const fileName = `audioUrl.mp3`
    await pipeline(
        Readable.from([text]),
        got.stream.post(
            `https://api.narakeet.com/text-to-speech/mp3?voice=${voice}&voice-speed=1.2`,
            {
                headers: {
                    'accept': 'application/octet-stream',
                    'x-api-key': apiKey,
                    'content-type': 'text/plain'
                }
            },
        ),
        createWriteStream(`public/${fileName}`)
    );
    console.log('end stream')
    return fileName
}






