import { Client, GatewayIntentBits, Events, Collection, Interaction } from 'discord.js';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '../.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`🚀 MOG_ARENA_BOT ACTIVE: ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  // Simple Command Router
  try {
    if (commandName === 'profile') {
      await handleProfile(interaction);
    } else if (commandName === 'stats') {
      await handleStats(interaction);
    } else if (commandName === 'leaderboard') {
      await handleLeaderboard(interaction);
    } else if (commandName === 'set-elo') {
      await handleSetElo(interaction);
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: '❌ ERROR EXECUTING COMMAND', ephemeral: true });
  }
});

async function handleProfile(interaction: any) {
  const { data: user } = await supabase
    .from('profiles')
    .select('*')
    .eq('discord_id', interaction.user.id)
    .single();

  if (!user) {
    return interaction.reply({ content: '❌ PROFILE NOT FOUND. JOIN THE ARENA FIRST.', ephemeral: true });
  }

  await interaction.reply({
    embeds: [{
      title: `${user.username.toUpperCase()} // PROFILE`,
      color: 0x3B82F6,
      fields: [
        { name: 'RANK', value: `\`${user.rank}\``, inline: true },
        { name: 'ELO', value: `\`${user.elo}\``, inline: true },
        { name: 'WINRATE', value: `\`${((user.wins / (user.wins + user.losses || 1)) * 100).toFixed(1)}%\``, inline: true },
      ],
      footer: { text: 'MOG OR BE MOGGED' }
    }]
  });
}

async function handleStats(interaction: any) {
    // Stats implementation...
    await interaction.reply("📊 CALCULATING BIOMETRIC STATS...");
}

async function handleLeaderboard(interaction: any) {
  const { data: users } = await supabase
    .from('profiles')
    .select('username, elo')
    .order('elo', { ascending: false })
    .limit(10);

  const list = users?.map((u, i) => `**#${i + 1}** ${u.username} • \`${u.elo}\``).join('\n') || 'EMPTY';
  
  await interaction.reply({
    embeds: [{
      title: '🏆 GLOBAL MOG LADDER',
      description: list,
      color: 0x8B5CF6,
    }]
  });
}

async function handleSetElo(interaction: any) {
  if (!interaction.member.permissions.has('Administrator')) {
    return interaction.reply({ content: '❌ PERMISSION DENIED. ADMIN ONLY.', ephemeral: true });
  }
  
  const target = interaction.options.getUser('user');
  const amount = interaction.options.getInteger('amount');

  await supabase
    .from('profiles')
    .update({ elo: amount })
    .eq('discord_id', target.id);

  await interaction.reply(`✅ UPDATED ELO FOR ${target.username} TO \`${amount}\``);
}

client.login(process.env.DISCORD_BOT_TOKEN);
