const Discord = require('discord.js')
const client = new Discord.Client()

const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift()
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 500)
    }
}

module.exports = async (client, id, text, reactions = []) => {
    const channel = await client.channels.fetch(id)

    channel.messages.fetch().then((messages) => {
        if (messages.size === 0) {

            // Sends a new message

            const logo = 'https://emoji.gg/assets/emoji/1899_Rika_Cool.png'
            // const logo = 'https://emoji.gg/assets/emoji/2360_Ahegao_Plead.png'
            const embed = new Discord.MessageEmbed()
                .setTitle('Github(todo)')
                .setURL('https://jernardo.github.io/dubot')
                .setImage(logo)
                .setColor('#00AAFF')

            channel.send(text, embed).then(message => {
                addReactions(message, reactions)
            })

        } else {
            for (const message of messages) {
                message[1].edit(text)
                addReactions(message[1], reactions)

            }
        }
    })
}