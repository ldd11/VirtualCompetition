export async function getCanvasFromBase64(base64: string, width: number, height: number) {
    return new Promise<HTMLCanvasElement>((resolve, reject) => {
        const imageObj = new Image();
        imageObj.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx?.drawImage(imageObj, 0, 0, width, height);

            resolve(canvas);
        }
        imageObj.src = base64;
    });
}