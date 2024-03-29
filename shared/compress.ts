import * as fs from "fs";
import * as Ffmpeg from "fluent-ffmpeg";

export const compressVideo = async (fileId: string, fileBuffer: Buffer, compression: number,  fps: number, duration?: number) => {

	try {
		const inputFilePath = "/tmp/"+fileId+".tmp";
		const outputFilePath = "/tmp/"+fileId+".mp4";

		fs.writeFileSync(inputFilePath, <Buffer>fileBuffer);

		await new Promise((resolve, reject) => {

			let video = Ffmpeg(inputFilePath)
				.videoCodec('libx264')
				.format('mp4')
				.fps(fps)
				.outputOptions([
					"-crf",
					compression.toString(),
				])
				.output(outputFilePath)
				.on('close', error => reject(error))
				.on('exit', error => reject(error))
				.on('error', error => reject(error))
				.on('end', function() {
					resolve(true);
				})
				.screenshot({
					timestamps: ['00:00.000'],
					filename: fileId+'.snapshot.jpg',
					folder: '/tmp/',
					size: '300x?'
				});

			if(duration) video = video.duration(duration).size("600x?");

			video.run();



		});

		return outputFilePath;
	} catch(err) {
		console.log(err);
		throw err;
	}

};

export const compressImage = async (fileId: string, fileBuffer: Buffer, compression: number) => {

	try {
		const inputFilePath = "/tmp/"+fileId+".tmp";
		const outputFilePath = "/tmp/"+fileId+".jpg";

		fs.writeFileSync(inputFilePath, <Buffer>fileBuffer);

		await new Promise((resolve, reject) => {

			let image = Ffmpeg(inputFilePath)
				.inputOptions(["-noautorotate"])
				.outputOptions([
					"-q:v",
					compression.toString(),
				])
				.size('?x2000')
				.output(outputFilePath)
				.native()
				.on('close', error => reject(error))
				.on('exit', error => reject(error))
				.on('error', error => reject(error))
				.on('end', function() {
					resolve(true);
				})

			image.run();

		});

		return outputFilePath;
	} catch(err) {
		console.log(err);
		throw err;
	}


};

export const compressProfileImage = async (fileId: string, fileBuffer: Buffer) => {

	try {
		const inputFilePath = "/tmp/"+fileId+".tmp";
		const outputFilePath = "/tmp/"+fileId+".jpg";

		fs.writeFileSync(inputFilePath, <Buffer>fileBuffer);

		await new Promise((resolve, reject) => {

			let image = Ffmpeg(inputFilePath)
				.inputOptions(["-noautorotate"])
				.outputOptions([
					"-q:v 31",
				])
				.size('?x500')
				.output(outputFilePath)
				.native()
				.on('close', error => reject(error))
				.on('exit', error => reject(error))
				.on('error', error => reject(error))
				.on('end', function() {
					resolve(true);
				})

			image.run();

		});

		return outputFilePath;
	} catch(err) {
		console.log(err);
		throw err;
	}


};
