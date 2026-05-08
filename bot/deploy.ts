import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const commands = [
  new SlashCommandBuilder().setName('profile').setDescription('VIEW YOUR ARENA PROFILE'),
  new SlashCommandBuilder().setName('stats').setDescription('VIEW YOUR BIOMETRIC STATS'),
  new SlashCommandBuilder().setName('leaderboard').setDescription('VIEW GLOBAL RANKINGS'),
  new SlashCommandBuilder().setName('set-elo')
    .setDescription('ADMIN: SET USER ELO')
    .addUserOption(opt => opt.setName('user').setDescription('THE TARGET USER').setRequired(true))
    .addIntegerOption(opt => opt.setName('amount').setDescription('ELO AMOUNT').setRequired(true)),
  new SlashCommandBuilder().setName('rank-up').setDescription('MANUALLY SYNC RANK FROM ARENA'),
  new SlashCommandBuilder().setName('mog').setDescription('CHECK IF YOU MOG THE TARGET')
    .addUserOption(opt => opt.setName('target').setDescription('WHO TO MOG').setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);

(async () => {
  try {
    console.log('🔄 DEPLOYING SLASH COMMANDS...');
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      { body: commands },
    );
    console.log('✅ COMMANDS DEPLOYED SUCCESSFULLY');
  } catch (error) {
    console.error(error);
  }
})();
