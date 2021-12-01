import { GuildProps } from '../components/Guild';
import { api } from './api';

export async function fetchGuilds() {
  const response = await api.get<GuildProps[]>('/users/@me/guilds');
  return response.data;
}
