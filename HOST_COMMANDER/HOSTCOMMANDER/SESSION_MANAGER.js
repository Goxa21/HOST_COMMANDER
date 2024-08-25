const LDAP_PROCESSOR = require('./LDAP_PROCESSOR.js');


class sessionQuant {
    constructor(sessionKey, lifeTime, userName, fullname) {
        this.sessionKey = sessionKey;
        this.lifeTime = lifeTime || 86400;//секунд
        this.defaultSessionLifeTime = 86400;//секунд
        this.userName = userName;
    }
}

class SESSION_MANAGER {
    constructor() {
        this.sessions = [];
        this.randomizer = Math.random();
        this.THIS = this;
        this.SessionDecayProcessor(this.THIS);
    }

    OpenNewSession(userName,passWord) {
        return new Promise((resolve,reject)=>{
            LDAP_PROCESSOR.Search(userName,passWord).then((entry)=>{
                let newSession = new sessionQuant();
                newSession.userName = userName;
                newSession.cn = entry.cn;
                newSession.sessionKey = this.GenerateKey();
                this.sessions.push(newSession);
                setTimeout(resolve,500,newSession);
            }).catch((err)=>{
                setTimeout(reject,1000,err);
            })
        });
        
    }

    KillSession(userName, sessionKey) {
        for (let i = 0; i < this.sessions.length; i++) {
            if (this.sessions[i].userName == userName && this.sessions[i].sessionKey == sessionKey) {
                this.sessions.splice(i, 1);
                return i;
            }
        }
        console.log('-- session killed:<' + userName + '>');
        return null;
    }

    CheckSessionExistance(userName, sessionKey) {
        for (let i = 0; i < this.sessions.length; i++) {
            if (this.sessions[i].userName == userName && this.sessions[i].sessionKey == sessionKey) {
                console.log('-- session found:<' + this.sessions[i].userName + "> and refreshed");
                this.sessions[i].lifeTime = this.sessions[i].defaultSessionLifeTime;
                return this.sessions[i];
            }
        }
        console.log('-- session not found:<' + userName + '>');
        return null;
    }

    SessionDecayProcessor(THIS) {
        for (let i = 0; i < THIS.sessions.length; i++) {
            THIS.sessions[i].lifeTime--;
            if (THIS.sessions[i].lifeTime <= 0) {
                console.log('-- session decayed:<' + THIS.sessions[i].userName + '>');
                THIS.sessions.splice(i, 1);
            }
        }
        setTimeout(THIS.SessionDecayProcessor, 1000, THIS)
    }

    GenerateKey() {
        let key = 'K';
        for (let i = 0; i < 21; i++) {
            key += Math.round(Math.random() * 1000) + '';
        }
        return key;
    }
}



module.exports = new SESSION_MANAGER();