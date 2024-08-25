const ldap = require('ldapjs');

class LDAP_PROCESSOR {
    constructor() {
        this.url = 'ldap://balnps.rosenergoatom.ru:389';
    }

    Search(user, pass) {
        return new Promise((resolve, reject) => {
            if (user == 'guest' && pass == 'guest'){
                resolve({
                    cn:'Гость',
                    sAMAccountName:'guest',
                });
                return;
            }

            let client = ldap.createClient({
                url: this.url,
            })
            client.bind(user + '@balnps.rosenergoatom.ru', pass, err => {
                if (err) {
                    console.log("--FALIURE-- at LDAP binding");
                    LDAPDisconnect();
                    reject(err);
                }
                else {
                    console.log("--SUCCESS-- at LDAP binding");
                    LDAPSearch();
                }
            });

            function LDAPSearch() {
                let opts = {
                    filter: '(&(objectClass=user)(objectCategory=person)(samaccountname=' + user + '))',
                    scope: 'sub',
                    attributes: ["CN", "samaccountname", "mail", "department", "thumbnailphoto", "telephonenumber"]
                }
                client.search('DC=balnps,DC=rosenergoatom,DC=ru', opts, (err, search) => {
                    if (err){
                        reject(err);
                    }
                    search.on('searchEntry', entry => {
                        console.log(entry.object);
                        console.log("--SUCCESS-- at LDAP search");
                        LDAPDisconnect(client);
                        resolve(entry.object);
                    })
                    search.on('error', err => {
                        console.log("--FALIURE-- at LDAP search");
                        reject(err);
                        LDAPDisconnect(client);
                    })
                });
            }
            function LDAPDisconnect() {
                client.unbind(err => {
                    if (err) {
                        console.log("--FALIURE-- at LDAP unbinding");
                        console.log(err);
                    }
                    else {
                        console.log("--SUCCESS-- at LDAP unbinding");
                    }
                })
            }
        });
    }
}

module.exports = new LDAP_PROCESSOR();