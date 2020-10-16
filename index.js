require('events').EventEmitter.prototype._maxListeners = 20;

const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const command = require(`./command`)
const firstMessage = require(`./first-message`)
const privateMessage = require(`./private-message`)
const roleClaim = require(`./role-claim`)
const welcome = require(`./welcome`)

client.on('ready', () => {
    console.log('The client is ready!')

    // First Message
    firstMessage(client, '761716750612955137', 'This is my first message', ['🇱', '🇮', '🇹'])

    // Private Message
    privateMessage(client, 'ping', 'pong')

    // // DM User
    // client.users.fetch('298344267993186314').then(user => {
    //     user.send('Bot is online!')
    // })

    // Embed
    command(client, 'developers', (message) => {
        const logo = 'https://images2.corriereobjects.it/methode_image/2015/05/12/Tecnologia/Foto%20Gallery/steve_ballmer2_MGZOOM.jpg'

        const embed = new Discord.MessageEmbed()
            .setTitle('developers developers developers')
            .setURL('https://www.youtube.com/watch?v=KMU0tzLwhbE')
            .setAuthor(message.author.username)
            .setImage(logo)
            .setThumbnail(logo)
            .setColor('#00AAFF')
            .addFields({
                name: 'Developers?',
                value: 'Developers!',
                inline: true
            }, {
                name: 'Developers?',
                value: 'Developers!',
                inline: true
            }
            )

        message.channel.send(embed)
    })

    // Create Text Channel
    command(client, 'createtextchannel', (message) => {
        const name = message.content.replace('!createtextchannel ', '')

        message.guild.channels
            .create(name, {
                type: 'text'
            })
            .then(channel => {
                const categoryId = '740359909421482046'
                channel.setParent(categoryId)
            })
    })

    // Create Voice Channel
    command(client, 'createvoicechannel', (message) => {
        const name = message.content.replace('!createvoicechannel ', '')

        message.guild.channels
            .create(name, {
                type: 'voice'
            })
            .then(channel => {
                const categoryId = '740359909421482047'
                channel.setParent(categoryId)
                channel.setUserLimit(10)
            })
    })

    // // Ping Pong in channel with bot
    // command(client, ['ping', 'test'], message => {
    //     message.channel.send('Pong!')
    // })

    // // Number of members in server
    // command(client, 'servercount', message => {
    //     client.guilds.cache.forEach(guild => {
    //         message.channel.send(`
    //         ${guild.name} has a total of ${guild.memberCount} members`)
    //     })
    // })

    // List server information
    command(client, 'serverinfo', message => {
        const { guild } = message

        const { name, region, memberCount, owner, afkTimeout } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields({
                name: 'Region',
                value: region,
            }, {
                name: 'Members',
                value: memberCount,
            }, {
                name: 'Owner',
                value: owner.user.tag,
            }, {
                name: 'AFK Timeout',
                value: afkTimeout / 60,
            })

        message.channel.send(embed)
    })

    // clear channel
    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then(results => {
                message.channel.bulkDelete(results)
            })
        }
    })

    // set bot status
    command(client, 'status', message => {
        const content = message.content.replace('!status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })

    })


    // ban
    command(client, 'ban', message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMIN') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${tag} That user has been banned.`)
            } else {
                message.channel.send(`${tag} Please specify someone to ban`)
            }
        } else {
            message.channel.send(`${tag} You do not have permission to use this command`)
        }
    })

    // kick
    command(client, 'kick', message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMIN') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${tag} That user has been kicked.`)
            } else {
                message.channel.send(`${tag} Please specify someone to kick`)
            }
        } else {
            message.channel.send(`${tag} You do not have permission to use this command`)
        }
    })

    // help command
    command(client, 'help', message => {
        message.channel.send(`
    User commands:

    **!help** - Displays the help menu
    **!serverinfo** - Displays server information
    **!developers** - Displays a very important video
    `)
    })

    // Role Claim
    roleClaim(client)

    // Welcome
    welcome(client)

    // Prefix
    const { prefix } = config
    client.user.setPresence({
        activity: {
            name: `"${prefix}help" for help`
        }
    })
})

client.login(config.token)