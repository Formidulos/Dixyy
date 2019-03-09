const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let fetched = await message.channel.fetchMessage(args[0]);
    
    let embed = new Discord.RichEmbed()
    .setTitle(fetched.id)
    .setColor('#eeeeee')
    .setURL(fetched.url)
    .setThumbnail(fetched.author.avatarURL)
    .setDescription(fetched.content)
    .setFooter('Message created by ' + fetched.author.tag);
    
    message.channel.send(embed);
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['fm', 'fetchmsg', 'fmsg'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'fetchmessage',
  category: 'General',
  description: 'Finds a message in your channel by ID',
  usage: 'fetchmessage <id>'
};
