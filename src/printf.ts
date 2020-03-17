import sprintf from './sprintf'

export default function printf (format:string, ...a:Array<any>) {
  if (process) {
    return process.stdout.write(sprintf(format, ...a))
  }
  return console.log(sprintf(format, ...a))
}
