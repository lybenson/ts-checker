import fs from 'fs/promises'
import path from 'path'

const main = async () => {
  const dirs = await fs.readdir('./src')

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i]
    const difficulty = dir.split('-')[1]

    if (!['easy', 'extreme', 'hard', 'medium'].includes(difficulty)) {
      console.log(`${dir} error`)

      continue
    }
    const num = dir.split('-')[0]

    const files = await fs.readdir(`./src/${dir}`)

    files.forEach(async (file) => {
      if (file.toUpperCase() !== 'README.MD') return

      const sourcePath = `./src/${dir}/${file}`
      let content = await fs.readFile(sourcePath, 'utf-8')

      const lines = content.split('\n')
      lines[0] = lines[0].split(' ')[0] + ` ${num} - ${lines[0].split('# ')[1]}`

      lines.splice(
        2,
        0,
        `[Source](https://github.com/lybenson/ts-checker/blob/master/src/${dir}/template.ts)`,
        ''
      )
      content = lines.join('\n')

      const targetPath = `./site/docs/${difficulty}/${dir}.md`
      await fs.writeFile(targetPath, content, 'utf-8')
    })
  }
}

main()
