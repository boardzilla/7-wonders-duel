import http from 'http'
import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import { cards } from "./src/game/cards"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const program = new Command()
program.option('-n, --name <name>', 'Name of card to generate')
program.option('-f, --force', 'Force overwriting')
program.parse(process.argv)
const options = program.opts()

for await (const card of cards) {
  if (options.name && card.name !== options.name) continue
  const name = card.name!
  const filePath = path.join("images", `${name}.png`)
  if (fs.existsSync(filePath) && options.force !== true) continue
  const startTime = new Date().getTime()
  console.log("working on",name)
  const response = await openai.images.generate({
    prompt: `I'd like it to show the following bustling with activity befitting the place. It should be roughly bronze age to iron age in appearance as though it could have been Roman, Greek or Egyptian. I'd like to style to be like a photograph taken in portrait mode with no cropping, but then was stylized slight, so as not to look like a photograph. It should have a painterly style applied to it, but still preserve the original photograph.\n\n${name}`,
    size: "1024x1792",
    model: "dall-e-3"
  })
  console.log(response)
  console.log("Writing", filePath)
  await new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    const request = http.get(response.data[0].url!, function(response) {
      response.pipe(file);
      // after download completed close filestream
      file.on("finish", () => {
          file.close();
          console.log("Download Completed");
          resolve()
      });
      file.on('error', reject)
   });
  })
  const elapsed = 12000 - (Date.now() - startTime)
  if (elapsed > 0) {
    console.log("waiting", elapsed)
    await new Promise(resolve => setTimeout(resolve, elapsed))
  }
}
