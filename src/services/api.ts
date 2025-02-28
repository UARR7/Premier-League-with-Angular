import axios from 'axios';
import { Player } from '../types/Player';

const API_URL = 'http://localhost:8080/api/v1';

export const fetchAllPlayers = async (): Promise<Player[]> => {
  const response = await axios.get(`${API_URL}/player`);
  return response.data;
};

export const fetchPlayersByTeam = async (team: string): Promise<Player[]> => {
  const response = await axios.get(`${API_URL}/player?team=${team}`);
  return response.data;
};

export const fetchPlayersByPosition = async (position: string): Promise<Player[]> => {
  const response = await axios.get(`${API_URL}/player?position=${position}`);
  return response.data;
};

export const fetchPlayersByNation = async (nation: string): Promise<Player[]> => {
  const response = await axios.get(`${API_URL}/player?nation=${nation}`);
  return response.data;
};

export const fetchPlayersByName = async (name: string): Promise<Player[]> => {
  const response = await axios.get(`${API_URL}/player?name=${name}`);
  return response.data;
};

export const fetchPlayersByTeamAndPosition = async (team: string, position: string): Promise<Player[]> => {
  const response = await axios.get(`${API_URL}/player?team=${team}&position=${position}`);
  return response.data;
};

export const addPlayer = async (player: Player): Promise<Player> => {
  const response = await axios.post(`${API_URL}/player`, player);
  return response.data;
};

export const updatePlayer = async (player: Player): Promise<Player> => {
  const response = await axios.put(`${API_URL}/player`, player);
  return response.data;
};

export const deletePlayer = async (playerName: string): Promise<void> => {
  await axios.delete(`${API_URL}/player/${playerName}`);
};