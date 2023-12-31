// @ts-ignore
import fs from 'fs';

export default class FileHelpers {
  public static saveFile({ dirname, fileName, extention, data }: { dirname: string, fileName: string, extention: string, data: string }) {
    fs.writeFile(`${dirname}/${fileName}.${extention}`, data, function (error) {
      if (error) {
        return console.log(error.message);
      }
      console.log(`The file ${fileName} was saved!`);
    });
  }
}
