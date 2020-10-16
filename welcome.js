module.exports = client => {
    const channelId = '765395009503363073' // Announcements
    const roleChannelId = '765379655259521045' // Role selection
    const generalChannelId = '761716750612955137' // Role selection

    client.on('guildMemberAdd', member => {
        console.log(member)

        // const message = `Please welcome <@${member.id}> to the server! Please check out ${member.guild.channels.cache.get(roleChannelId).toString()}, then head over to ${member.guild.channels.cache.get(generalChannelId).toString()}!`

        const message = `<@${member.id}> has joined the server.`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}