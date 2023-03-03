import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getCheer(): Promise<any> {
    const { data } = await axios.get('https://www.melon.com/chart/index.htm', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      },
    });
    const $ = cheerio.load(data);
    $('table > tbody > tr')
      .find('.ellipsis.rank01')
      .each((i, e) => {
        console.log(i);
        console.log($(e).text().trim());
      });

    return data;
  }
}
