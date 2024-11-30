import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private __cluster: RedisClientType;

  constructor() {
    this.__cluster = createClient({
      url: process.env.REDIS_URL,
    });

    this.__cluster.on('error', (err) => console.log('Ошибка Redis кластера:', err));
    this.__cluster.connect().then(() => console.log('Успешное подключение к кластеру Redis'));
  }

  pubUpdate(message: string) {
    this.__cluster.publish('channel_1', message);
  }
}