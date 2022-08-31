const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Berhasil Login!');
});

client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
    
});
client.on('message', async (msg) => {
    const mentions = await msg.getMentions();
    
    for(let contact of mentions) {
        console.log(`${contact.pushname} was mentioned`);
    }
});

// Jika ada Pesan Masuk akan di Balas dan Di Tag

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    
    await chat.sendMessage(`Bentar yaaaa.....  @${contact.id.user}`, {
        mentions: [contact]
    });
});
 

// Menandai Orang
/*
client.on('message', async (msg) => {
    if(msg.body === '!everyone') {
        const chat = await msg.getChat();
        
        let text = "hehehe";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }
});
 
 */



client.initialize();
