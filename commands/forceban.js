const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    const user = args[0];
    const settings = client.getSettings(message.guild.id);

    if (user) {
        message.guild.ban(user).then(() => {
          message.reply(`Successfully banned the user!`);

          const modLogChannel = settings.modLogChannel;
          if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
            let embed = new Discord.RichEmbed()
            .setTitle('User Ban')
            .setColor('#eeeeee')
            .setDescription(`Name: ${user.username}\nID: ${args[0]}\nReason: ${args.slice(1).join(' ')}\nModerator: ${message.author.username}`);

            message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
          }
        }).catch(err => {
          message.reply('I was unable to ban the member');
        });
    } else message.channel.send('You did not input a valid UserID');
  } catch (err) {
    message.channel.send('Their was an error!\n' + err +'').catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['fb'],
  guildOnly: true,
  permLevel: 'Moderator'
};

exports.help = {
  name: 'forceban',
  category: 'Moderation',
  description: 'Bans a member and does not have to be in your guild.',
  usage: 'forceban @<user> [reason]'
};
