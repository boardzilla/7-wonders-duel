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
    prompt: `I'd like to show the following: ${name}.

I'd like it to be a REALISTIC COLOR ILLUSTRATION as through from a photograph. It should have an appropriate amount of human activity, but LIMIT THE NUMBER OF HUMANS TO TWO. I want the time period to be from bronze age or iron age, or as though it could have been Roman, Greek or Egyptian.

It is very important that there MUST NOT BE ANY added borders, framing OR cropping. The image MUST go to the edges and contain no text.`,
    size: "1024x1792",
    model: "dall-e-3",
  })
  console.log(response)
  console.log("Writing", filePath)
  await new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    const request = http.get(response.data[0].url!, function(response) {
      response.pipe(file).on("finish", () => {
        file.close();
        console.log("Download Completed");
        resolve()
    })
      // after download completed close filestream
      // file.on("finish", () => {
      // });
      file.on('error', reject)
   });
  })
  const elapsed = 12000 - (Date.now() - startTime)
  if (elapsed > 0) {
    console.log("waiting", elapsed)
    await new Promise(resolve => setTimeout(resolve, elapsed))
  }
  // process.exit(1)
}
